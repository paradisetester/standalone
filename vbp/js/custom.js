$(document).ready(function(){
	   
		
	
		/********onclick map and chart********/
    $('.custom_btn-chart').click(function() {
			$('#map').fadeOut("slow");
			$('.mob').hide();
			$('.timeline-table').fadeIn("slow");
			 $('#bind-single-state').fadeOut();
    });
	 $('.map-btn').click(function() {
		 
			$('.timeline-table').fadeOut("slow");
			$('#map').fadeIn("slow");			
			$('.mob').fadeIn("slow");			
			$('#bind-single-state').html('');

			$("#states option:selected").prop("selected", false);
    });		
});

$(document).ready(function(){
	jQuery(document).on('click', '.card-parent', function() {
$( ".card-bottom" ).hide();
$(this).parent().find('.card-bottom').show("slow");
});}); 