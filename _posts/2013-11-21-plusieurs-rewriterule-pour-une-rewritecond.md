---
layout: post
title:  "Plusieurs RewriteRule pour une RewriteCond"
date:   2013-11-21
tags: 
- apache
description: >
  Petite astuce aujourd'hui, pour vous permettre d'utiliser une unique condition pour plusieurs règles dans vos **.htaccess**.
---

## Un aperçu du problème

Lors de l'écriture de fichiers ***.htaccess***, il n'est pas rare de se retrouver à avoir une même condition ***RewriteCond*** pour plusieurs règles ***RewriteRule***.   
Prenons comme exemple ces trois types d'url, permettant d'accéder à différentes pages, gérées dynamiquement :

* ***www.domain.tld/category/***
* ***www.domain.tld/category/subcategory/***
* ***www.domain.tld/category/subcategory/article/***


Vous aurez trois règles à mettre en place :

	RewriteRule ^([\w-]+)/?$                    index.php?cat=$1 [L,QSA]
	RewriteRule ^([\w-]+)/([\w-]+)/?$           index.php?cat=$1&subcat=$2 [L,QSA]
	RewriteRule ^([\w-]+)/([\w-]+)/([\w-]+)/?$  index.php?cat=$1&subcat=$2&article=$3 [L,QSA]

Afin d'éviter tout problème, vous allez chercher à rajouter une condition, pour vérifier que l'url ne correspond pas à un fichier ou dossier existant :

	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f

Le souci, c'est qu'une condition ne concerne que la règle qui la suis immédiatement. Vous vous retrouvez donc à devoir dupliquer la condition :

	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteRule ^([\w-]+)/?$                    index.php?cat=$1 [L,QSA]
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteRule ^([\w-]+)/([\w-]+)/?$           index.php?cat=$1&subcat=$2 [L,QSA]
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteRule ^([\w-]+)/([\w-]+)/([\w-]+)/?$  index.php?cat=$1&subcat=$2&article=$3 [L,QSA]

## Comment éviter la duplication d'une condition ?

Nous allons nous servir du flag `[S]` (pour ***[S]kip***), qui permet, dans le cas où l'url correspond à la regex, de sauter la règle suivante. Ce flag prend un paramètre (de la même manière que le tag `[R]`, avec l'habituel `[R=301]`), qui indique le nombre de règles à sauter. Il suffit donc d'inverser nos conditions, et de mettre une règle systématiquement vérifiée, avec un flag `[S]` pour sauter nos règles qui n'ont plus lieu d'être (la condition n'étant plus respectée).

	RewriteCond %{REQUEST_FILENAME} -d [OR]
	RewriteCond %{REQUEST_FILENAME} -f
	RewriteRule .* - [S=3]
	RewriteRule ^([\w-]+)/?$                    index.php?cat=$1 [L,QSA]
	RewriteRule ^([\w-]+)/([\w-]+)/?$           index.php?cat=$1&subcat=$2 [L,QSA]
	RewriteRule ^([\w-]+)/([\w-]+)/([\w-]+)/?$  index.php?cat=$1&subcat=$2&article=$3 [L,QSA]

## En d'autres mots...

Reprenons notre exemple, avec des mots :   
> Si ce n'est ni un dossier ni un fichier, alors vérifie la première règle.   
> Si ce n'est ni un dossier ni un fichier, alors vérifie la seconde règle.   
> Si ce n'est ni un dossier ni un fichier, alors vérifie la troisième règle.   

Voici comment le code que je vous propose fonctionne :   
> Si c'est un dossier ou un fichier, alors saute les 3 prochaines règles.   
> Vérifie la première règle   
> Vérifie la seconde règle   
> Vérifie la troisième règle   


## Liens
[Une réponse sur ServeurFault résumant la syntaxe à utiliser pour mod_rewrite](http://serverfault.com/a/214521/168109)   
[Documentation officielle du mod_rewrite](http://httpd.apache.org/docs/current/mod/mod_rewrite.html)   
[Documentation officielle sur le flag S](http://httpd.apache.org/docs/current/rewrite/flags.html#flag_s)