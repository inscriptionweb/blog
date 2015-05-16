# TWBSColor
- zessx
- zessx
- 2013/11/13
- Bootstrap ; CSS ; Sass ; Design ; News
- published
	
Vous connaissez probablement [Bootstrap](http://getbootstrap.com/) (anciennement Twitter Bootstrap), le framework CSS le plus en vogue aujourd'hui. Je l'utilise personnellement assez régulièrement, dans des contextes autant professionnels que personnels.   
Bootstrap n'est pas adapté à tous les projets, il ne faut pas chercher à systématiqument l'utiliser, mais il est important de savoir qu'il existe et d'être capable de détecter quand il peut être utile. Il permet en effet un gain de temps assez bluffant lorsqu'il s'agit de réaliser des applications web.   

## Le composant navbar

Le [composant navbar](http://getbootstrap.com/components/#navbar) est un des plus utilisé dans le framework Bootstrap. Voici un exemple d'utilisation de ce composant :

	<nav class="navbar navbar-default" role="navigation">
	  <!-- Brand and toggle get grouped for better mobile display -->
	  <div class="navbar-header">
	    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	      <span class="sr-only">Toggle navigation</span>
	      <span class="icon-bar"></span>
	      <span class="icon-bar"></span>
	      <span class="icon-bar"></span>
	    </button>
	    <a class="navbar-brand" href="#">Brand</a>
	  </div>

	  <!-- Collect the nav links, forms, and other content for toggling -->
	  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	    <ul class="nav navbar-nav">
	      <li class="active"><a href="#">Link</a></li>
	      <li><a href="#">Link</a></li>
	      <li class="dropdown">
	        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li><a href="#">Action</a></li>
	          <li><a href="#">Another action</a></li>
	          <li><a href="#">Something else here</a></li>
	          <li class="divider"></li>
	          <li><a href="#">Separated link</a></li>
	          <li class="divider"></li>
	          <li><a href="#">One more separated link</a></li>
	        </ul>
	      </li>
	    </ul>
	    <form class="navbar-form navbar-left" role="search">
	      <div class="form-group">
	        <input type="text" class="form-control" placeholder="Search">
	      </div>
	      <button type="submit" class="btn btn-default">Submit</button>
	    </form>
	    <ul class="nav navbar-nav navbar-right">
	      <li><a href="#">Link</a></li>
	      <li class="dropdown">
	        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
	        <ul class="dropdown-menu">
	          <li><a href="#">Action</a></li>
	          <li><a href="#">Another action</a></li>
	          <li><a href="#">Something else here</a></li>
	          <li class="divider"></li>
	          <li><a href="#">Separated link</a></li>
	        </ul>
	      </li>
	    </ul>
	  </div><!-- /.navbar-collapse -->
	</nav>

Comme on peut le voir, il est assez complexe dans sa structure, bien qu'assez facile à appréhender. Cette complexité va nous poser problème quand vous aurez envie de modifier la couleur du composant. Ce dernier utilise en effet plusieurs couleurs, et à différents endroits. C'est là qu'intervient [TWBSColor](http://work.smarchal.com/twbscolor/)...

## TWBSColor

[TWBSColor](http://work.smarchal.com/twbscolor), le petit outil que je vous présente va vous permettre de générer une navbar à vos couleurs très rapidement. Vous aurez 4 couleurs à définir : 
<ul>
	<li>Default background</li>
	<li>Active background</li>
	<li>Default color</li>
	<li>Active font</li>
</ul>
L'outil reste assez simpliste, mais répondra aux besoin de la plupart des gens. Pour un usage plus poussé, rien ne vous empêche d'aller mettre les mains dans le code, comme j'ai pu le faire moi-même.

## Quelques exemples :

[Couleurs de base](http://work.smarchal.com/twbscolor/css)   
<center><iframe src="http://work.smarchal.com/twbscolor/navbar.php" width="800" height="80" scrolling="no"></iframe></center>

[Tons rouges](http://work.smarchal.com/twbscolor/css/e74c3cc0392becf0f1ffbbbc0)   
<center><iframe src="http://work.smarchal.com/twbscolor/navbar.php?params=e74c3cc0392becf0f1ffbbbc0" width="800" height="80" scrolling="no"></iframe></center>

[Tons verts](http://work.smarchal.com/twbscolor/css/2ecc7127ae60ecf0f1d1ffed0)   
<center><iframe src="http://work.smarchal.com/twbscolor/navbar.php?params=2ecc7127ae60ecf0f1d1ffed0" width="800" height="80" scrolling="no"></iframe></center>

[Tons violets](http://work.smarchal.com/twbscolor/css/9b59b68e44adecf0f1ecdbff0)   
<center><iframe src="http://work.smarchal.com/twbscolor/navbar.php?params=9b59b68e44adecf0f1ecdbff0" width="800" height="80" scrolling="no"></iframe></center>

[Tons oranges](http://work.smarchal.com/twbscolor/css/e67e22d35400ecf0f1ffe6d10)   
<center><iframe src="http://work.smarchal.com/twbscolor/navbar.php?params=e67e22d35400ecf0f1ffe6d10" width="800" height="80" scrolling="no"></iframe></center>

## Une alternative LESS ?

Il faut savoir que Bootstrap propose [des build personnalisés](http://getbootstrap.com/customize/), pour lesquels vous choisissez quels fichiers LESS compiler, en fixant certaines variables.   
C'est un autre moyen simple pour vous de modifier les couleurs du composant navbar, et bien plus encore.

## Liens :
[TWBSColor](http://blog.work.smarchal.com/twbscolor/)   
[Le site de Bootstrap](http://getbootstrap.com/)   
[Le composant Navbar](http://getbootstrap.com/components/#navbar)   
[Les builds Bootstrap personnalisé](http://getbootstrap.com/customize/)   
[Le post SO à l'origine de l'idée](http://stackoverflow.com/a/18529465/1238019)   