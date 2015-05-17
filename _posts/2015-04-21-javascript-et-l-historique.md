---
layout: post
title:  "Javascript et l'historique du navigateur"
date:   2015-04-21
tags: 
- js
description: >
  Présentation de l'objet <code>window.history</code> et des différentes méthodes de manipulation de l'historique du navigateur en JavaScript.
---

## L'objet `window.history`

Cet objet permet à Javascript d'accéder à l'historique et de le manipuler. Vous pouvez avoir un aperçu de ses propriétés en affichant sont prototype dans une console JS :

    window.history.__proto__;
    /**
     * History 
     *    back: function back() { [native code] }
     *    constructor: function History() { [native code] }
     *    forward: function forward() { [native code] }
     *    go: function go() { [native code] }
     *    pushState: function () { [native code] }
     *    replaceState: function () { [native code] }
     *    __proto__: Object
     */

## Se déplacer dans l'historique

Depuis un script JS, il est possible de simuler un clic sur les boutons "Page précédente" et "Page suivante" du navigateur. Trois fonctions sont disponibles pour cela :

- `window.history.back()` : charge l'entrée précédente de l'historique
- `window.history.forward()` : charge l'entrée suivante de l'historique
- `window.history.go(n)` : charge l'entrée `n` de l'historique, relative à la page courante (nombre négatif pour les entrées précédentes, nombre positif pour les entrées suivantes)

Ces fonctions sont très largement connues, et utilisées depuis déjà longtemps (parfois à tors et à travers).  
Notez que l'objet History a une propriété `.length`, qui vous permet de connaître le nombre d'entrées dans l'historique.

## Manipuler l'historique

Voilà qui est bien plus intéressant...  
Les fonctions suivantes ont été introduites avec HTML5. Elle permettent d'ajouter ou de supprimer des entrées dans l'historique. Concrètement, cela se traduit par une modification de l'URL, **sans rafraîchissement de la page**. Ah, j'ai capté l'attention de certains...

Pour ajouter une entrée dans l'historique, nous utilisons la fonction `pushState()` :

    window.history.pushState({}, '', 'nouvelle-url.html');

La fonction accepte trois paramètres :

- un état : c'est un objet JS associé à votre entrée d'historique (exemple : `{action:'add'}`). Cet objet est accessible via la propriété `window.history.state`
- un titre : totalement ignoré pour le moment, inutile de le renseigner
- une url : la nouvelle url que votre navigateur va afficher (je rappelle que ce n'est pas une redirection, la page ne sera donc pas rafraîchie)

Attention si vous utilisez l'objet `window.history.state`. Sa représentation est limité à 640 ko, il faut donc prendre garde à ce que vous y stockez. Si vous dépassez cette limite, il sera alors impossible d'accéder à l'objet.

Enfin, si vous préférer modifier l'entrée courante plutôt que d'en créer une nouvelle, vous pouvez utiliser la fonction `replaceState()`. Celle-ci fonctionne exactement de la même manière que `pushState()`.


## Liens
[Manipuler l'historique du navigateur - MDN](https://developer.mozilla.org/fr/docs/Web/Guide/DOM/Manipuler_historique_du_navigateur)   