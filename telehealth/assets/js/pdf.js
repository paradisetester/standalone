function pdf(){
  var doc = new jsPDF();
    var dochtm = jQuery('#state_data').html();
      $(".table-striped tbody tr:nth-of-type(2n+0)").css("background-color: #F5F5F5");
      $(".table-striped tbody tr:nth-of-type(2n+1)").css("background-color: #fff");
      
      $(".table-bordered th, .table-bordered td").css("border: 1px solid rgba(0, 0, 0, 0.10)");
      $(".table-bordered thead").css("color: #fff; font-size: 15px");
      $(".table-bordered .bg-default").css("background-color: #D0D0D0"); 
       $('.bg-warning').css('background-color: #f0ad4e');
       $("table td").css("font-size:14px");
       $("colgroup col").css("width:35%");
       $("th").css("font-size:12px");
        $("td").css("font-size:12px");
        $(".col-md-9").css("width:100%");

$('.bg-success').css ('background-color: #9BCA40;');
$('.bg-danger').css('background-color: #d9534f');  
    var doch = '';


   doch += dochtm;

    //console.log(doch);
    doc.fromHTML(doch);
    doc.save('a4.pdf');
}




