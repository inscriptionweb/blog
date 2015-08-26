---
layout: post
title:  "Supprimer l'historique des commandes bash"
date:   2015-08-26
tags:
- bash 
description: >
  Astuce rapide pour expliquer comment supprimer partiellement ou totalement l'historique des commandes bash.
--- 

## CTRL+Z

Il m'arrive parfois de taper un mot de passe dans un shell Bash, avant de me rendre compte que ma commande précédente (probablement un `ssh`) a échoué...  
Et que je viens d'écrire mon mot de passe en clair...  
Et qu'il est enregistrer dans l'historique des commandes.

Une fois passé les quelques secondes de mauvaise humeur dues au fait que je vais devoir relancer ma dernière commande, je me dis que ce serait plutôt bien d'éviter de laisser ce mot passe en clair traîner dans l'historique. Et pour cela, rien de mieux que la commande `history` !

Premièrement, affichez l'état de l'historique avec la commande, sans paramètres :

    $ history

    # 499  ssh fail
    # 500  magic15in7H3air
    # 501  history

Dans la liste de résultats, notez l'identifiant de la ligne à supprimer (ici #500), et lancer cette fois ci la commande avec le paramètre `-d`, pour "delete" :

    $ history -d 500
    $ history

    # 499  ssh fail
    # 500  history
    # 501  history -d 500
    # 502  history

Dans le cas où vous voudriez supprimer l'intégralité de l'historique, il existe le paramètre `-c` (pour clear), mais le plus sûr est encore de supprimer manuellement le fichier où l'historique est stocké :

    rm ~/.bash_history