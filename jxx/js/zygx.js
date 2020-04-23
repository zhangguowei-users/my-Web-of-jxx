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
    });