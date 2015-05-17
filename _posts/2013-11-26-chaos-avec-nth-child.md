---
layout: post
title:  "Le chaos avec nth-child()"
date:   2013-11-26
tags: 
- css
- html
description: >
  Comment faire pour donner une petite touche de chaos dans vos design, sans toucher au JS ?
---

## L'effet attendu

Une fois n'est pas coutume, je vais commencer par le résultat final, histoire que vous visualisiez ce que je voulais obtenir :

<center><iframe src="{{ site.url }}/demos/chaos-avec-nth-child/index.html" width="600" height="600"></iframe></center>

(Vous noterez l'utilisation de [Random User Generator](http://blog.smarchal.com/random-user-generator) dont j'ai parlé dans un précédent billet)

## La base avant tout

Je suis parti d'une structure très basique, me permettant d'afficher le nom d'une persone sous sa photo :

	<ul class="pictures">
		<li>
			<img src="http://link.to/image.jpg" alt="first name">
			<p>first name</p>
		</li>
		...
	</ul>

J'ajoute un peu de CSS pour donner l'effet photo Polaroid :

	ul.pictures {
		width: 500px;
		margin: 25px auto;
		padding: 0;
		list-style: none;
	}
	li { 
		width: 100px; height: 130px;
		border: 5px solid white;
		text-align: center;
		background: white;
		border-radius: 2px;
		box-shadow: 0 0 1px #333;
		float: left;
	}
	p {
		font-family: 'Roboto';
		margin: 0;
		font-weight: 400;
		line-height: 30px;
		text-transform: capitalize;
	}
	img {
		width: 100px; height: 100px;
	}

{:.center}
![Polaroid style !]({{ site.url }}/images/chaos-avec-nth-child/polaroid.jpg)

Voilà, nous sommes prêts à ajouter...

## The chaos trick

L'astuce consiste à appliquer diverses rotations à des ensembles d'éléments différents, en utilisant `nth-child()`. J'applique une première rotation à tous les éléments : 

	li:nth-child(1n) { 
		-webkit-transform: rotate(4deg); 
			    transform: rotate(4deg); 
	}

Notez que l'utilisation du préfixe `-moz-` tend à disparaître pour la propriété `transform` (elle n'est plus nécessaire depuis Firefox 16). De même, le `li:nth-child(1n) {}` est tout à fait inutile, un `li {}` suffisait amplement, mais je l'ai gardé pour l'exemple.

{:.center}
![Une seule rotation]({{ site.url }}/images/chaos-avec-nth-child/nth-child-1.jpg)

J'applique ensuite une rotation différente à 1 élément sur 2 :

	li:nth-child(2n) { 
		-webkit-transform: rotate(-6deg); 
			    transform: rotate(-6deg); 
	}

Cette seconde rotation va venir écraser l'ancienne (et non s'y combiner) :

{:.center}
![Deux rotations]({{ site.url }}/images/chaos-avec-nth-child/nth-child-2.jpg)

Bon, là on peut pas vraiment encore parlé de chaos. Mais si on prolonge le principe avec ***3n***, ***5n*** et ***7n*** ? 

	li:nth-child(1n) { 
		-webkit-transform: rotate(4deg); 
			    transform: rotate(4deg); 
	}
	li:nth-child(2n) { 
		-webkit-transform: rotate(-6deg); 
			    transform: rotate(-6deg); 
	}
	li:nth-child(3n) { 
		-webkit-transform: rotate(2deg); 
			    transform: rotate(2deg); 
	}
	li:nth-child(5n) { 
		-webkit-transform: rotate(-4deg); 
			    transform: rotate(-4deg); 
	}
	li:nth-child(7n) { 
		-webkit-transform: rotate(10deg); 
			    transform: rotate(10deg); 
	}

Voyons ce qui va se passer, vous avez ci-dessus les éléments concernés par chacun des sélecteurs CSS que j'ai utilisé :

{:.center}
![Les éléments affectés par les différents sélecteurs]({{ site.url }}/images/chaos-avec-nth-child/nth-child-per-type.jpg)

Si on tiens compte de l'ordre dans lequel je les déclare, et du fait qu'une nouvelle rotation écrase l'ancienne, on se retrouve à la fin avec ceci :

{:.center}
![Le sélecteur retenu pour chaque élément]({{ site.url }}/images/chaos-avec-nth-child/nth-child-all.jpg)

Et là, ça send tout de suite moins le ménage de printemps ! Voici donc comment vous pouvez donner un semblant d'aléatoire et de chaos dans vos créations !


## Liens
[**Démonstration**](http://blog.smarchal.com/demos/chaos-avec-nth-child/index.html)    
[Random User Generator, utilisé pour les portraits et les noms](http://blog.smarchal.com/random-user-generator)   
[Can I Use ? transform](http://caniuse.com/#feat=transforms2d)   
[Master of the :nth-child()](http://nthmaster.com/)   