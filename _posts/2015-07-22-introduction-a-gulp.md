---
layout: post
title:  "Introduction à Gulp"
date:   2015-07-22
tags:
- bash
- js
description: >
  Suite à ma découverte de Gulp, voici un petit retour pour vous le présenter et vous expliquer comment le mettre en place.
--- 

## A l'origine, Sass

Si vous me lisez depuis quelques temps, vous savez probablement que je suis un fervent utilisateur de Sass.  

J'ai initialement utilisé [SublimeOnSaveBuild](http://blog.smarchal.com/guide-installation-sass-avec-sublime-text-3/#package--sublimeonsavebuild) pour gérer la compilation automatiquement.
Quand j'ai changé d'emploi et que j'ai commencé à travailler avec de nouveaux collègues, j'ai cherché à généraliser l'utilisation de Sass au sein de l'équipe. 
Je me voyais mal leur imposer, en plus d'un nouveau langage, mon éditeur de texte et sa configuration.

J'ai donc regardé du côté de [Koala](http://koala-app.com/), puis de [Prepros](https://prepros.io/). 
Ces deux softs permettaient à tout le monde d'utiliser Sass, quelque soit son éditeur/IDE, sans passer par de trop gros changements.
Autre intérêt, ils permettaient aussi d'utiliser [UglifyJS](https://github.com/mishoo/UglifyJS) pour minifier le JavaScript, ou [Autoprefixer](https://github.com/postcss/autoprefixer) pour s'affranchir des vendor-prefixes

Mais ce n'était pas suffisant.

## Gulp

Voilà déjà quelques temps que je lorgnais sur Grunt et Gulp pour améliorer mon workflow. Plutôt Gulp d'ailleurs, qui semble avoir pris l'avantage sur Grunt grâce à un système de flux et à une configuration moins verbeuse.  
Je manque un peu de temps ces jours-ci, et je n'imaginais pas que Gulp puisse être mis en place et testé rapidement, l'idée me trottait donc dans la tête sans en émerger. Il aura fallu [un nouvel article de Raphaël Goetter](http://www.alsacreations.com/tuto/lire/1685-ebauche-de-workflow-gulp-taches-uncss-includes-critical-css.html) pour me dire, une fois de plus, que ça avait l'air 'achement cool. Et me lancer.

[Gulp](http://gulpjs.com/) est un outil de gestion de tâches en JavaScript.   
Une fois installé, il se base sur un fichier `gulpfile.js` placé à la racine de votre projet, dans lequel sont définies les tâches disponibles.
Ces tâches vous permettent de modifier vos sources (Sass, JS, HTML, images...) afin de... et bien afin de faire ce que vous voulez ! 
Minification, compression d'images, compilation, vérification syntaxique, tout est possible et la seule limite est le besoin que vous en avez.

## Installation

Gulp est un outil basé sur [NodeJS](http://nodejs.org/), il faudra donc avant tout l'installer si ce n'est pas déjà fait. Leur site propose de télécharger des installeurs tout prêts, il n'y a rien de compliqué.

Une fois NodeJS en place, installez gulp :

    $ npm install --global gulp

Hum... c'est bon, Gulp est installé.  
Besoin d'un plugin ? Ci-dessous un exemple d'installation de `gulp-sass` :

    $ npm install --global gulp-sass

Voilà voilà...

## Fonctionnement

Pour commencer, voici un schéma qui va vous suivre jusqu'à la fin de cet article. Nous allons voir chaque partie du schéma, afin de comprendre le fonctionnement basique de Gulp.

{:.center}
![Exemple de tâches Gulp]({{ site.url }}/images/introduction-a-gulp/taches-gulp.png)

Il y a 5 fonctions de base à connaître avec Gulp, le reste ne sera que plugins :

- `gulp.task()` : définit une tâche exécutable
- `gulp.src()` : charge des fichiers (entrée) dans le flux pour travailler dessus
- `gulp.pipe()` : ajouter un traitement supplémentaire dans le flux
- `gulp.dest()` : renvoie le résultat du flux dans un fichier (sortie)
- `gulp.watch()` : observe si des fichiers sont modifiés, pour lancer des tâches automatiquement

## Les tâches

*Les trois blocs au bords arrondis du schéma représentent chacun une tâche.*  
Prenons d'abord la tâche `css`, qui va prendre des fichiers `.scss` en entrée, et générer un fichier `dist.css` en sortie. Cette tâche utilise trois plugins Gulp : 

- Sass
- Autoprefixer
- Minify CSS

Ces plugins seront appelés dans un ordre précis, avec ou sans paramètres selon les cas. Si on reprend la tâche complète, voici comment elle sera définie en JS :

    gulp.task('css', function() {

        // Récupération du fichier app.scss en entrée
        return gulp.src(source + '/scss/app.scss')

            // Compilation du Sass
            .pipe(sass())

            // Autoprefixer, avec les options définies
            .pipe(autoprefixer({
                browsers: ['> 1%', 'last 2 versions']
            }))

            // Minification du CSS
            .pipe(minify())

            // Sortie dans le fichier dist.css
            .pipe(gulp.dest(dest + '/css/dist.css'));

    });

Le code est assez simple à comprendre, il se compose majoritairement d'options de configuration des plugins Gulp. Notez l'utilisation systématique de `pipe()` pour concaténer les traitements. Les fichiers en entrée sont modifiés plusieurs fois avant d'avoir le résultat final, qui est renvoyé dans un fichier en sortie. Vous auriez pu faire tout ceci à la main, avec une succession de lignes de commande, mais Gulp est justement là pour centraliser et simplifier tout ça !

La tâche `js` quant à elle sera définie comme ceci :

    gulp.task('js', function() {
        return gulp.src([
                source + '/js/libs/jquery.js',
                source + '/js/libs/touche.js',
                source + '/js/app.js'
            ])
            .pipe(concat())
            .pipe(uglify())
            .pipe(gulp.dest(dest + '/js/dist.js'));
    });

Pas grand chose ne change, si ce n'est qu'on utilise d'autres plugins, et que cette fois-ci nous avons plusieurs fichiers en entrée. À ce propos d'ailleurs, vous pouvez utiliser quelques éléments de regex dans les paths fournis à `src()` (je n'ai pas encore été voir si ce sont des regex simplifiées, ou carrément des PCRE) :

- `app.js` : un fichier précis
- `libs/*.js` : tous les fichiers JS dans le dossier `libs/`
- `libs/*/*.js` : tous les fichiers JS dans un sous-dossier direct de `libs/`
- `libs/**/*.js` : tous les fichiers JS dans `libs/` ou ses sous-dossiers (sans limite de profondeur)
- `scss/**/[^_]*.scss` : très utile, tous les fichiers SCSS, sauf ceux commençant par un underscore (les partials)

Souvenez-vous bien que les fichiers sont ajoutés **dans l'ordre ou Gulp les récupère**. Cet ordre peut avoir sont importance dans le cas d'une concaténation par exemple, alors restez vigilants sur ce point.

## Les plugins

Vos tâches auront besoin de plugins Gulp pour fonctionner. Ces plugins ne sont pas grand chose de plus que des wrappers permettant d'utiliser des outils en ligne de commande à travers Gulp.  
Si on reprend notre tâche `css`, nous avons trois plugins à installer et à charger. Nous avons vu plus haut comment les installer, voici à présent comment charger Gulp et ses plugins dans le fichier `gulpfile.js` :

    // Chargement de Gulp
    var gulp         = require('gulp');

    // Chargement des plugins
    var sass         = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');
    var minify       = require('gulp-minify-css');
    var uglify       = require('gulp-uglify');
    var concat       = require('gulp-concat');

Rien de plus pour les plugins !  
Notez au passage qu'on a utilisé deux variables dans notre tâche, qui sont simplement des paths qu'on aura définis dans le fichier :

    // Définition de variables
    var source       = './assets/';
    var dest         = './dist/';

## Exécuter une tâche

Il y a plusieurs manières d'exécuter une tâche Gulp. Sur le schéma, ces exécutions sont représentées par des flèches en pointillés.

### Exécution spécifique

La première manière, c'est la ligne de commande (*losanges verts sur le schéma*). Elle permet d'exécuter de manière ponctuelle une tâche spécifique.  
Vous venez de modifier un fichier Sass, et voulez régénérer le CSS pour voir le résultat. Pour se faire il suffit d'ouvrir un terminal, de se rendre dans le dossier de votre projet et d'exécuter cette commande :

    $ gulp css

Ici, la tâche `css` sera exécutée, et vous aurez quelques informations dans le terminal vous indiquant si tout s'est bien passé ou pas.

### Exécution générale

La seconde manière, c'est de passer par la tache par défaut.  
Nous avons déjà vu les tâches `css` et `js`, mais il reste une troisième tâche dans notre schéma : la tâche `default`. Cette dernière doit (?) toujours être définie (ou en tout cas, le devrait). Voici comment elle est définie :

    gulp.task('default', ['css', 'js']);

Vous pouvez voir que cette tâche ne fait rien d'autre qu'appeler les deux autres. Ces appels sont d'ailleurs représentés sur le schéma. Cette tâche sera par exemple à exécuter avant un push en production, pour s'assurer que le JS et le CSS sont à jour. Ici aussi, on fait appel à la commande `gulp`, mais sans préciser de nom de tâche :

    gulp

### Exécution automatique 

La troisième et dernière manière permet d'exécuter les tâches automatiquement, dès qu'un changement est détecté sur un fichier (*losanges rouges sur le schéma*). Ceci sera possible grâce à la fonction `watch()` dont nous avons parlé précédemment, et qui devrait parler aux utilisateur de Sass/LESS entre autres.  
Premièrement, il va falloir définir quels fichiers observer, et quelle tâche lancer quand un changement est détecté :

    gulp.task('watch', function () {

        // Un changement dans un SCSS ? Lancer "css"
        gulp.watch(source + '/scss/**/*.scss', ['css']);

        // Un changement dans un JS ? Lancer "js"
        gulp.watch(source + '/js/**/*.js',     ['js']);

    });

Simplissime. Et là encore, vous aurez remarqué bien évidemment que nous avons défini une nouvelle tâche. Il ne reste donc plus qu'à faire ceci :

    $ gulp watch

Et Gulp se chargera de tout maintenir à jour pendant que vous travaillez. Et rassurez-vous, c'est rapide... **très** rapide.

## Récapitulatif

Si on reprend tout ce qu'on a dit, voici primo l'architecture de notre projet :

    /assets
        /scss
            app.scss
            _partial.scss
        /js
            /libs
                jquery.js 
                touche.js 
        app.js 
    /dist
        /css 
            dist.css 
        /js 
            dist.js 
    gulpfile.js

Ensuite, l'installation de gulp et des modules :

    npm install --global gulp
    npm install --global gulp-sass
    npm install --global gulp-autoprefixer
    npm install --global gulp-minify-css
    npm install --global gulp-uglify
    npm install --global gulp-concat

Puis enfin le fichier de configuration `gulpfile.js` au complet :

    var gulp         = require('gulp');

    var sass         = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');
    var minify       = require('gulp-minify-css');
    var uglify       = require('gulp-uglify');
    var concat       = require('gulp-concat');

    var source       = './assets/';
    var dest         = './dist/';
    
    gulp.task('default', ['css', 'js']);

    gulp.task('watch', function () {
        gulp.watch(source + '/scss/**/*.scss', ['css']);
        gulp.watch(source + '/js/**/*.js',     ['js']);
    });

    gulp.task('css', function() {
        return gulp.src(source + '/scss/app.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['> 1%', 'last 2 versions']
            }))
            .pipe(minify())
            .pipe(gulp.dest(dest + '/css/dist.css'));
    });

    gulp.task('js', function() {
        return gulp.src([
                source + '/js/libs/jquery.js',
                source + '/js/libs/touche.js',
                source + '/js/app.js'
            ])
            .pipe(concat())
            .pipe(uglify())
            .pipe(gulp.dest(dest + '/js/dist.js'));
    });

## Conclusion

Il s'est passé moins de 10 minutes entre le moment où j'ai décidé de tester Gulp et le moment où j'ai eu un workflow pour le Sass en place et fonctionnel.  
Cette rapidité de mise en place, ainsi que la simplicité du fichier de configuration sont deux énormes atouts de Gulp. 
Même si cela fait à peine quelques jours que j'ai découvert tout ça, Je suis ravi des résultats qui ne se sont pas fait attendre, et confiant pour la suite : il s'agira simplement d'installer un nouveau module et de mettre à jour le `gulpfile.js` !

Ne reste plus qu'une chose : convaincre les graphistes-intégrateurs à utiliser une nouvelle ligne de commande...  

*(D'ailleurs, je suis preneur de tout interface graphique pour Gulp, je n'ai pas encore vu/trouvé ce qui se faisait)*

## Liens

[Homepage de Gulp](http://gulpjs.com/)  
[Liste des plugins Gulp](http://gulpjs.com/plugins/)  
[Page de npm pour rechercher des plugins Gulp](https://www.npmjs.com/)  
[Homepage de NodeJS](https://nodejs.org)