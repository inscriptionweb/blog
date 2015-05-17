---
layout: post
title:  "jQuery data() vs attr()"
date:   2015-04-07
tags: 
- js
description: >
  Quelle fonction utiliser : **data()** ou **attr()** ?
---

## Comprendre la différence entre les deux fonctions

Si on se réfère à la documentation de jQuery, voici ce que nous avons pour `data()` :

> .data( key ) returns the value at the named data store for the first element in the jQuery collection, as set by data(name, value) or by an HTML5 data-* attribute.  
> .data( key, value ) stores arbitrary data associated with the matched elements.  

Et pour `attr()` :

> .attr( attributeName ) gets the value of an attribute for the first element in the set of matched elements.  
> .attr( attributeName, value ) sets one or more attributes for the set of matched elements.

Il y a là quelques nuances à comprendre afin de savoir dans quel cas utiliser telle ou telle fonction.

`data()` est une fonction propre à jQuery, qui vous permet d'associer des données à un élément du DOM. Cette association est faite par Jquery, pour jQuery **et n'affecte en aucun cas le DOM**. Pour le constater, exécutez ces quelques lignes en live via les devtools de Chrome, our Firebug :

    $('body').data('foo', 'bar');
    console.log($('body').data('foo'));

La console va vous afficher `bar`. Cela veux dire que jQuery a bien associé une variable nommée `foo` et à la valeur `bar` à votre élément `body`. Toutefois, vous ne verrez aucun attribut `data-foo="bar"` dans le DOM si vous l'inspectez, tout simplement parceque cet attribut n'existe pas et n'a jamais été créé par jQuery.

Voyons le résultat si nous faisons la même chose avec `attr()` :

    $('body').attr('data-foo', 'bar');
    console.log($('body').attr('data-foo'));

Même résultat, la console affiche `bar`. En revanche, si vous inspectez le DOM, vous constaterez cette fois-ci la présence de l'attribut `data-foo` sur la balise `body`.

**Toute manipulation du DOM doit être faite avec la fonction `attr()`. `data()` n'est destinée qu'à un usage exclusif par jQuery.**

La subtilité, qui a mené à cette confusion est qu'il est possible avec la fonction `data()` de récupérer la valeur d'un attribut dont le nom commence par `data-`. Il reste malgré tout impossible de le modifier avec cette dernière.

## Ce que cette différence engendre

Poussons le test plus loin pour mieux comprendre ce qui peut poser problème. Voici une base HTML de test sur laquelle nous allons travailler :

    <div class="element"></div>
    <div class="element" data-status="error"></div>

Avec ceci, nous allons ajouter quelques lignes de CSS :

    .element {
        height: 100px;
        margin: 5px;
        background: blue;
    }
    .element[data-status="success"] {
        background: green;
    }
    .element[data-status="error"] {
        background: red;
    }

Nous avons donc au départ trois éléments, celui au centre étant rouge, et les deux autres bleus. Exécutons cette petite ligne de jQuery :

    $('.element:first').data('status', 'success');
    console.log($('.element:first').data('status'));        // success
    console.log($('.element[data-status]').data('status')); // error

Résultat ? Rien ne change. Les données on bien été associées, mais le CSS n'a pas pris en compte cette association. Pourquoi ? Parce que l'attribut sur lequel notre CSS se base pour changer la couleur de fond **n'existe pas**. Voilà la limite de `data()` : tout ce qui est extérieur à notre script jQuery ne pourra pas accéder aux données associées. Vous noterez quand-même que `data()` a récupéré la valeur de l'attribut `data-status` du dernier élément (`error`). C'est entièrement dû au fait que nous n'avons pas défini de données avec une clé `status` sur cet élément.

Il se passera la même chose si vous tentez de modifier un attribut déjà existant. Dans notre exemple, le second élément à déjà un attribut `data-status`, mais voyez ce qui se passe :

    $('.element[data-status]').data('status', 'success');
    console.log($('.element:first').data('status'));        // undefined
    console.log($('.element[data-status]').data('status')); // success

La console nous affiche bien la valeur modifiée, mais l'élément est toujours rouge. Si les données jQuery ont été mise à jour, le DOM lui reste inchangé. De plus, `.data('status')` ne nous retourne plus la valeur de l'attribut `data-status` comme dans l'exemple précédent, mais bien la valeur qu'on a spécifié. 
Si vous désirez changer la valeur d'un attribut, utilisez en toute logique la fonction `attr()` :

    $('.element:first').attr('data-status', 'success');

## Pour résumer

- `data()` stocke des données uniquement utilisables par jQuery
- `data()` n'altère **jamais** le DOM
- `data()` ne peut donc pas créer d'attributs
- `data()` peut accéder à la valeur d'un attribut `data-` **si aucune donnée n'a été définie pour cette clé**
- `attr()` altère le DOM
- `attr()` peut donc créer des attributs

## Liens
[Documentation sur la fonction data()](http://api.jquery.com/data/)   
[Documentation sur la fonction attr()](http://api.jquery.com/attr/)   