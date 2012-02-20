/**
 * Accordion source: http://www.stemkoski.com/stupid-simple-jquery-accordion-menu/
 */

$(document).ready(function(){
	
	$('.accordionButton').click(function() {
		$('.accordionButton').removeClass('on');
	 	$('.accordionContent').slideUp('normal');

	 	if($(this).next().is(':hidden') == true) {
			$(this).addClass('on');
			$(this).next().slideDown('normal');
		 } 
	 });
	  
	
	$('.accordionButton').mouseover(function() {
		$(this).addClass('over');
		
	}).mouseout(function() {
		$(this).removeClass('over');										
	});
	
	$('.accordionContent').hide();
	
	var first = $($('.accordionContent')[0]); // referencia aa primeira secao do accordion

	first.addClass( 'on' );
	first.slideDown( 'normal' );
	
});