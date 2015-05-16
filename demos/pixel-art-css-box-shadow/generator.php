<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf8">
		<title>Draw CSS</title>
		
		<link rel="stylesheet" href="css/farbtastic.css" type="text/css" />
		<style type="text/css">
			table#draw { 
				position: absolute; top: 10px; left: 10px; z-index: :;
				border-collapse: collapse; 
			}
			td { 
				width: 10px; height: 10px; 
				border: 1px solid #dedede; 
			}
			#mask { 
				position: absolute; top: 10px; left: 10px; z-index: 99;
				width: 650px; height: 650px;
			}
			#colorpicker {
				position: absolute; top: 10px; left: 700px;
			}
			#color {
				position: absolute; top: 250px; left: 710px; 
				text-align: center;
			}
			#generate {
				position: absolute; top: 300px; left: 760px;
			}
			#code {
				position: absolute; top: 10px; left: 930px;
			}
		</style>
	</head>
	<body>
		<div id="mask"></div>
		<table id="draw">
			<?php
				$size = 50;
				for($i=0 ; $i<$size ; $i++) {
					echo "<tr>";
					for($j=0 ; $j<$size ; $j++) {
						echo "<td data-x=\"$j\" data-y=\"$i\"></td>";
					}
					echo "<tr>\r\n";
				}
			?>
		</table>
		
		<div id="colorpicker"></div>
		<input type="text" id="color" name="color" value="#000000" />
		<button id="generate">Générer</button>
		<textarea name="code" id="code" cols="120" rows="40"></textarea>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" tye="text/javascript"></script>
		<script src="js/farbtastic.js" tye="text/javascript"></script>
		<script type="text/javascript">
		$(document).ready(function() {

			$('#colorpicker').farbtastic('#color');

			$('#mask').bind("contextmenu", function(e) {
				return false;
			});

			function paint(e) {
				var offset = $('#mask').offset(); 
				var _mx = e.pageX - offset.left;
				var _my = e.pageY - offset.top;
				var _x = Math.floor(_mx / 13);
				var _y = Math.floor(_my / 13);
				$('td[data-x="'+_x+'"][data-y="'+_y+'"]').css('background', e.button == 2 ? 'none' : $('#color').val());
			}

			$('#mask').mousedown(function(e) {
				$(this).bind('mousemove', paint);
				paint(e);
			});
			$('#mask').mouseup(function(e) {
				$(this).unbind('mousemove', paint);
			});
			$('#mask').mouseout(function(e) {
				$(this).unbind('mousemove', paint);
			});
			$('#mask').click(function(e) {
				$(this).unbind('mousemove', paint);
			});
			$('#generate').click(function(e) {
				var startx = 0;
				var startfound = false;
				for(var x=0 ; x<<?php echo $size; ?> && !startfound ; x++) {
					for(var y=0 ; y<<?php echo $size; ?> && !startfound ; y++) {
						if($('td[data-x="'+x+'"][data-y="'+y+'"]').css('background-color') != 'rgba(0, 0, 0, 0)') {
							startx = x;
							startfound = true;
						}
					}
				}
				var starty = 0;
				var startfound = false;
				for(var y=0 ; y<<?php echo $size; ?> && !startfound ; y++) {
					for(var x=0 ; x<<?php echo $size; ?> && !startfound ; x++) {
						if($('td[data-x="'+x+'"][data-y="'+y+'"]').css('background-color') != 'rgba(0, 0, 0, 0)') {
							starty = y;
							startfound = true;
						}
					}
				}
				var stopx = <?php echo $size; ?>;
				var stopfound = false;
				for(var x=<?php echo $size; ?>-1 ; x>=0 && !stopfound ; x--) {
					for(var y=<?php echo $size; ?>-1 ; y>=0 && !stopfound ; y--) {
						if($('td[data-x="'+x+'"][data-y="'+y+'"]').css('background-color') != 'rgba(0, 0, 0, 0)') {
							stopx = x;
							stopfound = true;
						}
					}
				}
				var stopy = <?php echo $size; ?>;
				var stopfound = false;
				for(var y=<?php echo $size; ?>-1 ; y>=0 && !stopfound ; y--) {
					for(var x=<?php echo $size; ?>-1 ; x>=0 && !stopfound ; x--) {
						if($('td[data-x="'+x+'"][data-y="'+y+'"]').css('background-color') != 'rgba(0, 0, 0, 0)') {
							stopy = y;
							stopfound = true;
						}
					}
				}
				
				var content = '.item { \r\n\twidth: 10px;\r\n\theight: 10px;\r\n\tbackground: transparent;\r\n\tbox-shadow:\r\n';
				for(var y=starty ; y<=stopy ; y++) {
					for(var x=startx ; x<=stopx ; x++) {
						content = content + '\t\t' + (10*(x-startx+1))+'px '+(10*(y-starty+1))+'px 0 '+$('td[data-x="'+x+'"][data-y="'+y+'"]').css('background-color')+',\r\n';
					}
				}
				content = content + '\t\t0 0 transparent;\r\n}';
				$('#code').val(content);
			})

		});
		</script>
	</body>
</html>