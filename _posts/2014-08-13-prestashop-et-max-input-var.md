---
layout: post
title:  "Prestashop et max input vars"
date:   2014-08-13
tags: 
- prestashop
- php
description: >
  Comment augmenter la valeur de **max_input_vars** pour pouvoir utiliser la page de traduction des modules ?
---

## Overdose

Lorsque vous essayer de traduire les textes utilisés dans les modules via le backoffice de Prestashop, vous tombez quasi systématiquement sur ce genre de message d'erreur :

> Attention, votre hébergeur limite le nombre de champs dans les formulaires:
> 1000 pour max_input_vars
> Demandez à votre hébergeur d'augmenter les limites post et request à xxxx au moins, ou éditez le fichier de traduction manuellement.

Cela signifie que PHP limite le nombre maximum de champs envoyés via un formulaire. Sa valeur par défaut est de 1000. Comme il y a plusieurs dizaines de chaînes de caractères par module, et que Prestashop envoie l'intégralité des champs (de tous les modules) à l'enregistrement, vous dépassez cette limite.

Pour augmenter cette valeur, plusieurs solutions sont possibles.

## Via la configuration du serveur

Vous pouvez modifier la valeur de cette variable dans la configuration PHP du serveur, si vous y avez accès bien entendu.  
Remplacer simplement la valeur de cette ligne dans le `php.ini` :

	max_input_vars = 5000

## Via un .htaccess

Si vous n'avez pas accès à cette configuration (comme par exemple sur certains serveurs mutualisés), vous pouvez tenter de modifier votre fichier `.htaccess` en ajoutant ces trois lignes :

	php_value max_input_vars 5000
	php_value suhosin.post.max_vars 5000
	php_value suhosin.request.max_vars 5000
	# ~~start~~

N'oubliez pas de bien placer ces ligne **avant** le commentaire `# ~~start~~`, sans quoi elles seront supprimées la prochaine fois que vous mettrez à jour le `.htaccess` via le backoffice.  
Notez que cette méthode ne fonctionne pas toujours, 

## Via un nouveau php.ini

Si module Apache `suPHP` est activé, vous avez aussi la possibilité de créer un nouveau fichier `php.ini` que vous placerez où vous voulez sur le serveur :

	[PHP]
	max_input_vars = 5000

Il ne reste plus qu'à modifier le `.htaccess` de votre Prestashop en y spécifiant le chemin absolu du dossier dans lequel se trouve le `php.ini` :

	suPHP_ConfigPath /home/path/to/file/
	# ~~start~~

## La dernière chance...

Si vraiment rien de tout cela ne fonctionne, c'est que vous avez vraiment un hébergeur restrictif... Il faut toutefois savoir que la variable `max_input_vars` a été ajoutée avec PHP 5.3.9 ([voir le changelog](http://www.php.net/ChangeLog-5.php#5.3.9)), il vous reste donc une toute petite chance.

Vous pouvez parfois choisir quelle version de PHP utiliser via votre console d'administration de serveur. Il s'agira là d'utiliser une version de PHP **antérieure** à la 5.3.9. La variable `max_input_vars` n'existera alors plus, et vous n'aurez plus de soucis pour traduire vos modules !

Sur un hébergement mutualisé de base chez OVH par exemple, il suffit d'ajouter à votre `.htaccess` cette ligne pour forcer l'utilisation de PHP 5.2 :

	SetEnv PHP_VER 5
	# ~~start~~


*Si vous connaissez d'autres techniques pour modifier cette variable (particulièrement sur des serveurs mutualisés), n'hésitez pas à les partager via les commentaires !*

## Liens
[Homepage de Prestashop](http://www.prestashop.com/)   
[Documentation sur max_input_vars](http://www.php.net/manual/fr/info.configuration.php)   
[Homepage de suPHP](http://www.suphp.org/)  