# Désactiver le cache de Drupal
- zessx
- zessx
- 2014/07/20
- Drupal ; PHP ; Development
- published
	
Comment désactiver complètement le cache de Drupal, quand vous êtes en phase de développement ?

## Configurer Drupal

Commencez par désactiver les fonctions de cache natives dans Drupal. Rendez-vous dans **Configuration > Développement > Performances**, puis désactivez tout :

<center>![Configurer Drupal](posts/images/desactiver-cache-drupal/desactiver-cache.png)</center>

## Installer et configurer le module Devel

Passez [télécharger le module devel](https://www.drupal.org/project/devel) si vous ne l'avez pas déjà, puis installez-le.  
Activez le ensuite dans **Modules > Développement**, puis cliquez sur **Configurer**. Ici, activer simplement l'option **Rebuild the theme registry on every page load** :

<center>![Module devel](posts/images/desactiver-cache-drupal/module-devel.png)</center>

## Liens :
[Drupal](https://www.drupal.org/)   
[Module devel](https://www.drupal.org/project/devel)   