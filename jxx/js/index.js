// 是否登录检测
function jiancelogin(){
    $.ajax({
        url:config.ip + config.port + '/getUserInfo',
        dataType: "json",
        type: 'POST',
        success:function(data){
            //alert(data);
            if(data.length > 0) return true;
            if(data == {"result":"error"}) return false;
        }
    })
};
$(document).ready(function(){
if(jiancelogin()){
    $("#login").css("display","none");
};
$("#login").click(function () {
    window.location.href = "./login.html";
});
$(".control").click(function(){
    // console.log(jiancelogin());
    if(jiancelogin()){
        if (this.className == "control one") {
            window.location.href = "./welcome.html";
            //按className操作进入后的页面
            $(".dh-bottom").css("display","none");
            $(".two2").css("display","inline-block");
        } else if (this.className == "control two") {
            window.location.href = "./welcome.html";
            //按className操作进入后的页面
            $(".dh-bottom").css("display","none");
            $(".three3").css("display","inline-block");
        } else if (this.className == "control three") {
            window.location.href = "./welcome.html";
            //按className操作进入后的页面
            $(".dh-bottom").css("display","none");
            $(".four4").css("display","inline-block");
        } else if (this.className == "control four") {
            window.location.href = "./welcome.html";
            //按className操作进入后的页面
            $(".dh-bottom").css("display","none");
            $(".five5").css("display","inline-block");
        }
    }else{
        window.location.href = "./login.html";
    }    
});
});


