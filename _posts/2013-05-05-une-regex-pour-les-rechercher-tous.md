---
layout: post
title:  "Une regex pour les rechercher tous..."
date:   2013-05-05
tags: 
- regex
- sublime-text
description: >
  Une Regex pour les rechercher tous.<br>  
  Une Regex pour les trouver.<br>
  Une Regex pour les remplacer tous et dans les ténèbres les lier.
---

Aujourd'hui, c'est regex !   
Mais si, mais si, je sais bien que vous adorez ça...

{:.center}
![PERL Problems](http://imgs.xkcd.com/comics/perl_problems.png)

Je trouve la fonction de recherche de Sublime Text bien fichue. D'une parce qu'elle est complète -encore heureux dans un éditeur ; de deux parce que les portions de codes capturées, qui seront modifiées, sont instantanément mises en avant. C'est tout bête, mais tellement pratique lorsque vous vous attaquez à la recherche par regex.   
Quand on commence à avoir besoin d'une regex, c'est qu'on veut remplacer pas mal de choses. J'en utilise assez régulièrement dans divers cas :

* nettoyer des fichiers d'imports 
* passer un CSV en XML sans forcément mettre en place un convertisseur
* faire des opérations sur des listes
* ...

Attention, soyons clairs malgré tout : la regex est puissante, donc la regex est dangereuse.   
Comme la plupart des gens ne maîtrisent pas complètement les regex, cette technique peux rapidement conduire à des pertes de donnés massives. Je vous conseille donc d'avoir des sauvegardes lorsque vous travaillez sur des fichiers sensibles. 

Passons à la pratique !

## La regex de base
Ici rien de complexe, c'est surtout pour vous présenter l'interface. Notez les options en bas, dans l'ordre :

* Mode regex [activé]
* Sensible à la casse [activé]
* Mot complet [désactivé]
* Sens de recherche inversé [désactivé]
* Recherche sur tout le fichier [activé]
* Recherche dans la sélection [désactivé]
* Mettre en avant les portions capturées [activé]

{:.center}
![La regex de base]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex01.jpg)

## La regex est sensible à la casse

Pa défaut, une regex est sensible à la casse. Je laisse volontairement l'option de Sublime Text active pour ne pas que ça interfère.

{:.center}
![La regex est sensible à la casse]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex02.jpg)

## Les modifiers

Il est possible de rendre votre regex insensible à la casse en lui ajoutant le modifier `(?i)` (i pour insensitive) :

{:.center}
![Le modifier insensitive]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex03.jpg)

Un modifier n'a d'effet que sur la partie de la regex qui se trouve à sa droite. Il est du coup possible d'ajouter des modifiers au milieu de votre regex. Un exemple ci-dessous où je rend une portion de ma regex insensible à la casse :

{:.center}
![Les modifiers agissent à droite]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex04.jpg)

Dans ces cas, et afin d'éviter d'écrire deux modifiers à chaque fois, vous pouvez utiliser la syntaxe des modifier spans :

{:.center}
![Les modifiers spans]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex05.jpg)

## La sélection multi-ligne

Voici deux exemples pour introduire un second modifier. Tentons de récupérer toutes les balises `li` :

{:.center}
![La sélection multi-ligne - 01]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex06.jpg)

On modifie légèrement la regex pour capturer aussi les balises avec une(des) classe(s) :

{:.center}
![La sélection multi-ligne - 02]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex07.jpg)

Faisons la même chose à présent avec les balises `ul` :

{:.center}
![La sélection multi-ligne - 03]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex08.jpg)

Il semble que ça fonctionne moins bien... Ce problème est dû au fait que vos balises `ul` s'étendent sur plusieurs lignes. Par défaut, le caractère `.` ne capture pas les retours à la ligne. Pour activer cette option, il va falloir utiliser le modifier `(?s)` (s pour single-line) :

{:.center}
![Le modifier single-line]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex09.jpg)

## Les regex gourmandes (greedy regex)

On peut voir dans le dernier exemple que la regex va capturer tout le code qui se trouve entre la première occurrence de `<ul>`, et la dernière de `</ul>`. 
Ces regex, qui capturent le maximum de données possibles, sont appelées **gourmandes** (**greedy** en anglais). C'est le comportement par défaut d'une regex. Pour forcer un groupe à capturer le minimum de données possibles, on va utiliser un `?` à la fin de notre groupe :

{:.center}
![Les regex gourmandes]({{ site.url }}/images/une-regex-pour-les-rechercher-tous/regex10.jpg)

Avec ces quelques outils, vous avez les moyens de modifier vos fichiers massivement et rapidement. 

## Résumé

	foo(?i)bar         //sensible à la casse : foo
	foo(?-i)bar        //sensible à la casse : foo, bar
	foo(?i)bar(?-i)baz //sensible à la casse : foo, baz
	foo(?i:bar)baz     //sensible à la casse : foo, baz

	/*
	* capture tout le contenu
	* entre la première occurrence <foo>
	* et la dernière occurrence de </foo>
	* sur une seule ligne
	*/
	<foo>(.*)</foo>
	/*
	* capture tout le contenu
	* entre la première occurrence <foo>
	* et l'occurrence de </foo> la plus proche
	* sur une seule ligne
	*/
	<foo>(.*?)</foo>
	/*
	* capture tout le contenu
	* entre la première occurrence <foo>
	* et la dernière occurrence de </foo>
	* sur plusieurs lignes
	*/
	(?s)<foo>(.*)</foo>
	/*
	* capture tout le contenu
	* entre la première occurrence <foo>
	* et l'occurrence de </foo> la plus proche
	* sur plusieurs lignes
	*/
	(?s)<foo>(.*?)</foo>

## Liens
[XKCD : Perl Problems](http://xkcd.com/1171/)   
[Un testeur de Regex](http://lumadis.be/regex/test_regex.php?lang=fr)   
[Un autre testeur de Regex, visuel ce coup-ci, qui peut aider à mieux comprendre](http://www.regexper.com/)   
[Site complet sur les regex, avec exemples à l'appui](http://www.regular-expressions.info/)   
[Site officiel de la librairie PCRE](http://www.pcre.org/)   
[Documentation PCRE](http://php.net/manual/fr/book.pcre.php)   