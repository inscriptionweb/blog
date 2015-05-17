---
layout: post
title:  "Centrer verticalement un texte multi-ligne"
date:   2013-07-11
tags: 
- css
- html
description: >
  Dès qu'on commence à me parler de centrer du texte verticalement en CSS, j'ai toujours une petite goutte de sueur qui se pointe...
---

Centrer une ligne unique, ça passe. Pour ceux qui ne connaîtraient pas l'astuce, il suffit de fixer un `line-height` égal à la valeur `height` :

	.va {
		display: block;
		width: 200px; height: 200px;
		line-height: 200px;
	}

Ceci ne fonctionne évidemment que pour une seule ligne. J'ai passé pas mal de temps à chercher un moyen de faire la même chose pour un texte de plusieurs lignes.  
Je suis tombé sur quelques astuces, toutes plus expérimentales les unes que les autres, certaines utilisant du JS, d'autres tellement complexes qu'elles sont à chaque nouveau cas difficiles à mettre en oeuvre...  
J'ai retenu une solution full-CSS, compatible avec tous les navigateurs (y compris IE6/IE7 en théorie, mais je ne me préoccupe plus de ces deux dinosaures).

Le principe va être de jouer sur 3 `line-height` à différents niveaux. Il va donc falloir imbriquer votre texte dans 2 balises `<span>`. Certes, c'est du code supplémentaire, mais c'est une des solution les plus simples du côté de la syntaxe HTML :

	<p class="va">
		<span><span>Mon texte sur une ou plusieurs lignes</span></span>
	</p>

Voici le CSS a présent :

	/* même astuce que précédemment */
	.va {
		display: block;
		width: 200px; height: 200px;
		line-height: 200px; /* les 200px s'appliquent sur le 1er span */
	}
	.va>span {
		display: inline-block;
		vertical-align: middle; /* on centre le 2e span */
		line-height: 0;
	}
	.va>span>span {
		line-height: 20px; /* on ajuste le "véritable" line-height du texte */
	}

Vous pouvez même, pour automatiser l'ajout des deux span, utiliser un bout de code en jQuery :

	$('.va').contents().wrap('<span><span></span></span>');

La syntaxe HTML redevient alors celle d'origine :

	<p class="va">Mon texte sur une ou plusieurs lignes</p>

## Liens
[**Démonstration**](http://blog.smarchal.com/demos/centrer-verticalement-texte-multi-ligne/)