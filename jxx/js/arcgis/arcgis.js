require(["esri/map", "dojo/dom", "dojo/on","esri/layers/ArcGISDynamicMapServiceLayer", "dojo/query", "esri/tasks/FindTask", "esri/tasks/FindParameters", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/graphic", "esri/tasks/QueryTask", "esri/tasks/query","esri/geometry/Point","esri/graphicsUtils","dojo/domReady!"], init);

function init(Map, dom, on, ArcGISDynamicMapServiceLayer, query, FindTask, FindParameters,SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, QueryTask, Query, Point,graphicsUtils){

   var map = new Map("map_div", {logo: false});
   var layer = new ArcGISDynamicMapServiceLayer("http://192.168.1.109:6080/arcgis/rest/services/mygis/arcgis_learn_3/MapServer");
   map.addLayer(layer);

   queryByFindTask("七星林场", map, query, FindTask, FindParameters, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, graphicsUtils);

   
}


function queryByFindTask(queryString, map, query, FindTask, FindParameters, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, graphicsUtils){//属性查询
    var findParams = new FindParameters();
    findParams.returnGeometry = true;
    findParams.layerIds = [1];
    findParams.searchFields = ["QSDWMC"];
    findParams.searchText = queryString;

    var findTask = new FindTask("http://192.168.1.109:6080/arcgis/rest/services/mygis/arcgis_learn_3/MapServer");
    findTask.execute(findParams, resultFun);

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
                setExtent(map, geometry);
            }
        }
    }
}


function setExtent(map, geometry){//设置文档可见域
    map.setExtent(geometry.getExtent().expand(0));
}