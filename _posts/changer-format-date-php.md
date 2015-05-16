# Changer le format d’une date en PHP
- zessx
- zessx
- 2013/09/27
- PHP ; Development
- published

Court article, un peu typé post-it, pour partager une petite fonction avec vous.

Lorsque j'utilise des dates dans un environnement PHP/MySQL, elles se retrouvent généralement sous deux formats :

* `Y-m-d H:i:s` en base de donnée (le format `DATETIME`)
* `d/m/Y` en HTML, pour l'affichage


Pour changer le format d'une date, on passe généralement par une étape intermédiaire : le timestamp (l'heure Unix, ou Posix selon les appellations). On récupère ce timestamp à l'aide de la fonction `strtotime()`, et on le repasse sous un autre format à l'aide de la fonction `date()` :

	$date = '27-09-2013';
	echo date('Y-m-d H:i:s', strtotime($date));
	// 2013-09-27 00:00:00

Le soucis avec cette méthode, c'est que vous êtes bridé sur votre format de départ. En Europe, nous utilisons des dates du type jour-mois-année, alors qu'outre Atlantique, on utilise un type année-mois-jour. Afin d'éviter toute confusion possible entre ces deux types, la fonction `strtotime()` utilise une convention :

* Si le séparateur est un tiret (-), la date est considérée comme étant européenne
* Si le séparateur est un slash (/), la date est considérée comme étant américaine

En reprenant notre exemple, mais en modifiant simplement le séparateur, plus rien ne fonctionne :

	$date = '27/09/2013';
	echo date('Y-m-d H:i:s', strtotime($date));
	// 1970-01-01 01:00:00

La solution à ce problème se trouve dans la classe `DateTime`. Cette classe permet elle aussi de travailler sur les dates, avec une approche orientée objet. Une approche donc un peu plus verbeuse, mais qui a ses avantages. La classe `DateTime` permet en effet de spécifier le format de la date en entrée, quand vous voulez récupérer le timestamp. Notre code devient donc :

	$date = '27/09/2013';
	$dt = DateTime::createFromFormat('d/m/Y', $date)
	echo $dt->format('Y-m-d H:i:s');
	// 2013-09-27 13:07:29

Il n'y a plus qu'a se préparer une petite classe utilitaire pour simplifier l'utilisation du tout :

	class DateFormat {
		public static function alter($date, $before, $after) {
			return DateTime::createFromFormat($before, $date)->format($after);
		}
		public static function toSQL($date, $before = 'd/m/Y') {
			return self::alter($date, $before, 'Y-m-d H:i:s');
		}
		public static function toHTML($date, $before = 'Y-m-d H:i:s') {
			return self::alter($date, $before, 'd/m/Y');
		}
	}

	$date = '27/09/2013';
	echo DateFormat::toSQL($date);
	// 2013-09-27 13:07:29


## Liens :
[PHP Doc : la fonction strtotime()](http://php.net/manual/fr/function.strtotime.php)   
[PHP Doc : la fonction date()](http://php.net/manual/fr/function.date.php)   
[PHP Doc : la classe DateTime](http://php.net/manual/fr/book.datetime.php)   