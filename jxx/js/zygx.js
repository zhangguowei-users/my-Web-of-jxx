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
                           var Num = $(".sfqx").length;
                           gloArr.push(Num);
                           var vheight = $(".sfqx").height();
                           Divheight.push(vheight); 
                        };
                     };       
                    n++;
                };
                var MaxDivheight = Math.max.apply(null,Divheight);
                var MaxHeight = Math.max.apply(null,gloArr) * MaxDivheight;
                console.log(MaxHeight,MaxDivheight);
                //手风琴事件
                shoufengqin(".eone",MaxHeight);
                //滑块移动事件
                huakuaiMove(".eone");
                //点击变色事件
                caidanChangeColor(".sfqx");
        }
    });
    });