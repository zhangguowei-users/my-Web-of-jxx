// 是否登录检测
function jiancelogin(){
    var call;
    $.ajax({
        url:config.ip + config.port + '/getUserInfo',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
            if(data.length > 0){call = true};
            if(data.length <= 0){call = false};
        },
        error:function(){
            call = false;
        }
    });
    return call;
};
//登录检测器
function dengluLocation(){
    if(jiancelogin()){
        setInterval(function(){
            if(jiancelogin()){
            }else{
                window.location.href = "./index.html";
            }
        },10000);
    }else{
        window.location.href = "./index.html";
    };
}
//获取当前时间
function newTime(){
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var data = time.getDate();
    var new_time = year + "-" + month + "-" + data;
    return new_time;
};
//页面跳转
function tiaozhuan(){
    $(".one").click(function () {
        $.ajax({
          url:config.newip + config.newport + '/arcgis/Other/PostLog',
          type:'POST',
          async:false,
          data:{userid:zhanghu1,content:'点击首页'}
        });
        window.location.href = "./index.html";
    });
    $(".two").click(function () {
        $.ajax({
            url:config.newip + config.newport + '/arcgis/Other/PostLog',
            type:'POST',
            async:false,
            data:{userid:zhanghu1,content:'点击资源共享'}
          });
        window.location.href = "./zygx.html";
    });
    $(".three").click(function () {
        $.ajax({
            url:config.newip + config.newport + '/arcgis/Other/PostLog',
            type:'POST',
            async:false,
            data:{userid:zhanghu1,content:'点击专项调查'}
          });
        window.location.href = "./zxdc.html";
    });
    $(".four").click(function () {
        $.ajax({
            url:config.newip + config.newport + '/arcgis/Other/PostLog',
            type:'POST',
            async:false,
            data:{userid:zhanghu1,content:'点击统计分析'}
          });
        window.location.href = "./tjfx.html";
    });
    $(".five").click(function () {
        $.ajax({
            url:config.newip + config.newport + '/arcgis/Other/PostLog',
            type:'POST',
            async:false,
            data:{userid:zhanghu1,content:'点击文档共享'}
          });
        window.location.href = "./wdgx.html";
    });
};
//获取当前用户姓名 并添加到页面
function huoquName(){
        $.ajax({
            url:config.ip + config.port + '/getUserInfo',
            type: 'POST',
            async: false,
            xhrFields:{withCredentials:true},
            success:function(data){
                $("#inf-namenow-name").html(data[0].realname);
                zhanghu1 = data[0].userid;
                user = data[0].realname;
                dep = data[0].department.departmentname;
                depid = data[0].department.departmentid;  
            }
        });
};
//滑块移动事件
function huakuaiMove(IdName){
    $(`${IdName}`).click(function(){
        var height = $(this).position().top;
        $(".wone").animate({
            marginTop: height
        })
    });
};
//点击变色事件
function caidanChangeColor(className){
    $(`${className}`).click(function(){
        $(`${className}`).css("color","black");
        $(this).css("color","red");
    });
};
//形成树菜单 无限层级
   function tree(data,className){
       for(var i=0;i<data.length;i++){
         if(data[i].subMenue.length != 0){
            $(`${className}`).append(`<ul><li class="closed cq${data[i].menueid}"><span class="folder dcd1" menueid="${data[i].menueid}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
            for(var j=0;j<data[i].subMenue.length;j++){
                 if(data[i].subMenue[j].subMenue != 0){
                    $(`.cq${data[i].menueid}`).append(`<ul><li class="closed cq${data[i].subMenue[j].menueid}"><span class="folder dcd1" menueid="${data[i].subMenue[j].menueid}" cd='${JSON.stringify(data[i].subMenue[j])}'>${data[i].subMenue[j].menuename}</span></li></ul>`);
                    tree(data[i].subMenue[j].subMenue,`.cq${data[i].subMenue[j].menueid}`);
                 }else{
                    $(`.cq${data[i].menueid}`).append(`<ul><li><span class="file dcd" menueid="${data[i].subMenue[j].menueid}" cd='${JSON.stringify(data[i].subMenue[j])}'>${data[i].subMenue[j].menuename}</span></li></ul>`);
                 };
             };
         }else{
            $(`${className}`).append(`<ul><li><span class="file dcd" menueid="${data[i].menueid}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
         };
       };
   };
   //专项调查形成tree菜单
   function tree1(data,className){
    for(var i=0;i<data.length;i++){
      if(data[i].subSpecialMenue.length != 0){
         $(`${className}`).append(`<ul><li class="closed a${data[i].id}"><span class="folder dcd1" menueid="${data[i].id}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
         for(var j=0;j<data[i].subSpecialMenue.length;j++){
              if(data[i].subSpecialMenue[j].subSpecialMenue != 0){
                 $(`.a${data[i].id}`).append(`<ul><li class="closed a${data[i].subSpecialMenue[j].id}"><span class="folder dcd1" menueid="${data[i].subSpecialMenue[j].menueid}" cd='${JSON.stringify(data[i].subSpecialMenue[j])}'>${data[i].subSpecialMenue[j].menuename}</span></li></ul>`);
                 tree1(data[i].subSpecialMenue[j].subSpecialMenue,`.a${data[i].subSpecialMenue[j].id}`);
              }else{
                 $(`.a${data[i].id}`).append(`<ul><li><span class="file dcd" menueid="${data[i].subSpecialMenue[j].id}" cd='${JSON.stringify(data[i].subSpecialMenue[j])}'>${data[i].subSpecialMenue[j].menuename}</span></li></ul>`);
              };
          };
      }else{
         $(`${className}`).append(`<ul><li><span class="file dcd" menueid="${data[i].id}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
      };
    };
};
   //专项调查形成tree菜单
   function tree2(data,className){
    for(var i=0;i<data.length;i++){
      if(data[i].subSpecialMenue.length != 0){
         $(`${className}`).append(`<ul><li class="closed b${data[i].id}"><span class="folder dcd1" menueid="${data[i].id}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
         for(var j=0;j<data[i].subSpecialMenue.length;j++){
              if(data[i].subSpecialMenue[j].subSpecialMenue != 0){
                 $(`.b${data[i].id}`).append(`<ul><li class="closed b${data[i].subSpecialMenue[j].id}"><span class="folder dcd1" menueid="${data[i].subSpecialMenue[j].id}" cd='${JSON.stringify(data[i].subSpecialMenue[j])}'>${data[i].subSpecialMenue[j].menuename}</span></li></ul>`);
                 tree1(data[i].subSpecialMenue[j].subSpecialMenue,`.b${data[i].subSpecialMenue[j].id}`);
              }else{
                 $(`.b${data[i].id}`).append(`<ul><li><span class="file dcd" menueid="${data[i].subSpecialMenue[j].id}" cd='${JSON.stringify(data[i].subSpecialMenue[j])}'>${data[i].subSpecialMenue[j].menuename}</span></li></ul>`);
              };
          };
      }else{
         $(`${className}`).append(`<ul><li><span class="file dcd" menueid="${data[i].id}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
      };
    };
};
   //审核员页面检测
   function shy(){
    $.ajax({
        url:config.ip + config.port + '/getUserInfo',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
            var glorolename = [];
            for(var i=0;i<data.length;i++){
                glorolename.push(data[i].role.rolename);
            };
            if(glorolename.indexOf("管理员") >= 0){
                
            }else{
                location.href = "./welcome.html"
            };
        },
        error:function(){
            location.href = "./login.html"
        }
    });
   };
   //判断点击事件
   function PDclick(){
    $.ajax({
        url:config.ip + config.port + '/getUserInfo',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
            var glorolename = [];
            for(var i=0;i<data.length;i++){
                glorolename.push(data[i].role.rolename);
            };
            if(glorolename.indexOf("管理员") >= 0){
                $.ajax({
                    url:config.newip + config.newport + '/arcgis/Other/PostLog',
                    type:'POST',
                    async:false,
                    data:{userid:zhanghu1,content:'点击个人中心'}
                  });
                location.href = "./shy.html";
            }else{
                $.ajax({
                    url:config.newip + config.newport + '/arcgis/Other/PostLog',
                    type:'POST',
                    async:false,
                    data:{userid:zhanghu1,content:'点击个人中心'}
                  });
                location.href = "./geren.html"; 
            }
        },
        error:function(){
            location.href = "./login.html"
        }
    });
   };
   //获取菜单最底层信息
   function pushArry(arr){
    var gloArr = [];
    for(var i=0;i<arr.length;i++){
       if(arr[i].secondcategory == ""){
          var menueid = arr[i].menueid;
           $.ajax({
           url:config.ip + config.port + '/getSecondCategory',
           type: 'POST',
           async: false,
           data:{menueid:menueid},
           xhrFields:{withCredentials:true},
           success:function(data){
           for(var j=0;j<data.length;j++){
              if(data[j].secondcategory == ""){
                  pushArry(data);
              }else{
                 var abc = {menueid:data[j].menueid,menuename:data[j].menuename,firstcategoryCode:data[j].firstcategory,secondcategoryCode:data[j].secondcategory,secondcategoryName:data[j].menuename};
                 gloArr.push(abc);
              };
             };
           }
        });
        }else{
           var abc = {menueid:arr[i].menueid,menuename:arr[i].menuename,firstcategoryCode:arr[i].firstcategory,secondcategoryCode:arr[i].secondcategory,secondcategoryName:arr[i].menuename};
           gloArr.push(abc);
        };
    };
    return gloArr;
 };
 //点击查询拼接的树型菜单
 function queryCd(queryInput,queryButton,treeId,data){
    $(`${queryButton}`).click(function(){
        $(`${treeId}`).children().remove();
        tree(data,`${treeId}`);
        $(`${treeId}`).treeview();
        var fone = $(`${queryInput}`).val();
        var sfqx = $(".file,.folder");
        huakuaiMove(".folder");
        caidanChangeColor(".dcd");
        clicktreeById()
        var glo = [];
        sfqx.css("color","black");
        if(fone == ""){
            confirm("搜索字符为空，请重新填写");
        }else{
            for(var i=0;i<sfqx.length;i++){
                glo.push(sfqx.eq(i).html());
                var Sumsfqx = sfqx.eq(i).html();
                if(Sumsfqx.indexOf(fone) >= 0){
                   sfqx.eq(i).css("color","red");
                   sfqx.eq(i).parents().siblings(".expandable-hitarea").click(); 
                };
               };
               var a = glo.toString().replace(/\,/g,"");
               if(a.indexOf(fone) < 0){
                   confirm("搜索字符不存在");    
               };
        };
     });
 };
 //点击查询拼接的树型菜单(文档共享)
 function queryCd1(queryInput,queryButton,treeId,data){
    $(`${queryButton}`).click(function(){
        $(`${treeId}`).children().remove();
        tree(data,`${treeId}`);
        $(`${treeId}`).treeview();
        table_wendang();
        var fone = $(`${queryInput}`).val();
        var sfqx = $(".file,.folder");
        huakuaiMove(".folder");
        caidanChangeColor(".file");
        var glo = [];
        sfqx.css("color","black");
        if(fone == ""){
            confirm("搜索字符为空，请重新填写");
        }else{
            for(var i=0;i<sfqx.length;i++){
                glo.push(sfqx.eq(i).html());
                var Sumsfqx = sfqx.eq(i).html();
                if(Sumsfqx.indexOf(fone) >= 0){
                   sfqx.eq(i).css("color","red");
                   sfqx.eq(i).parents().siblings(".expandable-hitarea").click(); 
                };
               };
               var a = glo.toString().replace(/\,/g,"");
               if(a.indexOf(fone) < 0){
                   confirm("搜索字符不存在");    
               };
        };
     });
 };
 //地图小图标提示
 function tishi(){
     $(".map_12").mousedown(function(ev){
        $(".map_12").removeClass("map30");
        $(".map_12").attr("class","map01_12");
     });
     $(".map_12").mouseup(function(ev){
        $(".map_12").removeClass("map30");
        $(".map01_12").attr("class","map_12");
     });
    $(".map_12").click(function(){
        $(".map_12").removeClass("map30");
        
        $(".esriSimpleSliderIncrementButton").click();//地图放大按钮

    });
    $(".map_14").mousedown(function(ev){
        $(".map_14").removeClass("map30");
        $(".map_14").attr("class","map01_14");
     });
     $(".map_14").mouseup(function(ev){
        $(".map_14").removeClass("map30");
        $(".map01_14").attr("class","map_14");
     });
    $(".map_14").click(function(){
        $(".map_14").removeClass("map30");
        $(".esriSimpleSliderDecrementButton").click();//地图缩小按钮
    });
    //地图全屏
    $(".map_20").click(function(){
        $(".map_20").removeClass("map30");
        if($(".map_20").attr("class") == "map_20"){
            $(".map_20").attr("class","map01_20");
            $("#quanbu123").css({"position":"fixed","bottom":"0","right":"0","height":"100%","width":"100%"});
            $(".nr").css("height","90.4%");
        }else{
            $(".map01_20").attr("class","map_20");
            $("#quanbu123").css({"position":"absolute","bottom":"0","right":"0.1%","height":"93.6%","width":"1518px"});
            $(".nr").css("height","");
        };
    });
    //鹰眼图
    $(".map_24").click(function(){
        $(".map_24").removeClass("map30"); 
        if($(".map_24").attr("class") == "map_24"){
           $(".yingyan").css("display","inline-block");
            $(".map_24").attr("class","map01_24");
        }else{
            $(".map01_24").attr("class","map_24");
            $(".yingyan").css("display","none");
           
        };
    });
    //指南针
    $(".map_26").click(function(){
        $(".map_26").removeClass("map30");
        if($(".map_26").attr("class") == "map_26"){
            $(".south").css("display","inline-block");
            $(".map_26").attr("class","map01_26");
        }else{
            $(".map01_26").attr("class","map_26");
            $(".south").css("display","none");
        };
    });
    //比例尺
    $(".map_28").click(function(){
        $(".map_28").removeClass("map30");
        if($(".map_28").attr("class") == "map_28"){
            $(".bili-ruler").css("display","inline-block");
            $(".map_28").attr("class","map01_28");
        }else{
            $(".map01_28").attr("class","map_28");
            $(".bili-ruler").css("display","none");
        };
    });
    //位置信息
    $(".map_30").click(function(){
        if($(".map_30").attr("class") == "map_30"){
            $(".map_30").attr("class","map01_30");
            $("*").addClass("map30");
            mouseClick(globalQueryClass.map);//开启鼠标拾取
        }else{
            $(".map01_30").attr("class","map_30");
            $("*").removeClass("map30");
            mouseClick(globalQueryClass.map, "close");//关闭鼠标拾取
        };
    });
    //影像
    $(".map_07").click(function(){
        $(".map_07").removeClass("map30");
        if($(".map_07").attr("class") == "map_07"){
            $(".map_07").attr("class","map01_07");
            $(".xianshi").css("width","50%");
            $("#left-yingxiang").css("display","inline-block");
            addImageLayer(globalQueryClass.ArcGISDynamicMapServiceLayer,globalQueryClass.Map ,globalQueryClass.ArcGISImageServiceLayer);//添加影像
        }else{
            $(".map01_07").attr("class","map_07");
            $("#left-yingxiang").css("display","none");
            $(".xianshi").css("width","100%");
        };
    });
    //显示统计报表
    $(".map_33").mousedown(function(ev){
        $(".map_33").removeClass("map30");
        $(".map_33").attr("class","map01_33");
     });
     $(".map_33").mouseup(function(ev){
        $(".map_33").removeClass("map30");
        $(".map01_33").attr("class","map_33");
        exportReportPDF(globalQueryClass.map);//导出报表按钮
     });
    //显示区域报表图
    $(".map_35").click(function(){
        $(".map_35").removeClass("map30");
        if($(".map_35").attr("class") == "map_35"){
            $(".bing,.zhu").css("display","inline-block");
            $(".map_35").attr("class","map01_35");
        }else{
            $(".map01_35").attr("class","map_35");
            $(".bing,.zhu").css("display","none");
        };
    });
    //打印地图
    $(".map_36").click(function(){
        $(".map_36").removeClass("map30");
        if($(".map_36").attr("class") == "map_36"){
            $(".map_36").attr("class","map01_36");
            $("#dayin-map").css('display','inline-block');
            $("#quxiao321").bind('click',function(){
                $("#dayin-map").css('display','none');
                $(".map01_36").attr("class","map_36");
            });
            $("#dayin").unbind('click').bind('click',function(){
                var a = $("#ditubiaoti").val(); //标题 
                var b = $("#buju").val(); //布局
                var c = $("#geshi").val(); //格式
                if(a==""){
                    alert('地图标题不可为空');
                }else{
                    printMap(a, b, c, globalQueryClass.PrintTask, globalQueryClass.PrintTemplate, globalQueryClass.PrintParameters);//打印地图
                };
            });
        }else{
            $(".map01_36").attr("class","map_36");
            $("#dayin-map").css('display','none');
        };
    });
    //显示全部区域报表图
    $(".map_09").click(function(){
        $(".map_09").removeClass("map30");
        if($(".map_09").attr("class") == "map_09"){
            $(".quanbu-bing,.quanbu-zhu").css("display","inline-block");
            $(".map_09").attr("class","map01_09");
            createAllDLBingReport();//创建所有地类比例报表
            createAllDLZhuReport();//创建所有地类数量报表
        }else{
            $(".quanbu-bing,.quanbu-zhu").css("display","none");
            $(".map01_09").attr("class","map_09");
           
        };
    });
    //绘制地块
    $(".map_37").click(function(){
        $(".map_37").removeClass("map30");
        if($(".map_37").attr("class") == "map_37"){
            $('#huizhi').css('display','inline-block');
            $(".map_37").attr("class","map01_37");

            drawPolygon(globalQueryClass.Draw,globalQueryClass.map,globalQueryClass.SimpleLineSymbol,globalQueryClass.SimpleFillSymbol,globalQueryClass.Color,globalQueryClass.Graphic,globalQueryClass.on,globalQueryClass.Point,globalQueryClass.TextSymbol,globalQueryClass.Font,globalQueryClass.graphicsLayer);//画面图形
        }else{
            $('#huizhi').css('display','none');
            $(".map01_37").attr("class","map_37");
            removeToolbarDrao();//取消画图工具
        };
    });
    //地类面积筛选
    $(".map_38").click(function(){
        $(".map_38").removeClass("map30");
        if($(".map_38").attr("class") == "map_38"){
            $(".map_38").attr("class","map01_38");
            
        }else{
            $(".map01_38").attr("class","map_38");
        };
    }); 
    };
 //点击tree 获取id
 function clicktreeById(){
    $(".dcd1,.dcd").click(function(){
       var menueid = $(this).attr("menueid");
       if(menueid == 1){
          return;
       }else{
             var menueid = $(this).attr("menueid");
             var menuename = $(this).html();
             var click_Inf = {menueid:menueid,menuename:menuename};
          $.ajax({
             url:config.ip + config.port + '/getSecondCategory',
             type: 'POST',
             data:{menueid:menueid},
             xhrFields:{withCredentials:true},
             success:function(data){
                left = data;

                queryDLTB(pushArry(data), click_Inf, right); 
             }
          });
       };
    });
 };
 //遍历地区
 function bianliDF(data,className){
    for(var i=0;i<data.length;i++){
        if(data[i].subAdministrations.length != 0){
           $(`${className}`).append(`<ul><li class="closed d${data[i].id}"><span class="folder cd1" menueid='${JSON.stringify(data[i])}'>${data[i].name}</span></li></ul>`);
           for(var j=0;j<data[i].subAdministrations.length;j++){
                if(data[i].subAdministrations[j].subAdministrations != 0){
                   $(`.d${data[i].id}`).append(`<ul><li class="closed d${data[i].subAdministrations[j].id}"><span class="folder cd1" menueid='${JSON.stringify(data[i].subAdministrations[j])}'>${data[i].subAdministrations[j].name}</span></li></ul>`);
                   bianliDF(data[i].subAdministrations[j].subAdministrations,`.d${data[i].subAdministrations[j].id}`);
                }else{
                   $(`.d${data[i].id}`).append(`<ul><li><span class="file cd" menueid='${JSON.stringify(data[i].subAdministrations[j])}'>${data[i].subAdministrations[j].name}</span></li></ul>`);
                };
            };
        }else{
           $(`${className}`).append(`<ul><li><span class="file cd" menueid='${JSON.stringify(data[i])}'>${data[i].name}</span></li></ul>`);
        };
      };
};
//select标签
function option(data,classN){
    for(var i=0; i<data.length;i++){
        if(data[i].subAdministrations.length != 0){
            $(`${classN}`).append(`<option value="${data[i]}">${data[i].name}</option>`);
            option(data[i].subAdministrations,classN);
        }else{
            $(`${classN}`).append(`<option value="${data[i]}">${data[i].name}</option>`);
        }
    }
};
//大屏幕
$('#setting').bind('click',function(){
  open('./bigscreen.html');
});
//退出登录
function tuichudenglu(){
$("#gb").click(function(){
    $.ajax({
        url:config.newip + config.newport + '/arcgis/Other/PostLog',
        type:'POST',
        async:false,
        data:{userid:zhanghu1,content:'退出系统'}
      });
    $.ajax({
        url:config.ip + config.port + '/logOut',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(){
            location.href = "./index.html";
        },
        error:function(){

        }
    });
});
};
//文档共享通过点击tree操作table
function table_wendang(){
    $('.folder,.file').bind('click',function(){
        var menueid=$(this).attr('menueid');
        $('#zx tbody').children().remove();
        $.ajax({
         url:config.newip + config.newport + '/arcgis/DocumentSharing/GetPageListByCondition?page=1&limit=6&typeid='+menueid,
         type: 'get',
         async: false,
         success:function (data) {
           for(var i=0;i<data.data.length;i++){
             var urlname = data.data[i].url.split('.');
             var length = urlname.length;
             var format = urlname[length-1];
             if(format == 'pdf'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else if(format == 'doc'|| format == 'docx'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else if(format == 'xlsx' || format == 'xls'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else if(format == 'jpg'||'png'||'bmp'||'gif'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else{
               $('#zx tbody').append(`<tr>
               <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             };
           };
           
           $("#myPage").sPage({
             page:1,//当前页码，必填
             total:data.count,//数据总条数，必填
             pageSize:6,//每页显示多少条数据，默认10条
             totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
             showTotal:true,//是否显示总条数，默认关闭：false
             showSkip:true,//是否显示跳页，默认关闭：false
             showPN:true,//是否显示上下翻页，默认开启：true
             prevPage:"上一页",//上翻页文字描述，默认“上一页”
             nextPage:"下一页",//下翻页文字描述，默认“下一页”
             backFun:function(page){
                 //点击分页按钮回调函数，返回当前页码
                 $('#zx tbody').children().remove();
                 $.ajax({
                   url:config.newip + config.newport + '/arcgis/DocumentSharing/GetPageListByCondition?page='+page+'&limit=6&typeid='+menueid,
                   type: 'get',
                   async: false,
                   success:function(data){
                     $('#zx tbody').children().remove();
                     for(var i=0;i<data.data.length;i++){
                       var urlname = data.data[i].url.split('.');
                       var length = urlname.length;
                       var format = urlname[length-1];
                       if(format == 'pdf'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else if(format == 'doc'|| format == 'docx'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else if(format == 'xlsx' || format == 'xls'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else if(format == 'jpg'||'png'||'bmp'||'gif'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else{
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       };
                     };
                   }
                 });
             }
           });
         }
        });
       //查询该菜单下的文档
       $('#search-img').bind('click',function(){
          var search = $('#search-wendang').val();
          $('#zx tbody').children().remove();
          $.ajax({
          url:config.newip + config.newport +'/arcgis/DocumentSharing/GetPageListByCondition?name='+search+'&typeid='+menueid+'&page=1&limit=6',
          type:'GET',
          async:false,
          success:function(data){
            for(var i=0;i<data.data.length;i++){
                var urlname = data.data[i].url.split('.');
                var length = urlname.length;
                var format = urlname[length-1];
                if(format == 'pdf'){
                  $('#zx tbody').append(`<tr>
                  <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
                  <td>${data.data[i].resourcetypename}</td>
                  <td>${data.data[i].resourcename}</td>
                  <td>${data.data[i].sender}</td>
                  <td>${data.data[i].createtime.split('T')[0]}</td>
                  <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                  </tr>`);
                }else if(format == 'doc'|| format == 'docx'){
                  $('#zx tbody').append(`<tr>
                  <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
                  <td>${data.data[i].resourcetypename}</td>
                  <td>${data.data[i].resourcename}</td>
                  <td>${data.data[i].sender}</td>
                  <td>${data.data[i].createtime.split('T')[0]}</td>
                  <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                  </tr>`);
                }else if(format == 'xlsx' || format == 'xls'){
                  $('#zx tbody').append(`<tr>
                  <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
                  <td>${data.data[i].resourcetypename}</td>
                  <td>${data.data[i].resourcename}</td>
                  <td>${data.data[i].sender}</td>
                  <td>${data.data[i].createtime.split('T')[0]}</td>
                  <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                  </tr>`);
                }else if(format == 'jpg'||'png'||'bmp'||'gif'){
                  $('#zx tbody').append(`<tr>
                  <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
                  <td>${data.data[i].resourcetypename}</td>
                  <td>${data.data[i].resourcename}</td>
                  <td>${data.data[i].sender}</td>
                  <td>${data.data[i].createtime.split('T')[0]}</td>
                  <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                  </tr>`);
                }else{
                  $('#zx tbody').append(`<tr>
                  <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
                  <td>${data.data[i].resourcetypename}</td>
                  <td>${data.data[i].resourcename}</td>
                  <td>${data.data[i].sender}</td>
                  <td>${data.data[i].createtime.split('T')[0]}</td>
                  <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                  </tr>`);
                };
              };
              $("#myPage").sPage({
                page:1,//当前页码，必填
                total:data.count,//数据总条数，必填
                pageSize:6,//每页显示多少条数据，默认10条
                totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                showTotal:true,//是否显示总条数，默认关闭：false
                showSkip:true,//是否显示跳页，默认关闭：false
                showPN:true,//是否显示上下翻页，默认开启：true
                prevPage:"上一页",//上翻页文字描述，默认“上一页”
                nextPage:"下一页",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                    //点击分页按钮回调函数，返回当前页码
                    $('#zx tbody').children().remove();
                    $.ajax({
                      url:config.newip + config.newport + '/arcgis/DocumentSharing/GetPageListByCondition?name='+search+'&typeid='+menueid+'&page=1&limit=6',
                      type: 'get',
                      async: false,
                      success:function(data){
                        $('#zx tbody').children().remove();
                        for(var i=0;i<data.data.length;i++){
                          var urlname = data.data[i].url.split('.');
                          var length = urlname.length;
                          var format = urlname[length-1];
                          if(format == 'pdf'){
                            $('#zx tbody').append(`<tr>
                            <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
                            <td>${data.data[i].resourcetypename}</td>
                            <td>${data.data[i].resourcename}</td>
                            <td>${data.data[i].sender}</td>
                            <td>${data.data[i].createtime.split('T')[0]}</td>
                            <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                            </tr>`);
                          }else if(format == 'doc'|| format == 'docx'){
                            $('#zx tbody').append(`<tr>
                            <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
                            <td>${data.data[i].resourcetypename}</td>
                            <td>${data.data[i].resourcename}</td>
                            <td>${data.data[i].sender}</td>
                            <td>${data.data[i].createtime.split('T')[0]}</td>
                            <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                            </tr>`);
                          }else if(format == 'xlsx' || format == 'xls'){
                            $('#zx tbody').append(`<tr>
                            <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
                            <td>${data.data[i].resourcetypename}</td>
                            <td>${data.data[i].resourcename}</td>
                            <td>${data.data[i].sender}</td>
                            <td>${data.data[i].createtime.split('T')[0]}</td>
                            <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                            </tr>`);
                          }else if(format == 'jpg'||'png'||'bmp'||'gif'){
                            $('#zx tbody').append(`<tr>
                            <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
                            <td>${data.data[i].resourcetypename}</td>
                            <td>${data.data[i].resourcename}</td>
                            <td>${data.data[i].sender}</td>
                            <td>${data.data[i].createtime.split('T')[0]}</td>
                            <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                            </tr>`);
                          }else{
                            $('#zx tbody').append(`<tr>
                            <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
                            <td>${data.data[i].resourcetypename}</td>
                            <td>${data.data[i].resourcename}</td>
                            <td>${data.data[i].sender}</td>
                            <td>${data.data[i].createtime.split('T')[0]}</td>
                            <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                            </tr>`);
                          };
                        };
                      }
                    });
                }
              });
            }
           });
          });
          //文件的下载申请
          $('.down').bind('click',function(){
            $('#sq-b').children().remove();
            $("#css1").css("display","inline-block");
            var data = JSON.parse($(this).attr('id'));
            console.log(data,zhanghu1,user,dep,depid);
            resourceid=data.resourceid; 
            $('#sq-p').val(user);
            $('#sq-b').append(`<option value="${depid}">${dep}</option>`);
          });
      });
};
//改变echarts
function changeecharts(num_b){
    var legendData = new Array();
    var seriesData1 = [];
    var num;
    //echart图
    var domElement = document.querySelector('.zhu321');
    var title = "选中与总面积对比";
    var seriesName = "所占面积比例";
    var legendData1 = ['总面积'];
    var seriesData = [{value:num_b, name: '总面积',itemStyle:{color:'#FAD03E'}}];
    new ReportClass(legendData1, seriesData).createBingChar(domElement, title, seriesName);//创建饼形图
    $('.quanxuan').bind('change',function(){
        //----------------------console.log($(this).attr("bsm_tudi"));-------------------------------

        seriesData1 = [];
        num = 0;
        legendData.splice(0);
        //获取被选中的数量
        $('#yixuanze').html($('.quanxuan:checked').length);
        //选择之后改变样式
       for(var i=0;i<$('.quanxuan').length;i++){
          if($('.quanxuan').eq(i).prop('checked')){
            $('.quanxuan').eq(i).parent().parent().css('color','#04BBF4');
            var name_tudi = $('.quanxuan').eq(i).attr('name_tudi');
            num = num + Number($('.quanxuan').eq(i).attr('area'));
            if($('.quanxuan').eq(i).attr('name_tudi') == '无'){
                name_tudi = $('.quanxuan').eq(i).attr('bsm_tudi');
            };
            legendData.push(name_tudi);
            seriesData1.push({"value":Number($('.quanxuan').eq(i).attr('area')),"name":name_tudi});
          }else{
            $('.quanxuan').eq(i).parent().parent().css('color',''); 
          };
       };


        let obj2 = {}
        seriesData1.forEach(item => {
            obj2["value"] = item.value,
            obj2["name"] = item.name
        });
       //改变echarts
       var no = num_b - num;
       //echart图1
       var domElement = document.querySelector('.zhu321');
       var title = "选中与总面积对比";
       var seriesName = "所占面积比例";
       var legendData1 = ['剩余面积','选中面积'];
       var seriesData = [{value:no, name: '剩余面积',itemStyle:{color:'#FAD03E'}},{value:num, name: '选中面积',itemStyle:{color:'#F9AB15'}}];
       new ReportClass(eval(legendData1), eval(seriesData)).createBingChar(domElement, title, seriesName);//创建饼形图
       //echart图2
       var domElement2 = document.querySelector('.bing321');
       var title1 = "选中面积对比";
       var seriesName1 = "所占面积比例";
       new ReportClass(legendData,eval(seriesData1)).createBingChar(domElement2, title1, seriesName1);
       });
};