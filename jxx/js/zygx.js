$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    var right = "";
    var left ="";
    $("#login").click(function(){
      PDclick();
    });
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
          $(".cc1").append(`<ul><li class="closed" id="jxx2"><span class="folder cd1" id="jxx1" menueid='{"name":"jxx"}'>集贤县</span></li></ul>`);
          bianliDF(data,"#jxx2");
          $(".cc1").treeview();
          caidanChangeColor(".cd,.cd1");
          $(".cd1, .cd").click(function(){
          var name = $(this).html();
          var id = JSON.parse($(this).attr("menueid"));
          right = JSON.parse($(this).attr("menueid"));
          $(".xz").html(name);
          //获取点击的信息
          console.log(id);
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
});