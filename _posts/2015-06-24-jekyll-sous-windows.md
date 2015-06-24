---
layout: post
title:  "Guide d'installation de Jekyll sous Windows"
date:   2015-06-24
tags:
- ruby
- html
- git
description: >
  Présentation de Jekyll, un générateur de sites et de blogs, et de sa procédure d'installation sous Windows
--- 

## Pourquoi Jekyll ?

Je vous en ai parlé lors de la mise en ligne de la [v3 de ce blog](http://blog.smarchal.com/v3/), j'ai utilisé Jekyll pour cette nouvelle version. J'ai principalement fait ce choix pour une raison : Jekyll permet de générer un blog statique et de l'héberger sur GitHub. En effet, cet outil a été développé par le co-fondateur de GitHub, et c'est lui qu'on retrouve derrière les GitHub Pages. 

Son fonctionnement est simple : 

- vous définissez des templates (listing, article...)
- vous créez du contenu Markdown
- vous lancez la commande `jekyll build`
- Jekyll génère votre blog avec des pages de listing, de contenu, de catégories...

Son gros avantage pour moi, c'est que GitHub l'utilise déjà. Vous n'avez donc qu'à envoyez vos sources (et pas le site généré) sur la branche `gh-pages` de votre dépôt, et GitHub se chargera de le générer. En terme de gain de temps, c'est énorme. Vous avez un nouvel article à rédiger ? Créez votre fichier Markdown en local, et quand il est prêt poussez le sur le dépôt GitHub !

## À quoi ça ressemble ?

Suite à la création d'un nouveau site/blog avec Jekyll, vous vous retrouvez avec cette petite structure de dossiers :
    
    _includes/
    _layouts/
    _posts/
    _sass/
    css/
    .gitignore
    _config.yml
    about.md
    feed.xml
    index.html

Chacun de ces éléments à un rôle : 

- `_includes/` pour vos partiels : head, header, footer...
- `_layouts/` pour vos templates : default, post, page...
- `_posts/` pour vos articles publiés
- `_sass/` pour... euh...
- `_config.xml` configuration de votre blog : métadonnées, type de Markdown, gems à utiliser...
- `index.html` point d'entrée de votre blog

Notez au passage que tout dossier précédé d'un underscore sert exclusivement à la génération du site, et ne sera pas présent dans l'architecture générée. Pour cette architecture de base, ce n'est pas le cas du dossier `css/`. Une fois le site généré, nous aurons bien ce même dossier. Comprenez donc que si vous avez un dossier à créer, posez-vous cette question :

> Ce dossier doit-il être accessible quand mon site sera publié ?

Si c'est oui, ne le préfixez pas d'un underscore. Si c'est non, et que ce dossier est uniquement utilisé par Jekyll, alors préfixez-le.

## Comment tout ça fonctionne ?

Voici le schéma d'utilisation standard de Jekyll :

    $ jekyll new blog
    $ cd blog
    $ git init
    $ git checkout gh-pages
    $ git remote add origin git@github.com:username/blog.git
    $ jekyll serve

Ici, on crée d'abord un nouveau blog avec Jekyll (`blog` est uniquement le nom du dossier, choisissez ce que vous voulez). On se rend ensuite dans le dossier créé, et on lance un serveur local à l'aide de la commande `jekyll serve`. Grâce à cette dernière commande, nous allons pouvoir accéder à l'URL `http://localhost:4000` et voir notre blog. Chaque modification sera détectée, et le blog automatiquement re-généré. 

À partir de là, vous travaillez comme bon vous semble : vous faites vos templates, vous créez du contenu, etc. 

Une fois vos modifications terminées, vous les envoyez sur votre dépôt GitHub pour les publier :

    $ git add --all
    $ git commit -m "Nouvel article"
    $ git push origin gh-pages

Rien de plus !

## Jekyll et Windows : la croisade du XXIe siècle

Bon. Maintenant que je vous ai très rapidement présenté Jekyll, il est temps d'attaquer le vrai but de cet article. La documentation de Jekyll est suffisamment bien faite, et il y a assez de ressources sur le net pour que vous compreniez aisément comment utiliser Jekyll. En revanche, les articles qui expliquent comment le faire fonctionner sous Windows sont rares. Il en existe toutefois un qui mérite d'être cité, et qui m'a plutôt aidé dans cette croisade : [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/), écrit par [@juthilo](https://twitter.com/juthilo).

Nous allons donc commencer, de zéro, en détaillant tous les prérequis.

### Ruby

Jekyll est écrit en Ruby, vous avez donc évidemment besoin de lui pour le faire fonctionner. La petite spécificité ici, c'est qu'il faudra aussi installer le Ruby DevKit, et ça tout le monde ne l'a pas forcément. Commencez donc par récupérer Ruby et Ruby DevKit **[ici](http://rubyinstaller.org/downloads/)**, en prenant garde aux versions x32/x64. Prenez Ruby 2.0.0 ou une version plus récente.

Lors de l'installation de Ruby, faites bien attention à cocher la ligne `Add Ruby executables to your PATH`. Vérifiez ensuite que Ruby est bien installé :

    $ ruby -v

Pour Ruby DevKit, il faudra extraire l'archive dans un dossier (facilement accessible via ligne de commande de préférence), puis lier tout ça à votre installation de Ruby :

    $ cd RubyDevKit/
    $ ruby dk.rb init
    $ ruby dk.rb install

Pour vérifier que votre PATH contient bien les dossiers `\bin` et `\bin\devkit`, vous pouvez lancer cette commande si vous le voulez :

    $ PATH

### Préparer Cygwin

Si vous utilisez Cygwin, il va falloir préparer le terrain. Cygwin utilise des chemins de type `/cygdrive/c/`, mais ce n'est pas le cas des outils installés manuellement (comme Ruby, ou Jekyll prochainement). Pour éviter tout soucis, nous allons spécifier deux alias de commande, pour que les Batch de Ruby et Jekyll soient utilisés. Éditez-donc le fichier `~/.bashrc` pour y ajouter ces deux lignes :

    alias gem='gem.bat'
    alias jekyll='jekyll.bat'

### Jekyll

À présent, l'installation de Jekyll proprement dite. Celle-ci se fait très simplement, via une gem :

    $ gem install jekyll

Vérifiez que tout s'est bien passé :

    $ jekyll --version

Pour les utilisateurs de [Cygwin](http://blog.smarchal.com/cygwin/) et de Ruby < 2.4, il est possible que vous ayez ce type d'erreur :

> ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why:  
> Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (
https://api.rubygems.org/latest_specs.4.8.gz)

Ceci est dû à la transition actuelle entre l'utilisation de SHA1 et SHA2 pour les certificats SSL. Si vous avez ce problème, voici la marche à suivre (des informations détaillées sont disponibles [ici](https://gist.github.com/luislavena/f064211759ee0f806c88) pour ceux qui voudraient en savoir un peu plus) :

- [Télécharger ce certificat](https://raw.githubusercontent.com/rubygems/rubygems/master/lib/rubygems/ssl_certs/AddTrustExternalCARoot-2048.pem)
- Copiez-le dans le dossier `/lib/ruby/{version}/rubygems/ssl_certs` de votre installation
- Relancez l'installation de Jekyll

Vous êtes à présent (presque) prêt à utiliser Jekyll !

### Le vice caché : Pygments

Jekyll est fourni avec un moteur de coloration syntaxique : [Pygments](http://pygments.org/). Sur un environnement Unix, vous n'aurez aucun souci à le faire fonctionner. Ce n'est pas le cas pour Windows. Pygments est écrit en Python, et ce dernier n'est pas installé par défaut sur Windows.

Cela dit, vous n'avez pas forcément besoin d'installer Python. Ce sera le cas uniquement si :

- vous avez besoin de coloration syntaxique
- vous voulez utiliser Pygments

Si c'est le cas, je vous redirige sur [le site officiel de Python](https://www.python.org/downloads/), pour télécharger la dernière version pour Windows. Même chose que pour Ruby, pensez bien à sélectionner `Add python.exe to Path` lors de l'installation. Ensuite, vous pourrez au choix installer Pygments manuellement, ou à l'aide de [pip](https://pip.pypa.io/en/latest/installing.html) (un gestionnaire de packages Python).

Si vous préférez utiliser un autre moteur de coloration syntaxique, vous pouvez. [Rouge](https://rubygems.org/gems/rouge/versions/1.9.0) par exemple, s'installe facilement via la commande suivante :

    $ gem install rouge

**Attention toutefois : les GitHub Pages ne supportent pas la gem Rouge** (j'y reviendrai dans un prochain article).  
Quel que soit votre choix, veillez à bien modifier le fichier `_config.xml` pour spécifier quel moteur vous utilisez :

    highlighter: pygments
    highlighter: rouge

### Windows Directory Monitor (wdm)

Enfin et pour finir, vous aurez besoin d'un dernier outil : [Windows Directory Monitor](https://rubygems.org/gems/wdm/versions/0.1.0). Cette gem permet de détecter des changements dans un dossier, elle est donc essentielle pour utiliser Jekyll. Vous pouvez là aussi l'installer via un simple :

    $ gem install wdm

## Utilisation de Jekyll

Vous êtes enfin prêt !

Ce fût dur, mais nous y sommes. Voici à présent et pour finir, une rapide présentation des différentes commandes que vous aurez à utiliser avec Jekyll. Je n'allais quand même pas vous laisser comme ça, sans rien, après tout ce qu'on a enduré ensemble, non ?

    $ jekyll new .

Celle-ci, nous en avons déjà parlé. C'est la commande pour créer un nouveau site/blog Jekyll. L'argument est le nom du dossier dans lequel l'instance sera créée, le dossier courant pour notre exemple.

    $ jekyll build

Ici, nous lançons un build du site, et rien de plus. Les fichiers sont générés, mais aucun serveur n'est lancé. Vous vous servirez de cette commande dans le cas ou vous ne passez pas par GitHub pour héberger votre site, par exemple.

    $ jekyll serve

Déjà évoquée, cette commande permet de lancer un serveur sur le port 4000 de l'hôte local, et de détecter tout changement de fichier source afin de re-générer le site. C'est celle que vous devriez utiliser le plus en local.

    $ jekyll serve --drafts

Dérivée de la précédente, le serveur tiendra ici compte des drafts (les articles en cours de rédaction). Ces articles qui se trouvent dans le dossier `_drafts/` ne sont habituellement pas pris en compte. Préciser l'option `--drafts` vous permet de vérifier en local l'affichage correct d'un futur article, sans avoir besoin de de publier. Notez que GitHub n'utilise évidemment pas cette option. Vous pourrez trouver plus d'informations sur les drafts [dans la documentation de Jekyll](http://jekyllrb.com/docs/drafts/)

C'est tout pour aujourd'hui !  
Je posterai probablement quelques autres article sur Jekyll, qui concerneront plus son utilisation et différentes techniques que j'aurai pu trouver.

## Liens

[Site officiel de Jekyll](http://jekyllrb.com/)  
[Jekyll sur GitHub](https://github.com/jekyll/jekyll)  
