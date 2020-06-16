var zhanghu1;
$(document).ready(function(){
//获取userid
$.ajax({
  url:config.ip + config.port + '/getUserInfo',
  type: 'POST',
  async: false,
  xhrFields:{withCredentials:true},
  success:function(data){
    if(data.length == 0 || data ==null) return '未登录无法获取userid';
    else zhanghu1 = data[0].userid;  
  },
  error:function(){
    return '未登录无法获取userid';
  }
});
dengluLocation();
$.ajax({
    url:config.newip + config.newport + '/arcgis/Other/PostLog',
    type:'POST',
    async:false,
    data:{userid:zhanghu1,content:'登入系统'}
});
setTimeout(function () {
    window.location.href = "./welcome.html";
},500);
});