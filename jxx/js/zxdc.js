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
    $("#login").click(function(){
        PDclick();
      });
      $("#time1").html(newTime());
      $("#quxiao").click(function(){
       $("#css").css("display","none");
      });
    $.ajax({
      url:config.ip + config.port + '/getAdministration',
      type: 'POST',
      async: false,
      xhrFields:{withCredentials:true},
      success:function(data){
        option(data,".xz1");
      }
    });
    });