var imageMap;//影像地图

function addImageLayer(ArcGISDynamicMapServiceLayer,Map, ArcGISImageServiceLayer) {//添加影像服务
    var imageMap = new Map("left-yingxiang", {logo: false});
    var layer1 = new ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_1);
    var layer2 = new ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_2);
    var layer3 = new ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_3);

    imageMap.addLayer(layer1);
    imageMap.addLayer(layer2);
    imageMap.addLayer(layer3);



    globalQueryClass.map.on("zoom-end",function(){
        imageMap.setExtent(globalQueryClass.map.extent);
    });

    globalQueryClass.map.on("mouse-up",function(){
        imageMap.setExtent(globalQueryClass.map.extent);
    });


}




