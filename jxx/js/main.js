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
                $("#css2").css("display","inline-block");
                $("#gb-p2").bind("click",function(){
                    $("#css2").css("display","none");
                });
                //操作个人中心的按钮选项
                $(".btn-tree1").bind("click",function(){
                    $("#myyixiazai,#myyitongguo,#myshenheing,#shenheing,#yitongguo,#yixiazai,#myyituihui,#yituihui").css("display","none");
                    if($(this).html() == "审核中"){
                     $("#myshenheing").css("display","block");
                     $("#shenheing").css("display","table");
                    }else if($(this).html() == "已通过"){
                      $("#myyitongguo").css("display","block");
                      $("#yitongguo").css("display","table");
                    }else if($(this).html() == "已下载"){
                      $("#myyixiazai").css("display","block");
                      $("#yixiazai").css("display","table");
                    }else if($(this).html() == "已退回"){
                      $("#myyituihui").css("display","block");
                      $("#yituihui").css("display","table");
                    }
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
    setInterval(function(){
        var a =$(".bing").css("display");
        var b =$(".zhu").css("display");
        if(a == "none" && b == "none"){
          $(".map01_35").attr("class","map_35");
        }else{
          $(".map_35").attr("class","map01_35"); 
        };
    },100);
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
//个人中心数据加载
function jiazaigeren(){
            $("#shenheing,#yitongguo,#yixiazai,#yituihui").children().children().not(':first-child').remove();
            $.ajax({
                url:config.newip + config.newport + '/arcgis/PersonalCenter/GetPersonList?states=0&page=1&limit=12&userid='+zhanghu1,
                type: 'GET',
                async: false,
                success: function (data) {
                    $("#shenheing").children().children().not(':first-child');
                    for(var i=0;i<data.data.length;i++){
                    $("#shenheing").append(`<tr>
                    <td><div>${data.data[i].resourcename}</div></td>
                    <td>审核中</td>
                    </tr>`);
                    };
                    $("#myshenheing").sPage({
                    page:1,//当前页码，必填
                    total:data.count,//数据总条数，必填
                    pageSize:12,//每页显示多少条数据，默认10条
                    totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                    showTotal:true,//是否显示总条数，默认关闭：false
                    showSkip:true,//是否显示跳页，默认关闭：false
                    showPN:true,//是否显示上下翻页，默认开启：true
                    prevPage:"上一页",//上翻页文字描述，默认“上一页”
                    nextPage:"下一页",//下翻页文字描述，默认“下一页”
                    backFun:function(page){
                        //点击分页按钮回调函数，返回当前页码
                        $.ajax({
                            url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=0&page='+page+'&limit=12&userid='+zhanghu1,
                            type: 'GET',
                            success: function (data){
                            $("#shenheing").children().children().not(':first-child').remove();
                            for(var i=0;i<data.data.length;i++){
                                $("#shenheing").append(`<tr>
                                <td><div>${data.data[i].resourcename}</div></td>
                                <td>审核中</td>
                                </tr>`);
                            };
                            }
                        });
                    }
                    });   
                    
                }
            });
        $.ajax({
          url:config.newip + config.newport + '/arcgis/PersonalCenter/GetPersonList?states=1&page=1&limit=12&userid='+zhanghu1,
          type: 'GET',
          success: function (data) {
              for(var i=0;i<data.data.length;i++){
                 $("#yitongguo").append(`<tr>
                 <td><div>${data.data[i].resourcename}</div></td>
                 <td>已通过</td>
                 <td><a><button class='down' id='${data.data[i].applyid}'>下载</button></a></td>
                 </tr>`);
              };
              $('.down').click(function() {
                 window.open(config.newip + config.newport+'/arcgis/PersonalCenter/Download?applyid='+$(this).attr('id'));
                 location.reload(); 
              });
              $("#myyitongguo").sPage({
                page:1,//当前页码，必填
                total:data.count,//数据总条数，必填
                pageSize:12,//每页显示多少条数据，默认10条
                totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                showTotal:true,//是否显示总条数，默认关闭：false
                showSkip:true,//是否显示跳页，默认关闭：false
                showPN:true,//是否显示上下翻页，默认开启：true
                prevPage:"上一页",//上翻页文字描述，默认“上一页”
                nextPage:"下一页",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                    //点击分页按钮回调函数，返回当前页码
                    $.ajax({
                      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=1&page='+page+'&limit=12&userid='+zhanghu1,
                      type: 'GET',
                      success: function (data){
                    $("#yitongguo").children().children().not(':first-child').remove();
                    for(var i=0;i<data.data.length;i++){
                      $("#yitongguo").append(`<tr>
                      <td><div>${data.data[i].resourcename}</div></td>
                      <td>已通过</td>
                      <td><a><button class='down' id='${data.data[i].applyid}'>下载</button></a></td>
                      </tr>`);
                   };
                   $('.down').click(function() {
                    window.open(config.newip + config.newport+'/arcgis/PersonalCenter/Download?applyid='+$(this).attr('id'));
                    location.reload(); 
                  });
                  }
                });
                }
              });
            }
          });
          $.ajax({
            url:config.newip + config.newport + '/arcgis/PersonalCenter/GetPersonList?states=2&page=1&limit=12&userid='+zhanghu1,
            type: 'GET',
            success: function (data) {
                for(var i=0;i<data.data.length;i++){
                   $("#yixiazai").append(`<tr>
                   <td><div>${data.data[i].resourcename}</div></td>
                   <td>已下载</td>
                   <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
                   </tr>`);
                };
                $("#myyixiazai").sPage({
                  page:1,//当前页码，必填
                  total:data.count,//数据总条数，必填
                  pageSize:12,//每页显示多少条数据，默认10条
                  totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                  showTotal:true,//是否显示总条数，默认关闭：false
                  showSkip:true,//是否显示跳页，默认关闭：false
                  showPN:true,//是否显示上下翻页，默认开启：true
                  prevPage:"上一页",//上翻页文字描述，默认“上一页”
                  nextPage:"下一页",//下翻页文字描述，默认“下一页”
                  backFun:function(page){
                      //点击分页按钮回调函数，返回当前页码
                      $.ajax({
                        url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=2&page='+page+'&limit=12&userid='+zhanghu1,
                        type: 'GET',
                        success: function (data){
                      $("#yixiazai").children().children().not(':first-child').remove();
                      for(var i=0;i<data.data.length;i++){
                        $("#yixiazai").append(`<tr>
                        <td><div>${data.data[i].resourcename}</div></td>
                        <td>已下载</td>
                        <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button class='down'>下载</button></a></td>
                        </tr>`);
                     };
                    }
                  });
                  }
                });
              }
            });
            $.ajax({
              url:config.newip + config.newport + '/arcgis/PersonalCenter/GetPersonList?states=-1&page=1&limit=12&userid='+zhanghu1,
              type: 'GET',
              success: function (data) {
                  for(var i=0;i<data.data.length;i++){
                     $("#yituihui").append(`<tr>
                     <td><div>${data.data[i].resourcename}</div></td>
                     <td>已退回</td>
                     </tr>`);
                  };
                  $("#myyituihui").sPage({
                    page:1,//当前页码，必填
                    total:data.count,//数据总条数，必填
                    pageSize:12,//每页显示多少条数据，默认10条
                    totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                    showTotal:true,//是否显示总条数，默认关闭：false
                    showSkip:true,//是否显示跳页，默认关闭：false
                    showPN:true,//是否显示上下翻页，默认开启：true
                    prevPage:"上一页",//上翻页文字描述，默认“上一页”
                    nextPage:"下一页",//下翻页文字描述，默认“下一页”
                    backFun:function(page){
                        //点击分页按钮回调函数，返回当前页码
                        $.ajax({
                          url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=-1&page='+page+'&limit=12&userid='+zhanghu1,
                          type: 'GET',
                          success: function (data){
                        $("#yituihui").children().children().not(':first-child').remove();
                        for(var i=0;i<data.data.length;i++){
                          $("#yituihui").append(`<tr>
                          <td><div>${data.data[i].resourcename}</div></td>
                          <td>已退回</td>
                          </tr>`);
                       };
                      }
                    });
                    }
                  });
                }
              });
};