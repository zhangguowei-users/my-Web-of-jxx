var right = {id:0, subAdministrations:null, name: "集贤县", parentId: 0, treeCode: "000000"};
var left = "";
$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName(); 
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