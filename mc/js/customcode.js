var STATES = [];
var CATEGORY = [];
var current, jsonData, categoryData;
var selector = 'donut-chart';
var yearLength = 2030;
var year = [];		
var i = 2018;
for (i = 2018; i<= yearLength; i++){
year.push(i)
}
		

function createData(arr){	

/*********add color base on category start*************/
var catcolor = '';
var hovercolor = '';
cats = arr.category_id.split(",");

		var catss = [];
		$.each(cats, function(inx, ca) {
			catss.push(parseInt(ca))
		})
		$.each(categoryData, function(inx, cat) {	
			if(jQuery.inArray(parseInt(cat.id), catss) !== -1){
				  catcolor = cat.color;
				  hovercolor = cat.hovercolor;
				}
		});


/*********add color base on category end*************/
/*******grap start*****************/
			selector = 'donut-chart'+arr.id;
				
				var rep_year = [];
				var active_color = [];
				
				var reprocurement = arr.reprocurement;
				res = reprocurement.split("-");
				 if(res.length>1){					 
					  for (k = parseInt(res[0]); k<= parseInt(res[1]); k++){
					  rep_year.push(k)
					}
				 }else{
					 rep_year.push(parseInt(res[0]))
				 }	

				
				$.each(year, function(indx, val) { 				
										
					if(jQuery.inArray(val, rep_year) !== -1){
						active_color.push(catcolor);
					 }else{	
						active_color.push('#cccccc');
						}
					 
					 
				});
				
				
			

				/*******grap end*******************/
				
		html ='';      
		html +='<div class="single-card-iner"><div class="row">\
		 <div class="col-md-2">\
				  <div class="back-color" style="background:'+catcolor+';"><span>'+arr.abbreviation+'</span></div>\
				</div>\
			     <div class="col-md-8">\
				    <div class="card-left">\
					  <ul>\
					    <li>Services</li>\
					    <li>Project Name</li>\
					    <li>Contract Start</li>\
					    <li>Contract End</li>\
					    <li>Type</li>\
					  </ul>\
					  <ul class="card-data-sec">\
					    <li>'+arr.catname+'</li>\
					    <li>'+arr.program_name+'</li>\
					    <li>'+arr.contract_start+'</li>\
					    <li>'+arr.contract_end+'</li>\
					    <li>'+arr.type+'</li>\
					  </ul>\
					</div>\
				 </div>\
				 <div class="col-md-2 graph">\
				 <div class="label-year">Re-Procurement <span>'+arr.reprocurement+'</span></div>\
                     <div id="canvas-holder" class="graphchart" style="width:100%">\
						<canvas id="'+selector+'"></canvas>\
					</div>\
				 </div>\
			</div></div>';
       
		   $('#bind-single-state').append(html);
		   
		   console.log(active_color);
			var config = drawGrap(rep_year,active_color,selector);
	
	
			var ctx = document.getElementById(selector).getContext('2d');	
			
			myDoughnut = new Chart(ctx, config);
			
			myDoughnut.options.circumference = Math.PI;
			myDoughnut.options.rotation = -Math.PI;
			
			myDoughnut.update();
	
	
	//drawGrap(data,dataLabelsArray,seriesColorsArray,selector);
}
/************card show on map state click start*************/
function checkJson(abb){ 
   $('#bind-single-state').fadeOut();
    var thisData='';
	$('#bind-single-state').html('');
    jQuery.each( jsonData, function( key, value ) {	
        if(value.abbreviation===abb){
			 createData(value);
			 thisData = value;
        }   
    });
	 if(!thisData){
        return;
    }
	 
	
    $('#bind-single-state').fadeIn();
	
    $('#map').fadeOut("slow");
    $('.table-inner').fadeOut("slow");
	
	
	/************select drop down option start***************/   
   jQuery("#states option").each(function( index ) {	  
        var chk = jQuery(this).val();
        if(chk==abb){
            jQuery(this).prop('selected', true);
        }
    });
   /************select drop down option end***************/      
}

/************card show on map state click end***************/	

	/************select drop down value***************/ 
	jQuery(document).on('change', '#states', function() {
		 jQuery("#category option").prop('selected', false);
		var val = jQuery(this).val();			
		checkJson(val);
	});
		
	/************select drop down value***************/ 
	jQuery(document).on('change', '#category', function() {
		 jQuery("#states option").prop('selected', false);
		var val = jQuery(this).val();			
		checkCatJson(val);
	});
		
		
		/************card show on category change start*************/
		
function checkCatJson(catID){ 
	var catcolor = '';
	var hovercolor = '';
    var thisData='';
	$('#bind-single-state').html('');
    jQuery.each( jsonData, function( key, value ) {	
	
		
		stateCategories = value.category_id.split(",");
		var catss = [];
		$.each(stateCategories, function(inx, ca) {
			catss.push(parseInt(ca))
		});
		
				
			if(jQuery.inArray(parseInt(catID), catss) !== -1){				
					createData(value);
					thisData = value;
				}
		

          
    });
	 if(!thisData){
        return;
    }
    $('#map').fadeOut("slow");
    $('.table-inner').fadeOut("slow");
	 $('#bind-single-state').fadeIn();
	/************select drop down option start***************/   
   jQuery("#category option").each(function( index ) {
        var chk = jQuery(this).val();
        if(chk==catID){
            jQuery(this).prop('selected', true);
        }
    });
   /************select drop down option end***************/      
}

/************card show on map state click end***************/

	
	
	
$(document).ready(function(){
	
	 
/******map********/	
		 jQuery('#map').JSMaps({
				map: 'usaTerritories',
				mapWidth: 800, 
				mapHeight: 600,
				stateClickAction : "none",
				onStateClick : function(res) {
				
				 checkJson(res.abbreviation);
				 var dataLayer = window.dataLayer = window.dataLayer || [];
				 dataLayer.push({'event': 'ClickonMap'});
					 
				}
		});
		

jQuery(function(){
    loadAjax('\json/mcstates.json');
   // loadAjax('\json/mccategoy.json');
});

function loadAjax(file){
    current = file;
    jQuery.ajax({
        dataType: "json",
		url: file,
		data: [],
		success: showData
	});	
}


function showData(data, status, xhr) {
	if(data.length){
	    switch(current){
	        case '\json/mcstates.json':
			console.log('state');
	            STATES.length = 0;
	            STATES.push('<option>Select State</option>');
        		for (var i = 0; i < data.length; i++) {
        			createStates(data[i]);		
        		}				
        		jQuery('#states').html(STATES);
                loadAjax('\json/mccategoy.json');
                
        	break;
			case '\json/mccategoy.json':
				console.log('mccategoy');
	            CATEGORY.length = 0;
				categoryData = data;
	            CATEGORY.push('<option>Select Scop of benefits</option>');
        		for (var i = 0; i < data.length; i++) {
        			createcategory(data[i]);		
        		}
        		jQuery('#category').html(CATEGORY);
                 loadAjax('\json/mcdata.json');
        	break;
			case '\json/mcdata.json':
	            jsonData = data;
					createTable();			
        	break;
            
    	}
	}
}


		
	function createStates(arr) {
	   var html='';	    
		if(arr.available == "1"){
		 html = '<option value="'+arr.abbreviation+'">'+arr.name+'</option>';
	   }else{
		html = '<option value="'+arr.abbreviation+'" disabled style="color: red">'+arr.name+'</option>';
	   }
		STATES.push(html); 
	}

	function createcategory(arr) {
		var html = '<option value="'+arr.id+'">'+arr.name+'</option>';
		CATEGORY.push(html); 
	}



});

/**********table data start*************/

	function createTable(){	
		html =''; 
		var k = 0;

		jQuery.each( jsonData, function( key, value ) {
				/*********create progress bar start**********/
				var rep_year = [];
				var reprocurement = value.reprocurement;
				res = reprocurement.split("-");
				 if(res.length>1){					 
					  for (k = parseInt(res[0]); k<= parseInt(res[1]); k++){
					  rep_year.push(k)
					}
				 }else{
					 rep_year.push(parseInt(res[0]))
				 }
					

				var width = 0;
				var margin = 0;
					
				$.each(year, function(indx, val) { 				
										
					if(jQuery.inArray(val, rep_year) !== -1){
										
						  width += +(parseInt(16.33));
					 }else{	
					 
					 if(width >0 ){
						 margin += +(parseInt(16.33));						 
					 } 
				}
					 
					 
				});
				
				
				
				
				/*********create progress bar end************/
/*********add color base on category start*************/
var catcolor = '';
var hovercolor = '';
cats = value.category_id.split(",");

var catss = [];
$.each(cats, function(inx, ca) {
	catss.push(parseInt(ca))
})
$.each(categoryData, function(inx, cat) {	
	if(jQuery.inArray(parseInt(cat.id), catss) !== -1){
		  catcolor = cat.color;
		  hovercolor = cat.hovercolor;
		}
});

/*********add color base on category end*************/

			html +='<div class="data-sec">\
				  <ul class="data">\
					 <li>'+value.abbreviation+'</li>\
					 <li>'+value.program_name+'</li>\
					 <li>'+value.catname+'</li>\
					 <li>'+value.contract_start+'</li>\
					 <li class="timelinee fadeInRight">\
					 <div class="timelineeinner"><div class="timeln" style="width:'+width+'px; height: 11px; border-radius:25px;background:'+catcolor+'; margin-left:'+margin+'px;"></div></div>\
					 </li>\
					 <li><div class="unclear"><span class="true" style="background:'+catcolor+';"></span></div></li>\
					 <div class="hover-content" style="border-color:'+catcolor+'">\
			       <ul>\
				       <li>State</li>\
				       <li class="hov-con">'+value.abbreviation+'</li>\
				   </ul>\
				   <ul>\
				       <li>Program Name:</li>\
				       <li class="hov-con">'+value.program_name+'</li>\
				   </ul>\
				   <ul>\
				       <li>Service Provided</li>\
				       <li class="hov-con">'+value.catname+'</li>\
				   </ul>\
				   <ul>\
				       <li>Contract Start</li>\
				       <li class="hov-con">'+value.contract_start+'</li>\
				   </ul>\
				   <ul>\
				       <li>Contract End</li>\
				       <li class="hov-con">'+value.contract_end+'</li>\
				   </ul>\
				   <ul>\
				       <li>Projected Re-Procurement Timinig</li>\
				       <li class="hov-con">'+value.reprocurement+'</li>\
				   </ul>\
				   <ul>\
				       <li>Contract Extension Options</li>\
				       <li class="hov-con">'+value.extension+'</li>\
				   </ul>\
				   <ul>\
				       <li>Notes</li>\
				       <li class="hov-con">'+value.notes+'</li>\
				   </ul>\
			   </div>\
				  </ul>\
			  </div>';
       
		});
   $('#bind-table').append(html);
	
}
/**********table data end***************/
	
/***************graph map*************/
function drawGrap(yearArray,active_color,selector){
	

		var config = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: year,
					backgroundColor: active_color,
					label: false,
					borderWidth:0,
					weight:2
				}],
				labels: active_color,
			},
			options: {
				borderAlign:'inner',
				borderColor:'#cccccc',
				borderWidth:5,
				responsive: true,
				legend: false,				
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		};
		return config;
}	


/*
function drawGrap(data,dataLabelsArray,seriesColorsArray,selector){
	console.log(selector);
	var plot1 = jQuery.jqplot (selector, [data], 
    { 
      seriesDefaults: {
        // Make this a pie chart.
        renderer: jQuery.jqplot.PieRenderer, 
        rendererOptions: {
			padding: 2, sliceMargin: 2, 
          startAngle: 180,            
          shadowDepth : 0, 
		    defaultHeight:120,
        defaultWidth: 150,
          dataLabelThreshold: 0, 
          showDataLabels: true,
          // Setting the dataLabelsArray - defined above..  
          dataLabels: dataLabelsArray, 
          dataLabelFormatString: "%s"
        },
      },
        
      //Setting the series colors - defined above.. 
      seriesColors: seriesColorsArray,
        
      // Make the backround transparent, remove canvas borders..
      grid: {
          backgroundColor: 'transparent',
          drawBorder: false,
          shadow: false
      }, 
      legend: { show:false, location: 'e' }
    });
}
*/
/***************graph map*************/
		
		
		/*************map jquery start***************/
		/*************map jquery end***************/
