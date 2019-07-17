var STATES = [];
var CATEGORY = [];
var current, jsonData, categoryData, stateData;
var selector = 'donut-chart';
var yearLength = 2030;
var year = [];		
var i = 2018;
for (i = 2018; i<= yearLength; i++){
year.push(i)
}
var API_URL = '\json/mcjsondata.json';
//var API_URL = '';
const API_BASE_Data = 'https://script.google.com/macros/s/AKfycbwmcM9ig7EsXkM48Bev89LbBpb5LuS2YudknsxxSN1SJfPs8XeO/exec';
const API_KEY = 'abcdef';

if(API_URL){
	var url = API_URL;
	
}else{
	var url = API_BASE_Data+'?key=' + API_KEY;	
}


	
function createData(arr){	

/*********add color base on category start*************/
var catcolor = '';
var hovercolor = '';

if(arr.category_id.length > 1)
{
cats = arr.category_id.split(",");
}
else
{
cats = [1];	
}



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
				
				var reprocurement = arr.reprocurement+'-';
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
				
				
		
			var urls = $.parseJSON(arr.links);
			var urlData = '';
			 $.each(urls, function (i,v)
			{
			  urlData += '<a href="'+v.url+'">'+v.link+'</a> ';
			});
				/*******grap end*******************/
				// var date = "\/Date(1297246301973)\/";

				var contractStartDate = arr.contract_start.split('T');
				var contractEndDate = arr.contract_end.split('T');
				
		html ='';      
		html +='<div class="single-card-iner"><div class="row">\
		 <div class="col-md-2">\
				  <div class="back-color" style="background:'+catcolor+';"><span>'+arr.abbreviation+'</span></div>\
				</div>\
			     <div class="col-md-10"><div class="row"><div class="col-md-9">\
				    <div class="card-left">\
					  <ul class="list-heading">\
					    <li>Services</li>\
					    <li>Project Name</li>\
					    <li>Contract Start</li>\
					    <li>Contract End</li>\
					    <li>Type</li>\
					  </ul>\
					  <ul class="card-data-sec">\
					    <li>'+arr.catname+'</li>\
					    <li>'+arr.program_name+'</li>\
					    <li>'+contractStartDate[0]+'</li>\
					    <li>'+contractEndDate[0]+'</li>\
					    <li>'+arr.type+'</li>\
					  </ul>\</div>\
				 </div>\
				 <div class="col-md-3 graph">\
				 <div class="label-year">Re-Procurement <span>'+arr.reprocurement+'</span></div>\
                     <div id="canvas-holder" class="graphchart" style="width:100%">\
						<canvas id="'+selector+'"></canvas>\
					</div>\
				 </div>\
					 <div class="footer-list col-md-12"><ul class="list-heading list-second">\
					    <li><strong>Extension</strong></li>\
					    <li><strong>Notes</strong></li>\
					    <li><strong>Links</strong></li>\
					  </ul>\
					  <ul class="list-second">\
					    <li>'+arr.extension+'</li>\
					    <li>'+arr.notes+'</li>\
					    <li>'+urlData+'</li>\
					  </ul>\</div></div></div></div></div>';
       
		   $('#bind-single-state').append(html);
		   
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
    
    var thisData='';
    var arrayLength=[];
	$('#bind-single-state').fadeOut();
	$('#bind-single-state').html('');
    jQuery.each( jsonData, function( key, value ) {	
        if(value.abbreviation===abb){				
				arrayLength.push(value);
				createData(value);
				thisData = value;
        }   
    });
	
	 if(!thisData){
        return;
    }
	 
	$('.single-card-iner').addClass('card'+arrayLength.length);
    $('#bind-single-state').fadeIn();
    $('.mob').hide();
	
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

	
		
/************card show on category change start*************/
		

function checkCatJson(catID){ 
	var catcolor = '';
	var hovercolor = '';
    var thisData='';
	$('#bind-single-state').html('');
    jQuery.each( jsonData, function( key, value ) {	

		var catVal = value.category_id+' ';
		stateCategories = catVal.split(",");
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
	 $('.mob').hide();
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
	_getStateData();
});

	function _buildApiUrl ( ) {
		if(API_URL){
			let url = API_URL;
			
		}else{
			let url = API_BASE_Data;
			url += '?key=' + API_KEY;
		}

		console.log(url);
		return url;
	}
	
	function _setNotice (label) {
		document.getElementById('notice').innerHTML = label;
	}
	
	function _getStateData () {	
		fetch(_buildApiUrl())
			.then((response) => response.json())
			.then((json) => {
				
				jsonData = json.mc_data;
				stateData = json.states;
				catData = json.category;
				
				_stateBind(stateData);
				_categoryBind(catData);
				
				
				loadMap(jsonData,catData);
				
				createTable(jsonData);
				

				
			})
			.catch((error) => {
				_setNotice('Unexpected error loading posts');
			})
	}
	
	/*****************************************************/	
	/***********************state start*******************/
	/*****************************************************/	
	function _stateBind(stateData){
				STATES.length = 0;
	            STATES.push('<option>Select State</option>');
        		for (var i = 0; i < stateData.length; i++) {
        			createStates(stateData[i]);		
        		}	
					
        		jQuery('#states').html(STATES);
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


	/************select drop down value***************/ 
	jQuery(document).on('change', '#states', function() {
		 jQuery("#category option").prop('selected', false);
		var val = jQuery(this).val();			
		checkJson(val);
	});
		
	
	/*****************************************************/	
	/**************category drop down start***************/
	/*****************************************************/	
	function _categoryBind(catData){
		CATEGORY.length = 0;
				categoryData = catData;
	            CATEGORY.push('<option>Scope of Benefits</option>');
        		for (var i = 0; i < catData.length; i++) {
        			createcategory(catData[i]);		
        		}
				
        		jQuery('#category').html(CATEGORY);
	}
	
	function createcategory(arr) {		
		var html = '<option value="'+arr.id+'">'+arr.description+'</option>';
		CATEGORY.push(html); 
	}

	/************select drop down value***************/ 
	jQuery(document).on('change', '#category', function() {
		 jQuery("#states option").prop('selected', false);
		var val = jQuery(this).val();			
		checkCatJson(val);
	});
		
	/**********category drop down end*******************/

});


	
/************************************************/
/*************mapload jquery start***************/
/************************************************/


function loadMap(jsonData,categoryData){		
var abb = [];
var states_id = [];
var category_id = [];
var color = [];
var hoverColor = [];

console.log(jsonData);

jQuery.each( jsonData, function( key, value ) {	
	abb[key]=value.abbreviation;
	states_id[key]=value.states_id;
	category_id[value.abbreviation]=value.category_id;
});


	 mapData = window.JSMaps.maps.usaTerritories;
	 var mapPaths = window.JSMaps.maps.usaTerritories.paths;
	 var i=0;
	  for (property in mapPaths) {
				if (mapPaths.hasOwnProperty(property)) {

				var StateName=mapData.paths[property].name.trim();
				var abbreviation = mapData.paths[property].abbreviation.trim();
				
				if ($.inArray(abbreviation, abb) !== -1){
					
					mapData.paths[property].enable = true;
					
							var catArrs =  category_id[abbreviation]+ ' ';
							cats = catArrs.split(",");

							var catss = [];
							$.each(cats, function(inx, ca) {
								catss.push(parseInt(ca))
							})
							/* if(abbreviation == "VA"){
								console.log(catss);
								} */	
								
							$.each(categoryData, function(inx, cat) {
								
								if(jQuery.inArray(parseInt(cat.id), catss) !== -1){									 
									  mapData.paths[property].color = cat.color;
									  mapData.paths[property].hoverColor = cat.hover_color;
									  mapData.paths[property].selectedColor = cat.hover_color;
									}
									if(cat.id=='0'){
										 mapData.paths[property].enable = false;
										 
									}
							});

				}
				}
				i++;
	}
	$('#map').trigger('reDraw', mapData);

}			  

		
/***********************************************/
/*************mapload jquery end*****************/
/***********************************************/

/*****************************************************/	
/**********table data start***************************/
/*****************************************************/	
	function createTable(){	
		var html =''; 
		var k = 0;
    
		jQuery.each( jsonData, function( key, value ) {
			
				/*********create progress bar start**********/
				
				var rep_year = [];
				var reprocurement = value.reprocurement+'-';
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
			
				
				
				
/*********create progress bar end**********************/
/*********add color base on category start*************/
var catcolor = '';
var hovercolor = '';

if(value.category_id.length > 1)
{
cats = value.category_id.split(",");
}
else
{
cats = [1];	
}


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
var unclear = '#e8e8e8';
if(value.reprocurement == 'Unclear'){
	var unclear = catcolor;
}


			html +='<div class="data-sec">\
				  <ul class="data">\
					 <li>'+value.abbreviation+'</li>\
					 <li>'+value.program_name+'</li>\
					 <li>'+value.catname+'</li>\
					 <li>'+value.contract_start+'</li>\
					 <li class="timelinee fadeInRight">\
					 <div class="timelineeinner"><div class="timeln" style="width:'+width+'px; height: 11px; border-radius:25px;background:'+catcolor+'; margin-left:'+margin+'px;"></div></div>\
					 </li>\
					 <li><div class="unclear"><span class="true" style="background:'+unclear+';"></span></div></li>\
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

jQuery(document).on('hover', '.data', function() {		
          console.log('bottom');
		var hoverContent = $(this).find('.hover-content').height();
		
		var bottom = $(window).height() - hoverContent;
		bottom = $(this).offset.top - bottom;
		
	
});

/***************graph map*************/
	
