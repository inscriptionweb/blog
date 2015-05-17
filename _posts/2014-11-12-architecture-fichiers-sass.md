---
layout: post
title:  "Architecture de fichiers Sass"
date:   2014-11-12
tags: 
- sass
description: >
    Présentation de l'architecture de fichiers que j'utilise avec Sass.
---

## Diviser pour mieux régner

Vous est-il déjà arrivé d'utiliser la règle `@import` en CSS ?

Il y a quelques années, on a vu fleurir bon nombre d'exemples où un fichier CSS principal était inclus via une balise `<link>`, lequel importait d'autre fichiers CSS :

    @import url("layout/header.css");
    @import url("layout/content.css");
    @import url("layout/footer.css");

L'avantage évident de cette technique était qu'elle permettait de diviser son code CSS pour plus de lisibilité, tout en gardant une unique balise `<link>` dans le HTML. À l'époque (2009), un employé de Google (Steve Souders) spécialisé dans la performance des sites web, avait rédigé un article intitulé [Don't use @import](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/). Son article expliquait que la technique de l'import, si elle avait un côté pratique reconnu, influait de manière très néfaste sur les temps de chargement, et pouvait même dans certains cas provoquer certains bugs avec JavaScript. Cet article fut d'ailleurs repris en France par [Alsacréations](http://www.alsacreations.com/actu/lire/695-utilisation-style-css-import-link.html).

Sass reprit plus tard ce principe, en apportant la règle `@import`, mais surtout les partials. Les partials sont des fichiers Sass qui n'ont pas vocation a être compilés seuls, leur intérêt est d'être inclus par un autre fichier. Afin de les identifier, il faut préfixer leur nom d'un underscore.

Exemple d'un partial `_header.scss` :

    header {
        background: tomato;
    }

Et du fichier principal `app.scss`, placé dans le même dossier :

    @import "header";

    body {
        height: 100%;
    }

Le gros avantage de Sass par rapport à CSS, c'est qu'il s'agit d'un préprocesseur. C'est-à-dire que, avec la même technique précédemment présentée, vous n'aurez réellement qu'un seul fichier CSS à charger via une balise `<link>`. Ce fichier contiendra l'ensemble du code **sans faire le moindre `@import`**, évitant ainsi tout problème de chargement.

Les partials Sass sont donc à utiliser sans modération, je les considère d'ailleurs comme un des piliers de Sass, avec les variables, les règles imbriquées et les placeholders.

## Organiser ses fichiers

Cela semble évident quand on en parle, mais on ne le fait pas forcément correctement. Voici l'architecture que j'utilisais sur mes premiers projets :

    partials/
        _header.scss
        _footer.scss

    app.scss

C'est simple et ça fonctionne, mais je me retrouvais au final avec un fichier `app.scss` énorme, contenant le code spécifique à chaque page, à chaque bloc de contenu...

J'ai ensuite commencé à réfléchir à une meilleure architecture, afin de mieux répartir mon code. Bien que je l'ai pensée de mon côté, cette architecture s'approche énormément de celle que propose Hugo Giraudel dans son article [Architecture for a Sass Project](http://www.sitepoint.com/architecture-sass-project/) :

    base/
        _bootstrap.scss
        _debug.scss
        _normalize.scss

    components/
        _alerts.scss
        _buttons.scss
        _forms.scss

    helpers/
        _mixins.scss
        _placeholders.scss
        _variables.scss

    layout/
        _content.scss
        _footer.scss
        _header.scss

    pages/
        _home.scss

    vendor/

    app.scss

Cette architecture me permet de savoir rapidement où se trouve le code que je cherche, plutôt que de scroller longuement sur mon fichier `app.scss`. En parlant de ce fichier d'ailleurs, que devient-il ? Et bien il ne contient que des règles `@import`, placées dans un ordre précis :

    @import "helpers/variables";
    @import "helpers/mixins";
    @import "helpers/placeholders";

    @import "base/normalize";
    @import "base/bootstrap";
    @import "base/debug";

    @import "components/alerts";
    @import "components/buttons";
    @import "components/forms";

    // @import "vendor/...";

    @import "layout/header";
    @import "layout/content";
    @import "layout/footer";

    @import "pages/home";

N'hésitez pas à apporter votre contribution en discutant de cette architecture dans les commentaires, ou en proposant la votre !

## Liens 

[Don't use @import](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/)   
[Documentation sur la règle @import de Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import)   
[Architecture for a Sass Project](http://www.sitepoint.com/architecture-sass-project/)