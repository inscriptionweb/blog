---
layout: post
title:  "Et pour quelques octets de moins"
date:   2015-09-08
tags:
- svg
description: >
    Google a présenté ces dernier jours sa nouvelle identité visuelle,
    et en a profité pour glisser qu'ils avaient mis au point une version 
    de 305 bytes de leur logo en SVG. Quelle meilleure invitation que celle-ci
    pour me lancer à mon tour dans ce challenge, et en apprendre un peu plus sur le SVG ?
--- 

## 291 octets

<center><svg fill="none" stroke-width="8" height="90">
    <circle cx="142" cy="47" r="17" stroke="#fbbc05" />
    <path d="M220,4 v63" stroke="#34a853" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m150,33 a17,17,0,1,0,0,.1 m0,-21 v41 a17,17,0,0,1,-33,6" stroke="#4285f4" />
    <path d="M110,47 a17,17,0,1,0,0,.1 M234,52 l32,-13 a17,17,0,1,0,0,17" stroke="#ea4335" />
</svg></center>

C'est là le résultat le plus abouti que j'ai pu produire pour le moment :

    <svg fill=none stroke-width=8><circle cx=142 cy=47 r=17 stroke=#fbbc05 /><path d=M220,4v63 stroke=#34a853 /><path d=M35,35h30A30,30,0,1,1,56,14m150,33a17,17,0,1,0,0,.1m0,-21v41a17,17,0,0,1,-33,6 stroke=#4285f4 /><path d=M110,47a17,17,0,1,0,0,.1M234,52l32,-13a17,17,0,1,0,0,17 stroke=#ea4335>

Il aura tout de même fallu quelques heures pour passer de ma première idée (551 octets) à ceci, avec quelques moments de lecture assidue de documentation sur le SVG.  

Avant de continuer, je suis conscient que cette version ne correspond pas au pixel prêt au nouveau logo de Google, il s'agit d'une création tout à fait originale (Google n'ayant à ce jour pas encore dévoilé la fameuse version de 305 bytes). Une armée de nazis du pixel me sont déjà tombés sur le dos après avoir lu l'article du blog de Google présentant la charte et le logo. L'intérêt était surtout de savoir si j'étais capable de trouver des moyens de minimiser mon code au possible. Ce processus de minification vous force à étudier la documentation et le code dans ses moindres détails, ce qui - quelque soit le résultat - est extrêmement enrichissant.

## L'élément `<svg>`

Un objet SVG est toujours contenu dans une balise `<svg>`. À l'intérieur de cette balise, on ajoute d'autres éléments : cercles, chemins, filtres... Tout ce qui permet de faire du dessin vectoriel.

Vous pouvez voir dans mon exemple que quelques attributs sont définis sur la balise `<svg>` :

- `fill`, pour définir la couleur de remplissage des formes dessinées
- `stroke-width`, pour définir l'épaisseur des lignes tracées

Il y a peu d'intérêt de définir ces attributs sur la balise `<svg>`, si ce n'est d'établir des valeur par défaut. L'exemple le plus important ici est `stroke-width=8`, qui permet d'avoir une épaisseur de ligne unifié, de 8 pixels.

## L'élément `<circle>`

Le premier élément créé dans ce SVG est un cercle. Cet élément est un des plus simples qui soit, il requiert 3 attributs :

- `cx`, l'abscisse de son centre 
- `cy`, l'ordonnée de son centre 
- `r`, son rayon

Dans mon exemple, j'utilise un cercle pour le second "o" de Google (le second est géré autrement pour un gain de place) :

<center><svg fill="none" stroke-width="8" stroke="#ccc" height="90">
    <circle cx="142" cy="47" r="17" stroke="#fbbc05" />
    <path d="M220,4 v63" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m150,33 a17,17,0,1,0,0,.1 m0,-21 v41 a17,17,0,0,1,-33,6" />
    <path d="M110,47 a17,17,0,1,0,0,.1 M234,52 l32,-13 a17,17,0,1,0,0,17" />
</svg></center>

    <circle cx=142 cy=47 r=17 stroke=#fbbc05 />

## L'élément `<path>`

Au cœur de cette démonstration se trouve un autre élément : `<path>`. Cet élément permet de créer des formes avancées à l'aide de 4 types de commandes :

- les déplacements
- les lignes
- les courbes
- la clôture

Ces commandes seront placées avec leurs arguments dans l'attribut `d` de l'élément, de cette manière :

    <svg>
      <path d="
        M35,35 
        h30 
        A30,30,0,1,1,56,14 
        m145,21 
        a17,17,0,1,0,.1,.1
        m5,-9
        v41
        a17,17,0,0,1,-33,6
      "/>
    </svg>

### Les déplacements

Lorsque vous créez un élément `<path>`, vous utilisez un pointeur virtuel qui servira de repère pour tous les éléments que vous déciderez d'afficher. Vous avez la possibilité de déplacer ce pointeur de deux manière différentes :

- `M10,20` déplacera le curseur de manière absolue : aux coordonnées `{10,20}`
- `m10,20` déplacera le curseur de manière relative : de 10 pixels vers la gauche et 20 pixel vers le bas par rapport à sa position actuelle

La plupart des commandes que nous allons voir ont deux versions : une première en majuscules, qui prendra des coordonnées absolues en paramètres, et une seconde en minuscules pour des coordonnées relatives.

### Les lignes

Vous savez maintenant vous déplacer dans un SVG, mais il faut utiliser d'autres commandes pour afficher quelque chose. Les premières commandes que nous allons voir permettent de tracer des lignes droites :

- `L10,20` déplacera le curseur aux coordonnées `{10,20}` (tout comme `M10,20`), tout en traçant une lignes
- `l10,20` tracera une ligne de la même manière, mais les coordonnées finales sont là aussi relatives

Voici la ligne que j'ai tracée pour la barres du "e" de Google :

<center><svg fill="none" stroke-width="8" stroke="#ccc" height="90">
    <circle cx="142" cy="47" r="17" />
    <path d="M220,4 v63" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m150,33 a17,17,0,1,0,0,.1 m0,-21 v41 a17,17,0,0,1,-33,6" />
    <path d="M110,47 a17,17,0,1,0,0,.1 M234,52 l32,-13 a17,17,0,1,0,0,17" />
    <path d="M234,52 l32,-13" stroke="#ea4335" />
</svg></center>

    <svg fill="none" stroke-width="8">
      <path d="M234,52 l32,-13" stroke="#ea4335" />
    </svg>

Il existe aussi des raccourcis pour les lignes horizontales et verticales :

- `H15` pour tracer une ligne horizontale jusqu'à l'abscisse 15
- `h15` pour tracer une ligne horizontale de 15 pixels vers la gauche
- `V15` pour tracer une ligne verticale jusqu'à l'ordonnée 15
- `v-5` pour tracer une ligne verticale de 5 pixels vers le haut

Ce sont ces commandes `h` et `v` que j'ai utilisées pour dessiner les deux "g" et le "l" de Google :

<center><svg fill="none" stroke-width="8" stroke="#ccc" height="90">
    <circle cx="142" cy="47" r="17" />
    <path d="M220,4 v63" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m150,33 a17,17,0,1,0,0,.1 m0,-21 v41 a17,17,0,0,1,-33,6" />
    <path d="M110,47 a17,17,0,1,0,0,.1 M234,52 l32,-13 a17,17,0,1,0,0,17" />
    <path d="M220,4 v63" stroke="#34a853" />
    <path d="M35,35 h30" stroke="#4285f4" />
    <path d="M206,26 v41" stroke="#4285f4" />
</svg></center>

    <svg fill="none" stroke-width="8">
      <path d="M220,4 v63" stroke="#34a853" />
      <path d="M35,35 h30" stroke="#4285f4" />
      <path d="M206,26 v41" stroke="#4285f4" />
    </svg>

### Les courbes

Il existe plusieurs types de courbes pouvant être utilisées dans un élément `<path>` :

- les courbes de Bézier cubiques (avec les commandes `C`, `c`, `S` et `s`)
- les courbes de Bézier quadratiques (avec les commandes `C`, `c`, `S` et `s`)
- les arcs (avec les commandes `A` et `a`)

N'étant absolument pas familier des courbes de Bézier, je ne pourrai pas vous en parler dans cet article. Si vous avez quelques bons articles permettant de comprendre facilement comment créer ce genre de courbes à la main, n'hésitez pas à les poster dans les commentaires, ça m'intéresse fortement !

Afin de dessiner les deux "g" et le "e", j'ai utilisé des arcs de cercle. Cette commande est un peu plus compliquée à appréhender car elle requiert un peu plus de paramètres (7), mais il suffit de prendre  le temps de lire la documentation pour les assimiler.  

Un arc se détermine à partir d'un cercle ou d'une ellipse, les 3 premiers paramètres (`rx`, `ry` et `x-axis-rotation`) servent à définir ce cercle ou cette ellipse.  

- dans le cas d'un cercle, il suffit de définir des rayons horizontal et vertical identiques. Le troisième paramètre n'a ici pas d'incidence, laissez donc sa valeur à 0 : `A 30,30 0 ...`
- dans le cas d'une ellipse, vous aurez besoin de deux rayons différents pour définir sa forme. Le troisième paramètre permettra de pivoter l'ellipse, vous le définirez en degrés: `A 50,25 -45 ...`

Je vais revenir sur les deux paramètres suivant (4e et 5e) plus tard. Les deux derniers paramètres (6e et 7e) définissent le point d'arrivée de votre arc. Une fois le point de départ et l'ellipse de référence définis (ou le cercle, dans son cas particulier), il existe deux moyens pour tracer un arc :

- placer l'ellipse, et définir l'angle de l'arc
- définir le point d'arrivée, et placer l'ellipse pour qu'elle passe par des points de départ et d'arrivée

C'est cette seconde solution qui a été choisie par le W3C. Elle apporte le gros avantage de simplifier les calculs lors de la création de vos arcs. Nous avons donc les coordonnées d'arrivées en derniers paramètres. Ces coordonnées seront absolues ou relative selon que vous utiliserez la commande `A` ou `a` : `A 30,30 0 ... 56,14`

Enfin, les deux paramètres manquants permettent de déterminer quelle ellipse sera utilisée, et quelle portion sera dessinée. Nous avons en effet deux points, et une même ellipse peut être placée à deux endroits différents sur ces deux points. De la même manière, une ellipse passant par deux points laisse deux arcs disponibles : un petit et un grand (ou deux arcs de même taille dans le cas particulier où les points sont opposés). Voici un petit schéma pour comprendre le problème, sur lequel vous pouvez voir deux ellipses identiques, passant par les même deux points de départ et d'arrivée. Les 4 arcs possibles sont affichés dans des couleurs différentes. 

<center> <svg stroke-width="8" fill="none" stroke="black" height="140">
  <path d="M70,50 A50,25,30,0,0,100,100" stroke="#fbbc05"/>
  <path d="M70,50 A50,25,30,0,1,100,100" stroke="#34a853"/>
  <path d="M70,50 A50,25,30,1,0,100,100" stroke="#4285f4"/>
  <path d="M70,50 A50,25,30,1,1,100,100" stroke="#ea4335"/>
  <circle cx="70" cy="50" r="2" fill="black"/>
  <circle cx="100" cy="100" r="2" fill="black"/>
</svg></center>

Le 4e paramètre (`large-arc-flag`) définit s'il faut utiliser l'arc le plus grand (1), ou le plus petit (0).  
Le 5e paramètre (`sweep-flag`) définit s'il faut utiliser l'arc en sens horaire (1) ou anti-horaire (0).  
Voici ce que donne la combinaison de ces deux paramètres avec les exemples ci-dessus :

- `large-arc-flag="0" sweep-flag="0"` : jaune
- `large-arc-flag="0" sweep-flag="1"` : vert
- `large-arc-flag="1" sweep-flag="0"` : bleu
- `large-arc-flag="1" sweep-flag="1"` : rouge

Cette combinaison de deux paramètres permet de pouvoir choisir l'arc a dessiner dans n'importe quel cas. Voici les différents arc utilisée pour les lettres :

<center><svg fill="none" stroke-width="8" stroke="#ccc" height="90">
    <circle cx="142" cy="47" r="17" />
    <path d="M220,4 v63" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m150,33 a17,17,0,1,0,0,.1 m0,-21 v41 a17,17,0,0,1,-33,6" />
    <path d="M110,47 a17,17,0,1,0,0,.1 M234,52 l32,-13 a17,17,0,1,0,0,17" />
    <path d="M65,35 A30,30,0,1,1,56,14" stroke="#4285f4"/>
    <path d="M110,47 a17,17,0,1,0,0,.1" stroke="#ea4335"/>
    <path d="M206,67 a17,17,0,0,1,-33,6" stroke="#4285f4" />
    <path d="M266,39 a17,17,0,1,0,0,17" stroke="#ea4335" />
</svg></center>

    <svg fill="none" stroke-width="8">
      <path d="M35,65 A30,30,0,1,1,56,14" stroke="#4285f4"/>
      <path d="M110,47 a17,17,0,1,0,0,.1" stroke="#ea4335"/>
      <path d="M206,67 a17,17,0,0,1,-33,6" stroke="#4285f4" />
      <path d="M266,39 a17,17,0,1,0,0,17" stroke="#ea4335"/>
    </svg>

### La clôture 

Il reste enfin une commande, que je n'ai pas utilisée : `z`. Cette commande ne prend aucun argument, et ne fait aucune distinction entre sa version en majuscule et celle en minuscule. Elle permet de tracer une ligne droite jusqu'au dernier déplacement explicite, autrement dit jusqu'à la dernière commande `M` ou `m`.  

C'est une commande utile pour terminer des formes anguleuses. Elle aurait aussi pu, par exemple, être utilisée pour finir le "e" de Google :

<center><svg fill="none" stroke-width="8" stroke="#ccc" height="90">
    <circle cx="93" cy="47" r="17" />
    <circle cx="142" cy="47" r="17" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m145,21 a17,17,0,1,0,.1,.1 m5,-9 v41 a17,17,0,0,1,-33,6" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m145,21 a17,17,0,1,0,.1,.1 m5,-9 v41 a17,17,0,0,1,-33,6" />
    <path d="M234,52 l32,-13" />
    <path d="M220,4 v63" />
    <path d="M266,56 A17,17,0,0,1,234,52 m0,0 A17,17,0,0,1,266,40 z" stroke="#ea4335" />
</svg></center>

    <svg fill="none" stroke-width="8">
      <path d="M266,56 A17,17,0,0,1,234,52 m0,0 A17,17,0,0,1,266,40 z" stroke="#ea4335" />
    </svg>

## La minification

Une fois tous les éléments créés, l'étape de la minification a pu commencer. 

Dès le départ, je me suis rendu compte que mon SVG était mal formé. J'avais utilisé des cercles pour chaque lettre, et je jouais sur un effet de superposition pour cacher des morceaux de ces cercles. Pour le "G" par exemple j'avais dessiné un cercle bleu, puis la barre centrale et enfin un trait supplémentaire, blanc et épais visant à cacher une portion à droite du cercle. Cette technique faisait appel à 3 éléments rien que pour le "G" (un `<circle>`, et deux `<path>`), alors qu'un seul `<path>` suffisait. La première étape a donc été de tout réécrire pour utiliser un minimum d'éléments possible.

J'ai au passage laissé un `<circle>` car son passage en `<path>` prenait plus de place. L'autre (le "o" rouge), a été intégré au `<path>` rouge afin de gagner en place : cela évite de créer un autre élément, et de redéfinir la couleur en attribut.

Ensuite, il a fallu trouver quels étaient les éléments facultatifs à l'affichage du SVG :

- les guillemets autour des valeurs des attributs : `cx="93"` => `cx=93` 
- les espaces entre les commandes : `M 220,4 v 63` => `M220,4v63`
- les zéros inutiles : `0.1` => `.1`
- la balise fermante `</svg>`
- le slash fermant de la dernière balise `<path>`

Enfin, j'ai découvert au fil de mes recherches quelques raccourcis :

- l'utilisation de `h` et `v` au lieu de `l` dans certains cas
- l'utilisation de coordonnées relatives plutôt qu'absolues (ce qui permet d'avoir des coordonnées a 1 ou 2 chiffres plutôt qu'à 3)
- ...

Et tout ceci pour un résultat de 291 octets !

<center><svg fill="none" stroke-width="8" height="90">
    <circle cx="142" cy="47" r="17" stroke="#fbbc05" />
    <path d="M220,4 v63" stroke="#34a853" />
    <path d="M35,35 h30 A30,30,0,1,1,56,14 m150,33 a17,17,0,1,0,0,.1 m0,-21 v41 a17,17,0,0,1,-33,6" stroke="#4285f4" />
    <path d="M110,47 a17,17,0,1,0,0,.1 M234,52 l32,-13 a17,17,0,1,0,0,17" stroke="#ea4335" />
</svg></center>


## Liens
[CodePen originel](http://codepen.io/zessx/pen/gapgRr)   
[Référence SVG - &lt;path&gt;](http://www.w3.org/TR/SVG/paths.html#PathElement)   
[Référence CSS - &lt;circle&gt;](http://www.w3.org/TR/SVG/shapes.html#CircleElement)  