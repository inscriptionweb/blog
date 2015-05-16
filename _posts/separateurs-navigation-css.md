# Ajouter des séparateurs de navigation en CSS
- zessx
- zessx
- 2014/08/20
- CSS ; HTML ; Development
- published

L'astuce du jour : ajoutez des séparateurs à votre barre de navigation en utilisant uniquement du CSS.

## La structure HTML

Commençons par créer une barre de navigation en HTML5, tout ce qu'il y a de plus simple : 

	<nav role="navigation">
		<ul>
			<li><a href="#">Foo</a></li>
			<li><a href="#">Bar</a></li>
			<li><a href="#">Baz</a></li>
			<li><a href="#">Qux</a></li>
			<li><a href="#">Quux</a></li>
			<li><a href="#">Corge</a></li>
			<li><a href="#">Grault</a></li>
			<li><a href="#">Garply</a></li>
			<li><a href="#">Waldo</a></li>
			<li><a href="#">Fred</a></li>
		</ul>
	</nav>

## Le CSS

Ajoutons un style de base, sans s'occuper des séparateurs :

	nav ul {
		display: table;
		list-style: none;
		overflow: hidden;
		background: #e7e7e7;
		border: 2px solid #2980b9;
		border-radius: 5px;
		padding: 0;
	}
	nav li {
		display: table-cell;
		width: 1%;
	}
	nav li a {
		display: block;
		color: #2980b9;
		text-decoration: none;
		text-align: center;
		line-height: 36px;
		padding: 0 10px;
	}
	nav li a:hover {
		color: #ecf0f1;
		background: #2980b9;
	}

<center>![La navbar sans séparateurs](posts/images/separateurs-navigation-css/bar-nosep.jpg)</center>

Il ne reste à présent qu'à rajouter les séparateurs, en utilisant une combinaison :

 - du sélecteur `+` pour sélectionner les éléments précédés par un autre élément (ce qui nous permet d'ajouter un séparateur à tous les éléments, sauf le premier)
 - du sélecteur `:before` pour ne pas affecter l'élément lui-même

<!-- sep -->

	nav li + li::before {
		content: "|";
		float: left;
		width: 2px;
		line-height: 36px;
		color: #2980b9;
		background: #2980b9;
	}

## Le résultat

<center><iframe src="demos/separateurs-navigation-css/index.html" width="600" height="90"></iframe></center>

## Liens :
[**Démonstration**](http://blog.smarchal.com/demos/separateurs-navigation-css/index.html)   