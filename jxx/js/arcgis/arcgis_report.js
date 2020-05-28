function createAllDLBingReport() {//所有地类饼形图
    var legendData = "[";
    var seriesData = "[";

    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getAllDltbAreaByProvinceCode', type: 'POST', data:{"proviceCode":getCountryCode(right)}, xhrFields:{withCredentials:true}, success:function(result){
        for(var i=0; i<result.length; i++){
            if(i == result.length-1){
                legendData += "'" + result[i].dlmc + "'" + "]";
            }else{
                legendData += "'" + result[i].dlmc + "'" + ",";
            }

            if(i == result.length-1){
                seriesData += "{value:" + result[i].area + ",name:" + "'" + result[i].dlmc + "'" + "}]";
            }else{
                seriesData += "{value:" + result[i].area + ",name:" + "'" + result[i].dlmc + "'" + "}" + ",";
            }
        }

        var quanbu_bing = document.getElementById("quanbu-bing");
        var myChart_bing = echarts.init(quanbu_bing);

        option = {
            title: {text: right.name + '所有地类比例报表', left: 'center'}, tooltip: {trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)'},
            legend: {left:1, top:21, orient: 'vertical', data: eval(legendData)},
            series: [{name: right.name, type: 'pie', radius: '55%', center: ['80%', '70%'], data: eval(seriesData), emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}}}]
        };

        myChart_bing.setOption(option);

    }});


}

function createAllDLZhuReport() {//所有地类柱形图
    $.ajax({url:GEOSERVER.IP + GEOSERVER.PORT + '/getAllDltbAreaByProvinceCode', type: 'POST', data:{"proviceCode":getCountryCode(right)}, xhrFields:{withCredentials:true}, success:function(result){
        var xAxisData = "[";
        var seriesData = "[";
        if(result.length <=0) {return;}

        for(var i=0; i<result.length; i++){
            if(i == result.length-1){
                xAxisData += "'" + result[i].dlmc + "'" + "]";
            }else{
                xAxisData += "'" + result[i].dlmc + "'" + ",";
            }

            if(i == result.length-1){
                seriesData +=  result[i].area +"]";
            }else{
                seriesData += result[i].area  + ",";
            }
        }

        const quanbu_zhu = document.querySelector("#quanbu-zhu");
        const myChart_zhu = echarts.init(quanbu_zhu);

        option = {title: {text:right.name +'所有地类面积报表',left: 'center'},tooltip: {trigger: 'axis',axisPointer: {type: 'shadow'}}, xAxis: {type: 'category', data: eval(xAxisData), axisLabel:{interval:0, rotate:45,}}, yAxis: {type: 'value'},
            series: [{data: eval(seriesData), type: 'bar', showBackground: true, backgroundStyle: {color: 'rgba(220, 220, 220, 0.8)'}}]};

        myChart_zhu.setOption(option);

    }});








}