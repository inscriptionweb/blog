---
layout: post
title:  "Du pixel art en CSS avec box-shadow"
date:   2013-05-02
tags: 
- css
description: >
  En testant la propriété CSS **box-shadow**, j'ai trouvé par hasard un moyen de créer de multiples carrés en multipliant les ombres. En fouinant un peu sur le net, j'ai pu voir que cette technique avait déjà été utilisée pour faire du pixel art, voici donc un petit feedback de ma part !
---

## La propriété box-shadow

Cette propriété, introduite avec CSS3, permet habituellement d'ajouter une ombre portée facilement. Voici la syntaxe habituelle :

	box-shadow <offset-x> <offset-y> <blur> <color>;

Il existe des paramètres supplémentaires, plus rarement utilisés et qui ne nous intéressent pas ici. Je vous invite à passer voir [les spécifications du W3C](http://www.w3.org/TR/css3-background/#the-box-shadow) pour tous les détails.

## Le pixel art

Commençons par créer un pixel... ok, un **gros** pixel :

	div {   
		width: 50px;
		height: 50px;
		background: #00c3d4;
	}

{:.center}
![Pixel-art - Étape 1]({{ site.url }}/images/pixel-art-css-box-shadow/pixelart01.jpg)

Ajoutons une petite ombre :

	div {   
		width: 50px;
		height: 50px;
		background: #00c3d4;
		box-shadow: 3px 3px 5px #656565;
	}

{:.center}
![Pixel-art - Étape 2]({{ site.url }}/images/pixel-art-css-box-shadow/pixelart02.jpg)

Supprimons l'effet de flou en passant le paramètre `blur` à `0px` :

	div {   
		width: 50px;
		height: 50px;
		background: #00c3d4;
		box-shadow: 3px 3px 0px #656565;
	}

{:.center}
![Pixel-art - Étape 3]({{ site.url }}/images/pixel-art-css-box-shadow/pixelart03.jpg)

Il faut à présent décaler cette ombre pour qu'elle ne chevauche plus notre pixel :

	div {   
		width: 50px;
		height: 50px;
		background: #00c3d4;
		box-shadow: 50px 50px 0px #656565;
	}

{:.center}
![Pixel-art - Étape 4]({{ site.url }}/images/pixel-art-css-box-shadow/pixelart04.jpg)

Et enfin, là ou l'astuce se fait... Nous pouvons **cumuler** les ombres. Chaque ombre ajoutée va donc nous permettre de dessiner un pixel supplémentaire :

	div {   
		width: 50px;
		height: 50px;
		background: #ffa87c;
		box-shadow: 
			50px 0px 0px #ff6b42,
			0px 50px 0px #d44800,
			50px 50px 0px #c02600;
	}

{:.center}
![Pixel-art - Étape 5]({{ site.url }}/images/pixel-art-css-box-shadow/pixelart05.jpg)

Pour la suite, un modèle et de la patience feront l'affaire !   
Notez au passage que, même avec un `background: none`, vous ne pourrez pas afficher d'ombre aux coordonnées `{0;0}`. Pour éviter de faire un cas spécifique pour ce pixel, je démarre mon dessin en position `{1;1}`.

## Le résultat

	div {   
		width: 10px;
		height: 10px;
		background: transparent;
		box-shadow:
			90px 10px 0 rgb(0, 52, 206),
			100px 10px 0 rgb(0, 52, 206),
			/* ... */
			200px 390px 0 rgb(1, 0, 0),
			210px 390px 0 rgb(1, 0, 0);
	}

<center><iframe src="{{ site.url }}/demos/pixel-art-css-box-shadow/index.html" width="340" height="430"></iframe></center>

## Liens
[**Démonstration**](http://blog.smarchal.com/demos/pixel-art-css-box-shadow/index.html)   
[Un début de générateur que je prendrait (peut-être) le temps d'améliorer](http://blog.smarchal.com/demos/pixel-art-css-box-shadow/generator.php)   
[Spécifications de la propriété box-shadow](http://www.w3.org/TR/css3-background/#the-box-shadow")   
[Le Sonic complet sur CodePen](http://codepen.io/zessx/pen/BsfFt")   
[Un générateur de box-shadow pour les fainéants](http://cssmatic.com/box-shadow)   