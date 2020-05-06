// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/sections/supportClasses/SectionLayoutManager","dojo/_base/declare dojo/dom-style ./SectionContentFitModes ../../grid/coreUtils/GridDataUtil ../../infographics/InfographicTypes esri/dijit/geoenrichment/utils/FitUtil".split(" "),function(h,f,g,l,k,m){h=h(null,{section:null,constructor:function(a){this.section=a},getWidth:function(){return f.get(this.section.domNode,"width")},_widthInitializedFlag:!1,setWidth:function(a,b){b=b||{};var c=this._widthInitializedFlag?
f.get(this.section.domNode,"width"):0;b&&b.previousDim&&(c=b.previousDim.w,this._widthInitializedFlag=!0);f.set(this.section.domNode,"width",a+"px");this._widthInitializedFlag=this._widthInitializedFlag||1<a;this.section.hasFixedLayout?this.section.getTables().forEach(function(c){(c.getMaxWidth()!==a||b.forceResize)&&c.setMaxWidth(a,{resizeToFitAllowedWidth:b.resizeContentToFit,preserveRightOffset:b.preserveRightOffset})}):this._widthInitializedFlag&&b&&b.resizeContentProportionally&&c&&a&&c!==a&&
this.scaleFloatingContentProportionally({xScale:a/c,yScale:1})},getHeight:function(a){if(!this.section.hasFixedLayout)return 0;var b=0;this.section._stackElements.forEach(function(c){switch(c.stackId){case "table":b+=c.getHeight(a);c.isLocatorTable&&c.isLocatorTable()&&(b+=c.getLocatorTablePreviewExtraHeight());break;case "hr":b+=f.get(c,"height");break;case "pageBreak":b+=f.get(c,"height")}});return b},getResizedHeight:function(){return this.section.hasFixedLayout?this.getHeight(!0):f.get(this.section.domNode,
"height")},setResizedHeight:function(a,b){this._setResizedHeight(a,b);if(this.section.hasFixedLayout){var c=this;this.section.getTables().forEach(function(a){a.needScaleToFitHeight()&&c._scaleFixedTableToFitHeight(a)})}},updateHeightAfterContentChange:function(){this.section.hasFixedLayout&&this._setResizedHeight(this.getResizedHeight())},_resizedHeightInitializedFlag:!1,_setResizedHeight:function(a,b){if(this.section.hasFixedLayout){var c=this.section.getLastTable();c&&c.setSpaceAfter(a-this.getHeight())}c=
this._resizedHeightInitializedFlag?f.get(this.section.domNode,"height"):0;b&&b.previousDim&&(c=b.previousDim.h,this._resizedHeightInitializedFlag=!0);f.set(this.section.domNode,"height",a+"px");this._resizedHeightInitializedFlag=this._resizedHeightInitializedFlag||1<a;!this.section.hasFixedLayout&&b&&b.resizeContentProportionally&&c&&a&&c!==a&&this.scaleFloatingContentProportionally({xScale:1,yScale:a/c})},scaleFloatingContentProportionally:function(a){this.section.hasFixedLayout||1===a.xScale&&1===
a.yScale||1<this.section._stackElements.length||this.section._stackElements.forEach(function(b){switch(b.stackId){case "table":b.scaleProportionallyWithinParent(a);break;case "img":b.scaleProportionallyWithinParent(a)}})},getFloatingContentBox:function(){var a,b,c,e;function d(d){a=Math.min(a,d.l);b=Math.min(b,d.t);c=Math.max(c,d.l+d.w);e=Math.max(e,d.t+d.h)}b=a=Infinity;e=c=0;this.section._stackElements.forEach(function(a){switch(a.stackId){case "table":d(a.getTableBox());break;case "img":d(a.getImageBox(!1))}});
return{l:a,t:b,w:c-a,h:e-b}},fitContentNicely:function(a,b){a=a||{};this.section.hasFixedLayout?this._fitFixedTablesNicely(a,b):this._fitFloatingContentNicely(a,b)},_fitFixedTablesNicely:function(a,b){if(a.fitMode!==g.NONE){a.fitMode===g.ALL&&delete a.fitMode;var c=this;(b||this.section.getTables()).forEach(function(b){"table"===b.stackId&&(a.fitMode!==g.WIDTH&&a.fitMode||b.resizeToFitAllowedWidth(),a.fitMode!==g.HEIGHT&&a.fitMode||c._scaleFixedTableToFitHeight(b))});this.section._notifyContentChanged()}},
_scaleFixedTableToFitHeight:function(a){a.resizeToFitHeight(this.section.getResizedHeight());a.setSpaceAfter(0)},_fitFloatingContentNicely:function(a,b){a=a.fitMode;if(a!==g.NONE&&(b=b||this.section._stackElements,b.length&&!(1<this.section._stackElements.length))){var c;1===b.length&&(c=this._getTransformParamsForSpecificSingleElement(b));c=c||this._getTransformParamsForOtherElement(b,a);b.forEach(function(a){switch(a.stackId){case "table":a.scaleProportionallyWithinParent(c.scaleParams);a.setGridPosition(c.deltaLeft+
a.getLeft(),c.deltaTop+a.getTop());break;case "img":a.scaleProportionallyWithinParent(c.scaleParams),f.set(a.domNode,{left:c.deltaLeft+f.get(a.domNode,"left")+"px",top:c.deltaTop+f.get(a.domNode,"top")+"px"})}})}},_getTransformParamsForSpecificSingleElement:function(a){var b,c,e,d=this.section.getTables()[0],d=d&&d.isSingleCelledTable()&&l.getFieldInfo(d.getFirstCell());if("img"===a[0].stackId&&!a[0].isMapImage()||d&&d.isImage&&!d.imageJson.isMapImage||d&&d.isShape)a=this.getFloatingContentBox(),
e=m.fitBox(a,{w:this.section.getWidth()-0,h:f.get(this.section.domNode,"height")-0},{hAlign:"center",vAlign:"middle"}),b={xScale:e.ratio,yScale:e.ratio},c=0+e.x-a.l*b.xScale,e=0+e.y-a.t*b.yScale;return b&&{scaleParams:b,deltaLeft:c,deltaTop:e}},_getTransformParamsForOtherElement:function(a,b){var c=this.getFloatingContentBox();b===g.SINGLE_ALL_COMPLEX_WIDTH&&(b=1<a.length?g.WIDTH:g.ALL);var e=this._getContentFitOffset(a),d=this.section.getWidth()-2*e,h=f.get(this.section.domNode,"height")-2*e;1<a.length&&
c.h>h&&(b=g.ALL);a={xScale:b===g.HEIGHT?1:d/c.w,yScale:b===g.WIDTH?1:h/c.h};return{scaleParams:a,deltaLeft:e-c.l*a.xScale,deltaTop:e-c.t*a.yScale}},_getContentFitOffset:function(a){var b=this.section.getTables()[0],c=b&&b.isSingleCelledTable()&&l.getFieldInfo(b.getFirstCell());return this.section.noContentOffset?0:1<a.length?5:this.section.hasMapImages()?0:this.section.hasInfographic(k.LOCATOR_TABLE)||this.section.hasInfographic(k.COMPARISON_TABLE)?this.section.viewModel.getCurrentTheme(this.section.theme).table.dataTablePadding||
0:this.section.hasInfographic(k.ATTACHMENTS)?0:this.section.hasInfographic()?(a=c.infographicJson.style&&c.infographicJson.style.padding,"number"===typeof a?a:this.section.viewModel.getStaticInfographicDefaultStyles(this.section.theme).padding||0):b&&(this.section.isImageTable(b)||c&&c.isShape)?0:this.section.hasChart()?0:this.section.viewModel.getCurrentTheme(this.section.theme).table.dataTablePadding||0},getPreferredHeight:function(){var a=this.section.getInfographicWithTable();if(!a||!a.infographic.getPreferredHeight)return 0;
var b=a.table.getTableBox(),c=b.t,b=this.getResizedHeight()-b.t-b.h,a=a.infographic.getPreferredHeight()||0;return c+b+a}});h.IMAGE_FIT_PRETTY_OFFSET=0;return h});