---
layout: post
title:  "Avatar en médaillon"
date:   2013-04-08
tags:
- css 
description: >
    Histoire de donner un petit style à votre avatar, je vais commencer avec pas un, 
    mais <strong>DEUX</strong> <del>Willi Waller 2006</del> petits tricks CSS pour générer un 
    médaillon à partir d'une image normale (comprenez carrée) !
--- 

## La structure HTML

Tout d'abord, la structure HTML : de simple balises `<img>`. Zomagad, quelle complexité !!  

    <img alt="Kitty Perry" src="http://stupidstuff.org/kitten/kitten123.jpg" />
    <img alt="Cat Middleton" src="http://stupidstuff.org/kitten/kitten131.jpg" />
    <img alt="Diane Kitten" src="http://stupidstuff.org/kitten/kitten146.jpg" />

## Les tricks CSS

Le premier trick CSS intervient pour donner une forme circulaire à vos image. À l'aide de [border-radius](https://developer.mozilla.org/fr/docs/CSS/border-radius), vous allez fixer une bordure arrondie sur votre image. La taille du rayon (de l'arrondi) devra faire exactement la moitié de la largeur de votre image. On n'oublie pas évidemment les préfixes des rendering engine pour que ça fonctionne un peu partout :  

    img {
        width: 120px; height: 120px; /* on fixe la taille à 120px */
        -webkit-border-radius: 60px; /* 120/2 : 60px */
           -moz-border-radius: 60px;
                border-radius: 60px;
    }

On va maintenant donner un peu de panache à cette bordure, en lui ajoutant une petite ombre à l'aide de [box-shadow](https://developer.mozilla.org/fr/docs/CSS/box-shadow). Les deux premiers paramètres (`offset-x offset-y`) définissent l'orientation de l'ombre, le troisième (`blur-radius`) correspond au flou appliqué à l'ombre :

    img {
        margin: 10px;
        border: 4px solid #ededed;
        box-shadow: 2px 2px 2px #888888;
    }

Ajoutons maintenant un second effet de style. Nous allons désaturer l'image (çad. la mettre en nuances de gris) par défaut, et n'afficher sa version colorée qu'au passage de la souris. Pour Chrome/Safari, nous utiliserons le filtre `greyscale`, pour IE le filtre `gray`, et pour Firefox, ça se complique...

Le trick ici est de générer un filtre via un [data URI](https://developer.mozilla.org/en-US/docs/data_URIs), et de l'appliquer à notre image. On utilisera pour cela l'élément `feColorMatrix`. L'image finale sera le produit matriciel de notre image colorée, et du filtre généré. Les matrices de couleurs sont extrêmement intéressantes, mais je ne m'attarderai pas dessus dans ce billet vu l'étendue du sujet (une autre fois peut-être) :

    img {
        filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); 
        filter: gray;
        -webkit-filter: grayscale(100%);
    }
    img:hover {    
        filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
        -webkit-filter: grayscale(0%);
    }

Touche finale, le cadeau Bonux pour les utilisateurs de Chrome, une petite transition CSS3 entre l'image désaturée et l'image colorée. Rien de plus simple, rien de plus classe :

    img, img:hover {
        transition: all .5s;
    }

Voici le CSS complet :

    img {
        width: 120px; height: 120px;
        margin: 10px;
        border: 4px solid #ededed;
        box-shadow: 2px 2px 5px #888888;
        
        -webkit-border-radius: 60px;
           -moz-border-radius: 60px;
                border-radius: 60px;

        transition: all .5s;
        
        filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); 
        filter: gray;
        -webkit-filter: grayscale(100%);
    }
    img:hover {
        transition: all .5s;
        
        filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
        -webkit-filter: grayscale(0%);
    }

## Le résultat

Voici le résultat que vous obtenez suite à ce petit billet :

<center><iframe src="{{ site.url }}/demos/demos/avatar-en-medaillon/index.html" width="500" height="170"></iframe></center>


## Liens
[**Démonstration**](http://blog.smarchal.com/demos/avatar-en-medaillon/index.html)   
[Référence CSS - border-radius](https://developer.mozilla.org/fr/docs/CSS/border-radius)   
[Référence CSS - box-shadow](https://developer.mozilla.org/fr/docs/CSS/box-shadow)   
[Référence CSS - filter](https://developer.mozilla.org/fr/docs/CSS/filter)   
[Référence SVG - feColorMatrix](https://developer.mozilla.org/en-US/docs/SVG/Element/feColorMatrix)   
[data URIs](https://developer.mozilla.org/en-US/docs/data_URIs)