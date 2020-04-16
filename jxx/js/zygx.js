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
                for(key in data){
                   $(".qone").append(`<div class="cds eone ${n}">${data[key].menuename}</div><div class="sfq rone"></div>`);
                     if(data[key].subMenue.length != 0){
                        for(k in data[key].subMenue){
                           $(`.${n}`).next().append("<div class='sfqx'>" + data[key].subMenue[k].menuename + "</div>");
                        };
                     };       
                    n++;
                };
                //手风琴事件
                shoufengqin(".eone");
                //滑块移动事件
                huakuaiMove(".eone");
                //点击变色事件
                caidanChangeColor(".sfqx");
        }
    });
    });