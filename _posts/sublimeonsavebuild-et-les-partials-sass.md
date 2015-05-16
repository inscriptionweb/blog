# SublimeOnSaveBuild et les partials Sass
- zessx
- zessx
- 2015/02/23
- Sublime Text ; Sass ; Development
- published

Comment éviter que le plugin SublimeOnSaveBuild compile les partials SASS (ou LESS) ?

## Le problème

Si vous travaillez avec SASS, vous utilisez probablement un fichier principal et de nombreux partials, afin de n'avoir qu'un seul fichier CSS à inclure au final (ci-dessous un exemple) :

	- app.scss
	- _variables.scss
	- _layout.scss
	- _ie6.scss
	- _ie7.scss
	- _rtl.scss

Vous avez paramétré Sublime Text pour qu'il compile le code SASS automatiquement lorsque vous enregistrez votre fichier `app.scss` (si vous ne l'avez toujours pas fait, [voici la procédure](http://blog.smarchal.com/guide-installation-sass-avec-sublime-text-3)). Oui mais voilà, le build se fait **aussi** quand vous enregistrez le fichier `_variables.scss`, et vous vous retrouvez systématiquement avec de nombreux fichiers type `variables.css` et `variables.min.css` dont vous ne vous servez pas, et que vous devez supprimer manuellement.

## Paramétrer SublimeOnSaveBuild

Pour éviter de lancer les builds sur les partials (c'est-à-dire, sur les fichiers commençant par un underscore `_`), il faut allez changer les préférences du package SublimeOnSaveBuild.  
Pour ce faire, rendez-vous dans **Preferences > Package Settings > SublimeOnSaveBuild > Settings - User**. Une fois le fichier ouvert, collez-y ce bout de code :

	{
		"filename_filter": "(/|\\\\|^)(?!_)(\\w+)\\.(css|js|sass|less|scss)$",
		"build_on_save": 1
	}

Ceci permet d'ajouter un filtre sur le nom du fichier. Si ce dernier ne correspond pas à notre regex, le build n'est pas lancé. Concernant la regex, elle vérifie que :

- `(/|\\\\|^)` : on est en début de chaîne, ou juste après un `/` ou un `\`
- `(?!_)` le premier caractère n'est pas un `_`
- `(\\w+)\\.(css|js|sass|less|scss)$` : la fin de chaîne est un nom de fichier suivi par une des extensions autorisées

And voilà !  
Dans notre exemple, seul le fichier `app.scss` sera compilé.

## Liens :
[Sublime Text 3](http://www.sublimetext.com/3)    
[SublimeOnSaveBuild](https://sublime.wbond.net/packages/SublimeOnSaveBuild)    