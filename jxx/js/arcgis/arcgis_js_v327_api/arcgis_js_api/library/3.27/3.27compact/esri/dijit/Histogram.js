// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/Histogram/templates/Histogram.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"${css.container}" data-dojo-attach-point\x3d"_containerNode"\x3e\r\n    \x3cdiv class\x3d"${css.topLabel}" data-dojo-attach-point\x3d"_topLabelNode"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"${css.svgContainer}" data-dojo-attach-point\x3d"_svgContainer"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"${css.bottomLabel}" data-dojo-attach-point\x3d"_bottomLabelNode"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/Histogram","require ../kernel dijit/_TemplatedMixin dijit/_WidgetBase dijit/Tooltip dojo/has dojo/on dojo/string dojo/number dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/dom dojo/dom-construct dojo/dom-style dojo/dom-class dojo/dom-geometry dojo/date/locale dojox/gfx dojo/i18n!../nls/jsapi dojo/text!./Histogram/templates/Histogram.html".split(" "),function(r,t,f,u,m,v,B,l,n,h,w,x,C,D,p,E,k,y,q,z,A){f=w([u,f],{declaredClass:"esri.dijit.Histogram",baseClass:"esri-histogram",
templateString:A,data:null,statistics:null,isDate:!1,css:{container:"esri-histogram-container",topLabel:"esri-histogram-top-label",svgContainer:"esri-histogram-svg-container",bottomLabel:"esri-histogram-bottom-label",surface:"esri-histogram-surface",group:"esri-histogram-group",bar:"esri-histogram-bar"},_surface:null,_countTooltips:null,_barsGroup:null,_defaultImagePadding:30,_defaultBarPadding:40,_i18n:z.widgets.histogram,constructor:function(a,d){this._countTooltips=[]},startup:function(){this.inherited(arguments);
this._syncContainerSizes();this._surface=this._generateSurface();this._barsGroup=this._generateBarsGroup();this.statistics&&(this._generateLines(),this._generateCountTooltips());this._updateLabels()},_syncContainerSizes:function(){this._nodeDimensions=k.getMarginBox(this.domNode);this._topLabelHeight=k.getMarginBox(this._topLabelNode).h;this._bottomLabelHeight=k.getMarginBox(this._bottomLabelNode).h;this._svgContainer.setAttribute("style","height: "+(this._nodeDimensions.h-(this._topLabelHeight+this._bottomLabelHeight)-
1)+"px;");this._svgContainerDimensions=k.getMarginBox(this._svgContainer)},_updateLabels:function(){var a=this.data.maxValue,d=this.data.minValue;this._topLabelNode.innerHTML=this.isDate?this._getFormattedDate(a):this._getLocaleFormattedNumber(a);this._bottomLabelNode.innerHTML=this.isDate?this._getFormattedDate(d):this._getLocaleFormattedNumber(d)},_generateSurface:function(){var a=q.createSurface(this._svgContainer,"100%","100%");a.rawNode.setAttribute("class",this.css.surface);return a},_generateBarsGroup:function(){var a=
this.data,d=this._defaultBarPadding,b,c,e,g;b=this._surface.createGroup();b.rawNode.setAttribute("class",this.css.group);c=h.map(a.bins,function(a){return"object"===typeof a?a.count:a});c.reverse();e=(this._svgContainerDimensions.h-1)/c.length;h.forEach(c,function(a,f){g=Math.round(0<a?(this._svgContainerDimensions.w-d)*(a/Math.max.apply(Math,c)):0);a=b.createRect({width:g,height:e}).setFill("#aaa").setTransform(q.matrix.translate(1,e*f-1)).setStroke({color:"#FFF",width:2});a.rawNode.setAttribute("class",
this.css.bar);a.rawNode.setAttribute("shape-rendering","crispEdges")},this);return b},_generateLines:function(){var a=this.statistics,d=this._svgContainerDimensions.h,b,c,e;c=this.isDate?this._getFormattedDate(a.avg):this._getLocaleFormattedNumber(this._roundValueForLabel(a.avg));c=l.substitute(this._i18n.statsAvg,{avg:c});b=this._getLocaleFormattedNumber(this._roundValueForLabel(a.stddev));b=l.substitute(this._i18n.statsSD,{sd:b});e={color:"#667",style:"Dot"};this._generateLine({label:c,lineStroke:{color:"#667"},
imageURL:"esri/dijit/Histogram/images/xAvg.png",yAxisAlignment:d*(a.max-a.avg)/(a.max-a.min),imagePadding:this._defaultImagePadding});this._generateLine({label:b,lineStroke:e,imageURL:"esri/dijit/Histogram/images/sd.png",yAxisAlignment:d*(a.max-a.avg-a.stddev)/(a.max-a.min),imagePadding:this._defaultImagePadding+10});this._generateLine({label:b,lineStroke:e,imageURL:"esri/dijit/Histogram/images/sd.png",yAxisAlignment:d*(a.max-a.avg+a.stddev)/(a.max-a.min),imagePadding:this._defaultImagePadding+10})},
_generateLine:function(a){var d=this._surface,b=this._svgContainerDimensions.h,c=a.yAxisAlignment,e=a.imageURL,g=a.lineStroke,f=a.label;a=a.imagePadding;g=d.createLine({x1:0,x2:this._svgContainerDimensions.w-a,y1:c,y2:c}).setStroke(g);g.rawNode.setAttribute("shape-rendering","crispEdges");d=d.createImage({x:this._svgContainerDimensions.w-a,y:c-6,width:12,height:14,src:r.toUrl(e)});new m({connectId:[d.rawNode],label:f});b=c>b||0>c?"none":"block";p.set(g.rawNode,"display",b);p.set(d.rawNode,"display",
b)},_generateCountTooltips:function(){var a=h.map(this.data.bins,function(a){return"object"===typeof a?a.count:a});a.reverse();h.forEach(a,function(a,b){a=l.substitute(this._i18n.count,{count:a});this._countTooltips.push(new m({connectId:[this._barsGroup.children[b].rawNode],label:a}))},this)},_getLocaleFormattedNumber:function(a){return isNaN(a)?null:n.format(a)},_getFormattedDate:function(a){return y.format(new Date(a))},_roundValueForLabel:function(a){return n.round(a,this._getRoundingPrecision(a))},
_getRoundingPrecision:function(a){return 1E3<=a?0:10<=a?2:0<=a?4:6}});v("extend-esri")&&x.setObject("dijit.Histogram",f,t);return f});