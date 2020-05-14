$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    $("#time1").html(newTime());
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
    $("#myPage").sPage({
      page:1,//当前页码，必填
      total:15,//数据总条数，必填
      pageSize:3,//每页显示多少条数据，默认10条
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
        $(".jtwo").html(`<div style="height: 81.5%;overflow: hidden;" id="ce">
        <table id="zy">
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
        </table> 
      </div>
      <div id="myPage" style="position: absolute;bottom:10%;left:20%;"></div>
      </div>`);
      }else{
        $(".jtwo").html(`<img src="./img/批注 2020-05-09 144616.png" alt="" style="width:100%;height:99.5%;">`);
        $("#btn").css("display","inline-block");
      };
      $("td button").click(function(){
        $("#css").css("display","inline-block");
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
    });
    $("td button").click(function(){
      $("#css").css("display","inline-block");
    });
    $("#daochu,#btn").click(function(){
      $("#css1").css("display","inline-block");
    });
    $("#tijiao1").click(function(){
      $("#css1").css("display","none");
      $("#css").css("display","none");
    });
    $("#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    
    });