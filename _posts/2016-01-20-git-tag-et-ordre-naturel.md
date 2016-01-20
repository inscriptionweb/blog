---
layout: post
title:  "Git tag et le tri naturel"
date:   2016-01-20
tags:
- git
description: >
  Comment forcer git à utiliser un tri naturel quand on affiche la liste des tags ?
--- 

Hey, bonne et tardive année 2016 !  
Oui, cela fait plusieurs mois que je ne suis pas passé faire un tour par ici. Je vais donc essayer de reprendre un petit rythme de publication, mais c'est un peu comme les résolutions de la nouvelle année : on est plein de bonne volonté le jour où on les annonce, et on croise les doigts pour s'y tenir le plus longtemps possible !

## Le problème du tri naturel

Quand on utilise beaucoup les tags avec git, on se rend vite compte que leur ordre d'affichage via la commande `git tag` n'est pas des plus plaisants. Ci-dessous un exemple avec des numéros de version s'étalant de v0.1 à v0.12 :

	$ git tag 
	v0.1 
	v0.10 
	v0.11 
	v0.12 
	v0.2 
	v0.3 
	v0.4 
	v0.5 
	v0.6 
	v0.7 
	v0.8 
	v0.9 

Avec ce tri, il est facile de passer à côté d'un numéro de version qui existe déjà. Plutôt que de considérer ces numéros de version comme de simples chaînes de caractères, il serait judicieux de tenir compte des nombres qui les composent, en utilisant un tri naturel.

## Et pour quelques paramètres de plus

Si vous utilisez une version de git égale ou supérieure à la v2.0.0, vous avez accès au paramètre `--sort` pour la commande `git tag`. Par défaut, voici la commande qui est exécutée :

	git tag --sort refname

Cette valeur tri les référence alphabétiquement. Pour utiliser un tri naturel, il suffit d'utiliser la valeur `version:refname`, qui va préciser à git de traiter les noms des références comme des numéros de version, et non plus comme des chaînes de caractères standards :

	git tag --sort version:refname

Vous pouvez aussi définir ce tri par défaut via la configuration de git :

	git config --global tag.sort "version:refname"

Dans le malheureux cas où vous utilisez toujours une version préhistorique de git, il faudra travailler à l'ancienne, et trier vous-mêmes le résultat de `git tag` : 

	git tag | sort -V

## Liens
[Référence git - tag](https://git-scm.com/docs/git-tag)   