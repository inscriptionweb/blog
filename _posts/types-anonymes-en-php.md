# Les types anonymes en PHP
- zessx
- zessx
- 2014/07/25
- PHP ; Development
- published
	
L'astuce du jour : comment créer un objet PHP sans utiliser de classe.

## Objets et classes

Normalement, quand vous voulez créer un objet en POO, il vous faut instancier une classe. Un exemple tout simple ci-dessous en PHP :

	class Point2D
	{
		var $x, $y;

		function Point2D($x, $y) {
			$this->x = $x;
			$this->y = $y;
		}
	}

	$point = new Point2D(13, 37);

	print get_class($point); // Point2D

Ici, notre variable `$point` est un objet de type `Point2D`. Cet objet a deux propriétés, accessibles comme suit :

	print $point->x; // 13
	print $point->y; // 37

Pour comparer, si on avait utilisé un simple `array` on aurait eu ce code :

	$point = array(
		'x' => 13,
		'y' => 37,
	);

	print $point->x; // 
	print $point->y; // 

	print get_class($point); // Warning:  get_class() expects parameter 1 to be object, array given

Comme on le voit, notre variable n'est qu'un simple tableau associatif, et n'est en rien un objet.

## Le principe des types anonymes

Le principe d'un type anonyme, c'est précisément de ne pas avoir de type. On aurait donc une variable `$point` **sans type défini**, mais toujours avec deux propriétés accessibles.

La notion de type anonyme existe dans différents langages, comme en Javascript ou en C#. En PHP, elle n'existe pas *réellement*. Créer un objet de type anonyme revient à créer un objet de type `stdClass`. Cette classe prédéfinie existe dans toutes les versions de PHP, et nous permet concrètement de créer des objets rapidement à partir de variables.

Voyez ce que donnerait le premier exemple, avec un type anonyme :

	$point = (object) array(
		'x' => 13,
		'y' => 37,
	);

	print $point->x; // 13
	print $point->y; // 37

	print get_class($point); // stdClass

Ici, notre tableau associatif est bien devenu un objet, de type `stdClass`. Par abus de langage, et/ou par souci de simplicité, on dira de la variable `$point` qu'elle est un objet de type anonyme.

Les objets de type anonyme ne peuvent pas avoir de fonctions. Bon, pour être honnête il est *possible* d'ajouter des fonctions, mais c'est vraiment très sale et ce n'est de toute façon pas le but d'un type anonyme. Si vous en arrivez à ces extrêmes, il est sérieusement temps de penser à créer une vraie classe...

En complément, je préciserai que le transtypage apporté par `(object)` peut être appliqué à une variable scalaire, qui ne peut contenir qu'une valeur atomique (comme les entiers ou les chaînes de caractères). Dans ce cas, l'objet final n'aura qu'une seule propriété :  `scalar`.

	$foo = (object) 'bar';

	var_dump($foo);
	// object(stdClass)#1 (1) {
	//  ["scalar"]=>
	//  string(3) "bar"
	// }

	print $foo->scalar; // bar

## Liens :
[Les classes prédéfinies en PHP](http://php.net//manual/fr/reserved.classes.php)   
[Conversion en un objet PHP](http://php.net/manual/fr/language.types.object.php#language.types.object.casting)   
