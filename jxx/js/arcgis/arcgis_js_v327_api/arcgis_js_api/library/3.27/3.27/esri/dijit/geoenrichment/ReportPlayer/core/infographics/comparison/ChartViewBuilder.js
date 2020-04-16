// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/comparison/ChartViewBuilder",["dojo/_base/declare","dojo/_base/lang","../../charts/utils/ChartJsonUtil","../../charts/legends/ChartLegendPlacements","../../themes/ThemeUtil"],function(c,b,d,e,f){return c(null,{viewModel:null,theme:null,parentWidget:null,chartNode:null,width:null,height:null,chartSeriesItems:null,_chartContainer:null,constructor:function(a){b.mixin(this,a)},renderChart:function(){this._chartContainer=this.viewModel.layoutBuilder.createElement("chart",
{node:this.chartNode,json:this._getChartJson(),creationParams:{viewModel:this.viewModel,theme:this._createTheme(),parentWidget:this.parentWidget}})},_createTheme:function(){var a=b.mixin({},this.theme);a.chart=b.mixin({},a.chart);a.chart.colors=f.generateChartColors(null,a.chart.colors[0],{gradientFactor:.75,numLighterColors:Math.max(0,Math.min(1,this.chartSeriesItems.length-4))});return a},_getChartJson:function(){var a=d.getDefaultChartSettings({width:this.width,height:this.height,seriesItems:this.chartSeriesItems});
a.visualProperties.legend.series.placement=e.BOTTOM;return a},destroy:function(){this._chartContainer&&this._chartContainer.destroy();this._chartContainer=null}})});