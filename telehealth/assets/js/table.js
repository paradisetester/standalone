var table = new Tabulator("#example-table-theme-semantic-ui", {
        columnVertAlign:"bottom", //align header contents to bottom of cel
         tooltips:true,
         tooltipsHeader:true,
         //pagination:"local",
       //  paginationSize:5,
         //groupBy:"WaiverStatus",
         columns:[
        {title:"", field:"cname", width:100, headerSort:false, frozen:'true'},
        {title:"Waiver Status", field:"WaiverStatus", width:380, headerSort:false},
        {//create column group
            title:"Expenditure Authority for Enhanced Benefits for Individual swith SUD",
            columns:[
            {title:"HCBS", field:"HCBS", align:"right", sorter:"number", width:100, headerSort:false, formatter:"image"},
            {title:"Case Management/ Care Coordination", field:"CaseManagement", align:"center", width:400, headerSort:false, formatter:"image"},
            {title:"Peer Supports", field:"PeerSupports", align:"center", width:300, headerSort:false, formatter:"image"},
            ],
        },
        {//create column group
            title:"Waiver of IMD Exclusion ",
            columns:[
            {title:"SUD", field:"sud", width:100, headerSort:false, formatter:"image"},
            {title:"MH", field:"mh", width:100, headerSort:false, formatter:"image"},
            ],
        },
        {title:"Delivery System Reform w/ SUD Component", field:"DeliverySystem", width:450, headerSort:false, formatter:"image"},
        {title:"Coverage Expansion for Individuals with SUD", field:"Coverage", width:450, headerSort:false, formatter:"image"},
        {title:"Specialized Integrated Managed Care Plan Targeted to Population with SUD", field:"Specialized", width:700, headerSort:false, formatter:"image"},
        {title:"Alternative Payment HCBS Methodology", field:"Alternative", width:500, headerSort:false, formatter:"image"}
        ],
    });
    
    //define some sample data
    var tabledata = [
        {id:1, cname:"AK", WaiverStatus:"Pending", HCBS:"green.png", CaseManagement:"green.png", PeerSupports:"green.png", sud:"green.png", mh:"green.png", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
        {id:2, cname:"AZ", WaiverStatus:"Approved with no SUD features; SUD features pending", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"green.png", mh:"green.png", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:3, cname:"CA", WaiverStatus:"Approved", HCBS:"", CaseManagement:"blue.png", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"blue.png", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:4, cname:"DE", WaiverStatus:"Approved with SUD features; additional SUD features pending", HCBS:"blue.png", CaseManagement:"blue.png", PeerSupports:"blue.png", sud:"green.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:5, cname:"FL", WaiverStatus:"Approved with no SUD features; SUD features pending", HCBS:"green.png", CaseManagement:"", PeerSupports:"green.png", sud:"", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:6, cname:"HI", WaiverStatus:"Approved with no SUD features; SUD features pending", HCBS:"green.png", CaseManagement:"", PeerSupports:"", sud:"", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:7, cname:"IL", WaiverStatus:"Approved", HCBS:"blue.png", CaseManagement:"blue.png", PeerSupports:"blue.png", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:8, cname:"IN", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:9, cname:"KS", WaiverStatus:"Approved with SUD features; additional SUD features pending", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"green.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:10, cname:"KY", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"red.png", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:11, cname:"LA", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:12, cname:"MA", WaiverStatus:"Approved", HCBS:"blue.png", CaseManagement:"blue.png", PeerSupports:"blue.png", sud:"blue.png", mh:"blue.png", DeliverySystem:"blue.png", Coverage:"", Specialized:"", Alternative:"", color:"yellow"},
        {id:13, cname:"MD", WaiverStatus:"Approved with SUD features; additional SUD features pending", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
        {id:14, cname:"MI", WaiverStatus:"Pending", HCBS:"", CaseManagement:"green.png", PeerSupports:"", sud:"green.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"green.png"},
        {id:15, cname:"MN", WaiverStatus:"Pending", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"green.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:"green.png"},
        {id:16, cname:"NC", WaiverStatus:"Pending", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"green.png", mh:"green.png", DeliverySystem:"green.png", Coverage:"", Specialized:"green.png", Alternative:""},
        {id:17, cname:"NH", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"blue.png", Coverage:"", Specialized:"", Alternative:"blue.png"},
        {id:18, cname:"NJ", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"blue.png", Coverage:"", Specialized:"", Alternative:""},
        {id:19, cname:"NM", WaiverStatus:"Approved with no SUD features; SUD features pending", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"green.png", mh:"green.png", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
        {id:20, cname:"NY", WaiverStatus:"Approved with SUD features; additional SUD features pending", HCBS:"blue.png", CaseManagement:"", PeerSupports:"blue.png", sud:"green.png", mh:"green.png", DeliverySystem:"blue.png", Coverage:"", Specialized:"blue.png", Alternative:""},
        {id:21, cname:"PA", WaiverStatus:"Approved", HCBS:"blue.png", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
        {id:22, cname:"RI", WaiverStatus:"Approved with SUD features; additional SUD features pending", HCBS:"", CaseManagement:"red.png", PeerSupports:"red.png", sud:"green.png", mh:"green.png", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
        {id:23, cname:"TN", WaiverStatus:"Pending", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"green.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
        {id:24, cname:"UT", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"blue.png", Specialized:"", Alternative:""},
        {id:25, cname:"VA", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
        {id:26, cname:"VT", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"blue.png", DeliverySystem:"blue.png", Coverage:"", Specialized:"", Alternative:""},
        {id:27, cname:"WA", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"", sud:"blue.png", mh:"", DeliverySystem:"blue.png", Coverage:"", Specialized:"", Alternative:""},
        {id:28, cname:"WV", WaiverStatus:"Approved", HCBS:"", CaseManagement:"", PeerSupports:"blue.png", sud:"blue.png", mh:"", DeliverySystem:"", Coverage:"", Specialized:"", Alternative:""},
    ];
    
    //load sample data into the table
    
     $(document).on("click",".charttt",function() {
        
                 $(".table_hidee").toggleClass("chart-tog");                 
                 $(".table_hidee").show();
                 $(".table_hide").show();
                   $("#state_data").hide();
                 $("#usaTerritories-map").hide();
                 $(".content-section").hide();
                 table.setData(tabledata);

          });

    //trigger download of data.xlsx file
    $("#download-xlsx").click(function(){
        table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
    });
    
    //trigger download of data.pdf file
    $("#download-pdf").click(function(){
       
        table.download("pdf", "data.pdf", {
            orientation:"portrait", //set page orientation to portrait
            title:"Example Report", //add title to report
        });
    });
    //trigger download of data.csv file
    $("#download-csv").click(function(){
        table.download("csv", "data.csv");
    });
 jQuery(document).ready(function(){ 
        table.setData(tabledata);
        $(".table_hidee").addClass("chart-tog");   
        $(".table_hidee").hide();
    });
  jQuery(document).ready(function(){ 

        jQuery('#usaTerritories-map').JSMaps({
              map: 'usaTerritories',
              mapWidth: 800, 
              mapHeight: 600,
              stateClickAction : "none",
              onStateClick : function(res) {
                checkJson(res.name);
           // dataLayer.push({'event': 'Click Map Event'});
               // dataLayer.push({'event': 'Timer Event'});
               var dataLayer = window.dataLayer = window.dataLayer || [];
               dataLayer.push({'event': 'ClickonMap'});
                     ({'event': '5Sec Event'}); 
                     ({'event':'Track UserID','userID': ''});
        
          }
         });
      });
       jQuery(document).ready(function(){
           
      jQuery(".my_toggle").click(function(){        
             $('#usaTerritories-map').show();
             $(".desprective-content").show();
             $('#usaTerritories-map').addClass('animated zoomin');
             $(".table_hide").show();
             $("#state_data").hide();
             $(".table_hidee").hide();
             $(".content-section").hide();
            ;
     
      });
       });
       
       jQuery(document).ready(function(){
         $(".my_togglee").click(function(){
                 $('#usaTerritories-map').hide();
                 $(".table_hide").hide();
                 $(".chart_outr").show("main");
                 $("#state_data").hide();
                 $(".content-section").hide();    
            });
        });
    