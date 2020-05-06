// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridLayoutSizer",["./GridLayoutCalculator"],function(e){var d={resizeToFitAllowedWidth:function(b,a){d._resizeWidthForParams(b,{resetWidth:!0,columnsToPreserve:b.columns,stickToRight:!0,rightOffsetWeight:a&&a.rightOffsetWeight})},resizeToFitWidth:function(b,a){a&&!isNaN(a)&&d._resizeWidthForParams(b,{resetWidth:!0,columnsToPreserve:b.columns,newWidth:a})},_resizeWidthForParams:function(b,a){e.recalcColumns(b,a);b.getFieldCells().forEach(function(a){a.setWidth(e.calcFieldWidth(b,
a.gridData,a.column.field))});d._makeFinalAdjustments(b)},_makeFinalAdjustments:function(b){e.positionCells(b);b.getFieldCells().forEach(function(a){a.updateSizers&&a.updateSizers()})},resizeToFitHeight:function(b,a){e.recalcRowsToFitHeight(b,a);b.getFieldCells().forEach(function(a){a.setHeight(e.calcDataHeight(b,a.gridData,a.column.field))});d._makeFinalAdjustments(b)},scaleProportionallyWithinParent:function(b,a){var c=b.getTableBox();b.setGridPosition(c.l*a.xScale,c.t*a.yScale);1!==a.xScale&&d.resizeToFitWidth(b,
c.w*a.xScale);1!==a.yScale&&d.resizeToFitHeight(b,c.h*a.yScale)},scaleProportionallyPreservingCenter:function(b,a){var c=b.getTableBox(),e=c.w*a.xScale,f=c.h*a.yScale;b.setGridPosition(c.l+(c.w-e)/2,c.t+(c.h-f)/2);1!==a.xScale&&d.resizeToFitWidth(b,e);1!==a.yScale&&d.resizeToFitHeight(b,f)}};return d});