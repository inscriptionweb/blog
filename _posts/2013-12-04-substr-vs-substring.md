---
layout: post
title:  "Substr vs Substring"
date:   2013-12-04
tags: 
- js
description: >
  Quand JavaScript veux faire plus complexe que complexe...
---

Récupérer un extrait d'une chaîne de caractère, c'est une opération bénigne que n'importe quel développeur à fait des centaines de fois. Pourtant, quand il m'arrive d'en faire en JavaScript, j'ai toujours un doute sur la fonction à utiliser... Présentation des jumelles démoniaques.

## substr()

Cette première fonction prend deux paramètres : la position où l'extrait débute, et la longueur de cet extrait :

	var str = 'Hello world !';
	console.log(str.substr(2));    // "llo world !"
	console.log(str.substr(2, 9)); // "llo wo"


## substring()

Cette seconde fonction prend elle aussi 2 paramètres ! En revanche, il ne s'agit pas des mêmes : la position où l'extrait débute, et la position il se termine :

	var str = 'Hello world !';
	console.log(str.substring(2));    // "llo world !"
	console.log(str.substring(2, 6)); // "llo "

Personnellement je n'utilise que `substr()`, parce que je suis habitué à ce fonctionnement en PHP. Malgré tout, je me pose la question à chaque fois, et je ne n'ai toujours pas trouvé de moyen mnémotechnique !

## Liens   
[La fonction substr, sur MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)   
[La fonction substring, sur MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)   