# Réordonner les colonnes en PostgreSQL
- zessx
- zessx
- 2015/xx/xx
- PostgreSQL ; Database
- draft

Savez-vous comment modifier l'ordre des colonnes dans une table PostgreSQL ? Non ? Alors c'est par ici que ça ce passe !

## La solution toute simple...

...n'existe pas.

Malheureusement, les développeurs derrière PostgreSQL ne considèrent pas le tri des colonnes comme prioritaire. Pour tout dire, cette feature n'existe même pas encore. Il existe cependant quelques astuces (plus ou moins propres) pour contourner le problème en attendant.

Je vais vous présenter les différentes solutions proposées [sur le wiki](https://wiki.postgresql.org/wiki/Alter_column_position) de PostgreSQL, avant de vous donner la méthode que j'utilise.

## Créer une nouvelle table

Cette technique consiste tout simplement à ne pas se prendre la tête :

- on crée une nouvelle table, suffixée d'un mot clé (du type `_new`, `_temp`...), avec les colonnes dans l'ordre désiré
- on copie les données de l'ancienne table vers la nouvelle
- on supprime l'ancienne table
- on renomme la nouvelle table

Méthode évidente, quoique fastidieuse.

## Ajouter une colonne, et déplacer les données

Il est aussi possible de réordonner les colonnes sans passer par une nouvelle table :

- on ajoute les colonnes dans l'ordre désiré, suffixée d'un mot clé (du type `_new`, `_temp`...)
- on copie les données des anciennes colonnes vers les nouvelles
- on supprime les anciennes colonnes
- on renomme les nouvelles colonnes

Cette méthode est tout aussi longue que la précédente, et n'apporte honnêtement rien de plus

## Utiliser une vue

Une autre technique proposée est de fournir une vue intermédiaire, qui cachera l'ordre véritable des colonnes :

- on modifie le nom de la table
- on crée une vue avec les colonnes dans l'ordre désiré, et avec le nom d'origine de la table

C'est certes plus rapide à mettre en place, mais on se retrouve en contrepartie à gérer des tables et des vues, pour une simple histoire d'ordre de colonnes. Est-ce vraiment utile ? 



## Liens 

[PostgreSQL](http://www.postgresql.org/)   
[Article du wiki PostgreSQL](https://wiki.postgresql.org/wiki/Alter_column_position)  