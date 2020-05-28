function printMap(title, paper, format, PrintTask, PrintTemplate, PrintParameters) {//地图打印
    var printMap = new PrintTask(ARCGISCONFIG.PRINTTASK);//创建地图打印对象
    var template = new PrintTemplate();//创建地图打印模版
    var params = new PrintParameters();//创建地图的打印参数，参数里面包括：模版和地图
    printMap.outSpatialReference = globalQueryClass.map.SpatialReference//输出图片的空间参考
    template.exportOptions = {width: 1500, height: 80000, dpi: 96};//打印图片的各种参数

    template.format = format;//打印输出的格式
    template.layout = paper;//输出地图的布局

    params.map = globalQueryClass.map;//设置参数地图
    params.template = template;//设置参数模版

    printMap.execute(params, function(result){//运行结果
        if (result != null) {
            window.open(result.url);
            var link = document.createElement('a');
            link.setAttribute("download", "");
            //link.href = result.url;
            link.click();
        }
    });



}

function requestServer() {
    $.ajax({url:config.ip + config.port + '', type: 'POST', data:{}, xhrFields:{withCredentials:true}, success:function(data) {
        location.href = data;
    }, error:function() {
       alert("打印失败");
    }});

}