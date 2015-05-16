# Forcer l'accès à un script PHP en ligne de commande
- zessx
- zessx
- 2014/01/14
- PHP ; Development
- published

Comment savoir si votre script PHP est exécuté via une ligne de commande, ou via le protocole HTTP ?

## La constante PHP_SAPI

La constante `PHP_SAPI` (pour Server API) vous permet de connaître le type de l'interface qui a appelé le script. Elle a été introduite avec PHP 4.2.0, afin de remplacer la fonction `php_sapi_name()` (introduite avec PHP 4.0.1).

Elle peut avoir pour valeur (liste non exausthive extraite de la documentation) :
 
 - ***aolserver***
 - ***apache***
 - ***apache2filter***
 - ***apache2handler***
 - ***caudium***
 - ***cgi*** (jusqu'en PHP 5.3)
 - ***cgi-fcgi***
 - ***cli***
 - ***continuity***
 - ***embed***
 - ***isapi***
 - ***litespeed***
 - ***milter***
 - ***nsapi***
 - ***phttpd***
 - ***pi3web***
 - ***roxen***
 - ***thttpd***
 - ***tux***
 - ***webjames***

La valeur qui nous intéresse est ***cli***, pour Command LIne. En utilisant ce genre de petite condition, vous serez alors capable de restreindre l'accès à vos scripts en ligne de commande :

	<?php
	if(PHP_SAPI != 'cli') die('L\'accès à ce script n\'est possible qu\'en ligne de commande.');

	...
	?>

## Liens :
[La constante `PHP_SAPI`](http://php.net/manual/fr/reserved.constants.php#constant.php-sapi)   
[La fonction `php_sapi_name()`](http://www.php.net/manual/fr/function.php-sapi-name.php)   