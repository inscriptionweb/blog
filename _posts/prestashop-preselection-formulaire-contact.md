# Prestashop : présélection sur le formulaire de contact
- zessx
- zessx
- 2014/10/16
- Prestashop ; PHP
- published

Sur le formulaire de contact de Prestashop, vous pouvez choisir à qui envoyer votre message. Voici comment présélectionner le destinataire.

## Le principe

Pour présélectionner le destinataire sans tout remettre en question, on va simplement ajouter une variable `GET` dans l'url avec l'identifiant du contact :

	http://www.maboutique.com/fr/contactez-nous?id_contact=1

L'utilisation d'une variable `GET` est intéressante d'une part parce qu'elle ne nécessite que très peu de modifications (on n'est même pas obligés de toucher aux contrôleurs),
et d'autre part parce qu'on va pouvoir la différencier facilement des données `POST` envoyées via le formulaire. Un exemple pour comprendre l'intérêt :

- J'arrive sur la page contact, avec le contact "Webmaster" présélectionné (à l'aide d'un `?id_contact=1`)
- Je change ce contact en choisissant "Service client"
- Je valide le formulaire (vide)
- Une erreur survient, la page est rechargée (toujours avec le `?id_contact=1`)
- Là, le formulaire doit m'afficher "Service client" (car c'est la valeur que j'ai choisie), et non pas "Webmaster"

Le problème n'est pas lié à la version de Prestashop, mais au thème. L'astuce pourrait donc vous servir sur les versions 1.4, 1.5 et 1.6.

## Le correctif

Il va falloir regarder du côté du fichier `contact_form.tpl`, et repérer la liste déroulante pour les contacts (recherchez `id="id_contact"`) :

	<select id="id_contact" class="form-control" name="id_contact">
		<option value="0">{l s='-- Choose --'}</option>
		{foreach from=$contacts item=contact}
			<option value="{$contact.id_contact|intval}" {if isset($smarty.post.id_contact) && $smarty.post.id_contact == $contact.id_contact}selected="selected"{/if}>{$contact.name|escape:'html':'UTF-8'}</option>
		{/foreach}
	</select>

Ce bout de code est susceptible de changer selon les thèmes, mais ce devrait rester sensiblement la même chose.  
Afin de savoir si ce thème est ou non concerné par le problème, observez cette condition :

	{if isset($smarty.post.id_contact) && $smarty.post.id_contact == $contact.id_contact}selected="selected"{/if}

Ici, on va chercher la valeur de `id_contact` uniquement dans les variables `POST`. Si vous voulez allez la chercher aussi dans les variables `GET` (et ailleurs), il va falloir utiliser ceci :

	{if isset($smarty.request.id_contact) && $smarty.request.id_contact == $contact.id_contact}selected="selected"{/if}

## L'explication

`$smarty.request` va rechercher la valeur dans les variables `GET`, `POST`, `COOKIE`, `SERVER` et `ENV` (plus `SESSION` dans le cas de Smarty 3).  
L'ordre dans lequel on va faire la recherche dépendra de la valeur de `variables_order` dans votre `php.ini`. Par défaut, vous aurez cette valeur :

	variables_order = EGPCS

Ce qui signifie qu'on cherchera dans l'ordre si ces variables existent (notez les initiales) :

- `$_ENV['id_contact']`
- `$_GET['id_contact']`
- `$_POST['id_contact']`
- `$_COOKIE['id_contact']`
- `$_SERVER['id_contact']`
- `$_SESSION['id_contact']` (Smarty 3 uniquement)

Dans notre cas, `$_GET['id_contact']` et `$_POST['id_contact']` sont définies, et la seconde valeur vient écraser la première. Nous avons donc :

- `$smarty.request.id_contact == $_GET['id_contact']` si on ajoute `?id_contact=1` à la fin de l'url et que les données `POST` sont vides
- `$smarty.request.id_contact == $_POST['id_contact']` si l'url est "vierge" et que les données `POST` sont définies
- `$smarty.request.id_contact == $_POST['id_contact']` si on ajoute `?id_contact=1` à la fin de l'url et que les données `POST` sont définies

## Liens :

[Un template sans le problème (v1.6)](https://github.com/PrestaShop/PrestaShop/blob/1.6/themes/default-bootstrap/contact-form.tpl#L68)  
[Un template avec le problème (v1.4)](https://github.com/PrestaShop/PrestaShop-1.4/blob/master/themes/prestashop/contact-form.tpl#L58)  
[Documentation Smarty 2 sur $smarty.request](http://www.smarty.net/docs/en/language.variables.smarty.tpl#language.variables.smarty.request)  
[Documentation Smarty 3 sur $smarty.request](http://www.smarty.net/docsv2/en/language.variables.smarty.tpl#language.variables.smarty.request)  
[Documentation PHP sur variables_order](http://www.php.net/manual/fr/ini.core.php#ini.variables-order)  