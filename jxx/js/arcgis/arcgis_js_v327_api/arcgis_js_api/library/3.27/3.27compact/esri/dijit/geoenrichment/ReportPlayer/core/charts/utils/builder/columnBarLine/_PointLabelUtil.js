// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/builder/columnBarLine/_PointLabelUtil",["dojo/number","../utils/ChartDataUtil","../../ChartTypes","esri/dijit/geoenrichment/utils/ObjectUtil"],function(g,h,k,l){return{getPointLabel:function(a,b){return a.captionFieldInfo?h.getCaptionValue(a,b):a.label||""},createPointToLabelMap:function(a){a._pointIndexToLabelMap={}},updatePointIndexToLabelMap:function(a,b,d,c){var e=a._pointIndexToLabelMap[b];if(void 0===e||""===e)a._pointIndexToLabelMap[b]=
this.getPointLabel(d,c)},getXAxisLabelFunc:function(a){return function(b,d,c){d=a._pointIndexToLabelMap&&a._pointIndexToLabelMap[d];return void 0!==d?d:b}},getYAxisLabelFunc:function(a,b,d){return function(c,e,f){k.isColumnBarLike(d)&&b.renderColumnBarsInOppositeDirections&&(e=Math.abs(e));if(c=b.yAxis.showPercentIndicator)c=e,f=a.getAxis("y").opt,c=c-f.majorTickStep<f.min||c+f.majorTickStep>f.max;return c?g.format(e/100,{places:0,type:"percent"}):l.formatNumber(e)}}}});