---
layout: post
title:  "La fonction GROUP_CONCAT en MySQL"
date:   2015-01-15
tags: 
- sql
description: >
  Connaissez-vous la fonction <code>GROUP_CONCAT</code> en MySQL ?
---

## Présentation

Cette fonction permet de concaténer les valeurs non nulles d'un groupe. Ok... c'est un peu abstrait.  
Prenons-donc un modèle de relation `1..*` courant pour cette présentation : Livre ~ Catégorie.

{:.center}
![La relation 1..*]({{ site.url }}/images/group-concat-mysql/relation-1-n.png)

Voici de quoi avoir une base de test de votre côté :

    CREATE TABLE livre (`id` int, `titre` varchar(50));
    INSERT INTO livre (`id`, `titre`)
    VALUES (1, 'Le Seigneur des Anneaux'),
           (2, 'Alice aux Pays des Merveilles');

    CREATE TABLE categorie (`id` int, `libelle` varchar(50));
    INSERT INTO categorie (`id`, `libelle`)
    VALUES (1, 'Fantastique'),
           (2, 'Aventure'),
           (3, 'Enfant'),
           (4, 'Médiéval');

    CREATE TABLE livrecategorie (`id_livre` int, `id_categorie` int);
    INSERT INTO livrecategorie (`id_livre`, `id_categorie`)
    VALUES (1, 1),
           (1, 2),
           (1, 4),
           (2, 1),
           (2, 3);

Ici, je vais récupérer l'ensemble des catégories pour chaque livre :

    SELECT l.titre AS livre, 
           c.libelle AS categorie
    FROM livre l
    LEFT JOIN livrecategorie lc ON lc.id_livre = l.id
    LEFT JOIN categorie c ON lc.id_categorie = c.id;

<!-- -->

    #-------------------------------#-------------#
    # LIVRE                         # CATEGORIE   #
    #-------------------------------#-------------#
    # Le Seigneur des Anneaux       # Fantastique #
    # Le Seigneur des Anneaux       # Aventure    #
    # Le Seigneur des Anneaux       # Médiéval    #
    # Alice aux Pays des Merveilles # Fantastique #
    # Alice aux Pays des Merveilles # Enfant      #
    #-------------------------------#-------------#

Si on ne veut qu'une seule ligne par livre, il va falloir utiliser un `GROUP BY`. Oui mais...

    SELECT l.titre AS livre, 
           c.libelle AS categorie
    FROM livre l
    LEFT JOIN livrecategorie lc ON lc.id_livre = l.id
    LEFT JOIN categorie c ON lc.id_categorie = c.id
    GROUP BY l.id;

<!-- -->

    #-------------------------------#-------------#
    # LIVRE                         # CATEGORIE   #
    #-------------------------------#-------------#
    # Le Seigneur des Anneaux       # Fantastique #
    # Alice aux Pays des Merveilles # Fantastique #
    #-------------------------------#-------------#

On ne récupère en effet que la première ligne pour chaque livre. L'idéal serait de regrouper toutes les valeurs de `c.libelle` pour un même `l.id`, et de les concaténer.  
C'est précisément le rôle de `GROUP_CONCAT`, donc voici un exemple :

    SELECT l.titre AS livre, 
           GROUP_CONCAT(c.libelle) AS categories
    FROM livre l
    LEFT JOIN livrecategorie lc ON lc.id_livre = l.id
    LEFT JOIN categorie c ON lc.id_categorie = c.id
    GROUP BY l.id;

<!-- -->

    #-------------------------------#-------------------------------#
    # LIVRE                         # CATEGORIES                    #
    #-------------------------------#-------------------------------#
    # Le Seigneur des Anneaux       # Fantastique,Médiéval,Aventure #
    # Alice aux Pays des Merveilles # Enfant,Fantastique            #
    #-------------------------------#-------------------------------#

## Paramétrer la concaténation

Vous pouvez choisir de trier les résultats avec `ORDER BY` :

    SELECT l.titre AS livre, 
           GROUP_CONCAT(c.libelle ORDER BY c.libelle) AS categories
    FROM livre l
    LEFT JOIN livrecategorie lc ON lc.id_livre = l.id
    LEFT JOIN categorie c ON lc.id_categorie = c.id
    GROUP BY l.id;

<!-- -->

    #-------------------------------#-------------------------------#
    # LIVRE                         # CATEGORIES                    #
    #-------------------------------#-------------------------------#
    # Le Seigneur des Anneaux       # Aventure,Fantastique,Médiéval #
    # Alice aux Pays des Merveilles # Enfant,Fantastique            #
    #-------------------------------#-------------------------------#

Ou bien changer le caractère de séparation avec `SEPARATOR` :

    SELECT l.titre AS livre, 
           GROUP_CONCAT(c.libelle SEPARATOR ' / ') AS categories
    FROM livre l
    LEFT JOIN livrecategorie lc ON lc.id_livre = l.id
    LEFT JOIN categorie c ON lc.id_categorie = c.id
    GROUP BY l.id;

<!-- -->

    #-------------------------------#-----------------------------------#
    # LIVRE                         # CATEGORIES                        #
    #-------------------------------#-----------------------------------#
    # Le Seigneur des Anneaux       # Fantastique / Médiéval / Aventure #
    # Alice aux Pays des Merveilles # Enfant / Fantastique              #
    #-------------------------------#-----------------------------------#

Ou encore supprimer les doublons avec `DISTINCT`. On cherche ici à récupérer toutes les catégories liées à au moins un livre, mais sans avoir de doublons dans les résultats

    # Sans DISTINCT
    SELECT GROUP_CONCAT( c.libelle) AS categories
    FROM livre l
    LEFT JOIN livrecategorie lc ON lc.id_livre = l.id
    LEFT JOIN categorie c ON lc.id_categorie = c.id;

    # Avec DISTINCT
    SELECT GROUP_CONCAT(DISTINCT c.libelle) AS categories
    FROM livre l
    LEFT JOIN livrecategorie lc ON lc.id_livre = l.id
    LEFT JOIN categorie c ON lc.id_categorie = c.id;

<!-- -->

    #--------------------------------------------------#
    # CATEGORIES                                       #
    #--------------------------------------------------#
    # Fantastique,Aventure,Médiéval,Fantastique,Enfant #
    #--------------------------------------------------#

    #--------------------------------------#
    # CATEGORIES                           #
    #--------------------------------------#
    # Fantastique,Aventure,Médiéval,Enfant #
    #--------------------------------------#

À présent, à vous de jouer pour trouver d'autres applications utiles !

## Liens

[Documentation sur les fonctions avec GROUP BY](http://dev.mysql.com/doc/refman/5.0/fr/group-by-functions.html)