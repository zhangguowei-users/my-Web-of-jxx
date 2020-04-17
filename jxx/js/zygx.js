$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    $("#browser").treeview();
    $.ajax({
        url:config.ip + config.port + '/getMenue',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
                //滑块移动事件
                huakuaiMove(".folder");
                //点击变色事件
                caidanChangeColor(".file");
                //点击查询
                $(".sone").click(function(){
                   var fone = $(".fone").val();
                   var sfqx = $(".sfqx");
                   for(var i=0;i<sfqx.length;i++){
                      var Sumsfqx = sfqx.eq(i).html();
                      if(Sumsfqx.indexOf(fone) >= 0){
                         sfqx.eq(i).parent().animate({
                            height:MaxHeight
                         });
                         sfqx.eq(i).css("color","white");
                      }
                   }
                })
                //
        }
    });
    });