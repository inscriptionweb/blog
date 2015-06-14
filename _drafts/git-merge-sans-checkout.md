---
layout: post
title:  "Faire un git merge sans checkout"
date:   2015-01-01
tags:
- git
description: > 
  Dans certains workflow, on doit souvent faire un git merge pour rapatrier des modifications. Mais comment le faire sans switcher sur la branche en question ?
---

## De branche en branche...

Si vous utilisez les [pages GitHub](http://blog.smarchal.com/heberger-son-site-sur-github/), vous utilisez très probablement deux branches :

- `master` pour la version de développement
- `gh-pages` pour la version de production, propulsée par GitHub Pages

A chaque fois que vous voulez publier des modifications, voici le genre de commandes git que vous avez à saisir :

	git add --all
	git commit -m "Change xxx"
	git checkout gh-pages
	git merge master
	git checkout master
	git push --all origin

Si on ne peut échapper aux commandes `add`, `commit` et `push`, sachez qu'il est tout à fait possible de faire un fast-forward sur la branche `gh-pages` sans bouger de master. Pour cela, nous utiliserons la commande `fetch` :

    git add --all
	git commit -m "Change xxx"
	git fetch . master:gh-pages
	git push --all origin

## En détails

La commande `fetch` permet de télécharger des données d'une branche (locale ou distante) dans une branche locale. On est habitué à voir des commandes du type `git fetch origin master`, qui servent à récupérer un contenu distant (ici `origin/master`) pour l'ajouter à une branche locale (ici `./master`). Mais il est possible de travailler en local uniquement : le dépôt spécifié sera alors `.`, qui indique le dépôt local. Enfin, la référence de branche ne sera pas simplement `master` (qui est une version implicite de `master:master`), mais `master:gh-pages`.

Avec `git fetch . master:gh-pages`, on indique donc d'envoyer le contenu de `./master` (la branche locale `master`) vers `./gh-pages` (la branche locale `gh-pages)`.

**Attention !**

Comme précisé plus haut, cette méthode ne fonctionne que si le merge est un fast-forward, c'est-à-dire s'il n'y a aucun conflit. Le rôle de `git merge` est précisément de vérifier ces conflits, et de vous en avertir afin que vous puissiez choisir quoi faire. `git fetch` fait uniquement du téléchargement, en aucun cas de la gestion de conflits.

## Liens

[Documentation de la commange git fetch](http://git-scm.com/docs/git-fetch)