# Renommer un repo Github
- zessx
- zessx
- 2013/09/16
- Git ; Development
- published

Si vous désirez changer le nom d'un repository sous Github, vous devez penser à le faire des deux côtés : distant et local.

## Côté distant

Rien de plus simple ici, vous vous rendez sur la page de paramètres de votre repo : ***https://github.com/USER/REPO/settings***.
Vous changez ensuite le nom via le formulaire en haut de page.

## Côté local

Il faut à présent redéfinir l'url du repo distant fixée dans votre repo local, celle qui est utilisée lorsque vous faites vos `push` et vos `pull`. Retrouvez d'abord les noms que vous avez donné à ces url :

	git remote -v

Notez les noms, on considérera ici que vous avez utilisé le mot-clé `origin`. Changez ensuite les urls :

	git remote set-url origin https://github.com/USER/NEWREPO.git

## Note importante

Si vous êtes seul à travailler sur le projet, vous n'aurez aucun souci à faire la manipulation. En revanche, si d'autres développeurs sont déjà sur ce projet, vous devrez leur communiquer la nouvelle url pour le repo distant, afin que chacun fasse la manipulation de son côté (ou clone le projet une nouvelle fois).

## Liens :
[Documentation Git - remote](http://git-scm.com/docs/git-remote)