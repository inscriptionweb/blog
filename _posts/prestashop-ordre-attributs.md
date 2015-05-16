# Prestashop : gérer l'ordre des attributs 
- zessx
- zessx
- 2013/10/30
- Prestashop ; PHP
- published

Avec Prestashop, vous avez la possibilité de créer plusieurs déclinaisons pour un même produit afin de le fournir, par exemple, en différentes couleurs. Ces déclinaisons sont basées sur des attributs (dans notre exemple, l'attribut Couleur).   
Jusque là, rien de bien méchant. Côté Front-Office, plutôt que d'avoir plusieurs produits en différentes couleurs, vous aurez une unique fiche produit, avec une sélection pour chaque attribut :

<center>![Sélection des attributs](posts/images/prestashop-ordre-attributs/prestaattribute.jpg)</center>

Malheureusement, Prestashop 1.4 ne gère pas l'ordre de ces attributs, il les classe simplement par ordre alphabétique. Cela ne pose aucun souci dans le cas de couleurs, mais ça se corse quand vous commencez à utiliser des tailles vestimentaires :

* L
* M
* S
* XL
* XS
* XXL

Je le rappelle, Prestashop vous permet d'ordonner tout ça avec sa version 1.5. Pour ceux qui en sont toujours à la 1.4, vous pourrez désormais utiliser un petit module gratuit : **AttributePosition**. Ci-dessous la procédure d'installation.

## Téléchargement

Vous pouvez trouver ce petit module sur [prestatools.com](http://www.prestatools.com/module-addons-prestashop/ordre-des-attributs-attributeposition), ou sur le [site du développeur](http://www.henribaeyens.com/10ver/filez/prestashop_module_attributeposition) (Henri Baeyens). Il n'est malheureusement pas disponible sur le dépôt officiel des addons Prestashop.

## Installation

Une fois téléchargé, suivez la procédure habituelle, en installant le module via le Back-Office.

## Configuration

Pour fonctionner, le module requiert quelques modifications mineures sur deux classes. Vous pouvez créer des override de ces classes si besoin (recommandé).

Dans la classe ***Product***, modifiez la clause ***ORDER BY*** de la requête dans la fonction `getAttributesGroups()` :

	ORDER BY ag.`position` ASC, a.`position` ASC

Dans la classe ***ProductController***, commentez ces deux lignes dans la fonction `process()` :

	// foreach ($groups AS &$group)
	//     natcasesort($group['attributes']);

Et voilà notre module installé. Pour pouvez maintenant le retrouver dans le Back-Office en passant par Catalogue > Ordre des attributs (il est possible que ce soit en anglais, mais ça reste simple à trouver).

## Liens :
[Le site du développeur](http://www.henribaeyens.com/)   
[AttributePosition sur le site du développeur](http://www.henribaeyens.com/10ver/filez/prestashop_module_attributeposition)   
[Doc PHP : la fonction natcasesort()](http://php.net/manual/fr/function.natcasesort.php)   
[Le site officiel de Prestashop](http://www.prestashop.com/fr)   
[Le dépôt officiel des addons Prestashop](https://addons.prestashop.com/fr/)   