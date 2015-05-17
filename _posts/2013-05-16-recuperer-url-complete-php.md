---
layout: post
title:  "Récupérer l'url complète en PHP"
date:   2013-05-16
tags: 
- php
description: >
  Un mini-article aujourd'hui, comme il y en aura sûrement d'autres. Ces articles concerneront de petites astuces, fonctions utilitaires dont je souhaite garder une version à portée de main, sans avoir a retourner le web et/ou mon bureau.
---

Pour la fonction du jour, elle permet tout simplement de récupérer l'url complète de la page courante en PHP. C'est une fonction dérivée de nombreuses autres trouvables facilement sur le net, qui tient compte du protocole, d'un éventuel port et des variables GET :

	function currentURL() {
		$protocol = stripos($_SERVER['SERVER_PROTOCOL'], 'https') === FALSE ? 'http' : 'https';
		$host     = $_SERVER['SERVER_NAME'];
		$port     = $_SERVER["SERVER_PORT"];
		$query    = $_SERVER['REQUEST_URI'];
		return $protocol.'://'.$host.($port != 80 ? ':'.$port : '').$query;
	}