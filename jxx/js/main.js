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
        window.location.href = "./index.html";
    });
    $(".two").click(function () {
        window.location.href = "./zygx.html";
    });
    $(".three").click(function () {
        window.location.href = "./zxdc.html";
    });
    $(".four").click(function () {
        window.location.href = "./tjfx.html";
    });
    $(".five").click(function () {
        window.location.href = "./wdgx.html";
    });
};
//获取当前用户姓名 并添加到页面
function huoquName(){
        $.ajax({
            url:config.ip + config.port + '/getUserInfo',
            type: 'POST',
            xhrFields:{withCredentials:true},
            success:function(data){
                $("#inf-namenow-name").html(data[0].realname);
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
            $(`${className}`).append(`<ul><li class="closed ${data[i].menueid}"><span class="folder dcd1" menueid="${data[i].menueid}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
            for(var j=0;j<data[i].subMenue.length;j++){
                 if(data[i].subMenue[j].subMenue != 0){
                    $(`.${data[i].menueid}`).append(`<ul><li class="closed ${data[i].subMenue[j].menueid}"><span class="folder dcd1" menueid="${data[i].subMenue[j].menueid}" cd='${JSON.stringify(data[i].subMenue[j])}'>${data[i].subMenue[j].menuename}</span></li></ul>`);
                    tree(data[i].subMenue[j].subMenue,`.${data[i].subMenue[j].menueid}`);
                 }else{
                    $(`.${data[i].menueid}`).append(`<ul><li><span class="file dcd" menueid="${data[i].subMenue[j].menueid}" cd='${JSON.stringify(data[i].subMenue[j])}'>${data[i].subMenue[j].menuename}</span></li></ul>`);
                 };
             };
         }else{
            $(`${className}`).append(`<ul><li><span class="file dcd" menueid="${data[i].menueid}" cd='${JSON.stringify(data[i])}'>${data[i].menuename}</span></li></ul>`);
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
            }
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
                location.href = "./shy.html";
            }else{
                //获取显示申请资源
                if($("#putongyonghu").css("display") == "block"){
                            $("#putongyonghu").css("display","none");
                            
                     
                }else{
                    $("#putongyonghu").css("display","block");
                    
                };
                $(function gbright(){
                    $("#putongyonghu,#login").click(function(event){
                        event.stopPropagation();
                    });
                    $(document).click(function(){
                        $("#putongyonghu").css("display","none");
                
                    });
                });
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
            $(".xianshi").css({"position":"fixed","bottom":"0","left":"0","height":"100%","width":"100%"});
            $(".nr").css("height","90.8%");
        }else{
            $(".map01_20").attr("class","map_20");
            $(".xianshi").css({"position":"","bottom":"","left":"","height":"","width":""});
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

        }else{
            $(".map01_07").attr("class","map_07");
            
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
           $(`${className}`).append(`<ul><li class="closed ${data[i].id}"><span class="folder cd1" menueid='${JSON.stringify(data[i])}'>${data[i].name}</span></li></ul>`);
           for(var j=0;j<data[i].subAdministrations.length;j++){
                if(data[i].subAdministrations[j].subAdministrations != 0){
                   $(`.${data[i].id}`).append(`<ul><li class="closed ${data[i].subAdministrations[j].id}"><span class="folder cd1" menueid='${JSON.stringify(data[i].subAdministrations[j])}'>${data[i].subAdministrations[j].name}</span></li></ul>`);
                   bianliDF(data[i].subAdministrations[j].subAdministrations,`.${data[i].subAdministrations[j].id}`);
                }else{
                   $(`.${data[i].id}`).append(`<ul><li><span class="file cd" menueid='${JSON.stringify(data[i].subAdministrations[j])}'>${data[i].subAdministrations[j].name}</span></li></ul>`);
                };
            };
        }else{
           $(`${className}`).append(`<ul><li><span class="file cd" menueid='${JSON.stringify(data[i])}'>${data[i].name}</span></li></ul>`);
        };
      };
};
//测试
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
$("#setting").click(function(){
    location.href = "bigscreen.html";
});
//退出登录
$("#gb").click(function(){
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
