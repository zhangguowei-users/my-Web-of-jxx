$(document).ready(function(){
    dengluLocation();
    shy();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    // $.ajax({
    //     url:config.ip + config.port + '/getMenue',
    //     type: 'POST',
    //     async: false,
    //     xhrFields:{withCredentials:true},
    //     success:function(data){
    //            //形成树菜单
    //            tree(data,".qtwo");
    //            $("#browser").treeview();
    //             //滑块移动事件
    //            huakuaiMove(".folder");
    //             //点击变色事件
    //            caidanChangeColor(".file");
    //             //点击查询
    //            queryCd(".ftwo",".stwo","#browser",data);
    //     }
    // });
    //测试
    huakuaiMove(".btn-tree");
    $("")
    });