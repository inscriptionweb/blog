# Récupérer les valeurs d’un champ ENUM en MySQL
- zessx
- zessx
- 2013/09/25
- MySQL ; Development ; PHP
- published

Vous utilisez peut-être le type de champ ENUM en MySQL, qui vous permet d'avoir une liste de valeurs prédéfinies. Voici comment récupérer la liste de ces valeurs prédéfinies dans un tableau en PHP :

	$row = $db
	    ->query('SHOW COLUMNS FROM `'.$table.'` LIKE "'.$column.'"')
	    ->fetch(PDO::FETCH_ASSOC);
	preg_match('/enum\(\'(.*)\'\)$/', $row['Type'], $matches);
	$values = explode('\',\'', $matches[1]);

On récupère la structure de la colonne (nom, type, null...), on isole ensuite le type (`enum('valeur1','valeur2','valeur3')`), que l'on parse pour récupérer les valeurs.

## Liens :
[Documentation MySQL : le type ENUM](http://dev.mysql.com/doc/refman/5.0/en/enum.html)