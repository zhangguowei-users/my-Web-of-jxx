var globalQueryClass;
var handdle=null;
var totalPages;
var global_data=null, global_menue=null, global_rightMenue=null;//记录左侧菜单和右侧菜单


require(["esri/map","esri/layers/GraphicsLayer", "dojo/dom", "dojo/on","esri/layers/ArcGISDynamicMapServiceLayer", "dojo/query", "esri/tasks/FindTask", "esri/tasks/FindParameters", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/graphic", "esri/tasks/QueryTask", "esri/tasks/query","esri/geometry/Point","esri/graphicsUtils","esri/layers/FeatureLayer","esri/renderers/UniqueValueRenderer","esri/dijit/OverviewMap","esri/dijit/Scalebar","esri/layers/ArcGISImageServiceLayer","esri/tasks/PrintTask", "esri/tasks/PrintTemplate", "esri/tasks/PrintParameters","esri/toolbars/draw","esri/symbols/TextSymbol","esri/symbols/Font","esri/toolbars/edit","dojo/domReady!"], init);

function init(Map, GraphicsLayer,dom, on, ArcGISDynamicMapServiceLayer, query, FindTask, FindParameters,SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, QueryTask, Query, Point,graphicsUtils,FeatureLayer,UniqueValueRenderer,OverviewMap,Scalebar,ArcGISImageServiceLayer,PrintTask,PrintTemplate,PrintParameters,Draw,TextSymbol,Font,Edit){

    var map = new Map("map_div", {logo: false });
    var layer = new ArcGISDynamicMapServiceLayer(ARCGISCONFIG.DLTB_Dinamic);
    var layer_XZQ = new ArcGISDynamicMapServiceLayer(ARCGISCONFIG.XZQ_TAG_WITH_MAXSCALE_1_50000);
    var graphicsLayer = new GraphicsLayer();
    
    map.addLayer(layer);
    map.addLayer(layer_XZQ);
    map.addLayer(graphicsLayer);

    var queryClass =  new QueryClass(map,Map,on,ArcGISDynamicMapServiceLayer, SimpleLineSymbol,SimpleFillSymbol, QueryTask, Query,FindTask, FindParameters,Color, Graphic,FeatureLayer,UniqueValueRenderer,ArcGISImageServiceLayer,PrintTask,PrintTemplate,PrintParameters,Draw,Point,TextSymbol,Font,graphicsLayer,Edit);
    globalQueryClass = queryClass;

    myOverviewMap(map, dom, OverviewMap);//鹰眼
    myScalebar(map, dom,Scalebar);//比例尺

}

function QueryClass(map, Map,on,ArcGISDynamicMapServiceLayer,SimpleLineSymbol,SimpleFillSymbol, QueryTask, Query, FindTask, FindParameters,Color, Graphic, FeatureLayer,UniqueValueRenderer,ArcGISImageServiceLayer,PrintTask, PrintTemplate, PrintParameters,Draw,Point,TextSymbol,Font,graphicsLayer,Edit){//查询类
    this.map = map;
    this.SimpleLineSymbol = SimpleLineSymbol;
    this.SimpleFillSymbol = SimpleFillSymbol;
    this.QueryTask = QueryTask;
    this.FindTask = FindTask;
    this.FindParameters = FindParameters;
    this.Color = Color;
    this.Graphic = Graphic;
    this.Query = Query;
    this.FeatureLayer = FeatureLayer;
    this.UniqueValueRenderer = UniqueValueRenderer;
    this.ArcGISImageServiceLayer  = ArcGISImageServiceLayer;
    this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
    this.Map = Map;
    this.PrintTask = PrintTask;
    this.PrintTemplate = PrintTemplate;
    this.PrintParameters = PrintParameters;
    this.Draw = Draw;
    this.on = on;
    this.Point = Point;
    this.Font = Font;
    this.graphicsLayer = graphicsLayer;
    this.TextSymbol = TextSymbol;
    this.Edit = Edit;

    this.queryTask = function(querySQL){//Query属性查询
        var queryTask = new QueryTask(ARCGISCONFIG.DLTB_Dinamic + ARCGISCONFIG.QueryLevel);
    
        var query = new Query();
        query.where = querySQL;
        query.outFields = ["*"];
        query.returnGeometry = true;

        queryTask.execute(query, showQueryResult);
    }

    function showQueryResult(queryResult){
        var lineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
        var fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new dojo.Color([0, 255, 1]));
        
        if(queryResult.features.length == 0){alert("无结果！"); return;}

        for(let i=0; i<queryResult.features.length; i++){
            var graphic = queryResult.features[i];
            graphic.setSymbol(fill);
            map.graphics.add(graphic);

            if(totalPages<=1){
                new QueryClass().setExtentFun(map, graphic.geometry);
            }
        }
    }

    this.queryByFindTask = function(searchText){//属性查询
        var findParams = new FindParameters();
        findParams.returnGeometry = true;
        findParams.layerIds = [ARCGISCONFIG.FindTaskLevel];
        findParams.searchFields = ["XZQDM"];
        findParams.searchText = searchText;

        var findTask = new FindTask(ARCGISCONFIG.XZQ_TAG_WITH_MAXSCALE_1_50000);
        findTask.execute(findParams, resultFun);
    }

    function resultFun(queryResult){
        map.graphics.clear();

        for(var i=0; i<queryResult.length; i++){
            var feature = queryResult[i].feature;
            var geometry = feature.geometry;

            var outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255,0,0]), 1);
            var polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, outline, new Color([0,255,1]));

            var graphic = new Graphic(geometry, polygonSymbol);

            //map.graphics.add(graphic);

            map.setExtent(geometry.getExtent().expand(0));
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

    this.UniqRender = function UniqRender(){//唯一值渲染
        var featureLayer = new FeatureLayer("http://192.168.1.109:6080/arcgis/rest/services/jixian/DLTB/FeatureServer/0", {mode:FeatureLayer.MODE_SNAPSHOT, outFields:["*"]});

        var lineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
        var fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new dojo.Color([0, 255, 1]));

        var renderer = new UniqueValueRenderer(fill, "dlbm");
        renderer.addValue("0101", fill);
        
        featureLayer.setRenderer(renderer);
        
        map.addLayer(featureLayer);
    }

    this.setExtentFun = function(map, geometry){//设置文档可见域
        map.setExtent(geometry.getExtent().expand(30));
    }
}


function mouseClick(map, event){//点击地图高亮读取信息
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
    if(data.length <=0){//叶子节点
        $.ajax({url:config.ip + config.port + '/getMenueByMenueId', type: 'POST', data:{menueid:menue.menueid}, xhrFields:{withCredentials:true}, success:function(result) {
            var newMenue = new Array();
            newMenue.push({'menueid':result.menueid, 'menuename':result.menuename, 'firstcategoryCode':result.firstcategory, 'secondcategoryCode':result.secondcategory, 'secondcategoryName':''});
            
            global_data=newMenue;//全局二级分类数据

            $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getDLTB', type: 'POST', data:{"jsonMenue":JSON.stringify(newMenue), "proviceCode":getCountryCode(rightMenue)}, xhrFields:{withCredentials:true}, success:function(resultData){
                queryDltbByObjectID(resultData);//根据OBJECTID查询图斑并高亮
            }});

            var elementNodeData = [{"menueid":menue.menueid,"menuename":menue.menuename,"firstcategoryCode":"","secondcategoryCode":result.secondcategory,"secondcategoryName":menue.menuename}]
            creatZhuReport(elementNodeData, menue.menuename, rightMenue);
        }});

        $(".bing").css("display","none");

    }else {
        $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getDLTB', type: 'POST', data:{"jsonMenue":JSON.stringify(data), "proviceCode":getCountryCode(rightMenue)}, xhrFields:{withCredentials:true}, success:function(resultData){
            queryDltbByObjectID(resultData);//根据OBJECTID查询图斑并高亮
        }});
         
        createBingReport(data, menue.menuename,rightMenue);
        creatZhuReport(data, menue.menuename, rightMenue)

        global_data=data;//全局二级分类数据

    }

    global_menue=menue; 
    global_rightMenue=rightMenue;

}

function pagination(pageNo, pageSize, array) {//分页
    var offset = (pageNo - 1) * pageSize;
    return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
}

function getTotalRecord(totalRecord, pageSize){//求总页数
    return parseInt((totalRecord + pageSize - 1) / pageSize);
}

function queryDltbByObjectID(result){//根据OBJECTID查询图斑并高亮
    globalQueryClass.map.graphics.clear();

    if(result.length <= 0){alert("无结果！"); return;}

    var totalRecord = result.length;//总记录数
    var pageSize = 1000;//每页大小

    totalPages = getTotalRecord(totalRecord, pageSize);//总页数

    for(var i=1; i<=totalPages; i++){//每页
        var sql = "OBJECTID in("

        var pageResult = pagination(i, pageSize,result);//某页数据

        for(var j=0; j<pageResult.length; j++){
            sql += pageResult[j].objectid +",";
            if(j == pageResult.length-1){
                sql += pageResult[j].objectid + ")";
            }
        }
        globalQueryClass.queryTask(sql);
    }
    //globalQueryClass.setExtentFun(globalQueryClass.map, GEOMETRY);
    //new QueryClass().setExtentFun(globalQueryClass.map, GEOMETRY);
}


function createBingReport(data, menuename, rightMenue){
    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getSecondCategoryCode', type: 'POST', data:{"jsonMenue":JSON.stringify(data), "proviceCode":getCountryCode(rightMenue)}, xhrFields:{withCredentials:true}, success:function(result) {
        console.log({url:GEOSERVER.IP + GEOSERVER.PORT + '/getSecondCategoryCode', type: 'POST', data:{"jsonMenue":JSON.stringify(data), "proviceCode":getCountryCode(rightMenue)}})
        var legendData = "[";
        var seriesData = "["

        if(result.length<=0){return;}

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
            legend: {orient: 'vertical',right:12,top:21,data: eval(legendData)},
            series: [{name: menuename,type: 'pie',center:['25%','50%'],radius: ['50%', '70%'],avoidLabelOverlap: false,label: {show: false,position: 'center'},emphasis: {label: {show: true,fontSize: '30',fontWeight: 'bold'}},labelLine: {show: false},data:eval(seriesData)}]
        };

        myChart.setOption(option);

    }});

    
}

function creatZhuReport(data, menuename, rightMenue){
    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getSecondCategoryCode', type: 'POST', data:{"jsonMenue":JSON.stringify(data), "proviceCode":getCountryCode(rightMenue)}, xhrFields:{withCredentials:true}, success:function(result) {
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


    changeToolBarBlue();//设置工具栏眼睛图标选中
   
}

function addProvinceSQL(sql, rightMenue){//判断是否拼接行政区sql

    if(rightMenue.treeCode=="000000"){//集贤县

    }else{
         if(rightMenue.subAdministrations.length>0){//乡镇
            var countryCode = rightMenue.treeCode.substring(0,9);
            sql += " and QSDWDM like " + "'" + countryCode + "%'" ;

         }else{
            sql += " and QSDWDM like " + "'" + rightMenue.treeCode + "'" ;
         }
        
    }

    return sql;
}

function getCountryCode(rightMenue){//获取截取好的行政区码，县级：000000，乡镇：230521 100，村：230521 100 300 0000000

    var countryCode = "";

    if(rightMenue.treeCode=="000000"){//集贤县
        countryCode = rightMenue.treeCode;
    }else{
         if(rightMenue.subAdministrations.length>0){//乡镇
            countryCode = rightMenue.treeCode.substring(0,9);
         }else{
            countryCode = rightMenue.treeCode;
         }
        
    }
    return countryCode;
}


function exportReportPDF(map, event){//导出报表按钮，根据行政区和地类
    if(event == "close") {
        return;
    }

    if(global_data==null || global_rightMenue==null){
        alert("请选择行政区与地类！");
        return;
    }

    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/exportReportPDF', type: 'POST', data:{"jsonMenue":JSON.stringify(global_data), "proviceCode":getCountryCode(global_rightMenue), "rightMenueName":global_rightMenue.name, "menuename":global_menue.menuename}, xhrFields:{withCredentials:true}, success:function(result) {

        var link = document.createElement('a');//下载报表文件
        link.setAttribute("download", "");
        link.href = result.result;
        link.click();
        
    }});



}

function myOverviewMap(map, dom, OverviewMap){//鹰眼
    var overviewMapDijit = new OverviewMap({map:map, visible:true}, dom.byId("xx"));
    overviewMapDijit.startup();
}

function myScalebar(map, dom, Scalebar) {//比例尺
    var scalebar = new Scalebar({ map: map, attachTo:"top-left", scalebarUnit: "metric"}, dojo.byId("sca"));
}

function changeToolBarBlue() {//设置工具栏眼睛图标选中
    $(".map_35").attr("class","map01_35");
}

function xzqExtent(rightMenue) {//左侧树，行政区导航

    if(rightMenue.name == "黑龙江省笔架山监狱"){//监狱特殊处理
        globalQueryClass.queryByFindTask(rightMenue.treeCode.substring(0,9));
    }else {
        globalQueryClass.queryByFindTask(getCountryCode(rightMenue));
    }

}






