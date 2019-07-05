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

const API_BASE_Data = 'https://script.google.com/macros/s/AKfycbws32hX3t5Ze0ES4Sv7morqYW9Z1H0Eja0Yezv2Ha9Qq90CPBJH/exec';
const API_KEY = 'abcdef';

//var url = API_BASE_Data+'?key=' + API_KEY;
var url = 'json/vbp.json';

		
	

function createData(arr){	

/*********add color base on category start*************/
var catcolor = '';
var hovercolor = '';
var catArrs =  arr.category_id+ '';
cats = catArrs.split(",");

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
				
				var reprocurement = arr.reprocurement+' ';
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
		var converter = new showdown.Converter();
        var program_name = arr.program_name;
		//program_name = 	program_name.replace("• ", "---");
		 //program_name = program_name.replace(/&#8226;/g,'<br/>&#8226;');
		html ='';      
		html +='<div class="program_name">'+arr.title+'</div><section class="discription-content">\
					<div class="requirements">	\
						<ul>\
							<li><span class="ques">Program Name(s)</span> <span class="ans">'+converter.makeHtml(program_name)+'</span></li>\
							<li><span class="ques">Program Website(s):</span> <span class="ans">'+converter.makeHtml(arr.program_website)+'</span></li>\
							<li><span class="ques">Program Contract</span> <span class="ans">'+converter.makeHtml(arr.program_contract)+'</span></li>\
							<li><span class="ques">Contract Effective Date</span><span class="ans">'+converter.makeHtml(arr.contract_effective_date)+'</span></li>\
							<li><span class="ques">VBP Requirements Identified in the Contract?:</span><span class="ans"> '+converter.makeHtml(arr.vbp_requirements_identified_contract)+'</span></li>\
							<li><span class="ques">VBP Requirements Identified Elsewhere?: </span><span class="ans">'+converter.makeHtml(arr.vbp_requirements_identified_elsewhere)+'</span></li>\
							<li><span class="ques">Other Source(s) of VBP Requirements:</span><span class="ans">'+converter.makeHtml(arr.additional_sources_of_vbp_requirements)+' </span></li>\
						</ul>\
					</div>\
					<div class="summary">\
						<h3>Summary of the State`s VBP Requirements:  </h3>\
						<p>'+converter.makeHtml(arr.summary_of_the_state_vbp_requirements)+'</p>\
					<h3>Citations:</h3>\
					<ul>'+converter.makeHtml(arr.citations)+'</ul>\
					</ul>\
					</div>\
					</section>';      
		
       
		   $('#bind-single-state').append(html);
		   
		  
	
	
	//drawGrap(data,dataLabelsArray,seriesColorsArray,selector);
}
/************card show on map state click start*************/
function checkJson(abb){ 
   $('#bind-single-state').fadeOut();
    var thisData='';
    var arrayLength=[];
	$('#bind-single-state').html('');
    jQuery.each( jsonData, function( key, value ) {	
        if(value.abbreviation===abb){
			arrayLength.push(value)
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
    $('.timeline-table').fadeOut("slow");
	
	
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
    $('.timeline-table').fadeOut("slow");
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
				"abbreviationColor" : '#000000',
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
		/* let url = API_BASE_Data;
		url += '?key=' + API_KEY; */
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
				_categoryBind(catData);				
				createTable(jsonData);
				_stateBind(stateData);
				
				loadMap(jsonData,catData);
				
			})
			.catch((error) => {
				console.log(error);
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
	         
        		for (var i = 0; i < catData.length; i++) {
        			createcategory(catData[i]);		
        		}
				
        		jQuery('.legends').html(CATEGORY);
	}
	
	function createcategory(arr) {		
		
		var html = '<li><span style="background:'+arr.color+';"></span>'+arr.description+'</li>';
		CATEGORY.push(html); 
	}

	/************select drop down value***************/ 
	/* jQuery(document).on('change', '#category', function() {
		 jQuery("#states option").prop('selected', false);
		var val = jQuery(this).val();			
		checkCatJson(val);
	}); */
		
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

//console.log(jsonData);

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
	function createTable(jsonData){	
		html =''; 
		var mobileHtml =''; 
		var k = 0;

		jQuery.each( jsonData, function( key, value ) {
				/*********create progress bar start**********/
				var rep_year = [];
				var reprocurement = value.reprocurement+' ';
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
var categoryIds = value.category_id+' '
cats = categoryIds.split(",");

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
       
		
   
//responsive
mobileHtml +='<div class="responv-design">\
    <ul>\
	   <li class="res-title">State</li>\
	   <li>'+value.abbreviation+'</li>\
	</ul>\
	<ul>\
	   <li class="res-title">Program Name</li>\
	   <li>'+value.program_name+'</li>\
	</ul>\
	 <ul>\
	   <li class="res-title">Services Provided</li>\
	   <li>'+value.catname+'</li>\
	</ul>\
	 <ul>\
	   <li class="res-title">Contract Start</li>\
	   <li>'+value.contract_start+'</li>\
	</ul>\
	 <ul>\
	   <li class="res-title">Contract End</li>\
	   <li>'+value.contract_end+'</li>\
	</ul>\
	 <ul>\
		<li class="timeline-sec res-title"><span>Project Re-Procurement Window</span>\
			 <div class="timelineeinner"><div class="timeln" style="width:'+width+'px; height: 11px; border-radius:25px;background:'+catcolor+'; margin-left:'+margin+'px;"></div></div>\
		 </li>	\
	</ul>\
	<ul>\
	   <li class="res-title">Unclear</li>\
	   <li><div class="unclear"><span class="true" style="background:'+catcolor+';"></span></div></li>\</li>\
	</ul>\
	 <ul>\
				       <li class="res-title">Contract Extension Options</li>\
				       <li>'+value.extension+'</li>\
				   </ul>\
				   <ul>\
				       <li class="res-title">Notes</li>\
				       <li>'+value.notes+'</li>\
				   </ul>\
</div>'
	
	});
   $('#bind-table').append(html);
   
   $('#responv-design').append(mobileHtml);
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
        
		var hoverContent = $(this).find('.hover-content').height();
		
		var bottom = $(window).height() - hoverContent;
		bottom = $(this).offset.top - bottom;
		
	
});

/***************graph map*************/
	
