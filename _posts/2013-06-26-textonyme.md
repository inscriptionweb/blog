---
layout: post
title:  "Textonyme, partagez du texte facilement et anonymement"
date:   2013-06-26
tags: 
- divers
description: >
  Présentation d'un petit outil perso : un pastebin sans base de données.
---

Öy !

Je viens de mettre en ligne un petit pastebin pour un usage perso : [Textonyme](http://text.ony.me).   
Pour ceux qui ne connaissent pas encore le principe des pastebin, ce sont des micro-sites qui permettent d'échanger rapidement une quantité de texte conséquente. Voyez ça comme un bloc-note en ligne, qui vous donne la possibilité de retrouver les notes écrites auparavant.

La particularité de [Textonyme](http://text.ony.me) (qui est basé sur Shortly), est qu'il n'utilise aucune base de données. Tout le contenu saisi est encodé en base64, et le résultat est utilisé pour généré une URL. Si vous créez deux notes avec le même contenu, vous aurez donc deux fois la même URL.
Ce système a plusieurs intérêts :

* Il est rapide à mettre en place
* Il est simple d'utilisation
* Il ne nécessite aucune BDD
* Il n'est pas vulnérable au spam (y compris via des robots)
* Il ne s'alourdit pas avec le temps
* Il garantit un anonymat total (si tenté que le fournisseur du service ne choppe pas votre IP sans le dire)

Côté limites/désavantages, il faut bien se souvenir que l'URL a une taille limitée. 2047, 2048, 2083... tout dépend du navigateur. En gardant cette limite à l'esprit, on se souviendra qu'il faut éviter de coller l'intégralité de Guerre et Paix (Tolstoï). 

N'hésitez pas à l'utiliser pour vos besoins persos, c'est cadeau !

## Liens
[Textonyme](http://text.ony.me)
[Les sources sur Github](https://github.com/zessx/shortly)   
[Le projet d'origine sur Github : Shortly](https://github.com/lucaspiller/shortly)   
[Question Stackoverflow sur la taille des URL](http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers)   
[Quelle est la taille maximale d'une URL avec Internet Explorer ?](http://support.microsoft.com/kb/208427/fr)   