$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    $("#login").click(function(){
      PDclick();
    });
    $.ajax({
        url:config.ip + config.port + '/getMenue',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
               //形成树菜单
               tree(data,".qone");
               $("#browser").treeview();
                //滑块移动事件
                huakuaiMove(".folder");
                //点击变色事件
                caidanChangeColor(".file");
                //点击查询
                $(".sone").click(function(){
                   var fone = $(".fone").val();
                   var sfqx = $(".file");
                   sfqx.css("color","black");
                   for(var i=0;i<sfqx.length;i++){
                      var Sumsfqx = sfqx.eq(i).html();
                      if(Sumsfqx.indexOf(fone) >= 0){
                         sfqx.eq(i).css("color","red");
                         //展开树型菜单方法
                        //  sfqx.eq(i).parents().(".hitarea").click()
                      };
                     }
                });
                //点击tree 获取id
                $(".folder,.file").click(function(){
                     var menueid = $(this).attr("menueid");
                     if(menueid == 1){
                        return;
                     }else{
                        $.ajax({
                           url:config.ip + config.port + '/getSecondCategory',
                           type: 'POST',
                           data:{menueid:menueid},
                           xhrFields:{withCredentials:true},
                           success:function(data){
                              console.log(pushArry(data));
                           }
                        });
                     };
                  });
                  //
        }
    });
   //   $(".hitarea").click();
    });