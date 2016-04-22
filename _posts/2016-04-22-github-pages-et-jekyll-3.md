---
layout: post
title:  "Les GitHub Pages et Jekyll 3"
date:   2016-04-22
tags:
- git
- ruby
description: >
  Jekyll 3 débarque sur les GitHub Pages ! Mais il n'apporte pas que du bonheur...
--- 

## Une nouvelle ère

Depuis le 1er févier dernier, GitHub a déployé la 3e version de Jekyll, pour servir ses GitHub Pages. J'ai déjà parlé de ces pages à plusieurs reprises ([ici](http://blog.smarchal.com/heberger-son-site-sur-github), ou encore [là](http://blog.smarchal.com/v3)) quand j'avais décidé d'héberger mon blog sur GitHub, puis lors de sa refonte l'année dernière.

Et qu'apporte donc Jekyll 3 ?   

Avec cette nouvelle version, Jekyll entend surtout accélérer grandement le rendu de vos pages. Concrètement cela se traduit une régénération des GitHub Pages (et donc une diffusion de vos modification) beaucoup plus rapide.   
Bonne nouvelle donc !

Si les changements sont les bienvenus, ils faut tout de même être au courant que certaines de ces modifications risquent de foutre le bordel sur vos sites. Afin d'être plus rapide, Jekyll à en effet supprimé certaines de ses dépendances. GitHub en a fait de même en abandonnant quelques plugins, et là, ça vous concerne !

## Le parseur Markdown

Plusieurs parseurs Markdown différents étaient auparavant disponible avec Jekyll 2, comme `kramdown`, `rdiscount` ou `redCarpet`.  
À partir du 1er mai 2016, **le seul parseur accepté sera `kramdown`**, pensez-donc à mettre à jour votre fichier de configuration `_config.yml` :

	markdown: kramdown

Normalement la transition ne devrait poser aucun problème, car les fonctionnalités de `rdiscount` et `redCarpet` sont intégrées à `kramdown`. Autre précision, le support de Textile (une alternative au Markdown) est aussi abandonné.

## La coloration syntaxique

La coloration syntaxique sera désormais uniquement gérée par `rouge`. Là, c'est une bonne nouvelle car `rouge` est codé en Ruby, il n'y a plus besoin d'installer Python et `pygments` pour les versions locales de vos sites !   
Pensez là aussi à mettre à jour votre fichier de configuration :

	highlighter: rouge

Et à changer la syntaxe dans vos fichiers Markdown, de ceci :

	{ % highlight php % }
	<?php print 'foo'; ?>
	{ % endhighlight % }

À ceci :

	```php
	<?php print 'foo'; ?>
	```

## Les urls

Et enfin, le changement le plus important. Jekyll 3 a radicalement changé la structure du dossier `_site` (le dossier généré, qui contient votre site). Précédemment, un dossier était créé pour chaque post. Prenons l'architecture suivante par exemple :

	_posts/
	  2016-04-22-mon-article.md 
	_site/

Une fois votre site généré avec la commande `jekyll`, vous aviez ceci :

	_posts/
	  2016-04-22-mon-article.md 
	_site/
	  mon-article/
	    index.html

En accédant à l'URL `/mon-article`, vous étiez alors automatiquement redirigé vers le dossier présent à cet endroit, en résultait une URL avec un trailing slash toujours présent : `/mon-article/`.

Mais depuis Jekyll 3, ce n'est plus un dossier au nom de votre article qui est généré, mais bien un fichier :

	_posts/
	  2016-04-22-mon-article.md 
	_site/
	  mon-article.html

La conséquence de tout cela ? Toutes les URLs que vous avez pu utiliser avec des trailing slash génèrent à présent des erreurs 404 ! Pour corriger cela vous avez deux méthodes ; soit vous décidez de garder le trailing slash et il faudra mettre votre configuration à jour conséquemment :

	permalink: /:title/

Soit vous décidez de supprimer tous ces slash, et il faudra dans ce cas ruser en gérant la redirection dans votre fichier `/404.html` :

	<script>
	  // Remove trailing slash because of Jekyll 3
	  var urll = location.href;
	  var urls = location.href.replace(/#.*/, '');
	  if(urls.substr(urls.length - 1) === '/') {
	    window.location = urll.replace(/\/(?=#|$)/, '');
	  }
	</script>

Dernier détail, mais pas des moindres : pensez à faire un tour sur votre compte Disqus si vous en avez un, afin de rediriger toutes ces mauvaises URLs vers les bonnes. Disqus considère les URLs `/mon-article` et `/mon-article/` comme étant différentes, et crée alors deux discussions. Il vous faudra les fusionner pour s'assurer qu'il ne manque aucun commentaire.


## Liens
[Post de GitHub sur le déploiement de Jekyll 3.0](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0)   
[Guide de mise à jour de Jekyll 2 à Jekyll 3](http://jekyllrb.com/docs/upgrading/2-to-3/)   