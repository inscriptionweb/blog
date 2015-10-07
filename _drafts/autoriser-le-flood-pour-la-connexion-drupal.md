---
layout: post
title:  "Autoriser le flood pour la connexion Drupal"
date:   2015-10-01
tags:
- drupal
- php
description: >
  Comment désactive la limite instaurée par Drupal sur le nombre de tentatives de connexion ?
--- 

> Cet article a été rédigé pour Drupal 7

## Les deux types de blocages

Avant de désactiver cette limite, il faut savoir comment Drupal gère les tentatives de connexions qui ont échoué. Il distingue deux cas d'échecs :

- les utilisateurs ayant entré un couple identifiant/mot de passe invalide
- les utilisateurs ayant entré un identifiant valide, mais un mauvais mot de passe (ce cas est aussi inclus dans le premier)

Côté utilisateur cela ne change rien, mais Drupal va les gérer différemment afin de distinguer un robot qui flood d'un pirate essayant d'accéder à un compte précis.  

Dans le premier cas, Drupal va enregistrer l'adresse IP de l'utilisateur dans la table `flood`. Ceci va lui permettre, après un certain nombre de tentatives de bloquer l'IP pour un certain temps, et ainsi éviter le flood.  
Dans le second cas, Drupal va non seulement enregistrer l'IP (car cela reste une tentative de connexion échouée), mais aussi l'identifiant de l'utilisateur. Cette sécurité supplémentaire permet d'identifier les comptes qui seraient potentiellement visés par des attaques, et de bloquer ce compte beaucoup plus rapidement pour des raisons de sécurité.

## Configurer Drupal

Pour désactiver ces limites, il va donc falloir agir sur deux variables :

- `user_failed_login_ip_limit` : la limite de tentative par IP, définie à 50 par défaut
- `user_failed_login_user_limit` : la limite de tentative par compte, définie à 5 par défaut

Il suffit de mettre une limite inatteignable dans votre fichier de configuration (`sites/XXX/settings.php`) :

	$conf['user_failed_login_ip_limit'] = PHP_INT_MAX;
	$conf['user_failed_login_user_limit'] = PHP_INT_MAX;

