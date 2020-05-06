// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/plots/Gauge","dojo/_base/declare dojo/_base/lang dojo/dom-style dojox/gfx dojox/gfx/matrix ./Donut ./animation/_GaugeAnimation ./supportClasses/GaugeLabelPlacement".split(" "),function(w,u,p,r,t,x,y,n){var q={getMainLabelInfo:function(b,a,g,e,f,h,d){var l=(void 0!==d?d:b[0].tooltip.valueLabel)+(a.series.isPercentState?"%":""),c=(a.series.donutHolePercent||0)/100*g*1.5;a.series.donutMainLabelPosition===n.INSIDE&&a.series.donutShowIcons&&
(c/=2);var k={series:u.mixin({},a.series)};k.series.font=a.series.donutMainLabelFont||k.series.font;k.series.fontColor=a.series.donutMainLabelFontColorFromConditionalStyling?b[0].fill:a.series.donutMainLabelFontColor||k.series.fontColor;b=function(){if(a.series.donutMainLabelFontSize)return a.series.donutMainLabelFontSize;if(a.series.donutMainLabelPosition===n.OUTSIDE)return 30;k.series.font=k.series.font.replace(/\s\w*px/," 30px");var b=r._base._getTextBox(l,{font:k.series.font});return Math.min(100,
Math.max(30,30*c/Math.max(b.w,b.h)))}();k.series.font=k.series.font.replace(/\s\w*px/," "+b+"px");d=r._base._getTextBox(l,{font:k.series.font});var m;a.series.donutMainLabelPosition===n.OUTSIDE&&(h=t._degToRad(h),f=h+2*f*Math.PI,f=a.series.donutShowArrowIndicator?f:(h+f)/2,h=d.w*Math.cos(f),m=d.h*Math.sin(f),m={labelX:e.cx+g*Math.cos(f)-d.w/2+.8*h,labelY:e.cy+g*Math.sin(f)+d.h/3+.8*m,pushX:h,pushY:m});return{text:l,fontSize:b,labelBox:d,labelT:k,maxLabelSize:c,outsideInfo:m}},getFromLabelInfo:function(b,
a,g,e,f,h,d,l){b={series:u.mixin({},a.series)};b.series.font=a.series.donutFromLabelFont||b.series.font;b.series.fontColor=a.series.donutFromLabelFontColor||b.series.fontColor;h=a.series.donutFromLabelFontSize||20;b.series.font=b.series.font.replace(/\s\w*px/," "+h+"px");var c=r._base._getTextBox(l,{font:b.series.font});d=t._degToRad(d);return{text:l,fontSize:h,labelBox:c,labelT:b,outsideInfo:{labelX:f.cx+g*Math.cos(d)+(g-e-c.w)/2,labelY:f.cy+g*Math.sin(d)+c.h+3,labelBox:c,pushX:55<a.series.donutArcPercent?
0:Math.max(0,(c.w-(g-e))/2),pushY:55>a.series.donutArcPercent?0:c.h}}},getToLabelInfo:function(b,a,g,e,f,h,d,l){b={series:u.mixin({},a.series)};b.series.font=a.series.donutToLabelFont||b.series.font;b.series.fontColor=a.series.donutToLabelFontColor||b.series.fontColor;var c=a.series.donutToLabelFontSize||20;b.series.font=b.series.font.replace(/\s\w*px/," "+c+"px");var k=r._base._getTextBox(l,{font:b.series.font});h=t._degToRad(d)+2*h*Math.PI;return{text:l,fontSize:c,labelBox:k,labelT:b,outsideInfo:{labelX:f.cx+
g*Math.cos(h)-k.w+(k.w-(g-e))/2,labelY:f.cy+g*Math.sin(h)+k.h+3,labelBox:k,pushX:55<a.series.donutArcPercent?0:Math.max(0,(k.w-(g-e))/2),pushY:55>a.series.donutArcPercent?0:k.h}}}},v={renderMainLabel:function(b,a,g,e,f,h,d,l,c){e=function(c,e){var k;c=q.getMainLabelInfo(b,a,g,h,c,l,e);a.series.donutMainLabelPosition===n.OUTSIDE?e=d.renderLabel(f,c.outsideInfo.labelX,c.outsideInfo.labelY,c.text,c.labelT,!0,"left"):(e=h.cx-c.labelBox.w/2,k=h.cy,50!==a.series.donutArcPercent&&(k+=c.labelBox.h/3),a.series.donutShowIcons&&
(k-=c.maxLabelSize/1.5),e=d.renderLabel(f,e,k,c.text,c.labelT,!0,"left"));e&&"underline"===a.series.donutMainLabelTextDecoration&&(p.set(e,"textDecoration","underline"),p.set(e,"textDecorationColor",c.labelT.series.fontColor));return{labelInfo:c,element:e}};c&&c.push({isLabel:!0,func:e});return e},renderFromLabel:function(b,a,g,e,f,h,d,l,c,k){b=q.getFromLabelInfo(b,a,g,e,h,c,l,k);(f=d.renderLabel(f,b.outsideInfo.labelX,b.outsideInfo.labelY,b.text,b.labelT,!0,"left"))&&"underline"===a.series.donutFromLabelTextDecoration&&
(p.set(f,"textDecoration","underline"),p.set(f,"textDecorationColor",b.labelT.series.fontColor));return{labelInfo:b,element:f}},renderToLabel:function(b,a,g,e,f,h,d,l,c,k){b=q.getToLabelInfo(b,a,g,e,h,c,l,k);(f=d.renderLabel(f,b.outsideInfo.labelX,b.outsideInfo.labelY,b.text,b.labelT,!0,"left"))&&"underline"===a.series.donutToLabelTextDecoration&&(p.set(f,"textDecoration","underline"),p.set(f,"textDecorationColor",b.labelT.series.fontColor));return{labelInfo:b,element:f}}},z={renderArrow:function(b,
a,g,e,f,h){var d=function(d){d=t._degToRad(f)+2*d*Math.PI;var c=[];c.push({x:e.cx+5*Math.cos(d+Math.PI/2),y:e.cy+5*Math.sin(d+Math.PI/2)});c.push({x:e.cx+5*Math.cos(d+Math.PI),y:e.cy+5*Math.sin(d+Math.PI)});c.push({x:e.cx+5*Math.cos(d-Math.PI/2),y:e.cy+5*Math.sin(d-Math.PI/2)});c.push({x:e.cx+g*Math.cos(d),y:e.cy+g*Math.sin(d)});return{shape:b.createPath().moveTo(c[0].x,c[0].y).lineTo(c[1].x,c[1].y).lineTo(c[2].x,c[2].y).lineTo(c[3].x,c[3].y).lineTo(c[0].x,c[0].y).setStroke(a.series.donutArrowIndicatorLineColor).setFill(a.series.donutArrowIndicatorFillColor)}};
h.push({isArrow:!0,func:d});return d}};return w([x,y],{startAngleOffset:-90,_preprocessParams:function(b,a,g,e,f,h,d,l){if(a.series.donutMainLabelPosition===n.OUTSIDE){var c=q.getMainLabelInfo(b,a,g,d,this._getSliceValueAt(l,0,a),this._getStartAngle(a)),k=c.outsideInfo.pushX/2,c=c.outsideInfo.pushY/2,m=g;f-=Math.abs(k);h-=Math.abs(c);g=Math.min(f,h)-5;g=Math.max(g,m/2);d.cx-=k;d.cy-=c;this._lastRenderResults.chartShiftX=-k;this._lastRenderResults.chartShiftY=-c}a.series.donutShowFromToLabels&&(c=
q.getFromLabelInfo(b,a,g,e,d,this._getStartAngle(a),this._getSliceValueAt(l,0,a),a.series.donutFromLabelText),b=q.getToLabelInfo(b,a,g,e,d,this._getStartAngle(a),this._getSliceValueAt(l,0,a)+(this._getSliceValueAt(l,1,a)||0),a.series.donutToLabelText),k=(c.outsideInfo.pushX+b.outsideInfo.pushX)/2,c=c.outsideInfo.pushY/2,m=g,f-=Math.abs(k),h-=Math.abs(c),g=Math.min(f,h)-5,g=Math.max(g,m/2),d.cy-=c,this._lastRenderResults.chartShiftY-=c);return{circle:d,r:g}},_renderAdditionalElements:function(b,a,
g,e,f,h,d){this._lastRenderResults.ryMultiplier=this._getRYMultiplier(a);this._renderGaugeDataLabel(b,a,g,e,f,h,d);this._renderGaugeFromToLabels(b,a,g,e,f,h,d);this._renderGaugeArrowIndicator(b,a,g,e,f,h,d)},_gaugeLabelElement:null,_renderGaugeDataLabel:function(b,a,g,e,f,h,d){a.series.donutMainLabelPosition!==n.NONE&&(b=v.renderMainLabel(b,a,g,e,f,h,this,this._getStartAngle(a),this._animationInfos)(this._getSliceValueAt(d,0,a)),this._gaugeLabelElement=b.element,a.series.donutMainLabelPosition===
n.INSIDE&&(this._lastRenderResults.maxIconSize=b.labelInfo.maxLabelSize,this._lastRenderResults.chartIconOffset=b.labelInfo.maxLabelSize/1.25))},_gaugeFromLabelElement:null,_gaugeToLabelElement:null,_renderGaugeFromToLabels:function(b,a,g,e,f,h,d){if(a.series.donutShowFromToLabels){var l=v.renderFromLabel(b,a,g,e,f,h,this,this._getStartAngle(a),this._getSliceValueAt(d,0,a),a.series.donutFromLabelText);this._gaugeFromLabelElement=l.element;l=v.renderToLabel(b,a,g,e,f,h,this,this._getStartAngle(a),
this._getSliceValueAt(d,0,a)+(this._getSliceValueAt(d,1,a)||0),a.series.donutToLabelText);this._gaugeToLabelElement=l.element}},_renderGaugeArrowIndicator:function(b,a,g,e,f,h,d){a.series.donutShowArrowIndicator&&z.renderArrow(f,a,g,h,this._getStartAngle(a),this._animationInfos)(this._getSliceValueAt(d,0,a))}})});