---
layout: post
title:  "Problème d'affichage des contrôles Google Maps"
date:   2015-02-05
tags: 
- software
description: >
  Hein ? MS-DOS évolue ? ... ... MS-DOS évolue en Cygwin !
---
# Problème d'affichage des contrôles Google Maps
- zessx
- zessx
- 2015/02/05
- JS
- published
	
Si vous rencontrez des problème d'affichage des contrôles en utilisant Google Maps Javascript API v3, ce mini article est pour vous !

## Le problème rencontré

L'exemple suivant sera bien plus parlant que des explications maladroites. Vous pouvez voir que les contrôles sont partiellement (voire totalement) rognés.

<center><iframe src="{{ site.url }}/demos/probleme-affichage-controles-google-maps/index.html" width="100%" height="450"></iframe></center>

J'ajoute une image ci-dessous au cas où ce comportement disparaîtrait avec les mise à jour de l'API de Google :

{:.center}
![Les contrôles]({{ site.url }}/images/probleme-affichage-controles-google-maps/controles.jpg)

## L'explication

Si vous êtes dans ce cas, c'est probablement que vous utiliser un framework CSS (comme Bootstrap) ou un reset/normalize maison. Le problème vient de cette règle, qui doit traîner dans vos styles :

    img {
        max-width: 100%;
    }

Google Maps utilise une image contenant l'intégralité des contrôles, et joue sur les dimensions et `overflow: hidden` pour n'afficher que ce dont vous avez besoin. L'image utilisée (voir ci-dessous) peut avoir, et aura une largeur supérieure à l'élément qui la contient. Mais vous limitez la largeur maximale de *toutes* les images...

{:.center}
![Le sprite de Google Maps]({{ site.url }}/images/probleme-affichage-controles-google-maps/sprite.png)

Pour corriger tout ça, supprimer simplement cette règle pour vos Google Maps :

    img {
        max-width: 100%;
    }
    #map img {
        max-width: none;
    }

<center><iframe src="{{ site.url }}/demos/probleme-affichage-controles-google-maps/fixed.html" width="100%" height="450"></iframe></center>