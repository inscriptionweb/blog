---
layout: post
title:  "Un correcteur orthographique FR pour Sublime Text"
date:   2013-06-07
update: 2014-06-17
tags: 
- sublime-text
description: >
  Le correcteur orthographique est une fonctionnalité qui peut être utile de temps à autres. Par défaut, seuls les dictionnaire ***English US*** et ***Enlish EN*** sont installés. Voici comment ajouter rapidement un dictionnaire français.
---

## 1/ Récupérez l'ensemble des dictionnaires

Vous pouvez directement télécharger une archive contenant de multiples dictionnaires à partir du repository SublimeText sur Github : [https://github.com/SublimeText/Dictionaries/](https://github.com/SublimeText/Dictionaries/)

## 2/ Gardez celui dont vous avez besoin

Extrayez l'archive, et isolez le ou les dictionnaires dont vous avez besoin. Dans notre cas, nous mettons de côté les fichiers ***French.aff*** et ***French.dic***.

## 3/ Créez un nouveau package

Afin de rendre accessible ce dictionnaire, créez un nouveau package pour l'y placer. Pour Windows : 

***Sublime Text 2*** :  

	C:/Users/ID/AppData/Roaming/Sublime Text 2/Packages/Language - French/

***Sublime Text 3*** : 
	
	C:/Users/ID/AppData/Roaming/Sublime Text 3/Packages/Language - French/

Copiez/Collez les 2 fichiers (par dictionnaires) dans ce répertoire.

## 4/ Activez le dictionnaire dans Sublime Text

Il ne reste plus qu'à utiliser le dictionnaire installé : 

***View > Dictionnary > Language - French > French***

Vous pouvez désormais rapidement activer/désactiver le correcteur via la touche <kbd>F6</kbd> (par défaut).

## Liens
[Spell Checking - Sublime Text 2 Documentation](http://www.sublimetext.com/docs/2/spell_checking.html)   
[Repository Github de Sublime Text](https://github.com/SublimeText/)   