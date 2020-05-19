$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    $("#login").click(function(){
        PDclick();
      });
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
            <td>永久基本农田现状统计表</td>
            <td>集贤县自然资源信息中心</td>
            <td>2120-2-25</td>
          </tr>
          <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
            </tr>
            <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
            </tr>
            <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
            </tr>
    
            <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
            </tr>
            <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
            </tr>
            <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
            </tr>
            <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
            </tr>
            <tr class="wendang">
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>永久基本农田现状统计表</td>
              <td>集贤县自然资源信息中心</td>
              <td>2120-2-25</td>
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
            <td>永久基本农田现状统计表</td>
            <td>集贤县自然资源信息中心</td>
            <td>2120-2-25</td>
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
        $(".jfour").html(`<div style="height: 85.5%;overflow: hidden;" id="ce">
      <table id="zx">
          <tr>
            <th>文档格式</th>
            <th>名称</th>
            <th>创建部门</th>
            <th>创建时间</th>
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
      }
      
    });
    $("#btn-wendang").click(function(){
      $("#css1").css("display","inline-block");
     });
     $("#tijiao1,#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    });