# Héberger son site sur GitHub
- zessx
- zessx
- 2014/06/16
- Git ; Development ; News
- published

Vous voulez profiter de GitHub pour héberger votre site (statique) perso ? Pas de problème.

## Étude de cas

J'utilise GitHub assez régulièrement pour mes projets. J'ai d'ailleurs pris l'habitude d'y stocker les sources de mon site perso pour pouvoir travailler dessus un peu partout.  
Puis, récemment, je me suis dit que ce serait quand même plus simple de le synchroniser avec mon dépôt GitHub, histoire d'éviter de faire mes `push` d'un côté, et mes uploads de l'autre.  
Je voulais néanmoins garder mon nom de domaine, et ne pas me retrouver avec une URL de GitHub.

Je vous détaille ici les étapes que j'ai suivies, vous verrez qu'il n'y a rien de bien méchant, et que la documentation est **très** complète.

> Cette procédure nécessite quelques connaissances en terme de configuration DNS. Il est vivement recommandé de lire l'intégralité de l'article avant et de ne pas faire ces manipulations sur un site à fort traffic actuellement en production, à moins de savoir ce que vous faites. Je rappelle que la propagation des modifications sur les entrées DNS peut prendre plusieurs heures.

## Les pages GitHub

GitHub offre la possibilité de créer des minis sites rapidement pour présenter vos dépôts.  
Vous avez deux types de pages :

- les pages utilisateurs/organisations
- les pages projets

Ce sont les pages utilisateurs qui nous intéressent aujourd'hui.

## Configuration du dépôt GitHub

Première règle à respecter pour que tout fonctionne bien : le nom du dépôt.  
Ce dernier doit être du type `zessx.github.io`, où vous remplacez `zessx` par votre propre identifiant GitHub.  
Vous aurez donc un dépôt avec l'url suivante : `https://github.com/zessx/zessx.github.io`.  

Si votre dépôt existe déjà, mais n'a pas le bon nom, vous pouvez facilement le renommer.
Allez dans les paramètres de votre dépôt, et vous tomberez directement sur le formulaire pour changer le "Repository name".

À ce stade, votre site est déjà visible en ligne à l'adresse `http://zessx.github.io` (il faudra sûrement attendre une dizaine de minutes avant qu'il soit visible, le temps que GitHub le déploie la première fois).

## Lier un nom de domaine à son dépôt GitHub

Bon j'avoue, ma première idée a été de créer un simple `index.html` sur mon serveur, avec une bonne vieille iFrame toute moche chargant le contenu de `http://zessx.github.io`.  
Je me suis renseigné avant de commencer ces lignes de code de la honte, et j'ai vu que GitHub proposait **déjà** cette fonctionnalité !

Il va donc vous falloir agir des deux côtés : sur GitHub, et chez votre registrar (là où vous gérez habituellement les zones DNS).

## Préparer le dépôt GitHub 

Côté GitHub, tout ce que vous aurez à faire, c'est de créer un fichier `CNAME` (tout en capitales, sans extension) à la racine de votre dépôt.  
Dans ce fichier, vous ajoutez une unique ligne avec votre nom de domaine :

    smarchal.com

## Configurer votre nom de domaine

Côté registrar à présent. Là, tout va dépendre de si vous utilisez un sous-domaine ou non.

Dans le cas d'un sous-domaine (`www` y compris), vous avez simplement à ajouter une entrée `CNAME` dans votre zone DNS :

    www.smarchal.com.  CNAME  zessx.github.io.

Dans le cas d'un domaine nu (ou "naked domain", ou "apex domain"), vous ne pouvez pas utiliser d'entrée `CNAME`. Il existe et existera toujours une entrée `A` pour votre domaine nu. Or, une entrée `CNAME` ne peut être ajoutée que si aucune autre entrée ne concerne cet alias. Vous ne pouvez par exemple pas faire ceci :

    smarchal.com.  A      127.0.0.1
    smarchal.com.  CNAME  zessx.github.io.

Le service DNS ne saurait alors plus où donner de la tête : si on accède à `smarchal.com`, faut-il rediriger vers `zessx.github.io` ou accéder à l'IP `127.0.0.1` ?  
C'est pour cette raison que, pour les domaines nus uniquement, vous allez modifier l'entrée `A` directement. Vous expliquez ainsi au service DNS que votre site se trouve sur un autre serveur : celui de GitHub.  
GitHub fournit 2 URL différentes, que vous allez ajoutez en tant qu'entrées `A` :

    smarchal.com.  A      192.30.252.153
    smarchal.com.  A      192.30.252.154

Veillez bien à ce que les autres entrées `A` pour `smarchal.com` soient supprimées, et vous n'aurez plus qu'à attendre que vos nouvelles entrées DNS soient propagées !

## Résultat

Vous avez désormais voir un site hébergé sur GitHub, avec une URL personnalisée.  
Tous les commits envoyés sur votre branche `master` seront automatiquement appliqués à votre site (puisque ce dépôt en est à présent la source).

## Effets de bord

**Attention toutefois aux effets non prévus.**  
La redirection de mon nom de domaine sur `zessx.github.io` provoque deux choses à prendre en compte :

- Toutes mes page GitHub pour mes projets sont désormais redirigées de `zessx.github.io/project` à `smarchal.com/project`
- Tous mes sous dossiers, avant accessibles via une url du type `smarchal.com/twbscolor`, sont désormais inaccessibles

Le premier point ne pose pas nécessairement problème, le second en revanche est assez gênant.  

## Redonner accès aux anciens sous-dossiers

J'ai choisi une solution simple : mettre en place des sous-domaines pour ces sous-dossiers spécifiques.  
L'ancienne url `smarchal.com/twbscolor` à été remplacée par `twbscolor.smarchal.com`. Mais cela ne suffit pas, il faut rediriger les appels de l'ancienne url vers la nouvelle.  

Lorsqu'on accède à `smarchal.com/twbscolor`, on est redirigé sur mon dépôt GitHub `zessx/twbscolor`, **si tant est qu'il existe**.  
Comme GitHub n'autorise que des ressources statiques, inutile de compter sur un `.htaccess` pour effectuer la redirection. Il va falloir utiliser... du JS.

- Créez le dépôt correspondant s'il n'existe pas (ici `zessx/twbscolor`)
- Créez une branche `gh-pages`, qui contiendra votre page projet (l'autre type de GitHub pages dont nous parlions)
- Ajoutez un fichier `index.html` sur cette branche
- Complétez-le pour enfin effectuer votre redirection en JS :

<!-- -->

	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>TWBSColor</title>
		<script>
		window.location.replace("http://twbscolor.smarchal.com");
		</script>
	</head>
	<body></body>
	</html>

<!-- -->


## Liens :
[Mon site perso - sources](https://github.com/zessx/zessx.github.io)  
[Mon site perso - résultat](http://smarchal.com)  
[GitHub Pages](https://pages.github.com/)  
[Documentation GitHub - Comment mettre en place une URL personnalisée](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages)  