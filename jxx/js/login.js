var zhanghu1;
$(document).ready(function(){
//获取userid
$.ajax({
    url:config.ip + config.port + '/getUserInfo',
    type: 'POST',
    async: false,
    xhrFields:{withCredentials:true},
    success:function(data){
        if(data.length == 0 || data ==null) return '未登录无法获取userid';
        else zhanghu1 = data[0].userid;  
    },
    error:function(){
        return '未登录无法获取userid';
    }
});
//登陆页面样式变化
$(function name(){
$(document).click(function(){
        $(".name").css("background","url(./img/login__03.png) no-repeat");
        $(".name").css("background-size","100% 100%");
});
$(".name").click(function(event){
        $(".name").css("background","url(./img/login__05.png) no-repeat");
        $(".name").css("background-size","100% 100%");
        $(".value").css("background","url(./img/login__09.png) no-repeat");
        $(".value").css("background-size","100% 100%");
        event.stopPropagation();
});
});
$(function value(){
    $(".value").click(function(event){
        event.stopPropagation();
        $(".value").css("background","url(./img/login__10.png) no-repeat");
        $(".name").css("background","url(./img/login__03.png) no-repeat");
        $(".value").css("background-size","100% 100%");
        $(".name").css("background-size","100% 100%");
    });
    $(document).click(function(){
        $(".value").css("background","url(./img/login__09.png) no-repeat");
        $(".value").css("background-size","100% 100%");
    });
});
$("#input").mouseover(function () {
        $(this).css({"background":"url(./img/login__16.png) no-repeat","background-size":"350rem 45rem"});
});
$("#input").mouseout(function(){
        $(this).css({"background":"url(./img/login__14.png) no-repeat","background-size":"350rem 45rem"});
});
//注册
$("#zc").click(function () {
    $("#dl1").css("display","none");
    $("#zc1").css("display","inline-block");
    //初始化信息
    $("#bm1").children().remove();
    $("#js1").children().remove();
    $("#gw1").children().remove();
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
                if(value.rolename == "管理员"){
                    continue;
                };
                $("#js1").append("<option value='" +value.roleid + "'>" + value.rolename + "</option>")
            };     
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
    $("#tj").unbind("click").bind("click",function(){
        var username = $("#zh2").val();
        var password = $("#mm2").val();
        var realname = $("#xm2").val();
        var gender = $("#xb1").val();
        var departmentid = $("#bm1").val();
        var postid = $("#gw1").val();
        var roleid = $("#js1").val();
        var phone = $("#phone2").val();
        if(username=="" || password=="" || realname==""){
                alert("用户名，密码，姓名不能为空！请重新注册");
        }else{
            $.ajax({
                url:config.ip + config.port + '/regist',
                type: 'POST',
                async: false,
                data:{username:username,password:password,realname:realname,telephone:phone,gender:gender,'department.departmentid':departmentid,'post.postid':postid,'role.roleid':roleid},
                xhrFields:{withCredentials:true},
                success: function (data) {
                  var data = JSON.parse(data);
                  if(data.result == "success"){
                        alert("注册成功，请等待管理员审核，审核成功后方可登录!!!");
                    }else if(data.result == "fail"){
                        alert("注册失败，请重新注册!!!");
                    }else if(data.result == "repeat"){
                        alert("您注册的账户密码重复，请重新注册!!!");
                    }else{
                        alert("您注册的账户密码重复，请重新注册!!!");
                  };
                },
                error:function(){
                        alert("网络原因，注册失败，请稍后重试！");      
                }
            });
        }; 
    });  
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
           if(data.result == 'success'){
            window.location.href = "./go.html";
           }
           else{alert("用户名密码错误!!!")};
       }
   });
});
});



