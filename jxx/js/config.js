//业务服务
var config;
config={
    ip: 'http://192.168.1.109',
    port: ':8081',
    newip: 'http://192.168.1.106',
    newport:':5050',
    imgip: 'http://192.168.1.106',
    imgport:':6060'
};

//地图服务
var ARCGISCONFIG={
    DLTB_Dinamic:"http://192.168.1.109:6080/arcgis/rest/services/jixian/DLTB_Dynamic/MapServer",
    DLTB_FEATURE:"http://192.168.1.109:6080/arcgis/rest/services/jixian/DLTB/FeatureServer",
    XZQ_TAG_WITH_MAXSCALE_1_50000:"http://192.168.1.109:6080/arcgis/rest/services/jixian/XZQ_TAG_WITH_MAXSCALE1_50000/MapServer",
    
    QueryLevel: "/0",
    FindTaskLevel: 0,

    IMAGE_LAYER_1:"http://192.168.1.109:6080/arcgis/rest/services/jixian/IMAGE_1/ImageServer",
    IMAGE_LAYER_2:"http://192.168.1.109:6080/arcgis/rest/services/jixian/IMAGE_2/ImageServer",
    IMAGE_LAYER_3:"http://192.168.1.109:6080/arcgis/rest/services/jixian/IMAGE_3/ImageServer"

};

//地理服务
var GEOSERVER={
    IP:"http://192.168.1.109",
    PORT:":65535"
}

