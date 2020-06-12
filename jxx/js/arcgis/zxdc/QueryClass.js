function QueryClass()//查询类
{
    this.getLayerData = getLayerData;//获取图层所有属性
}

function getLayerData(jsonObj)//获取图层类
{
    var value ;

    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getLayerData', type: 'POST',async:false, data:{"jsonTree":JSON.stringify(jsonObj)}, xhrFields:{withCredentials:true}, success:function(result)
    {
        value = result;
    }});

    return value;
}