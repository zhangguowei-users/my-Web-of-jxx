function GeoQueryClass(QueryTask, Query, SimpleLineSymbol, SimpleFillSymbol, serverPath)//地理查询类
{
    this.QueryTask = QueryTask;
    this.Query = Query;
    this.SimpleLineSymbol = SimpleLineSymbol;
    this.SimpleFillSymbol = SimpleFillSymbol;
    this.serverPath = serverPath;

    this.queryGeometryByBSM = queryGeometryByBSM;//根据OBJECTID查询几何图形
    this.setServerPath = setServerPath;//设置图层服务地址
    this.setExtentFun = setExtentFun;//设置文档可见域
    this.clearGraphics = clearGraphics;
}

function queryGeometryByBSM(bsm)
{
    var queryTask = new this.QueryTask(this.serverPath + ARCGISCONFIG.QueryLevel);

    var query = new this.Query();
    query.where = "BSM=" + "'" + bsm + "'";
    query.outFields = ["*"];
    query.returnGeometry = true;

    queryTask.execute(query, showQueryResult);

    function showQueryResult(queryResult)
    {
        GEOQUERYCLASS.clearGraphics(MAP);

        var lineSymbol= new GEOQUERYCLASS.SimpleLineSymbol(GEOQUERYCLASS.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
        var fill = new GEOQUERYCLASS.SimpleFillSymbol(GEOQUERYCLASS.SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new dojo.Color([0, 255, 1]));

        if(queryResult.features.length == 0){alert("无结果！"); return;}

        for(let i=0; i<queryResult.features.length; i++)
        {
            var graphic = queryResult.features[i];
            graphic.setSymbol(fill);
            MAP.graphics.add(graphic);

            GEOQUERYCLASS.setExtentFun(MAP, graphic.geometry);
        }
    }
}

function setExtentFun(map, geometry)//设置文档可见域
{
    map.setExtent(geometry.getExtent().expand(3));
}

function setServerPath(obj)//设置图层服务地址
{
    var newLayerURL = "http://"+ARCGISCONFIG.ARCSERVER + ARCGISCONFIG.ARCSERVERPORT+ obj.serverpath;//构建左侧图层
    this.serverPath = newLayerURL;
}

function clearGraphics(map)
{
    map.graphics.clear();
}