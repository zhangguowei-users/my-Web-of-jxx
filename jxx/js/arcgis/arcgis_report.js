function createAllDLBingReport() {//所有地类饼形图

    console.log(right);

    console.log(getCountryCode(right));

    var quanbu_bing = document.getElementById("quanbu-bing");
    var myChart_bing = echarts.init(quanbu_bing);

    option = {
        title: {text: '某站点用户访问来源', left: 'center'}, tooltip: {trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)'},
        legend: {left:1, top:21, orient: 'vertical', data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']},
        series: [{name: '访问来源', type: 'pie', radius: '55%', center: ['80%', '50%'], data: [{value: 335, name: '直接访问'}, {value: 310, name: '邮件营销'}, {value: 234, name: '联盟广告'}, {value: 135, name: '视频广告'}, {value: 1548, name: '搜索引擎'}], emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}}}]
    };

    myChart_bing.setOption(option);
}

function createAllDLZhuReport() {//所有地类柱形图
    const quanbu_zhu = document.querySelector("#quanbu-zhu");
    const myChart_zhu = echarts.init(quanbu_zhu);

    option = {title: {text:'各地类面积报表',left: 'center'}, xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel:{interval:0, rotate:45,}}, yAxis: {type: 'value'},
             series: [{data: [120, 200, 150, 80, 70, 110, 130], type: 'bar', showBackground: true, backgroundStyle: {color: 'rgba(220, 220, 220, 0.8)'}}]};

    myChart_zhu.setOption(option);
}