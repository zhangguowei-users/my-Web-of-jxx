$(document).ready(function(){
    dengluLocation();
    shy();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    huakuaiMove(".btn-tree");
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
    $(".btn-tree").click(function(){
       $("#zy,#zy1,#zy2,#zy3,#delete,#quxiaosh,#fanhuish,#myPage,#myPage1,#myPage2").css("display","none");
       if($(this).html() == "待审核"){
         $("#zy").css("display","table");
         $("#myPage").css("display","block");
         $(".middle1 div").html($(this).html());
       }else if($(this).html() == "已审核"){
         $("#zy1").css("display","table");
         $("#delete").css("display","inline-block");
         $("#quxiaosh").css("display","inline-block");
         $("#myPage1").css("display","block");
         $(".middle1 div").html($(this).html());
       }else if($(this).html() == "退回表单"){
        $("#zy2").css("display","table");
        $("#delete").css("display","inline-block");
        $("#fanhuish").css("display","inline-block");
        $("#myPage2").css("display","block");
        $(".middle1 div").html($(this).html());
      }else if($(this).html() == "审核情况分析"){
        $("#zy3").css("display","table");
        $(".middle1 div").html($(this).html());
      };
    });
    $("td .shenhe").click(function(){
        $("#zy").css("display","none");
        $("#myPage").css("display","none");
        $("#shenheyemian").css("display","block");
    });
    $("#shenhetongguo,#tuihui").click(function(){
        $("#shenheyemian").css("display","none");  
        $("#zy").css("display","");
        $("#myPage").css("display","");
       });
    //打开关闭个人中心
    $("#login").bind("click",function(){
        $("#css1").css('display','inline-block');
    });
    $("#gb-p1").bind("click",function(){
        $("#css1").css('display','none');
    });
    //个人中心数据加载
    $.ajax({
      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=0&page=1&limit=12',
      type: 'GET',
      success: function (data) {
          for(var i=0;i<data.data.length;i++){
             $("#shenheing").append(`<tr>
             <td><div>${data.data[i].applyreason}</div></td>
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
                  url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=0&page='+page+'&limit=12',
                  type: 'GET',
                  success: function (data){
                    $("#shenheing").children().not(':first-child').remove();
                    for(var i=0;i<data.data.length;i++){
                      $("#shenheing").append(`<tr>
                      <td><div>${data.data[i].applyreason}</div></td>
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
    url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=1&page=1&limit=12',
    type: 'GET',
    success: function (data) {
        console.log(data);
        for(var i=0;i<data.data.length;i++){
           $("#yitongguo").append(`<tr>
           <td><div>${data.data[i].applyreason}</div></td>
           <td>已通过</td>
           <td><a><button>下载</button></a></td>
           </tr>`);
        };
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
              $("#yitongguo").children().not(':first-child').remove();
              for(var i=0;i<data.data.length;i++){
                $("#yitongguo").append(`<tr>
                <td><div>${data.data[i].applyreason}</div></td>
                <td>已通过</td>
                <td><a><button>下载</button></a></td>
                </tr>`);
             };
          }
        });
      }
    });
    $.ajax({
      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=2&page=1&limit=12',
      type: 'GET',
      success: function (data) {
          console.log(data);
          for(var i=0;i<data.data.length;i++){
             $("#yixiazai").append(`<tr>
             <td><div>${data.data[i].applyreason}</div></td>
             <td>已下载</td>
             <td><a><button>下载</button></a></td>
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
                console.log(page);
                $("#yixiazai").children().not(':first-child').remove();
                for(var i=0;i<data.data.length;i++){
                  $("#yixiazai").append(`<tr>
                  <td><div>${data.data[i].applyreason}</div></td>
                  <td>已下载</td>
                  <td><a><button>下载</button></a></td>
                  </tr>`);
               };
            }
          });
        }
      });
      $.ajax({
        url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=-1&page=1&limit=12',
        type: 'GET',
        success: function (data) {
            console.log(data);
            for(var i=0;i<data.data.length;i++){
               $("#yituihui").append(`<tr>
               <td><div>${data.data[i].applyreason}</div></td>
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
                  console.log(page);
                  $("#yituihui").children().not(':first-child').remove();
                  for(var i=0;i<data.data.length;i++){
                    $("#yituihui").append(`<tr>
                    <td><div>${data.data[i].applyreason}</div></td>
                    <td>已退回</td>
                    </tr>`);
                 };
              }
            });
          }
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
    });