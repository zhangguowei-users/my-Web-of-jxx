function ReportClass(legendData, seriesData)//报表类
{
    this.legendData = legendData;
    this.seriesData = seriesData;

    this.createBingChar = createBingChar;
}

function createBingChar(domElement, title, seriesName)
{
    var bing = echarts.init(domElement);

    var option = {title: {text: title, top:0, left: 'center', textStyle:{color:'#333333', fontSize:18, fontFamily:'SourceHanSansCN-', fontStyle :'normal', fontWeight:400}}, tooltip: {trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)'},
        legend: {orient: 'horizontal',  bottom: 'bottom', data: this.legendData, textStyle:{color:'#333333', fontFamily:'SourceHanSansCN-', fontStyle :'normal', fontWeight:400}, itemHeight:9, itemWidth:9,type:'scroll'},
        series: [{name: seriesName, type: 'pie', radius: '55%', center: ['50%', '45%'], data: this.seriesData, emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}}}]
    };

    bing.setOption(option);

}