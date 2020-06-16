var zhanghu1;
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
//table 分页
$("#myPage").sPage({
  page:1,//当前页码，必填
  total:5,//数据总条数，必填
  pageSize:5,//每页显示多少条数据，默认10条
  totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
  showTotal:true,//是否显示总条数，默认关闭：false
  showSkip:true,//是否显示跳页，默认关闭：false
  showPN:true,//是否显示上下翻页，默认开启：true
  prevPage:"上一页",//上翻页文字描述，默认“上一页”
  nextPage:"下一页",//下翻页文字描述，默认“下一页”
  backFun:function(page){}
});
//echart图
//折线
var zhexian = echarts.init(document.querySelector('#zhexian'));
option = {
  title: {
      text: '土地利用情况',
        top:'3%',
        left: 'center',
        textStyle:{
            color:'#333333',
            fontSize:18,
            fontFamily:'Source Han Sans CN',
            fontStyle :'normal',
            fontWeight:400
        }
  },
  tooltip: {
      trigger: 'axis',
  },
  legend: {
      data: ['已利用地','未利用地'],
      right: 'top',
  },
  grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
  },
  toolbox: {
      feature: {
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018','2019','2020']
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name: '已利用地',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210, 191, 234, 290, 330, 310],
          color: '#E2EF12'
      },
      {
          name: '未利用地',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310, 101, 134, 90, 230, 210],
          color:'#3A98FA'
      }
  ]
};
zhexian.setOption(option);
//饼图1
var bing1 = echarts.init(document.querySelector('#bing1'));
option = {
    title: {
        text: '拆除未尽区数量',
        top:'3%',
        left: 'center',
        textStyle:{
            color:'#333333',
            fontSize:17,
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
        data: ['拆除未尽区1', '拆除未尽区3', '拆除未尽区2', '拆除未尽区4'],
        textStyle:{
            color:'#333333',
            fontFamily:'SourceHanSansCN-',
            fontStyle :'normal',
            fontWeight:400
        },
        itemHeight:9,
        itemWidth:9,
        type:'scroll',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '48%'],
            data: [
                {value: 335, name: '拆除未尽区1'},
                {value: 310, name: '拆除未尽区3'},
                {value: 234, name: '拆除未尽区2'},
                {value: 135, name: '拆除未尽区4'}
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
bing1.setOption(option);
//饼图2
var bing2 = echarts.init(document.querySelector('#bing2'));
option = {
    title: {
        text: '拆除未尽区面积',
        top:'3%',
        left: 'center',
        textStyle:{
            color:'#333333',
            fontSize:17,
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
        bottom: 0,
        data: ['拆除未尽区1面积', '拆除未尽区2面积', '拆除未尽区1面积', '拆除未尽区2面积','拆除未尽区3面积','拆除未尽区4面积','拆除未尽区3面积','拆除未尽区4面积'],
        textStyle:{
            color:'#333333',
            fontFamily:'SourceHanSansCN-',
            fontStyle :'normal',
            fontWeight:400
        },
        itemHeight:9,
        itemWidth:9,
        type:'scroll',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '48%'],
            data: [
                {value: 335, name: '拆除未尽区1面积'},
                {value: 310, name: '拆除未尽区2面积'},
                {value: 234, name: '拆除未尽区1面积'},
                {value: 135, name: '拆除未尽区2面积'},
                {value: 535, name: '拆除未尽区3面积'},
                {value: 110, name: '拆除未尽区4面积'},
                {value: 224, name: '拆除未尽区3面积'},
                {value: 235, name: '拆除未尽区4面积'}
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
bing2.setOption(option);
//饼图3
var bing3 = echarts.init(document.querySelector('#bing3'));
option = {
    title: {
        text: '拆除未尽区现状',
        top:'3%',
        left: 'center',
        textStyle:{
            color:'#333333',
            fontSize:17,
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
        data: ['已拆除', '已推土', '现为', '空'],
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
            center: ['50%', '48%'],
            data: [
                {value: 335, name: '已拆除'},
                {value: 310, name: '已推土'},
                {value: 234, name: '现为'},
                {value: 135, name: '空'}
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
bing3.setOption(option);
});