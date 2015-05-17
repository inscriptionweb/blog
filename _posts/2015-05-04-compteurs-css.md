---
layout: post
title:  "Les compteurs CSS"
date:   2015-05-04
tags: 
- css
description: >
  Point sur les compteurs CSS, totalement méconnus et sous-utilisés.
---

## Le principe

CSS propose l'utilisation de compteurs internes à des fins de numérotation automatisée. Deux propriétés sont disponibles : `counter-reset` et `counter-increment`.

La première (`counter-reset`) vous permet de **créer** ou **réinitialiser** un compteur CSS.  
La seconde (`counter-increment`) vous permet d'**incrémenter** ce compteur (à condition que votre élément ne soit pas en `display: none`).

À partir de là vous avez simplement besoin d'une fonction pour **afficher** la valeur d'un compteur, et c'est précisément le but de la fonction `counter()`.

Prenons un exemple parlant. Vous avez écrit un article assez long, que vous avez illustré avec de nombreuses figures (images, schémas...). Vous avez consciencieusement placé chacune de ces figures dans une balise adaptée : `<figure>`.

	<article>
		<h1>Article title</h1>
		<p>...</p>
		<figure><img src="" /></figure>
		<p>...</p>
		<figure><img src="" /></figure>
		<figure><img src="" /></figure>
		<p>...</p>
		<figure><img src="" /></figure>
	</article>

Vous voulez à présent numéroter ces figures. Les compteurs CSS vous permettent de le faire sans toucher à votre HTML. Voici comment :

	body {
		counter-reset: figures; /* on initialise un compteur pour nos figures */
	}
	figure {
		position: relative;
		display: inline-block;
	}
	figure:before {
		counter-increment: figures; /* nouvelle figure : on incrémente le compteur */
		content: "Figure #" counter(figures); /* on affiche le compteur dans un pseudo-élément */
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		background: rgba(255, 255, 255, .5);
		padding: 5px 0;
	}

Votre CSS va donc créer un pseudo-élément pour chaque figure, ce dernier ayant pour contenu la chaîne "Figure #" suivie de la valeur courante du compteur. **Attention, la valeur d'un compteur ne peut être utilisée qu'en tant que valeur d'une propriété `content`, dans un pseudo-élément.**

## Démonstration

<center><iframe src="{{ site.url }}/demos/compteurs-css/index.html" width="600" height="600"></iframe></center>

## Aller plus loin 

Vous pouvez donner une valeur de départ à un compteur en passant cette valeur en paramètre lors de l'initialisation : 

    counter-reset: foo 3;

S'il faut réinitialiser plusieurs compteurs au sein d'un même élément, vous devez le faire en une seule fois. `counter-reset` reste avant tout une propriété CSS, et l'utiliser une seconde fois dans le même élément provoquera une surcharge du premier appel :

	body {
		counter-reset: foo 2;
		counter-reset: bar 3;
	} 
	/* foo = null
	*  bar = 3
	*/

	body {
    	counter-reset: foo 2 bar 3;
    }
	/* foo = 2
	*  bar = 3
	*/

Il est possible d'incrémenter un compteur par un nombre différent de 1, en passant ce nombre en paramètre (il est au passage possible d'utiliser des valeurs négatives pour les deux propriétés) :

	counter-reset: foo;       /* foo = 0 */
    counter-increment: foo 5; /* foo = 5 */

...et de la même manière qu'avec `counter-reset`, vous pouvez (devez) incrémenter plusieurs compteurs en une seule fois :

    counter-increment: foo 5 bar;

Vous pouvez aussi changer le type de compteur. Toutes les valeurs de la propriété `list-style-type` sont valables ici, à savoir `disc`, `circle`, `square`, `decimal`, `decimal-leading-zero`, `lower-roman`, `upper-roman`, `georgian`, `armenian`, `lower-latin`, `lower-alpha`, `upper-latin`, `upper-alpha` et `lower-greek` :

	figure:before {
		counter-increment: figures; 
		content: "Figure #" counter(figures, upper-roman); 
	}

Sachez aussi qu'il est possible d'imbriquer des compteurs. L'affichage pourra alors se faire à l'aide de la fonction `counters()`. Cette utilisation restant rarissime, je vous renvoie à la documentation pour les détails (voir les liens en fin d'article).

## Compatibilité

Les compteurs ont été définis dans la spécification 2.1 de CSS, ils sont donc très largement compatibles avec les différents navigateurs. Si on se réfère aux données de [CanIUse](http://caniuse.com/#search=counter), seuls IE6 et IE7 ne sont pas compatibles.

## Liens
[Documentation sur les compteurs CSS (MSN)](https://developer.mozilla.org/fr/docs/Web/CSS/Compteurs_CSS)   
[Spécification W3C](http://www.w3.org/TR/CSS21/generate.html#counters)   
