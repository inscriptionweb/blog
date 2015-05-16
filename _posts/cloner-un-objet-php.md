# Cloner un objet PHP
- zessx
- zessx
- 2015/03/02
- PHP ; Development
- published
	
L'astuce du jour : comment cloner un objet PHP.

## Pourquoi cloner ?

Prenons un [objet de type anonyme](http://blog.smarchal.com/types-anonymes-en-php) tout simple :

	$foo = (object) array('value' => 10);

	print $foo->value; // 10

Mettons que je veuille dupliquer cet objet, puis modifier mon nouvel objet :

	$bar = $foo;
	$bar->value = 20;

	print $bar->value; // 20

Jusqu'ici tout va bien. Mais regardons à présent la valeur de l'objet `$foo` :

	print $foo->value; // 20

Sa valeur a elle aussi changé ! Cela vient du fait que tout objet est passé **par référence** en PHP 5. Lorsque l'on écrit `$bar = $foo`, on fait pointer la variable `$bar` sur la même instance que celle pointée par `$foo`. Quand on modifie cette instance, les deux variables sont en toute logique concernées.

## Comment cloner ?

PHP fournit un mot-clé somme toute assez simple : `clone` !

Utiliser ce mot-clé sur un objet va permettre de dupliquer celui-ci en créant une nouvelle instance. Ainsi, les modifications apportées au nouvel objet n'ont aucun impact sur le premier :

	$foo = (object) array('value' => 10);

	print $foo->value; // 10

	$bar = clone $foo;
	$bar->value = 20;

	print $foo->value; // 10
	print $bar->value; // 20

Notez que l'utilisation de `clone` va provoquer l'appel à la fonction `__clone()` de l'objet. Vous pouvez ainsi définir un traitement particulier à effectuer lors du clonage, comme la génération d'un nouvel identifiant, ou encore la suppression de données sensibles.

## Liens :
[Le clonage en PHP](http://php.net/manual/fr/language.oop5.cloning.php)   
[Les types anonymes en PHP](http://blog.smarchal.com/types-anonymes-en-php)   
