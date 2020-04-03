var ip = "";
//是否登录检测
$("#login").click(function(){
    window.location.href = "./login.html";
});
$(".control").click(function(){
    $.ajax({
        url:ip + "",

        type: "POST",
        data: "requestSession",
        success: function(data){
            if(data == "" || data == null){
                window.location.href = "./login.html";
            }else if(this.className == "control one"){
                window.location.href = "./welcome.html";                
            }else if(this.className == "control two"){
                window.location.href = "./welcome.html";
            }else if(this.className == "control three"){
                window.location.href = "./welcome.html";
            }else if(this.className =="control four"){
                window.location.href = "./welcome.html";
            };
        }
    });
});
$("#log").click(function(){
    var value = "key";
    sessionStorage.setItem("key",value);
});
$("#del").click(function(){
    sessionStorage.removeItem("key");
});
