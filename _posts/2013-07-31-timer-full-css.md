---
layout: post
title:  "Un timer Full-CSS"
date:   2013-07-31
tags: 
- css
description: >
  Le midi, j'aime bien tester des trucs cool.   
  Et ce midi, j'ai tenté de faire un timer, en remplaçant le JS par des animations CSS. C'est inutile, et donc totalement indispensable !
---

Tadaaam !

<center><iframe src="{{ site.url }}/demos/timer-full-css/index.html" width="350" height="230"></iframe></center>

## Le principe

Pour la petite explication, j'ai divisé chaque chiffre en 7 parties, chacune représentant une barre.   
Ensuite, il fallait identifier les différents cycles pour chaque chiffre :

* Dizaines des heures : de 0 à 9, sur 360000 secondes
* Unités des heures : de 0 à 9, sur 36000 secondes
* Dizaines des minutes : de 0 à 5, sur 3600 secondes
* Unités des minutes : de 0 à 9, sur 600 secondes
* Dizaines des secondes : de 0 à 5, sur 60 secondes
* Unités des secondes : de 0 à 9, sur 10 secondes
* Dizaines des millisecondes : de 0 à 9, sur 1 seconde
* Unités des millisecondes : de 0 à 9, sur 0.1 seconde

Chacune de ces barres va être affichée ou non à un moment donné du cycle. Une fois le cycle fini, on reprend au départ.

## Le CSS utilisé

Le CSS de base utilisé est celui-ci :

	.bar {
		/* 
		On utilise l'animation barAnimation, qui se fait sur 10 secondes,
		qui est régulière, qui débute sans délai, et qui tourne en boucle.
		*/
		-webkit-animation: barAnimation 10s linear 0 infinite; /* Chrome / Safari / Opera 15 */
		animation: barAnimation 10s linear 0 infinite;         /* Firefox / IE10 / Opera <15 */
	}
	@-webkit-keyframes barAnimation {
		from    { opacity: 0; } 
		33.332% { opacity: 0; } 
		33.333% { opacity: 1; } 
		66.665% { opacity: 1; }
		66.666% { opacity: 0; }
		99.999% { opacity: 0; }
		to      { opacity: 1; }
	}
	@keyframes barAnimation {
		from    { opacity: 0; } 
		33.332% { opacity: 0; } 
		33.333% { opacity: 1; } 
		66.665% { opacity: 1; }
		66.666% { opacity: 0; }
		99.999% { opacity: 0; }
		to      { opacity: 1; }
	}

J'utilise les valeurs 33.332% et 33.333% pour éviter qu'il y ait une transition entre `opacity: 0` et `opacity: 1`. Je suis persuadé qu'il existe un moyen plus simple, mais je vous livre la "v1" de mon expérience, j'essaierai de la simplifier par la suite.

Il est assez pratique de créer vos keyframes ligne par ligne, mais vous avez la possibilité de compresser tout ça ensuite, histoire que ça prenne moins de place en prod :

	.bar {
		-webkit-animation: barAnimation 10s linear 0 infinite;
		animation: barAnimation 10s linear 0 infinite;
	}
	@-webkit-keyframes barAnimation {
		0%, 33.332%, 66.666%, 99.999% { opacity: 0; } 
		33.333%, 66.665%, 100% { opacity: 1; } 
	}
	@keyframes barAnimation {
		0%, 33.332%, 66.666%, 99.999% { opacity: 0; } 
		33.333%, 66.665%, 100% { opacity: 1; } 
	}

J'utilise ensuite des `keyframes` différentes selon le chiffre, que je temporise différemment (un cycle pour l'unité des heures est plus long qu'un cycle pour l'unité des secondes).   
On pourra d'ailleurs utiliser les mêmes `keyframes` pour les heures, les millisecondes, et les unités des des minutes/secondes (comme le cycle est un simple `0->9`) ; même chose pour les dizaines des minutes/secondes, qui suivent le même cycle `0->5`.

## La compatibilité avec les navigateurs

Quelques règles sont à respecter pour rendre vos animations compatibles avec les différents navigateurs :

* Toujours utiliser les formes `-webkit-` et vendorless (sans préfixe)
* Ne pas mettre de guillemets autour du nom de l'animation (`animation-name`), cette forme n'est acceptée que par Webkit
* Dupliquer les keyframes (ça fait chier vu la place que ça prend, mais pas le choix)
* Ne pas oublier les vendor-prefixes à l'intérieur des keyframes si besoin (je pense particulièrement à `transform`)


**EDIT [01 Août 2013]**   
V2 : Le CSS est passé de 504 à 130 lignes, non compressé.

**EDIT [02 Août 2013]**   
V3 : Le CSS reprend un peu de poil de la bête, mais est a présent compatible avec Firefox, Opéra et Internet Explorer 10 \o/

## Liens
[**Démonstration**](http://blog.smarchal.com/demos/timer-full-css)   
[Spécifications des animations CSS3 sur le site du W3C](http://dev.w3.org/csswg/css-animations/)   
[Les animations CSS3 sur le MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)   
[La démo sur Codepen](http://codepen.io/zessx/pen/ytJig)   