$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    
    $.ajax({
        url:config.ip + config.port + '/getMenue',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
                //形成树菜单
               function tree(data){
                for(key of data){
                   console.log(key.subMenue.length);
                  if(key.subMenue.length != 0){
                     $(".qone").append(`<ul><li class="closed"><span class="folder">${key.menuename}</span></li></ul>`);
                     for(k of key.subMenue){
                        if(k.subMenue.length !=0){
                          $(".closed").append(`<ul><li class="closed"><span class="folder">${k.menuename}</span></li></ul>`)
                        }else{
                          $(".closed").append(`<ul><li><span class="file">${k.menuename}</span></li></ul>`)
                        }
                        tree(k.subMenue);
                     };
                  }else{
                     $(".qone").append(`<ul><li><span class="file">${key.menuename}</span></li></ul>`);
                  }
                }
               };
               tree(data);
               $("#browser").treeview();
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