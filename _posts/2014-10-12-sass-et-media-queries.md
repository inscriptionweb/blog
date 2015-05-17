---
layout: post
title:  "Sass et media queries"
date:   2014-10-12
tags: 
- sass
description: >
  Constat et astuces sur l'utilisation des media queries avec Sass
---

> Une version améliorée des mixins utilisés ici est présentée [dans un autre article](http://blog.smarchal.com/sass-queries).

## Un exemple de media query en CSS

    #content {
        width: 100%;
        margin: 0 auto;
    }
    @media screen and (min-width: 768px) {
        #content {
            width: 668px;
        }
    }
    @media screen and (min-width: 1024px) {
        #content {
            width: 924px;
        }
    }
    
Dans cet exemple de base, on definit un élément `#content` (ici notre bloc de contenu principal) ayant une largeur différente selon la taille de la zone de rendu. Nous avons 3 états :

- une largeur de 100% sur mobile (l'ordre des media queries nous indique que nous utilisons un style dit "mobile first")
- une largeur fixe de 668px si la largeur de la zone de rendu est supérieure ou égale à 768px
- une largeur fixe de 924px si la largeur de la zone de rendu est supérieure ou égale à 1024px

Ce bout de code est très commun. On trouve les media queries en fin de fichier, bien ordonnées.

## Utilisation avec Sass

Essayons à présent d'avoir le même résultat avec Sass.

    #content {
        width: 100%;
        margin: 0 auto;

        @media screen and (min-width: 768px) {
            width: 668px;
        }
        @media screen and (min-width: 1024px) {
            width: 1024px;
        }
    }

Ce code génère une erreur à la compilation, car il est impossible de placer des media queries dans un sélecteur. On pert alors tout l'interet de l'imbrication des sélecteurs fournie par Sass. Au final, le fichier redevient difficile a lire car le code est divisé.

C'est d'autant plus vrai sur de gros fichiers. On prends l'habitude avec Sass d'avoir du code imbriqué, groupé. En sortant chaque media query de cette archirecture, on va inévitablement se retrouver avec une suite de media queries éparpillées. Il est toujours possible de les fusionner, mais on perd encore plus en ordre et en clarté.

Comment faire alors pour utiliser des media queries **au sein même des sélecteurs** ?

## La solution est dans le mixin !

La solution que je vous propose est d'utiliser des mixins. Pour ceux qui ne seraient pas familier avec eux, il s'agit de fonctions que vous définissez, généralement avec des paramètres, et qui vont retourner une portion de code CSS. Ces mixins sont ensuite appelés depuis l'intérieur d'un sélecteur à l'aide du mot clé `@include`. 

L'avantage de ces mixins depuis Sass 3.2, c'est que l'on peut leur passer un bloc de code en paramètre ! Démonstration :

    @mixin media-min($_min-width) {
        @media screen and (min-width: $_min-width) {
            &{ @content; }
        }
    }
    #content {
        width: 100%;
        margin: 0 auto;

        @include media-min(768px) {
            width: 668px;
        }
        @include media-min(1024px) {
            width: 1024px;
        }
    }

Nous avons ici un mixin qui prend en paramètre la largeur minimale de la zone de rendu, et qui va copier le code contenu entre les accolades dans une media query créée pour l'occasion.

On l'utilise ensuite très simplement dans notre sélecteur avec la ligne `@include media-min(...) {...}`.

Il s'agit toujours ici de travailler en mobile first, et ce code Sass génère exactement le même code CSS qu'au début de cet article.

Notez au passage que je préfixe toutes mes variables locales et mes paramètres d'un underscore. Il s'agit d'une simple convention que je m'impose afin d'éviter tout conflit, les variables ayant toutes une portée globale en Sass (du moins pour le moment).

## Définissez automatiquement vos breakpoints

Je vous propose d'aller plus loin à présent, en généralisant l'utilisation de ce mixin et en l'améliorant. Nous allons définir nos breakpoints dans une map (Sass 3.3 et plus), et passer la clé du breakpoint à notre mixin, plutôt que sa valeur :

    $breakpoints: (
        "phone-down": 500px,
        "tablet-up": 768px,
        "tablet-down": 900px,
        "desktop-up": 1024px,
        "desktop-down": 1280px,
        "widescreen-up": 1440px
    );
    @mixin media-min($_key) {
        @media screen and (min-width: map-get($breakpoints, $_key)) {
            &{ @content; }
        }
    }

Le premier avantage est d'avoir les valeurs de nos beeakpoins définies à un seul endroit. Il est alors aisé de les mettre à jour, d'en ajouter, ou simplement de les consulter. 

Le second avantage est la lisibilité. On utilise des termes comme "phone", "tablet", "desktop" ou "widescreen" et leurs orientations "up" et "down" plutôt que des valeurs. 

Un troisième avantage enfin est de pouvoir boucler sur notre map, et de généraliser certains traitements. C'est ce que nous allons faire ci-dessous, en créant un placeholder pour tous les élements devant adapter leur largeur.
 
    %edged {
        width: 100%;
        margin: 0 auto;

        @each $_key, $_value in $breakpoints {
            @include media-min($_key) {
                width: ($_value - 100px);
            }
        }
    }

On peut ainsi réutiliser notre code facilement :

    header {
        display: none;
        background: tomato;
    
        .container {
            @extend %edged;
        }
        @include min-media("tablet-down") {
            display: block;
        }
    }
    #content {
        @extend %edged;
    }

## Affinez le ciblage de vos breakpoints

Histoire de vous présenter l'intégralité de mes petites recherches, voici les 4 mixins que j'ai réalisés, et qui vous permettent de cibler :

- un breakpoint minimal
- un breakpoint maximal
- un breakpoint en particulier
- une tranche de plusieurs breakpoints

<!-- -->

    /* from... */
    @mixin media-min($_key) {
        @media screen and (min-width: map-get($breakpoints, $_key)) {
            &{ @content; }
        }
    }

    /* to... */
    @mixin media-max($_key) {
        @media screen and (max-width: map-get($breakpoints, $_key) - 1) {
            &{ @content; }
        }
    }
    
    /* from... to... */
    @mixin media-between($_keymin, $_keymax) {
        @media screen and (min-width: map-get($breakpoints, $_keymin)) and (max-width: map-get($breakpoints, $_keymax) - 1) {
            &{ @content; }
        }
    }

    /* at... */
    @mixin media($_key) {
        @media screen and (min-width: map-get($breakpoints, $_key)) and (max-width: map-get($breakpoints, nth(map-keys($breakpoints), index(map-keys($breakpoints), $_key) + 1)) - 1) {
            &{ @content; }
        }
    }

Je rappelle au passage une fois encore que ces 4 mixins fonctionnent en mobile first, ce qui explique le retrait d'un pixel dans les trois derniers. Le breakpoint minimal est inclus, et le breakpoint maximal toujours exclus. 

Voyez ci-dessous la simplicité d'utilisation :

    @include media-min("desktop-up") {
        /* from 1024px to infinite */
    }
    @include media-max("tablet-down") {
        /* from 0px to 899px */
    }
    @include media-between("tablet-up", "desktop-down") {
        /* from 768px to 1279px */
    }
    @include media("tablet-down") {
        /* from 900px to 1023px */
    }

## Liens
[La documentation de SASS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)  
[SassQueries](http://smarchal.com/sass-queries)  