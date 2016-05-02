---
layout: post
title:  "Éditer avec Sublime Text depuis la console"
date:   2016-05-02
tags:
- sublime-text
- bash
description: >
  Micro-astuce pour lancer Sublime Text depuis votre console
--- 

## subl

Depuis le build 3065 (27 août 2014), Sublime Text met à disposition pour les utilisateurs de Windows le **Sublime Command Line Helper** (celui-ci était déjà dsponible pour Unix et OSX depuis pas mal de temps). Ce petit utilitaire à pour seul but d'envoyer un fichier dans Sublime Text depuis votre console, et c'est justement ce que nous cherchons !

    $ subl.exe fichier.txt

Pour que cela fonctionne il faut simplement s'assurer que l'exécutable soit accessible, en ajoutant le chemin suivant à votre PATH :

    C:\Program Files\Sublime Text 3

Si comme moi vous utilisez une console bash et n'êtes pas trop fan de la syntaxe `subl.exe`, vous pouvez tout aussi bien mettre en place un lien symbolique vers l'exécutable :

    $ ln -s "C:\Program Files\Sublime Text 3\subl.exe" /usr/local/bin/sublime

Ce qui rendra un (tout petit) peu plus naturel son utilisation :

    $ sublime
    $ sublime fichier.txt