---
layout: post
title:  "CurrentColor"
date:   2014-12-01
tags: 
- css
description: >
  Connaissez-vous le mot-clé **currentColor** en CSS3 ?
---

## Présentation

Le mot-clé `currentColor` permet de réutiliser la couleur de texte d'un élément (çad. la valeur de `color`) pour d'autres attributs, qui n'auraient pas pu en hériter autrement.

Avant l'arrivée de la troisième version de CSS, ce comportement était celui par défaut des bordures. Ces dernières prenaient en effet automatiquement la couleur de texte de l'élément correspondant si rien n'était spécifié. Dans l'exemple suivant, nous avons une bordure de couleur rouge :

	div {
		color: red;
		border: 1px solid;
	}

Même chose si vous utilisez la valeur `initial` pour `border-color`.

Avec ce mot-clé, vous avez la possibilité d'étendre ce comportement à n'importe quel attribut utilisant une couleur !

## Exemples d'utilisation

Les cas d'utilisation sont multiples : partout où vous utilisez plusieurs fois la même couleur que le texte !

Un bouton avec une bordure et une icône, et son état `:hover` par exemple, avant :

	button {
		color: tomato;
		border: 1px solid tomato;
	}
	button:hover {
		color: firebrick;
		border-color: firebrick;
	}

Après :

	button {
		color: tomato;
		border: 1px solid currentColor;
	}
	button:hover {
		color: firebrick;
	}

Un élément avec de multiples `box-shadow`, décliné en deux couleurs possibles, avant :

	.frame-red {
		color: tomato;
		box-shadow: 
			0 0 0 5px white,
			-10px 0 0 0 tomato,
			0 -10px 0 0 tomato,
			0 10px 0 0 tomato,
			10px 0 0 0 tomato;
	}
	.frame-green {
		color: forestgreen;
		box-shadow: 
			0 0 0 5px white,
			-10px 0 0 0 forestgreen,
			0 -10px 0 0 forestgreen,
			0 10px 0 0 forestgreen,
			10px 0 0 0 forestgreen;
	}

Après :

	.frame-red,
	.frame-green {
		color: tomato;
		box-shadow: 
			0 0 0 5px white,
			-10px 0 0 0 currentColor,
			0 -10px 0 0 currentColor,
			0 10px 0 0 currentColor,
			10px 0 0 0 currentColor;
	}
	.frame-green {
		color: forestgreen;
	}

## Utilisation avec Sass

`currentColor` est bien évidement utilisable avec Sass, et peut du coup vous permettre de remplacer certains mixins par des placeholders :

	%frame {
	  	box-shadow: 
		    0 0 0 5px white,
		    -10px 0 0 0 currentColor,
		    0 -10px 0 0 currentColor,
		    0 10px 0 0 currentColor,
		    10px 0 0 0 currentColor;
	}
	.frame-red {
	  	@extend %frame;
	  	color: tomato;
	}
	.frame-green {
	  	@extend %frame;
	  	color: forestgreen;
	}

## Utilisation avec SVG

Là aussi, le mot-clé peut être utilisé, et ce depuis la version 1.0. Vous pouvez l'utiliser sur les propriétés `fill`, `stroke`, `stop-color`, `flood-color`, et `lighting-color`.

## Un point sur la compatibilité des navigateurs

Au même titre que les valeurs `hsb()`, `hsba()` et `rgba()`, `currentColor` est compatible avec tous les navigateurs supportant CSS3, c'est à dire IE9 et plus, et tous les autres.

C'est à vous de jouer maintenant, simplifiez vos fichiers CSS !

## Liens
[Source](http://osvaldas.info/keeping-css-short-with-currentcolor)  
[Spécifications CSS 3 du W3C](http://www.w3.org/TR/css3-color/#currentcolor)  
[Spécifications SVG 1.0 du W3C](http://www.w3.org/TR/SVG/color.html#ColorProperty)  