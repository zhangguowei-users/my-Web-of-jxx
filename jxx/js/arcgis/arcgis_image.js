function addImageLayer(map, ArcGISImageServiceLayer) {//添加影像服务
    var layer_1 = new ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_1);
    var layer_2 = new ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_2);
    var layer_3 = new ArcGISImageServiceLayer(ARCGISCONFIG.IMAGE_LAYER_3);

    map.addLayer(layer_1);
    map.addLayer(layer_2);
    map.addLayer(layer_3);
}