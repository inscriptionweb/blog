---
layout: post
title:  "RedBeanPHP : un ORM agile"
date:   2013-07-25
tags: 
- sql
- php
description: >
  Présentation d'un ORM agile : RedBeanPHP
---

## Vous avez dit ORM ?

Petite introduction pour ceux qui ne connaîtraient pas le principe d'un Object-Relational Mapping.   
Les bases de données que nous utilisons aujourd'hui sont des BDD relationelles : l'information stockée en base est décomposée, et il existe des relations (clé étrangères) pour lier cette information. Face à cela, nous utilisons des langages pour la plupart orientés objet.   
Le but d'un ORM est de fournir une passerelle permettant de manipuler une BDD relationnelle de la même manière que nous manipulons des objets.

Plutôt que d'écrire une requête (MySQL ici) pour mettre à jour le titre d'un livre :

	UPDATE `book` 
	SET `title` = "Applied Cryptography" 
	WHERE `id` = 1

Nous utiliserons du code orienté objet (code générique) :

	$book = Books::get(1);
	$book->title = 'Applied Cryptography';
	$book->update();

On trouve peu d'intérêt dans cet exemple simple, mais c'est dès qu'on commence à toucher aux relations entre objets que la force des ORM se fait sentir.

## Pourquoi RedBeanPHP ?

Il existe de nombreux ORM pour PHP, dont les plus connus Doctrine et Propel. Chacun a ses avantages, mais de façon générale les ORM sont assez poussés et nécessitent un temps d'apprentissage et de mise en place non négligeable. 
Voici les bon côté de RedBeanPHP que je retiendrait :

* Il utilise une unique classe : `rb.php`
* Il fonctionne avec MySQL, PostgreSQL, SQLite (et en théorie MariaDB)
* Il ne requiert quasi aucune configuration (si ce n'est la chaîne de connexion)
* Il fait évoluer la BDD si besoin (un INT peut très bien devenir un VARCHAR)
* Il est extrêmement rapide à prendre en main (5 minutes chrono pour faire ses premiers tests)
* Il est activement maintenu (commits quotidiens)

**A noter que RedBeanPHP requiert l'utilisation d'InnoDB.**

## Installation

Que dire... passez télécharger RedBeanPHP sur son site officiel, et ajoutez le à votre projet :

	require_once('rb.php');

## Configuration

Dire que RedBeanPHP ne requiert aucune configuration est en partie faux. Il est effectivement capable de créer une base de donnée à la volée sans qu'on ne lui précise le moindre identifiant, mais dans la grande majorité des cas vous aurez à fournir une chaîne de connexion vers votre BDD, à la manière de PDO :

	R::setup('mysql:host=localhost;dbname=redbeantest','root','');

Pour terminer la connexion, on utilisera le simplissime :

	R::close();

Il est aussi recommandé d'activer le cache de requêtes (`query_cache`), qui permet d'éviter de refaire la même requête MySQL si rien n'a été modifié entre temps :

	R::$writer->setUseCache(true);

## Utilisation de base

Je reprends tout d'abord l'exemple donné plus haut dans cet article, en l'adaptant à RedBeanPHP :

	$book = R::dispense('book'); // on crée un livre
	$book->title = 'Applied Cryptography'; // on lui donne un titre
	R::store($book); // on le sauvegarde en BDD

Là est toute la force de RedBeanPHP : inutile de vérifier si la colonne `title` est bien paramétrée, ni même si la table `book` existe !
Il va tout créer/adapter à la volée : tables, colonnes, clés primaires et étrangères, tables de liaisons... <strong>Vous n'avez a-bso-lu-ment rien à gérer de ce côté.</strong>

## La relation one-to-many

Poussons notre exemple un peu plus loin en ajoutant un auteur à notre livre :

	$author = R::dispense('author'); 
	$author->firstname = 'Bruce';
	$author->lastname = 'Schneier';
	R::store($author);
	
	$book = R::load('book', 1); // on récupère le Book avec l'id = 1
	$book->ownAuthor = $author; // on lui ajoute un auteur
	R::store($book);

Dans une relation one-to-many, on utilisera la fonction `ownModel`. Notre modèle en question, c'est `Book` (on reprend la valeur passée à la fonction `dispense()`).

## La relation many-to-many

Encore un peu plus poussé, ajoutons à présent des thème. Nous pourrons avoir plusieurs thèmes pour un même livre, et vice versa :

	$theme1 = R::dispense('theme');
	$theme1->label = 'Science';
	R::store($theme1);

	$theme2 = R::dispense('theme');
	$theme2->label = 'Computer Science';
	R::store($theme2);

	$book = R::load('book', 1);
	$book->sharedTheme = array($theme1, $theme2); // on ajoute plusieurs thèmes
	R::store($book);

Dans une relation many-to-many, on utilisera la fonction `sharedModel`. Même principe que précédemment, on l'utilisera sur tel ou tel modèle selon le cas.

## Le SELECT

Les requêtes SELECT sont généralement les plus nombreuses, voici comment en faire une à partir de la base précédemment créée :

	// récupère tous les thèmes et les ordonne
	$themes = R::findAll('theme', ' ORDER BY label '); 
	// récupère les auteurs dont le nom de famille est Schneier
	$authors = R::find('author', ' lastname = "Schneier" '); 
	// on récupère le premier livre dont l'auteur est Bruce Schneier
	$book = R::findOne('book', ' ownAuthor_id = ? ', array($author->id)); 

## Passage en production

Avoir une BDD qui évolue au fur et à mesure, c'est pratique quand on développe. C'est le côté agile de RedBeanPHP, qui permet de coder sans forcément connaître le schéma complet de la BDD. Cette évolutivité à un coût : l'ORM vérifie systématiquement la structure des tables concernées. On a donc une perte de temps non négligeable sur nos requêtes. Une fois le projet passé en production, il est possible de désactiver ce "fluid mode", en le gelant :

	R::freeze(true);

Rien d'autre ne change dans le code, mais la structure de la BDD est désormais considérée comme fixe, et RedBeanPHP ne cherchera pas à la modifier.

## Allez plus loin...

Je vous ai ici présenté les bases de RedBeanPHP, ce que vous utiliserez tous les jours. Voici quelques points que vous pourrez approfondir sur le site officiel :

* Auto-référence dans les relations (ex: Category-Category)
* Utilisation de requêtes SQL écrites à la main
* Pré-définition des objets à récupérer (pour utiliser un JOIN à la place de requêtes multiples)
* Création de modèles pour une couche métier
* Création de fonctions personnalisées dans les modèles (override de getters...)
* Duplication d'un bean (= objet)
* Importation/Exportation de beans
* Mode DEBUG
* ...

## Liens
[RedBeanPHP - site officiel](http://redbeanphp.com/)   
[RedBeanPHP sur Github](https://github.com/gabordemooij/redbean)   
[Propel - site officiel](http://propelorm.org/)   
[Doctrine - site officiel](http://www.doctrine-project.org/)   