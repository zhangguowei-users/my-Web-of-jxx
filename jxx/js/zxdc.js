var zhanghu1;
var user;
var dep;
var depid;
var resourceid;
$(document).ready(function(){
    dengluLocation();
    huoquName();
    //个人中心数据加载
    jiazaigeren();
    $("#inf-namenow-time").html(newTime());
    $("#time1").html(newTime());
    tiaozhuan();
    $("#login").click(function(){
        PDclick();
      });
      $("#time1").html(newTime());
      $("#quxiao").click(function(){
       $("#css").css("display","none");
      });
    $.ajax({
      url:config.newip + config.newport + '/arcgis/SpecialInvestigation/GetResourceTypeList',
      type: 'GET',
      async: false,
      success:function(data){
        for(var i=0;i<data.data.length;i++){
          $("#browser").append(`<div class="btn-tree" id="${data.data[i].resourcetypeid}">${data.data[i].resourcetype}</div>`);
        };
      }
    });
    $.ajax({
      url:config.newip + config.newport + '/arcgis/SpecialInvestigation/GetPageListByCondition?page=1&limit=3',
      type: 'GET',
      success:function(data){
        for(var i=0;i<data.data.length;i++){
          $("#zy").append(`
          <tr>
            <td><img class="img-zxdc" src="./img/ex.png" alt=""></td>
            <td>${data.data[i].resourcetypename}</td>
            <td>${data.data[i].resourcename}</td>
            <td>${data.data[i].sender}</td>
            <td>${data.data[i].createtime.split('T')[0]}</td>
            <td><button id='${data.data[i].resourceid}'>下载</button></td>
           </tr>
          `);
         };
         $("td button").click(function(){
          $("#css").css("display","inline-block");
          resourceid = $(this).attr("id");
        });
        $("#myPage").sPage({
          page:1,//当前页码，必填
          total:data.count,//数据总条数，必填
          pageSize:3,//每页显示多少条数据，默认10条
          totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
          showTotal:true,//是否显示总条数，默认关闭：false
          showSkip:true,//是否显示跳页，默认关闭：false
          showPN:true,//是否显示上下翻页，默认开启：true
          prevPage:"上一页",//上翻页文字描述，默认“上一页”
          nextPage:"下一页",//下翻页文字描述，默认“下一页”
          backFun:function(page){
              //点击分页按钮回调函数，返回当前页码
              // console.log(page);
              $.ajax({
                url:config.newip + config.newport + '/arcgis/SpecialInvestigation/GetPageListByCondition?page='+page+'&limit=3',
                type: 'GET',
                success:function(data){
                   $("#zy").children().children().not(':first-child').remove();
                   for(var i=0;i<data.data.length;i++){
                    $("#zy").append(`
                    <tr>
                      <td><img class="img-zxdc" src="./img/ex.png" alt=""></td>
                      <td>${data.data[i].resourcetypename}</td>
                      <td>${data.data[i].resourcename}</td>
                      <td>${data.data[i].sender}</td>
                      <td>${data.data[i].createtime.split('T')[0]}</td>
                      <td><button id='${data.data[i].resourceid}'>下载</button></td>
                    </tr>
                    `);
                   };
                   $("td button").click(function(){
                    $("#css").css("display","inline-block");
                    resourceid = $(this).attr("id");
                   });  
                }
              });
          }
        }); 
      },
      error:function(){

      }
  });
    $.ajax({
      url:config.ip + config.port + '/getAdministration',
      type: 'POST',
      async: false,
      xhrFields:{withCredentials:true},
      success:function(data){
        option(data,".xz1");
      }
    });
    huakuaiMove(".btn-tree");
    $(".btn-tree").click(function(){
      if($(this).html() == "专项资源共享"){
        $("#zy").css("display","");
        $("#se").css("display","none");
        $("#btn").css("display","none");
        $("#myPage").css("display","");
      }else{
        $("#se").css("display","inline-block");
        $("#zy").css("display","none");
        $("#btn").css("display","inline-block");
        $("#myPage").css("display","none");
      };
    });
    $("td button").click(function(){
      $("#css").css("display","inline-block");
    });
    $("#daochu,#btn").click(function(){
      $("#css1").css("display","inline-block");
    });
    $("#shenqingren").val(user);
    $("#sq-b").html(`<option value="${depid}">${dep}</option>`);
    $("#tijiao1").click(function(){
      var shenqingren = $("#shenqingren").val();
      var shenqingbumen = $("#sq-b").val();
      var dsd = $("#sq-b option[value="+shenqingbumen+"]").html();
      var shenqingyongtu = $("#shenqingyongtu").val();
      if(shenqingren == "" || shenqingyongtu == ""){
        alert('申请人与申请用途不可为空!');
      }else{
        $.ajax({
          url:config.newip+config.newport+'/arcgis/SpecialInvestigation/CreateApply',
          type: 'POST',
          data:{resourceid:resourceid,userid:zhanghu1,username:shenqingren,depid:shenqingbumen,depname:dsd,applyreason:shenqingyongtu},
          async: false,
          success:function(data){
            alert(data.msg);
            $("#css1").css("display","none");
            $("#css").css("display","none");
          },
          error:function(){
            throw Error("服务器连接失败或者请求地址不存在");
          }
        });
      };
    });
    
    $("#quxiao1").click(function(){
      $("#css1").css("display","none");
    });
    });