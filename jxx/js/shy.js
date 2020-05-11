$(document).ready(function(){
    dengluLocation();
    shy();
    $("#inf-namenow-time").html(newTime());
    tiaozhuan();
    huoquName();
    // $.ajax({
    //     url:config.ip + config.port + '/getMenue',
    //     type: 'POST',
    //     async: false,
    //     xhrFields:{withCredentials:true},
    //     success:function(data){
    //            //形成树菜单
    //            tree(data,".qtwo");
    //            $("#browser").treeview();
    //             //滑块移动事件
    //            huakuaiMove(".folder");
    //             //点击变色事件
    //            caidanChangeColor(".file");
    //             //点击查询
    //            queryCd(".ftwo",".stwo","#browser",data);
    //     }
    // });
    //测试
    huakuaiMove(".btn-tree");
    $(".btn-tree").click(function(){
       if($(this).html() == "待审核"){
           $(".jfive").html(`<table id="zy">
           <tr>
             <th>申请人</th>
             <th>申请部门</th>
             <th>职位</th>
             <th>申请用途</th>
             <th>电话</th>
             <th>申请时间</th>
             <th>申请状态</th>
             <th>操作</th>
           </tr>
           <tr>
             <td>邬倩倩</td>
             <td>环境资源局</td>
             <td>科员</td>
             <td>地理环境监测分析</td>
             <td>0451-89782511</td>
             <td>2020-03-08</td>
             <td>已申请</td>
             <td><button>审核</button></td>
           </tr>
           <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
            <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
             <tr>
               <td>邬倩倩</td>
               <td>环境资源局</td>
               <td>科员</td>
               <td>地理环境监测分析</td>
               <td>0451-89782511</td>
               <td>2020-03-08</td>
               <td>已申请</td>
               <td><button>审核</button></td>
             </tr>
         </table>
         <div id="shenheyemian" style="display: none;">
                    <div style="background: #f1f1f1;width:100%;height:90px;font-size: large;font-weight: bold;line-height: 90px;text-align: center;">地理环境监测分析</div><br>
                    <div style="font-size: large;position: relative;left:10%;display: inline-block;">申请人</div><input type="text" disabled style="position: relative;left:12%;font-size:large;box-shadow: 10px 10px 0px -8px #9a9a9a inset;background-color: #f1f1f1;" value="邬倩倩">
                    <div style="font-size: large;position: relative;left:15%;display: inline-block;">申请部门</div><input type="text" disabled style="position: relative;left:17%;font-size:large;box-shadow: 10px 10px 0px -8px #9a9a9a inset;background-color: #f1f1f1;" value="环境资源局">
                    <div style="font-size: large;position: relative;left:20%;display: inline-block;">职位</div><input type="text" disabled style="position: relative;left:23.2%;font-size:large;box-shadow: 10px 10px 0px -8px #9a9a9a inset;background-color: #f1f1f1;" value="科员">
                    <br><br>
                    <div style="font-size: large;position: relative;left:10%;display: inline-block;">电话</div><input type="text" disabled style="position: relative;left:13.1%;font-size:large;box-shadow: 10px 10px 0px -8px #9a9a9a inset;background-color: #f1f1f1;" value="166622589999">
                    <div style="font-size: large;position: relative;left:16.2%;display: inline-block;">申请时间</div><input type="text" disabled style="position: relative;left:18.2%;font-size:large;box-shadow: 10px 10px 0px -8px #9a9a9a inset;background-color: #f1f1f1;" value="2020-03-20">
                    <div style="font-size: large;position: relative;left:21.2%;display: inline-block;">申请状态</div><input type="text" disabled style="position: relative;left:22%;font-size:large;box-shadow: 10px 10px 0px -8px #9a9a9a inset;background-color: #f1f1f1;" value="已申请">
                    <br><br>
                    <div style="font-size: large;position: relative;left:10%;display: inline-block;">申请用途</div><textarea name="" id="" cols="30" rows="10" style="background-color: #ededed;width: 62%;height:150px;position: relative;left:10.8%;vertical-align: top;border: 1px solid #000;font-size: large;" disabled>环境信息分析上报省里进行汇报</textarea>
                    <br><br>
                    <div style="height: 1px;background-color: black;width:100%;"></div>
                    <br><br>
                    <div style="font-size: large;position: relative;left:10%;display: inline-block;">审核意见</div><textarea name="" id="" cols="30" rows="10" style="background-color: #ededed;width: 62%;height:200px;position: relative;left:10.8%;vertical-align: top;border: 1px solid #000;font-size: large;">审核通过</textarea>
                    <br><br><br><br>
                    <button id="shenhetongguo">审核通过</button>
                    <button id="tuihui">退回</button>
                   </div>`);
         $(".middle1 div").html($(this).html());
         $("td button").click(function(){
            $("#zy").css("display","none");
            $("#shenheyemian").css("display","block");
        });
            $("#shenhetongguo,#tuihui").click(function(){
            $("#shenheyemian").css("display","none");  
            $("#zy").css("display","");
           }); 
       }else if($(this).html() == "已审核"){
           $(".jfive").html(`<table id="zy1">
           <tr>
             <th>请选择</th>
             <th>申请人</th>
             <th>申请部门</th>
             <th>职位</th>
             <th>申请用途</th>
             <th>电话</th>
             <th>申请时间</th>
             <th>申请状态</th>
           </tr>
           <tr>
             <td><input type="checkbox" name="" value="" /></td>
             <td>邬倩倩</td>
             <td>环境资源局</td>
             <td>科员</td>
             <td>地理环境监测分析</td>
             <td>0451-89782511</td>
             <td>2020-03-08</td>
             <td>已申请</td>
           </tr>
           <tr>
             <td><input type="checkbox" name="" value="" /></td>
             <td>邬倩倩</td>
             <td>环境资源局</td>
             <td>科员</td>
             <td>地理环境监测分析</td>
             <td>0451-89782511</td>
             <td>2020-03-08</td>
             <td>已申请</td>
           </tr>
           <tr>
             <td><input type="checkbox" name="" value="" /></td>
             <td>邬倩倩</td>
             <td>环境资源局</td>
             <td>科员</td>
             <td>地理环境监测分析</td>
             <td>0451-89782511</td>
             <td>2020-03-08</td>
             <td>已申请</td>
           </tr>
           <tr>
             <td><input type="checkbox" name="" value="" /></td>
             <td>邬倩倩</td>
             <td>环境资源局</td>
             <td>科员</td>
             <td>地理环境监测分析</td>
             <td>0451-89782511</td>
             <td>2020-03-08</td>
             <td>已申请</td>
           </tr>
           <tr>
             <td><input type="checkbox" name="" value="" /></td>
             <td>邬倩倩</td>
             <td>环境资源局</td>
             <td>科员</td>
             <td>地理环境监测分析</td>
             <td>0451-89782511</td>
             <td>2020-03-08</td>
             <td>已申请</td>
           </tr>
         </table>
         <button id="delete">删除</button>
         <button id="quxiaosh">取消审核</button>`);
         $(".middle1 div").html($(this).html());
       }else if($(this).html() == "退回表单"){
        $(".jfive").html(`<table id="zy2">
        <tr>
          <th>请选择</th>
          <th>申请人</th>
          <th>申请部门</th>
          <th>职位</th>
          <th>申请用途</th>
          <th>电话</th>
          <th>申请时间</th>
          <th>申请状态</th>
        </tr>
        <tr>
          <td><input type="checkbox" name="" value="" /></td>
          <td>邬倩倩</td>
          <td>环境资源局</td>
          <td>科员</td>
          <td>地理环境监测分析</td>
          <td>0451-89782511</td>
          <td>2020-03-08</td>
          <td>已申请</td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" value="" /></td>
          <td>邬倩倩</td>
          <td>环境资源局</td>
          <td>科员</td>
          <td>地理环境监测分析</td>
          <td>0451-89782511</td>
          <td>2020-03-08</td>
          <td>已申请</td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" value="" /></td>
          <td>邬倩倩</td>
          <td>环境资源局</td>
          <td>科员</td>
          <td>地理环境监测分析</td>
          <td>0451-89782511</td>
          <td>2020-03-08</td>
          <td>已申请</td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" value="" /></td>
          <td>邬倩倩</td>
          <td>环境资源局</td>
          <td>科员</td>
          <td>地理环境监测分析</td>
          <td>0451-89782511</td>
          <td>2020-03-08</td>
          <td>已申请</td>
        </tr>
      </table>
      <button id="delete">删除</button>
      <button id="fanhuish">返回未审核</button>`);
      $(".middle1 div").html($(this).html());
      }else if($(this).html() == "审核情况分析"){
        $(".jfive").html(`<img src="./img/批注 2020-05-11 094559.png" alt="">`);
        $(".middle1 div").html($(this).html());
      };
    });
    $("td button").click(function(){
        $("#zy").css("display","none");
        $("#shenheyemian").css("display","block");
    });
    $("#shenhetongguo,#tuihui").click(function(){
        $("#shenheyemian").css("display","none");  
        $("#zy").css("display","");
       });
    });