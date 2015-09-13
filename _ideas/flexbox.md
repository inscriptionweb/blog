---
layout: post
title:  "Flexbox"
date:   2015-01-01
tags:
- php 
description: >
  Dans cet article, je voudrais essayer de présenter Flexbox d'une manière assez simple, afin que tout le monde puisse en appréhender les principes rapidement.
--- 

## Présentation

On ne devrait plus le présenter, mais bon... au cas où !

Flexbox (pour Flexible Box Layout) est un nouveau modèle d'agencement d'éléments apporté par CSS3. Les modèles les plus couramment utilisés jusqu'ici étaient `block`, `inline` ou encore `inline-block`. Ce nouveau modèle (`flex`) cherche à proposer une mise en page s'adaptant en fonction de la taille de l'écran. Les éléments dans un conteneurs `flex` sont automatiquement agencés et redimensionnés pour utiliser au mieux l'espace disponible. On l'utilisera sur un conteneur grâce à la propriété `display` :

    .container {
        display: flex;
    }

Voici tout ce que Flexbox vous permet de gérer :

- la direction dans laquelle les éléments vont être ajoutés (en lignes ou en colonnes)
- l'utilisation ou non de plusieurs lignes/colonnes
- l'alignement horizontal des éléments au sein d'une ligne/colonne 
- l'alignement vertical des éléments au sein d'une ligne/colonne 
- l'alignement des lignes/colonnes au sein du conteneur

## Axe principal et axe transversal

Le point le plus important à comprendre dans Flexbox est la définition d'un axe principal. De cet axe vont dépendre l'ensemble des autres propriétés. L'axe principal est défini par la propriété `flex-direction`, et il peut prendre 4 valeurs différentes :

