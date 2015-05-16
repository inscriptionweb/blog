# Redimensionner des images de grande taille avec imagecreatefromjpeg()
- zessx
- zessx
- 2013/09/16
- PHP ; Development
- published

Vous avez peut-être déjà eu à travailler sur des images en PHP, et à utiliser la fonction `imagecreatefromjpeg()`, ou ses cousines `imagecreatefrompng()` et `imagecreatefromgif()` :

	$source = @$imagecreatefromjpeg($path);

Il est bon de savoir que ces fonctions ont certaines limites, inhérentes à PHP qui a une mémoire limitée pour traiter les données :

* Le poids de l'image
* La taille de l'image

On pense généralement au premier point. Mais le second est plus sournois, car si vous essayez de traiter une image de 2400px * 2400px, quel que soit son poids, ça se soldera probablement par un échec, par manque de mémoire. Et vu que la plupart des scripts masquent les erreurs sur cette fonction à l'aide d'un arobase (j'entends une armée de développeurs en furie arriver), ce dernier plantera lamentablement sans que vous n'en sachiez rien.

La solution ? Rien de plus simple : augmenter la valeur de `memory_limit`, soit dans `php.ini`, soit via un :

	ini_set('memory_limit', '128M');

## Liens :
[Documentation PHP : imagecreatefromjpeg()](http://php.net/manual/fr/function.imagecreatefromjpeg.php)