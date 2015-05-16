# Cygwin
- zessx
- zessx
- 2015/04/27
- Software
- published

Hein ? MS-DOS évolue ? ... ... MS-DOS évolue en Cygwin !

## Genèse 2.0, verset 1 : MS-LOOSE et Cygwin

Restons honnêtes, je ne suis pas à la base un fervent utilisateur de la ligne de commande. Puis j'ai rencontré git... et Sass... et NodeJS... et bien d'autres. Chemin faisant, j'ai été amené à utiliser la ligne de commande de plus en plus. 

Et rapidement, je me suis pris la tête avec MS-DOS. Déjà parce que la console n'a rien pour elle : c'est moche, ça se redimensionne à peine, le copier coller est merdique, et j'en passe. Ensuite, parce que dès que je trouvais un truc cool sur le net, ça concernait Unix...

Du coup je me suis dit que ce serait VRAIMENT cool d'avoir un portage des commandes Unix sous Windows. Et dans mon monde il y a une règle presque immuable : si j'ai une idée VRAIMENT cool, quelqu'un l'a déjà eue et en a fati quelque chose. Et ce quelqu'un a créé Cygwin.

Cygwin apporte non seulement un portage d'un très grand nombre de commandes Unix sous Windows, mais il est en plus fourni avec un excellent terminal par défaut : Minnty. Pour ceux qui connaissent Putty, Minnty est en partie basé sur son code, et reprend le même mode de fonctionnement.

## Installation de Cygwin

Téléchargez d'abord Cygwin [sur le site dédié](https://www.cygwin.com2/).

Lancez installation de Cygwin en gardant les options par défaut.

Utilisez la technique dite du "suivant suivant terminer", en prenant garde toutefois d'ajouter le package `wget`. Ce package nous sera très utile pour récupérer du contenu en ligne depuis le terminal.

## Installer un gestionnaire de packages

Tout comme vous trouvez `apt-get` sur Unix, il existe un gestionnaire de packages pour Cygwin. Vous pouvez l'installer facilement en entrant la commande suivante dans le terminal :

    $ wget http://apt-cyg.googlecode.com/svn/trunk/apt-cyg
    $ chmod +x apt-cyg 
    $ mv apt-cyg /usr/local/bin/

Ce gestionnaire permet de rechercher des packages depuis Cygwin (sans nécessairement passer par une recherche sur le web, ni une installation manuelle). L'installation d'un package se fait alors avec un simple `apt-cyg <nom-du-package>`.

## Ajouter Cygwin au menu contextuel Windows

Le petit plus : je trouve que pouvoir lancer un terminal depuis notre dossier courant est super utile. Pour ajouter Cygwin au menu contextuel de Windows, il existe un package très bien fait : `chere`

    $ apt-cyg install chere 
    $ chere -i -e "Run Cygwin Here" -t mintty

Voici les options que le package propose :

    i - Install 
    u - Uninstall 
    x - Freshen eXisting entries 
    l - List currently installed chere items 
    r - Read all chere registry entries to stdout 
    a - All users 
    c - Current user only 
    n - Be Nice and provide Control Panel uninstall option (Default) 
    m - Minimal, no Control Panel uninstall 
    p - Print regtool commands to stdout rather than running them 
    f - Force write (overwrite existing, ignore missing files) 
        1 - Start using registry one-liners. This doesn't work with ash, tcsh or network shares. 
        2 - Start via bash script. Relies on windows to change directory, and login scripts avoiding doing a cd /home/Username 
    h - Help
    v - Version 
    t <term> - Use terminal term. Supported terminals are: cmd rxvt mintty xterm urxvt 
    s <shell> - Use the named shell. Supported shells are: ash bash cmd dash fish mksh pdksh posh tcsh zsh passwd 
    d <display> - DISPLAY to use (xterm, urxvt). Defaults to :0. Set to env to use the runtime environment variable. 
    o <options> - Add <options> to the terminal startup command. If more than one option is specified, they should all be contained within a single set of quotes. 
    e <menutext> - Use <menutext> as the context menu text.

Enjoy!

## Liens 

[Cygwin](https://www.cygwin.com/)   
[SuperUser - How to install new packages on Cygwin?](http://superuser.com/a/304545/151249)   
[SuperUser - upgrading and installing packages through the cygwin command line?](http://superuser.com/a/41139/151249)   
[StackOverflow - Open Cygwin at a specific folder](http://stackoverflow.com/a/12010346/1238019)   