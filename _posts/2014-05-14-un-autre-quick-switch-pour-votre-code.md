---
layout: post
title:  "Un autre quick-switch pour votre code"
date:   2014-05-14
tags: 
- php
- js
- sass
description: >
  J'avais déjà parlé d'un premier quick-switch dans un article de 2013, en voici un autre plus compressé que j'ai découvert tout récemment.
---

Article précédent : [Switcher rapidement entre deux blocs de CSS](http://blog.smarchal.com/switcher-rapidement-entre-deux-blocs-de-css)

## Bloc 1 actif :

	<?php
	//*

	// DEV
	$config['db'] = array(
		'host': 'localhost',
		'name': 'localdb',
		'user': 'root',
		'pass': ''
	);

	/*/

	// PROD
	$config['db'] = array(
		'host': 'localhost',
		'name': 'remotedb',
		'user': 'admin',
		'pass': 'passweird'
	);

	/**/
	?>

## Bloc 2 actif :

	<?php
	/*

	// DEV
	$config['db'] = array(
		'host': 'localhost',
		'name': 'localdb',
		'user': 'root',
		'pass': ''
	);

	/*/

	// PROD
	$config['db'] = array(
		'host': 'localhost',
		'name': 'remotedb',
		'user': 'admin',
		'pass': 'passweird'
	);

	/**/
	?>

Ici, le switch se fait en ajoutant un slash au début de la première ligne. Celui-ci *ne fonctionne pas avec du CSS* (à cause de l'utilisation des commentaires sur une ligne `//`), mais avec PHP, SASS, JS, C, C++, C#, Java...  
Notez qu'il est possible d'insérer des commentaires sur une ligne à l'intérieur de ces blocs, sans affecter le switch.

## Liens
[Un autre quick-switch](http://blog.smarchal.com/switcher-rapidement-entre-deux-blocs-de-css)   