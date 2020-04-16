// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/RendererSlider/templates/RendererSlider.html":'\x3cdiv class\x3d"${_css.container}" data-dojo-attach-point\x3d"_containerNode"\x3e\r\n  \x3cdiv class\x3d"${_css.topLabelNode} ${_css.topLabelNodeHover}" data-dojo-attach-point\x3d"_topNode"\x3e\r\n    \x3cspan data-dojo-attach-point\x3d"_topNodeSpan"\x3e\x3c/span\x3e \r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"${_css.slidernode}" data-dojo-attach-point\x3d"_sliderNode"\x3e\r\n    \x3cdiv class\x3d"${_css.sliderarea}" data-dojo-attach-point\x3d"_sliderArea"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"${_css.sliderarearight}" data-dojo-attach-point\x3d"_sliderAreaRight"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"${_css.bottomLabelNode} ${_css.bottomLabelNodeHover}" data-dojo-attach-point\x3d"_botNode"\x3e\r\n    \x3cspan  data-dojo-attach-point\x3d"_bottomNodeSpan"\x3e\x3c/span\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/RendererSlider","../kernel ../numberUtils ../renderers/utils ./DateTimeTextBox ./RendererSlider/sliderUtils dijit/_OnDijitClickMixin dijit/_TemplatedMixin dijit/_WidgetBase dijit/form/NumberTextBox dojo/debounce dojo/on dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/dnd/move dojo/dom-construct dojo/dom-style dojo/dom-class dojo/Evented dojo/number dojo/has dojo/text!./RendererSlider/templates/RendererSlider.html".split(" "),function(E,A,B,y,v,q,F,G,z,H,n,t,I,f,J,u,p,C,
K,L,M,N){q=I([G,F,q,K],{declaredClass:"esri.dijit.RendererSlider",baseClass:"esriRendererSlider",templateString:N,theme:"Slider",intermediateChanges:!1,type:null,minimum:0,maximum:100,values:[50],precision:2,isDate:!1,handles:[],primaryHandle:null,showHandles:!0,showTicks:!0,showLabels:!0,showRatioLabels:!1,minLabel:null,maxLabel:null,_visibleLabels:["data","handle"],_roundedDataLabels:[],_roundedHandleLabels:[],_ratioLabels:[],_minRatioLabel:"",_maxRatioLabel:"",_isZoomed:!1,_minZoomLabel:"",_maxZoomLabel:"",
_maximumNumberEditor:null,_minimumNumberEditor:null,_valueDifferenceByIndex:[],_primaryHandleIdx:null,_currentTopValue:[],_isLTR:!0,_ctrlDown:!1,_histogramSurface:null,_css:null,_minPrecisionForSmallNumbers:3,constructor:function(a,b){this.inherited(arguments);this.domNode=b;this._css={container:"esri-renderer-slider",slidernode:"esri-slider-node",sliderarea:"esri-slider-area",sliderarearight:"esri-slider-area-right",moveable:"esri-moveable",handler:"esri-handle",handlerSpan:"esri-handle-span",handlerContainer:"esri-handle-container",
handlerLabel:"esri-handle-label",handlerLabelSpan:"esri-handle-label-span",topLabelNode:"esri-top-label-node",bottomLabelNode:"esri-bottom-label-node",topLabelNodeHover:"esri-top-label-node-hover",bottomLabelNodeHover:"esri-bottom-label-node-hover",heatmapTick:"esri-heatmap-tick",handlerTick:"esri-handler-tick",handlerTickTop:"esri-handler-tick-top",handlerTickBottom:"esri-handler-tick-bottom"};this.showLabels=a.showLabels||this._visibleLabels;this._updateTimeout=H(this._updateTimeout,0)},startup:function(){this.inherited(arguments);
this.set("_sliderHeight",p.get(this._sliderArea,"height")||200);this._checkMinMaxDefaults();this.set("_isLTR",this.isLeftToRight());if(!this._isLTR){var a=p.get(this._sliderNode,"padding-left")+p.get(this._sliderNode,"padding-right"),b=Math.round(p.get(this._sliderNode,"width"));this.set("_sliderNodeWidth_RTL",a+b)}this.set("precision",v.getCombinedPrecision(this.minimum,this.maximum));this._updateRoundedLabels();this._generateMoveables();this._generateMinMaxEditors();this._generateCtrlKeyListener();
this.watch("values",this._valuesChange);this.watch("minimum",this._updateTimeout);this.watch("maximum",this._updateTimeout);this.watch("showRatioLabels",this._updateTimeout)},destroy:function(){this.inherited(arguments)},setValue:function(a,b,d){var e=this.get("values"),c=e.slice(0);"object"===typeof e[0]?c[a].value=b:c[a]=b;(this.intermediateChanges||d)&&this.set("values",c);d?this.emit("stop",{values:this.get("values")}):this.emit("slide",{values:c})},_updateTimeout:function(){this._updateSlider()},
_updateSlider:function(){this._reset();this._checkMinMaxDefaults();this._updateRoundedLabels();this._generateMoveables();this._generateMinMaxEditors();this._generateCtrlKeyListener()},_checkMinMaxDefaults:function(){var a=this.values,b;this.minimum===this.maximum&&a&&0<a.length&&(isNaN(a[0])?this.set({minimum:0,maximum:2*a[0].value}):this.set({minimum:0,maximum:2*a[0]}));a&&0<a.length&&(b=isNaN(a[0])?a[0].value:a[0],this.minimum>b&&this.set("minimum",b),a=isNaN(a[a.length-1])?a[a.length-1].value:
a[a.length-1],this.maximum<a&&this.set("maximum",a))},_calculateValueFromHandlePosition:function(a){var b=this.get("minimum"),d=this.get("maximum"),e=this.get("precision"),c=this.get("step")||Math.pow(10,-e);return 1>=b&&-1<=b&&1>=d&&-1<=d||e>=this._minPrecisionForSmallNumbers?(a*(d-b)+b)/c*c:parseFloat((Math.round((a*(d-b)+b)/c)*c).toFixed(e))},_generateMoveables:function(){var a,b=this._sliderNode,d=this._sliderHeight,e=this.get("minimum"),c=this.get("maximum");this.get("precision");this.get("step");
var r=this.get("showLabels"),h=this.get("showTicks"),m=f.hitch(this,this.setValue),k=this.get("values");this._updateMinMaxLabels();this.set("_primaryHandleIdx",null);a=t.map(k,f.hitch(this,function(k,g){var l,n,D,x,q;k&&k.primaryHandle&&this.set("_primaryHandleIdx",g);if("object"===typeof k&&k.hidden)return null;"object"===typeof k&&(k=k.value);l=u.create("div",{style:this._getHandleStyleString(k),className:this._css.moveable},b);q=l._handleContainer=u.create("div",{className:this._css.handlerContainer},
l);l._arrowSpan=D=u.create("span",{className:this._css.handlerSpan},q);l._handler=k=u.create("div",{className:this._css.handler},q);"HeatmapSlider"!==this.type&&(!0===r||"object"===typeof r&&-1!==t.indexOf(r,"handles"))&&(n=this._generateHandleLabel(l,g));h&&this._generateHandleTicks(l,g);x=new J.constrainedMoveable(l,{handle:q,within:!0,constraints:f.hitch(this,function(){return{t:0,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:d}})});x.onMoveStart=f.hitch(this,function(b){var c=this.handles,e=
t.indexOf(c,g),w,h;this._currentTopValue[g]=b.node.style.top;l.labelNode&&l.labelNode._autoPositioned&&(p.set(l.labelNode,"top","3px"),l.labelNode._autoPositioned=!1);v._autoPositionHandleLabels(this.get("moveables"));l._numberEditor&&(l._numberEditor.destroy(),l._numberEditor=null);this._primaryHandleIdx!==g?(0<c.length?(b=null!==c[e-1]?c[e-1]:null,c=null!==c[e+1]?c[e+1]:null,e=a[b],c=a[c]):(e=a[g-1],c=a[g+1]),e&&c?(e=e.style.top,c=c.style.top,w=Number(e.replace("px","")),h=Number(c.replace("px",
"")),x.constraints=f.hitch(this,function(){return{t:h+2,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:d-h-(d-w+4)}})):e?(e=e.style.top,w=Number(e.replace("px","")),x.constraints=f.hitch(this,function(){return{t:0,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:d-(d-w+2)}})):c&&(c=c.style.top,h=Number(c.replace("px","")),x.constraints=f.hitch(this,function(){return{t:h+2,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:d-(h+2)}}))):(0<c.length?(b=null!==c[e-1]?c[e-1]:null,c=null!==c[e+1]?c[e+1]:null,
e=a[b],c=a[c]):(e=a[g-1],c=a[g+1]),e&&c&&(e=e.style.top,c=c.style.top,w=Number(e.replace("px","")),h=Number(c.replace("px","")),x.constraints=f.hitch(this,function(){return{t:2,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:d-4}})))});x.onMoved=f.hitch(this,function(b){var h,k,r,l,w;g===this._primaryHandleIdx&&(r=Number(this._currentTopValue[g].replace("px",""))-Number(b.node.style.top.replace("px","")),this._currentTopValue[g]=b.node.style.top,t.forEach(a,f.hitch(this,function(a,b){a&&b!==g&&(l=
Number(a.style.top.replace("px","")),w=l-r,h=1-Number(w/d),k=this._calculateValueFromHandlePosition(h),k<e||k>c||(p.set(a,"top",w+"px"),m(b,k,!1),a.labelNode&&(a.labelNode.spanNode.innerHTML=this.showRatioLabels?this._getLabelValueFromIndex(b):this._formatValue(k.toFixed(6)))))})));h=1-Number(b.node.style.top.replace("px",""))/d;k=this._calculateValueFromHandlePosition(h);null!==this._primaryHandleIdx&&g!==this._primaryHandleIdx&&this._ctrlDown&&(r=Number(this._currentTopValue[g].replace("px",""))-
Number(b.node.style.top.replace("px","")),this._currentTopValue[g]=b.node.style.top,0===g?(l=Number(a[a.length-1].style.top.replace("px","")),b=l+r,b>d&&(b=d),0>b&&(b=0),p.set(a[a.length-1],"top",b+"px"),b=1-b/d,b=this._calculateValueFromHandlePosition(b),m(a.length-1,b,!1),a[a.length-1].labelNode&&(a[a.length-1].labelNode.spanNode.innerHTML=this._formatValue(b.toFixed(6)))):g===a.length-1&&(l=Number(a[0].style.top.replace("px","")),b=l+r,b>d&&(b=d),0>b&&(b=0),p.set(a[0],"top",b+"px"),b=1-b/d,b=this._calculateValueFromHandlePosition(b),
m(0,b,!1),a[0].labelNode&&(a[0].labelNode.spanNode.innerHTML=this._formatValue(b.toFixed(6)))));m(g,k,!1);this._updateRoundedLabels();n&&(b=this._formatValue(parseFloat(this._roundValue([k,parseFloat(this._getLabelValueFromIndex(g,!0))])[0]).toFixed(this.precision)),n.spanNode.innerHTML=this.showRatioLabels?this._getLabelValueFromIndex(g):b);v._autoPositionHandleLabels(this.get("moveables"))});x.onMoveStop=f.hitch(this,function(a){a=Number(a.node.style.top.replace("px",""));a=this._calculateValueFromHandlePosition(1-
a/d);m(g,a,!0);this._updateRoundedLabels();n&&(a=this._formatValue(parseFloat(this._roundValue([a,parseFloat(this._getLabelValueFromIndex(g,!0))])[0]).toFixed(this.precision)),n.spanNode.innerHTML=this.showRatioLabels?this._getLabelValueFromIndex(g):a);v._autoPositionHandleLabels(this.get("moveables"))});this.showHandles||(p.set(k,"display","none"),p.set(D,"display","none"));return l}));this.set("moveables",a);v._autoPositionHandleLabels(this.get("moveables"))},_reset:function(){t.forEach(this.moveables,
f.hitch(this,function(a){a&&a.parentElement.removeChild(a)}));this.moveables=[]},_getHandleStyleString:function(a){var b=this.get("minimum"),d=this.get("maximum");return"top: "+Math.round((1-(a-b)/(d-b))*this._sliderHeight)+"px; "+("left: "+(this._isLTR?0:this._sliderNodeWidth_RTL)+"px;")},_generateHandleTicks:function(a,b){var d=this._css,e=d.handlerTick+" "+d.handlerTickTop,c=d.handlerTick+" "+d.handlerTickBottom;b=0===b?c:e;"HeatmapSlider"===this.type&&(b+=d.heatmapTick);a._tick=u.create("div",
{className:b},a)},_updateLabels:function(){this._updateMinMaxLabels();this._updateRoundedLabels()},_resetLabelPositions:function(){t.forEach(this.moveables,function(a){if(a){var b=a.labelNode;b&&(p.set(b,"top","3px"),a.labelNode._autoPositioned=!1)}})},_generateHandleLabel:function(a,b){var d,e;d=u.create("div",{className:this._css.handlerLabel},a);e=u.create("span",{className:this._css.handlerLabelSpan,innerHTML:this._getLabelValueFromIndex(b)},d);d.spanNode=e;a.labelNode=d;n(d,"click",f.hitch(this,
function(){this._generateHandleLabelEditor(a,b)}));return d},_updateMinMaxLabels:function(){var a=this.minimum,b=this.maximum,d=this.showLabels,e=this.minLabel,c=this.maxLabel,f=this._topNodeSpan,h=this._bottomNodeSpan,m=this._isZoomed,k=this._maxZoomLabel,n=this._minZoomLabel,g=this.showRatioLabels,l=this._maxRatioLabel,p=this._minRatioLabel,u=this._roundedDataLabels;!1===d||"object"===typeof d&&-1===t.indexOf(d,"data")?(f.innerHTML="",h.innerHTML=""):m?g?(f.innerHTML=l,h.innerHTML=p):(f.innerHTML=
this._formatValue(k),h.innerHTML=this._formatValue(n)):g?(f.innerHTML=l,h.innerHTML=p):(m=isNaN(e)?e:this._roundValue([e,c])[0],d=isNaN(c)?c:this._roundValue([e,c])[1],e=isNaN(m)||null===m?e:this._formatValue(m),c=isNaN(d)||null===d?c:this._formatValue(d),a=this._formatValue(u[0])||this._formatValue(a),b=this._formatValue(u[1])||this._formatValue(b),f.innerHTML=c||b,h.innerHTML=e||a)},_formatValue:function(a){"string"===typeof a&&(a=Number(a));return this.isDate?B.formatDate(new Date(a),B.timelineDateFormatOptions):
A.format(a)},_roundValue:function(a){return this.isDate?a.slice(0):A.round(a)},_updateRoundedLabels:function(){this._roundedDataLabels=this._roundValue([this.minimum,this.maximum]);switch(this.type){case "SizeInfoSlider":case "ClassedSizeSlider":case "ClassedColorSlider":this._roundedHandleLabels=this._roundValue(this.values);break;case "ColorInfoSlider":case "OpacitySlider":this._roundedHandleLabels=this._roundValue(this._getValuesFromObject(this.values))}this._updateRatioLabels()},_updateRatioLabels:function(){var a=
this.get("showRatioLabels"),b=this.get("minimum"),d=this.get("maximum"),e=this._getValuesFromObject(this.values),c=[],f,h;!1!==a&&("percent"!==a&&"percentTotal"!==a?this.set("showRatioLabels",!1):("percent"===a?(t.forEach(e,function(a){c.push(this._getRatioFromValue(a))},this),f=this._formatValue(this._getRatioFromValue(b).toFixed(2)),h=this._formatValue(this._getRatioFromValue(d).toFixed(2))):"percentTotal"===a&&(t.forEach(e,function(a){c.push(this._getRatioFromValue(a))},this),f=this._formatValue(this._getRatioFromValue(b).toFixed(2)),
h=this._formatValue(this._getRatioFromValue(d).toFixed(2))),this.set({_ratioLabels:c,_minRatioLabel:f+"%",_maxRatioLabel:h+"%"})))},_generateMinMaxEditors:function(){!this.showLabels||"object"===typeof this.showLabels&&-1===t.indexOf(this.showLabels,"data")||"HeatmapSlider"===this.type?(C.remove(this._topNode,this._css.topLabelNodeHover),C.remove(this._botNode,this._css.bottomLabelNodeHover)):(n(this._topNode,"click",f.hitch(this,this._generateMaxEditor)),n(this._botNode,"click",f.hitch(this,this._generateMinEditor)))},
_generateMaxEditor:function(){if(!(this._maximumNumberEditor&&this._topLabelNode||this._isZoomed)){var a=this.get("minLabel"),b=this.get("maxLabel"),d=this.get("maximum"),e,c;this._topNodeSpan.innerHTML="";this._topLabelNode=u.create("input",{type:"text"},this._topNode);e=this.handles&&0<this.handles.length?this.values[this.handles[this.handles.length-1]]:this.values[this.values.length-1];"object"===typeof e&&(e=e.value);this.showRatioLabels&&(e=this._getLabelValueFromIndex(this.values.length-1,!0).replace("%",
""),d=Number(this._maxRatioLabel.replace("%","")));this.isDate?(c=new y({date:new Date(Number(d)),required:!0,constraints:{min:new Date(e),max:null}},this._topLabelNode),a={editor:c,editorPropName:"_maximumNumberEditor",spanNode:this._topNodeSpan,operator:"\x3c"},c.on("keydown",f.hitch(this,this._minMaxKeydownDateHandler,a)),c.on("blur",f.hitch(this,this._minMaxBlurDateValue,a)),c.watch("date",f.hitch(this,this._minMaxUpdateDateValue,a))):(c=new z({value:Number(d),required:!0,constraints:{min:e,max:"percentTotal"===
this.showRatioLabels?100:null,places:"0,20"}},this._topLabelNode),n(c,"keydown",f.hitch(this,this._keydownHandler,{editor:c,originalValidate:!1})),n(c,"blur",f.hitch(this,this._minMaxBlurHandler,{editor:c,editorPropName:"_maximumNumberEditor",label:b,current:d,spanNode:this._topNodeSpan,index:1,minLabel:a,maxLabel:b,ratioLabel:this._maxRatioLabel})),n(c,"change",f.hitch(this,this._minMaxChangeHandler,{label:b,current:d,spanNode:this._topNodeSpan,index:1,minLabel:a,maxLabel:b,ratioLabel:this._maxRatioLabel,
handleValue:e,operator:"\x3c"})));this._maximumNumberEditor=c;c.startup();c.focus();c.textbox.select()}},_generateMinEditor:function(){if(!(this._minimumNumberEditor&&this._botLabelNode||this._isZoomed)){var a=this.minLabel,b=this.maxLabel,d=this.minimum,e,c;this._bottomNodeSpan.innerHTML="";this._botLabelNode=u.create("input",{type:"text"},this._botNode);e=this.handles&&0<this.handles.length?this.values[this.handles[0]]:this.values[0];"object"===typeof e&&(e=e.value);this.showRatioLabels&&(e=this._getLabelValueFromIndex(0,
!0).replace("%",""),d=Number(this._minRatioLabel.replace("%","")));this.isDate?(c=new y({date:new Date(Number(d)),required:!0,constraints:{min:null,max:new Date(e)}},this._botLabelNode),a={editor:c,editorPropName:"_minimumNumberEditor",spanNode:this._bottomNodeSpan,operator:"\x3e"},c.on("keydown",f.hitch(this,this._minMaxKeydownDateHandler,a)),c.on("blur",f.hitch(this,this._minMaxBlurDateValue,a)),c.watch("date",f.hitch(this,this._minMaxUpdateDateValue,a))):(c=new z({value:Number(d),required:!0,constraints:{max:e,
min:"percentTotal"===this.showRatioLabels?0:null,places:"0,20"}},this._botLabelNode),n(c,"keydown",f.hitch(this,this._keydownHandler,{editor:c,originalValidate:!1})),n(c,"blur",f.hitch(this,this._minMaxBlurHandler,{editor:c,editorPropName:"_minimumNumberEditor",label:a,current:d,spanNode:this._bottomNodeSpan,index:0,minLabel:a,maxLabel:b,ratioLabel:this._minRatioLabel})),n(c,"change",f.hitch(this,this._minMaxChangeHandler,{label:a,current:d,spanNode:this._bottomNodeSpan,index:0,minLabel:a,maxLabel:b,
ratioLabel:this._minRatioLabel,handleValue:e,operator:"\x3e"})));this._minimumNumberEditor=c;c.startup();c.focus();c.textbox.select()}},_minMaxBlurHandler:function(a,b){b=a.editor;var d=a.editorPropName,e=a.label,c=a.current,f=a.spanNode,h=a.index,m=a.minLabel,k=a.maxLabel;a=a.ratioLabel;m=isNaN(e)?e:this._roundValue([m,k])[h];e=isNaN(m)||null===m?e:this._formatValue(m);c=this._formatValue(this._roundedDataLabels[h])||this._formatValue(c);this.showLabels||"object"===typeof this.showLabels&&-1!==t.indexOf(this.showLabels,
"data")?f.innerHTML=this.showRatioLabels?a:e||c:f.innerHTML="";b.destroy();this[d]=null},_minMaxChangeHandler:function(a,b){var d=a.label,e=a.current,c=a.spanNode,n=a.index,h=a.minLabel,m=a.maxLabel,k=a.ratioLabel,p=a.handleValue;a=a.operator;("\x3c"===a?b<Number(p):b>Number(p))||isNaN(b)||void 0===b?(b=isNaN(d)?d:this._roundValue([h,m])[n],b=isNaN(b)||null===b?d:this._formatValue(b),e=this._formatValue(this._roundedDataLabels[n])||this._formatValue(e),c.innerHTML=this.showRatioLabels?k:b||e):(k=
this.showRatioLabels?this._getValueFromPercent(b):b,c.innerHTML=this.showRatioLabels?k:this._formatValue(b),this.set("\x3c"===a?"maximum":"minimum",k),this._reset(),this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),this.emit("data-value-change",{min:this.minimum,max:this.maximum,values:f.clone(this.values)}))},_minMaxKeydownDateHandler:function(a,b){13===b.keyCode&&a.editor.isValid()&&setTimeout(f.hitch(this,this._destroyMinMaxHandleEditor,a),0)},_minMaxBlurDateValue:function(a,
b){setTimeout(f.hitch(this,this._destroyMinMaxHandleEditor,a),0)},_destroyMinMaxHandleEditor:function(a){a.spanNode.innerHTML=this._formatValue(this.get("\x3c"===a.operator?"maximum":"minimum"));a.editor.destroy();this[a.editorPropName]=null},_minMaxUpdateDateValue:function(a){var b=a.spanNode,d=a.operator;a=a.editor.get("date");var d="\x3c"===d?"maximum":"minimum",e=this.get(d);a=a&&a.getTime();if(e=e!==a)b.innerHTML=this._formatValue(a),this.set(d,a);this._reset();this._updateRoundedLabels();this._generateMoveables();
this._generateMinMaxEditors();e&&this.emit("data-value-change",{min:this.minimum,max:this.maximum,values:f.clone(this.values)})},_generateHandleLabelEditor:function(a,b){if(!a._numberEditor){var d=this.get("handles"),e=this.get("maximum"),c=this.get("minimum"),r=this.get("_isZoomed"),h=this.get("values"),m=h[b],k=t.indexOf(d,b),p=a.labelNode,g,l,q,v;"object"===typeof m&&(m=m.value);p.spanNode.innerHTML="";v=u.create("input",{type:"text"},p);0<d.length?(g=null!==d[k-1]?d[k-1]:null,l=null!==d[k+1]?
d[k+1]:null,d=h[g],h=h[l]):(d=h[b-1],h=h[b+1]);"object"===typeof d&&(d=d.value);"object"===typeof h&&(h=h.value);k=void 0!==d&&null!==d?d:r&&!isNaN(this._minZoomLabel)?this._minZoomLabel:c;q=void 0!==h&&null!==h?h:r&&!isNaN(this._maxZoomLabel)?this._maxZoomLabel:e;this.showRatioLabels&&(m=this._getLabelValueFromIndex(b).replace("%",""),k=d?Number(this._getLabelValueFromIndex(g,!0).replace("%","")):Number(this._minRatioLabel.replace("%",""))||Number(this._getRatioFromValue(this.minimum)),q=h?Number(this._getLabelValueFromIndex(l,
!0).replace("%","")):Number(this._maxRatioLabel.replace("%",""))||Number(this._getRatioFromValue(this.maximum)));this.isDate?(g=new y({date:new Date(m),required:!0,constraints:{min:new Date(k),max:new Date(q)}},v),b={editor:g,editorPropName:"_numberEditor",min:c,max:e,index:b,zoomed:r,spanNode:p.spanNode,moveable:a},g.on("keydown",f.hitch(this,this._stopKeydownDateHandler,b)),g.on("blur",f.hitch(this,this._stopBlurDateHandler,b)),g.watch("date",f.hitch(this,this._stopUpdateDateValue,b))):(g=new z({value:m,
constraints:{min:k,max:q,places:"0,20"}},v),n(g,"keydown",f.hitch(this,this._keydownHandler,{editor:g,originalValidate:!1})),n(g,"blur",f.hitch(this,this._blurHandler,{editor:g,editorPropName:"_numberEditor",updatedValue:m,min:c,max:e,index:b,zoomed:r,spanNode:p.spanNode,moveable:a})),n(g,"change",f.hitch(this,this._changeHandler,{editor:g,index:b,spanNode:p.spanNode})));a._numberEditor=g;g.focus();g.textbox.select()}},_keydownHandler:function(a,b){var d=a.originalValidate;a=a.editor;!1!==d&&(a.validate=
d);13===b.keyCode&&(b=a.get("value"),void 0===b&&(b=a.get("displayedValue")),b<=a.constraints.max&&b>=a.constraints.min?a.focusNode.blur():(d=a.validate,a.validate(!1),a.validate=function(){return!1}))},_blurHandler:function(a,b){b=a.editor;var d=a.editorPropName,e=a.updatedValue,c=a.min,f=a.max,h=a.index,m=a.zoomed,k=a.spanNode;a=a.moveable;isNaN(b.get("value"))&&b.set("value",e);m&&(b.get("value")>f||b.get("value")<c)&&(this.set("_isZoomed",!1),this.emit("zoom-out"));k.innerHTML=this._getLabelValueFromIndex(h);
b.destroy();a[d]=null},_changeHandler:function(a,b){var d=a.editor,e=a.index;a=a.spanNode;var c=b;b>d.constraints.max||b<d.constraints.min||isNaN(b)||void 0===b?a.innerHTML=this._getLabelValueFromIndex(e):(this.showRatioLabels&&(c=this._getValueFromPercent(b)),"object"===typeof this.values[e]?this.values[e].value=c:this.values[e]=c,this._reset(),this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),this.emit("handle-value-change",{values:this.values}))},_stopKeydownDateHandler:function(a,
b){13===b.keyCode&&a.editor.isValid()&&setTimeout(f.hitch(this,this._destroyHandleEditor,a),0)},_stopBlurDateHandler:function(a,b){setTimeout(f.hitch(this,this._destroyHandleEditor,a),0)},_destroyHandleEditor:function(a){a.spanNode.innerHTML=this._getLabelValueFromIndex(a.index);a.editor.destroy();a.moveable[a.editorPropName]=null},_stopUpdateDateValue:function(a){var b=a.min,d=a.max,e=a.index,c=a.zoomed,f=a.spanNode;a=(a=a.editor.get("date"))&&a.getTime();c&&(a>d||a<b)&&(this.set("_isZoomed",!1),
this.emit("zoom-out"));if(b=("object"===typeof this.values[e]?this.values[e].value:this.values[e])!==a)"object"===typeof this.values[e]?this.values[e].value=a:this.values[e]=a;f.innerHTML=this._getLabelValueFromIndex(e);this._reset();this._updateRoundedLabels();this._generateMoveables();this._generateMinMaxEditors();b&&this.emit("handle-value-change",{values:this.values})},_getRatioFromValue:function(a){var b=this.get("showRatioLabels");return"percent"===b?100*a:"percentTotal"===b?a/(1+a)*100:null},
_getValueFromPercent:function(a){var b,d=this.get("showRatioLabels");if("percent"===d)b=a/100;else if("percentTotal"===d){if(100<=a)return 100;b=a/(100-a)}return b},_getLabelValueFromIndex:function(a,b){return this.showRatioLabels&&this._ratioLabels[a]?!0===b?parseFloat(this._ratioLabels[a].toFixed(2))+"%":this._formatValue(parseFloat(this._ratioLabels[a].toFixed(2)))+"%":!0===b?this._roundedHandleLabels[a]:this._formatValue(this._roundedHandleLabels[a])},_getValuesFromObject:function(a){var b=[];
t.forEach(a,function(a){b.push(a.value)});return b},_getDecimalPlaces:function(a){return L.format(a,{places:"0,20",round:-1}).replace(/^-?\d*\.?|0+$/g,"").length},_collisionCheck:function(a,b){return!(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom)},_generateCtrlKeyListener:function(){n(document,"keydown",f.hitch(this,function(a){this._ctrlDown=a.metaKey||a.ctrlKey}));n(document,"keyup",f.hitch(this,function(a){this._ctrlDown=a.metaKey||a.ctrlKey}))},_valuesChange:function(){this.emit("change",
{values:this.get("values")})}});M("extend-esri")&&f.setObject("dijit.RendererSlider",q,E);return q});