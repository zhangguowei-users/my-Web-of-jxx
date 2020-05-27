var right = {id:0, subAdministrations:null, name: "集贤县", parentId: 0, treeCode: "000000"};
var left = "";
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
    $.ajax({
        url:config.ip + config.port + '/getMenue',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
               //形成树菜单
               tree(data,".qone");
               $("#browser").treeview();
                //滑块移动事件
               huakuaiMove(".dcd1");
                //点击变色事件
               caidanChangeColor(".dcd");
                //点击查询
               queryCd(".fone",".sone","#browser",data);
                //点击tree 获取id
               clicktreeById();
        }
    });
    $("#gb-p1").click(function(){
      $(".theone").css("display","none");
    });
$("#gb-bing").click(function(){
  $(".bing").css("display","none");
});
$("#gb-zhu").click(function(){
  $(".zhu").css("display","none");
});
tishi();
$.ajax({
    url:config.ip + config.port + '/getAdministration',
    type: 'POST',
    async: false,
    xhrFields:{withCredentials:true},
    success:function(data){
      $(".xz").click(function(){
        var display = $(".cc1").css("display");
        if(display == "none"){
          $(".cc1").children().remove();
          $(".cc1").append(`<ul><li class="closed" id="jxx2"><span class="folder cd1" id="jxx1" menueid='{"id":0, "subAdministrations":null, "name": "集贤县", "parentId": 0, "treeCode": "000000"}'>集贤县</span></li></ul>`);
          bianliDF(data,"#jxx2");
          $(".cc1").treeview();
          caidanChangeColor(".cd,.cd1");
          $(".cd1, .cd").click(function(){
          var name = $(this).html();
          var id = JSON.parse($(this).attr("menueid"));
          right = id;
          $(".xz").html("&nbsp;" + name);
          if($(this).attr("class") == "file cd"){
             $(".cc1").css("display","none");
          };

            xzqExtent(id);//左侧树，行政区导航


          });
          $(".cc1").css("display","inline-block");
          }else{
          $(".cc1").css("display","none");
         };
       });
       $(function gbright(){
        $(".xz,.cc1").click(function(event){
            event.stopPropagation();
        });
        $(document).click(function(){
            $(".cc1").css("display","none");
        });
    });
    }
});
$("#gb-quanbu-bing").click(function(){
  $(".quanbu-bing").css("display","none");
});
$("#gb-quanbu-zhu").click(function(){
  $(".quanbu-zhu").css("display","none");
});
});