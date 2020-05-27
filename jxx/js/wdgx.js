var zhanghu1;
$(document).ready(function(){
    dengluLocation();
    huoquName();
    //个人中心数据加载
    $.ajax({
      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetPersonList?states=0&page=1&limit=12&userid='+zhanghu1,
      type: 'GET',
      success: function (data) {
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
                    $("#shenheing").children().not(':first-child').remove();
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
           <td><a href='${config.imgip+config.imgport+data.data[i].url}' download='${data.data[i].resourcename}.jpg'><button class='down' id='${data.data[i].applyid}'>下载</button></a></td>
           </tr>`);
        };
        //点击button
        $(".down").bind("click",function(){
           var id = $(this).attr("id");
           $.ajax({
            url:config.newip + config.newport + '/arcgis/PersonalCenter/Download?applyid='+id,
            type: 'GET',
            success:function(data){
              alert(data.msg);
            }
           });
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
              $("#yitongguo").children().not(':first-child').remove();
              for(var i=0;i<data.data.length;i++){
                $("#yitongguo").append(`<tr>
                <td><div>${data.data[i].resourcename}</div></td>
                <td>已通过</td>
                <td><a href='${config.imgip+config.imgport+data.data[i].url}' download='${data.data[i].resourcename}.jpg'><button>下载</button></a></td>
                </tr>`);
             };
             //点击button
             $(".down").bind("click",function(){
             var id = $(this).attr("id");
             $.ajax({
             url:config.newip + config.newport + '/arcgis/PersonalCenter/Download?applyid='+id,
             type: 'GET',
             success:function(data){
               alert(data.msg);
             }
            });
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
             <td><a href='${config.imgip+config.imgport+data.data[i].url}' download='${data.data[i].resourcename}.jpg'><button>下载</button></a></td>
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
                $("#yixiazai").children().not(':first-child').remove();
                for(var i=0;i<data.data.length;i++){
                  $("#yixiazai").append(`<tr>
                  <td><div>${data.data[i].resourcename}</div></td>
                  <td>已下载</td>
                  <td><a href='${config.imgip+config.imgport+data.data[i].url}' download='${data.data[i].resourcename}.jpg'><button>下载</button></a></td>
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
                  $("#yituihui").children().not(':first-child').remove();
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
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    $("#login").click(function(){
        PDclick();
      });
    $("#time1").html(newTime());
    //   $.ajax({
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
    $("#myPage").sPage({
      page:1,//当前页码，必填
      total:150,//数据总条数，必填
      pageSize:10,//每页显示多少条数据，默认10条
      totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
      showTotal:true,//是否显示总条数，默认关闭：false
      showSkip:true,//是否显示跳页，默认关闭：false
      showPN:true,//是否显示上下翻页，默认开启：true
      prevPage:"上一页",//上翻页文字描述，默认“上一页”
      nextPage:"下一页",//下翻页文字描述，默认“下一页”
      backFun:function(page){
          //点击分页按钮回调函数，返回当前页码
          console.log(page);
      }
    });
    huakuaiMove(".btn-tree");
    $(".wendang").click(function(){
     $(".jfour").html(`<img src="./img/批注 2020-05-09 160919.png" alt="" style="width:100%;height:99%">`);
     $("#btn-wendang").css("display","inline-block");
    });
    $(".btn-tree").click(function(){
      if($(this).html() == "技术标准"){
        $("#btn-wendang").css("display","none");
        $(".jfour").html(`<div style="height: 85.5%;overflow: hidden;" id="ce">
      <table id="zx">
      <tr>
      <th>文档格式</th>
      <th>名称</th>
      <th>创建部门</th>
      <th>创建时间</th>
    </tr>
    <tr class="wendang">
      <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
      <td>国土调查数据库标准</td>
      <td>集贤县自然资源信息中心</td>
      <td>2018-12-13</td>
    </tr>
    <tr class="wendang">
        <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
        <td>黑龙江省第三次国土调查技术细则（征求意见稿）0215</td>
        <td>集贤县自然资源信息中心</td>
        <td>2018-02-15</td>
      </tr>
      <tr class="wendang">
        <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
        <td>(230521)永久基本农田现状情况统计表</td>
        <td>集贤县自然资源信息中心</td>
        <td>2020-2-25</td>
      </tr>
      <tr class="wendang">
        <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
        <td>(230521)第三次国土调查成果分析报告</td>
        <td>集贤县自然资源信息中心</td>
        <td>2120-2-21</td>
      </tr>
        </table>
      </div>
      <div id="myPage" style="position: absolute;bottom:5%;left:20%;"></div>`);
    $(".wendang").click(function(){
      $(".jfour").html(`<img src="./img/批注 2020-05-09 160919.png" alt="" style="width:100%;height:99%">`);
      $("#btn-wendang").css("display","inline-block");
     });
     $("#myPage").sPage({
      page:1,//当前页码，必填
      total:150,//数据总条数，必填
      pageSize:10,//每页显示多少条数据，默认10条
      totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
      showTotal:true,//是否显示总条数，默认关闭：false
      showSkip:true,//是否显示跳页，默认关闭：false
      showPN:true,//是否显示上下翻页，默认开启：true
      prevPage:"上一页",//上翻页文字描述，默认“上一页”
      nextPage:"下一页",//下翻页文字描述，默认“下一页”
      backFun:function(page){
          //点击分页按钮回调函数，返回当前页码
          console.log(page);
      }
      });
      }else if($(this).html() == "工作报告"){
        $("#btn-wendang").css("display","none");
        $(".jfour").html(`<div style="height: 85.5%;overflow: hidden;" id="ce">
      <table id="zx">
          <tr>
            <th>文档格式</th>
            <th>名称</th>
            <th>创建部门</th>
            <th>创建时间</th>
          </tr>
          <tr class="wendang">
            <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
            <td>黑龙江省第三次国土调查技术细则（征求意见稿）0215</td>
            <td>集贤县自然资源信息中心</td>
            <td>2018-02-15</td>
          </tr>
          <tr class="wendang">
            <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
            <td>(230521)第三次国土调查数据库建设报告</td>
            <td>集贤县自然资源信息中心</td>
            <td>2120-2-03</td>
          </tr>
          <tr class="wendang">
            <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
            <td>(230521)飞入地城镇村及工矿用地面积汇总表</td>
            <td>集贤县自然资源信息中心</td>
            <td>2020-2-05</td>
          </tr>
        </table>
      </div>
      <div id="myPage" style="position: absolute;bottom:5%;left:20%;"></div>`);
    $(".wendang").click(function(){
      $(".jfour").html(`<img src="./img/批注 2020-05-09 160919.png" alt="" style="width:100%;height:99%">`);
      $("#btn-wendang").css("display","inline-block");
     });
     $("#myPage").sPage({
      page:1,//当前页码，必填
      total:150,//数据总条数，必填
      pageSize:10,//每页显示多少条数据，默认10条
      totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
      showTotal:true,//是否显示总条数，默认关闭：false
      showSkip:true,//是否显示跳页，默认关闭：false
      showPN:true,//是否显示上下翻页，默认开启：true
      prevPage:"上一页",//上翻页文字描述，默认“上一页”
      nextPage:"下一页",//下翻页文字描述，默认“下一页”
      backFun:function(page){
          //点击分页按钮回调函数，返回当前页码
          console.log(page);
      }
      });
      }else if($(this).html() == "其他文档"){
        $("#btn-wendang").css("display","none");
        $(".jfour").html(`<div style="height: 85.5%;overflow: hidden;" id="ce">
      <table id="zx">
          <tr>
            <th>文档格式</th>
            <th>名称</th>
            <th>创建部门</th>
            <th>创建时间</th>
          </tr>
          <tr class="wendang">
            <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
            <td>黑龙江省第三次国土调查技术细则（征求意见稿）0215</td>
            <td>集贤县自然资源信息中心</td>
            <td>2018-02-15</td>
          </tr>
          <tr class="wendang">
            <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
            <td>(230521)第三次国土调查技术报告</td>
            <td>集贤县自然资源信息中心</td>
            <td>2120-2-13</td>
          </tr>
          <tr class="wendang">
            <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
            <td>(230521)可调整地类面积汇总表</td>
            <td>集贤县自然资源信息中心</td>
            <td>2020-5-21</td>
          </tr>
        </table>
      </div>
      <div id="myPage" style="position: absolute;bottom:5%;left:20%;"></div>`);
    $(".wendang").click(function(){
      $(".jfour").html(`<div style="display:inline-block;width:100%;height:99%;text-align:center;font-size:xx-large;">私密文档不可用！！！请下载后进行查看</div>`);
      $("#btn-wendang").css("display","inline-block");
     });
     $("#myPage").sPage({
      page:1,//当前页码，必填
      total:150,//数据总条数，必填
      pageSize:10,//每页显示多少条数据，默认10条
      totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
      showTotal:true,//是否显示总条数，默认关闭：false
      showSkip:true,//是否显示跳页，默认关闭：false
      showPN:true,//是否显示上下翻页，默认开启：true
      prevPage:"上一页",//上翻页文字描述，默认“上一页”
      nextPage:"下一页",//下翻页文字描述，默认“下一页”
      backFun:function(page){
          //点击分页按钮回调函数，返回当前页码
          console.log(page);
      }
      });
      }
      
    });
    $("#btn-wendang").click(function(){
      $("#css1").css("display","inline-block");
     });
     $("#tijiao1,#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    });