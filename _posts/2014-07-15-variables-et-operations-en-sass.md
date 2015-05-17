---
layout: post
title:  "Variables et opérations en Sass"
date:   2014-07-15
tags: 
- sass
description: >
  Ce billet fait suite à celui sur les variables Sass et leur portée, et présente cette fois-ci l'interpolation de variable.
---

> Articles du dossier :  
> 
> [I - Les variables Sass et leur portée](http://blog.smarchal.com/les-variables-sass)  
> **II - Les variables et les opérations en Sass**  
> [III - Interpolation de variables en Sass](http://blog.smarchal.com/interpolation-de-variable-sass)  

## Référencer une autre variable

Avant tout, il faut savoir que les variables peuvent évidemment être utilisées **dans** d'autres variables, via leur nom :

	$a: 10;
	$b: $a; // $b = 10

## De l'arithmétique de base

Toutes les opérations de base sont disponibles :

	$c: $a + $b
	$c: $a - $b
	$c: $a * $b
	$c: $a / $b

Attention toutefois à l'opérateur `/`, qui est utilisé en CSS en tant que séparateur, comme dans la propriété `font` par exemple :

	font: 12px/14px Arial normal;

L'opérateur sera pris en compte dans les cas où la valeur contient une opération (`3px + 10px / 2px`), une variable (`$a / 2px`) ou une fonction (`floor(10.5px) / 2px`).  
Dans tous les autres cas, il faudra englober le tout dans des parenthèses pour que la valeur ne soit pas considérée comme du CSS :

	font: 10px/2px Arial normal;   // font-size = 10px
	font: (10px/2px) Arial normal; // font-size = 5px

## Les opérateurs booléens

Sass supporte les opérateurs `and`, `or` et `not`. Ceux-ci seront plutôt utilisés dans des fonctions.

## Travailler avec les couleurs

Notez que la somme de plusieurs couleurs est possible en Sass, et se fait par canal. C'est à dire que la couleur finale aura pour valeur de canal Red la somme des canaux Red des couleurs ajoutées.
Idem pour les canaux Green et Blue :

	$a: #012345 + #112233;                       // #124578
	$b: rgb(100, 150, 200) + rgb(100, 100, 100); // rgb(200, 250, 255)

Dans le cas des couleurs `RGBA` et `HLSA`, le canal d'opacité doit avoir la même valeur sur toutes les couleurs pour que l'opération fonctionne.

## Les opérations sur les chaînes de caractères

Il est possible de concaténer des chaînes avec l'opérateur `+` :

	$font-1: Arial;
	$font-2: sans-serif;

	body {
	  font-family: $font-1 + ', ' + $font-2; // Arial, sans-serif;
	}

Attention toutefois aux guillemets. Si vous concaténez une chaîne avec guillemets et une sans, vous aurez des résultats différents selon l'ordre dans lequel vous effectuez l'opération :

	font-family: 'Arial' + ', ' + Verdana; // "Arial, Verdana"
	font-family: Arial + ', ' + 'Verdana'; // Arial, Verdana

Si la chaîne avec guillemets vient en premier, le résultat sera entouré de guillemets, et vice versa.

## Liens
[La documentation de SASS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)   