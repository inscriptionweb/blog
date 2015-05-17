---
layout: post
title:  "SassFlexbox"
date:   2015-02-13
tags: 
- sass
- css
description: >
  Présentation d'un nouveau travail perso pour travailler plus facilement avec Flexbox.
---

## Palier au manque d'uniformité de Flexbox 

Flexbox est très récent, et sa standardisation l'est encore plus. Comme c'est un élément assez conséquent, sa définition a pris du temps. Pendant cette période, plusieurs groupes de travail ont apporté leurs idées. Des idées parfois différentes, qui ont mené à certaines scissions. Plusieurs versions ont donc existé et cohabité au fil du temps. Et qui dit plusieurs versions, dit plusieurs syntaxes.   
Aujourd'hui il peut être compliqué de trouver tous les vendor prefixes à utiliser, et coder avec Flexbox devient fastidieux même en les connaissant.  
C'est pour eviter d'avoir a réecrire ces préfixes que j'ai mis en place SassFlexbox. C'est une petite librairie sans prétention, et qui n'est probablement pas parfaite. Mais j'en ai besoin dès maintenant, et elle évoluera avec le temps. Je suis d'ailleurs toujours ouvert à toute remarque pour l'améliorer ;)

## Utilisation

Importez tout d'abord SassFlexbox :

    @import "helpers/sass-flexbox";

Vous pouvez dès à présent utiliser les placeholders ou les mixins définis. Leurs noms sont on ne peut plus intuitif puisqu'ils correspondent aux standards actuels du W3C en ce qui concerne Flexbox :

    .wrapper {
      @include display-flex();
      @include display-flow(column nowrap);

      .element {
        @include flex-grow(1);

        &.important {
          @include order(1);
        }
      }
    }

Notez que chaque mixin utilise des placeholders afin d'éviter de générer du code supplémentaire. Prenons l'exemple de la propriété `flex-wrap`. SassFlexbox définit pour elle 4 placeholders :

- `%flex-wrap-nowrap`
- `%flex-wrap-wrap`
- `%flex-wrap-wrap-reverse`
- `%flex-wrap-inherit`

Vous pouvez utiliser ces placeholders, mais afin de faciliter leur utilisation et uniformiser le code, un mixin est aussi défini :

    @mixin flex-wrap($wrap: nowrap) {
        @if not index((nowrap, wrap, wrap-reverse, inherit), $wrap) {
            $wrap: nowrap;
        }
        @extend %flex-wrap-#{$wrap};
    }

Ce mixin ne fait rien d'autre que de vérifier la valeur en argument, et d'étendre le placeholder correspondant. Ce moyen vous permet de constamment utiliser `flex-wrap()` sans vous soucier du code compilé. 

Voici donc la liste des mixins définis (je vous laisserai vous plonger dans le code si vous vous désirer pour une quelconque raison utiliser les placeholders directement) :

- `display-flex()`
- `display-inline-flex()`
- `flex-direction($direction)`
- `flex-wrap($wrap)`
- `flex-flow($direction, $wrap)`
- `flex-order($order)`
- `flex-grow($grow)`
- `flex-shrink($shrink)`
- `flex-basis($basis)`
- `flex($grow, $shrink, $basis)`
- `justify-content($justify)`
- `align-items($align)`
- `align-self($align)`
- `align-content($align)`

## Liens
[SassFlexbox](http://smarchal.com/sass-flexbox/)     
[Le projet Github](https://github.com/zessx/sass-flexbox)    
[Spécifications W3C pour Flexbox](http://www.w3.org/TR/css3-flexbox/)    
[Utiliser Flexbox - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)    
[Can I Use Flexbox?](http://caniuse.com/#feat=flexbox)    