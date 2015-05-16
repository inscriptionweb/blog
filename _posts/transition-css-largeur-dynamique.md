# Transition CSS et largeur dynamique
- zessx
- zessx
- 2014/06/10
- CSS ; Development
- published

Ça y est, c'est la reprise des astuces CSS ! Sans transition, la suite... *kof*

## Une histoire de valeurs

Un problème qui survient lorsqu'on travaille avec les transitions en CSS, c'est qu'elles nécessitent toutes une valeur de départ, et une valeur de fin. 

En guise d'exemple, je vous présente le problème auquel j'ai eu à faire face récemment. Je cherchais à avoir un bouton avec un petit effet sur son `:hover` :

 - Dans son état normal, le bouton doit avoir une taille fixe, identique pour tous les boutons de ce type.
 - Au survol de la souris, la taille du bouton doit augmenter progressivement, jusqu'à atteindre la taille suffisante pour afficher tout les contenu de ce bouton.
 - Le contenu des boutons est dynamique, et sa taille varie d'un bouton à l'autre.

Voyons ci-dessous les essais réalisés.

## Essai #1 : `width: auto`

La première idée qui vient à l'esprit, c'est de faire une transition sur la valeur de `width` :

	.element {
		width: 0px;
		transition: width .4s;
	}
	.element:hover {
		width: auto;
	}

Le problème, c'est que la transition est incapable de déterminer la taille finale de l'élément. Ne connaissant pas la "distance" à parcourir, la transition finit par purement et simplement sauter à l'état final.

## Essai #2 : `width: 200px;`

Afin de s'assurer que la transition aie une valeur de départ et de fin, nous pouvons fixer cette valeur manuellement :

	.element {
		width: 0px;
		transition: width .4s;
	}
	.element:hover {
		width: 200px;
	}

La transition s'effectue bien, mais on perd ce qu'on cherchais à préserver au départ, à savoir une taille de contenu variable.

## Essai #3 : `width: 100%`

Nouvel essai sur la largeur, pourquoi ne pas utiliser une largeur de 100% ?

	.element {
		width: 0px;
		transition: width .4s;
	}
	.element:hover {
		width: 100%;
	}

La transition s'effectue là aussi, mais ce n'est pas du tout le résultat recherché, puisque la largeur de l'élément dépend du conteneur. Cela revient à reporter la fixation de la taille sur le conteneur, on ne gagne donc rien, pire, on y perd.

## Essai #4 : `max-width: 100%`

L'astuce consiste à ne pas toucher à la valeur de `width`, mais plutôt celle de `max-width` :

	.element {
		max-width: 0px;
		transition: max-width 1s;
	}
	.element:hover {
		max-width: 100%;
	}

On effectue une transition de `max-width: 0px;` à `max-width: 100%;`. Travailler sur `max-width` ne pose aucun problème tant que les valeurs de départ et de fin restent au delà des valeurs possibles de `width`. Ainsi, aucun souci visuel puisque la largeur reste déterminée par `width`.

On trouve cependant un petit inconvénient à cette astuce : la durée de la transition se fait bien sur `max-width`, ce qui signifie que vous ne pouvez pas maîtriser finement la durée de l'animation. Avec un `max-width: 200px`, un `width: 100px`, et une `transition: max-width 1s`, votre transition va durer seulement une demie-seconde (.5s pour les 100 pixels visibles, et .5s pour les 100 pixels "invisibles" jusqu'aux 200px définis).  
Et c'est encore plus complexe avec les différentes valeurs de `transition-timing-function` !! Mais bon, on peut s'en contenter en trichant un peu, et en évitant les transition sur de trop grandes valeurs.

## Le résultat
<center><iframe src="demos/transition-css-largeur-dynamique/index.html" width="400" height="250"></iframe></center>

## Liens :
[**Démonstration**](http://blog.smarchal.com/demos/transition-css-largeur-dynamique/index.html)   
[Les transitions CSS - W3C](http://www.w3.org/TR/css3-transitions/)   
[Utiliser les transition CSS - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions)   