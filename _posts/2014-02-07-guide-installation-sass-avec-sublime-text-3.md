---
layout: post
title:  "Guide d'installation de SASS avec Sublime Text 3"
date:   2014-02-07
update: 2014-11-03
tags: 
- sublime-text
- sass
description: >
  Voici pour vous aider, un guide complet afin de commencer à utiliser SASS avec Sublime Text 3 !
---

## Sublime Text 3

Hop... Captain Obvious passe la tête par l'encadrure de la porte pour vous préciser que sans [Sublime Text 3](http://www.sublimetext.com/3) (j'insiste sur la v3), ce guide perd légèrement de son intérêt.

## Ruby

SASS nécessite Ruby pour fonctionner. Courez-donc installer de petit bijou si ce n'est pas déjà fait !    
Pour les utilisateurs de Windows, vous avez un installeur qui fait (presque tout pour vous) sur le site [rubyinstaller.org](http://rubyinstaller.org/downloads/). N'oubliez pas, pendant l'installation, de bien cocher ***Add Ruby executables to your PATH*** afin d'avoir accès à Ruby en ligne de commande.

Une fois l'installation terminée, vérifiez que tout est bien accessible en exécutant cette petite commande :

	ruby -v

Si vous voyez le numéro de version s'afficher (genre ***ruby 2.0.0p353 (2013-11-22) [x64-mingw32]***), c'est bon pour cette partie. Dans le cas contraire, vous avez probablement une erreur au niveau du chemin d'accès aux exécutables de Ruby (je vous avais pourtant dit de cocher la petite case !!).    
Allez donc ajouter manuellement le chemin ***C:\Ruby200-x64\bin*** dans votre ***PATH***. Pour ceux qui ne sauraient toujours pas ou ça se trouve sous Windows (!!) :

 - Clic droit sur ***Ordinateur***
 - ***Propriétés***
 - ***Paramètres systèmes avancés***
 - ***Variables d'environnement***
 - Dans les variables systèmes, en bas, modifiez ***Path***
 - Ajoutez tout à la fin ***;C:\Ruby200-x64\bin*** (bien veillez à séparer cette valeur des précédentes par un point-virgule)
 - Validez le tout et relancez la console

## SASS

Venons-en à présent à l'installation de SASS lui-même. Là, ça va être rapide : installez simplement la gemme correspondante.

	gem install sass

Vous avez a présent accès aux commandes de SASS.

## Package : Package Control

[**Package Control**](https://sublime.wbond.net/installation) est le package n°1 toutes catégories confondues !    
Il vous permet de trouver et d'installer très facilement d'autres packages. Son installation se fait en copiant collant le code fourni sur leur page d'installation dans la console de Sublime Text.

L'installation des prochains packages se fera désormais via le panneau de commande (<kbd>Ctrl</kbd>+<kbd>Maj</kbd>+<kbd>P</kbd>), en sélectionnant ***Package Control: Install Package***, et en choisissant le package désiré.

## Package : Sass

Le package [**Sass**](https://sublime.wbond.net/packages/Sass) vient simplement ajouter la coloration syntaxique et l'auto-complétion pour les fichiers SASS et SCSS.

## Package : SublimeOnSaveBuild

Le seul rôle de [**SublimeOnSaveBuild**](https://sublime.wbond.net/packages/SublimeOnSaveBuild) est de lancer les builds à l'enregistrement du fichier. Il va vous permettre d'automatiser la génération de vos ***.css*** dès que vous faites des modifications.

## Créer un nouveau build pour SASS

En parlant de build, il va bien falloir préciser à Sublime Text 3 quand et comment générer les fichiers CSS :

 - Quand ? si le fichier a une extension ***.scss*** ou ***.sass***
 - Comment ? en utilisant la fonction `sass --update <source>:<dest>`

Vous allez donc cliquer sur ***Preferences > Browse Packages***, vous rendre dans le dossier ***User/***, et créer un fichier ***SASS.sublime-build*** contenant ce code :

	{

		"cmd": [
			"sass",
			"--update",
			"--stop-on-error",
			"--no-cache",
			"--style", "compressed",
			"--sourcemap=none",
			"--load-path", "${file_path}",
			"$file:${file_path}/../css/${file_base_name}.min.css",

			"&",

			"sass",
			"--update",
			"--stop-on-error",
			"--no-cache",
			"--sourcemap=none",
			"--load-path", "${file_path}",
			"$file:${file_path}/../css/${file_base_name}.css"
		],

		"selector": "source.sass, source.scss",
		"line_regex": "Line ([0-9]+):",

		"osx":
		{
			"path": "/usr/local/bin:$PATH"
		},

		"windows":
		{
			"shell": "true"
		}

	}

Le détail des options de la commande :

 - `--update` : compilation unique (contrairement à `--watch`)
 - `--stop-on-error` : arrêt de la compilation si une erreur est détectée (préserve l'ancien CSS)
 - `--no-cache` : désactive le cache de SASS (à moins d'avoir une tonne de fichier, vous ne sentirez pas la différence)
 - `--sourcemap=none` : désactive l'utilisation des sourcemaps (introduits avec SASS 3.3)
 - `--style compressed` : génère un CSS minifié
 - `--load-path ${file_path}` : très important, permet d'importer d'autres ***.scss*** sans utiliser de chemin absolu
 - `$file:${file_path}/../css/${file_base_name}.min.css` : compile ***file.scss*** en ***../css/file.min.css***

Les lignes qui se trouvent en dehors du tableau `cmd[]` sont des lignes standard, nécessaires au bon fonctionnement du build, et que vous n'aurez pas à changer.

Vous pouvez créer autant de fichiers de build que vous voulez, ils seront accessibles via le menu ***Tools > Build System***. Il suffit de leur donner un nom explicite pour les retrouver dans le menu. Notez que le build ***SASS.sublime-build*** sera celui utilisé par défaut sur vos fichiers SASS et SCSS.    

## Utilisation

Maintenant que tout est installé, vous n'avez plus qu'à créer un fichier SASS et à l'enregistrer. La compilation se fait automatiquement dès l'enregistrement.    
Vous pouvez aussi manuellement lancer le build avec la combinaison de touches <kbd>Ctrl</kbd>+<kbd>B</kbd>.

Enjoy.

## Liens
[Sublime Text 3](http://www.sublimetext.com/3)    
[ST3 - Package Control](https://sublime.wbond.net/installation)    
[ST3 - Sass](https://sublime.wbond.net/packages/Sass)    
[ST3 - SublimeOnSaveBuild](https://sublime.wbond.net/packages/SublimeOnSaveBuild)    
[Build Systems with Sublime Text](http://docs.sublimetext.info/en/latest/reference/build_systems.html)    
[RubyInstaller](http://www.rubyinstaller.org/downloads/)    
[SASS](http://sass-lang.com/)    