require(["esri/map","dojo/on","esri/layers/ArcGISDynamicMapServiceLayer","dojo/domReady!"], init);

function init(Map, on, ArcGISDynamicMapServiceLayer)
{
    var esriPojo = new EsriPojo(Map, on, ArcGISDynamicMapServiceLayer);

    esriPojo.addMap(ARCGISCONFIG.XZQ_TAG_WITH_MAXSCALE_1_50000);
}


function EsriPojo(Map, on, ArcGISDynamicMapServiceLayer)//地图类
{
    this.Map = Map;
    this.on = on;
    this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;

    this.addMap = addMap;//添加地图

}

function addMap(layer)//添加地图
{
    var map = new this.Map("zxdc_map_div", {logo: false });
    var layer_XZQ = new this.ArcGISDynamicMapServiceLayer(layer);

    map.addLayer(layer_XZQ);
}






