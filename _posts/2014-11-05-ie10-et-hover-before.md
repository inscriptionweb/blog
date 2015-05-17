---
layout: post
title:  "IE10 et :hover:before"
date:   2014-11-05
tags: 
- css
description: >
  Comment utiliser le sélecteur CSS <code>:hover:before</code> avec IE10 ?
---

## Le problème

Je pars du principe que vous connaissez les pseudo-éléments `:before` en CSS.  
Prenons le code suivant :

	* {
		background: tomato;
		box-sizing: border-box;
		height: 100%;
		margin: 0;
	}
	body:hover:before {
		background: limegreen;
		content: '';
		display: block;
		height: 100%;
	}

D'abord, on utilise un rouge pour toutes les couleurs de fond. Lorsqu'on survole la balise `<body>`, on lui ajoute un pseudo-élément `:before` avec un fond vert. L'exemple ne sert absolument à rien, c'est une simple illustration du problème. Ce code fonctionnera bien sous n'importe quel navigateur, mais pas sous IE10 (inutile de tester un IE11 en mode compatibilité, il faut un vrai IE10 pour reproduire le bug).

## La solution

Pour pouvoir utiliser le sélecteur `:hover:before`, il va simplement vous falloir définir un sélecteur `:hover` plus tôt dans le fichier CSS :

	* {
		background: tomato;
		box-sizing: border-box;
		height: 100%;
		margin: 0;
	}
	body:hover {
		/* Fix IE10 :hover:before issue */
	}
	body:hover:before {
		background: limegreen;
		content: '';
		display: block;
		height: 100%;
	}

Rien d'autre.

## Liens

[Spécifications W3C sur les pseudos-éléments](http://www.w3.org/TR/2011/REC-CSS2-20110607/selector.html#before-and-after)