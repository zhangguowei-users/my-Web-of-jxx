var MAP = null;
var ESRIPOJO = null;
var TOOLSCLASS = null;
var IMAGECLASS = null;
var GEOQUERYCLASS = null;

require(["esri/map","esri/layers/GraphicsLayer", "dojo/dom", "dojo/on","esri/layers/ArcGISDynamicMapServiceLayer",
         "dojo/query", "esri/tasks/FindTask", "esri/tasks/FindParameters", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
         "esri/Color", "esri/graphic", "esri/tasks/QueryTask", "esri/tasks/query","esri/geometry/Point","esri/graphicsUtils","esri/layers/FeatureLayer",
         "esri/renderers/UniqueValueRenderer","esri/dijit/OverviewMap","esri/dijit/Scalebar","esri/layers/ArcGISImageServiceLayer","esri/tasks/PrintTask",
         "esri/tasks/PrintTemplate", "esri/tasks/PrintParameters","esri/toolbars/draw","esri/symbols/TextSymbol","esri/symbols/Font","esri/toolbars/edit","dojo/domReady!"], init);

function init(Map, GraphicsLayer,dom,on, ArcGISDynamicMapServiceLayer,query,FindTask,FindParameters,SimpleLineSymbol,SimpleFillSymbol,Color,graphic,QueryTask,query,Point,graphicsUtils,FeatureLayer,UniqueValueRenderer,OverviewMap,Scalebar,ArcGISImageServiceLayer,PrintTask,PrintTemplate,PrintParameters,draw,TextSymbol,Font,edit)
{
    var esriPojo = new EsriPojo(Map, on, ArcGISDynamicMapServiceLayer);
    var toolsClass = new ToolsClass(dom, OverviewMap, Scalebar);
    var imageClass = new ImageClass(ArcGISDynamicMapServiceLayer, Map, ArcGISImageServiceLayer);
    var geoQueryClass = new GeoQueryClass(QueryTask, query, SimpleLineSymbol, SimpleFillSymbol, null);

    ESRIPOJO = esriPojo;
    TOOLSCLASS = toolsClass;
    IMAGECLASS = imageClass;
    GEOQUERYCLASS = geoQueryClass;

    esriPojo.addMap(ARCGISCONFIG.XZQ_TAG_WITH_MAXSCALE_1_50000);

}

function EsriPojo(Map, on, ArcGISDynamicMapServiceLayer)//地图类
{
    this.Map = Map;
    this.on = on;
    this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;

    this.addMap = addMap;//添加地图
    this.removeLayer = removeLayer;//移除地图
    this.addDynamicLayer = addDynamicLayer;//添加动态图层
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
    var layer_XZQ = new this.ArcGISDynamicMapServiceLayer(layer, {id:'layer_XZQ'});

    map.addLayer(layer_XZQ);
}

function removeLayer(layerId)//移除图层
{
    if(MAP.getLayer(layerId) != undefined) 
    {
        MAP.removeLayer(MAP.getLayer(layerId));
    }
}

function addDynamicLayer(obj)//添加动态图层
{
    if(obj.serverpath==null || obj.subSpecialMenue.length!=0)
    {
        return;
    }
    else
    {
        this.removeLayer("newLayer");//移除

        var newLayerURL = "http://"+ARCGISCONFIG.ARCSERVER + ARCGISCONFIG.ARCSERVERPORT+ obj.serverpath;//构建左侧图层
        var newLayer = new this.ArcGISDynamicMapServiceLayer(newLayerURL, {id:'newLayer'});
        MAP.addLayer(newLayer);

    }

}

function myOverviewMap(){//鹰眼
    var overviewMapDijit = new this.OverviewMap({map:MAP, visible:true}, this.dom.byId("xx"));
    overviewMapDijit.startup();
}

function myScalebar() {//比例尺
    var scalebar = new this.Scalebar({ map: MAP, attachTo:"top-left", scalebarUnit: "metric"}, dojo.byId("sca"));
}





