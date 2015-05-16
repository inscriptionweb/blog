# Supprimer les fichiers dot-underscore en ligne de commande
- zessx
- zessx
- 2015/03/04
- Bash
- published

Comment supprimer rapidement tous ces fichier "._" générés par Mac OS X ?

## I will look for you, I will find you, and I will kill you.
    
    $ find . -name "._*" -exec rm -f {} \;

Quelques détails sur cette ligne de commande :

- `find .` : on recherche dans le dossier courant
- `-name "._*` : tous les éléments commençants par "._"
- `-exec` : on exécute une commande sur les résultats de `find`
- `rm -f {}` : cette commande est un `rm -f` (la macro `{}` reprend le nom de l'élément dans les résultats de `find`)
- `\;` : on signale que la commande lancée via `-exec` se termine ici

Voilà pour l'astuce du jour. Et si vous voulez éviter que ces fichiers soient automatiquement créés, vous pouvez toujours ouvrir un terminal et exécuter cette commande :

    $ echo "export COPYFILE_DISABLE=true" >> .profile