var zhanghu1,user,dep,depid,resourceid;
$(document).ready(function(){
    dengluLocation();
    huoquName();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    tuichudenglu();
    $("#login").click(function(){
        PDclick();
      });
    $("#time1").html(newTime());
      $.ajax({
        url:config.newip + config.newport + '/arcgis/DocumentSharing/GetDocumentTypeList',
        type: 'get',
        async: false,
        success:function(data){
               //形成树菜单
               tree(data.data,".qtwo");
               $("#browser").treeview();
               //文档共享通过点击tree操作table
               table_wendang();
               //滑块移动事件
               huakuaiMove(".folder");
               //点击变色事件
               caidanChangeColor(".file");
               //点击查询
               queryCd1(".ffour",".sfour","#browser",data.data);
        }
    });
    $("#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    //提交申请
    $("#tijiao1").click(function(){
      var val = $('#yt').val();
      $.ajax({
        url:config.newip + config.newport + '/arcgis/DocumentSharing/CreateApply',
        type: 'post',
        data:{resourceid:resourceid,userid:zhanghu1,username:user,depid:depid,depname:dep,applyreason:val},
        success:function(data){
          console.log(data);
          alert(data.msg);
          $("#css1").css("display","none");
        }
      });
    });
    });