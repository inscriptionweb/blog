# CookiesPlease
- zessx
- zessx
- 2014/10/05
- JS ; News
- published

Présentation d'un nouveau travail perso : CookiesPlease.

## CookiesPlease

> La loi impose désormais aux responsables de sites et aux fournisseurs de solutions d'informer les internautes et de recueillir leur consentement avant l'insertion de cookies ou autres traceurs.
>
> <cite>CNIL</cite>

Afin de se mettre rapidement en conformité avec la loi européenne sur les cookies et les traceurs, j'ai développé un petit script que vous pourrez intégrer sans difficultés sur vos sites.

## Installation

Il vous suffit de récupérer le script [sur le site dédié](http://smarchal.com/cookiesplease/), où de le cloner dans un de vos projets via git :

    $ git submodule add https://github.com/zessx/cookiesplease.git vendor/cookiesplease

Ajoutez-le ensuite dans votre template :

    <script src="vendor/cookiesplease/cookiesplease.min.js">

Et initialisez le quand le DOM est prêt (exemple avec jQuery ci-dessous) :

    $(function() {
    	cookiesplease.init();
    });

CookiesPlease est à présent fonctionnel, et les utilisateurs de votre site on déjà un message les prévenant que des cookies sont stockés, et qu'ils acceptent ce stockage en naviguant sur ledit site :

<center>![Exemple basique](posts/images/cookiesplease/basic-example.jpg)</center>

## Utilisation

Dans le cas où vous auriez besoin de savoir si l'utilisateur a accepté ou non les cookies, CookiesPlease met deux fonctions à votre disposition :

    if(cookiesplease.wasAccepted()) {
    	/* l'utilisateur a accepté les cookies */
    }
    if(cookiesplease.wasDeclined()) {
    	/* l'utilisateur a refusé les cookies */
    }

## Options

Quelques options sont disponibles afin d'adapter CookiesPlease à vos besoins :

- `buttonAccept` : Affiche un bouton pour accepter les cookies (`true` par défaut)
- `buttonDecline` : Affiche un bouton pour refuser les cookies (`false` par défaut)
- `clearCookiesOnDecline` : Supprimer tous les cookies existants si l'utilisateur refuse leur utilisation (`false` par défaut)
- `storeChoiceOnDecline` : Crée un cookie (!) pour se souvenir que l'utilisateur n'en veut pas (`true` par défaut)
- `prependToBody` : Insère le message au début du `<body>` au lieu de le faire à la fin (`false` par défaut)
- `buttonAcceptText` : Texte du bouton pour accepter
- `buttonDeclineText` : Texte du bouton pour refuser
- `message` : Message affiché

## Personnaliser le style

CookiesPlease ajoute son propre CSS dans le DOM. L'ensemble des éléments sont contenus dans cette `<div>` :

    <div id="cookiesplease" class="cookiesplease">
        ...
    </div>

Afin de faciliter sa personnalisation et d'éviter tout conflit, CookiesPlease utilise la classe `.cookiesplease` pour son style par défaut, vous laissant ainsi la possibilité d'utiliser l'id `#cookiesplease` :

    #cookiesplease {
        background-color: #eee;
        border-top: 1px solid #222;
        color: #222;
    }
	#cookiesplease p {}
	#cookiesplease a {}
	#cookiesplease button {}
	#cookiesplease button.cookiesplease-accept {}
	#cookiesplease button.cookiesplease-decline {}
	#cookiesplease.cookiesplease-hidden {}
	body.cookiesplease-shown {}

## Liens :
[CookiesPlease](http://smarchal.com/cookiesplease/)    
[Le projet Github](https://github.com/zessx/cookiesplease)    
[Article de la CNIL sur les cookies](http://www.cnil.fr/vos-obligations/sites-web-cookies-et-autres-traceurs/que-dit-la-loi/)    