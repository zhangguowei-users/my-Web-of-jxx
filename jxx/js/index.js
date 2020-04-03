//是否登录检测
var ip = "";
setInterval(function () {
    $.ajax({
        url:ip + "",
        type: "POST",
        data: "{cmd:requestSession}",
        success:function(data) {
            if (data.session == success) {
                $("#login").html("已登录");
                $(".control").click(function () {
                    if (data.session == "" || data == null) {
                        window.location.href = "./login.html";
                    } else if (this.className == "control one") {
                        window.location.href = "./welcome.html";
                    } else if (this.className == "control two") {
                        window.location.href = "./welcome.html";
                    } else if (this.className == "control three") {
                        window.location.href = "./welcome.html";
                    } else if (this.className == "control four") {
                        window.location.href = "./welcome.html";
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
