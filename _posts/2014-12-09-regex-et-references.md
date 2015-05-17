---
layout: post
title:  "Regex et références"
date:   2014-12-09
tags: 
- regex
description: >
  Petit point sur les différentes références utilisables dans une regex.
---

> Cet article concerne uniquement les regex PCRE

## Les références absolues

Ce sont les références les plus connues. Elles désignent le énième groupe capturé :

	# input : <p>Foo</p>
	/<(\w+)>(.*?)<\/\1>/

Ici `\1` désigne le 1er groupe capturé, c'est à dire `p`. `\2` quant à elle désignera le second groupe : `Foo`. Vous pouvez utiliser autant de référence absolue que vous voulez, mais ces dernières posent deux problèmes :

- La regex est difficile à lire
- La syntaxe est la même que pour les nombres octaux

Dans une regex PCRE, un nombre octal est décrit par un backslash `\` suivit d'une valeur octale : `\777`, `\123`, `\1` ou `\2` sont des nombres octaux parfaitement valides. Pour savoir si `\1` est une référence absolue ou un nombre octal, la regex va rapidement être lue pour vérifier si un groupe correspond. Si c'est le cas, `\1` sera considéré comme une référence absolue, sinon comme un nombre octal.

Il existe une autre syntaxe pour les références absolues (qui arrive avec Perl 5.10.0) :

	/<(\w+)>(.*?)<\/\g1>/
	/<(\w+)>(.*?)<\/\g{1}>/

On utilise `\g` (pour **g**roup) à la place de `\`, ce qui permet de spécifier qu'il s'agit bien d'une référence, et non pas un nombre octal (on évite ainsi tout problème). Vous pouvez au choix utiliser la version de base `\1`, ou celle avec des accolades `\{1}`. Je vous invite à toujours utiliser cette dernière syntaxe car elle est plus lisible, et vous verrez dans la suite de cette article qu'elle est utilisée un peu partout.

## Les références relatives

Moins connues, elles permettent de désigner le énième groupe **précédent**. Si on reprend notre exemple, on aura ceci :

	/<(\w+)>(.*?)<\/\g{-2}>/

Les références relatives sont extrêmement utiles dans les grandes regex. D'une part ça nous évite de nous perdre et de devoir recompter tous les groupes de capture (ce qui peut être ardu), d'autre part ça permet d'inclure/déplacer une regex au sein d'une autre plus facilement : pas besoin de modifier toutes les références, elles sont déjà relative !

## Les références nommées

Pour commencer, il faut savoir que vous pouvez nommer un groupe de capture, plutôt qu'il aie un simple numéro, en utilisant `?<identifiant>` au début de votre groupe :

	/<(?<tag>\w+)>(?<content>.*?)<\/\g{1}>/

Dans notre cas, on se retrouve avec un tableau de résultats à deux entrées :

- `tag     -> p`
- `content -> Foo` 

Si ces groupes peuvent toujours être désignés par des références absolues, ils vous offrent désormais (depuis Perl 5.10.0) la possibilité de les désigner nommément :

	/<(?<tag>\w+)>(?<content>.*?)<\/\g{tag}>/

La regex devient plus simple à lire, et encore plus si vous utilisez le modifier `/x` (pour autoriser les espaces, les sauts de lignes et les commentaires) :

	/
		<(?<tag>\w+)>
			(?<content>.*?)
		<\/\g{tag}>
	/x

À savoir, les références nommées ont aussi d'autres syntaxes (pour des raisons de compatibilité avec les regex .Net) :

	\k{tag}
	\k<tag>
	\k'tag'
	(?P=tag)

## Liens
[Documentation sur les regex Perl](http://perldoc.perl.org/perlre.html)  