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
    //获取部门信息 同步
    $.ajax({
        url:config.ip + config.port + '/getDepartment',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success: function (data) {
            function bumen(arr) {
                for(value of arr){
                    $("#bm1").append("<option value='" + value.departmentid + "'>" + value.departmentname + "</option>");
                    if(value.subDepartment.length != 0){
                     bumen(value.subDepartment);
                    }
                }
            }
            bumen(data);
        }
    });
    //获取角色 同步
    $.ajax({
        url:config.ip + config.port + '/getRole',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success: function (data) {
            for(value of data){
                $("#js1").append("<option value='" +value.roleid + "'>" + value.rolename + "</option>")
            }     
        }
    });
    // 获取岗位 同步
    $.ajax({
        url:config.ip + config.port + '/getPost',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success: function (data) {
            for(value of data){
                $("#gw1").append("<option value='" +value.postid + "'>" + value.postname + "</option>")
            }     
        }
    });
    //将获取所有信息进行提交
    
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



