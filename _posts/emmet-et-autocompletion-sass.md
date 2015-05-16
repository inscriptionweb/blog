# Emmet et l'autocomplétion avec Sass
- zessx
- zessx
- 2015/03/30
- Sublime Text ; Sass
- published

Astuce pour perfectionner l'autocomplétion d'Emmet lorsque vous utilisez Sass.

## Le petit truc qui vient gâcher la fête

Déjà, pour ceux qui n'utiliseraient pas encore Emmet, je vous invite à le découvrir rapidement [sur un autre article de ce blog](http://blog.smarchal.com/emmet). L'article en question est loin d'être complet, il présente rapidement l'outil et ses utilisations principales.

Emmet fourni aussi un grand nombre de raccourcis en CSS, comme :

- `mt0` pour `margin-top: 0;`
- `t20` pour `top: 20px;`
- `wa` pour `width: auto;`
- `bdrz50%` pour `border-radius: 50%;`
- et tant d'autres...

Ces raccourcis sont intuitifs, et permettent de réduire considérablement le temps que vous passez à écrire du CSS.  
Mais ce n'est pas tout : ils sont aussi disponibles quand vous codez avec Sass ! À un détail près. Si vous êtes dans un fichier `.scss` et que vous utilisez un de ces raccourcis (mettons `t0`), vous aurez ce résultat :

    top: 0

Notez l'absence du point-virgule. Ce n'est pas grand chose, mais vous êtes obligé de rajouter ce point-virgule manuellement à chaque utilisation d'un raccourci Emmet. Et les choses répétitives, c'est chiant.

## Pourquoi ce bug, et comment le corriger ?

Premièrement, il ne s'agit pas d'un bug proprement dit. Emmet associe les fichiers `.sass` et `.scss` à la syntaxe par défaut de Sass, qui est SASS (en majuscules, voir l'introduction de [cet article](http://blog.smarchal.com/les-variables-sass) pour la désambiguïsation). C'est là que tout se joue : la syntaxe SASS ne requiert aucun point-virgule en fin de ligne (contrairement à la syntaxe SCSS). `top: 0` est donc parfaitement valide tant que vous n'utilisez pas SCSS.

Si comme moi vous êtes un utilisateur exclusif de la syntaxe SCSS, vous pouvez forcer Emmet à rajouter ce point-virgule. Il va falloir pour cela changer la propriété `sass.propertyEnd` dans vos préférences utilisateur.  
Ouvrez le fichier <kbd>Preferences</kbd> > <kbd>Package Settings</kbd> > <kbd>Emmet</kbd> > <kbd>Settings — User</kbd>, et collez-y ce code :

    {
        "preferences": {
            "sass.propertyEnd": ";"
        }
    }

Vous spécifiez ainsi que pour la syntaxe des fichiers Sass (SASS et SCSS), vous voulez ajouter un point-virgule à la fin de chaque propriété.  
Tout est fin prêt, à présent le raccourci `t0` vous donnera ce résultat :

    top: 0;

## Liens :
[Site officiel du plugin Emmet](http://emmet.io/)    
[Documentation complète](http://docs.emmet.io/)    
[Cheet Sheet - Récapitulatif des fonctions](http://docs.emmet.io/cheat-sheet/)    
