$(document).ready(function(){
	   
		
		/*********half circle***********/
        $("#test-circle5").circliful({
          animationStep: 5,
          foregroundBorderWidth: 5,
          backgroundBorderWidth: 15,
          percent: 80,
          halfCircle: 1,
        });
		
		/********onclick map and chart********/
    $('.custom_btn-chart').click(function() {
			$('#map').fadeOut("slow");
			$('.table-inner').fadeIn("slow");
			$('#bind-single-state').fadeOut();
			$('.legend').fadeOut("slow");	
    });
	 $('.map-btn').click(function() {
		 $
			$('.table-inner').fadeOut("slow");
			$('#map').fadeIn("slow");			
			$('.legend').fadeIn("slow");			
			$('#bind-single-state').html('');

			$("#states option:selected").prop("selected", false);
    });
});

function tooltip_position()
 {

	var windowidth = $( window ).width();
	
	$('.data-sec').hover(function(event) {
		var window_top = $(window).scrollTop();
		var scroll_top = $(this).offset().top;
	 var cusor_position = scroll_top-window_top;
		
		$('.hover-content').removeClass('topshow');
		$('.hover-content').removeClass('bottomshow');
		
		var hoverDiv = $(this).find('.hover-content');
		
		if((windowidth-event.pageX) > hoverDiv.width())
		{
		hoverDiv.css("left", (event.pageX-50)+"px");
		} else 
		{
		hoverDiv.css("right", 0);	
		}
		var divHeight = hoverDiv.height();
		if(divHeight > cusor_position){
			hoverDiv.addClass('bottomshow');			
		}else{		
			hoverDiv.addClass('topshow');
		}
		
		
	 });
	 }
