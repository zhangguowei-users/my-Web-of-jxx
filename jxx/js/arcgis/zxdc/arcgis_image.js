function ImageClass(ArcGISDynamicMapServiceLayer, Map, ArcGISImageServiceLayer)//影像类
{
    this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
    this.Map = Map;
    this.ArcGISImageServiceLayer = ArcGISImageServiceLayer;

    this.addImageLayer = addImageLayer;//添加影像

}

function addImageLayer()//添加影像服务
{
    var imageMap = new this.Map("xx", {logo: false});
    var layer1 = new this.ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_1);
    var layer2 = new this.ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_2);
    var layer3 = new this.ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_3);

    imageMap.addLayer(layer1);
    imageMap.addLayer(layer2);
    imageMap.addLayer(layer3);

    MAP.on("zoom-end",function()
    {
        imageMap.setExtent(MAP.extent);
    });

    MAP.on("mouse-up",function()
    {
        imageMap.setExtent(MAP.extent);
    });


}