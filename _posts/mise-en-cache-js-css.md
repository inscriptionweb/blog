# La mise en cache des ressources JS/CSS
- zessx
- zessx
- 2014/01/04
- Development ; CSS ; JS ; HTML ; PHP
- published

Le cache, c'est la vie, mais il arrive parfois qu'il pose quelques soucis.

## To cache or not to cache ?

Prenons un exemple concret pour exposer le problème. Vous avez mis en ligne une page HTML avec ses ressources JS/CSS, et vous avez consciencieusement mis en place un petit htaccess pour mettre ces ressources en cache, et éviter aux clients de les recharger systématiquement :

	# Extrait de html5-boilerplate
	<IfModule mod_expires.c>
	    ExpiresActive on
	    ExpiresDefault                        "access plus 1 month"
	  # CSS
	    ExpiresByType text/css                "access plus 1 year"
	  # JavaScript
	    ExpiresByType application/javascript  "access plus 1 year"
	</IfModule>

Le tout étant utilisé le plus simplement du monde :

	<!DOCTYPE html>
	<html>
	    <head>
	        <meta charset="utf-8">
	        <meta http-equiv="X-UA-Compatible" content="IE=edge">
	        <title>Hello world!</title>
	        <link rel="stylesheet" href="css/app.css">
	    </head>
	    <body>
	        <script src="js/app.js"></script>
	    </body>
	</html>

Jusqu'ici tout va bien, mais quelques mois plus tard vous devez faire une modification mineure sur le CSS. Vous modifiez le fichier, vous l'uploadez, et le problème survient. Votre ancien fichier CSS étant en cache, et sa date d'expiration n'étant pas encore atteinte, votre site l'utilise toujours, sans connaître le nouveau. Vous avez plusieurs choix :

* Vider votre cache
* Forcer le rechargement des ressources avec un <kbd>Ctrl</kbd>+<kbd>F5</kbd>
* Forcer le rechargement des ressources en maintenant la touche <kbd>F5</kbd> enfoncée quelques secondes
* Attendre l'expiration de l'ancienne ressource pour que la nouvelle soit mise en cache à sa place (?!!)

Ce n'est pas problématique tant que vous êtes le seul visiteur du site, mais allez-vous demander à tous les visiteurs de vider leur cache ?

**Comment forcer le rechargement des ressources côté client, tout en maintenant l'utilisation du cache ?**

## Piste 1 : le versioning

La première piste à suivre est le versioning. Plutôt que d'utiliser des ressources du type ***app.css***, vous utiliserez un nom différent pour chaque version :

	<link rel="stylesheet" href="css/app-1.0.css">

* **Avantages :** vous pouvez garder facilement les versions précédentes en cas de pépin, vos ressources sont bien toutes mises en cache, et la solution ne requiert que du HTML.
* **Inconvénients :** vous êtes obligé de modifier vos sources à chaque version, et vous devez veiller à ce que la page HTML ne soit pas elle-même en cache !

## Piste 2 : le timestamping

Seconde piste, nous allons ajouter un paramètre inutile à l'url de notre ressource, en veillant à ce que ce paramètre soit toujours différent :

	<?php
	    $t = time();
	?>
	<link rel="stylesheet" href="css/app.css?<?php echo $t ?>">
	<!-- Exemple de résultat : css/app.css?1445444940 -->

Ce paramètre ne sert à rien, mais l'url utilisée pour la ressource est différente, ce qui force son rechargement, ce que nous recherchions.

* **Avantages :** la solution est automatisée, vous avez juste à uploader la nouvelle version, sans modifier les sources.
* **Inconvénients :** le timestamp étant en pratique toujours différent, votre ressource sera systématiquement rechargée, on perd tout l'intérêt de la mise en cache

## Piste 3 : filemtime()

Troisième piste, l'utilisation de `filemtime()`. Cette fonction retourne la date de dernière modification d'un fichier (sous la forme d'un timestamp Unix). Nous voulons que notre ressource reste en cache, tant qu'elle n'est pas modifiée. S'il n'y a pas eu modification, le timestamp et donc l'url seront les mêmes, et on ira chercher la ressource en cache. Si en revanche, il y a eu modification, l'url change et la ressource est rechargée :

	<?php
	    $t = filemtime(PATH_ASSETS.'css/app.css');
	?>
	<link rel="stylesheet" href="css/app.css?<?php echo $t ?>">

Notez qu'il faut évidemment définir la constante `PATH_ASSETS` dans votre code.

* **Avantages :** la solution est automatisée, et utilise le cache
* **Inconvénients :** certains CDN ne prennent pas les paramètres ***GET*** en compte, cette piste ainsi que la #2 deviennent alors inutilisables dans ces cas ([voir ce lien](http://stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring))

## Piste 4 : l'url rewriting

Afin d'éviter tout problème lié au paramètre ***GET*** ajouté, il reste une dernière piste : utilisé un couplage de versioning et d'url rewriting.    
Le principe repose sur la piste #3, qui est de continuer d'avoir une url qui change à chaque mise à jour, tout en évitant au développeur de renommer/éditer ses fichiers. Plutôt que de placer le résultat de `filemtime()` dans un paramètre ***GET***, nous allons le placer dans le nom du fichier lui-même, et s'assurer via l'url rewriting que le tout pointe bien sur le fichier.

Voici le côté client :

	<?php
	    $t = filemtime(PATH_ASSETS.'css/app.css');
	?>
	<link rel="stylesheet" href="css/app.<?php echo $t ?>.css">

Et le côté serveur, dans le ***.htaccess*** :

	RewriteEngine On
	RewriteRule ^(css|js)/([\w-]+)\.\d+\.\1$ $1/$2.$1 [L]

Cette règle va concerner toutes les urls qui concernent nos fichiers JS et CSS, et va simplement supprimer le timestamp de l'url :

- ***css/app.1445444940.css*** => ***css/app.css***
- ***js/app.1445444940.js***   => ***js/app.js***

<!-- - -->

* **Avantages :** la solution est automatisée, utilise le cache, et le nom du fichier diffère systématiquement
* **Inconvénients :** -

Merci à [@jiceb](https://twitter.com/jiceb) pour ses remarques sur la piste #3, et ses précieux conseils pour la piste #4 !

## Liens

[La fonction filemtime()](http://php.net/manual/fr/function.filemtime.php)    
[Apache mod_expire](http://httpd.apache.org/docs/2.2/mod/mod_expires.html)    
[Revving filenames : don't use querystrings](http://stevesouders.com/blog/2008/08/23/revving-filenames-dont-use-querystring)