$(document).ready(function(){
if(jiancelogin()){
    $("#login1").css("display","none");
    $("#gb").css("display","inline-block");
    $("#help").css("display","inline-block");
    $("#setting").css("display","inline-block");
    $("#inf-namenow-time").html(newTime());
    huoquName();
    $("#login").css("display","inline-block");
};
$("#gb").click(function(){
    $("#login1").css("display","inline-block");
    $("#gb").css("display","none");
    $("#help").css("display","none");
    $("#setting").css("display","none");
    $("#login").css("display","none");
});
$("#login1").click(function () {
    window.location.href = "./login.html";
});
$("#time1").html(newTime());
$(".control").click(function(){
    if(jiancelogin()){
        if(this.className == "control one"){
            window.location.href = "zygx.html";
        }else if(this.className == "control two"){
            window.location.href = "zxdc.html";
        }else if(this.className == "control three"){
            window.location.href = "tjfx.html";
        }else if(this.className == "control four"){
            window.location.href = "wdgx.html";
        }
    }else{
        window.location.href = "./login.html";
    }    
});
});


