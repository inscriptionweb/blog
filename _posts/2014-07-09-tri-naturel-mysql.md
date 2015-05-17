---
layout: post
title:  "Le tri naturel en MySQL"
date:   2014-07-09
tags: 
- sql
description: >
  Comment utiliser le tri naturel en MySQL ?
---

## Qu'est-ce que le tri naturel ?

Il existe différentes manières de trier une liste d'élément : par ordre alphabétique, par longueur de chaîne... 
Le tri naturel est tout simplement le plus instinctif de tous, celui qu'un humain utiliserait "naturellement". 

Nous prendrons ces quelques nombres (volontairement dans le désordre) pour les exemples qui vont suivre : 

	100 / 2 / 1 / 10 / 101 / 12 / 102 / 3 / 11

## L'ordre utilisé par MySQL

Dans vos requêtes, vous utilisez la clause `ORDER BY` :

	SELECT *
	FROM nombres
	ORDER BY nombre ASC

	# Result :
	# 1 / 10 / 100 / 101 / 102 / 11 / 12 / 2 / 3

Cette clause utilise l'ordre alphabétique, et vous pouvez lui ajouter les mots-clés `ASC` ou `DESC` pour définir le sens du tri.  
Le problème ici, c'est par exemple que `2` va venir **après** `10` uniquement parce que MySQL traite les valeurs comme des chaînes de caractères, et que `2 > 1`. Le tri par ordre alphabétique n'est donc pas satisfaisant pour les nombres.

## Un premier essai avec CAST et UNSIGNED

Pour avoir un tri naturel, il va falloir ruser. Nous allons forcer MySQL à considérer nos valeurs comme des nombres :

	SELECT *
	FROM nombres
	ORDER BY CAST(nombre AS UNSIGNED) ASC

	# Result :
	# 1 / 2 / 3 / 10 / 11 / 12 / 100 / 101 / 102

Voilà qui fonctionne plutôt bien ! Mais des problèmes surviennent assez vite : 

- les nombres décimaux
- les nombres négatifs

Prenons un nouveau jeu d'essai :

	100 / -0.1 / 10.1 / 1 / 10 / 10.2 / -101 / 12 / -102 / 10.10 / 3 / 11 / -0.2

Si nous appliquons la technique actuelle, voici le résultat :
	
	# Result :
	# -0.1 / -0.2 / 1 / 3 / 10.2 / 10.1 / 10.10 / 10 / 11 / 12 / 100 / -102 / -101

On remarque que :

- les nombre négatifs ne sont pas du tout reconnus
- les nombres décimaux ne sont pas triés 

## Affinage 

Plutôt que d'utiliser `UNSIGNED` (pour les numériques non signés), on va déjà changer pour `SIGNED`, ce qui permettra à MySQL de prendre en compte les virgules et de résoudre notre premier problème :

	SELECT *
	FROM nombres
	ORDER BY CAST(nombre AS SIGNED) ASC

	# Result :
	# -102 / -101 / -0.1 / -0.2 / 1 / 3 / 10 / 10.2 / 10.10 / 10.1 / 11 / 12 / 100

Pour les nombres décimaux, on va appliquer le même principe en utilisant le type `DECIMAL` :

	SELECT *
	FROM nombres
	ORDER BY CAST(nombre AS SIGNED), CAST(nombre AS DECIMAL(5,2))

	# Result :
	# -102 / -101 / -0.2 / -0.1 / 1 / 3 / 10 / 10.1 / 10.10 / 10.2 / 11 / 12 / 100

Le type `DECIMAL` prend deux paramètres :

- la **précision** : le nombre maximal de chiffres (`-` et `,` exclus)
- l'**échelle** : le nombre de décimales (après la virgule)

Cette méthode pose des limites : on ne pourra traiter que les nombres contenus entre -999.99 et 999.99 (à vous de définir ces limites selon vos besoins), mais c'est une méthode est propre et fiable, car on s'assure que MySQL compare bien des décimaux signés (çad. qui peuvent être négatifs), et non plus de simples chaînes de caractères.

## Liens

[La clause ORDER BY en MySQL](http://dev.mysql.com/doc/refman/5.0/fr/sorting-rows.html)  
[Les types numériques en MySQL](http://dev.mysql.com/doc/refman/5.0/fr/numeric-types.html)  
[Les fonctions de transtypage en MySQL](http://dev.mysql.com/doc/refman/5.0/fr/cast-functions.html)  