# Problème d'affichage des dossiers dans la sidebar de Sublime Text 3
- zessx
- zessx
- 2014/06/03
- Sublime Text ; Software
- draft

Que faire si votre sidebar plante à chaque changement de projet, et que vous vous retrouvez avec des dossiers vides ?

## Le problème

Le problème survient si vous avez installé Sublime Text 2 sur Windows, et choisi de l'utiliser en tant qu'éditeur par défaut pour certains types de fichiers.  
Suite à la suppression, impossible de définir un nouvel éditeur par défaut. Windows semble ne pas prendre en compte la nouvelle valeur. 

## La solution

Le désinstalleur de Sublime Text 2 oublie simplement de supprimer une clé du registre Windows. Il va falloir la supprimer manuellement.

- Lancez une fenêtre d’exécution : <kbd>Win + R</kbd>.  
- Lancez l'éditeur du registre en entrant la commande `regedit`.  
- Accédez à la clé `Computer\HKEY_CLASSES_ROOT\Applications\sublime_text.exe`.  
- Supprimez la clé.  
- Fermez l'éditeur du registre.

And voilà !

Vous pouvez maintenant redéfinir l'éditeur par défaut par... disons... Sublime Text 3 ?


## Liens :

[Sublime Text 3](http://www.sublimetext.com/3)    
[Source](http://www.sublimetext.com/forum/viewtopic.php?t=13214)    