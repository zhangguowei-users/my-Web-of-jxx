require(["esri/map", "dojo/dom", "dojo/on","esri/layers/ArcGISDynamicMapServiceLayer", "dojo/query", "esri/tasks/FindTask", 
        "esri/tasks/FindParameters", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/graphic",
        "esri/tasks/QueryTask", "esri/tasks/query","dojo/domReady!"], init);


function init(Map, dom, on, ArcGISDynamicMapServiceLayer, query, FindTask, FindParameters,SimpleLineSymbol, SimpleFillSymbol, Color, Graphic, QueryTask, Query)
{
    var map = new Map("map_div", {logo: false});

    var layer = new ArcGISDynamicMapServiceLayer("http://192.168.1.109:6080/arcgis/rest/services/mygis/arcgis_learn_3/MapServer");

    map.addLayer(layer);



}
 
