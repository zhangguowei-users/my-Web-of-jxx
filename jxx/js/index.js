//是否登录检测
setInterval(function () {
    $.ajax({
        url:config.ip + "",
        type: "POST",
        data: {cmd:"requestSession"},
        success:function(data) {
            if (data.session == success) {
                $("#login").html("已登录");
                $(".control").click(function () {
                    if (this.className == "control one") {
                        window.location.href = "./welcome.html";
                        //按className操作进入后的页面
                    } else if (this.className == "control two") {
                        window.location.href = "./welcome.html";
                        //按className操作进入后的页面
                    } else if (this.className == "control three") {
                        window.location.href = "./welcome.html";
                        //按className操作进入后的页面
                    } else if (this.className == "control four") {
                        window.location.href = "./welcome.html";
                        //按className操作进入后的页面
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
