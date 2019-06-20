var current, catval, colour, grid, jsData;

var data_skip = 1;
var data_var = 1;

var HTML = [],
    HTML1 = [],
    HTML2 = [],
    HTML3 = [],
    categorydata =[];
    var col = 4;
    
    if (jQuery(window).width() >= 1200) col = 4;
    if (jQuery(window).width() <= 1200) col = 3;  
    if (jQuery(window).width() <= 992) col = 2;  
    if (jQuery(window).width() <= 600) col = 1;  
      
        
   
    
jQuery(function() {
    loadAjax('categories.json');
    jQuery('.fixed-action-btn').floatingActionButton();
});
function dataTable(dataSet) {
    jQuery('#dataSet').DataTable({
        data: dataSet,
        "responsive": true,
        "pageLength": 25,
        "lengthChange": false,
        "columns": [{
                "data": "company_name"
            },
            {
                "data": "drug_name"
            },
            {
                "data": "health_plan_name"
            },
            {
                "data": "therapeutic_area"
            },
            {
                "data": "year"
            },
            {
                "data": "type"
            }
        ],
        createdRow: function(row, data, index) {
            jQuery(row).addClass(data.colour);
        },
        columnDefs: [{
            targets: [0, 1, 2],
            className: 'mdl-data-table__cell--non-numeric'
        }]
    });
}
function loadAjax(file) {
    current = file;
		
    jQuery.ajax({
        dataType: "json",
        url: "json/" + file,
        data: [],
        success: showData
    });
}
function showData(data, status, xhr) {

    if (data.length) {
        
        switch (current) {

            case 'categories.json':
                HTML.length = 0;
                for (var i = 0; i < data.length; i++) {
                    createCategories(data[i]);
                }
                jQuery('#categories ul').html(HTML);
                
                loadAjax('sub-categories.json');
                break;
            case 'sub-categories.json':
                 
                HTML1.length = 0;
                for (var i = 0; i < data.length; i++) {
                    createsubCategories(data[i]);
                    categorydata[data[i]['id']] = data[i]['colour'];
                }
                jQuery('#subcategories').html(HTML1);
                 var subcategories = $('#subcategories a').sort(function(a, b) {
			return String.prototype.localeCompare.call($(a).data('slug').toLowerCase(), $(b).data('slug').toLowerCase());
	         	});
	         	  jQuery('#subcategories').html(subcategories);
                loadAjax('data.json');
                break;
            case 'data.json':
                jsData = data;
               
                dataTable(data);
                dataCall(data);
                loadAjax('source.json');
                break;
            case 'source.json':
                HTML3.length = 0;
                
                for (var i = 0; i < data.length; i++) {
                    createSource(data[i], i);
                }
                jQuery('#source').html(HTML3);
                break;
        }
    }
}
function createCategories(arr) {
    /*var html = '<button data-id="'+arr.id+'" data-slug="'+arr.slug+'" class="mdc-button mdc-button--raised '+arr.colour+'">'+arr.name+'</button>';
    HTML.push(html); */

    var html = '<li class="tab col"><a  data-id="' + arr.id + '"  data-slug="' + arr.slug + '" class="hexa colorbox2 blue1 com-pad ' + arr.colour + '"><div class="round-txt">\
        <span class="tab-img all-img "></span><small>' + arr.name + '</small></div></a></li>';
    HTML.push(html);
}

function createsubCategories(arr) {
    /*var html = '<button data-id="'+arr.id+'" class="mdc-button mdc-button--raised cat_'+arr.cat_id+' '+arr.colour+'" style="display:none">'+arr.name+'</button>';
    HTML1.push(html); */

    var html = '<a data-id="' + arr.id + '" data-slug="'+arr.name + '" class="waves-effect  btn-small waves-light btn all-btn all-btn-clr1  cat_' + arr.cat_id + ' ' + arr.colour + '"> '+arr.name + '</a>';
    HTML1.push(html);
}
function createData(arr,i,datalength) {
	
    var newDate = new Date(arr.year_fil).getTime();
    newDate = newDate + arr.id;
    var typeClass = '';
    if (arr.type === 'Value-Based Contracting') {
        typeClass = 'value';
    } else {
        typeClass = 'outcomes';
    }
    
    
       
             if(i % col===0 && i!=0)
			   {
				 HTML2.push('<div class="card-outr-row data_skip'+data_skip+'"></div>');
				  data_skip = data_skip + 1;
				  data_var = 1;
		   	   }
var html = '\
         <div class="card-outr" data-tipclass ="'+data_var+'" data-section="'+data_skip+'" data-date="' + arr.year_fil + '"><div class="col s12 m6 l4 xl3">\
         <div class="demo-card  ' + categorydata[arr.company] + ' ' + typeClass + '-based" data-color="' + categorydata[arr.company] + '" data-date="' + arr.year_fil + '">\
            <div class="panel">\
               <div class="card white front  box "><span class="tri-div">' + arr.company_name.charAt(0) + '</span>\
                  <div class="card-content white-black center colour1 box_top">\
                    <h2 class="card-title">' + arr.company_name + '</h2>\
                      <p>' + arr.drug_name + '</p>\
                      <p>' + arr.type + '</p>\
                      <p>' + arr.year + '</p>\
                  </div>\
                    <div class="card-content">\
                      <span class="card-title txt">Health Plan/PBM</span>\
                      <p>' + arr.health_plan_name + ' </p>\
                      <span class="card-title txt">Therapeutic Area</span>\
                      <p >' + arr.therapeutic_area + '</p>\
                    </div>\
                  </div>\
        <div class="back card"><div class="demo-card__secondary">\
        ' + arr.description + ' <a class="source_cls" data-tab="source' + arr.source + '">[' + arr.source + ']</a>\
         <a class="show-desc" href="#more_Data_' + arr.id + '" ></a>\
                      </div>\
                  </div>\
                </div>\
             </div></div></div>';
			 
			 data_var = data_var+1;
    HTML2.push(html);
	  i = i+1;
	 if(datalength==i)
					 {
						HTML2.push('<div class="card-outr-row data_skip'+data_skip+'"></div>'); 
					 }
}
function createSource(arr, i) {
    /*var html = '\
    <li id="source'+arr.id+'" data-tab="source'+arr.id+'"><a href="'+arr.link+'" target="_blank">'+arr.description+'</a></li>';
    HTML3.push(html);*/

    i = i + 1;
    var html = '\
 <li id="source' + arr.id + '" data-tab="source' + arr.id + '"><span class="sr-cr">' + i + '</span><a href="' + arr.link + '" target="_blank">' + arr.description + '</a></li>';
    HTML3.push(html);
}
jQuery(document).on('click', '#categories ul li a', function() {
    jQuery('#categories .date-div a').removeClass('filter');
    jQuery('#subcategories a').removeClass('active');
    if (catval) {
        jQuery('#subcategories .cat_' + catval).removeClass('active_list');
        jQuery('#data').removeClass(colour);
        jQuery('#dataSet thead').removeClass(colour);
    }
    catval = jQuery(this).attr('data-id');
    var data_slug = jQuery(this).attr('data-slug');
     $('#categories_list').attr('class',data_slug+'_slug');
    colour = jQuery(this).attr('data-colour');
    jQuery('#subcategories .cat_' + catval).addClass('active_list');
    jQuery('#data').addClass(colour);
    jQuery('#dataSet thead').addClass(colour);

    jQuery('#categories ul a').removeClass('clicked');
    jQuery(this).addClass('clicked');

    jQuery('#dataSet').DataTable().clear().destroy();
    dataTable(jsData);
    dataCall(jsData);
    /*jQuery('#data').isotope({
        filter: '*'
    });*/
    jQuery('#data').addClass("animate-outer");
});
jQuery(document).on('click', '#subcategories a', function() {
    jQuery('#categories ul a').removeClass('filter');
    jQuery(this).toggleClass('active');
    var catid = jQuery('#categories ul a.clicked').attr('data-slug');
    filterDt(catid);
    /*jQuery('#data').isotope({
        filter: '*'
    });*/
});
function filterDt(catid) {
    var catid = catid.replace(/-/g, "_");
    var catname;
    var arr1 = new Array();
    var arr2 = new Array();
    var arr3 = new Array();
    var i = 0,
        j = 0;

    var act = jQuery("#subcategories a.active").length;
   
    if (act > 0) {
        jQuery("#subcategories a.active").each(function(index) {
            arr3[index] = jQuery(this).attr('data-id');
        });
    } else {
        jQuery('#dataSet').DataTable().clear().destroy();
        dataTable(jsData);
        dataCall(jsData);
    }
    if (arr3.length > 0) {
        jQuery.each(jsData, function(key, value) {
            switch (catid) {
                case 'company':
                    if (jQuery.inArray(value.company, arr3) !== -1) {
                        arr1[i] = value;
                        i++;
                    } else {
                        arr2[j] = value;
                        j++;
                    }
                    break;
                case 'drug':
                    if (jQuery.inArray(value.drug, arr3) !== -1) {
                        arr1[i] = value;
                        i++;
                    } else {
                        arr2[j] = value;
                        j++;
                    }
                    break;
                case 'health_plan':
                    if (jQuery.inArray(value.health_plan, arr3) !== -1) {
                        arr1[i] = value;
                        i++;
                    } else {
                        arr2[j] = value;
                        j++;
                    }
                    break;
            }
        });
        jQuery('#dataSet').DataTable().clear().destroy();
        dataTable(arr1);

        dataCall(arr1);
    }

}
function dataCall(data) {
    HTML2.length = 0;
    for (var i = 0; i < data.length; i++) {
        createData(data[i],i,data.length);
    }
    jQuery('#data').html("");

    jQuery('#data').append(HTML2);
    setTimeout(function() {
        /*jQuery('#data').isotope({
            filter: '*'
        });*/
        jQuery('#data').addClass("animate-outer");
    }, 100);
}
function getSorted(selector, attrName, dir) {
    return $($(selector).toArray().sort(function(a, b) {
        var aVal = parseInt(a.getAttribute(attrName)),
            bVal = parseInt(b.getAttribute(attrName));
        if (dir == 'asc') {
            return aVal - bVal;
        } else {
            return bVal - aVal;
        }
    }));
}
jQuery(document).on('click', '.date_type_filter .date-div a', function() {
    
    
    jQuery('.date_type_filter .date-div a').removeClass('filter');
  
    jQuery(this).addClass('filter');
     
    var sortValue = $(this).attr('data-sort-value');
     
    /* Get the sorting direction: asc||desc */
    var direction = $(this).attr('data-sort-direction');
    /* convert it to a boolean */
    var isAscending = (direction == 'asc');
    var newDirection = (isAscending) ? 'desc' : 'asc';

    if (sortValue == 'filedate') {
        var sorted_items = getSorted('#data .card-outr', 'data-date', newDirection);
        var html_date = '';
         data_var = 1;
     data_skip = 1;
     var datafill ='';
         sorted_items.each(function(index)
         {
             var date = $(this).attr('data-date');
         var data_color = $(this).attr('data-color');
           datafill = '';
          
            var date = $(this).attr('data-date');
            html_date +='<div class="card-outr"  data-date="' + date + '" data-tipclass ="'+data_var+'" data-section="'+data_skip+'">'+$(this).html()+'</div>';
            index = index+1;
         data_var = data_var+1;
          if(index % col===0 && index!=0)
			   {
			      
			datafill =	'<div class="card-outr-row data_skip'+data_skip+'"></div>';
				   data_skip = data_skip + 1;
				 data_var = 1;
		   	   }
  
        html_date += datafill;    
         })
        jQuery('#data').html("");
        jQuery('#data').html(html_date+'<div class="card-outr-row data_skip'+data_skip+'"></div>');
        jQuery(this).attr('data-sort-direction', newDirection);
        jQuery(this).find('.fa').toggleClass('fa-chevron-up fa-chevron-down');
    } else if (sortValue == 'filetype') {
        typeFilter();
    }
    jQuery('#data').addClass("animate-outer");
    
   
    

});
function typeFilter() {
    data_var = 1;
    data_skip = 1;
    var datafill ='';
    var arr1 = '',
        arr2 = '';
    jQuery("#data .demo-card.outcomes-based").each(function(index) {
        
        var date = $(this).attr('data-date');
         var data_color = $(this).attr('data-color');
           datafill = '';
          
          var div = jQuery(this).html();
        // arr1 += '<div class="mdc-card demo-card '+data_color+' outcomes-based" data-date="'+date+'">'+div+'</div>';

        arr1 += '<div class="card-outr"  data-date="' + date + '" data-tipclass ="'+data_var+'" data-section="'+data_skip+'"><div class="col s12 m6 l4 xl3"> <div class="demo-card pink-bx '+data_color+' outcomes-based" data-color="'+data_color+'" data-date="' + date + '">' + div + '</div></div></div>'
        index = index+1;
         data_var = data_var+1;
          if(index % col===0 && index!=0)
			   {
			      
			datafill =	'<div class="card-outr-row data_skip'+data_skip+'"></div>';
				   data_skip = data_skip + 1;
				 data_var = 1;
		   	   }
  
        arr1 += datafill;    
   
  
    });
 arr1 += '<div class="card-outr-row data_skip'+data_skip+'"></div>';
    jQuery("#data .demo-card.value-based").each(function(index) {
        var date = $(this).attr('data-date');
          var data_color = $(this).attr('data-color');
        var div = jQuery(this).html();
        datafill = '';
     
        arr2 += '<div class="card-outr" data-date="' + date + '" data-tipclass ="'+data_var+'" data-section="'+data_skip+'"><div class="col s12 m6 l4 xl3"> <div class="demo-card pink-bx '+data_color+' value-based" data-color="'+data_color+'" data-date="' + date + '">' + div + '</div></div></div>'
   data_var = data_var+1;
      index = index+1;
 if(index % col===0)
			   {
		datafill =	'<div class="card-outr-row data_skip'+data_skip+'"></div>';
				 data_skip = data_skip + 1;
				  data_var = 1;
		   	   }
		   	   
		   	   arr2 += datafill;   
   
    });
     arr2 += '<div class="card-outr-row data_skip'+data_skip+'"></div>';
    jQuery('#data').html("");
    jQuery('#data').html('<div class="outcomes">\
                        <h3>Outcomes-Based Contracting</h3>\
                        ' + arr1 + '\
                        </div>\
                        <div class="free"></div>\
                        <div class="value">\
                        <h3>Value-Based Contracting</h3>\
                        ' + arr2 + '\
                        </div>\
                    ');
    /*jQuery('#data').isotope({
        filter: '*'
    });*/

}
jQuery(document).on('click', 'a.source_cls', function(event) {
    event.preventDefault();
    jQuery('#myData').hide();
    jQuery(jQuery(this).attr('href')).hide();
    var tab_id = jQuery(this).attr('data-tab');
    jQuery("#source li").removeClass('selected');
    jQuery("#" + tab_id).addClass('selected ');
    goTo(tab_id);
});

function goTo(id) {
    jQuery('html, body').animate({
        scrollTop: jQuery("#" + id).offset().top
    }, 1500);
}
function showAll(id) {
    var dat;
    jQuery.each(jsData, function(key, value) {
        if (value.id == id) {
            dat = value;
        }
    });
    var htmls = '\
    <div class="heading">\
        <h2>' + dat.company_name + '</h2>\
        <p class="subtitle">' + dat.drug_name + '</p>\
        <p class="subtitle">' + dat.type + '</p>\
        <p class="subtitle">' + dat.year + '</p>\
    </div>\
    <div class="health-plan">\
        <span>Health Plan/PBM </span>\
        <p>' + dat.health_plan_name + '</p>\
        <span>Therapeutic Area </span>\
        <p>' + dat.therapeutic_area + '</p>\
    </div>\
    <div class="discription">\
       <h3>Description</h3>\
       <p>' + dat.description + ' <a class="source_cls" data-tab="source' + dat.source + '">[' + dat.source + ']</a></p>\
    </div>\
    ';

    jQuery('.inner').html(htmls);
    jQuery('#myData').show();
}
//----- CLOSE
jQuery(document).on('click', '.popup-close', function() {
    jQuery('#myData').hide();
});
jQuery(document).on('click', '#data .panel', function() {
    jQuery(this).addClass('active');
});
jQuery(document).on('click', '#data .panel.active', function() {
    jQuery(this).removeClass('active');
});
//download csv files
function downloadCSV() {
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = 'json/data.csv';
    link.download = '';
    link.click();
}
jQuery(document).on('click', '.show-desc', function(event) {
    event.preventDefault();
    jQuery('.tool-desc').hide();
    jQuery(jQuery(this).attr('href')).show();
});
jQuery(document).on('click', '.close_tool_tip', function(event) {
    event.preventDefault();
    jQuery(jQuery(this).attr('href')).hide();
});