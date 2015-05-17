---
layout: post
title:  "Créer une page statique avec Prestashop 1.4"
date:   2013-06-04
tags: 
- prestashop
- php
description: >
  Petite procédure pour ajouter rapidement une page statique à votre Prestashop.   
---

Dans notre exemple, on cherchera à ajouter une page "Nos Services". Chaque portion de code contient en commentaire le nom du fichier avec son emplacement.

## Créer le fichier PHP

	<?php
	/* our-services.php */

	require_once(dirname(__FILE__).'/config/config.inc.php');
	ControllerFactory::getController('OurServicesController')->run();

## Créer le contrôleur

	<?php
	/* controllers/OurServicesController.php */

	class OurServicesControllerCore extends FrontController
	{
		public $php_self = 'our-services.php';

		public function process()
		{
			/* process code */
		}

		public function setMedia()
		{
			parent::setMedia();
			Tools::addCSS(_THEME_CSS_DIR_.'our_services.css');
			Tools::addJS(_THEME_JS_DIR_.'our_services.css');
		}
		
		public function displayContent()
		{
			parent::displayContent();
			self::$smarty->display(_PS_THEME_DIR_.'our-services.tpl');
		}
	}

## Créer le template

	{* themes/mon-theme/our-services.tpl *}

	{capture name=path}{l s='Our Services'}{/capture}
	{include file="$tpl_dir./breadcrumb.tpl"}
	{include file="$tpl_dir./errors.tpl"}

## Créer le fichier CSS

	/* themes/mon-theme/css/our_services.css */

## Créer le fichier JS

	/* themes/mon-theme/js/our_services.js */

## Mettre en place les URL simplifiées

	BackEnd > Préférences > SEO & URLs > Nouveau

Vous sélectionnez la page ***our-services.php*** et vous entrez les informations nécessaires : 

* ***titre*** : Our services / Nos services
* ***url*** : our-services / nos-services
* ***description***
* ***keywords***

Ces informations peuvent être renseignées dans d'autres langues si vous les utilisez.

## Traduire ce qui doit être traduit

**BackEnd > Outils > Traductions > Traductions Front Office FR**

Vous trouverez ici les quelques chaînes entrées en anglais dans les fichiers TPL (via `{l s='string'}`) à traduire.

## Accéder à la nouvelle page

La nouvelle page est désormais accessible via l'url ***http://www.domain.tld/nos-services***