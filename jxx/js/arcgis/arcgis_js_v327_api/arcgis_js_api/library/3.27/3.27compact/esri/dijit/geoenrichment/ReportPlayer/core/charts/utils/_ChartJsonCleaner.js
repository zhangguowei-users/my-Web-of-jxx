// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/_ChartJsonCleaner",["./ChartTypes","./ChartDataLabelsTypes","../legends/ChartLegendTypes","../legends/ChartLegendPlacements"],function(c,k,l,h){var m={cleanUpJson:function(a,f){f=f||{};var d=a.type,g=a.isMultiFeatureChart,e=a.seriesItems.length,b=a.visualProperties;c.isRoundChart(d)&&1<e&&(e=a.seriesItems.length=1,delete b.backgroundImageData);c.isConditionalStylingEnabled(d)||delete b.conditionalStyling;c.isSortingEnabled(d,e,g)||delete b.sorting;
c.isComparisonEnabled(d,g)<e&&delete a.comparisonInfo;c.isStackEnabled(d,e)||(delete b.fillLineArea,delete b.isStacked,b.lineAreaOpacity=1);c.isRenderInOppositeDirectionsEnabled(d,e,g)||delete b.renderColumnBarsInOppositeDirections;c.isShowDataAsWeightEnabled(d)||delete b.yAxis.showValuesAsWeightsInSeries;b.legend.type!==l.SERIES||c.isSeriesLegendEnabled(d,e,g)||(b.legend.series.placement=h.NONE);2===e&&a.comparisonInfo&&(b.showColumnBarBackground=!1,b.isStacked=!1);b.renderColumnBarsInOppositeDirections&&
b.isStacked&&(b.renderColumnBarsInOppositeDirections=!0,b.isStacked=!1);if(b.isStacked||b.renderColumnBarsInOppositeDirections)b.yAxis.baseLineValue=0;f.applyChartTypeSpecificSettings&&m._applyChartTypeSpecificSettings(a,f.isGraphicStyle);g&&a.comparisonInfo&&(a.comparisonInfo.chartType=d);d===c.GAUGE&&(a=a.seriesItems[0]&&a.seriesItems[0].points&&a.seriesItems[0].points[0],"p"===(a&&a.fieldInfo&&a.fieldInfo.statefulName&&a.fieldInfo.statefulName.charAt(0))&&(delete b.gaugeRangeMin,delete b.gaugeRangeMax),
90<b.gaugeArcPercent&&(b.gaugeShowFromToLabels=!1))},_applyChartTypeSpecificSettings:function(a,f){a.visualProperties.legend.series.hasBorder=!f;a.visualProperties.legend.type===l.SERIES&&c.isSeriesLegendEnabled(a.type,a.seriesItems.length,a.isMultiFeatureChart)&&(a.visualProperties.legend.series.placement=!f||1<a.seriesItems.length||a.type===c.PIE||a.type===c.DONUT||a.isMultiFeatureChart?a.isMultiFeatureChart?h.BOTTOM:h.RIGHT:h.NONE);a.visualProperties.dataLabels=a.type===c.RING?k.LABEL_VALUE:k.NONE}};
return m});