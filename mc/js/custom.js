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