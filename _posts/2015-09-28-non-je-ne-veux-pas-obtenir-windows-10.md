---
layout: post
title:  "Non je ne veux pas obtenir Windows 10 !"
date:   2015-09-28
tags:
- software 
description: >
  Très court article pour vous montrer comment désactiver définitivement la notification vous proposant d'obtenir "gratuitement" Windows 10.
--- 

## Changement de registre

> La chose est ma foi bien aisée  
> Quoiqu'un semblant alambiquée  
> En son registre, sous bonne clé  
> Secrets y sont tous préservés.    
> 
> Et si tel homme, tout avisé  
> Venait à le manipuler...

- Ouvrer l'éditeur de registre `regedit.exe` en le recherchant via le menu Démarrer.
- Accédez à la clé `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows`
- Créez ici une nouvelle clé `GWX` (dans la colonne de gauche)
- Sélectionnez la nouvelle clé, et créez-y une nouvelle valeur DWORD 32 bits (dans la colonne de droite)
- Nommez cette clé `DisableGWX`, et fixez sa valeur à 1

Il ne reste plus qu'à fermer l'éditeur de registre, et à redémarrer votre ordinateur.  
Vous n'aurez plus ni la popup au démarrage, ni l'icône persistante dans la zone de notifications.

## Liens
- [Source](http://www.askvg.com/how-to-remove-get-windows-10-app-and-its-icon-from-taskbar/) 
