//业务服务
var config;
config={
    ip: 'http://192.168.11.235',
    port: ':8081',
    newip: 'http://192.168.11.235',
    newport:':5050',
};

//地图服务
var ARCGISCONFIG={
    DLTB_Dinamic:"http://192.168.11.235:6080/arcgis/rest/services/jixian/DLTB_Dynamic/MapServer",
    DLTB_FEATURE:"http://192.168.11.235:6080/arcgis/rest/services/jixian/DLTB/FeatureServer",
    XZQ_TAG_WITH_MAXSCALE_1_50000:"http://192.168.11.235:6080/arcgis/rest/services/jixian/XZQ_TAG_WITH_MAXSCALE1_50000_MapServer/MapServer",

    QueryLevel: "/0",
    FindTaskLevel: 0,

    IMAGE_LAYER_1:"http://192.168.11.235:6080/arcgis/rest/services/jixian/IMAGE_1/ImageServer",
    IMAGE_LAYER_2:"http://192.168.11.235:6080/arcgis/rest/services/jixian/IMAGE_2/ImageServer",
    IMAGE_LAYER_3:"http://192.168.11.235:6080/arcgis/rest/services/jixian/IMAGE_3/ImageServer",

    PRINTTASK:"http://192.168.11.235:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",

    ARCSERVER:"192.168.11.235",
    ARCSERVERPORT:":6080"
};

//地理服务
var GEOSERVER={
    IP:"http://192.168.11.235",
    PORT:":65535"
}

