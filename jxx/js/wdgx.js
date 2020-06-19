var zhanghu1,user,dep,depid,resourceid;
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
    //首次进入展示文档
    $('#zx tbody').children().remove();
        $.ajax({
         url:config.newip + config.newport + '/arcgis/DocumentSharing/GetPageListByCondition?page=1&limit=6&typeid=1',
         type: 'get',
         async: false,
         success:function (data) {
           for(var i=0;i<data.data.length;i++){
             var urlname = data.data[i].url.split('.');
             var length = urlname.length;
             var format = urlname[length-1];
             if(format == 'pdf'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else if(format == 'doc'|| format == 'docx'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else if(format == 'xlsx' || format == 'xls'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else if(format == 'jpg'||format =='png'||format =='bmp'||format =='gif'){
               $('#zx tbody').append(`<tr>
               <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             }else{
               $('#zx tbody').append(`<tr>
               <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
               <td>${data.data[i].resourcetypename}</td>
               <td>${data.data[i].resourcename}</td>
               <td>${data.data[i].sender}</td>
               <td>${data.data[i].createtime.split('T')[0]}</td>
               <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
               </tr>`);
             };
           };
           $("#myPage").sPage({
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
                 $('#zx tbody').children().remove();
                 $.ajax({
                   url:config.newip + config.newport + '/arcgis/DocumentSharing/GetPageListByCondition?page='+page+'&limit=6&typeid=1',
                   type: 'get',
                   async: false,
                   success:function(data){
                     $('#zx tbody').children().remove();
                     for(var i=0;i<data.data.length;i++){
                       var urlname = data.data[i].url.split('.');
                       var length = urlname.length;
                       var format = urlname[length-1];
                       if(format == 'pdf'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else if(format == 'doc'|| format == 'docx'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else if(format == 'xlsx' || format == 'xls'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else if(format == 'jpg'||format =='png'||format =='bmp'||format =='gif'){
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       }else{
                         $('#zx tbody').append(`<tr>
                         <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
                         <td>${data.data[i].resourcetypename}</td>
                         <td>${data.data[i].resourcename}</td>
                         <td>${data.data[i].sender}</td>
                         <td>${data.data[i].createtime.split('T')[0]}</td>
                         <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                         </tr>`);
                       };
                     };
                     //文件的下载申请
                     $('.down').bind('click',function(){
                       $('#sq-b').children().remove();
                       $("#css1").css("display","inline-block");
                       var data = JSON.parse($(this).attr('id'));
                       resourceid=data.resourceid; 
                       $('#sq-p').val(user);
                       $('#sq-b').append(`<option value="${depid}">${dep}</option>`);
                     });
                   }
                 });
             }
           });
         }
        });
        //文件的下载申请
        $('.down').bind('click',function(){
          $('#sq-b').children().remove();
          $("#css1").css("display","inline-block");
          var data = JSON.parse($(this).attr('id'));
          resourceid=data.resourceid; 
          $('#sq-p').val(user);
          $('#sq-b').append(`<option value="${depid}">${dep}</option>`);
        });
    //点击菜单获取文档
      $.ajax({
        url:config.newip + config.newport + '/arcgis/DocumentSharing/GetDocumentTypeList',
        type: 'get',
        async: false,
        success:function(data){
               //形成树菜单
               tree(data.data,".qtwo");
               $("#browser").treeview();
               //文档共享通过点击tree操作table
               table_wendang();
               //滑块移动事件
               huakuaiMove(".folder");
               //点击变色事件
               caidanChangeColor(".file");
               //点击查询
               queryCd1(".ffour",".sfour","#browser",data.data);
        }
    });
    $("#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    //提交申请
    $("#tijiao1").click(function(){
      var val = $('#yt').val();
      $.ajax({
        url:config.newip + config.newport + '/arcgis/DocumentSharing/CreateApply',
        type: 'post',
        data:{resourceid:resourceid,userid:zhanghu1,username:user,depid:depid,depname:dep,applyreason:val},
        success:function(data){
          alert(data.msg);
          $("#css1").css("display","none");
        }
      });
    });
    //起始查询
    $('#search-img').bind('click',function(){
      var search = $('#search-wendang').val();
      $('#zx tbody').children().remove();
      $.ajax({
      url:config.newip + config.newport +'/arcgis/DocumentSharing/GetPageListByCondition?name='+search+'&typeid=0&page=1&limit=6',
      type:'GET',
      async:false,
      success:function(data){
        for(var i=0;i<data.data.length;i++){
            var urlname = data.data[i].url.split('.');
            var length = urlname.length;
            var format = urlname[length-1];
            if(format == 'pdf'){
              $('#zx tbody').append(`<tr>
              <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcetypename}</td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].sender}</td>
              <td>${data.data[i].createtime.split('T')[0]}</td>
              <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
              </tr>`);
            }else if(format == 'doc'|| format == 'docx'){
              $('#zx tbody').append(`<tr>
              <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcetypename}</td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].sender}</td>
              <td>${data.data[i].createtime.split('T')[0]}</td>
              <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
              </tr>`);
            }else if(format == 'xlsx' || format == 'xls'){
              $('#zx tbody').append(`<tr>
              <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcetypename}</td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].sender}</td>
              <td>${data.data[i].createtime.split('T')[0]}</td>
              <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
              </tr>`);
            }else if(format == 'png'||format =='bmp'||format =='gif'||format =='jpg'){
              $('#zx tbody').append(`<tr>
              <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcetypename}</td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].sender}</td>
              <td>${data.data[i].createtime.split('T')[0]}</td>
              <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
              </tr>`);
            }else{
              $('#zx tbody').append(`<tr>
              <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
              <td>${data.data[i].resourcetypename}</td>
              <td>${data.data[i].resourcename}</td>
              <td>${data.data[i].sender}</td>
              <td>${data.data[i].createtime.split('T')[0]}</td>
              <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
              </tr>`);
            };
          };
          //文件的下载申请
          $('.down').bind('click',function(){
            $('#sq-b').children().remove();
            $("#css1").css("display","inline-block");
            var data = JSON.parse($(this).attr('id'));
            resourceid=data.resourceid; 
            $('#sq-p').val(user);
            $('#sq-b').append(`<option value="${depid}">${dep}</option>`);
          });
          $("#myPage").sPage({
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
                $('#zx tbody').children().remove();
                $.ajax({
                  url:config.newip + config.newport + '/arcgis/DocumentSharing/GetPageListByCondition?name='+search+'&typeid=0&page=1&limit=6',
                  type: 'get',
                  async: false,
                  success:function(data){
                    $('#zx tbody').children().remove();
                    for(var i=0;i<data.data.length;i++){
                      var urlname = data.data[i].url.split('.');
                      var length = urlname.length;
                      var format = urlname[length-1];
                      if(format == 'pdf'){
                        $('#zx tbody').append(`<tr>
                        <td><img src="./img/pdf.png" alt="" style="height:70px; width: 70px;"></td>
                        <td>${data.data[i].resourcetypename}</td>
                        <td>${data.data[i].resourcename}</td>
                        <td>${data.data[i].sender}</td>
                        <td>${data.data[i].createtime.split('T')[0]}</td>
                        <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                        </tr>`);
                      }else if(format == 'doc'|| format == 'docx'){
                        $('#zx tbody').append(`<tr>
                        <td><img src="./img/word.png" alt="" style="height:70px; width: 70px;"></td>
                        <td>${data.data[i].resourcetypename}</td>
                        <td>${data.data[i].resourcename}</td>
                        <td>${data.data[i].sender}</td>
                        <td>${data.data[i].createtime.split('T')[0]}</td>
                        <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                        </tr>`);
                      }else if(format == 'xlsx' || format == 'xls'){
                        $('#zx tbody').append(`<tr>
                        <td><img src="./img/excal.png" alt="" style="height:70px; width: 70px;"></td>
                        <td>${data.data[i].resourcetypename}</td>
                        <td>${data.data[i].resourcename}</td>
                        <td>${data.data[i].sender}</td>
                        <td>${data.data[i].createtime.split('T')[0]}</td>
                        <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                        </tr>`);
                      }else if(format == 'jpg'||format =='png'||format =='bmp'||format =='gif'){
                        $('#zx tbody').append(`<tr>
                        <td><img src="./img/img.png" alt="" style="height:70px; width: 70px;"></td>
                        <td>${data.data[i].resourcetypename}</td>
                        <td>${data.data[i].resourcename}</td>
                        <td>${data.data[i].sender}</td>
                        <td>${data.data[i].createtime.split('T')[0]}</td>
                        <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                        </tr>`);
                      }else{
                        $('#zx tbody').append(`<tr>
                        <td><img src="./img/txt.png" alt="" style="height:70px; width: 70px;"></td>
                        <td>${data.data[i].resourcetypename}</td>
                        <td>${data.data[i].resourcename}</td>
                        <td>${data.data[i].sender}</td>
                        <td>${data.data[i].createtime.split('T')[0]}</td>
                        <td><button class='down' id='${JSON.stringify(data.data[i])}'>下载</button></td>
                        </tr>`);
                      };
                    };
                    //文件的下载申请
                    $('.down').bind('click',function(){
                      $('#sq-b').children().remove();
                      $("#css1").css("display","inline-block");
                      var data = JSON.parse($(this).attr('id'));
                      resourceid=data.resourceid; 
                      $('#sq-p').val(user);
                      $('#sq-b').append(`<option value="${depid}">${dep}</option>`);
                    });
                  }
                });
            }
          });
        }
       });
      });
    });