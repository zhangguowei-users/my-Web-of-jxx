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
//登录检测器
function dengluLocation(){
    if(jiancelogin()){
        setInterval(function(){
            if(jiancelogin()){
            }else{
                window.location.href = "./login.html";
            }
        },10000);
    }else{
        window.location.href = "./login.html";
    };
}
//获取当前时间
function newTime(){
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var data = time.getDate();
    var new_time = year + "-" + month + "-" + data;
    return new_time;
};
//页面跳转
function tiaozhuan(){
    $(".one").click(function () {
        window.location.href = "./index.html";
    });
    $(".two").click(function () {
        window.location.href = "./zygx.html";
    });
    $(".three").click(function () {
        window.location.href = "./zxdc.html";
    });
    $(".four").click(function () {
        window.location.href = "./tjfx.html";
    });
    $(".five").click(function () {
        window.location.href = "./wdgx.html";
    });
};
//获取当前用户姓名 并添加到页面
function huoquName(){
        $.ajax({
            url:config.ip + config.port + '/getUserInfo',
            type: 'POST',
            xhrFields:{withCredentials:true},
            success:function(data){
                $("#inf-namenow-name").html(data[0].username);
            }
        });
}