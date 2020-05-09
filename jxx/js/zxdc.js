$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    $("#login").click(function(){
        PDclick();
      });
      $("#quxiao").click(function(){
       $("#css").css("display","none");
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
    $.ajax({
      url:config.ip + config.port + '/getAdministration',
      type: 'POST',
      async: false,
      xhrFields:{withCredentials:true},
      success:function(data){
        option(data,".xz1");
      }
    });
    huakuaiMove(".btn-tree");
    $(".btn-tree").click(function(){
      if($(this).html() == "专项资源共享"){
        $(".jtwo").html(`<table id="zy">
        <tr>
          <th>资源图</th>
          <th>资源类型</th>
          <th>资源分布</th>
          <th>发布机构</th>
          <th>发布时间</th>
          <th>操作</th>
        </tr>
        <tr>
          <td><img class="img-zxdc" src="./img/ex.png" alt=""></td>
          <td>集贤县工业用地分布图</td>
          <td>空间分布图</td>
          <td>集贤县自然资源信息中心</td>
          <td>2120-2-25</td>
          <td><button>下载</button></td>
        </tr>
        <tr>
            <td><img class="img-zxdc" src="./img/ex.png" alt=""></td>
            <td>集贤县工业用地分布图</td>
            <td>空间分布图</td>
            <td>集贤县自然资源信息中心</td>
            <td>2120-2-25</td>
            <td><button>下载</button></td>
          </tr>
      </table>  `)
      }else{
        $(".jtwo").html(`<img src="./img/批注 2020-05-09 144616.png" alt="" style="width:100%;height:99.5%;">`);
        $("#btn").css("display","inline-block");
      };
      $("td button").click(function(){
        $("#css").css("display","inline-block");
      });
    });
    $("td button").click(function(){
      $("#css").css("display","inline-block");
    });
    $("#daochu,#btn").click(function(){
      $("#css1").css("display","inline-block");
    });
    $("#tijiao1,#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    });