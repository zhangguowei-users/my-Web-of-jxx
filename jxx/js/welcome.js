function newTime(){
     var time = new Date();
     var year = time.getFullYear();
     var month = time.getMonth() + 1;
     var data = time.getDate();
     var new_time = year + "-" + month + "-" + data;
     return new_time;
};
$("#inf-namenow-time").html(newTime());
$(".one").click(function () {
    window.location.href = "./index.html";
});
$(".two").click(function () {
    $(".dh").css("background","transparent");
    $(".two").css("background","#01b6e2");
    $(".dh-bottom").css("display","none");
    $(".two2").css("display","inline-block");
});
$(".three").click(function () {
    $(".dh").css("background","transparent");
    $(".three").css("background","#01b6e2");
    $(".dh-bottom").css("display","none");
    $(".three3").css("display","inline-block");
});
$(".four").click(function () {
    $(".dh").css("background","transparent");
    $(".four").css("background","#01b6e2");
    $(".dh-bottom").css("display","none");
    $(".four4").css("display","inline-block");
});
$(".five").click(function () {
    $(".dh").css("background","transparent");
    $(".five").css("background","#01b6e2");
    $(".dh-bottom").css("display","none");
    $(".five5").css("display","inline-block");
});
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