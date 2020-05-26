var zhanghu1;
var applyid;
$(document).ready(function(){
    dengluLocation();
    shy();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    huakuaiMove(".btn-tree");
    //操作菜单
    $(".btn-tree").click(function(){
      $("#zy,#zy1,#zy2,#zy3,#delete,#delete1,#quxiaosh,#fanhuish,#myPage,#myPage1,#myPage2,#shenheyemian").css("display","none");
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
       $("#delete1").css("display","inline-block");
       $("#fanhuish").css("display","inline-block");
       $("#myPage2").css("display","block");
       $(".middle1 div").html($(this).html());
     }else if($(this).html() == "审核情况分析"){
       $("#zy3").css("display","table");
       $(".middle1 div").html($(this).html());
     };
   });
    //table同步加载(管理员)
    $.ajax({
      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=0&page=1&limit=16',
      type: 'GET',
      async: false,
      success: function (data){
        for(var i=0;i<data.data.length;i++){
          $("#zy").append(`<tr>
                           <td>${data.data[i].name}</td>
                           <td>${data.data[i].depname}</td>
                           <td>${data.data[i].postname}</td>
                           <td><div>${data.data[i].applyreason}</div></td>
                           <td>${data.data[i].phone}</td>
                           <td>${data.data[i].applytime.split("T")[0]}</td>
                           <td>已申请</td>
                           <td><button class="shenhe" id="${data.data[i].applyid}">审核</button></td>
                           </tr>`);             
        };
        $("#myPage").sPage({
          page:1,//当前页码，必填
          total:data.count,//数据总条数，必填
          pageSize:16,//每页显示多少条数据，默认10条
          totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
          showTotal:true,//是否显示总条数，默认关闭：false
          showSkip:true,//是否显示跳页，默认关闭：false
          showPN:true,//是否显示上下翻页，默认开启：true
          prevPage:"上一页",//上翻页文字描述，默认“上一页”
          nextPage:"下一页",//下翻页文字描述，默认“下一页”
          backFun:function(page){
              //点击分页按钮回调函数，返回当前页码
              $.ajax({
                url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=0&page='+page+'&limit=16',
                type: 'GET',
                async: false,
                success: function (data){
                  $("#zy").children().not(':first-child').remove();
                  for(var i=0;i<data.data.length;i++){
                    $("#zy").append(`<tr>
                                     <td>${data.data[i].name}</td>
                                     <td>${data.data[i].depname}</td>
                                     <td>${data.data[i].postname}</td>
                                     <td><div>${data.data[i].applyreason}</div></td>
                                     <td>${data.data[i].phone}</td>
                                     <td>${data.data[i].applytime.split("T")[0]}</td>
                                     <td>已申请</td>
                                     <td><button class="shenhe" id="${data.data[i].applyid}">审核</button></td>
                                     </tr>`);
                  };
                }
              });  
          }
        }); 
      }
    });
    $.ajax({
      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=1&page=1&limit=16',
      type: 'GET',
      async: false,
      success: function (data){
        console.log(data.data);
        for(var i=0;i<data.data.length;i++){
          $("#zy1").append(`<tr>
          <td><input class='yishenhe333' type="checkbox" name="yishenhe" value="${data.data[i].applyid}" /></td>
          <td>${data.data[i].name}</td>
          <td>${data.data[i].depname}</td>
          <td>${data.data[i].postname}</td>
          <td><div>${data.data[i].applyreason}</div></td>
          <td>${data.data[i].phone}</td>
          <td>${data.data[i].applytime.split("T")[0]}</td>
          <td>已审核</td>
        </tr>`)
        };
        
        $("#myPage1").sPage({
          page:1,//当前页码，必填
          total:data.count,//数据总条数，必填
          pageSize:16,//每页显示多少条数据，默认10条
          totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
          showTotal:true,//是否显示总条数，默认关闭：false
          showSkip:true,//是否显示跳页，默认关闭：false
          showPN:true,//是否显示上下翻页，默认开启：true
          prevPage:"上一页",//上翻页文字描述，默认“上一页”
          nextPage:"下一页",//下翻页文字描述，默认“下一页”
          backFun:function(page){
              //点击分页按钮回调函数，返回当前页码
              $.ajax({
                url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=1&page='+page+'&limit=16',
                type: 'GET',
                async: false,
                success: function (data){
                  $("#zy1").children().not(':first-child').remove();
                  for(var i=0;i<data.data.length;i++){
                    $("#zy1").append(`<tr>
                    <td><input class='yishenhe333' type="checkbox" name="yishenhe" value="${data.data[i].applyid}" /></td>
                    <td>${data.data[i].name}</td>
                    <td>${data.data[i].depname}</td>
                    <td>${data.data[i].postname}</td>
                    <td><div>${data.data[i].applyreason}</div></td>
                    <td>${data.data[i].phone}</td>
                    <td>${data.data[i].applytime.split("T")[0]}</td>
                    <td>已审核</td>
                    </tr>`);
                  };
                }
              });  
          }
        });
      }  
    });
    $.ajax({
      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=-1&page=1&limit=16',
      type: 'GET',
      async: false,
      success: function (data){
        
        for(var i=0;i<data.data.length;i++){
          $("#zy2").append(`<tr>
          <td><input class='yituihui333' type="checkbox" name="yituihui" value="${data.data[i].applyid}" /></td>
          <td>${data.data[i].name}</td>
          <td>${data.data[i].depname}</td>
          <td>${data.data[i].postname}</td>
          <td><div>${data.data[i].applyreason}</div></td>
          <td>${data.data[i].phone}</td>
          <td>${data.data[i].applytime.split("T")[0]}</td>
          <td>已审核</td>
        </tr>`)
        };
        $("#myPage2").sPage({
          page:1,//当前页码，必填
          total:data.count,//数据总条数，必填
          pageSize:16,//每页显示多少条数据，默认10条
          totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
          showTotal:true,//是否显示总条数，默认关闭：false
          showSkip:true,//是否显示跳页，默认关闭：false
          showPN:true,//是否显示上下翻页，默认开启：true
          prevPage:"上一页",//上翻页文字描述，默认“上一页”
          nextPage:"下一页",//下翻页文字描述，默认“下一页”
          backFun:function(page){
              //点击分页按钮回调函数，返回当前页码
              $.ajax({
                url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=-1&page='+page+'&limit=16',
                type: 'GET',
                async: false,
                success: function (data){
                  $("#zy2").children().not(':first-child').remove();
                  for(var i=0;i<data.data.length;i++){
                    $("#zy1").append(`<tr>
                    <td><input class='yituihui333' type="checkbox" name="yituihui" value="${data.data[i].applyid}" /></td>
                    <td>${data.data[i].name}</td>
                    <td>${data.data[i].depname}</td>
                    <td>${data.data[i].postname}</td>
                    <td><div>${data.data[i].applyreason}</div></td>
                    <td>${data.data[i].phone}</td>
                    <td>${data.data[i].applytime.split("T")[0]}</td>
                    <td>已审核</td>
                    </tr>`);
                  };
                }
              });  
          }
        });
      }  
    });
    //打开审核页面获取值                 
    $("td .shenhe").click(function(){
      applyid = $(this).attr("id");
      $("#time123").val($(this).parent().prev().prev().html());
      $("#phone123").val($(this).parent().prev().prev().prev().html());
      $("#shenqingyongtu123").val($(this).parent().prev().prev().prev().prev().children("div").html());
      $("#zhiwei123").val($(this).parent().prev().prev().prev().prev().prev().html());
      $("#shenqingbumen123").val($(this).parent().prev().prev().prev().prev().prev().prev().html());
      $("#shenqingren123").val($(this).parent().prev().prev().prev().prev().prev().prev().prev().html());
        $("#zy").css("display","none");
        $("#myPage").css("display","none");
        $("#shenheyemian").css("display","block");
     });  
    //打开审核页面与审核通过或退回
    $("#tuihui").click(function(){
      var yuanyin = $("#shenheyijian123").val();
        $.ajax({
          url:config.newip + config.newport + '/arcgis/PersonalCenter/Examine',
          type:'POST',
          data:{applyid:applyid,states:-1,reson:yuanyin},
          success:function(data){
            alert(data.msg);
            $("#shenheyemian").css("display","none");  
            $("#zy").css("display","");
            $("#myPage").css("display","");
          }
        });
       });
       $("#shenhetongguo").click(function(){
        var yuanyin = $("#shenheyijian123").val();
        $.ajax({
          url:config.newip + config.newport + '/arcgis/PersonalCenter/Examine',
          type:'POST',
          data:{applyid:applyid,states:1,reson:yuanyin},
          success:function(data){
            alert(data.msg);
            $("#shenheyemian").css("display","none");  
            $("#zy").css("display","");
            $("#myPage").css("display","");
          }
        });
       });
    //批量删除
    $("#delete").bind("click",function(){
      var c= new Array();
      var a = $(".yishenhe333:checked");
      for(let i=0;i<a.length;i++){
        c.push(parseInt(a.eq(i).val()));
      }
      $.ajax({
        url:config.newip + config.newport + '/arcgis/PersonalCenter/OperationBatch',
        type:'POST',
        data:{applyids:c,states:2},
        success:function(data){
          alert(data.msg);
        }
      });
    });
     //批量取消审核
     $("#quxiaosh").bind("click",function(){
      var c= new Array();
      var a = $(".yishenhe333:checked");
      for(let i=0;i<a.length;i++){
        c.push(parseInt(a.eq(i).val()));
      }
      $.ajax({
        url:config.newip + config.newport + '/arcgis/PersonalCenter/OperationBatch',
        type:'POST',
        data:{applyids:c,states:1},
        success:function(data){
          alert(data.msg);
        }
      });
    });
    //批量删除已退回
    $("#delete1").bind("click",function(){
      var c= new Array();
      var a = $(".yituihui333:checked");
      for(let i=0;i<a.length;i++){
        c.push(parseInt(a.eq(i).val()));
      }
      $.ajax({
        url:config.newip + config.newport + '/arcgis/PersonalCenter/OperationBatch',
        type:'POST',
        data:{applyids:c,states:2},
        success:function(data){
          alert(data.msg);
        }
      });
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
              $.ajax({
                url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=1&page='+page+'&limit=12&userid='+zhanghu1,
                type: 'GET',
                success: function (data){
              $("#yitongguo").children().not(':first-child').remove();
              for(var i=0;i<data.data.length;i++){
                $("#yitongguo").append(`<tr>
                <td><div>${data.data[i].resourcename}</div></td>
                <td>已通过</td>
                <td><a><button>下载</button></a></td>
                </tr>`);
             };
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
                $.ajax({
                  url:config.newip + config.newport + '/arcgis/PersonalCenter/GetManageList?states=2&page='+page+'&limit=12&userid='+zhanghu1,
                  type: 'GET',
                  success: function (data){
                $("#yixiazai").children().not(':first-child').remove();
                for(var i=0;i<data.data.length;i++){
                  $("#yixiazai").append(`<tr>
                  <td><div>${data.data[i].resourcename}</div></td>
                  <td>已下载</td>
                  <td><a><button>下载</button></a></td>
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