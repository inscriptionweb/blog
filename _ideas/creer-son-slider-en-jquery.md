---
layout: post
title:  "Créer son slider en jQuery"
date:   2015-01-01
tags:
- js 
description: >
  
---

	/* Slider top */
	var stlen = $('#slider_top .strip a').size();
	var stx = 0;
	var stpos = 0;
	var stspeed = 500;
	var stdelay = 5000;
	var stpause = false;
	var stto = null;
	function sliderTopRun() {
		if(!stpause) {
			stx = stpos * -432;
			stpause = true;
			$('#slider_top .strip').animate({left: stx+'px'}, stspeed, "swing", function() { stpause = false; });
		}
		if(stto) clearTimeout(stto);
		stto = setTimeout(sliderTopNext, stdelay);
	}
	function sliderTopPrev() {
		if(!stpause) {
			stpos--;
			if(stpos < 0) {
				stx = (stlen - 1) * -432;
				$('#slider_top .strip').css('left', stx+'px');
				stpos = stlen - 2;
			}
		}
		sliderTopRun();
	}
	function sliderTopNext() {
		if(!stpause) {
			stpos++;
			if(stpos >= stlen) {
				stx = 0;
				$('#slider_top .strip').css('left', stx+'px');
				stpos = 1;	
			} 
		}
		sliderTopRun();
	}
	if(stlen > 1) {
		$('#slider_top .strip').css('width', (stlen * 432)+'px');
		$('#slider_top .next').click(sliderTopNext);
		$('#slider_top .prev').click(sliderTopPrev);
		$('#slider_top .strip').hover(
			function(e) { stpause = true; },
			function(e) { stpause = false; }
		);
		sliderTopRun();
	} else {
		$('#slider_top .btn').hide();
	}