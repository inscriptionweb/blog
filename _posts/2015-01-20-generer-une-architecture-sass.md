---
layout: post
title:  "Générer une architecture Sass à partir d'un fichier Manifest"
date:   2015-01-20
tags: 
- sass
- bash
description: >
  L'astuce du jour : comment créer une arborescence de fichier Sass à partir d'un fichier Manifest !
---

## Pourquoi faire ?

[@btrd_me](https://twitter.com/btrd_me) m'a présenté hier le travail de [Una Kravets](http://unakravets.com/) : [Sass Director](http://sassdirector.com/). Le but de Sass Director est de fournir un outil en ligne (simple à utiliser) dans lequel vous copiez votre Manifest Sass, et qui vous génère une ligne de commande pour créer votre arborescence Sass. 

Pour ceux qui ne verraient pas ce qu'est un Manifest Sass, il s'agit tout simplement de votre fichier racine (`main.scss` ?) qui ne contient rien d'autre que des inclusions. Prenons le Manifest suivant par exemple :

    @import "base/normalize";
    @import "base/bootstrap";

    /*
        Helpers
     */
    @import "helpers/variables";
    @import "helpers/fonts";
    @import "helpers/animations";
    @import "helpers/mixins";
    @import "helpers/placeholders";
    @import "helpers/debug";

    /*
        Composants
     */
    @import "components/buttons";
    // @import "components/lists";
    @import "components/menu";

    /*
        Layout
     */
    @import "layout/header";
    @import "layout/content";
    @import "layout/footer";

Comme nous avons la liste complète des fichiers, il est théoriquement possible de la parcourir, de récupérer les noms de dossiers et de fichiers, puis de tous les créer. L'intérêt de tout ce bordel, c'est de n'avoir qu'un seul fichier (le Manifest) qui nous permette d'automatiser la création de l'arborescence complète.

## Comment faire ?

J'ai tenté de reproduire le fonctionnement de Sass Director en ligne de commande, ce que j'ai finalement réussi à faire en une ligne :

    $ for i in `grep -P '^\s*@import\s+([\x27\x22]).+\1' main.scss | sed -r 's/.*([\x27\x22])(.+)\1.*/\2/'`; do mkdir -p `dirname $i`; touch `echo $(dirname $i)$(echo "/_")$(basename $i)$(echo ".scss")`; done

Vu comme ça, c'est un peu hard... oui. Décortiquons tout ça.

### Éliminer les lignes inutiles

Tout d'abord, il va falloir éliminer certaines lignes, à savoir :

- les commentaires
- les imports commentés
- les imports mal formés

La commande `grep` va nous permettre de faire ce travail :

    grep -P '^\s*@import\s+([\x27\x22]).+\1' main.scss

On récupère uniquement les lignes débutant par `@import` (avec des éventuels espaces devant), avec du texte contenu entre deux simples quotes (`\x22`), ou deux doubles quotes (`\x27`). Notez qu'un texte contenu entre une simple et une double quote (eg : `@import 'folder/file";`) ne sera pas valide et sera ignoré. Voici le résultat obtenu :

    @import "base/normalize";
    @import "base/bootstrap";
    @import "helpers/variables";
    @import "helpers/fonts";
    @import "helpers/animations";
    @import "helpers/mixins";
    @import "helpers/placeholders";
    @import "helpers/debug";
    @import "components/buttons";
    @import "components/menu";
    @import "layout/header";
    @import "layout/content";
    @import "layout/footer";

### Récupérer le chemin des fichiers à créer

Nous avons les lignes qui nous intéressent, il faut à présent en extraire les chemins des fichiers, grâce à la commande `sed` :

    sed -r 's/.*([\x27\x22])(.+)\1.*/\2/'

On remplace ici le contenu de chaque ligne par ce qui ne se trouve entre les quotes uniquement :

    base/normalize
    base/bootstrap
    helpers/variables
    helpers/fonts
    helpers/animations
    helpers/mixins
    helpers/placeholders
    helpers/debug
    components/buttons
    components/menu
    layout/header
    layout/content
    layout/footer

### Éxecuter une commande sur chaque ligne

On utilise ensuite une boucle `for ... in ...; do ...; done` pour exécuter une/des commande(s) sur chaque ligne ne note liste.

### Créer le dossier 

Prenons la première ligne : `base/normalize`. Nous allons récupérer le(s) dossier(s) à l'aide de ma commande `dirname` :

    mkdir -p `dirname $i`

Ici, `$i` fait référence à la ligne courante, dans la boucle `for`. On exécute la commande `dirname` sur cette ligne, et on utilise le résultat en tant que paramètre pour la commande `mkdir`. L'argument `-p` (pour "parents") permet de créer des dossiers de manière récursive. À ce stade, le dossier est créé, mais le fichier n'existe pas encore.

### Créer le fichier 

Nous allons créer le fichier avec la commande `touch`. Mais avant tout, il s'agit de créer le nom du fichier. Les partials sont par convention préfixés d'un underscore (`_`), mais ce caractère n'est pas présent dans notre ligne d'import, de même que l'extension. On va donc concaténer :

- le dossier (`dirname $i`)
- le slash de fin plus le préfixe (`"/_"`)
- le nom du fichier (`basename $i`)
- l'extension du fichier (`".scss"`)

La chaîne finale est envoyée en tant que paramètre à la commande `touch` :

    touch `echo $(dirname $i)$(echo "/_")$(basename $i)$(echo ".scss")`;

Voilà pour l'explication de la ligne de commande !

## Utilisation avancée avec un script

Créer ce script en une seule ligne relevait plus du challenge que de l'utile pour moi. Vous pouvez aller un peu plus loin en utilisant un script complet comme celui que je vous propose ci-dessous (vous pouvez les retrouver sur son [dépôt Github](https://github.com/zessx/sass-init)) :

    # Sass tools
    sass-init() {
      # $1: manifest
      # $2: scss (default) | sass
      # $3: prefix (default) | no-prefix
      for i in `grep -P '^\s*@import\s+([\x27\x22]).+\1' $1 | sed -r 's/.*([\x27\x22])(.+)\1.*/\2/'`;
      do
        DIR=`dirname $i`
        FIL=`basename $i`
        EXT=".sass"
        if [ -z "$2" ] || [ "$2" != "sass" ]
        then
          EXT=".scss"
        fi
        PRE=""
        if [ -z "$3" ] && [ "$3" != "no-prefix" ]
        then
          PRE="_"
        fi
        FIL="${DIR}/${PRE}${FIL}${EXT}"
        mkdir -p $DIR
        touch $FIL
      done
    }

Vous pouvez au choix placer ce code dans votre fichier `.bashrc`, ou l'enregistrer dans un fichier `.sh` exécutable.

Ce script apporte deux options supplémentaires par rapport à la version précédente :

- la possibilité de créer des `.sass` à la place des `.scss`
- la possibilité d'omettre le préfixe `_`

Utilisez le comme ceci :

    sass-init main.scss
    sass-init main.scss sass
    sass-init main.scss scss no-prefix
    sass-init main.scss sass no-prefix

## Liens 

[sass-init](https://github.com/zessx/sass-init)   
[Sass Director](http://sassdirector.com/)   
[Sass Director and Manifest files](http://una.github.io/sass-manifests/)   