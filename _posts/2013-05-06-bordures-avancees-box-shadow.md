---
layout: post
title:  "Bordures avancées avec box-shadow"
date:   2013-05-06
tags: 
- css
description: >
  Vu que je teste la propriété **box-shadow** en ce moment, je vais vous balancer une autre petite astuce qui m'est venue à l'idée dans la journée.   
  En calculant bien ses décalages, il est possible de simuler l'ajout de plusieurs bordures sur un même élément.
---

Gardez bien à l'esprit que votre ombre aura toujours la forme de votre élément (ça reste une ombre, merde.), mais que vous pouvez agir sur sa taille. Voici, ce coup-ci, la syntaxe complète de `box-shadow` :

	box-shadow <inset> <offset-x> <offset-y> <blur-radius> <spread-radius> <color>;

Dans mon précédent article, je n'avais pas introduit les paramètres `inset` et `spread-radius` parce qu'ils n'avaient aucun intérêt dans ce cas précis. Mais aujourd'hui on va s'en servir ! Nous avons donc, dans l'ordre :

* `inset` : affiche l'ombre vers l'intérieur de l'élément (optionnel)
* `offset-x` : décale l'ombre sur l'axe X
* `offset-y` : décale l'ombre sur l'axe Y
* `blur-radius` : augmente le flou (optionnel)
* `spread-radius` : augmente la taille de l'ombre (optionnel)
* `color` : définit la couleur de l'mbre (optionnel)

En jouant sur cette taille, et en faisant bien attention à l'ordre dans lequel on ajoute nos ombres, on va pouvoir simuler des bordures. Voici quelques exemples :

## Une double bordure toute simple

	.double-border {
		box-shadow:
			0 0 0 3px #999,
			0 0 0 6px #333;
	}

{:.center}
![Double bordure simple]({{ site.url }}/images/bordures-avancees-box-shadow/double-border.png)

## Une double bordure arrondie
...qui donne un effet sympa quand on décale les deux ombres.

	.rounded-double-border {
		border-radius: 0 15px; 
		box-shadow:
			-3px -3px 0 3px #999, 
			 3px  3px 0 3px #333;
	}

{:.center}
![Double bordure arrondie]({{ site.url }}/images/bordures-avancees-box-shadow/rounded-double-border.png)

## Deux coins mis en avant

	.double-coins-border {
		box-shadow:
			60px 60px 0 -50px #333,
			-60px -60px 0 -50px #333,
			0 0 0 6px #999;
	}

{:.center}
![Deux coins mis en avant]({{ site.url }}/images/bordures-avancees-box-shadow/double-coins-border.png)

## Un bordure dans un style "couture"

	.seam-border {
		border: 2px dashed #333;
		box-shadow:
			0 0 0 1px #333,
			inset 0 0 0 1px #333;
	}

{:.center}
![Un bordure dans un style couture]({{ site.url }}/images/bordures-avancees-box-shadow/seam-border.png)

## Une bordure arc-en-c... 
DOUBLE RAINBOWS !! RAINBOWS EVERYWHERE !!11!

	.rainbow-border {
		box-shadow:
			0 0 0 1px #f80c12,
			0 0 0 2px #ff4422,
			0 0 0 3px #feae2d,
			0 0 0 4px #aacc22,
			0 0 0 5px #12bdb9,
			0 0 0 6px #3311bb;
	}

{:.center}
![DOUBLE RAINBOWS !! RAINBOWS EVERYWHERE !!11!]({{ site.url }}/images/bordures-avancees-box-shadow/rainbow-border.png)

Vous pouvez en découvrir plein d'autres dans la démo, hébergée sur le blog ou CodePen (liens ci-dessous).

## Liens
[**Démonstration**](http://blog.smarchal.com/demos/bordures-avancees-box-shadow/)   
[Spécifications de la propriété box-shadow](http://www.w3.org/TR/css3-background/#the-box-shadow)   
[La démo sur CodePen](http://codepen.io/zessx/pen/IdFnl)   