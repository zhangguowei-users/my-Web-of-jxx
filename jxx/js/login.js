$(document).ready(function(){
//登陆页面样式变化
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
//注册
$("#zc").click(function () {
    $("#dl1").css("display","none");
    $("#zc1").css("display","inline-block");
    console.log(config.ip + config.port + '/getDepartment');
    $.ajax({
        url:config.ip + config.port + '/getDepartment',
        type: 'POST',
        xhrFields:{withCredentials:true},
        success: function (data) {
            console.log(data);
            function bumen(arr) {
                for(value of arr){
                    console.log(value.departmentname,value.departmentid);
                    $("#bm1").append("<option value=" + value.departmentid + ">" + value.departmentname + "</option>");
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
//登录
$("#input").click(function () {
       var name = $("#name").val();
       var value = $("#value").val();
   $.ajax({
       url: config.ip + config.port + "/login",
       type: "POST",
       data: {username:name,password:value},
       xhrFields:{withCredentials:true},
       success:function (data) {
           console.log(data);
           if(data.result == 'success'){
            window.location.href = "./go.html";
           }
           else{alert("用户名密码错误!!!")};
       }
   });
});
});



