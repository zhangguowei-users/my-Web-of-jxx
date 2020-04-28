$(document).ready(function(){
if(jiancelogin()){
    $("#login1").css("display","none");
    $("#gb").css("display","inline-block");
};
$("#login1").click(function () {
    window.location.href = "./login.html";
});
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


