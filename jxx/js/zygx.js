$(document).ready(function(){
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    $(".eone").click(function(){
        var height = $(".rone").height();
        if(height == 0 ){
            $(".rone").animate({
                height:'300px'
            })
        }else{
            $(".rone").animate({
                height:'0px'
            })
        }
    });
    $(".etwo").click(function(){
        var height = $(".rtwo").height();
        if(height == 0 ){
            $(".rtwo").animate({
                height:'300px'
            })
        }else{
            $(".rtwo").animate({
                height:'0px'
            })
        }
    
    });
    });