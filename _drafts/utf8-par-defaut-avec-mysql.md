---
layout: post
title:  "Utiliser UTF8 par défaut avec MySQL"
date:   9999-99-99
tags:
- sql 
description: >
    Comment être sûr de dialoguer en UTF8 avec une base MySQL ?
--- 

## La base : la base

Avant de chercher à dialoguer en UTF8, il faut déjà s'assurer que la base elle même est encodée dans ce format. S'il s'agit d'une base existante, vous pouvez facilement vérifier son encodage avec la requête suivante :

    SELECT s.default_character_set_name 
    FROM information_schema.SCHEMATA s
	WHERE s.schema_name = "<database>";

Il faut savoir qu'il est possible de définir un charset différent pour une table, voire pour une colonne ! Vous pouvez vérifier que tout est bien paramétrer avec les deux requêtes suivantes :

	# Pour une table
	SELECT c.character_set_name 
	FROM information_schema.TABLES t
	JOIN information_schema.COLLATION_CHARACTER_SET_APPLICABILITY c 
	  ON c.collation_name = t.table_collation
	WHERE t.table_schema = "<database>"
	  AND t.table_name = "<table>";
	  
	# Pour une colonne
	SELECT c.character_set_name 
	FROM information_schema.COLUMNS c
	WHERE table_schema = "<database>"
	  AND table_name = "<table>"
	  AND column_name = "<column>";
	  
Pour les version de MySQL antérieures à la version 5, vous pouvez utiliser cette requête, un peu moins pratique :

    SHOW FULL COLUMNS FROM <table>;
    
## (suite)
    
	character-set-server=utf8    
	collation-server=utf8_unicode_ci

http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci

http://dev.mysql.com/doc/refman/5.0/en/charset-we-sets.html