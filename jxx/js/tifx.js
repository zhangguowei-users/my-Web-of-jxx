var zhanghu1;
var str;
var str_child;
var str_parent;
var nameone;
var area;
var option;
var json;
var nameche;
var count;
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
        url:config.ip + config.port + '/getAnalysisMenue',
        type: 'POST',
        async: false,
        xhrFields:{withCredentials:true},
        success:function(data){
               //形成树菜单
               treetjfx(data,".qtwo");
               $("#browser").treeview();
                //滑块移动事件
               huakuaiMove(".folder");
                //点击变色事件
               caidanChangeColor(".file");
                //点击查询
               queryCdtj(".fthree",".sthree","#browser",data);
        }
    });
    //地区信息
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
            $(".xz").html("&nbsp;" + name);
            if($(this).attr("class") == "file cd"){
               $(".cc1").css("display","none");
            };
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
  clitree();
//导出数据
$('#dcsj').on('click',function(){
  location.href = config.newip+config.newport+'/arcgis/Other/Export?jsontree='+json+'&exclename='+nameche;
});  
});