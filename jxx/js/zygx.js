$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    // $(".eone").click(function(){
    //     var height = $(".rone").height();
    //     if(height == 0 ){
    //         $(".rone").animate({
    //             height:'300px'
    //         })
    //     }else{
    //         $(".rone").animate({
    //             height:'0px'
    //         })
    //     }
    // });
    // $(".etwo").click(function(){
    //     var height = $(".rtwo").height();
    //     if(height == 0 ){
    //         $(".rtwo").animate({
    //             height:'300px'
    //         })
    //     }else{
    //         $(".rtwo").animate({
    //             height:'0px'
    //         })
    //     }
    // });
    $.ajax({
        url:config.ip + config.port + '/getUserInfo',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
            if(data.length > 0){call = true};
            if(data.length <= 0){call = false};
        },
        error:function(){
            call = false;
        }
    });
    });