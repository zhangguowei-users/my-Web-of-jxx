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
$("#zc").click(function () {
    $("#dl1").css("display","none");
    $("#zc1").css("display","inline-block");
    $.ajax({
        url:config.ip + '/getDepartment',
        type: 'POST',
        success: function (data) {
            function bumen(data) {
                for(value of data){
                    console.log(value.departmentname,value.departmentid);
                    $("#bm1").append("<option value=" + value.departmentid + ">" + value.departmentname + "123</option>");
                    if(value.subDepartment.length != 0){
                     bumen(value.subDepartment);
                    }
                }
            }
            bumen(data);
        }
    })
});
$(".fhdl").click(function () {
    $("#zc1").css("display","none");
    $("#dl1").css("display","inline-block");
});
$("#input").click(function () {
       var name = $("#name").val();
       var value = $("#value").val();
   $.ajax({
       url: "http:127.0.0.1:8089/login",
       type: "POST",
       data: {uesrname:name,password:value},
       success:function (data) {
           console.log(data);
           if(data.result == success){
               window.location.href = "./go.html";
               setTimeout(function () {
                   window.location.href = "./welcome.html";
               },1000);
           }
           else{alert("用户名密码错误!!!")};
       },
       error:function () {
           console.log("error")
       }
   });
});




