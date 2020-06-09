var zhanghu1;
var user;
var dep;
var depid;
var resourceid;
$(document).ready(function(){
    dengluLocation();
    huoquName();
    $("#inf-namenow-time").html(newTime());
    $("#time1").html(newTime());
    tiaozhuan();
    tuichudenglu();
    $("#login").click(function(){
        PDclick();
      });
      $("#time1").html(newTime());
    //小图标操作按钮
    //放大
    $(".map_12").mousedown(function(ev){
      $(".map_12").removeClass("map30");
      $(".map_12").attr("class","map01_12");
      $(".esriSimpleSliderIncrementButton").click();//地图放大按钮
    });
    $(".map_12").mouseup(function(ev){
       $(".map_12").removeClass("map30");
       $(".map01_12").attr("class","map_12");
    });
    //缩小
    $(".map_14").mousedown(function(ev){
        $(".map_14").removeClass("map30");
        $(".map_14").attr("class","map01_14");
        $(".esriSimpleSliderDecrementButton").click();//地图缩小按钮
     });
     $(".map_14").mouseup(function(ev){
        $(".map_14").removeClass("map30");
        $(".map01_14").attr("class","map_14");
     });
    //鹰眼图
    $(".map_24").click(function(){
        $(".map_24").removeClass("map30"); 
        if($(".map_24").attr("class") == "map_24"){
           $(".yingyan1").css("display","inline-block");
            $(".map_24").attr("class","map01_24");
        }else{
            $(".map01_24").attr("class","map_24");
            $(".yingyan1").css("display","none");
           
        };
    });
    //指南针
    $(".map_26").click(function(){
        $(".map_26").removeClass("map30");
        if($(".map_26").attr("class") == "map_26"){
            $(".south1").css("display","inline-block");
            $(".map_26").attr("class","map01_26");
        }else{
            $(".map01_26").attr("class","map_26");
            $(".south1").css("display","none");
        };
    });
    //比例尺
    $(".map_28").click(function(){
        $(".map_28").removeClass("map30");
        if($(".map_28").attr("class") == "map_28"){
            $(".bili-ruler1").css("display","inline-block");
            $(".map_28").attr("class","map01_28");
        }else{
            $(".map01_28").attr("class","map_28");
            $(".bili-ruler1").css("display","none");
        };
    });
    //绘制地块
    $(".map_37").click(function(){
        $(".map_37").removeClass("map30");
        if($(".map_37").attr("class") == "map_37"){
            $('#huizhi').css('display','inline-block');
            $(".map_37").attr("class","map01_37");
 
           
        }else{
            $('#huizhi').css('display','none');
            $(".map01_37").attr("class","map_37");
            
        };
    });
    //分屏
    $(".map_39").click(function(){
        $(".map_39").removeClass("map30");
        if($(".map_39").attr("class") == "map_39"){
            $(".map_39").attr("class","map01_39");
            
        }else{
            $(".map01_39").attr("class","map_39");
        };
    });
 //改变编辑地块按钮
$("#yc").mousedown(function(ev){ //移除地块
  $("#yc").removeClass("map30");
  $("#yc").attr("src","./img/移除图像1.png");
});
$("#yc").mouseup(function(ev){
  $("#yc").removeClass("map30");
  $("#yc").attr("src","./img/移除图像.png");
});
$("#bj").click(function(){  //编辑地块
  $("#bj").removeClass("map30");
  if($("#bj").attr("src") == "./img/编辑.png"){
      $("#bj").attr("src","./img/编辑1.png");
      
  }else{
      $("#bj").attr("src","./img/编辑.png");
  
  };
});
$("#sf").click(function(){  //缩放地块
  $("#sf").removeClass("map30");
  if($("#sf").attr("src") == "./img/缩放地块.png"){
      $("#sf").attr("src","./img/缩放地块1.png");
      
  }else{
      $("#sf").attr("src","./img/缩放地块.png");
     
  };
});
$("#xz123").click(function(){  //旋转地块
  $("#xz123").removeClass("map30");
  if($("#xz123").attr("src") == "./img/旋转地块.png"){
      $("#xz123").attr("src","./img/旋转地块1.png");

  }else{
      $("#xz123").attr("src","./img/旋转地块.png");
   
  };
});
$("#jlcl").click(function(){  //测量距离
  $("#jlcl").removeClass("map30");
  if($("#jlcl").attr("src") == "./img/测量.png"){
      $("#jlcl").attr("src","./img/测量1.png");
  }else{    
      $("#jlcl").attr("src","./img/测量.png");
    
  };
});
//打开搜索
$('#select').bind('click',function(){
  $('#sousuo').css('display','inline-block');
});
//关闭搜索
$('#gb-select').bind('click',function(){
  $('#sousuo').css('display','none');
});
//关闭图表
$('#tb-gb').bind('click',function(){
  $('.bing321,.zhu321').css('display','none');
});
//打开图表
$('#tb-dk').bind('click',function(){
    $('.bing321,.zhu321').css('display','inline-block');
});
//关闭表格
$('#gb-table').bind('click',function(){
    $('#table').css('display','none');
});
//echart图
var zhu = echarts.init(document.querySelector('.zhu321'));
option = {
    title: {
        text: '某站点用户访问来源',
        top:0,
        left: 'center',
        textStyle:{
            color:'#333333',
            fontSize:18,
            fontFamily:'SourceHanSansCN-',
            fontStyle :'normal',
            fontWeight:400
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'horizontal',  //vertical
        bottom: 'bottom',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        textStyle:{
            color:'#333333',
            fontFamily:'SourceHanSansCN-',
            fontStyle :'normal',
            fontWeight:400
        },
        itemHeight:9,
        itemWidth:9
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '45%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
zhu.setOption(option);
//echarts图2
var bing = echarts.init(document.querySelector('.bing321'));
option = {
    title: {
        text: '某站点用户访问来源',
        top:0,
        left: 'center',
        textStyle:{
            color:'#333333',
            fontSize:18,
            fontFamily:'SourceHanSansCN-',
            fontStyle :'normal',
            fontWeight:400
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'horizontal',  //vertical
        bottom: 'bottom',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎','dsa','123'],
        textStyle:{
            color:'#333333',
            fontFamily:'SourceHanSansCN-',
            fontStyle :'normal',
            fontWeight:400
        },
        itemHeight:9,
        itemWidth:9
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '45%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'},
                {value: 1548, name: 'dsa'},
                {value: 1548, name: '123'},
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
        }
    ]
};
bing.setOption(option);
//  
});