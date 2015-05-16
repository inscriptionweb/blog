# Changer la couleur de sélection de texte
- zessx
- zessx
- 2013/11/20
- CSS ; Design
- published

L'astuce rapide du jour, comment faire pour changer cet éternel fond bleu utilisé lors de la sélection de texte sur votre site ?

## Le pseudo-élément ::selection

Ce pseudo-élément vous permet de définir un style pour la sélection de texte. Si vous désirez simplement changer le bleu en un rouge vif, utilisez un simple :

	::selection {
		background-color: #c0001e; 
	}
	::-moz-selection {
		background-color: #c0001e; 
	}

Vous pouvez voir un exemple fonctionnel sur ce blog même : la sélection est affiché en blanc, sur fond anthracite.

## Les propriétés concernées

Les propriétés CSS pouvant être utilisé sur le pseudo-élément `::selection` sont peu nombreuses, en voici la liste :
<ul>
	<li>`background`</li>
	<li>`background-color`</li>
	<li>`color`</li>
	<li>`text-shadow`</li>
</ul>

## Liens :
[Can I Use ? ::selection](http://caniuse.com/#feat=css-selection)   
[MDN - Le pseudo-élément ::selection](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection)   