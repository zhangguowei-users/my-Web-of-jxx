var globalQueryClass;


require(["esri/map", "dojo/dom", "dojo/on","esri/layers/ArcGISDynamicMapServiceLayer", "dojo/query", "esri/tasks/FindTask", "esri/tasks/FindParameters", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/graphic", "esri/tasks/QueryTask", "esri/tasks/query","esri/geometry/Point","esri/graphicsUtils","esri/layers/FeatureLayer","dojo/domReady!"], init);

function init(Map, dom, on, ArcGISDynamicMapServiceLayer, query, FindTask, FindParameters,SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, QueryTask, Query, Point,graphicsUtils,FeatureLayer){

    var map = new Map("map_div", {logo: false});
    var layer = new ArcGISDynamicMapServiceLayer(ARCGISCONFIG.DLTB_Dinamic);
    map.addLayer(layer);
   
    var queryClass =  new QueryClass(map, SimpleLineSymbol,SimpleFillSymbol, QueryTask, Query,FindTask, FindParameters,Color, Graphic);
    globalQueryClass = queryClass;

    mouseClick(map, SimpleLineSymbol,SimpleFillSymbol, QueryTask, Query,FindTask, FindParameters,Color, Graphic);//鼠标点击高亮显示信息

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
        var queryTask = new QueryTask(ARCGISCONFIG.DLTB_Dinamic + "/0");
    
        var query = new Query();
        query.where = querySQL;
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
        findParams.layerIds = [0];
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

        var queryTask = new QueryTask(ARCGISCONFIG.DLTB_Dinamic + "/0");

        queryTask.execute(query, queryByGeometryResult);
    }

    function queryByGeometryResult(result) {
        //map.graphics.clear();

        if(result.features == 0){alert("no features"); return;}

        for(var i=0; i<result.features.length; i++) {
            var feature = result.features[i];
            var geometry = feature.geometry;

            alert(feature.attributes.DLMC + "," + feature.attributes.GDLX + "," + feature.attributes.ZZSXMC);

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


function mouseClick(map, SimpleLineSymbol,SimpleFillSymbol, QueryTask, Query,FindTask, FindParameters,Color, Graphic)//点击地图高亮读取信息
{
    var handdle = map.on("click", clickFun);
    function clickFun(e) {
        var point = e.mapPoint;
        globalQueryClass.queryByGeometry(point);
    }
}

function queryDLTB(data, menue){//点击左侧树

    var sql = "DLBM in(";

    if(data.length <=0){//叶子节点
        $.ajax({url:config.ip + config.port + '/getMenueByMenueId', type: 'POST', data:{menueid:menue.menueid}, xhrFields:{withCredentials:true}, success:function(result) {
            sql += "'" + result.secondcategory + "'" + ")";
            globalQueryClass.queryTask(sql);
        }});

    }else {
        for(var i=0; i<data.length; i++){
            sql += "'" + data[i].secondcategoryCode + "'" + ",";

            if(i == data.length-1){
                sql += "'" + data[i].secondcategoryCode + "'" + ")";
            }
        }

        globalQueryClass.queryTask(sql);

    }

}













