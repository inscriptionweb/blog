---
layout: post
title:  "Désactiver le nouveau style de menu de Google Chrome"
date:   2013-04-09
tags: 
- chrome
description: >
  Si comme moi vous avez plusieurs centaines de favoris dans Google Chrome, nous n'avez sûrement pas manqué de constater un petit changement visuel ces derniers jours. Le style de tous les menus a en effet été aéré, histoire de mieux coller à la charte graphique de Google. On se retrouve donc avec ceci :
---

{:.center}
![Nouveau style du menu de Chrome]({{ site.url }}/images/desactiver-nouveau-style-menu-chrome/chrome-new-menu-style.jpg)

Je n'ai rien contre les changements cosmétiques au sein de Chrome, mais pas quand ils sont aussi gênant. Chaque dossier dans mes favoris a doublé en hauteur, ce qui devient énervant quand je dois systématiquement faire défiler la liste pour trouver le favoris qui m'intéresse.

Revenons-donc au bon vieux style de menu ! Pour ce faire, faites un clic droit sur votre icône de Google Chrome, allez dans ***Propriétés***, et ajoutez l'option `--disable-new-menu-style` à la fin du champ ***Cible*** (ou ***Target***) :

{:.center}
![Les options de lancement de Chrome]({{ site.url }}/images/desactiver-nouveau-style-menu-chrome/chrome-launch-option.jpg)

Et hop ! Le style de menu de base est de retour :

{:.center}
![Ancien style du menu de Chrome]({{ site.url }}/images/desactiver-nouveau-style-menu-chrome/chrome-old-menu-style.jpg)

**EDIT [11 Juillet 2013]**   
Il semble malheureusement que l'option `--disable-new-menu-style` a été supprimée à partir de Chrome 28... Parti pris de leur part, pas forcément le meilleur du point de vue de certains utilisateurs.

**EDIT [14 Octobre 2013]**   
L'équipe s'occupant de Google Chrome est finalement revenue en arrière (partiellement), en gardant le nouveau style, tout en réduisant la taille des lignes (au moins sur la version desktop). Voici qui satisfait tout le monde, et qui rend ce billet inutile... Monde de merde.

{:.center}
![Style final du menu de Chrome]({{ site.url }}/images/desactiver-nouveau-style-menu-chrome/chrome-final-menu-style.jpg)