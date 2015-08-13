---
layout: post
title:  "Problème d'affichage des dossiers dans la sidebar de Sublime Text 3"
date:   2015-08-13
tags:
- sublime-text 
description: >
  Astuce du jour, pour éviter que votre sidebar plante à chaque changement de projet.
--- 

## Sans plus attendre...

... la solution !

Ce bug est dû à l'affichage ou non des fichiers ouverts. Si vous êtes sur un projet pour lequel vous affichez les fichiers ouverts, et que vous switchez sur un projet où vous ne les affichez pas (et vice versa), la sidebar de Sublime Text ne sait étrangement plus où donner de la tête, et vous vous retrouvez avec des dossiers vides.

Afin d'éviter cela, veillez à ce que tous vos projets aient l'option "Cacher les fichiers ouverts" désactivée (ou activée, mais tous pareils) : <kbd>View</kbd> > <kbd>Side Bar</kbd> > <kbd>Hide Open Files</kbd>.

Enfin, si vous utilisez le plugins [Project Manager](https://packagecontrol.io/packages/Project%20Manager), vérifiez bien dans vos paramètres de package que la valeur suivante correspond à votre choix, sans quoi le bug subsistera :

    {
      "show_open_files": true,
    }

## Liens

[L'issue sur GitHub](https://github.com/SublimeTextIssues/Core/issues/62)
