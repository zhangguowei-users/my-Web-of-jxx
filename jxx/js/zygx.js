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
                $(".eone").click(function(){
                    var height = $(this).next().height();
                    if(height == 0 ){
                        $(this).next().animate({
                            height:'300px'
                        })
                    }else{
                        $(this).next().animate({
                            height:'0px'
                        })
                    }
                });
                //滑块移动事件
                $(".eone").click(function(){
                    var height = $(this).position().top;
                    $(".wone").animate({
                        marginTop: height
                    })
                });
                //点击变色事件
                $(".sfqx").click(function(){
                    $(".sfqx").css("color","black");
                    $(this).css("color","white");
                });
        }
    });
    });