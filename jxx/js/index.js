// 是否登录检测
function jiancelogin(){
    var call;
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
    return call;
};
//获取当前时间
function newTime(){
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var data = time.getDate();
    var new_time = year + "-" + month + "-" + data;
    return new_time;
};

$(document).ready(function(){
if(jiancelogin()){
    $("#login1").css("display","none");
};
$("#login1").click(function () {
    window.location.href = "./login.html";
});
$(".control").click(function(){
    if(jiancelogin()){
        window.location.href = "./welcome.html";
    }else{
        window.location.href = "./login.html";
    }    
});
});


