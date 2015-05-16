# Minifier vos fichiers JS avec Sublime Text
- zessx
- zessx
- 2014/07/02
- JS ; Sublime Text ; Development
- published

Nous avons déjà vu [comment compiler du SASS avec Sublime Text](http://blog.smarchal.com/guide-installation-sass-avec-sublime-text-3), voyons aujourd'hui comment minifier du JS.

## UglifyJS

Je vous présente pour l'occasion [UglifyJS](https://github.com/mishoo/UglifyJS2) !  
C'est cet outil qui sera à même de minifier notre JS.  

Il a besoin [NodeJS](http://nodejs.org/) pour fonctionner, passez-donc l'installer en deux temps trois mouvements si ce n'est pas déjà fait (un redémarrage de votre machine sera probablement requis).

Lancer ensuite cette commande pour installer UglifyJS :

	npm install uglify-js -g

N'oubliez pas l'option `-g` pour que ce soit une installation globale. Sans cette option, la commande `ugilfyjs` ne sera accessible que dans le répertoire duquel vous avez lancé l'installation.


## Une histoire de build

Comme pour SASS, nous allons créer un fichier de build spécifique pour le JS, qui définira quelle commande Sublime Text exécutera à l'enregistrement de nos fichiers. 

En parlant d'enregistrement... Avez-vous installé [**SublimeOnSaveBuild**](https://sublime.wbond.net/packages/SublimeOnSaveBuild) ?
Pour ceux qui n'auraient pas lu [l'article sur SASS](http://blog.smarchal.com/guide-installation-sass-avec-sublime-text-3) (COMMENT ?!!), il s'agit simplement d'un package qui lance les builds correspondants à chaque fois que vous enregistrez votre fichier.
Il est utile, mais facultatif, vous pouvez toujours lancer les builds à la main à l'aide d'un petit <kbd>Ctrl + B</kbd>

Pour créer le fichier de build : cliquez sur ***Preferences > Browse Packages***, rendez-vous dans le dossier ***User/***, et créez un fichier ***JS.sublime-build*** contenant ce code :

	{

		"cmd": [
			"uglifyjs",
			"$file",
			"--output", "${file_path}/${file_base_name}.min.js",
			"--compress",
			"--screw-ie8",
			"--enclose",
		],

		"selector": "source.js",
		"line_regex": "Line ([0-9]+):",
		"encoding": "cp1252",

		"osx":
		{
			"path": "/usr/local/bin:$PATH"
		},

		"windows":
		{
			"shell": "true"
		}

	}

Ce code précise que notre build :

- concerne tous les fichiers avec une extension en `.js`
- utilise la fonction `uglifyjs` pour générer le résultat
- stocke le résultat dans le même dossier, et dans un fichier ayant le même nom, mais avec une extension en `.min.js`

Les options qu'on utilise pour `uglifyjs` sont les suivantes :

- `--compress` : active la minification du code
- `--mangle` : raccourci le nom des variables et des fonctions
- `--screw-ie8` : ne tiens pas compte d'IE8 et les version précédentes (si vous ne spécifiez pas cette option, `uglifyjs` ajoute du code alternatif pour être compatible)
- `--enclose` : englobe le résultat dans une fonction auto-appelée

## Exemple

Et bien... il ne reste plus qu'à ouvrir/éditer un fichier JS, et à lancer le build (soit via un enregistrement si vous avez installé ***SublimeOnSaveBuild***, via <kbd>Ctrl + B</kbd> sinon).  
Petit exemple avec ce code en jQuery :

	$(function() {

		function add_red_border(elements)
		{
			$(elements).css(
				'border',
				'3px solid tomato'
			);
		}

		var img_no_alt = $('img:not([alt]), img[alt=""]');
		add_red_border(img_no_alt);

	});

Qui devient :

	!function(){$(function(){function o(o){$(o).css("border","3px solid tomato")}var t=$('img:not([alt]), img[alt=""]');o(t)})}();

## L'option `--beautify`

Cette option peut vous être utile en remplacement de `--compress`, si vous préférez garder un JS lisible, mais tout de même réduit.  
Vous pouvez gardez l'option `--mangle`, mais si la lisibilité est votre but, ce n'est pas recommandé. Voici ce que ça donne pour notre exemple (sans `--mangle`) :

	(function() {
	    $(function() {
	        function add_red_border(elements) {
	            $(elements).css("border", "3px solid tomato");
	        }
	        var img_no_alt = $('img:not([alt]), img[alt=""]');
	        add_red_border(img_no_alt);
	    });
	})();

## Liens

[Guide d'installation de SASS avec Sublime Text 3](http://blog.smarchal.com/guide-installation-sass-avec-sublime-text-3)  
[UglifyJS](https://github.com/mishoo/UglifyJS2)  
[NodeJS](http://nodejs.org/)  
[SublimeOnSaveBuild](https://sublime.wbond.net/packages/SublimeOnSaveBuild)  
[Documentation de UglifyJS](https://github.com/mishoo/UglifyJS2#usage)  