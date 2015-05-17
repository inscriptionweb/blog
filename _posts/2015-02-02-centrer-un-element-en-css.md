---
layout: post
title:  "Centrer un élément en CSS"
date:   2015-02-02
tags: 
- css
- sass
description: >
  Ah... l'éternelle question du centrage vertical en CSS...
---

## Article tripartite condensé

Rentrons directement dans le vif du sujet, je vais vous présenter le code que j'utilise aujourd'hui, pour **centrer horizontalement et verticalement** n'importe quel bloc, dans n'importe quelle situation. J'inclue ce code dans un placeholder Sass (voir mon article sur [OOSCSS](http://blog.smarchal.com/oocss-et-ooscss) pour des exemples d'utilisation des placeholders), mais vous pouvez l'utiliser en CSS tout aussi simplement.

    %centered-box {
    	position: absolute;
    	left: 50%;
    	top: 50%;
    	-webkit-transform-origin: center center;
    	-webkit-transform: translate(-50%, -50%);
    	transform: translate(-50%, -50%);
    }

Tout d'abord, j'utilise `position: absolute` pour positionner mon élément au centre de son parent. Notez qu'il vous faudra (comme toujours) définir une position sur le parent (probablement relative) afin que l'élément centré ait un parent de référence. Le problème de la propriété `position` est qu'il décale notre élément sans tenir compte de sa propre taille. On se retrouve alors avec le coin supérieur gauche de notre élément parfaitement centré, mais pas l'élément lui-même. Voici l'état initial de l'élément :

	%centered-box {

    }

{:.center}
![Position initiale]({{ site.url }}/images/centrer-un-element-en-css/initial.jpg)

Et son état après l'utilisation d'une position absolute :

	%centered-box {
    	position: absolute;
    	left: 50%;
    	top: 50%;
    }

{:.center}
![Position absolue]({{ site.url }}/images/centrer-un-element-en-css/absolute.jpg)

On constate que le décalage vers la gauche est égale à la moitié de la largeur de l'élement. Même chose avec le décalage vers le bas, qui est égal à la moitié de la hauteur de l'élément. Pour corriger tout ça, il est temps d'utiliser la propriété `transform` avec la fonction `translate()` :

	%centered-box {
    	position: absolute;
    	left: 50%;
    	top: 50%;
    	transform: translate(-50%, -50%);
    }

{:.center}
![Élément centré]({{ site.url }}/images/centrer-un-element-en-css/centered.jpg)

On indique ici à la fonction de décaler notre élément de "50%" vers la gauche et le haut. Là où c'est intéressant, c'est que ce pourcentage est relatif à la taille de l'élément, **quelle qu'elle soit**. Qu'il s'agisse d'une taille fixée ou non, 100% représenteront toujours la taille rendue, visible à l'écran. 

Cette méthode est la plus générique qui soit, et fonctionnera dans tous les cas de figure !

Enfin, dès que vous utilisez la propriété `transform`, il faut penser à la compatibilité entre navigateurs. Pensez dons à bien ajouter deux choses :

- la version préfixée de `-webkit-`
- la règle `-webkit-transform-origin: center center` (Safari à besoin qu'on fixe explicitement l'origine de la transformation)

Vous n'avez plus à présent qu'à l'utiliser autant qu'il le faudra !

	.popup {
		@extend %centered-box;
	}
