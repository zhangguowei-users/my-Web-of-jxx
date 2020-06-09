var MAP = null;
var ESRIPOJO = null;

require(["esri/map","esri/layers/GraphicsLayer", "dojo/dom", "dojo/on","esri/layers/ArcGISDynamicMapServiceLayer",
         "dojo/query", "esri/tasks/FindTask", "esri/tasks/FindParameters", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
         "esri/Color", "esri/graphic", "esri/tasks/QueryTask", "esri/tasks/query","esri/geometry/Point","esri/graphicsUtils","esri/layers/FeatureLayer",
         "esri/renderers/UniqueValueRenderer","esri/dijit/OverviewMap","esri/dijit/Scalebar","esri/layers/ArcGISImageServiceLayer","esri/tasks/PrintTask",
         "esri/tasks/PrintTemplate", "esri/tasks/PrintParameters","esri/toolbars/draw","esri/symbols/TextSymbol","esri/symbols/Font","esri/toolbars/edit","dojo/domReady!"], init);

function init(Map, GraphicsLayer,dom,on, ArcGISDynamicMapServiceLayer,query,FindTask,FindParameters,SimpleLineSymbol,SimpleFillSymbol,Color,graphic,QueryTask,query,Point,graphicsUtils,FeatureLayer,UniqueValueRenderer,OverviewMap,Scalebar,ArcGISImageServiceLayer,PrintTask,PrintTemplate,PrintParameters,draw,TextSymbol,Font,edit)
{
    var esriPojo = new EsriPojo(Map, on, ArcGISDynamicMapServiceLayer);
    var toolsClass = new ToolsClass(dom, OverviewMap, Scalebar);
    ESRIPOJO = esriPojo;

    esriPojo.addMap(ARCGISCONFIG.XZQ_TAG_WITH_MAXSCALE_1_50000);
    toolsClass.myOverviewMap();
    toolsClass.myScalebar();
}

function EsriPojo(Map, on, ArcGISDynamicMapServiceLayer)//地图类
{
    this.Map = Map;
    this.on = on;
    this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;

    this.addMap = addMap;//添加地图
}

function ToolsClass(dom, OverviewMap, Scalebar)//地图工具类
{
    this.dom = dom;
    this.OverviewMap = OverviewMap;
    this.Scalebar = Scalebar;

    this.myOverviewMap = myOverviewMap;//鹰眼
    this.myScalebar = myScalebar;//比例尺
}

function addMap(layer)//添加地图
{
    var map = new this.Map("zxdc_map_div", {logo: false });
    MAP = map;
    var layer_XZQ = new this.ArcGISDynamicMapServiceLayer(layer);

    map.addLayer(layer_XZQ);
}

function myOverviewMap(){//鹰眼
    var overviewMapDijit = new this.OverviewMap({map:MAP, visible:true}, this.dom.byId("zxdc_overview"));
    overviewMapDijit.startup();
}

function myScalebar(dom, Scalebar) {//比例尺
    var scalebar = new this.Scalebar({ map: MAP, attachTo:"top-left", scalebarUnit: "metric"}, dojo.byId("sca"));
}






