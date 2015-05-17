---
layout: post
title:  "Les jointures en MySQL"
date:   2013-08-13
tags: 
- sql
description: >
  Aujourd'hui, ce sera une petite piqûre de rappel pour ceux qui aurait du mal avec les jointures en MySQL ! Notez bien que je parle de MySQL et pas d'un autre SGBD, car certaines fonctionnalités ne sont pas supportées (j'y reviendrai dans les notes de fin d'article). Voici donc pour vous un récapitulatif des différentes requêtes à utiliser sur deux tables liées.
---

## La création des tables de test

Premièrement, la petite requête qui va bien pour créer des tables de test (c'est un peu léger certes, mais ça suffit pour illustrer) :

	CREATE TABLE IF NOT EXISTS `a` (
		`id` varchar(50) CHARACTER SET utf8_unicode_ci NOT NULL,
		PRIMARY KEY (`id`)
	);
	INSERT INTO `a` (`id`) VALUES
	('A and B'),
	('A only');
	CREATE TABLE IF NOT EXISTS `b` (
		`id` varchar(50) CHARACTER SET utf8_unicode_ci NOT NULL,
		PRIMARY KEY (`id`)
	);
	INSERT INTO `b` (`id`) VALUES
	('B only'),
	('A and B');

## JOIN

{:.center}
![JOIN]({{ site.url }}/images/les-jointures-en-mysql/join.png)

La première et la plus simple : vous voulez récupérer les lignes ayant une correspondance dans les deux tables :

	SELECT *
	FROM a
	JOIN b
	ON a.id = b.id

## LEFT JOIN 

{:.center}
![JOIN]({{ site.url }}/images/les-jointures-en-mysql/left-join.png)

Vous voulez récupérer toutes les lignes de la table A, qu'elles aient ou non une correspondance dans la table B :

	SELECT *
	FROM a
	LEFT JOIN b
	ON a.id = b.id

## RIGHT JOIN

{:.center}
![JOIN]({{ site.url }}/images/les-jointures-en-mysql/right-join.png)

Vous voulez récupérer toutes les lignes de la table B, qu'elles aient ou non une correspondance dans la table A :

	SELECT *
	FROM a
	RIGHT JOIN b
	ON a.id = b.id

## LEFT JOIN WHERE y IS NULL

{:.center}
![JOIN]({{ site.url }}/images/les-jointures-en-mysql/left-join-null.png)

Vous voulez récupérer toutes les lignes de la table A n'ayant <b>pas</b> de correspondance dans la table B :

	SELECT *
	FROM a
	LEFT JOIN b
	ON a.id = b.id
	WHERE b.id IS NULL

## RIGHT JOIN WHERE x IS NULL

{:.center}
![JOIN]({{ site.url }}/images/les-jointures-en-mysql/right-join-null.png)

Vous voulez récupérer toutes les lignes de la table B n'ayant <b>pas</b> de correspondance dans la table A :

	SELECT *
	FROM a
	RIGHT JOIN b
	ON a.id = b.id
	WHERE a.id IS NULL

## UNION 

{:.center}
![JOIN]({{ site.url }}/images/les-jointures-en-mysql/union.png)

Vous voulez récupérer toutes les lignes des tables A et B, qu'elle aient ou non une correspondance

	SELECT * FROM a
	LEFT JOIN b ON a.id = b.id
	UNION
	SELECT * FROM a
	RIGHT JOIN b ON a.id = b.id

## Quelques notes

* `INNER JOIN` est un alias de `JOIN`
* `LEFT OUTER JOIN` est un alias de `LEFT JOIN`
* `RIGHT OUTER JOIN` est un alias de `RIGHT JOIN`
* `FULL OUTER JOIN` n'existe pas en MySQL, d'où la nécessité d'utiliser un `UNION` sur deux requêtes. Son utilisation reste toutefois assez rare
* Toute requête impliquant un `RIGHT JOIN` peut être réécrite avec des `LEFT JOIN` uniquement (en inversant l'ordre des tables particulièrement)
* `CROSS JOIN` permet de... non, n'utilisez pas `CROSS JOIN`

Toutes ces requêtes sont basiques et répondront à plus de 99% de vos besoins dans le développement web. Cela vaut plutôt le coup de les avoir en tête !

## Liens
[Documentation MySQL : la syntaxe de JOIN](http://dev.mysql.com/doc/refman/5.0/fr/join.html)

