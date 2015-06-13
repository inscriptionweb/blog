---
layout: post
title:  "Avoir une colonne auto-incrémentée dans une requête SELECT"
date:   2014-05-21
tags: 
- sql
description: >
  Comment avoir le numéro de chaque ligne de résultat d'une requête SQL dans une colonne ?
---

## Utiliser une variable utilisateur

Il suffit en effet d'utiliser une variable utilisateur, initialisée dans une sous-requête et incrémentée à chaque résultat avec l'opérateur `:=` :

	SELECT
		@counter := @counter + 1 as `#`,
		t.*
	FROM 
		my_table t
	JOIN 
		(SELECT @counter := 0) AS counter

Ce qui nous donne comme résultat :

	# | field_1 | field_2
	--|---------|---------
	1 | foo     | bar
	2 | foo     | baz
	3 | bar     | baz
	4 | qux     | foo

## Liens
[Les variables utilisateur en MySQL](http://dev.mysql.com/doc/refman/5.0/fr/variables.html)   