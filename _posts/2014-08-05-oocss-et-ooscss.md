---
layout: post
title:  "OOCSS et OOSCSS"
date:   2014-08-05
tags: 
- sass
- css
description: >
  Présentation et comparaison de l'Object-Oriented CSS l'Object-Oriented SCSS.
---

## L'Object-Oriented CSS

Avant d'introduire l'OOSCSS, je vais déjà présenter le principe d'OOCSS pour ceux qui ne connaissent pas.

Quand on fait de l'intégration HTML/CSS, plusieurs questions se posent à un moment ou à un autre :

- Comment réduire le temps passé sur l'intégration ?
- Comment garder un CSS évolutif ?
- Comment réutiliser son CSS sur d'autres projets ?

Le principe de base du couple HTML/CSS, c'est de séparer le contenu et la présentation. Prenons par exemple deux boutons **Ajouter** et **Supprimer** :

	<button>Ajouter</button>
	<button>Supprimer</button>

Je leur applique un style de base :

	button {
		border: none;
		border-radius: 4px;
		background: #ddd;
		padding: 5px 10px;
	}

{:.center}
![CSS de base]({{ site.url }}/images/oocss-et-ooscss/css-simple.png)

Je décide de garder ce style pour tous mes boutons, mais aussi de proposer deux couleurs différentes : vert et rouge :

	<button id="button-green">Ajouter</button>
	<button id="button-red">Supprimer</button>

<!-- -->

	button {
		border: none;
		border-radius: 4px;
		background: #ddd;
		padding: 5px 10px;
	}
	#button-green {
		background: #2ecc71;
	}
	#button-red {
		background: #e74c3c;
	}

{:.center}
![CSS amélioré]({{ site.url }}/images/oocss-et-ooscss/css-ameliore.png)

Ce code est difficilement réutilisable, à cause de l'utilisation des identifiants `#button-green` et `#button-red`. Nous allons donc utiliser des classes uniquement, et même en profiter pour rendre les coins arrondis optionnels :

	<button class="background-green rounded-corners">Ajouter</button>
	<button class="background-red">Supprimer</button>

<!-- -->

	button {
		border: none;	    
		background: #ddd;
		padding: 5px 10px;
	}
	.rounded-corners {
		border-radius: 4px;
	}
	.background-green {
		background: #2ecc71;
	}
	.background-red {
		background: #e74c3c;
	}

{:.center}
![OOCSS]({{ site.url }}/images/oocss-et-ooscss/oocss.png)

Nous avons à présent 3 classes : `.rounded-corners`, `.background-green` et `.background-red`, réutilisables à souhait y compris sur d'autres types d'éléments ! Rien ne nous empêche en effet de faire ceci :

	<div class="rounded-corners">Foo</div>
	<p class="background-green">Bar</p>

L'utilisation exclusive de classes permet d'accélérer très nettement l'intégration. Vous allez créer votre "librairie" de classes CSS au fur et à mesure, et les réutiliser autant de fois qu'il le faudra. Voilà ce qu'est le principe de l'Object-Oriented CSS ! Et les avantages sont multiples :

- Vous réutilisez votre CSS : fini le copié/collé.
- Vous structurez vos fichiers CSS, à l'aide d'un fichier `library.css` par exemple (qui vous permet de tout centraliser).
- Vous intégrez instinctivement : *Je voudrais une petite ombre sur cet élément, je vais donc lui ajouter la classe `.shadow-small` qui se trouve dans ma librairie*.
- Vous uniformisez vos pages, en sachant que **toutes** vos ombres s'étendront sur x pixels et seront orientées en bas a droite.
- Vous n'avez plus qu'un seul bout de code à modifier, si l'envie vous vient de changer la teinte de ces ombres.
- Vous simplifiez vos sélecteurs dans les fichiers CSS.

## Quand la sémantique s'en mêle...

Oui, mais.  
Si l'OOCSS apporte beaucoup du côté de la présentation, il n'en dénature pas moins le contenu. Nous sommes passé de ceci :

	<button>Ajouter</button>
	<button>Supprimer</button>

... à celà :

	<button class="background-green rounded-corners">Ajouter</button>
	<button class="background-red">Supprimer</button>

Les désavantage du côté du HTML sont aussi nombreux et visibles :

- Le HTML n'est plus aussi sémantique qu'avant, on revient en arrière, au temps des `<i>`, `<b>`, `<font>` et `<center>`.
- Le HTML perd énormément en lisibilité, rempli de classes de présentation (en opposition aux classes de sémantique).
- Vous devez modifier le HTML lorsque vous faites évoluer le style de la page.
- Le HTML est lié au CSS : la classe `.rounded-corners` n'a aucun intérêt si on n'utilise pas la bonne librairie.
- Si vous utilisez une librairie, il y a de très forte chance qu'une partie du CSS ne soit pas même pas utilisée !

L'OOCSS a donc ses avantages, mais aussi ses inconvénients. Nous allons voir que l'arrivée de Sass change la donne.

## L'Object-Oriented SCSS à la rescousse

L'arrivée de Sass ces dernières années a redonné la foi à de nombreux intégrateurs. [Je vous en ai déjà parlé à l’occasion](category/sass), et ce n'est pas prêt de finir. C'est un outil que j'estime indispensable aujourd'hui car il permet un gain de temps extraordinaire, et repousse les limites imposées par le CSS. 

Tout naturellement, j'ai appliqué les principes de l'OOCSS à Sass quand j'ai commencé à l'utiliser. Je me suis du coup retrouvé avec ce genre de fichiers SCSS :

	$bg-default: #ddd;
	$bg-green:   #2ecc71;
	$bg-red:     #e74c3c;

	button {
		border: none;	    
		background: $bg-default;
		padding: 5px 10px;
	}
	.rounded-corners {
		border-radius: 4px;
	}
	.background-green {
		background: $bg-green;
	}
	.background-red {
		background: $bg-red;
	}

Emballé par les nouveautés que Sass apportait, je ne me suis pas rendu compte tout de suite que...

	<button class="background-green rounded-corners">Ajouter</button>
	<button class="background-red">Supprimer</button>

... rien n'avait changé côté HTML.

Et pourtant, si on se penche du côté des placeholders de Sass, on voit qu'il est possible de combiner sémantique et réutilisabilité. Exemple :

	/* On définit les variables */
	$bg-default: #ddd;
	$bg-green:   #2ecc71;
	$bg-red:     #e74c3c;

	/* On crée notre librairie de placeholders */
	%button {
		border: none;	    
		background: $bg-default;
		padding: 5px 10px;
	}
	%rounded-corners {
		border-radius: 4px;
	}
	%background-green {
		background: $bg-green;
	}
	%background-red {
		background: $bg-red;
	}

	/* CSS spécifique, réutilisant les placeholders */
	button {
		@extend %button;
		
		&.btn-add {
			@extend %rounded-corners;
			@extend %background-green;
		}
		&.btn-delete {
			@extend %background-red;
		}
	}

Première réaction : ça demande d'écrire un peu plus de code. Pas tant que ça au final, surtout que les deux premières parties (variables et placeholders) dont définies une unique fois (il s'agit en faire de votre librairie SCSS). Vous pouvez d'ailleurs les placer dans deux fichiers à part (`_variables.scss` et `_placeholders.scss`) que vous importerez dans vos fichiers SCSS :

	@import 'variables';
	@import 'placeholders';

	button {
		@extend %button;
		
		&.btn-add {
			@extend %rounded-corners;
			@extend %background-green;
		}
		&.btn-delete {
			@extend %background-red;
		}
	}

Mais le plus important dans tout ça (car c'était le but recherché) c'est qu'en plus d'un CSS évolutif, clair et réutilisable à souhait, nous avons ceci côté HTML :

	<button class="btn-add">Ajouter</button>
	<button class="btn-delete">Supprimer</button>

De la pure sémantique, et une unique classe... Voici ce que Sass vous permet réellement de faire !

Notez à présent le CSS généré :

	button {
		border: none;
		background: #dddddd;
		padding: 5px 10px;
	}
	button.btn-add {
		border-radius: 4px;
	}
	button.btn-add {
		background: #2ecc71;
	}
	button.btn-delete {
		background: #e74c3c;
	}

On remarque la double utilisation du sélecteur `button.btn-add`. Il ne faut pas crier au loup et craindre ici un fichier CSS gigantesque au bout du compte. Sass regroupe tout simplement les sélecteur par placeholder, et non pas l'inverse. C'est un choix qui porte ses fruits sur de gros fichiers et permet un gain de place non négligeable. 

## Pour résumer

**CSS**

- *Intégration lente*
- *Très faible réutilisabilité*
- **Modifications simples**
- **Sémantique et lisibilité du HTML excellente**
- **Lien faible entre HTML et CSS**

**OOCSS**

- **Intégration rapide**
- **Bonne réutilisabilité**
- *Modifications complexes (on doit changer le HTML)*
- *Sémantique et lisibilité du HTML déplorable*
- *Lien fort entre HTML et CSS*

**OOSCSS**

- **Intégration rapide**
- **Très bonne réutilisabilité**
- **Modifications simples**
- **Sémantique et lisibilité du HTML excellente**
- **Lien faible entre HTML et CSS**

L'OOSCSS reprend les principes de l'OOCSS, tout en corrigeant ses défauts.

## Liens
[OOCSS.org](http://oocss.org/)  
[Les placeholders Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_)  
[Les mixins Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins)  