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
                var n=0;
                var gloArr = [];
                var Divheight = [];
                for(key in data){
                   $(".qone").append(`<div class="cds eone ${n}">${data[key].menuename}</div><div class="sfq rone"></div>`);
                     if(data[key].subMenue.length != 0){
                        for(k in data[key].subMenue){
                           $(`.${n}`).next().append(`<div class='sfqx'>${data[key].subMenue[k].menuename}</div>`);
                           var vheight = $(".sfqx").height();
                           Divheight.push(vheight); 
                        };
                        var Num = $(".rone").eq(key).find(".sfqx").length;
                        gloArr.push(Num);
                     }else{
                        $(`.${n}`).next().append(`<div class='sfqx' style='display:none;'>${data[key].subMenue[k].menuename}</div>`);
                     };       
                    n++;
                };
                var MaxDivheight = Math.max.apply(null,Divheight);
                var MaxHeight = Math.max.apply(null,gloArr) * MaxDivheight;
                //手风琴事件
                shoufengqin(".eone",MaxHeight);
                //滑块移动事件
                huakuaiMove(".eone");
                //点击变色事件
                caidanChangeColor(".sfqx");
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