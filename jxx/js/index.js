// 是否登录检测
setInterval(function () {
    $.ajax({
        url:config.ip +config.port+ "/getUserInfo",
        type: "POST",
        xhrFields:{withCredentials:true},
        success:function(data){
            console.log(dat);
            if (data.length > 0) {
                $("#login").css("display","none");
                $(".control").click(function () {
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
                });
            }else{
                $("#login").click(function () {
                    window.location.href = "./login.html";
                });
                $(".control").click(function(){
                    window.location.href = "./login.html";
                });
            };
        }
    });
},10000);
