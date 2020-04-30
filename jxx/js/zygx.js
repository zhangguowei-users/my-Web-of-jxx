$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    $("#login").click(function(){
      PDclick();
    });
    $.ajax({
        url:config.ip + config.port + '/getMenue',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
               //形成树菜单
               tree(data,".qone");
               $("#browser").treeview();
                //滑块移动事件
               huakuaiMove(".folder");
                //点击变色事件
               caidanChangeColor(".file");
                //点击查询
               queryCd(".fone",".sone","#browser",data);
                //点击tree 获取id
               clicktreeById();
        }
    });
    $("#gb-p1").click(function(){
      $(".theone").css("display","none");
    });
$("#gb-bing").click(function(){
  $(".bing").css("display","none");
});
$("#gb-zhu").click(function(){
  $(".zhu").css("display","none");
});
tishi();
$.ajax({
    url:config.ip + config.port + '/getAdministration',
    type: 'POST',
    async: false,
    xhrFields:{withCredentials:true},
    success:function(data){
        function bianliDF(data){
        for(var i=0;i<data.length;i++){
            if(data[i].subAdministrations == null && data[i].subAdministrations.length == 0){
                $(".xz").append(`<option value="${data[i]}">${data[i].name}</option>`);
            }else{
                $(".xz").append(`<option value="${data[i]}">${data[i].name}</option>`);
                bianliDF(data[i].subAdministrations);
            };
        }
    };
    bianliDF(data);
}
});
});