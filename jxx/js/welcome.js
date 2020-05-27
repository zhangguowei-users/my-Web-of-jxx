var zhanghu1;
$(document).ready(function(){
dengluLocation();
huoquName();
//个人中心数据加载
jiazaigeren();
$("#inf-namenow-time").html(newTime());
tiaozhuan();
$("#login").click(function(){
    PDclick();
  });
  $("#time1").html(newTime());
});