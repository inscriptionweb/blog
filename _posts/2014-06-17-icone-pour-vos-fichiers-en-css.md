---
layout: post
title:  "Une icône pour vos fichiers en CSS"
date:   2014-06-17
tags: 
- css
description: >
  Voici une petite expérimentation CSS, visant à créer une icône pour les fichiers en CSS uniquement. 
---

## Les objectifs

Les icônes pour les fichiers ont un design assez simple, j'ai voulu m'amuser en essayant d'en faire une en CSS uniquement.  
Je me suis quand même fixé quelques objectifs au fur et à mesure de mon avancement, afin de fournir un résultat réutilisable :

- avoir un élément unique dans le HTML
- avoir un CSS compatible IE9+
- permettre le paramétrage des couleurs
- permettre l'ajout d'un petit texte (l'extension) 
- avoir un résultat simple d'utilisation

## Le design

Voici le design final, qui correspond (quasiment) à ce que je recherchais à faire dès le début :

{:.center}
![Le résultat final]({{ site.url }}/images/icone-pour-vos-fichiers-en-css/resultat-final.png)

## Le création de l'icône

Pour la syntaxe HTML, j'étais initiallement partie sur l'utilisation d'une classe toute simple :

	<i class="fi">html</i>

Par la suite, j'ai trouvé plus pratique de déporter le contenu textuel dans un attribut :

	<i data-fi="html"></i>

Cette méthode me permet de réutiliser ce contenu ou je le veux dans mon CSS via la propriété `content` :

   	content: attr(data-fi);
 
J'ai ensuite divisé mon icône en 3 parties, afin d'avoir le rendu désiré :

{:.center}
![La structure]({{ site.url }}/images/icone-pour-vos-fichiers-en-css/structure.png)

Pour la partie de gauche, je crée un simple rectangle de dimension `5em` x `10em`, avec deux coins arrondis. 
Il ne faut surtout pas arrondir le coin supérieur droit, et il est inutile d'arrondir l'inférieur droit vu qu'il sera caché par une autre partie.  
Point important : je définis toutes les couleurs sur cet élément, afin de faciliter la personnalisation de l'icône plus tard... j'y reviendrai.

	/* un sélecteur sur l'existence de l'attribut data-fi */
	[data-fi] { 
	    display: inline-block;
	    position: relative;

	    /* toutes les unités sont en em pour faciliter le redimentsionnement */ 
	    width: 5em; 
	    height: 10em;

	    /* on prévoit la largeur nécessaire pour le bout corné */
	    margin-right: 2.4em;

	    /* on arrondi les 2 coins à gauche */
	    border-radius: .4em 0 0 .4em;

	    /* on définit TOUTES les couleurs sur l'élément principal */
	    border-color: #ccc;
	    background: #333;
	    color: #ccc;
	}

On ajoute ensuite la partie inférieure, qui contiendra le texte. Cette partie (comme la 3e) est un pseudo-élément.  
Vous pouvez voir ici que je récupère les couleurs définies plus haut à l'aide de la propriété `background: inherit`.
Cette astuce me permet de ne pas dupliquer la définition de ma couleur, et de n'avoir à la changer qu'à un seul endroit.

	[data-fi]:after {    
		/* on ajoute le contenu de l'attribut data-fi dans l'élément */
	    content: attr(data-fi);

	    /* l'élément doit s'étendre du bout corné à en bas, */
	    /* et dépasser légèrement sur la droite pour combler l'espace occupé par ce bout corné */
	    position: absolute;
	    top: 1.3em;
	    bottom: 0;
	    left: 0;
	    right: -1.3em;

	    /* on définit une taille de police adaptée */
	    font: 1.8em/1.8em "Lucida Sans Unicode", "Lucida Grande", sans-serif normal;
	    text-transform: uppercase;
	    text-align: left;

	    /* le padding sert à placer le texte en bas */
	    padding: 2.6em 0.3em 0;

	    /* on arrondi les coins nécessaires */
	    border-radius: .4em 0 .4em .4em;

	    /* on récupère le background du parent*/
	    background: inherit;
	}

Pour terminer, le bout corné, qui utilise la technique très connue du triangle CSS.  
La partie importante ce de bout de code, c'est la définition des bordure sur 4 lignes. J'aurai pu utiliser `border-color: transparent transparent inherit inherit`,
mais ces valeurs auraient pris le dessus sur le `border-color: #ccc` du parent, et la valeur `inherit` n'aurait alors servi à rien.

	[data-fi]:before {
	    content: '';

	    /* on place l'élément en marge de la partie principale */
	    position: absolute;
	    top: 0;
	    right: -2.3em;

	    /* on affiche 2 bordure très larges pour simuler un triangle */
	    border-width: 1.2em;
	    border-style: solid;
	    border-left-color: inherit;
	    border-bottom-color: inherit;
	    border-top-color: transparent;
	    border-right-color: transparent;
	}

## Résultat et personnalisation de l'icône

Étant donné l'utilisation de la valeur `inherit` dans les pseudo-éléments, on peut créer des variantes très simplement en redéfinissant 4 propriétés du parent :

- `background` : pour la couleur de fond
- `color` : pour la couleur du texte
- `border-color` : pour la couleur du bout corné
- `font-size` : pour la taille de l'ensemble (d'où l'utilisation de de l'unité `em` un peu partout)

Quelques exemples et le résultat :

    <!-- Default -->
    <i data-fi=""></i>
  
    <!-- Default with text -->
    <i data-fi="txt"></i>
  
    <!-- Smaller -->
    <i data-fi="xml" style="font-size:50%"></i>
    
    <!-- Change background color -->
    <i data-fi="html" style="background:#e54d26"></i>
    <i data-fi="css" style="background:#0070ba"></i>
    
    <!-- Change background/font color -->
    <i data-fi="js" style="background:#d6ba32;color:#333;border-color:#333"></i>

<center><iframe src="{{ site.url }}/demos/icone-pour-vos-fichiers-en-css/index.html" width="700" height="200"></iframe></center>

## Liens
[**Démonstration**](http://blog.smarchal.com/demos/icone-pour-vos-fichiers-en-css/index.html)    
[Le Codepen pour jouer](http://codepen.io/zessx/pen/qyruj)    
[Les triangles en CSS](http://css-tricks.com/snippets/css/css-triangle/)  