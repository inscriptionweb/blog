# Emmet
- zessx
- zessx
- 2013/04/12
- Sublime Text ; CSS ; HTML
- published

J'ose espérer que vous connaissez tous [Emmet](http://emmet.io/) (anciennement ZenCoding). Si ce n'est pas le cas, vous allez probablement me vénérer pendant quelques années pour vous l'avoir fait découvrir. Emmet est **LE** plugin essentiel au développement web. Son but est de vous fournir des raccourcis d'écriture afin de vous faire gagner du temps lorsque vous pondez de nombreuses lignes de code.

J'ai découvert le plugin ZenCoding (à l'époque) pour [Notepad++](http://notepad-plus-plus.org/fr/). Je suis depuis passé à [Sublime Text](http://www.sublimetext.com/3). Le plugin Emmet est aussi porté pour Sublime Text, tout comme il l'est pour d'autres éditeurs : [Eclipse](http://www.eclipse.org/), [Coda](http://panic.com/coda/), [TextMate](http://macromates.com/)...

## HTML
L'atout numéro 1 d'Emmet, c'est qu'on n'a plus besoin d'écrire l'intégralité d'une structure HTML. Prenons pour exemple la structure suivante :

	<ul id="menu">
		<li><a href="">Page 1</a></li>
		<li><a href="">Page 2</a></li>
		<li><a href="">Page 3</a></li>
	</ul>

Il vous suffira décrire le code suivant, et terminer par un petit coup de touche <kbd>Tab</kbd> :

	>ul#menu>li*3>a>{Page $}

La syntaxe abrégée d'Emmet s'inspire des sélecteurs CSS :

### div>p>a
Ajoute un enfant à l'élément :

	<div>
		<p>
			<a href=""></a>
		</p>
	</div>

### div+p+a
Ajoute un élément au même niveau que l'élément précédent :

	<div></div>
	<p></p>
	<a href=""></a>

### div>p^a
Ajoute un élément au niveau supérieur (on remonte d'un cran) :

	<div>
		<p></p>
	</div>
	<a href=""></a>

### div>p>a*3
Ajoute plusieurs éléments :

	<div>
		<p>
			<a href=""></a>
			<a href=""></a>
			<a href=""></a>
		</p>
	</div>

### div#mon_id>p.ma_classe
Définit l'identifiant ou une classe de l'élément :

	<div id="mon_id">
		<p class="ma_classe"></p>
	</div>

### div{texte}
Ajoute du contenu à l'élément

	<div>texte</div>

### div*3{texte $}
Ajoute une numérotation incrémentielle automatique :

	<div>texte 1</div>
	<div>texte 2</div>
	<div>texte 3</div>

### div>lorem
Ajoute un Lorem Ipsum à l'élément :

	<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, repellat voluptatibus nam excepturi natus quaerat inventore. Laudantium, ad cumque saepe incidunt aspernatur minus inventore molestiae! Suscipit, amet facere id unde.</div>

### div>lorem6
Précise le nombre de mots que doit contenir le Lorem Ipsum :

	<div>Lorem ipsum dolor sit amet, consectetur.</div>

## CSS

### -w-transition
Le raccourci `-w-` va générer la propriété CSS avec le préfixe `-webkit-`, et sans aucun préfixe :

	-webkit-transition: ;
	transition: ;

4 raccourcis existent : `-w-` (Webkit), `-m-` (Mozilla), `-o-` (Opera) et `-s-` (Microsoft).

### -wmo-transition
Il est possible de combiner les raccourcis :

	-webkit-transition: ;
	-moz-transition: ;
	-o-transition: ;
	transition: ;

Emmet offre de nombreuses autre possibilités moins utilisées, comme la génération rapide de dégradés CSS3 ou des fonctions de navigation dans le DOM. Je les utilise rarement, soit parce que j'utilise d'autres plugins plus complets, soit parce que je n'en ai pas suffisamment besoin. Vous pourrez tout de même trouver un récapitulatif des fonctions d'Emmet [ici](http://docs.emmet.io/cheat-sheet/)</a>.

Enfin et pour vous donner définitivement envie, voici un exemple d'utilisation d'Emmet, couplée avec InsertNums pour l'insertion de séquences alphanumériques :

<center>![Emmet + InsertNums](posts/images/emmet/emmet-insertnums.gif)</center>

## Liens :
[Site officiel du plugin Emmet](http://emmet.io/)    
[Documentation complète](http://docs.emmet.io/)    
[Cheet Sheet - Récapitulatif des fonctions](http://docs.emmet.io/cheat-sheet/)    
[Site officiel de Sublime Text 3](http://www.sublimetext.com/3)    