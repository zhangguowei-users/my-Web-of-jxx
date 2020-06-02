var zhanghu1;
var applyid;
$(document).ready(function(){
    dengluLocation();
    $("#inf-namenow-time").html(newTime());
    huoquName();
    tiaozhuan();
    huakuaiMove(".btn-tree");
       //部门tree下拉菜单
       $('#bumen').bind('click',function(){
        if($('#set-bumen').css('display') == 'none'){
          $('#set-bumen').css('display','inline-block');
        }else{
          $('#set-bumen').css('display','none');
        }
      });
      $(function(){
        $("#bumen,#set-bumen").click(function(event){
            event.stopPropagation();
        });
        $(document).click(function(){
            $("#set-bumen").css("display","none");
        });
    });
    //职位tree下拉菜单
    $('#zhiwei').bind('click',function(){
      if($('#set-zhiwei').css('display') == 'none'){
        $('#set-zhiwei').css('display','inline-block');
      }else{
        $('#set-zhiwei').css('display','none');
      }
    });
    $(function(){
      $("#zhiwei,#set-zhiwei").click(function(event){
          event.stopPropagation();
      });
      $(document).click(function(){
          $("#set-zhiwei").css("display","none");
      });
    });
     //操作菜单
     $(".btn-tree").click(function(){
        $("#zy,#zy1,#zy2,#zy3,#delete,#myPage,#myPage2,#myPage3,#shenheyemian,.marge-down,.marge-down1,.marge-down2,#dlcs").css("display","none");
        if($(this).html() == "审核管理"){
          $(".marge-down2").css("display","inline");
          $("#zy").css("display","table");
          $("#myPage").css("display","block");
          $(".middle1 div").html($(this).html());
        }else if($(this).html() == "个人资料管理"){
          $("#zy1").css("display","block");
          $(".middle1 div").html($(this).html());
        }else if($(this).html() == "浏览统计"){
         $('#dlcs').css('display','inline-block');
         $("#zy2").css("display","table");
         $(".marge-down1").css("display","inline");
         $("#myPage2").css("display","block");
         $(".middle1 div").html($(this).html());
        }else if($(this).html() == "下载管理"){
         $("#zy3").css("display","table");
         $("#myPage3").css("display","block");
         $(".marge-down").css("display","inline");
        }
     });
      //table同步加载(管理员)
      //浏览统计
      
      //下载管理
      $.ajax({
        url:config.newip + config.newport + '/arcgis/PersonalCenter/GetPersonList?states=1&page=1&limit=6&userid='+zhanghu1,
        type: 'GET',
        async:false,
        success: function (data) {
          console.log(data)
          for(var i=0;i<data.data.length;i++){
            var urlname = data.data[i].url.split('.');
            var length = urlname.length;
            var format = urlname[length-1];
            if(format == 'pdf'){
              $('#zy3 tbody').append(`<tr>
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].depname}</td>
              <td>${data.data[i].applytime.split('T')[0]}</td>
              <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
              </tr>`);
            }else if(format == 'doc'|| format == 'docx'){
              $('#zy3 tbody').append(`<tr>
              <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].depname}</td>
              <td>${data.data[i].applytime.split('T')[0]}</td>
              <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
              </tr>`);
            }else if(format == 'xlsx' || format == 'xls'){
              $('#zy3 tbody').append(`<tr>
              <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].depname}</td>
              <td>${data.data[i].applytime.split('T')[0]}</td>
              <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
              </tr>`);
            }else if(format == 'jpg'||'png'||'bmp'||'gif'){
              $('#zy3 tbody').append(`<tr>
              <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].depname}</td>
              <td>${data.data[i].applytime.split('T')[0]}</td>
              <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
              </tr>`);
            }else{
              $('#zy3 tbody').append(`<tr>
              <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].depname}</td>
              <td>${data.data[i].applytime.split('T')[0]}</td>
              <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
              </tr>`);
            };
            };
              $("#myPage3").sPage({
                page:1,//当前页码，必填
                total:data.count,//数据总条数，必填
                pageSize:6,//每页显示多少条数据，默认10条
                totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                showTotal:true,//是否显示总条数，默认关闭：false
                showSkip:true,//是否显示跳页，默认关闭：false
                showPN:true,//是否显示上下翻页，默认开启：true
                prevPage:"上一页",//上翻页文字描述，默认“上一页”
                nextPage:"下一页",//下翻页文字描述，默认“下一页”
                backFun:function(page){
                    //点击分页按钮回调函数，返回当前页码
                    $('#zy3 tbody').children().remove();
                    $.ajax({
                      url:config.newip + config.newport + '/arcgis/PersonalCenter/GetPersonList?states=1&page='+page+'&limit=6&userid='+zhanghu1,
                      type: 'GET',
                      success: function (data){
                           for(var i=0;i<data.data.length;i++){
                           var urlname = data.data[i].url.split('.');
                           var length = urlname.length;
                           var format = urlname[length-1];
                           if(format == 'pdf'){
                             $('#zy3 tbody').append(`<tr>
                             <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
                             <td>${data.data[i].resourcename}</td>
                             <td>${data.data[i].depname}</td>
                             <td>${data.data[i].applytime.split('T')[0]}</td>
                             <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
                             </tr>`);
                           }else if(format == 'doc'|| format == 'docx'){
                             $('#zy3 tbody').append(`<tr>
                             <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
                             <td>${data.data[i].resourcename}</td>
                             <td>${data.data[i].depname}</td>
                             <td>${data.data[i].applytime.split('T')[0]}</td>
                             <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
                             </tr>`);
                           }else if(format == 'xlsx' || format == 'xls'){
                             $('#zy3 tbody').append(`<tr>
                             <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
                             <td>${data.data[i].resourcename}</td>
                             <td>${data.data[i].depname}</td>
                             <td>${data.data[i].applytime.split('T')[0]}</td>
                             <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
                             </tr>`);
                           }else if(format == 'jpg'||'png'||'bmp'||'gif'){
                             $('#zy3 tbody').append(`<tr>
                             <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
                             <td>${data.data[i].resourcename}</td>
                             <td>${data.data[i].depname}</td>
                             <td>${data.data[i].applytime.split('T')[0]}</td>
                             <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
                             </tr>`);
                           }else{
                             $('#zy3 tbody').append(`<tr>
                             <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
                             <td>${data.data[i].resourcename}</td>
                             <td>${data.data[i].depname}</td>
                             <td>${data.data[i].applytime.split('T')[0]}</td>
                             <td><a href='${config.newip + config.newport}/arcgis/PersonalCenter/Download?applyid=${data.data[i].applyid}'><button>下载</button></a></td>
                             </tr>`);
                               };
                             };
                            }
                        });
                      }
                  });
              }
        });
});