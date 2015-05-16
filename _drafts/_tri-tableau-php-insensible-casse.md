# Le tri de tableaux insensible à la casse en PHP
- zessx
- zessx
- 2099/01/01
- PHP ; Development
- draft

Comment trier des tableaux sans tenir compte de la casse ?

## Trier un `array` unidimensionnel

	$languages = array('HTML5', 'jQuery', 'CSS 3', 'MySQL', 'PHP');

	sort($languages);
	print_r($languages); // CSS 3, HTML 5, MySQL, PHP, jQuery

	sort($languages, SORT_STRING | SORT_FLAG_CASE);
	print_r($languages); // CSS 3, HTML 5, jQuery, MySQL, PHP

## Trier un `array` multidimensionnel

	$languages = array(
		array(	'name' => 'HTML 5',		'slug' => 'html'	),
		array(	'name' => 'jQuery',		'slug' => 'jquery'	),
		array(	'name' => 'CSS 3',		'slug' => 'css'		),
		array(	'name' => 'MySQL',		'slug' => 'mysql'	),
		array(	'name' => 'PHP 5',		'slug' => 'php'		)
	);
	foreach ($languages as $key => $language) {
	    $names[$key] = $language['name'];
	}

	array_multisort($names, $languages);
	print_r($languages); // [CSS 3, css], [HTML 5, html], [MySQL, mysql], [PHP, php], [jQuery, jquery]

	array_multisort($names, SORT_STRING | SORT_FLAG_CASE, $languages);
	print_r($languages); // [CSS 3, css], [HTML 5, html], [jQuery, jquery], [MySQL, mysql], [PHP, php]


## Liens :
[La fonction array_multisort](http://www.php.net/manual/fr/function.array-multisort.php)