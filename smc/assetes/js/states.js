/////states pagevar HTML = [],
var STATES = [];
var current, jsonData;


jQuery(function(){
    loadAjax('newtablestates.json');
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
	        case 'newtablestates.json':
	            STATES.length = 0;
	            STATES.push('<option value="">Select State</option>');
        		for (var i = 0; i < data.length; i++) {
        			createStates(data[i]);		
        		}
        		jQuery('#states').html(STATES);
                 loadAjax('newtabledata.json');
        	break;
            case 'newtabledata.json':
             
                jsonData = data;
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

jQuery(document).on('change', '#states', function(){
    var val = jQuery(this).val();
    checkJson(val);     
   
});

function checkJson(abb){
    //console.log(jsonData);
    var thisData='';
    jQuery.each( jsonData, function( key, value ) {
        if(value.abbreviation===abb){
            thisData = value;
        }   
    });
    //console.log(thisData);
    jQuery('#state_data').html('');
    if(!thisData){
        return;
    }
    createData(thisData);
    $("#state_data").show();
    //$(".top-section").show();
    jQuery("#usaTerritories-map").hide();
    jQuery(".legend").hide();
    jQuery(".chart_outrss").hide();
     jQuery(".content-section").show();
        $("html, body").animate({ scrollTop: 0 }, "slow");
     //$(".state-content").hide();
     $(".table_hidee").hide();
    jQuery(this).prop('selected', false);
    jQuery("#states option").each(function( index ) {
        var chk = jQuery(this).val();
        if(chk==abb){
            jQuery(this).prop('selected', true);
        }
    });
    
}



function createData(arr) {
    var html='';
    var i=0;
    var source_arr = [];
    var source_link_arr = [];
    var $si = 1;
	var m = 1;
	var thback = '';
    var stehead = ""; 
    var trback = "";
	 var title = arr.wavier_status;
	 var cardCount ='';
    if(title.match(/SPA/g)){
    html += ' <style type="text/css" rel="stylesheet"> .table100.ver1 .table100-body tr:nth-child(even) { background-color: #e0516c2e; !important;  } .table100.ver1 th { background-color: #E4A11B !important; } .state-head h5 { color: #E4A11B;} </style>';
         thback = 'background-color: #E4A11B; !important;';
         stehead = "color: #E4A11B; !important"; 
         trback = "background-color: #e0516c2e; !important;";
         //jQuery(".table100.ver1 .table100-body tr:nth-child(even)").css("");
    }
    
    if(title.match(/SFO/g)){
     thback = 'background-color: #00A9E0; !important;';
         stehead = "color:#00A9E0; !important"; 
         trback = "background-color: #00A9E0; !important;";
         //jQuery(".table100.ver1 .table100-body tr:nth-child(even)").css("");
    }
 
if(title.match(/RFP/g)){
     thback = 'background-color: #004157; !important;';
         stehead = "color:#004157; !important"; 
         trback = "background-color: #004157; !important;";
         //jQuery(".table100.ver1 .table100-body tr:nth-child(even)").css("");
    }         
	
	console.log(' size : ');
	if(arr.faqs.length > 1){
		 cardCount ='more';		
	}else{
		cardCount ='one';
		}
		console.log(arr);
    html +='\
    <div class="chart_outr content_outr">\
	<div class="limiter '+arr.state_name+'">\
	<div class="container">\
	<div class="state-head">\
        <div class="state_headings" style="border-color: '+arr.color+';">\
           <h3 style="color:'+arr.color+'">'+arr.state_name+'</h3>\
                <h5>'+arr.status+'</h5>';
               
            html +='</div><div class="card_section">';
				jQuery.each( arr.faqs, function( key, value ) {
                        var str = value.description;
                         var string =value.description;
                     html +='<div class="card-outr '+cardCount+'"><div class="col s12 m6 l4 xl3"> <div class="demo-card  colour11 value-based" data-color="colour11" data-date="2015"><div class="panel" style="border-color:'+arr.color+'"><div class="pann"><div class="front card"><div class="card white front  box "><div class="card-content white-black center colour1 box_top gradient1">  <div class="card-content"><div class="des-back card"><h2 class="card-title"  style="color:'+arr.color+'">Manufacturer</h2> <p style="border-color:'+arr.color+'">'+value.manufacturer+'</p> <span class="card-title txt"  style="color:'+arr.color+'">Drug</span> <p style="border-color:'+arr.color+'" class="drug-text">'+value.drug+' </p></div><div class="back-card"><div class="demo-card__secondary" style="border-color:'+arr.color+'">  '+value.description+'<span class="source_cls">'+value.source+'</span></div></div><span class="card-title txt" style="color:'+arr.color+'">Waiver</span> <p style="border-color:'+arr.color+'">'+value.waiver_other+' </p> <span class="card-title txt"  style="color:'+arr.color+'">Status</span> <p style="border-color:'+arr.color+'">'+value.status+' </p> <span class="card-title txt"  style="color:'+arr.color+'">Duration of Contract </span> <p style="border-color:'+arr.color+'">'+value.duration_contact+' </p> <span class="card-title txt"  style="color:'+arr.color+'">Year of Implementation </span> <p style="border-color:'+arr.color+'">'+value.year_implementation+' </p><span class="card-title txt"  style="color:'+arr.color+'">Therapeutic Area</span>  <p class="therap" style="border-color:'+arr.color+'">'+value.therapeuticarea+'</p><span class="card-title txt"  style="color:'+arr.color+'">Type</span> <p class="typ"><span style="font-weight:600; font-size:17px;">'+value.new_type+'</span></p></div> </div> </div></div></div></div></div></div></div>';
					m++;
                    });
	
			html +='</div></div>\
		</div>\
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
    
    if(string.match(/MMC/g)){
        string = string.replace(/MMC/g,'<span class="tooltip1" title="Medicaid managed care">MMC</span>');
       }
     
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
