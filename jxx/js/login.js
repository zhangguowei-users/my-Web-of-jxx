$(function(){
$(".name").click(function(){
    $(".name").css("background","url(./img/login__05.png) no-repeat");
});
$(document).click(function(){
    $(".name").css("background","url(./img/login__03.png) no-repeat");
});
$(".name").click(function(event){
    event.stopPropagation();
});
});
$(function(){
    $(".value").click(function(){
        $(".value").css("background","url(./img/login__10.png) no-repeat")
    });
    $(document).click(function(){
        $(".value").css("background","url(./img/login__09.png) no-repeat");
    });
    $(".value").click(function(event){
        event.stopPropagation();
    });
});
