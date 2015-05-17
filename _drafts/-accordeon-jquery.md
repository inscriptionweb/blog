---
layout: post
title:  "Créer son propre accordéon de contenu avec jQuery"
date:   9999-99-99
tags:
- js 
description: >
  Atelier création ! Aujourd'hui je vous présente un moyen de créer un accordéon de contenu à la main.
--- 

## Réinventer la roue ?

Quand il s'agit de mettre en place un slider, ou un accordéon de contenu, je vois généralement les gens se diriger vers Google pour trouver un plugin tout prêt. Alors les plugins c'est cool certes, mais ça n'a pas que des avantages. La plupart du temps, le plugin répondra à 80% de vos besoins, et vous devrez bricoler les 20% restants vous-même.   
D'un autre côté, vous utiliserez probablement 20% du plugin, et les 80% de lignes de code restantes resterons là, toutes tristes de rester dans leur coin...

Je ne crache pas sur les plugins jQuery, on en trouve d'excellents, paramétrables à souhaits et qui font gagner du temps. Encore faut-il les connaître ! Entre le temps passé à chercher le plugin, à l’appréhender si c'est votre première utilisation, à lire la documentation à propos d'une feature avancée dont vous avez besoin, et enfin à styler la chose pour que ce soit adapté à votre site... N'auriez-vous pas mieux fait de tout coder à la main ?

**Messieurs-dames, réinventons la roue !**

## La structure HTML

Faisons simple ici.   
Pour chaque élément de notre accordéon, nous aurons un titre, et du texte :

	<ul class="accordion" data-speed="150">
		<li class="active">
			<h3 class="accordion-title">...</h3>
			<div class="accordion-content">...</div>
		</li>
		<li>
			<h3 class="accordion-title">...</h3>
			<div class="accordion-content">...</div>
		</li>
	</ul>

Voici pour les utilisateurs d'Emmet la chaîne pour générer la structure d'exemple :

	ul.accordion[data-speed="150"]>(li.active>h3.accordion-title{Title $}+.accordion-content>lorem)*5

## Un peu de CSS

On est dans le facultatif total, l'accordéon fonctionnera sans le CSS, mais c'est un peu plus beaucoup mieux avec.

**SCSS**

	$b_main:    #e74c3c;
	$b_hover:   #c0392b;
	$c_main:    #2c3e50;
	$c_reverse: #ecf0f1;

	.accordion {
		padding: 0;
		list-style: none;

		.accordion-title {
			display: block;
			margin: 0;
			padding: 0 7px;
			line-height: 34px;
			text-decoration: none;
			cursor: pointer;
			background: $b_main;  
			color: $c_reverse;

			&:hover {
				background: $b_hover;
			}
		}
		.accordion-content {
			padding: 7px;
			color: $c_main;
			border: 1px solid $b_main;
		}
	}

**CSS**

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
		var toggleSpeed = accordion.data('speed') || 100;

		// fonction pour afficher un élément   
		function open(item, speed) {
			// on récupère tous les éléments, on enlève l'élément actif de ce résultat, et on les cache
			accordion.find('li').not(item).removeClass('active')
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
			open($(this).closest('li'), toggleSpeed);
		});
	});

On utilise quelques fonctions de base de jQuery dans ce script :

* [each()](http://api.jquery.com/each/) : pour faire une même action sur plusieurs éléments
* [data()](http://api.jquery.com/data/) : récupère un attribut de type data-foo=""
* [find()](http://api.jquery.com/find/) : recherche dans les éléments enfants
* [not()](http://api.jquery.com/not/) : enlève des éléments d'un ensemble
* [removeClass()](http://api.jquery.com/removeClass/) : supprime une classe d'un élément, si elle existe
* [addClass()](http://api.jquery.com/addClass/) : ajoute une classe à un élément, si elle n'existe pas déjà
* [slideDown()](http://api.jquery.com/slideDown/) : affiche l'élément avec un effet de déroulage
* [slideUp()](http://api.jquery.com/slideUp/) : cache l'élément avec un effet d'enroulage
* [closest()](http://api.jquery.com/closest/) : récupère le parent le plus proche (correspondant au sélecteur)
* [click()](http://api.jquery.com/click/) : définit un EventListener sur l'élément (pour l'évènement onclick)

## Le résultat
<center><iframe src="demos/accordeon-jquery/index.html" width="600" height="320"></iframe></center>

## Liens :
[**Démonstration**](http://blog.smarchal.com/demos/accordeon-de-contenu-jquery/index.html)   
[Documentation jQuery](http://api.jquery.com/)   
[Le composant Accordion, sur jQuery UI](http://jqueryui.com/accordion/)   