# Sublime Text et les espaces en fin de ligne
- zessx
- zessx
- 2014/12/21
- Sublime Text ; Development
- published

Comment supprimer les espaces en fin de ligne automatiquement, et intelligemment ?

## L'origine du problème

Quand on travaille sur de nombreux fichiers, on ne fait pas systématiquement attentions aux espaces en fin de ligne. Les nombreuses tabulations, les suppressions, les changenements de format, les duplications... de nombreux cas peuvent provoquer l'apparition de ces espaces indésirables.    
Vous pouvez supprimer ces espaces à la main, encore faut-il avoir la patience nécessaire... Nous allons voir comment automatiser cela.

## L'option `trim_trailing_white_space_on_save`

Dans vos préférences utilisateur (`Preferences > Settings - User`), ajoutez cette ligne :

	{
		"trim_trailing_white_space_on_save": true
	}

Avec cette option activée, tous les espaces en fin de ligne seront supprimés !

## Le problème de la ligne courante

Un problème survient assez rapidement avec cette option activée : les espaces à la fin de la ligne courante (celle sur laquelle vous êtes en train de travailler) sont eux aussi supprimés.    
Si ce comportement ne vous convient pas, vous avez la possibilité d'affiner l'option pour que la ligne courante ne soit pas prise en compte :

	{
		"trim_trailing_white_space_on_save": true,
		"trailing_spaces_include_current_line": false
	}

## Le problème du Markdown

Nous sommes de plus en plus nombreux à utiliser le `Markdown` (avec l'extension `.md`), principalement pour faire des fichiers `README.md` pour Github (ou tenir à jour un blog sous Dropplets !).    
Malheureusement, ce format de fichier tient compte des espaces en fin de ligne : 2 espaces ou plus signifient qu'il faut faire un retour à la ligne.    
La syntaxe n'est pas forcément très heureuse, toujours est-il qu'elle existe, et qu'il faudrait éviter de supprimer ces espaces, sous peine de voir votre fichier complètement ruiné !

Afin de désactiver l'option `trim_trailing_white_space_on_save` pour les fichiers `Markdown`, il va falloir créer un fichier `Markdown.sublime-settings` dans le dossier `Packages/User` (accessible via le menu `Preferences > Browse Packages`). Dans ce fichier, vous pouvez préciser la configuration spécifique aux fichiers reconnus comme utilisant le `Markdown`. Remplissez-le avec un simple :

	{
		"trim_trailing_white_space_on_save": false
	}

Et voilà !    
Des espaces supprimés en fin de ligne à chaque enregistrement, sauf sur la ligne de travail (courante) et dans les fichiers `.md`.

## Liens :
[Sublime Text 3](http://www.sublimetext.com/3)    
[Mes préférences utilisateur pour ST3](https://gist.github.com/zessx/8235212)    
[Le Markdown](http://fr.wikipedia.org/wiki/Markdown)    
[Dropplets](http://dropplets.com/)    