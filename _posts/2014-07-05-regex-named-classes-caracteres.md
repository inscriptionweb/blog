---
layout: post
title:  "Les classes de caractères nommée dans les regex"
date:   2014-07-05
tags: 
- regex
description: >
  Utilisez-vous les classes de caractères nommées pour les regex ? 
---

## Le but d'une classe de caractères nommée

Les regex peuvent devenir fastidieuses à écrire assez rapidement, comme par exemple quand vous voulez désigner l'ensemble des caractères de ponctuation :
On trouve de nombreux exemples sur le net utilisant ceci :

	[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]

En soit, c'est complètement valide, mais au sein d'une grande regex ça peut devenir difficile à lire, d'autant plus si ce bloc est répété.  
Il faut savoir que les regex acceptent un certains nombre de classes de caractères nommées (prédéfinies). Pour les caractères de ponctuation par exemple, on pourra remplacer ce code par ceci :

	[[:punct:]]

Voici qui est déjà beaucoup plus lisible !  
Les classes ne caractères ne sont pas systématiquement plus courtes à écrire (je pense par exemple à `[[:digit:]]`, qui est plus long que `[0-9]`), mais leur intérêt est surtout d'être plus lisibles.

## La liste complète

Voici la liste complète des classes de caractères nommées disponibles :

- `[[:alphanum:]]` : les lettres et les chiffres (`[A-Za-z0-9]`)
- `[[:alpha:]]` : les lettres (`[A-Za-z]`)
- `[[:ascii:]]` : les [caractères ASCII](http://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange#Description) (`[\x00-\x7F]`)
- `[[:blank:]]` : l'espace et la tabulation (`[ \t]`)
- `[[:cntrl:]]` : les caractères de contrôle (`[\x00-\x1F\x7F]`)
- `[[:digit:]]` : les chiffres (`[0-9]`)
- `[[:graph:]]` : les caractères visibles <br>(``[A-Za-z0-9!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-]``)
- `[[:lower:]]` : les minuscules (`[a-z]`)
- `[[:print:]]` : les caractère imprimables <br>(``[A-Za-z0-9!"#$%&'()*+,./:;<=>?@[\]^_`{|}~\x20-]``)
- `[[:punct:]]` : la ponctuation (``[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-]``)
- `[[:space:]]` : les caractères d'espacement (`[ \t\n\x0B\f\r]`)
- `[[:upper:]]` : les majuscules (`[A-Z]`)
- `[[:word:]]` : les caractères composant un mot (`[A-Za-z0-9_]`)
- `[[:xdigit:]]` : les chiffres hexadécimaux (`[0-9a-fA-F]`)

Chacune de ces classes est composée de 2 crochets (comme toute classe de caractères) et d'un mot clé :

	[  [:digit]  ]

En voyant ceci, vous venez peut-être de comprendre qu'il est possible d'étendre ces classes. Si je veux capturer une suite de lettres et de tirets (`-`), je vais en effet pouvoir utiliser :

	[[:alpha:]-]+

Vous pouvez utiliser la négation de la même façon. Si je veux exclure les chiffres et les lettres A, B et C :

	[^a-cA-C[:digit:]]

Mieux encore, la négation est aussi possible au sein de ces classes nommées ! Si je veux uniquement les consonnes :
	
	[^aeiouAEIOU[:^alpha:]]

## Les raccourcis

Il existe aussi des raccourcis pour certaines classes de caractères, qui vous seront très utiles en terme de place :

- `\d` : `[0-9]`
- `\D` : `[^0-9]`
- `\s` : `[ \t\n\x0B\f\r]`
- `\S` : `[^ \t\n\x0B\f\r]`
- `\w` : `[a-zA-Z0-9_]`
- `\W` : `[^a-zA-Z0-9_]`

## Liens

[Table des caractères ASCII](http://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange#Description)  
[Documentation PHP sur les classes de caractères](http://fr.php.net//manual/fr/regexp.reference.character-classes.php)  