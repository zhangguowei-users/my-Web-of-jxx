var right = {id:0, subAdministrations:null, name: "集贤县", parentId: 0, treeCode: "000000"};
var left = "";
var zhanghu1;
var arry=0;
var brry=0;
$(document).ready(function(){
    dengluLocation();
    huoquName();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    tuichudenglu(); 
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
  arry = 0;
  $(".bing").css("display","none");
  arry = 1
  if(brry==1){
    $(".map01_35").attr("class","map_35");
    brry = 0;
    arry = 0;
  };
});
$("#gb-zhu").click(function(){
  brry = 0;
  $(".zhu").css("display","none");
  brry = 1;
  if(arry==1){
    $(".map01_35").attr("class","map_35");
    arry=0;
    brry = 0;
  };
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
//改变编辑地块按钮
$("#yc").mousedown(function(ev){ //移除地块
  $("#yc").removeClass("map30");
  $("#yc").attr("src","./img/移除图像1.png");
    removeGraphics(globalQueryClass.map, DRAWGRAPHICS);//移除画好的几何图形
});
$("#yc").mouseup(function(ev){
  $("#yc").removeClass("map30");
  $("#yc").attr("src","./img/移除图像.png");
});
$("#bj").click(function(){  //编辑地块
  $("#bj").removeClass("map30");
  if($("#bj").attr("src") == "./img/编辑.png"){
      $("#bj").attr("src","./img/编辑1.png");
      editPolygon(DRAWGRAPHICS,globalQueryClass.map,globalQueryClass.Edit,globalQueryClass.Point,globalQueryClass.TextSymbol,globalQueryClass.Font,globalQueryClass.Color,globalQueryClass.Graphic,globalQueryClass.graphicsLayer);//编辑地图
  }else{
      $("#bj").attr("src","./img/编辑.png");
      removeEditToolbar();//取消地图编辑
  };
});
$("#sf").click(function(){  //缩放地块
  $("#sf").removeClass("map30");
  if($("#sf").attr("src") == "./img/缩放地块.png"){
      $("#sf").attr("src","./img/缩放地块1.png");
      
      changeSizeGraphics(DRAWGRAPHICS,globalQueryClass.Edit);//缩放图形
  }else{
      $("#sf").attr("src","./img/缩放地块.png");
      removeEditToolbar();//取消地图缩放
  };
});
$("#xz123").click(function(){  //旋转地块
  $("#xz123").removeClass("map30");
  if($("#xz123").attr("src") == "./img/旋转地块.png"){
      $("#xz123").attr("src","./img/旋转地块1.png");
      rotateGraphic(DRAWGRAPHICS, globalQueryClass.Edit);//旋转图形
  }else{
      $("#xz123").attr("src","./img/旋转地块.png");
      removeEditToolbar();//取消地图缩放
  };
});
$("#jlcl").click(function(){  //测量距离
  $("#jlcl").removeClass("map30");
  if($("#jlcl").attr("src") == "./img/测量.png"){
      $("#jlcl").attr("src","./img/测量1.png");
      drawPolyline(globalQueryClass.Draw,globalQueryClass.map,globalQueryClass.SimpleLineSymbol,globalQueryClass.SimpleFillSymbol,globalQueryClass.Color,globalQueryClass.Graphic,globalQueryClass.on,globalQueryClass.Point,globalQueryClass.TextSymbol,globalQueryClass.Font,globalQueryClass.graphicsLayer);//画线图形
  }else{
      $("#jlcl").attr("src","./img/测量.png");
      removeToolbarDrao();
  };
});
});