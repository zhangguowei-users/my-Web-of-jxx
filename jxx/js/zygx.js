$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    $("#login").click(function(){
      PDclick();
    });
    $.ajax({
        url:config.ip + config.port + '/getMenue',
        type: 'POST',
        xhrFields:{withCredentials:true},
        success:function(data){
               //形成树菜单
               tree(data,".qone");
               $("#browser").treeview();
                //滑块移动事件
                huakuaiMove(".folder");
                //点击变色事件
                caidanChangeColor(".file");
                //点击查询
                $(".sone").click(function(){
                   var fone = $(".fone").val();
                   var sfqx = $(".file");
                   sfqx.css("color","black");
                   for(var i=0;i<sfqx.length;i++){
                      var Sumsfqx = sfqx.eq(i).html();
                      if(Sumsfqx.indexOf(fone) >= 0){
                         sfqx.eq(i).css("color","red");
                         //展开树型菜单方法
                         
                      };
                     }
                });
                //点击tree 获取id
                $(".folder,.file").click(function(){
                     var menueid = $(this).attr("menueid");
                     if(menueid == 1){
                        return;
                     }else{
                        $.ajax({
                           url:config.ip + config.port + '/getSecondCategory',
                           type: 'POST',
                           data:{menueid:menueid},
                           xhrFields:{withCredentials:true},
                           success:function(data){
<<<<<<< HEAD
                                function pushArry(arr){
                                   var gloArr = [];
                                   for(var i=0;i<arr.length;i++){
                                      if(arr[i].secondcategory == null){ 
                                          continue;
                                       };
                                       var abc = {firstcategoryCode:arr[i].firstcategory,secondcategoryCode:arr[i].secondcategory,secondcategoryName:arr[i].menuename};
                                       gloArr.push(abc);
                                      if(arr[i].subMenue.length != 0){
                                        pushArry(arr[i].subMenue);                                      
                                      };
                                   };
                                   return gloArr;
                                };
                               var gloArr = pushArry(data);

                               globalQueryClass.queryByFindTask();

                              
=======
                              console.log(pushArry(data));
>>>>>>> 7252a55dfb1f79c33bf31a0b5a9464c9c963ae64
                           }
                        });
                     };
                  });
                  //
        }
    });
    });