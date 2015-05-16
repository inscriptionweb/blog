# Regex PHP : lookahead et lookbehind
- zessx
- zessx
- 2013/10/01
- Regex ; PHP ; Development
- published

Bien le bonjour, amis regexophiles !   
Aujourd'hui, je vous explique rapidement comment utiliser les lookahead et les lookbehind dans une regex en PHP.


## Le lookahead

Le lookahead, ou assertion avant, est un moyen de vérifier ce qui se trouve derrière votre groupe de capture, avant de décider si vous le capturez ou non.
Il existe deux type de lookahead :

* Le positive lookahead `(?=foo)` : capture le groupe s'il est suivi par...
* Le negative lookahead `(?!foo)` : capture le groupe s'il n'est pas suivi par...

Le symbole `$` est un lookahead bien connu, qui vérifie que le groupe de capture n'est suivi par rien d'autre.

## Le lookbehind

Le lookbehind, ou assertion arrière, est un moyen de vérifier ce qui se trouve devant votre groupe de capture, avant de décider si vous le capturez ou non.
Il existe deux type de lookbehind :

* Le positive lookbehind `(?<=foo)` : capture le groupe s'il est précédé par...
* Le negative lookbehind `(?<!foo)` : capture le groupe s'il n'est pas précédé par...

Le symbole `^` est un lookbehind bien connu, qui vérifie que le groupe de capture n'est précédé par rien d'autre.

## Exemples

Voici ci-dessous quelques exemples

	$url = array(
		'root/folder1/',
		'root/folder1/subfolder1/',
		'root/folder1/subfolder2/',
		'root/folder1/subfolder2/action1/',
		'root/folder1/subfolder2/action2/',
		'root/folder2/',
		'root/folder2/subfolder1/',
		'root/folder2/subfolder2/',
	);
	$reg = array(
		'#/folder1/(?=subfolder2)#', // folder1, suivi de subfolder2
		'#/folder1/(?!subfolder2)#', // folder1, non suivi de subfolder2
		'#(?<=folder1)/subfolder1#', // subfolder1, précédé de folder1
		'#(?<!folder1)/subfolder1#', // subfolder1, non précédé de folder1
	);
	foreach($reg as $r) {
		echo 'Regex : '.htmlentities($r).'
	';
		foreach($url as $u) {
			echo preg_match($r, $u).' - '.$u.'
	';
		}
		echo '-----------
	';
	}
	/*
	Regex : #/folder1/(?=subfolder2)#
	0 - root/folder1/
	0 - root/folder1/subfolder1/
	1 - root/folder1/subfolder2/
	1 - root/folder1/subfolder2/action1/
	1 - root/folder1/subfolder2/action2/
	0 - root/folder2/
	0 - root/folder2/subfolder1/
	0 - root/folder2/subfolder2/
	-----------
	Regex : #/folder1/(?!subfolder2)#
	1 - root/folder1/
	1 - root/folder1/subfolder1/
	0 - root/folder1/subfolder2/
	0 - root/folder1/subfolder2/action1/
	0 - root/folder1/subfolder2/action2/
	0 - root/folder2/
	0 - root/folder2/subfolder1/
	0 - root/folder2/subfolder2/
	-----------
	Regex : #(?&lt;=folder1)/subfolder1#
	0 - root/folder1/
	1 - root/folder1/subfolder1/
	0 - root/folder1/subfolder2/
	0 - root/folder1/subfolder2/action1/
	0 - root/folder1/subfolder2/action2/
	0 - root/folder2/
	0 - root/folder2/subfolder1/
	0 - root/folder2/subfolder2/
	-----------
	Regex : #(?&lt;!folder1)/subfolder1#
	0 - root/folder1/
	0 - root/folder1/subfolder1/
	0 - root/folder1/subfolder2/
	0 - root/folder1/subfolder2/action1/
	0 - root/folder1/subfolder2/action2/
	0 - root/folder2/
	1 - root/folder2/subfolder1/
	0 - root/folder2/subfolder2/
	-----------
	*/

## Applications

Les assertions peuvent être utilisées dans de nombreux cas, dont voici quelques exemples :

* Gérer des exceptions dans vos Regex (comme ci-dessus)
* Récupérer la dernière occurrence d'un mot :   
	`foo(?!.*foo)`
* Valider le niveau de sécurité d'un mot de passe, ici, 8 caractères minimum, dont au moins une majuscule et un chiffre :   
	`^(?=.*[A-Z])(?=.*\d)[\w]{8,}$`
* Récupérer les montants dans un texte (sans récupérer le symbole €) :   
	`\d+(?:[.,]\d+)?(?=\s*€)`

## Limites

Si les assertions vous permettent une plus grande liberté dans l'utilisation de vos regex, il faut être conscient de leurs limites. Elles peuvent en effet devenir assez gourmandes si mal utilisées. Le lookbehind a de plus une particularité, due au fonctionnement des assertions et au déplacement du curseur d'avant en arrière : **il doit avoir une taille fixe**. Nous avons vu dans les exemples comment trouver la première occurrence d'un mot dans un texte. Si nous adaptions cette regex pour trouver la première occurrence, cela donnerait ce genre de code :

	(?<!foo.*)foo

Malheureusement, notre lookbehind n'a pas ici une taille fixe, en résulte une erreur de compilation :

	Warning: Compilation failed: lookbehind assertion is not fixed length

## Et en Javascript ?
Les lookahead sont aussi supportés en Javascript, mais pas les lookbehind. Il faudra donc parfois retravailler la capture pour supprimer les données inutiles.

## Liens :
[Documentation PHP : PCRE, les assertions](http://www.php.net/manual/fr/regexp.reference.assertions.php)   
[SO : Regex lookahead ordering, lien intéressant sur l'endroit où placer une assertion](http://stackoverflow.com/questions/2126137/regex-lookahead-ordering#2126755)   