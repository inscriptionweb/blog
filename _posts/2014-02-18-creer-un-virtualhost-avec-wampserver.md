---
layout: post
title:  "Créer un virtual host avec WampServer"
date:   2014-02-18
tags: 
- apache
- software
description: >
  Tutoriel pour créer votre hôte virtuel sous Windows, avec WampServer.
---

## L'intérêt des hôtes virtuels

Les hôtes virtuels vont tout simplement vous permettre d'utiliser une url personnalisée (et virtuelle) pour accéder à vos projets en local. Plutôt que d'avoir des url du type :

	http://localhost/mon-projet/web/

...vous pourrez par exemple utiliser :

	http://monprojet.dev/

## Etape #1 : le fichier ***hosts***

Allez chercher le fichier `C:\Windows\System32\drivers\etc\hosts` et éditez le.    
Ajouter la ligne suivante en bas de fichier :

    127.0.0.1       monprojet.dev

Le fichier ***hosts*** à le même rôle qu'un serveur de DNS : il va préciser quelle adresse IP est associée à un nom de domaine. Ce fichier est consulté avant tout accès à un serveur DNS externe. Ici, on précise que le nom de domaine ***monprojet.dev*** pointe sur notre machine : ***127.0.0.1***.

Au passage, si ces lignes sont absentes ou commentées (avec un ***#*** en début de ligne), vous pouvez les ajouter (elle seront toujours utiles) :

    127.0.0.1       localhost
    ::1             localhost

Il est probable que le fichier ***hosts*** ne soit pas éditable, pour des raisons de sécurité. Exécutez le bloc note en tant qu'administrateur, et accédez au fichier ***hosts*** via le menu ***Fichier > Ouvrir***. Vous serez alors autorisé à enregistrer vos modifications.

**Résumé : le fichier ***hosts*** indique sur quelle machine est hébergé le projet (ici ***127.0.0.1***).**

## Étape #2 : l'hôte virtuel ***monprojet.dev***

Vous allez créer un premier virtual host, afin de faire pointer le nom de domaine ***monprojet.dev*** sur votre projet.    
Pour cela, rendez vous dans le dossier `C:\wamp\alias\`, et créez un fichier ***monprojet.conf***, dans lequel vous copierez ceci :

	NameVirtualHost monprojet.dev
	<VirtualHost monprojet.dev>
		DocumentRoot C:/wamp/www/mon-projet/web/
		ServerName monprojet.dev
	</VirtualHost>

Redémarrez Apache et accédez à présent à l'url ***http://monprojet.dev***, et vous verrez que tout fonctionne !

**Résumé : le virtual host indique où se trouve le projet sur la machine (ici `C:/wamp/www/mon-projet/web/***).**

## Étape #3 : résoudre le problème de ***localhost***

Bon... Tout fonctionne, tout fonctionne... C'était peut être un peu vite dit.    
Si vous accédez à ***http://localhost***, ou ***127.0.0.1***, vous verrez que le virtual host a pris le dessus, et que vous êtes redirigé vers votre projet !

Afin d'éviter cet effet secondaire, vous allez créer un nouveau virtual host, pour ***localhost***. Toujours dans le dossier `C:\wamp\alias\`, créez un fichier ***localhost.conf***, dans lequel vous copierez ceci :

	NameVirtualHost localhost
	<VirtualHost localhost>
		DocumentRoot C:/wamp/www/
		ServerName localhost
	</VirtualHost>

Redémarrez une nouvelle et dernière fois Apache, et vous vous retrouvez désormais avec :

- ***http://localhost/*** pointant sur `C:/wamp/www/`
- ***http://localhost/mon-projet/web/*** pointant sur `C:/wamp/www/mon-projet/web/`
- ***http://monprojet.dev/*** pointant sur `C:/wamp/www/mon-projet/web/`

## Liens
[WampServer](http://www.wampserver.com/)    
[Apache Virtual Host documentation](http://httpd.apache.org/docs/current/vhosts/)