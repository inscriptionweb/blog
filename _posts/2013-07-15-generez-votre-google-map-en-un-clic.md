---
layout: post
title:  "Générez votre Google Map en un clic !"
date:   2013-07-15
tags: 
- html
- php
description: >
  Présentation d'un petit outil perso pour générer des Google Map.
---

**[Par ici!](http://smarchal.com/geoloc/)**

Pas besoin de long discours pour vous expliquer le fonctionnement, c'est très intuitif :

* Vous entrez l'adresse recherchée
* Vous ajustez le marqueur si besoin
* Vous cliquer sur le bouton de génération
* Vous copiez-collez purement et simplement le code obtenu !

{:.center}
![Génération de la GMap]({{ site.url }}/images/generez-votre-google-map-en-un-clic/gmapgen.jpg)

Le tout a été fait de telle sorte que vous n'ayez rien à penser, et ne requiert que l'API de Google Map (pas de jQuery).   
Une fois la Google Map générée, vous êtes libres de l'adapter à vos besoins :

* Modifier la taille de la carte
* Modifier le contenu de l'InfoWindow
* Ajouter du style

Vous avez aussi accès aux différentes variables : `latitude`, `longitude`, `zoom`... Ainsi qu'un lien permettant de retrouver l'état actuel de votre Google Map (ou pour partager rapidement une localisation : [Fort Boyard !](http://smarchal.com/geoloc/?lat=45.99963404387834&lon=-1.2139638492678841&zoom=11).

Attention toutefois à un détail, j'utilise systématiquement l'identifiant `#map`. Si vous avez plusieurs Google Map sur la même page, veillez bien à adapter le code en utilsant une classe à la place.

## Liens
[Geoloc sur smarchal.com](http://smarchal.com/geoloc/)