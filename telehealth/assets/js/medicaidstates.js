
/////states pagevar HTML = [],
var STATES = [];
var current, jsonData;


jQuery(function(){
    loadAjax('results.json');
});

function loadAjax(file){
    current = file;
    jQuery.ajax({
        dataType: "json",
		url: "assetes/json/"+file,
		data: [],
		success: showData
	});	
}


function showData(data, status, xhr) {
	if(data.length){
	    switch(current){
	        case 'results.json':
	            STATES.length = 0;
	            STATES.push('<option value="">Select State</option>');
        		for (var i = 0; i < data.length; i++) {
        			createStates(data[i]);		
        		}
        		jQuery('#states').html(STATES);
                 loadAjax('medicaiddata.json');
        	break;
            case 'medicaiddata.json':
             
                jsonData = data;
            break;
    	}
	}
}


function createStates(arr) {
    var html = '<option value="'+arr.name+'">'+arr.name+'</option>';
    STATES.push(html); 
}

jQuery(document).on('change', '#states', function(){
    var val = jQuery(this).val();
    checkJson(val);     
  // jQuery('.tooltip1').tooltip();  
});

function checkJson(abb){
    console.log(jsonData);
    var thisData='';
    jQuery.each( jsonData, function( key, value ) {
        if(value.state_name===abb){
            thisData = value;
        }   
    });
    console.log(thisData);
    jQuery('#state_data').html('');
    if(!thisData){
        return;
    }
    createData(thisData);
    $("#state_data").show();
    jQuery("#usaTerritories-map").hide();
    jQuery(".desprective-content").hide();
    jQuery(".table_hide").hide();
    jQuery(".chart_outrss").hide();
    jQuery(".content-section").show();
    
    jQuery("#states option").each(function( index ) {
        var chk = jQuery(this).val();
        if(chk==abb){
            jQuery(this).attr('selected', 'selected');
        }
    });
    
}


function createData(arr) {
    var m = 1;
    var html='';
    var thback='';
    var trback='';
    var stehead = "";
    var title = arr.title;
    if(title.match(/Waiver Request/g)){
    html += ' <style type="text/css" rel="stylesheet"> .table100.ver1 .table100-body tr:nth-child(even) { background-color: #e0516c2e; !important;  } .table100.ver1 th { background-color: #e0516c; !important; } .state-head h5 { color: #e0516c;} </style>';
         thback = 'background-color: #e0516c; !important;';
         stehead = "color: #e0516c; !important"; 
         trback = "background-color: #e0516c2e; !important;";
         //jQuery(".table100.ver1 .table100-body tr:nth-child(even)").css("");
    }
    
    if(title.match(/Approved Through/g)){
     thback = 'background-color: #1f6ccc; !important;';
         stehead = "color:#1f6ccc; !important"; 
         trback = "background-color: #1f6ccc26; !important;";
         //jQuery(".table100.ver1 .table100-body tr:nth-child(even)").css("");
    }           
               
    var ab = new Array();
    var abcolor = "";
    var source = new Array();
 
   
    var i=0;
    var source_arr = [];
    var source_link_arr = [];
    var $si = 1;
    html +='\
	<div class="limiter">\
	<div class="container-table100">\
	<div class="state-head">\
           <h5 style="'+stehead+'">'+arr.state_name+'</h3>\
                <h6>'+arr.title+'</h6>';
                
               
                if(arr.description && arr.description != 'test'){
                html +='<h6>'+arr.description+'</h6>';
                }
            html +='</div>\
     <div class="wrap-table100"> <div class="table100 ver1 m-b-110"> <div class="table100-head"><table><thead>';
             html += '<tr class="row100 head" ><th class="cell100 column" style="'+thback+'"></th><th class="cell100 column2" style="'+thback+'">'+ arr.first_heading+'</th>';
           if(arr.second_heading != '' && arr.second_heading != null){
                html += '<th class="cell100 column2" style="'+thback+'">'+ arr.second_heading+'</th>'
           }
            html+='</tr></thead></table></div><div class="table100-body js-pscroll"><table><tbody>';
                    jQuery.each( arr.medicad, function( key, value ) {
                       // var str = value.description;

                    var string = value.description;
                       var string = string.replace(/&#8226;/g,'<br/>&#8226;');
                        //string = string.replace(/•/g,'<br/>•');
                        string = abbrivationstring(string);
                        if(m % 2 == 0){
                    html +='<tr class="row100 body" style="'+trback+'">';
                    }else{
                         html +='<tr class="row100 body">';
                    }
                    html +='<td class="cell100 column1" >'+value.category_name+'</td>\
                        <td  class="cell100 column2">'+string;

                        if(value.source != 'No requirements located.' && value.source !='' && value.source != null ){
                if ($.inArray(value.source, source_arr) === -1){
                    source_arr.push(value.source);
                    source_link_arr.push(value.source_link);
                    html += ' <a  class="state_check" href="#source'+$si+'">['+$si+']</a>';
                    $si++;
                    //console.log(value1.source);
                }else{
                    var vi = 1;
                jQuery.each( source_arr, function( key1,value1){  
                    if(value1== value.source){
                        html += ' <a  class="state_check" href="#source'+vi+'">['+vi+']</a>';
                        }
                        vi++;
                    });                     
                } 
            }
            html +='</td>';
                i++;
                        if(arr.second_heading !=''){
                            if(value.description2 != '' && value.description2 != null){
                                var string2 =value.description2;
                                var new_string2 = string2.replace(/•/g,'<br/>•');
                                 new_string2 = abbrivationstring(new_string2);
                            html +='<td class="cell100 column2">'+new_string2+'</td>';

                        }else{
                            html +='<td></td>';
                        }
                        }
                    html +='</tr>';
                    m++;
                    });
                html +='</tbody></table></div>\
            </div>\
        </div>\
		</div>\
		</div>\
   ';
   html += '<section id="section" class="sources" data-anchor="section8">\
    <div class="section-title">\
    </div>\
    <ol>'; 
    var $s = 1;
    jQuery.each( source_arr, function( key,value){
					if(value != null){
                    html += '<li id="source'+$s+'" data-tab="source'+$s+'" class=""><a href="'+source_link_arr[key]+'" target="_blank">'+value+'</a></li>';
					}
                $s++;       
    });
    
    html +='</ol>\
    </section>\
    ';
    jQuery('#state_data').html(html);
   
}

function abbrivationstring(string){
    if(string.match(/SUD/g)){
        string = string.replace(/SUD/g,'<span class="tooltip1" title="Substance use disorder">SUD</span>');
        }
    if(string.match(/ABD/g)){
        string = string.replace(/ABD/g,'<span class="tooltip1" title="Aged, blind, and disabled">ABD</span>');
        }

    if(string.match(/MCO/g)){
        string = string.replace(/MCO/g,'<span class="tooltip1" title="Managed care organization">MCO</span>');
        }

    if(string.match(/ACA/g)){
        string = string.replace(/ACA/g,'<span class="tooltip1" title="Affordable Care Act">ACA</span>');
        }

    if(string.match(/MH/g)){
        string = string.replace(/MH/g,'<span class="tooltip1" title="Mental health">MH</span>');
        }
    
    if(string.match(/ACO/g)){
        string = string.replace(/ACO/g,'<span class="tooltip1" title="Accountable care organization">ACO</span>');
        }
    
    if(string.match(/MLTSS/g)){
        string = string.replace(/MLTSS/g,'<span class="tooltip1" title="Managed long-term services and supports">MLTSS</span>');
        }
    
    if(string.match(/ACT/g)){
        string = string.replace(/ACT/g,'<span class="tooltip1" title="Assertive community treatment">ACT</span>');
        }
    
    //if(string.match(/AI/AN/g)){
        //string = string.replace(/AI/AN/g,'<span class="tooltip1" title="American Indian/Alaska Native">MMC</span>');
       // }
     
    if(string.match(/NEMT/g)){
        string = string.replace(/NEMT/g,'<span class="tooltip1" title="Non-emergency medical transportation">NEMT</span>');
        }
   
    if(string.match(/ASAM/g)){
        string = string.replace(/ASAM/g,'<span class="tooltip1" title="American Society of Addiction Medicine">ASAM</span>');
        }
    if(string.match(/PACE/g)){
        string = string.replace(/PACE/g,'<span class="tooltip1" title="Programs of All-Inclusive Care for the Elderly">PACE</span>');
        }

    if(string.match(/ASO/g)){
        string = string.replace(/ASO/g,'<span class="tooltip1" title="Administrative services organization">ASO</span>');
        }  

     if(string.match(/PCCM/g)){
        string = string.replace(/PCCM/g,'<span class="tooltip1" title="Primary care case management">PCCM</span>');
        } 
 
    if(string.match(/BH/g)){
        string = string.replace(/BH/g,'<span class="tooltip1" title="Behavioral health">BH</span>');
        }

    if(string.match(/PIHP/g)){
        string = string.replace(/PIHP/g,'<span class="tooltip1" title="Prepaid inpatient health plan">PIHP</span>');
        }
 
    if(string.match(/CBO/g)){
        string = string.replace(/CBO/g,'<span class="tooltip1" title="Community-based organization">CBO</span>');
        }

    if(string.match(/PRTF/g)){
        string = string.replace(/PRTF/g,'<span class="tooltip1" title="Psychiatric residential treatment facility">PRTF</span>');
        }
 
    if(string.match(/CHIP/g)){
        string = string.replace(/CHIP/g,'<span class="tooltip1" title="Children’s Health Insurance Program">CHIP</span>');
        }

    if(string.match(/QHP/g)){
        string = string.replace(/QHP/g,'<span class="tooltip1" title="Qualified health plan">QHP</span>');
        }

      if(string.match(/CMS/g)){
        string = string.replace(/CMS/g,'<span class="tooltip1" title="Centers for Medicare & Medicaid Services">CMS</span>');
        }

    if(string.match(/RFP/g)){
        string = string.replace(/RFP/g,'<span class="tooltip1" title="Request for proposals">RFP</span>');
        }
 
    if(string.match(/DSHP/g)){
        string = string.replace(/DSHP/g,'<span class="tooltip1" title="Designated state health program">DSHP</span>');
        }
      
    if(string.match(/SBIRT/g)){
        string = string.replace(/SBIRT/g,'<span class="tooltip1" title="Screening, brief intervention, and referral to treatment">SBIRT</span>');
        }
     
    if(string.match(/DSRIP/g)){
        string = string.replace(/DSRIP/g,'<span class="tooltip1" title="Delivery System Reform and Incentive">DSRIP</span>');
        }
    if(string.match(/SED/g)){
        string = string.replace(/SED/g,'<span class="tooltip1" title="Serious emotional disturbance">SED</span>');
        }

    if(string.match(/SMD/g)){
        string = string.replace(/SED/g,'<span class="tooltip1" title="State Medicaid director">SMD</span>');
        }

    if(string.match(/ED/g)){
        string = string.replace(/ED/g,'<span class="tooltip1" title="Emergency department">ED</span>');
        }
 
   if(string.match(/FFS/g)){
        string = string.replace(/FFS/g,'<span class="tooltip1" title="Fee-for-service">FFS</span>');
        }
    
   if(string.match(/SMI/g)){
        string = string.replace(/SMI/g,'<span class="tooltip1" title="Serious mental illness">SMI</span>');
        }
  
    if(string.match(/FPL/g)){
        string = string.replace(/FPL/g,'<span class="tooltip1" title="Federal poverty level">FPL</span>');
        }
    if(string.match(/SPMI/g)){
        string = string.replace(/SPMI/g,'<span class="tooltip1" title="Severe and persistent mental illness">SPMI</span>');
        }

    if(string.match(/HCBS/g)){
        string = string.replace(/HCBS/g,'<span class="tooltip1" title="Home- and community-based services">HCBS</span>');
        }

    if(string.match(/SSI/g)){
        string = string.replace(/SSI/g,'<span class="tooltip1" title="Supplemental Security Income">SSI</span>');
        }
    if(string.match(/TBI/g)){
        string = string.replace(/TBI/g,'<span class="tooltip1" title="Traumatic brain injury">TBI</span>');
        }
    if(string.match(/TMA/g)){
        string = string.replace(/TMA/g,'<span class="tooltip1" title="Transitional Medical Assistance">TMA</span>');
        }

    if(string.match(/IMD/g)){
        string = string.replace(/IMD/g,'<span class="tooltip1" title="Institutions for mental disease">IMD</span>');
        }

    if(string.match(/MAT/g)){
        string = string.replace(/MAT/g,'<span class="tooltip1" title="Medication-assisted treatment">MAT</span>');
        }
 
    if(string.match(/WM/g)){
        string = string.replace(/WM/g,'<span class="tooltip1" title="Withdrawal management">WM</span>');
        }


    return string;

}

jQuery(document).ready(function($){
 $('body').tooltip({
    selector: '.tooltip1'
});
});