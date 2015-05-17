---
layout: post
title:  "Générer des mots de passe"
date:   2013-04-08
tags:
- js
- php 
description: >
  Comment générer simplement un mot de passe ?
--- 

## Générer un mot de passe aléatoire

La méthode à laquelle on pensera en premier, et par la même celle qu'on retrouvera un peu partout sur le net, sera de définir un charset et d'y piocher n caractères aléatoirement. Voici une petite fonction qui met en pratique cette technique (exemple en PHP) :

	function generate($length = 8) {
		$charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		$password = '';
		for ($i = 0; $i < $length; $i++) {
			$index = rand(0, strlen($charset) - 1); 
			$password .= substr($charset, $index, 1); 
		}
		return $password;
	}
	echo generate(12); // Tht3pT8uyNzf 

Cette fonction, si elle paraît évidente, est malgré tout très fiable car elle ne génère que de très rares doublons. 

## Générer un mot de passe aléatoire à partir d'une seed

Si la génération de mots de passe aléatoire est très simple à mettre en place, ce n'est pas forcément le cas quand on veut partir d'une seed. 

Quand je parle de seed (graine), je parle d'une chaîne de caractères d'origine qui générera toujours le même mot de passe. Ce type de génération n'est pas simple à mettre en place car il faut respecter quelques règles évidentes de sécurité :

- ne pas pouvoir retrouver la seed à partir du mot de passe
- ne pas avoir trop de doublons dans les mots de passe
- ne pas avoir de mots de passe trop simples

Voici une solution que je propose. Celle-ci n'est pas parfaite, disons qu'elle satisfait à mes trois attentes, et reste simple à mettre en place :

	function generate($seed, $length = 8) {
		return substr(base64_encode(sha1($seed . 'salt')), 0, $length);
	}
	echo generate('mypassword', 12); // ZTg2ODFkNTIy 

Le principe est de récupérer le sha1 de la seed (en y ajoutant un salt fixe pour éviter l'utilisation de hashtables), puis de l'encoder en base 64. Cette base utilise le charset suivant : `[a-zA-Z+/]`


## Liens :
[L'opérateur modulo - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#.25_.28Modulus.29)   