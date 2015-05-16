# SassQueries
- zessx
- zessx
- 2015/01/27
- Sass ; CSS ; News
- published

Présentation d'un nouveau travail perso : SassQueries.

## Une micro-librairie pour gérer vos media-queries en Sass

Suite à mon ancien post sur la gestion de media-queries en Sass ([voir par ici](http://blog.smarchal.com/sass-et-media-queries)), j'ai utilisé les 4 mixins que j'avais créé sur tous mes projets :

- `media-min($from)`
- `media-max($until)`
- `media-between($from, $until)`
- `media($breakpoint)`

Cette fonctionnalité étant cruciale, des mixins/librairies similaires ont fleuri un peu partout sur le net. J'ai finalement découvert [mq](https://github.com/sass-mq/sass-mq), et sa manière d'utiliser des arguments optionnels au lieu de 4 mixins.  
J'ai donc mis à jour mon code pour reproduire ce fonctionnement, en ajoutant quelques options afin de mettre [SassQueries](http://smarchal.com/sass-queries/) sur pieds.

## Utilisation

Importez tout d'abord SassQueries :

    @import "helpers/sass-queries";

Définissez ensuite vos options (chaque variable à des valeurs par défaut, vous n'avez donc qu'à surcharger ce que vous désirez) :

    // Les breakpoints et leur valeur
    $sq-breakpoints: (
        mobile:    320px,
        tablet:    768px,
        desktop:   992px,
        wide:      1200px
    );
    // Le type de media visé (all, tv, screen...)
    $sq-media: "all";
    // Activer ou non l'affichage d'un petit encart indiquant le breakpoint courant
    $sq-debug: false;
    // Utiliser SassQueries en mobile-first, ou non
    $sq-mobile-first: true;

Vous avez maintenant accès au mixin `media()`, dont voici quelques exemple d'utilisation :

    .selector {
      @include media($from: tablet) {
        // breakpoint de début
      }
      @include media($until: desktop) {
        // breakpoint de fin
      }
      @include media($from: desktop, $media: tv) {
        // type de media spécifié
      }
      @include media($until: tablet, $and: "(orientation: landscape)") {
        // détails supplémentaires pour la media-query
      }
      @include media($from: tablet, $until: desktop) {
        // breakpoints de début et de fin
      }
    }

## Liens :
[SassQueries](http://smarchal.com/sass-queries/)     
[Le projet Github](https://github.com/zessx/sass-queries)    