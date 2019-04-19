/////states pagevar HTML = [],
var STATES = [];
var current, jsonData , categoryjson;
var CATEGORY = [];

jQuery(function(){
    loadAjax('telehealthstates.json');
    categoryloadAjax('category.json');
});

function loadAjax(file){
    current = file;
    jQuery.ajax({
        url: "assets/json/"+file,
        type: 'GET',
        dataType: "json",
        data: [],
        success: showData
    }); 
}

function categoryloadAjax(file){
    currentcategory = file;
    jQuery.ajax({
        url: "assets/json/"+file,
        type: 'GET',
        dataType: "json",
        data: [],
        success: showDatacategory
    }); 
}

function showData(data, status, xhr) {
    if(data.length){
        switch(current){
            case 'telehealthstates.json':
            STATES.length = 0;
            STATES.push('<option value="">Select State</option>');
            for (var i = 0; i < data.length; i++) {
                createStates(data[i]);      
            }
            jQuery('#states').html(STATES);
            loadAjax('telehealthdata.json');
            break;
            case 'telehealthdata.json':
            
            jsonData = data;
            break;
        }
    }
}

function showDatacategory(data1, status, xhr) {
  
  if(data1.length){
        switch(currentcategory){
            case 'category.json':
            CATEGORY.length = 0;
            CATEGORY.push('<option value="">Select Category</option>');
            for (var i = 0; i < data1.length; i++) {
                createcategory(data1[i]);      
            }
            jQuery('#category').html(CATEGORY);
            categoryloadAjax('category_color.json');
            break;
            case 'category_color.json':
            
            categoryjson = data1;
            break;
        }
    }
}

function createStates(arr) {
    var html = '<option value="'+arr.abbreviation+'">'+arr.name+'</option>';
    STATES.push(html); 
}

function createcategory(arr) {
    var html = '<option value="'+arr.title+'">'+arr.title+'</option>';
    CATEGORY.push(html); 
}


function checkJson(abb){
    var thisData='';
    jQuery.each( jsonData, function( key, value ) {
        if(value.abbreviation===abb){
            thisData = value;
        }   
    });
    
    jQuery('#state_data').html('');
    if(!thisData){
        return;
    }
    createData(thisData);
    $("#state_data").show();
    //$('.jsmaps-wrapper-box').hide();
    jQuery(".jsmaps-wrapper-box").hide();
    jQuery("span.my_toggle i").css("color","#868686");
    jQuery(".chart_outrss").hide();
    jQuery(".desprective-content").hide();
    jQuery(".sources").hide();
    jQuery("#category").hide();
    
    
    jQuery("#states option").each(function( index ) {
        var chk = jQuery(this).val();
        if(chk==abb){
            jQuery(this).attr('selected', 'selected');
        }
    });
    
}

function checkCategory(abb2){
    var thisData2 =[];
    jQuery.each( categoryjson, function( key, value){
        if(value.title=== abb2){
            thisData2.push(value);
        }
    });
    return thisData2;
}




function createData(arr) {
   //console.log(arr);
    var html='';
    
    var ab = new Array();
    var abcolor = "";
    var source = new Array();
    var source_arr = new Array();
    var source_link_arr = new Array();
    var source_link = new Array();
    var color = new Array();
    var $si = 1;
    var overall;
    var i=0;
    var todayDate = new Date().toISOString().slice(0,10);

    html +='\
     <main> <div class="section select_bottom_sec"><div class="container"><div class="section-title text-center">\
    <h1>'+arr.state+': '+arr.title+'</h3>\
    <span class="article-date">'+todayDate+'</span></div></div></div>\
    ';
    
 if(arr.source != '' && arr.source_link != '' && arr.source_link != null && arr.source != null){
    let string = arr.source;
    
   source_arr  = string.split('\n');
   let string_link = arr.source_link;
    string_link =string_link.replace(/[();'",<> |-]/gi,'');
    string_link = string_link.replace("|" ," ");
  // string_link =string_link.replace(string_link.match(/(\d+)/g)[0], '').trim(); 
   source_link_arr = string_link.split('\n');
}
  

     if(arr.grstatus == 'Moderately Expansive'){
                         overall = "Moderate";
                        
                     }
                      if(arr.grstatus == 'More Expansive'){
                        overall = "Progressive";
                       
                     }
                     if(arr.grstatus == 'Less Expansive'){
                        overall = "Restrictive";
                        
                     }
    html +='\
    <section class="section">\
            <div class="container">\
                <div class="section-title text-center ">\
                    <h3 class="style-title">State Grade Classifications</h3>\
                    <span class="single-line"></span>\
                </div>\
                <div class="row">\
                <div class="col-lg-6 col-md-6 col-6 grade-cols">\
                        <span>Overall Grade</span>\
                    </div>\
                    <div class="col-lg-6 col-md-6 col-6 ">\
                        <span class="brand-box '+arr.grcolor+'">'+overall+'</span>\
                    </div>\
                ';

              
                var addclass;
                var newstatus;
                jQuery.each( arr.categ, function( key, value ) {

                     if(value.status == 'Moderately Expansive'){
                         newstatus = "Moderate";
                        addclass = 'fillColorBrandGoldLighter';
                     }
                      if(value.status == 'More Expansive'){
                        newstatus = "Progressive";
                        addclass = 'fillColorBrandGreenLight';
                     }
                     if(value.status == 'Less Expansive'){
                        newstatus = "Restrictive";
                        addclass = 'fillColorBrandRedLight';
                     }
                     if(value.status == 'GRADE7'){
                        newstatus = "No Grade";
                        addclass = 'fillColorBrandGreyLight';
                     }                     
                    html += '<div class="col-lg-6 col-md-6 col-6 grade-cols">\
                        <span><a href="javascript:void(0)" data-tab="section'+key+'" class="state_check">'+value.title+'</a></span>\
                    </div>\
                    <div class="col-lg-6 col-md-6 col-6 ">\
                        <span class="brand-box '+addclass+'">'+newstatus+'</span>\
                    </div>';
                    });
                html += '</div>\
                <div class="clearfix">&nbsp;</div>\
                <div class="clearfix hr-line"></div>\
                <div>\
                    <p>\
                        <b>'+arr.question+'</b> &nbsp; &nbsp;<br>\
                            '+arr.answer;
                             if(arr.source != '' && arr.source != null && arr.source_link != ''){
                                
                                jQuery.each( source_arr, function( key,value1){
                                    if(value1 != '' && value1 != null){
                               html += ' <a style="color:'+arr.primarycolor+'" href="javascript:void(0)" class="state_check" data-tab="source'+$si+'">['+$si+']</a>';
                                $si++;
                                    }
                              
                                 });
                                
                            }


                        html +='<br><br>\
                    </p>';
                    if(arr.clarifying_detail != '' && arr.clarifying_detail != null ){
                        html += ' <p>\
                        <b>Clarifying detail </b> &nbsp; &nbsp;<br>\
                            '+arr.clarifying_detail+'<br><br>\
                    </p>';
                }
               html += ' </div>\
        </div>\
        </section>\
        <div class="clearfix">&nbsp;</div>\
        <div class="clearfix hr-line"></div>\
                ';
             html += '<div class="container">\
            <div class="row sm-gutters">\
                <div class="col-md-9">';
    jQuery.each( arr.sections, function( key, value ) {
      var addcolor;
        ab[key] = value.title;
        if(value.grade == 'Moderately Expansive'){
           addcolor = 'bg-warning';
           color[key] = "#f0ad4e !important";
           }
                      if(value.grade == 'More Expansive'){
                        addcolor = 'bg-success';
                        color[key] = "#9BCA40 !important";
                     }
                     if(value.grade == 'Less Expansive'){
                        addcolor = 'bg-danger';
                        color[key] = "#d9534f !important";
                     } 

                     if(value.grade == 'GRADE7'){
                        addcolor = 'bg-grey';
                        color[key] = "#eee !important";
                     } 


        html += '<section class="section" id="section'+key+'" data-anchor="section'+key+'">\
                        <div class="section-title">\
                            <h2>'+value.title+'</h2>\
                        </div>\
                        <div class="table-responsive">\
                            <table class="table table-striped table-bordered">\
                                <colgroup>\
                                    <col style="width:45%;">\
                                    <col style="width:10%;">\
                                    <col style="width:45%;">\
                                </colgroup>\
                                <thead>\
                                    <tr class="'+addcolor+'">\
                                        <th scope="col" style="text-align: left;">Question</th>\
                                        <th scope="col" style="text-align: left;">Answer</th>\
                                        <th scope="col" style="text-align: left;">Clarifying Information</th>\
                                    </tr>\
                                </thead>\
                                <tbody>';
        jQuery.each( value.table_one, function( key1,value1){
               if(value1.question_title != 'How does the state define telemedicine?'){
            
            //var string =value1.clarifying_detail;

            //var new_string = string.replace('&#8226;','<br/>&#8226;');
            
            
            html +='<tr>\
            <td>'+value1.question_title +'</td>';
            html += '<td>'+value1.answer;
            
            
            if(value1.source != 'No requirements located.' && value1.source !='' && value1.source_link != '' && value1.source_link != null){
                if ($.inArray(value1.source, source_arr) === -1){
                    source_arr.push(value1.source);
                    source_link_arr.push(value1.source_link);
                    html += ' <a style="color:'+arr.primarycolor+'" href="javascript:void(0)" class="state_check" data-tab="source'+$si+'">['+$si+']</a>';
                    $si++;
                }else{
                    var vi = 1;
                jQuery.each( source_arr, function( key,value){  
                    if(value==value1.source){
                        html += ' <a style="color:'+arr.primarycolor+'" href="javascript:void(0)" class="state_check" data-tab="source'+vi+'">['+vi+']</a>';
                        }
                        vi++;
                    });                     
                } 
            }
            var string = '';
            if(value1.clarifying_detail != null){
                var new_string = value1.clarifying_detail.replace(/•/g,'<br/>•');
                string = new_string;
            }
            html +='</td><td>'+ string +'</td></tr>';
            source[i]=value1.source;
            source_link[i]=value1.source_link;
            i++; 
        }
                     
        });
        html +=' </tbody>\
                                </table></div>\
                     </section>\
        ';
        
    });
    
   source_link_arr = $.grep(source_link_arr,function(n){
        return(n);
    });

    html += '<div class="container1">\
                        <section id="section8" class="section bg-inversess  sources-section" data-anchor="section8">\
                            <div class="section-title  title-white title-underline">\
                                <h3>Sources</h3>\
                            </div>\
                            <ol>';
                            var $s = 1;

                            jQuery.each( source_arr, function( key,value){
                                if(value != null && value != ''){
                                 var s_link = source_link_arr[key];
                                 if(s_link){
                                 if (s_link.search(/[0-9]./) > -1){
                                    s_link= s_link.replace(/[0-9]./,"");
                                  
                                 }
                             }
                                html += '<li class="rm-clss" id="source'+$s+'" data-tab="source'+$s+'"><a href="'+s_link+'" target="_blank">'+value+'</a></li>';
                                $s++;
                                }

                            });
                          html +=  '</ol>\
                        </section>\
                    </div>\
                </div>';


    html +='<div class="col-md-3 hidden-sm hidden-xs">';
    
    html += '<div class="sidenav-wrapper"><ul class="mainNav sidenav">';
    jQuery.each( ab, function( key,value){

        html += '<li class="nav-item" style="border-color:'+color[key]+'" >\
        <a class="mainNav-link current-tab state_check" href="javascript:void(0)" data-tab="section'+key+'" data-scroll="section'+key+'">'+value+'</a>\
        </li>';
            
    });
    html += '<li class="nav-item" >';
    html += '<a class="mainNav-link current-tab state_check" href="javascript:void(0)" data-tab="section8" data-scroll="section8">Source</a>';
    html += '</li>';
    html +='</ul></div>\
                </div>\
            </div>\
        </div>\
    </main>\
    ' ;

    
    jQuery('#state_data').html(html);
}

$(document).scroll(function() {
    var y = $(document).scrollTop(), //get page y value 
    header = $(".sidenav-wrapper"); // your div id
    if(y >= 950)  {
        header.css({position: "fixed", "top" : "0", "width": "286px"});
        } else {
        header.css("position", "static");
    }
});

jQuery(document).on('click', 'a.state_check', function (event) {
    event.preventDefault();
    var tab_id = jQuery(this).attr('data-tab');
    jQuery("section.section").removeClass('selected');
    jQuery("li.rm-clss").removeClass('selected');
    jQuery("#" + tab_id).addClass('selected ');
    
    goTo(tab_id);
});

function cleanArray(actual)
{
    var newArray = new Array();
    for(var i = 0; i<actual.length; i++)
    {
        if (actual[i])
        {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

function goTo(id){
    jQuery('html, body').animate({
        scrollTop: jQuery("#" + id).offset().top
    }, 1500);
}


