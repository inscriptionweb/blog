---
layout: post
title:  "JS et debounce"
date:   2015-08-03
tags:
- js 
description: >
  La bonne pratique du jour : utiliser un debounce pour les événements à fort taux de déclenchement
--- 

## L'événement resize et les performances

L'utilisation de l'événement `resize` est assez courante en JavaScript. On va par exemple s'en servir pour mettre à jour des layouts complexes, des éléments SVG en pleine page ou encore une scène WebGL. Quelque soit le cas, l'opération devient extrêmement coûteuse dès lors qu'elle implique une modification du DOM. 

Prenons cet exemple, qui vise à adapter la taille d'un SVG à la taille de l'écran, y compris lors d'un redimensionnement de la fenêtre :

    var svg = document.querySelector('#mysvg');

    function draw() {
        svg.setAttribute('height', window.innerHeight);
        svg.setAttribute('width', window.innerWidth);
        /* ... */
    }
    window.addEventListener('resize', draw);

L'événement va se déclencher de multiples fois, et ce très rapidement. Chaque déclenchement va provoquer un redimensionnement de notre SVG. C'est ici peu gourmand en ressources, mais imaginez bien qu'on ne fera pas **que** redimensionner le SVG, on recalculera aussi le positionnement et/ou la taille de son contenu. Ce taux de rafraîchissement élevé va demander beaucoup de ressources au navigateur, et la plupart du temps le résultat sera fortement ralenti, voire saccadé.

## Debounce à la rescousse

Le rôle du debounce va être "d'intercepter" les événements et de les temporiser. Cette temporisation dépendra principalement de l'importance de l'opération à effectuer. Si nous reprenons l'exemple du paragraphe précédent, faisons en sorte que le redimensionnement du SVG se fasse **au maximum** deux fois par seconde :
    
    var svg = document.querySelector('#mysvg'),
        drawTimeout = null;

    function debounceDraw() {
        if (drawTimeout) {
            clearTimeout(drawTimeout);
        }
        drawTimeout = setTimeout(draw, 500);
    }

    function draw() {
        svg.setAttribute('height', window.innerHeight);
        svg.setAttribute('width', window.innerWidth);
        /* ... */
    }
    window.addEventListener('resize', debounceDraw);

Ici les événements `resize` ne font plus appel à la fonction `draw()`, mais à `debounceDraw()`. Cette fonction, c'est notre debounce : elle va différer l'appel à `draw()` de 500 millisecondes. Dans le cas d'un second appel à la fonction, ce délai sera réinitialisé (grâce à `clearTimeout()`). On a ainsi la certitude que la fonction `draw()` sera appelée au maximum 2 fois par seconde (toutes les 500 millisecondes), ce qui permet d'éviter de trop faire appel aux ressources du navigateurs, et ne gêne en rien l'expérience utilisateur. En effet, lors d'un redimensionnement de la fenêtre on s'attend à ce que le contenu s'adapte. Cette adaptation n'a pas lieu d'être si nous sommes encore en train de redimensionner.

## Généraliser le debounce

Pour avoir une fonction un peu plus générique, vous pouvez utiliser le code de celle proposée par la librairie [underscore.js](http://underscorejs.org/docs/underscore.html#section-83) :

    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
          var now = new Date().getTime(),
              last = now - timestamp;

          if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
              if (!timeout) context = args = null;
            }
          }
        };

        return function() {
          context = this;
          args = arguments;
          timestamp = new Date().getTime();
          var callNow = immediate && !timeout;
          if (!timeout) timeout = setTimeout(later, wait);
          if (callNow) {
            result = func.apply(context, args);
            context = args = null;
          }

          return result;
        };
    };

Vous pourrez ainsi appeler n'importe quelle fonction via un debounce.

## Liens

[Underscore.js](http://underscorejs.org/)