---
layout: post
title:  "L’opérateur ternaire en PHP"
date:   2013-07-18
tags: 
- php
description: >
  Connaissez-vous l'opérateur ternaire ?
---

## Un simple if

Prenons ce morceau de code en PHP, presque aussi simple qu'un Hello World :

	if($a) {
		$b = $a;
	} else {
		$b = 1;
	}

Si la variable `$a` est égale à `true`, on assigne sa valeur à `$b`. Le cas échéant, on assigne une valeur par défaut.

## L'opérateur ternaire

Compressons un peu tout cela avec l'opérateur ternaire :

	$b = $a ? $a : 1;

L'opérateur ternaire est un raccourci d'écriture pour le `if`. Il fonctionne de cette façon :

	$var = [IF] ? [THEN] : [ELSE];

## Encore plus court ?

Toujours plus loin, toujours plus fort, utilisons à présent le raccourci de l'opérateur ternaire ! (disponible avec **PHP >= 5.3**)

	$b = $a ?: 1;

Ce raccourci permet d’omettre la partie centrale de l'opérateur ternaire. Il est toutefois à manier avec précaution car il utilise quelques subtilités du langage PHP.   
Dans notre exemple, si la condition (`$a`) est égale à `true`, on assigne sa valeur à `$b`.   
La subtilité ici, c'est que `$a == true` tant que sa valeur est différente de `null, false, 0, ''`...   
On va donc assigner la valeur de `$a` à `$b` si et seulement si elle est différente de `null, false, 0, ''`...   

Vous ne pouvez pas utiliser ce raccourci pour tout et n'importe quoi. Voici un exemple qui ne fonctionnerait pas :

	$page = isset($_GET['p']) ?: 1;

Si `$_GET['p']` est défini, la variable `$page` prendra systématiquement la valeur `true` (car `isset($_GET['p']) === true`).

Ce raccourci peut donc s'avérer utile, mais doit être utilisé avec précautions.   
Un équivalent peut d'ailleurs être trouvé en C#, avec l'opérateur de fusion null `??` (en lien ci-dessous un article à ce propos)

## Liens
[Documentation PHP : les opérateurs de comparaison](http://php.net/manual/fr/language.operators.comparison.php)   
[CodePoney : l'opérateur de fusion null (??) en C#](http://codeponey.blogspot.fr/2013/06/loperateur-de-fusion-null.html)   