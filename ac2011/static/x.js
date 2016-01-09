function doSlideNext(){
	var obj = $($(this).attr('for')).children('.container'),
		total = parseInt($(obj).attr('total')),
		step = parseInt($(obj).attr('step')),
		current = parseInt($(obj).attr('current'));
	if( $(obj).attr('isSliding') == 'true' ) return;
	else $(obj).attr('isSliding', 'true');
	if(current < total){
		$(obj).animate({'left': $(obj).position().left - step + 'px'}, 300, function(){ $(obj).attr('isSliding', 'false'); });
		current++;
		if(current > 0) $(this).prev().prev().fadeIn();
		if(current == total) $(this).fadeOut();
		$(obj).attr('current', current);
	}
	return false;
}

function doSlidePrev(){
	var obj = $($(this).attr('for')).children('.container'),
		total = parseInt($(obj).attr('total')),
		step = parseInt($(obj).attr('step')),
		current = parseInt($(obj).attr('current'));
	if( $(obj).attr('isSliding') == 'true' ) return;
	else $(obj).attr('isSliding', 'true');
	if(current > 0){
		$(obj).animate({'left': $(obj).position().left + step + 'px'}, 300, function(){ $(obj).attr('isSliding', 'false'); });
		current--;
		if(current == 0)$(this).fadeOut();
		if(current < total)$(this).next().next().fadeIn();
		$(obj).attr('current', current); 
	}
	return false;
}

function doSlider(e, ui){
	if( e.detail > 0 ) b5Con.animate({ marginLeft : '-' + ui.value / 100 * b5Width + 'px' }, 600 );
	else b5Con.css( 'marginLeft', '-' + ui.value / 100 * b5Width + 'px');
}

function resize(){
    $('body').width(9999);
    screenWidth = $(window).width();
	screenHeight = $(window).height();
	marginLeft = (screenWidth - 1000)/2;
	
	b5Width = $('#b5 .top-list').outerWidth() - $('#b5 .container').outerWidth();
	
	if( screenWidth > 1000 ) {
	$('#b1').height(screenHeight /1.5);
		for(var i = 0; i < c; i++){
			$('#b'+i).css({ 'left': i * screenWidth + marginLeft + 'px',
							'top' : (screenHeight - $('#b'+i).outerHeight())/2 - 20 + 'px' });
		}
		$('#nav').css({ 'left' : (screenWidth - 400)/2,
						'bottom' : screenHeight / 11 });
		$('.prev').each(function(){$(this).css({'left' : $(this).next().offset().left - 100, 'top' : screenHeight/2 - 25 });});
		$('.next').each(function(){$(this).css({'left' : $(this).prev().offset().left + 1050, 'top' : screenHeight/2 - 25 });});
	} else return false;
	
	$('#resizeHook').click();
}

function init(){
	c = 6;
	screenWidth = $(window).width();
	screenHeight = $(window).height();
	b5Con = $('#b5 .container > ul');
	
	$('#nav a').click(function() { 
		var _h = $(this).attr('href');
		var _color = '';
		switch(_h) {
			case '#b0' : _color = '#eee';break;
			case '#b1' : _color = '#E68A91';break;
			case '#b2' : _color = '#369CF8';break;
			case '#b3' : _color = '#1c772f';break;
			case '#b4' : _color = '#f80';break;
			case '#b5' : _color = '#890000';break;
			default : _color = '#eee';
		}
		$('body').animate({'backgroundColor' : _color} , 600);
		$('html,body').animate({ 'scrollLeft' : $(_h).offset().left - marginLeft }, 1000);
		return false;
	});
	$('.next').click(doSlideNext);
	$('.prev').click(doSlidePrev);
	$('#slider').slider({ slide : doSlider });
	
	resize();
	$(window).bind('resize',resize);
}

$(document).ready(init);
//window.onload = function(){ $('#loading').fadeOut();}