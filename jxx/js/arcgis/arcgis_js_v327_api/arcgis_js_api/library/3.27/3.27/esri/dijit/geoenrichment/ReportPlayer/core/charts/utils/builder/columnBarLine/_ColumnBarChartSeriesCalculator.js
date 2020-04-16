// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/builder/columnBarLine/_ColumnBarChartSeriesCalculator","dojo/_base/lang ../../ThemeCalculator ../../ChartSorting ../../../../supportClasses/conditionalStyling/ConditionalStyleUtil ../utils/ChartDataUtil ../utils/TooltipInfoBuilder ./_ComparisonUtil ./_AxisBuilder ./_PointLabelUtil".split(" "),function(F,w,B,C,x,G,H,I,A){return{calcSeriesColumnBar:function(a){var g=a.chart,h=a.visualProperties,c=a.seriesItems,p=1===c.length,t=a.seriesItemsWithComparison||
c,k=a.chartType,y=a.comparisonInfo,z=a.themeSettings,u=a.viewModel,l=1===t.length&&a.sorting,x=1<t.length&&h.renderColumnBarsInOppositeDirections,m=[],b={minYValue:Infinity,maxYValue:-Infinity,stackedValues:h.isStacked?[]:null};A.createPointToLabelMap(g);var v={};t.forEach(function(f,c){if(f.points.length){var n={name:f.label,data:[],isComparisonSeries:f.isComparisonSeries,params:{plot:f.isComparisonSeries&&H.getComparisonPlotName(k,y)||void 0}},d=this._collectStatisticsForSeries(a,f,c,b);w.provideMissingIconsForPoints(f.points,
k);var D=[];f.points.forEach(function(e,b){var g=d.values[b],l=g||0,m=b+1,r;h.conditionalStyling&&(r=(r=C.getConditionalStyle(l,h.conditionalStyling))&&r.backgroundColor);r=r||w.calcColorForPoint({point:e,seriesItem:f,pointIndex:b,seriesIndex:c,numSeries:p?1:t.length,chartType:k,themeSettings:z,isComparisonSeries:f.isComparisonSeries,comparisonInfo:y,isMultiFeature:a.isMultiFeatureChart});var q=G.getTooltipInfo({yValue:g,pointLabel:A.getPointLabel(e,u),seriesLabel:f.label,minInSeriesValue:d.minInSeries,
maxInSeriesValue:d.maxInSeries,sumInSeriesValue:d.valuesSum,absSumInSeriesValue:d.absValuesSum,avgInSeriesValue:d.avgInSeries,minInAreasValue:d.minInSeries,maxInAreasValue:d.maxInSeries,sumInAreasValue:d.valuesSum,absSumInAreasValue:d.absValuesSum,avgInAreasValue:d.avgInSeries,visualProperties:h,chartType:k,isMultiFeature:a.isMultiFeatureChart,color:r,conditionalStyling:h.conditionalStyling,fieldInfo:e.fieldInfo,isThisAreaSpecific:y&&!a.isMultiFeatureChart?!f.isComparisonSeries:void 0,isThisAreaSingleSeries:p,
decimals:e.value&&e.value.decimals}),E=v[m]=v[m]||[];E.push(q);D.push(q);q.getGroup=function(){return a.isMultiFeatureChart?D:E};e={x:m,y:l*(x&&c>=t.length/2?-1:1),originalValue:g,isUnavailableData:isNaN(g),valueProp:"y",unsortedIndex:b,seriesIndex:c,name:A.getPointLabel(e,u),_valuesSumsInSeries:d.absValuesSum,point:e,fill:r,tooltip:q,icon:w.calcIconForPoint(e,r,k),bgIcon:w.calcBackgroundIconForPoint(e,k,z,h),stroke:{width:0}};h.yAxis.showValuesAsWeightsInSeries&&(e.y/=d.absValuesSum/100);n.data.push(e)});
l&&l!==B.NONE&&(n.data.sort(function(a,b){return(a.y-b.y)*(l===B.DESC?-1:1)}),n.data.forEach(function(a,b){a.x=b+1}));n.data.forEach(function(a){A.updatePointIndexToLabelMap(g,a.x,a.point,u)});m.push(n)}},this);b.stackedValues&&(b.stackedValues.sort(function(a,b){return b-a}),b.minYValue=b.stackedValues[b.stackedValues.length-1],b.maxYValue=b.stackedValues[0]);I.prettifyYAxis(b.minYValue,b.maxYValue,h.yAxis.baseLineValue,g,h,k,z,u,m.length);a.plotStat&&(F.mixin(a.plotStat,b),a.plotStat.pointIndexToTooltipsHash=
v);return m},_collectStatisticsForSeries:function(a,g,h,c){var p=a.visualProperties,t=a.viewModel,k=a.seriesItems,y=a.currentFeatureIndex,z=a.isMultiFeatureChart,u=a.excludedSeriesHash&&a.excludedSeriesHash[g.label],l=a.comparisonFeatureIds,w=a.ge,m=a.chartType;a=1<k.length&&p.renderColumnBarsInOppositeDirections;var b=2===k.length&&a?x.CHART_DATA_SMOOTH:null;p.conditionalStyling&&(a=C.getStatistics(p.conditionalStyling))&&k.length&&(b=x.getChartData(a,k[0].points.length,b,!1));var v=[],f=0,q=0,n=
1E6,d=-1E6;g.points.forEach(function(a,e){a=x.getPointValue({point:a,index:e,seriesIndex:h,maxValue:!1,chartType:m,visualProperties:p,viewModel:t,currentFeatureIndex:z?e:y,chartData:b,isComparisonSeries:g.isComparisonSeries,comparisonFeatureId:l&&l[0],ge:w,allowNegativeValuesInPreview:!1});a=(v[e]=a)||0;u||(f+=a,q+=Math.abs(a),n=Math.min(n,a),d=Math.max(d,a))});u||g.points.forEach(function(a,b){a=v[b];a=p.yAxis.showValuesAsWeightsInSeries?a/q*100:a;c.stackedValues?(c.stackedValues[b]=c.stackedValues[b]||
0,c.stackedValues[b]+=a):(c.minYValue=Math.min(a,c.minYValue),c.maxYValue=Math.max(a,c.maxYValue))});return{values:v,valuesSum:f,absValuesSum:q,minInSeries:n,maxInSeries:d,avgInSeries:f/g.points.length}}}});