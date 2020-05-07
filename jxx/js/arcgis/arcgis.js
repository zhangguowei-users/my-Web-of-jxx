var globalQueryClass;
var handdle=null;


require(["esri/map", "dojo/dom", "dojo/on","esri/layers/ArcGISDynamicMapServiceLayer", "dojo/query", "esri/tasks/FindTask", "esri/tasks/FindParameters", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/graphic", "esri/tasks/QueryTask", "esri/tasks/query","esri/geometry/Point","esri/graphicsUtils","esri/layers/FeatureLayer","dojo/domReady!"], init);

function init(Map, dom, on, ArcGISDynamicMapServiceLayer, query, FindTask, FindParameters,SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, QueryTask, Query, Point,graphicsUtils,FeatureLayer){

    var map = new Map("map_div", {logo: false});
    var layer = new ArcGISDynamicMapServiceLayer(ARCGISCONFIG.DLTB_Dinamic);
    map.addLayer(layer);
   
    var queryClass =  new QueryClass(map, SimpleLineSymbol,SimpleFillSymbol, QueryTask, Query,FindTask, FindParameters,Color, Graphic);
    globalQueryClass = queryClass;

    //mouseClick(map);//鼠标点击高亮显示信息

}

function QueryClass(map, SimpleLineSymbol,SimpleFillSymbol, QueryTask, Query, FindTask, FindParameters,Color, Graphic)//查询类
{                   
    this.map = map;
    this.SimpleLineSymbol = SimpleLineSymbol;
    this.SimpleFillSymbol = SimpleFillSymbol;
    this.QueryTask = QueryTask;
    this.FindTask = FindTask;
    this.FindParameters = FindParameters;
    this.Color = Color;
    this.Graphic = Graphic;
    this.Query = Query;
    
    this.queryTask = function(querySQL)//Query属性查询
    {
        var queryTask = new QueryTask(ARCGISCONFIG.DLTB_Dinamic + ARCGISCONFIG.QueryLevel);
    
        var query = new Query();
        query.where = querySQL;
        //query.where = "QSDWDM like '2305211002020000000'"
        query.outFields = ["*"];
        query.returnGeometry = true;

        queryTask.execute(query, showQueryResult);
    }

    function showQueryResult(queryResult)
    {
        map.graphics.clear();

        var lineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
        var fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new dojo.Color([0, 255, 1]));

        if(queryResult.features.length == 0){alert("无结果！"); return;}

        for(let i=0; i<queryResult.features.length; i++)
        {
            var graphic = queryResult.features[i];
            graphic.setSymbol(fill);
            map.graphics.add(graphic);

            if(i == queryResult.features.length-1)
            {
                new QueryClass().setExtentFun(map, graphic.geometry);
            }
        }
    }

    this.queryByFindTask = function(){//属性查询
        var findParams = new FindParameters();
        findParams.returnGeometry = true;
        findParams.layerIds = [ARCGISCONFIG.FindTaskLevel];
        findParams.searchFields = ["QSDWMC"];
        findParams.searchText = "七星林场";

        var findTask = new FindTask(ARCGISCONFIG.DLTB_Dinamic);
        findTask.execute(findParams, resultFun);
    }

    function resultFun(queryResult){
        map.graphics.clear();
    
        if(queryResult.length == 0){alert("没有该元素！"); return;}
    
        for(var i=0; i<queryResult.length; i++){
            var feature = queryResult[i].feature;
            var geometry = feature.geometry;
    
            var outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255,0,0]), 1);
            var polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, outline, new Color([0,255,1]));
    
            var graphic = new Graphic(geometry, polygonSymbol);
    
            map.graphics.add(graphic);
    
            if(i == queryResult.length-1){
                new QueryClass().setExtentFun(map, geometry);
                
            }
        }
    }

    this.queryByGeometry = function(geometry) {//Query查询根据几何对象
        var query = new Query();
        query.geometry = geometry;
        query.outFields = ["*"];
        query.outSpatialReference = this.map.spatialReference;
        query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
        query.returnGeometry = true;

        var queryTask = new QueryTask(ARCGISCONFIG.DLTB_Dinamic + ARCGISCONFIG.QueryLevel);

        queryTask.execute(query, queryByGeometryResult);
    }

    function queryByGeometryResult(result) {
        //map.graphics.clear();

        if(result.features == 0){alert("no features"); return;}

        for(var i=0; i<result.features.length; i++) {
            var feature = result.features[i];
            var geometry = feature.geometry;

            //alert(feature.attributes.DLMC + "," + feature.attributes.GDLX + "," + feature.attributes.ZZSXMC);
            messageBox(feature);

            var outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255,0,0]), 1);
            var polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, outline, new Color([255,0,1]));

            var graphic = new Graphic(geometry, polygonSymbol);

            map.graphics.add(graphic);

        }

    }


    this.setExtentFun = function(map, geometry){//设置文档可见域
        map.setExtent(geometry.getExtent().expand(30));
    }
}


function mouseClick(map, event)//点击地图高亮读取信息
{
    if(event == "close") {
        handdle.remove();
        handdle = null;
        return;
    }

    handdle = map.on("click", clickFun);

    function clickFun(e) {
        var point = e.mapPoint;
        globalQueryClass.queryByGeometry(point);
    }
}


function messageBox(feature) {//信息框
    $(".theone").css("display","inline-block");//打开信息框
    $(".lone").children().remove();

    var divElement = "";
    divElement += "<div>" + "要素代码：" + feature.attributes.YSDM +"</div>"
    divElement += "<div>" + "图斑编号：" + feature.attributes.TBBH +"</div>"
    divElement += "<div>" + "地类编码：" + feature.attributes.DLBM +"</div>"
    divElement += "<div>" + "地类名称：" + feature.attributes.DLMC +"</div>"
    divElement += "<div>" + "权属性质：" + feature.attributes.QSXZ +"</div>"
    divElement += "<div>" + "权属单位代码：" + feature.attributes.QSDWDM +"</div>"
    divElement += "<div>" + "权属单位名称：" + feature.attributes.QSDWMC +"</div>"
    divElement += "<div>" + "图斑面积：" + feature.attributes.TBMJ +"</div>"
    divElement += "<div>" + "扣除地类编码：" + feature.attributes.KCDLBM  +"</div>"
    divElement += "<div>" + "扣除地类系数：" + feature.attributes.KCXS   +"</div>"
    divElement += "<div>" + "扣除地类面积：" + feature.attributes.KCMJ    +"</div>"
    divElement += "<div>" + " 图斑地类面积：" + feature.attributes.TBDLMJ    +"</div>"
    divElement += "<div>" + "耕地坡度级别：" + feature.attributes.GDPDJB    +"</div>"
    //divElement += "<div>" + "耕地类型：" + feature.attributes.GDLX    +"</div>"
    //divElement += "<div>" + "线状地物宽度：" + feature.attributes.XZDWKD     +"</div>"
    divElement += "<div>" + "图斑细化代码：" + feature.attributes.TBXHDM     +"</div>"
    divElement += "<div>" + "图斑细化名称：" + feature.attributes.TBXHMC     +"</div>"
    divElement += "<div>" + "种植属性代码：" + feature.attributes.ZZSXDM     +"</div>"
    divElement += "<div>" + "种植属性名称：" + feature.attributes.ZZSXMC     +"</div>"
    divElement += "<div>" + "耕地等别：" + feature.attributes.GDDB     +"</div>"
    divElement += "<div>" + "数据年份：" + feature.attributes.SJNF    +"</div>"

    $(".lone").append(divElement);
    $(".mone").html(feature.attributes.DLMC);

}



function queryDLTB(data, menue, rightMenue){//点击左侧树

    var sql = "DLBM in(";

    if(data.length <=0){//叶子节点
        $.ajax({url:config.ip + config.port + '/getMenueByMenueId', type: 'POST', data:{menueid:menue.menueid}, xhrFields:{withCredentials:true}, success:function(result) {
            sql += "'" + result.secondcategory + "'" + ")";
            globalQueryClass.queryTask(sql);

            var elementNodeData = [{"menueid":menue.menueid,"menuename":menue.menuename,"firstcategoryCode":"","secondcategoryCode":result.secondcategory,"secondcategoryName":menue.menuename}]
            creatZhuReport(elementNodeData, menue.menuename);
        }});

        $(".bing").css("display","none");

    }else {
        for(var i=0; i<data.length; i++){
            sql += "'" + data[i].secondcategoryCode + "'" + ",";

            if(i == data.length-1){
                sql += "'" + data[i].secondcategoryCode + "'" + ")";
            }
        }

        globalQueryClass.queryTask(sql);


        createBingReport(data, menue.menuename);
        creatZhuReport(data, menue.menuename)

    }

}

function createBingReport(data, menuename)
{
    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getSecondCategoryCode', type: 'POST', data:{"jsonMenue":JSON.stringify(data)}, xhrFields:{withCredentials:true}, success:function(result) {
        var legendData = "[";
        var seriesData = "["

        for(var i=0; i<result.length; i++){
            if(i == result.length-1){
                legendData += "'" + result[i].dlmc + "'" + "]";
            }else{
                legendData += "'" + result[i].dlmc + "'" + ",";
            }

            if(i == result.length-1){
                seriesData += "{value:" + result[i].area + ",name:" + "'" + result[i].dlmc + "'" + "}]";
            }else{
                seriesData += "{value:" + result[i].area + ",name:" + "'" + result[i].dlmc + "'" + "}" + ",";
            }
        
        }


        $(".bing").css("display","inline-block");

        var myChart = echarts.init(document.getElementById('bing'));

        option = {
            title: {text: menuename + '各地类比例图',left: 'center'},
            tooltip: {trigger: 'item',formatter: '{a} <br/>{b}: {c} ({d}%)'},
            legend: {orient: 'vertical',left: 10,data: eval(legendData)},
            series: [{name: menuename,type: 'pie',radius: ['50%', '70%'],avoidLabelOverlap: false,label: {show: false,position: 'center'},emphasis: {label: {show: true,fontSize: '30',fontWeight: 'bold'}},labelLine: {show: false},data:eval(seriesData)}]
        };

        myChart.setOption(option);

    }});

    
}

function creatZhuReport(data, menuename)
{
    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getSecondCategoryCode', type: 'POST', data:{"jsonMenue":JSON.stringify(data)}, xhrFields:{withCredentials:true}, success:function(result) {
        var xAxisData = "[";
        var seriesData = "[";
        if(result.length <=0) {return;}

        for(var i=0; i<result.length; i++){
            if(i == result.length-1){
                xAxisData += "'" + result[i].dlmc + "'" + "]";
            }else{
                xAxisData += "'" + result[i].dlmc + "'" + ",";
            }

            if(i == result.length-1){
                seriesData +=  result[i].area +"]";
            }else{
                seriesData += result[i].area  + ",";
            }
        }

        $(".zhu").css("display","inline-block");

        var myChartone = echarts.init(document.getElementById('zhu'));
        option = {
            title: {text: menuename + '各地类面积报表',left: 'center'},
            color: ['#3398DB'],
            tooltip: {trigger: 'axis',axisPointer: {type: 'shadow'}},
            grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
            xAxis: [{type: 'category',data:eval(xAxisData),axisLabel:{  
                interval:0,//横轴信息全部显示  
                rotate:45,//-15度角倾斜显示
            } 
            }],
            yAxis: [{type: 'value'}],
            series: [{name: menuename,type: 'bar',data: eval(seriesData)}]
        };

        myChartone.setOption(option);
    }});


   
}

function addProvinceSQL(sql, rightMenue){//判断是否拼接行政区sql

    if(rightMenue.treeCode=="000000"){
        
    }
}














