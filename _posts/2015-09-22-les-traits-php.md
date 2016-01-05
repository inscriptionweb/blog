---
layout: post
title:  "Les traits PHP"
date:   2015-09-22
tags:
- php 
description: >
  Gros plan sur les traits en PHP, un concept encore   
  peu utilisé pouvant être utile et perturbant à la fois. 
--- 

## Back to the future

Les traits ont été introduits avec PHP 5.4.0. Ce qui remonte effectivement à plus de 3 ans aujourd'hui... déjà.

Je ne les ai découverts que tout récemment, et ai essayé de les utiliser sur un projet pro. Il m'ont permis de gagner pas mal de temps, et de clarifier mes classes. Toutefois, il n'ont pas apporté que de bonnes choses, voilà pourquoi j'ai pensé à rédiger un petit article pour vous les présenter, ainsi que leurs avantages et inconvénients.

## Let me introduce you...

À l'opposé de l'héritage vertical habituel entre deux classe (`class B extends A`), le trait se pose comme une forme d'héritage horizontal. Il permet de mutualiser des variables et des fonctions pour qu'elles soient réutilisables dans n'importe quelle classe. Le trait est apparu pour répondre partiellement aux problématiques de l'héritage multiple, mais on peine toujours à définir les limites de son utilisation. Voici un exemple basique de trait :

    trait UseAuthor
    {
        protected $author = null;

        public function getAuthor() {
            return $this->author;
        }

        public function setAuthor($author) {
            if (!$author instanceof User) {
                throw new \InvalidArgumentException('Not a valid User');
            }
            $this->author = $author;
            return $this;
        }
    } 

    class Book 
    {
        use UseAuthor;
    }

Le trait propose plusieurs avantages :

- N'importe quelle classe peut utiliser un trait
- Une classe peut utiliser plusieurs traits 
- Un trait peut définir des propriétés
- Un trait peut définir des méthodes abstraites
- Un trait peut définir des variables et méthodes statiques 
- Un trait peut utiliser d'autres traits

En ce sens, le trait se place entre la classe et l'interface. C'est une sorte de classe à typage faible et non instanciable.

## Le problème du typage faible

Le typage faible des traits est important à comprendre et à prendre en compte, car c'est le point qui peut poser le plus de problèmes. Un exemple qui a fréquemment été mis en avant pour justifier les traits est celui du pattern Singleton. Je vous invite à vous renseigner sur les design patterns (ou patrons de conception) si vous n'êtes pas familiers d'eux. Voici un trait reproduisant ce pattern :

    trait Singleton
    {
        private static $instance;

        public static function getInstance()
        {
            if (!static::$instance instanceof self) {
                static::$instance = new self;
            }
            return static::$instance;
        }
    }

C'est un bout de code très attrayant, car il peut être réutilisé à souhait sur n'importe quelle classe pour s'assurer qu'elle respecte le pattern Singleton :

    class MaClasse
    {
        use Singleton;
    }

Deux problèmes se posent :

- D'une part et contrairement à l'utilisation d'une interface, une instance de `MaClasse` ne sera pas pour autant une instance de `Singleton`.
- D'autre part et contrairement à l'utilisation d'un héritage classique, le type retourné par la fonction `getInstance()` **dépend entièrement de la classe qui utilise le trait**. 

Concrètement, cela veut dire que le trait ne peut pas connaître le type de `self` (et donc vous non plus, quand vous codez le trait), et qu'il ne sera pas possible de faire ceci :

    $object = new MaClasse();
    if ($object instanceof Singleton) {
        ...
    }

Gardez bien ça en tête afin d'éviter d'utiliser les traits là où ils vous apporteront plus de soucis que d'avantages.

## Les traits multiples et leurs conflits

On a évoqué plus tôt le fait que les traits permettaient de reproduire partiellement l'héritage multiple. Pour utiliser plusieurs traits, vous avez juste à les séparer par des virgules :

    class MaClasse 
    {
        use TraitA, TraitB, TraitC;
    }

Dans le cas où plusieurs traits définiraient des variables ou des fonctions avec le même nom, il est possible de résoudre les conflits engendrés. Soit en choisissant quelle variable/fonction utiliser, soit en les renommant :

    trait TraitA
    {
        public function out() {
            print 'A';
        } 
    }

    trait TraitB
    {
        public function out() {
            print 'B';
        } 
    }

    class MaClasse
    {
        use TraitA, TraitB {
            TraitA::out as outA;
            TraitB::out insteadof TraitA;
        }
    }

Voici les résultats pour l'exemple ci-dessus :

    $object = new MaClasse();
    $object->out();  // B 
    $object->outA(); // A

De la même manière, il est possible de changer la visibilité des membres, toujours avec le mot-clé `as` :

    class MaClasse
    {
        use TraitA {
            out as private;
        }
    }

## Conclusion

Voilà pour cette petite présentation des traits, j'espère qu'ils vous serviront un jour. Pour le moment, je les ai surtout utilisés pour ajouter des getters et 
des setters (`UseSingleCategory`, `UseMultipleCategories`...) et ainsi m'éviter de dupliquer du code. Malgré tout, je suis encore assez fébrile sur leur utilisation, et je peine à clairement identifier les cas où je devrais ou non les utiliser, alors n'hésitez pas à partager vos idées et les utilisations que vous en faites dans les commentaires !

## Liens

[Présentation des traits sur php.net](http://php.net/manual/fr/language.oop5.traits.php)  
[Le pattern Singleton](https://fr.wikipedia.org/wiki/Singleton_(patron_de_conception))  
