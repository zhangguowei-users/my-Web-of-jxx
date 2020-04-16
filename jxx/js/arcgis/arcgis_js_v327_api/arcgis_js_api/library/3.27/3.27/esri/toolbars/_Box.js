// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/toolbars/_Box","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/Color dojo/has dojo/dom-style dojox/gfx/Moveable dojox/gfx/matrix ../kernel ../lang ../geometry/Point ../geometry/Polyline ../symbols/SimpleMarkerSymbol ../geometry/webMercatorUtils ../geometry/jsonUtils ../graphic".split(" "),function(m,k,h,n,A,t,u,v,g,w,x,p,y,B,q,z,r){m=m(null,{declaredClass:"esri.toolbars._Box",constructor:function(a,c,b,d,e,f,l){this._graphic=a;this._map=c;this._toolbar=
b;this._scale=d;this._rotate=e;this._defaultEventArgs={};this._scaleEvent="Scale";this._rotateEvent="Rotate";this._uniformScaling=f;a=b._options;this._markerSymbol=a.boxHandleSymbol;this._lineSymbol=a.boxLineSymbol;this._moveStartHandler=k.hitch(this,this._moveStartHandler);this._firstMoveHandler=k.hitch(this,this._firstMoveHandler);this._moveStopHandler=k.hitch(this,this._moveStopHandler);this._moveHandler=k.hitch(this,this._moveHandler);this._isTextPoint=l;this._init()},destroy:function(){this._cleanUp();
this._graphic=this._map=this._toolbar=this._markerSymbol=this._lineSymbol=null},refresh:function(){this._draw()},suspend:function(){h.forEach(this._getAllGraphics(),function(a){a.hide()})},resume:function(){h.forEach(this._getAllGraphics(),function(a){a.show()});this._draw()},_init:function(){this._draw()},_cleanUp:function(){this._connects&&h.forEach(this._connects,n.disconnect);var a=this._toolbar._scratchGL;this._anchors&&h.forEach(this._anchors,function(c){a.remove(c.graphic);(c=c.moveable)&&
c.destroy()});this._box&&a.remove(this._box);this._box=this._anchors=this._connects=null},_draw:function(){if(this._graphic.getDojoShape()){var a=this._map,c=this._toolbar._scratchGL,b=this._getBoxCoords(),d=new y(a.spatialReference),e=k.clone(h.filter(b,function(a,b){return 8!==b&&0===b%2}));e[0]&&e.push([e[0][0],e[0][1]]);d.addPath(e);this._rotate&&d.addPath([b[1],b[8]]);this._box?this._box.setGeometry(d):(this._box=new r(d,this._lineSymbol),c.add(this._box));this._anchors?h.forEach(this._anchors,
function(c,d){this._scale||(d=8);var e=new p(b[d],a.spatialReference);c.graphic.setGeometry(e);var e=c.moveable,f=c.graphic.getDojoShape();f&&(e?f!==e.shape&&(e.destroy(),c.moveable=this._getMoveable(c.graphic,d)):c.moveable=this._getMoveable(c.graphic,d))},this):(this._anchors=[],this._connects=[],h.forEach(b,function(b,d){!this._scale&&8>d||(b=new p(b,a.spatialReference),b=new r(b,this._markerSymbol),this._isTextPoint&&1===d%2&&b.hide(),c.add(b),this._anchors.push({graphic:b,moveable:this._getMoveable(b,
d)}))},this))}else this._cleanUp()},_getBoxCoords:function(a){var c=this._map,b,d=[],e,f,l;if(this._isTextPoint){b=this._graphic.getNode().getBoundingClientRect();var g=c.__container.getBoundingClientRect();b=[{x:b.left-g.left,y:b.top-g.top},{x:b.right-g.left,y:b.top-g.top},{x:b.right-g.left,y:b.bottom-g.top},{x:b.left-g.left,y:b.bottom-g.top}]}else b=this._getTransformedBoundingBox(this._graphic);h.forEach(b,function(b,g,h){e=b;(f=h[g+1])||(f=h[0]);l={x:(e.x+f.x)/2,y:(e.y+f.y)/2};a||(e=c.toMap(e),
l=c.toMap(l));d.push([e.x,e.y]);d.push([l.x,l.y])});this._rotate&&(b=k.clone(d[1]),b=a?{x:b[0],y:b[1]}:c.toScreen({x:b[0],y:b[1],spatialReference:c.spatialReference}),b.y-=this._toolbar._options.rotateHandleOffset,a||(b=c.toMap(b)),d.push([b.x,b.y]));return d},_getTransformedBoundingBox:function(a){var c=this._map,b=a.geometry.getExtent(),d=a.geometry.spatialReference;a=new p(b.xmin,b.ymax,d);b=new p(b.xmax,b.ymin,d);a=c.toScreen(a);b=c.toScreen(b);return[{x:a.x,y:a.y},{x:b.x,y:a.y},{x:b.x,y:b.y},
{x:a.x,y:b.y}]},_getAllGraphics:function(){var a=[this._box];this._anchors&&h.forEach(this._anchors,function(c){a.push(c.graphic)});return a=h.filter(a,x.isDefined)},_getMoveable:function(a,c){var b=a.getDojoShape();if(b)return a=new v(b),a._index=c,this._connects.push(n.connect(a,"onMoveStart",this._moveStartHandler)),this._connects.push(n.connect(a,"onFirstMove",this._firstMoveHandler)),this._connects.push(n.connect(a,"onMoveStop",this._moveStopHandler)),a.onMove=this._moveHandler,(b=b.getEventSource())&&
u.set(b,"cursor",this._toolbar._cursors["box"+c]),a},_moveStartHandler:function(a){this._toolbar["on"+(8===a.host._index?this._rotateEvent:this._scaleEvent)+"Start"](this._graphic)},_firstMoveHandler:function(a){this._toolbar._deactivateScrollWheel();var c=a.host._index,b=this._wrapOffset=a.host.shape._wrapOffsets[0]||0,d=this._graphic.getLayer().getNavigationTransform(),e;a=h.map(this._getBoxCoords(!0),function(a){return{x:a[0]+b,y:a[1]}});e=this._isTextPoint?this._map.toScreen(this._graphic.geometry):
{x:a[1].x,y:a[3].y};this._centerCoord=g.multiplyPoint(g.invert(d),e);if(8===c)e=g.multiplyPoint(g.invert(d),a[1]),this._isTextPoint&&(this._centerCoord=this._deNormalizePoint(this._centerCoord,e)),this._startLine=[this._centerCoord,e],this._moveLine=k.clone(this._startLine);else if(e=g.multiplyPoint(g.invert(d),a[c]),d=g.multiplyPoint(g.invert(d),a[(c+4)%8]),this._isTextPoint&&(this._centerCoord=this._deNormalizePoint(this._centerCoord,e)),this._firstMoverToAnchor=Math.sqrt((e.x-this._centerCoord.x)*
(e.x-this._centerCoord.x)+(e.y-this._centerCoord.y)*(e.y-this._centerCoord.y)),this._startBox=d,this._startBox.width=a[4].x-a[0].x,this._startBox.height=a[4].y-a[0].y,this._moveBox=k.clone(this._startBox),this._xfactor=e.x>d.x?1:-1,this._yfactor=e.y>d.y?1:-1,1===c||5===c)this._xfactor=0;else if(3===c||7===c)this._yfactor=0;this._toolbar._beginOperation("BOX");this._toolbar["on"+(8===c?this._rotateEvent:this._scaleEvent)+"FirstMove"](this._graphic)},_moveHandler:function(a,c){a=a.host._index;var b=
this._defaultEventArgs,d,e,f;b.angle=0;b.scaleX=1;b.scaleY=1;if(8===a)d=this._startLine,e=this._moveLine,f=e[1],f.x+=c.dx,f.y+=c.dy,c=this._getAngle(d,e),this._isTextPoint&&(c+=this._graphic.symbol.angle),e=g.rotategAt(c,d[0]),this._graphic.getDojoShape().setTransform(e),b.transform=e,b.angle=c,b.around=d[0];else{d=this._startBox;e=this._moveBox;e.width+=c.dx*this._xfactor;e.height+=c.dy*this._yfactor;this._uniformScaling||this._isTextPoint?(d=e.x+this._xfactor*e.width,e=e.y+this._yfactor*e.height,
d=Math.sqrt((d-this._centerCoord.x)*(d-this._centerCoord.x)+(e-this._centerCoord.y)*(e-this._centerCoord.y)),this._scaleRatio=c=f=d/this._firstMoverToAnchor,d=this._centerCoord):(c=e.width/d.width,f=e.height/d.height,d={x:d.x,y:d.y});if(isNaN(c)||Infinity===c||-Infinity===c)c=1;if(isNaN(f)||Infinity===f||-Infinity===f)f=1;e=g.scaleAt(c,f,d);if(this._isTextPoint){var h=g.rotategAt(this._graphic.symbol.angle,d);this._graphic.getDojoShape().setTransform([h,e])}else this._graphic.getDojoShape().setTransform(e);
b.transform=e;b.scaleX=c;b.scaleY=f;b.around=d}this._toolbar["on"+(8===a?this._rotateEvent:this._scaleEvent)](this._graphic,b)},_moveStopHandler:function(a){this._toolbar._activateScrollWheel();var c=this._graphic,b=this._toolbar,d=b._geo?q.geographicToWebMercator(c.geometry):c.geometry,e=d.spatialReference,f=c.getDojoShape(),g=f.getTransform(),h=c.getLayer().getNavigationTransform();this._isTextPoint?(c=this._graphic.symbol,8===a.host._index?c.angle+=this._getAngle(this._startLine,this._moveLine):
c.font.setSize(Math.round(c.font.size*this._scaleRatio*100)/100),this._graphic.setSymbol(c)):(d=d.toJson(),this._updateSegments(d.paths||d.rings,g,h,e),f.setTransform(null),d=z.fromJson(d),c.setGeometry(b._geo?q.webMercatorToGeographic(d,!0):d));this._draw();this._startLine=this._moveLine=this._startBox=this._moveBox=this._xfactor=this._yfactor=null;b._endOperation("BOX");this._defaultEventArgs.transform=g;b["on"+(8===a.host._index?this._rotateEvent:this._scaleEvent)+"Stop"](this._graphic,this._defaultEventArgs)},
_updateSegments:function(a,c,b,d){var e=this._map,f=this._wrapOffset||0;h.forEach(a,function(a){h.forEach(a,function(a){this._updatePoint(a,d,f,g,e,b,c)},this)},this)},_updatePoint:function(a,c,b,d,e,f,g){c=e.toScreen({x:a[0],y:a[1],spatialReference:c},!0);c.x+=b;c=d.multiplyPoint([f,g,d.invert(f)],c);c.x-=b;b=e.toMap(c);a[0]=b.x;a[1]=b.y},_getAngle:function(a,c){return 180*Math.atan2(c[0].y-c[1].y,c[0].x-c[1].x)/Math.PI-180*Math.atan2(a[0].y-a[1].y,a[0].x-a[1].x)/Math.PI},_deNormalizePoint:function(a,
c){var b=this._map._getFrameWidth();if(-1===b)return a;for(a={x:a.x,y:a.y};Math.abs(a.x-c.x)>=b;)a.x=a.x<c.x?a.x+b:a.x-b;var d=Math.abs(a.x-c.x);Math.abs(a.x-c.x+b)<d?a.x+=b:Math.abs(a.x-c.x-b)<d&&(a.x-=b);return a}});t("extend-esri")&&k.setObject("toolbars._Box",m,w);return m});