---
layout: post
title:  "Les variables Sass et leur portée"
date:   2014-06-24
update: 2014-10-23
tags: 
- sass
description: >
  Petit billet pour présenter les variables Sass et leur portée. J'entame avec ce billet un dossier un peu plus gros sur Sass et les différentes fonctionnalités qu'il propose.
---

> Articles du dossier :  
> 
> **I - Les variables Sass et leur portée**  
> [II - Les variables et les opérations en Sass](http://blog.smarchal.com/variables-et-operations-en-sass)  
> [III - Interpolation de variables en Sass](http://blog.smarchal.com/interpolation-de-variable-sass)  

Petite note pour commencer : je parle de Sass (voire de SASS par abus de langage, mea culpa) tout au long de mon billet, ce qui inclut les deux syntaxes SASS et SCSS.
J'utilise personnellement SCSS, et on trouve très peu de différences avec SASS. Je vous laisse le soin de transposer en SASS si vous désirez l'utiliser, il n'y a rien de bien méchant.

## La syntaxe

La base avant tout !  
Les variables Sass se déclare à l'aide d'un `$` devant le nom de la variable, et d'un `:` pour séparer la valeur :

	$foo: 5;

...Rien de plus à dire pour cette partie.
Maintenant qu'on sait créer des variables, il faut être au courant de ce qu'on peut y mettre. A peu près n'importe quoi en fait... 

## Les types de données

### Les nombres

Il est possible de stocker des booléens, des entiers et des doubles, et ce avec ou sans unité :

	$a: 5;
	$b: 3.14;
	$c: 12px;
	$d: 50%;
	$e: 4.2em;
	$f: 6rem;

### Les chaînes de caractères

Celles-ci se stockent avec de simples ou doubles guillemets, ou même sans guillemets pour les valeurs CSS telles que `red`, `bold` ou `sans-serif` :

	$g: "foo";
	$h: 'bar';
	$i: sans-serif;

### Les couleurs

Les variables Sass permettent aussi le stockage de couleurs, dans le formats HEX, RGB, RGBA, HSL, HSLA, ou là aussi via des noms reconnus par le CSS :

	$j: tomato;
	$k: #C0FFEE;
	$l: rgb(10, 20, 30);
	$m: rgba(40, 50, 60, .5);
	$n: hsl(0, 100%, 50%);
	$o: hsla(30, 70%, 40%, .4);

### Les booléens

	$p: true;
	$q: false;

### La valeur nulle

	$r: null;

### Les listes

Les listes utilisent l'espace ou la virgule comme caractère de séparation :

	$s: 'foo' 
		'bar' 
		'baz';
	$t: 'foo', 
		'bar', 
		'baz';

On peut cumuler ces deux caractères pour imbriquer des listes :

	$u: 'foo' 'fooo', 
		'bar' 'baar', 
		'baz' 'baaz';

Il est aussi possible de créer des couples clé/valeur dans ces listes :

	$v: (
		foo: 'foo', 
		bar: 'bar', 
		baz: 'baz'
	);

## Une valeur par défaut ?

Vous pouvez, avant d'assigner une valeur à une variable, vérifier si celle-ci n'est pas déjà définie.  
Cette méthode est très utile lors de l'initialisation de vos variables dans une librairie, afin de fournir des valeurs par défaut, mais de préserver celles que l'utilisateur à déjà fixées :

	$a: 1 !default; // $a = 1
	$a: 2 !default; // $a = 1
	$a: 3;          // $a = 3
	$a: null;       // $a = null
	$a: 4 !default; // $a = 4

## La portée des variables

**Edit: Sass 3.4 apporte avec lui les variables locales, ce paragraphe n'est donc valable que pour les versions antérieures.**

Il n'existe pas de notion de portée des variables en Sass, elles sont toutes globales.  
Voici un exemple pour bien comprendre les limites du système : 

	$c: blue;

	span {
		color: $c;
		border-color: $c;
	}

	.error {
		$c: red;

		p {
			color: $c;
			border-color: $c;
		}
	}

	p {
		color: $c;
		border-color: $c;
	}

Dans ce cas de figure, nous aurons :

- tous les `<span>` en bleu
- tous les `<p>` à l'intérieur d'un élément avec la classe `error` en rouge
- tous les autres `<p>` ***en rouge***

La nouvelle valeur affectée à la variable `$c` persiste, y compris en dehors du bloc `.error {}` où elle a été définie.  

En contrepartie, la porté des variable s'étant même au delà des fichiers. Il est possible de définir ses variables dans un fichier, et d'importer ce fichier dans un autre afin de réutiliser ces mêmes variables.  
Ce fonctionnement à de bons et de mauvais côtés. Pour vous, et particulièrement si vous aimer partager vos librairies, cela signifie surtout qu'il faut veiller à utiliser des noms de variables uniques, ou bien de proposer l'utilisation d'un préfixe appliqué à tous vos noms de variables.


## Liens
[La documentation de SASS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)  