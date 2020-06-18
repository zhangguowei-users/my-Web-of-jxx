var zhanghu1;
var str;
var str_child;
var str_parent;
var zhexian_yiliyong = new Array(22);
var zhexian1_weiliyong = new Array(22);
var legendArry1 = new Array();
var seriesArry1 = new Array();
var legendArry2 = new Array();
var seriesArry2 = new Array();
var nameone;
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
            //    queryCd(".fthree",".sthree","#browser",data);
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
//click tree 创建table
$('.dcd1,.dcd').on('click',function(){
    if($(this).attr('typeid') =='polyline'){
      $('#bing2').css('display','none');
    }else{
      $('#bing2').css('display','inline-block');
    };
    //点击非根节点
    if($(this).attr('class') == 'file dcd'){
      //clear
      $('#tj thead tr').children().remove();
      str = '';
      $('#tj tbody').children().remove();
      str_child = '';
      str_parent = '';
      $('#tj thead tr').append(`<th><input class='checked_one' type="checkbox" name="" id=""></th>`);
      zhexian_yiliyong.splice(0);
      zhexian1_weiliyong.splice(0);
      legendArry1.splice(0);
      seriesArry1.splice(0);
      legendArry2.splice(0);
      seriesArry2.splice(0);
      var title = $(this).html();
      $.ajax({
          url:GEOSERVER.IP + GEOSERVER.PORT + '/getAnalysisData',
          type: 'POST',
          async: false,
          data:{jsonTree:$(this).attr('cd')},
          xhrFields:{withCredentials:true},
          success:function(data){
             console.log(data.result);
             //加载table名
             $('#area').html(title+'数据统计');
             //加载thead
             for(key in data.result[0]){
                 str+=`<th>${key}</th>`;
             };
             $('#tj thead tr').append(str);
             //加载tbody
             for(var j=0,len=data.result.length;j<len;j++){
                nameone = data.result[j].name;
                if(nameone == undefined|| nameone == null|| nameone == ""){
                    nameone =  data.result[j].bsm;
                };
                console.log(data.result[j].bsm)
                legendArry1.push(nameone);
                seriesArry1.push({'value':1,'name':nameone});
                str_child='';
                for(key in data.result[j]){
                    str_child+=`<td title='详细:${data.result[j][key]}'><div>${data.result[j][key]}</div></td>`;
                };
                str_parent+=`<tr><td><input class='checked' type="checkbox" name=""></td>${str_child}</tr>`; 
             };
             $('#tj tbody').append(str_parent);
             //获取折线图数据,生成折线图
             zhexian_yiliyong.push(data.result.length);
             zhexian(title,zhexian_yiliyong,zhexian1_weiliyong);
             //生成饼形图
             console.log(legendArry1,seriesArry1)
             bing("#bing1",bing1,title+'数量','块数',legendArry1,seriesArry1);
             bing("#bing2",bing2,title+'面积','面积',legendArry2,seriesArry2);
          }
      });
    };
});
});