var zhanghu1;
$(document).ready(function(){
    dengluLocation();
    huoquName();
   //个人中心数据加载
   jiazaigeren();
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
               tree(data,".qtwo");
               $("#browser").treeview();
                //滑块移动事件
               huakuaiMove(".folder");
                //点击变色事件
               caidanChangeColor(".file");
                //点击查询
               queryCd(".ftwo",".stwo","#browser",data);
        }
    });
    //滑块
    $( function() {
      $( "#slider" ).slider({
        value:2009,
        min:2009,
        max:2019,
        step:1,
        slide: function(event, ui){
          $( "#amount" ).val(ui.value);
          console.log(ui.value);
        }
      });
      $("#amount").val($("#slider").slider("value"));
      console.log($("#slider").slider("value"));
    });
    $( function() {
      $( "#slider1" ).slider({
        value:2012,
        min:2009,
        max:2019,
        step:1,
        slide: function(event, ui){
          $( "#amount1" ).val(ui.value);
          console.log(ui.value);
        }
      });
      $("#amount1").val($("#slider1").slider("value"));
      console.log($("#slider1").slider("value"));
    });
    //测试
    $.ajax({
      url:config.ip + config.port + '/getAdministration',
      type: 'POST',
      async: false,
      xhrFields:{withCredentials:true},
      success:function(data){
        option(data,".xz1")
      }
    })
    });