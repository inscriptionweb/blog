---
layout: post
title:  "FileZilla et la suppression de dossier impossible"
date:   2014-10-24
tags: 
- software
description: >
  Vous tentez frénétiquement de supprimer un dossier distant via FileZilla mais rien n'y fait ? Think different.
---

## What is le problème ?

Si vous n'arrivez pas a supprimer le dossier, c'est tout simplement parce qu'il n'est pas vide (*boom, révélation, fin de l'épisode.*).

La subtilité, c'est que vous avez décidé de **ne pas afficher** les fichiers qui traînent encore. Voici quelques exemples courants de fichier résiduels :

- les `Thumbs.db` créés par Windows dans les dossiers d'images
- les `.DS_Store` créés par Mac OS X un peu partout
- les `.git`, `.svn` et autres dossiers/fichiers de versioning

Bon, là plupart du temps c'est quand plusieurs personnes accèdent au même serveur FTP que les problèmes surviennent. Si un des utilisateurs ne filtre pas ces fichiers et en envoie par mégarde sur le serveur, les autres utilisateurs n'en sauront rien s'ils cachent ces mêmes fichiers.  
Le réflexe à avoir dans ces cas là, c'est de désactiver temporairement le filtrage. Pour cela, vous allez dans **Affichage > Filtres de contenus** (ou <kbd>Ctrl + I</kbd>). Vous allez tomber sur cette petite fenêtre :

{:.center}
![Les filtres de contenus]({{ site.url }}/images/filezilla-suppression-de-dossier-impossible/filtres-de-contenus.png)

Ce sera majoritairement **Useless Explorer files** le responsable, mais dans le doute, décochez tous les filtres distants. Il ne vous reste plus qu'à valider, relancer votre suppression, et réactiver les filtres de contenus distants.

Pour finir, je vous invite très fortement à toujours activer ces filtres, afin d'éviter de laisser traîner des fichiers inutiles sur le serveur. Vous avez la possibilité d'éditer les règles de filtrage, afin d'ajouter d'autres fichiers/dossiers (`.git`, `.sass-cache`, `cache/*`...) à ne pas afficher dans FileZilla (et donc ne pas les transférer).


## Liens
[Homepage de FileZilla](https://filezilla-project.org/)   