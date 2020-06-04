var zhanghu1;
var user;
var dep;
var depid;
var resourceid;
$(document).ready(function(){
    dengluLocation();
    huoquName();
    $("#inf-namenow-time").html(newTime());
    $("#time1").html(newTime());
    tiaozhuan();
    tuichudenglu();
    $("#login").click(function(){
        PDclick();
      });
      $("#time1").html(newTime());
    
    
});