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
                $("#inf-namenow-name").html(data[0].realname);
            }
        });
};
//滑块移动事件
function huakuaiMove(IdName){
    $(`${IdName}`).click(function(){
        var height = $(this).position().top;
        $(".wone").animate({
            marginTop: height
        })
    });
};
//点击变色事件
function caidanChangeColor(className){
    $(`${className}`).click(function(){
        $(`${className}`).css("color","black");
        $(this).css("color","red");
    });
};
//形成树菜单 无限层级
function tree(data,className){
    for(key of data){
      if(key.subMenue.length != 0){
         $(`${className}`).append(`<ul><li class="closed"><span class="folder">${key.menuename}</span></li></ul>`);
         for(k of key.subMenue){
            if(k.subMenue.length !=0){
              $(".closed").append(`<ul><li class="closed"><span class="folder">${k.menuename}</span></li></ul>`)
            }else{
              $(".closed").append(`<ul><li><span class="file">${k.menuename}</span></li></ul>`)
            }
            tree(k.subMenue,".closed");
         };
      }else{
         $(`${className}`).append(`<ul><li><span class="file">${key.menuename}</span></li></ul>`);
      }
    }
   };