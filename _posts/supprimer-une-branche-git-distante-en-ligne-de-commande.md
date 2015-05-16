# Supprimer une branche Git distante en ligne de commande
- zessx
- zessx
- 2015/02/09
- Git ; Development
- published

Mais comment supprimer cette branche obsolète sur Github sans passer par l'interface graphique ?

## Unleash the unicorn

Prenons pour exemple une branche `migration` qui n'a plus lieu d'être, et que vous voulez supprimer.  
Pour supprimer n'importe quelle branche distante (y compris sur Github), utilisez la commande suivante :

    $ git push origin :migration

## Explain the myth

La commande `git push` requiert principalement deux paramètres :

- le dépôt distant sur lequel envoyer une branche
- la branche locale à envoyer, et son équivalent distant sous le format `<source>:<dest>`

Habituellement, pour metre à jour vos données sur le dépôt distant, vous utilisez cette syntaxe :

    $ git push origin migration

Vous spécifiez que vous voulez envoyer la branche `migration` sur le dépôt `origin`. Aucune branche distante n'est spécifiée, git va donc simplement utiliser le même nom que votre branche locale. C'est exactement la même chose que si vous aviez utilisé :

    $ git push origin migration:migration

Mais vous pouvez très bien envoyer le code d'une branche locale sur une autre distante :

    $ git push origin migration:develop

Dans notre premier exemple, on spécifie une branche distante, mais **pas de branche locale**. C'est la syntaxe pour préciser que la branche distance ne doit plus exister :

    $ git push origin :migration

## Liens :
[Documentation sur git push](http://git-scm.com/docs/git-push)   