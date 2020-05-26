var imageMap;//影像地图

function addImageLayer(ArcGISDynamicMapServiceLayer,Map, ArcGISImageServiceLayer) {//添加影像服务
    var imageMap = new Map("left-yingxiang", {logo: false});
    var layer1 = new ArcGISImageServiceLayer("http://192.168.1.109:6080/arcgis/rest/services/jixian/IMAGE_1/ImageServer");
    var layer2 = new ArcGISImageServiceLayer("http://192.168.1.109:6080/arcgis/rest/services/jixian/IMAGE_2/ImageServer");
    var layer3 = new ArcGISImageServiceLayer("http://192.168.1.109:6080/arcgis/rest/services/jixian/IMAGE_3/ImageServer");

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




