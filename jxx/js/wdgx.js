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
    huakuaiMove(".btn-tree");
    $(".wendang").click(function(){
     $(".jfour").html(`<img src="./img/批注 2020-05-09 160919.png" alt="" style="width:100%;height:99%">`);
     $("#btn-wendang").css("display","inline-block");
    });
    $(".btn-tree").click(function(){
      $(".jfour").html(`<table id="zx">
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
    </table>`);
    $(".wendang").click(function(){
      $(".jfour").html(`<img src="./img/批注 2020-05-09 160919.png" alt="" style="width:100%;height:99%">`);
      $("#btn-wendang").css("display","inline-block");
     });
    });
    $("#btn-wendang").click(function(){
      $("#css1").css("display","inline-block");
     });
     $("#tijiao1,#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    });