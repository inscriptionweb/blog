---
layout: post
title:  "L'interpolation de variable en Sass"
date:   2015-04-13
tags: 
- sass
description: >
  Ce billet fait suite à celui sur les variables et les opérations en Sass, et présente cette fois-ci l'interpolation de variable.
---

> Articles du dossier :  
> 
> [I - Les variables Sass et leur portée](http://blog.smarchal.com/les-variables-sass)  
> [II - Les variables et les opérations en Sass](http://blog.smarchal.com/variables-et-operations-en-sass)  
> **III - L'interpolation de variable en Sass**

## L'interpolation 

Commençons par la définition de **l'interpolation**, dixit Wikipedia :

> Dans les langages informatiques, une interpolation permet l'évaluation de variables ou d'expressions à l'intérieur d'une chaîne de caractères littérale. Elle est signifiée par des conventions lexicales ou syntaxiques.

Dans le cas de l'interpolation de variable en Sass, il s'agit de forcer l'évaluation d'une variable :

- dans une chaîne de caractère
- dans un sélecteur
- dans un nom de propriété

## Comment l'utiliser ?

Prenons le cas de la chaîne de caractère pour commencer :

	$author: '@zessx';

	footer {
		content: 'Author — $author';
	}

Le résultat affiché sera `Author — $author` car la variable n'est pas évaluée. Pour qu'elle le soit, nous avons deux solutions :

- la concaténation : `content: 'Author — ' + $author;` ([vue dans l'article précédent](http://blog.smarchal.com/variables-et-operations-en-sass))
- l'interpolation : `content: 'Author — #{$author}';`

Dans un cas comme dans l'autre, la variable sera évaluée, et le résultat affiché sera : `Author — @zessx`.

**Toute variable à l'intérieur d'un bloc du type `#{}` sera évaluée, c'est ce qu'on appelle l'interpolation.**

Maintenant que vous avez saisi le principe, vous comprendrez vite son intérêt dans les sélecteurs et les nom de propriétés :

	$theme:    'glossy';
	$property: 'radius';
	$value:     4px;

	body.#{$theme} {
		button {
			border-#{property}: $value;
		}
	}


## Liens
[La documentation de Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)  