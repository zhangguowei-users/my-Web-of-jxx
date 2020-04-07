$(function name(){
$(document).click(function(){
        $(".name").css("background","url(./img/login__03.png) no-repeat");
});
$(".name").click(function(event){
        $(".name").css("background","url(./img/login__05.png) no-repeat");
        $(".value").css("background","url(./img/login__09.png) no-repeat");
        event.stopPropagation();
});
});
$(function value(){
    $(".value").click(function(event){
        event.stopPropagation();
        $(".value").css("background","url(./img/login__10.png) no-repeat");
        $(".name").css("background","url(./img/login__03.png) no-repeat");
    });
    $(document).click(function(){
        $(".value").css("background","url(./img/login__09.png) no-repeat");
    });
});
$("#input").mouseover(function () {
        $(this).css({"background":"url(./img/login__16.png) no-repeat","background-size":"350px 45px"});
});
$("#input").mouseout(function(){
        $(this).css({"background":"url(./img/login__14.png) no-repeat","background-size":"350px 45px"});
});
$("#input").click(function () {
       var name = $("#name").html();
       var value = $("#value").html();
   $.ajax({
       url:config.ip + "",
       type: "POST",
       data: {cmd:"login",name:name,value:value},
       success:function (data) {
           if(data.login ==success){
               window.location.href = "./go.html";
               setTimeout(function () {
                   window.location.href = "./welcome.html";
               },1000);
           }
           else{alert("用户名密码错误!!!")};
       }
   });
});
$("#zc").click(function () {

})


