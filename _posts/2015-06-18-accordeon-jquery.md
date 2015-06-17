---
layout: post
title:  "Un accordéon de contenu avec jQuery"
date:   2015-06-18
tags:
- js 
description: >
  Atelier création ! Aujourd'hui je vous présente un moyen de créer un accordéon de contenu à la main.
--- 

## Petite note

Cet article à été écrit il y a déjà plusieurs années, mais je ne l'avais pas encore publié. Son but originel était de présenter plusieurs fonctions jQuery. Mais plus les jours passent, plus il devient obsolète et moins il représente ma façon de travailler en JS. Du coup le voilà tel quel, je pense qu'il peut encore être utile à ceux qui découvrent jQuery. 

Sans cracher sur les plugins jQuery (on en trouve d'excellents), parfois le temps passé à chercher un plugin et à le maîtriser dépasse largement celui que vous auriez passé à développer ça vous-même. Prenons pour exemple un accordéon de contenu : il existe une myriade de plugins sur le net, mais le principe est au final tellement simple que vous pouvez le faire vous-même...

## La structure HTML

Faisons simple ici.   
Pour chaque élément de notre accordéon, nous aurons un titre, et du texte :

	<ul class="accordion" data-speed="150">
		<li class="accordion-item active">
			<h3 class="accordion-title">...</h3>
			<div class="accordion-content">...</div>
		</li>
		<li class="accordion-item">
			<h3 class="accordion-title">...</h3>
			<div class="accordion-content">...</div>
		</li>
	</ul>

Voici pour les utilisateurs d'Emmet la chaîne pour générer la structure d'exemple :

	ul.accordion[data-speed="150"]>(li.active>h3.accordion-title{Title $}+.accordion-content>lorem)*5

## Un peu de CSS

On est dans le facultatif total, l'accordéon fonctionnera sans le CSS, mais c'est un peu plus beaucoup mieux avec.

	.accordion {
		padding: 0;
		list-style: none; 
	}
	.accordion-title {
		display: block;
		margin: 0;
		padding: 0 7px;
		line-height: 34px;
		text-decoration: none;
		cursor: pointer;
		background: #e74c3c;  
		color: #ecf0f1;
	}
	.accordion-title:hover {
		background: #c0392b;
	}
	.accordion-content {
		padding: 7px;
		color: #2c3e50;
		border: 1px solid #e74c3c;
	}

## Du jQuery pour faire bouger tout ça

On va faire simple, je vais balancer le code complet, en le commentant à chaque ligne :

	$('.accordion').each(function(e) {
		// on stocke l'accordéon dans une variable locale
		var accordion = $(this);
		// on récupère la valeur data-speed si elle existe
		var toggleSpeed = accordion.attr('data-speed') || 100;

		// fonction pour afficher un élément   
		function open(item, speed) {
			// on récupère tous les éléments, on enlève l'élément actif de ce résultat, et on les cache
			accordion.find('.accordion-item').not(item).removeClass('active')
				.find('.accordion-content').slideUp(speed);
			// on affiche l'élément actif
			item.addClass('active')
				.find('.accordion-content').slideDown(speed);
		}

		// on initialise l'accordéon, sans animation 
		open(accordion.find('.active:first'), 0);

		// au clic sur un titre...
		accordion.on('click', '.accordion-title', function(ev) {
			ev.preventDefault();
			// ...on lance l'affichage de l'élément, avec animation
			open($(this).closest('.accordion-item'), toggleSpeed);
		});
	});

Voici les quelques fonctions de base de jQuery dans ce script :

* [each()](http://api.jquery.com/each/) : pour faire une même action sur plusieurs éléments
* [attr()](http://api.jquery.com/attr/) : récupère l'attribut  d'un élément
* [find()](http://api.jquery.com/find/) : recherche dans les éléments enfants
* [not()](http://api.jquery.com/not/) : enlève des éléments d'un ensemble
* [removeClass()](http://api.jquery.com/removeClass/) : supprime une classe d'un élément, si elle existe
* [addClass()](http://api.jquery.com/addClass/) : ajoute une classe à un élément, si elle n'existe pas déjà
* [slideDown()](http://api.jquery.com/slideDown/) : affiche l'élément avec un effet de déroulage
* [slideUp()](http://api.jquery.com/slideUp/) : cache l'élément avec un effet d'enroulage
* [closest()](http://api.jquery.com/closest/) : récupère le parent le plus proche (correspondant au sélecteur)
* [click()](http://api.jquery.com/click/) : définit un EventListener sur l'élément (pour l'évènement onclick)

## Le résultat

<center><iframe src="{{ site.url }}/demos/accordeon-jquery/index.html" width="600" height="320"></iframe></center>

## Liens

[**Démonstration**](http://blog.smarchal.com/demos/accordeon-de-contenu-jquery/index.html)   
[Documentation jQuery](http://api.jquery.com/)   
[Le composant natif Accordion, sur jQuery UI](http://jqueryui.com/accordion/)   