# Le sélecteur jQuery :contains et la casse
- zessx
- zessx
- 2014/11/20
- jQuery ; JS ; Development
- published

Petite astuce pour pouvoir utiliser un sélecteur jQuery `:contains` insensible à la casse.

## Le comportement standard de `:contains`

Ce sélecteur jQuery permet de récupérer des éléments qui contiennent un certain texte, dans leur contenu direct ou celui de leurs enfants. Voici ci-dessous un exemple de son utilisation :

	// Met en avant les résultats contenant le mot "foo"
    var word = 'foo'
	$('.result:contains(' + word + ')').css('color', 'tomato');

Sur la liste de résultats suivante, seuls les 2 derniers éléments seront mis en avant :

	<ul class="results">
		<li class="result">Lorem ipsum</li>
		<li class="result">Foo bar</li>
		<li class="result">Dolor sit amet</li>
		<li class="result">Lorem ipsum foo</li>
		<li class="result">!! foo bar baz</li>
	</ul>

Le second élément, qui contient pourtant bien le texte "Foo bar", n'est pas pris en compte par le sélecteur car ce dernier est **sensible à la casse**.

## Insensible tu seras...

Pour rendre ce sélecteur insensible à la casse, il va falloir le redéfinir. Cette redéfinition se fait à l'aide de la fonction `createPseudo()` (une fonction de Sizzle, qui est utilisé par jQuery pour créer ses sélecteurs) :

	$.expr[":"].contains = $.expr.createPseudo(function( text ) {
		return function( elem ) {
			return $(elem).text().toLowerCase().indexOf( text.toLowerCase() ) >= 0;
		};
	});

N'oubliez pas que pour fonctionner, ce code doit être placé avant le premier appel à `:contains()`, sans quoi celui-ci utilisera la version standard de jQuery (sensible à la casse). Enfin, vous avez toujours la possibilité de définir un autre mot-clé pour ce sélecteur :

    $.expr[":"].ci_contains = ...
    

## Liens :
[Sizzle](http://sizzlejs.com/)   
[jQuery](http://jquery.com/)   
[Documentation de :contains](http://api.jquery.com/contains-selector/)   