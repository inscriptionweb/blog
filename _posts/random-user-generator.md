# Random User Generator
- zessx
- zessx
- 2013/11/22
- JS ; HTML ; Development
- published

Présentation d'un service bien utile, qui vous permet de générer de faux utilisateurs, à utiliser en guise de placeholders.

## Présentation de Random User Generator

[Random User generator](http://randomuser.me), c'est une simple url que vous appeler pour obtenir un utilisateur aléatoire. Pour obtenir un utilisateur, il suffit par exemple de faire un petit appel AJAX :

	$.ajax({
		url: 'http://api.randomuser.me/0.2/',
		dataType: 'json',
		success: function(data){
			console.log(data);
		}
	});

Vous obtenez un objet JSON formaté comme ci-dessous :

	{
		results: [{
			user: {
				gender: "female",
				name: {
					title: "mrs",
					first: "kathy",
					last: "foster"
				},
				location: {
					street: "7159 edwards rd",
					city: "seymour",
					state: "pennsylvania",
					zip: "37284"
				},
				email: "kathy.foster77@example.com",
				password: "godfather",
				md5 hash: "15d628391f0eb58d7724041ab9a12ae2",
				sha1 hash: "58be9e2c7f22cd75d7af3c9e175b6465b280d61d",
				phone: "(471)-543-4073",
				cell: "(651)-308-4754",
				SSN: "160-76-1677",
				picture: "http://api.randomuser.me/0.2/portraits/women/6.jpg"
			},
			seed: "tinyGoose"
		}]
	}

Et vous n'avez plus qu'à l'utiliser pour combler les vides nécessaire ! 

	var user = data.results[0].user;
	$('#picture')
		.attr('src', user.picture)
		.attr('alt', user.name.first+' '+user.name.last);

## Quelques options

L'url dispose de quelques options, afin d'affiner les profils que vous désirer récupérer :
<ul>
	<li>`gender` : vous pemet de choisir le genre de l'utilisateur (`female` ou `male`)</li>
	<li>`results` : vous pemet de récupérer plusieurs utilisateur d'un seul coup (de `1` à `5`)</li>
	<li>`seed` : associe une chaîne de caractère à un utilisateur. Réutiliser la même `seed` renverra le même utilisateur</li>
</ul>

## Exemple de fonctionnement

<center><iframe src="demos/random-user-generator/index.html" width="600" height="200"></iframe></center>

## Liens
[**Démonstration**](http://blog.smarchal.com/demos/random-user-generator/index.html)  
[Le site de Random User generator](http://randomuser.me)