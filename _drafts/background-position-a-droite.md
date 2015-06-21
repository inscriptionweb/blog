---
layout: post
title:  "Positionner un background par la droite en CSS"
date:   2015-01-01
tags:
- css 
description: >
  Quand on utilise background-position on se base toujours sur le coin supérieur gauche, mais il est possible de faire autrement depuis CSS3.
--- 

## L'ancienne syntaxe

Avant CSS3, la propriété `background-position` n'acceptait que 1 ou 2 valeurs :

- le positionnement/décalage du background par rapport au côté gauche
- le positionnement/décalage du background par rapport au côté supérieur

On avait alors ce genre de définitions, qui sont d'ailleurs toujours aujourd'hui les plus courantes :

    background-position: center center;
    background-position: left top;
    background-position: right center;
    background-position: 25px center;
    background-position: 50% top;

Pour centrer verticalement un background, et le caler du côté droit, on utilisait donc la définition suivante :

    background-position: right center;

En revanche, il était par exemple impossible de décaler ce background de 10px vers la gauche (tout en le maintenant calé à droite). Ce décalage n'était en effet possible qu'en se basant sur le coin supérieur gauche :

    background-position: 10px center; /* décalage de 10px à partir de la gauche */

Le seul moyen d'avoir ce décalage était alors d'ajouter à la main une marge de 10px dans l'image destinée au background.

## La nouvelle syntaxe

Cette limitation n'ayant pas vraiment de raison d'être, CSS3 nous a amené dans ses bagages une extension de la syntaxe à 3 ou 4 valeurs. Vous pouvez ainsi spécifier le côté de référence, suivi du décalage voulu. L'exemple précédent serait ainsi défini ainsi :

    background-position: right 10px center;


## Liens

[Spécification CSS3 de la propriété background-position](http://dev.w3.org/csswg/css-backgrounds-3/#background-position)  
[La propriété background-position sur le MDN](https://developer.mozilla.org/fr/docs/Web/CSS/background-position)  
[Page CanIUse de la propriété](http://caniuse.com/#feat=css-background-offsets)  