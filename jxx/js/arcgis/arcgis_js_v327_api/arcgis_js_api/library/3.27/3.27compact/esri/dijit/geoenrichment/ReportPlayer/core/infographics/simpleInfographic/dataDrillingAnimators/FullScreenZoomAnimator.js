// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/infographics/simpleInfographic/dataDrillingAnimators/FullScreenZoomAnimator","dojo/_base/declare dojo/_base/lang dojo/on dojo/keys dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dijit/Destroyable esri/dijit/geoenrichment/utils/DelayUtil esri/dijit/geoenrichment/utils/DeviceUtil esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/MouseUtil esri/dijit/geoenrichment/utils/animation/AnimationUtil esri/dijit/geoenrichment/utils/mobile/GesturesUtil ../../../../ReportPlayerState".split(" "),
function(q,r,l,t,g,m,u,h,v,w,e,n,x,f,p,y){return q(v,{ddZoomScreen:null,currentTriggerButtonBox:null,ddZoomScreenClass:null,closeZoomedDDWhenClickedOutside:!0,closeZoomedDDOnEsc:!0,zIndex:null,dataDrillingViewDiv:null,domNode:null,constructor:function(b){r.mixin(this,b);e.isMobileDevice()&&p.preventDefaultOverflow(this.dataDrillingViewDiv)},play:function(b,a,d){function e(a){a?(n.show(c.dataDrillingViewDiv),c.dataDrillingViewDiv.parentNode!==document.body&&document.body.appendChild(c.dataDrillingViewDiv),
c.zIndex&&h.set(c.dataDrillingViewDiv,"zIndex",c.zIndex)):(c.dataDrillingViewDiv.parentNode===document.body&&document.body.removeChild(c.dataDrillingViewDiv),n.hide(c.dataDrillingViewDiv))}function k(){e(b);c._setZoomScreen(b,!1);c._setCloseHandlers(b);y.isViewingDataDrillingZoom=b;g[b?"add":"remove"](c.domNode,"isDrillingData");g.remove(c.domNode,"isShowingAnimation")}var c=this;this.currentTriggerButtonBox=d?u.position(d):this.currentTriggerButtonBox;g.add(this.domNode,"isShowingAnimation");g.add(this.dataDrillingViewDiv,
"isZoomAnimation");if(a)return e(!0),a=this.getDataDrillingPanelDimensions(),h.set(this.dataDrillingViewDiv,{width:a.w+"px",height:a.h+"px"}),this._setZoomScreen(b,!0),b?(d=a.scale||1,a=f.animateResize({duration:200,domNode:this.dataDrillingViewDiv,fromBox:a.animateFromCenter?{x:0,y:0,w:document.body.clientWidth,h:document.body.clientHeight}:this.currentTriggerButtonBox,startScaleX:.7*d,startScaleY:.7*d,fromOffset:{x:"c",y:"c"},toBox:{x:(document.body.clientWidth-a.w*d)/2,y:(document.body.clientHeight-
a.h*d)/2+(a.yOffset||0),w:a.w,h:a.h},endScaleX:a.scale,endScaleY:a.scale,onEnd:k}),f.animateFadeIn({domNode:c.dataDrillingViewDiv,duration:100})):(a=f.animateResize({duration:200,domNode:this.dataDrillingViewDiv,toBox:this.currentTriggerButtonBox,startScaleX:a.scale,startScaleY:a.scale,endScaleX:.7*(a.scale||1),endScaleY:.7*(a.scale||1),toOffset:{x:"c",y:"c"},onEnd:k}),f.animateFadeOut({domNode:this.dataDrillingViewDiv,duration:100})),a&&a.then(function(){return w.delay(100)});k()},_setZoomScreen:function(b,
a){var d=this;b!==!!this.ddZoomScreen&&(b?(this.ddZoomScreen=m.create("div",{"class":"esriGEAbsoluteStretched simpleInfographic_dataDrillingViewDivScreen"+(e.isMobileDevice()?" mobile":"")},this.dataDrillingViewDiv,"before"),e.isMobileDevice()&&p.preventDefaultOverflow(this.ddZoomScreen),this.zIndex&&h.set(this.ddZoomScreen,"zIndex",this.zIndex),this.ddZoomScreenClass&&g.add(this.ddZoomScreen,this.ddZoomScreenClass),a&&f.animateFadeIn({domNode:this.ddZoomScreen,duration:100})):(b=function(){d.ddZoomScreen&&
m.destroy(d.ddZoomScreen);d.ddZoomScreen=null},a?f.animateFadeOut({domNode:this.ddZoomScreen,duration:100,onEnd:b}):b()))},_clickOutsideHandler:null,_keyboardHandler:null,_setCloseHandlers:function(b){var a=this;this._clickOutsideHandler&&this._clickOutsideHandler.remove();this._clickOutsideHandler=null;this._keyboardHandler&&this._keyboardHandler.remove();this._keyboardHandler=null;b&&(this.closeZoomedDDWhenClickedOutside&&(this._clickOutsideHandler=l(document.body,"click",function(){if(!x.isMouseOver(a.dataDrillingViewDiv,
{checkAllChildren:!0})&&!a.isMouseOver())a.onExitDataDrilling()}),this.own(this._clickOutsideHandler)),this.closeZoomedDDOnEsc&&(this._keyboardHandler=l(document.body,"keyup",function(b){if(b.keyCode===t.ESCAPE)a.onExitDataDrilling()}),this.own(this._keyboardHandler)))},isMouseOver:function(){return!1},getDataDrillingPanelDimensions:function(){return null},onExitDataDrilling:function(){}})});