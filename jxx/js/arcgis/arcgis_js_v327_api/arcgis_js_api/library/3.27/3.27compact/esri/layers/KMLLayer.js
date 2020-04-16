// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/KMLFolder":function(){define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","../lang"],function(l,n,m,k,f){l=l(null,{declaredClass:"esri.layers.KMLFolder",constructor:function(k){n.mixin(this,k);f.isDefined(this.visibility)&&(this.visible=!!this.visibility)}});m("extend-esri")&&n.setObject("layers.KMLFolder",l,k);return l})},"esri/layers/KMLGroundOverlay":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../lang ./MapImage".split(" "),
function(l,n,m,k,f,r){l=l([r],{declaredClass:"esri.layers.KMLGroundOverlay",constructor:function(k){f.isDefined(this.visibility)&&(this.visible=!!this.visibility)}});m("extend-esri")&&n.setObject("layers.KMLGroundOverlay",l,k);return l})},"*noref":1}});
define("esri/layers/KMLLayer","dojo/_base/kernel dojo/_base/declare dojo/_base/connect dojo/_base/lang dojo/_base/array dojo/_base/json dojo/_base/sniff dojo/io-query dojo/dom-construct dojo/dom-style ../kernel ../config ../lang ../request ../urlUtils ../SpatialReference ../geometry/webMercatorUtils ../dijit/PopupTemplate ./layer ./KMLFolder ./KMLGroundOverlay ./MapImageLayer ./FeatureLayer".split(" "),function(l,n,m,k,f,r,y,v,w,z,p,x,A,B,C,D,q,E,F,G,H,I,J){var u=n([F],{declaredClass:"esri.layers.KMLLayer",
serviceUrl:C.getProtocolForWebResource()+"//utility.arcgis.com/sharing/kml",constructor:function(a,b){a||console.log("KMLLayer:constructor - please provide url for the KML file");this._outSR=b&&b.outSR||new D({wkid:4326});this._options=k.mixin({},b);x.defaults.kmlService&&(this.serviceUrl=x.defaults.kmlService);if(a=this.linkInfo=b&&b.linkInfo)this.visible=!!a.visibility,this._waitingForMap=!!a.viewFormat;(!a||a&&a.visibility&&!this._waitingForMap)&&this._parseKml();this.refresh=k.hitch(this,this.refresh);
this.registerConnectEvents("esri.layers.KMLLayer",!0)},getFeature:function(a){if(a){var b=a.type,c=a.id,d;switch(b){case "esriGeometryPoint":case "esriGeometryPolyline":case "esriGeometryPolygon":(a=this["_"+b])&&(d=k.getObject("_mode._featureMap."+c,!1,a));break;case "GroundOverlay":if(a=this._groundLyr){var e=a.getImages(),b=e.length;for(a=0;a<b;a++)if(e[a].id===c){d=e[a];break}}break;case "ScreenOverlay":break;case "NetworkLink":f.some(this._links,function(a){return a.linkInfo&&a.linkInfo.id===
c?(d=a,!0):!1});break;case "Folder":b=(e=this.folders)?e.length:0;for(a=0;a<b;a++)if(e[a].id===c){d=e[a];break}break;default:console.log("KMLLayer:getFeature - unknown feature type")}return d}},getLayers:function(){var a=[];this._groundLyr&&a.push(this._groundLyr);this._fLayers&&(a=a.concat(this._fLayers));this._links&&f.forEach(this._links,function(b){b.declaredClass&&a.push(b)});return a},setFolderVisibility:function(a,b){a&&(this._fireUpdateStart(),(a.visible=b)&&(b=this._areLocalAncestorsVisible(a)),
this._setState(a,b),this._fireUpdateEnd())},_eventMap:{"network-link-error":["error"]},onRefresh:function(){},onOpacityChange:function(){},onNetworkLinkError:function(){},_parseKml:function(a){var b=this;this._fireUpdateStart();this._io=B({url:this.serviceUrl,content:{url:this._url.path+this._getQueryParameters(a),model:"simple",folders:"",refresh:this.loaded?!0:void 0,outSR:r.toJson(this._outSR.toJson())},callbackParamName:"callback",load:function(a){b._io=null;b._initLayer(a)},error:function(a){b._io=
null;a=k.mixin(Error(),a);a.message="Unable to load KML: "+(a.message||"");b._fireUpdateEnd(a);b._errorHandler(a)}})},_initLayer:function(a){var b;this.loaded&&(b=[],f.forEach(this.folders,function(a){a.visible&&b.push(a.id)}),this._options.minScale=this.minScale,this._options.maxScale=this.maxScale,this._options.opacity=this.opacity,this._removeInternalLayers());this.name=a.name;this.description=a.description;this.snippet=a.snippet;this.visibility=a.visibility;this.featureInfos=a.featureInfos;var c,
d,e=this.folders=a.folders,t=[],h;if(e)for(d=e.length,c=0;c<d;c++)h=e[c]=new G(e[c]),-1===h.parentFolderId&&t.push(h);var e=this._links=a.networkLinks,g;d=e?e.length:0;for(c=0;c<d;c++)e[c].viewRefreshMode&&-1!==e[c].viewRefreshMode.toLowerCase().indexOf("onregion")||(g=k.mixin({},this._options),g.linkInfo=e[c],g.id&&(g.id=g.id+"_"+c),h=e[c]=new u(e[c].href,g),h._parentLayer=this,h._parentFolderId=this._getLinkParentId(h.linkInfo.id),h._linkErrorHandle=h.on("error,network-link-error",k.hitch(h,function(a){this._parentLayer.onNetworkLinkError(a.error)})));
if((e=a.groundOverlays)&&0<e.length)for(g=k.mixin({},this._options),g.id&&(g.id+="_mapImage"),h=this._groundLyr=new I(g),d=e.length,c=0;c<d;c++)h.addImage(new H(e[c]));(a=k.getObject("featureCollection.layers",!1,a))&&0<a.length&&(this._fLayers=[],f.forEach(a,function(a,b){var c=k.getObject("featureSet.features",!1,a);c&&0<c.length&&(g=k.mixin({outFields:["*"],infoTemplate:a.popupInfo?new E(a.popupInfo):null,editable:!1},this._options),g.id&&(g.id=g.id+"_"+b),g.webgl=!1,a.layerDefinition.capabilities=
"Query,Data",a=new J(a,g),a.geometryType&&(this["_"+a.geometryType]=a),this._fLayers.push(a))},this),0===this._fLayers.length&&delete this._fLayers);if(!this.loaded)for(d=t.length,c=0;c<d;c++)h=t[c],this._setState(h,h.visible);this._fireUpdateEnd();this.loaded?(this._addInternalLayers(),f.forEach(this.folders,function(a){-1<f.indexOf(b,a.id)?this.setFolderVisibility(a,!0):this.setFolderVisibility(a,!1)},this),this.onRefresh()):(this.loaded=!0,this.onLoad(this))},_addInternalLayers:function(){var a=
this._map;this._fireUpdateStart();this._links&&f.forEach(this._links,function(b){b.declaredClass&&(a.addLayer(b),b._waitingForMap&&(b._waitingForMap=null,b.visible?b._parseKml(a):b._wMap=a))});var b=a.spatialReference,c=this._outSR,d;if(!b.equals(c))if(b.isWebMercator()&&4326===c.wkid)d=q.geographicToWebMercator;else if(c.isWebMercator()&&4326===b.wkid)d=q.webMercatorToGeographic;else{console.log("KMLLayer:_setMap - unsupported workflow. Spatial reference of the map and kml layer do not match, and the conversion cannot be done on the client.");
return}this._groundLyr&&(d&&f.forEach(this._groundLyr.getImages(),function(a){a.extent=d(a.extent)}),a.addLayer(this._groundLyr));(b=this._fLayers)&&0<b.length&&f.forEach(b,function(b){if(d){var c=b.graphics,e,g,f=c?c.length:0;for(e=0;e<f;e++)(g=c[e].geometry)&&c[e].setGeometry(d(g))}a.addLayer(b)});this.onVisibilityChange(this.visible)},_removeInternalLayers:function(){var a=this._map;this._links&&f.forEach(this._links,function(a){a.declaredClass&&a._io&&a._io.cancel();a._linkErrorHandle&&(a._linkErrorHandle.remove(),
a._linkErrorHandle=null)});a&&f.forEach(this.getLayers(),a.removeLayer,a)},_setState:function(a,b){a=a.featureInfos;var c,d,e,f=a?a.length:0,h=b?"show":"hide";for(e=0;e<f;e++)if(c=a[e],d=this.getFeature(c))if("Folder"===c.type)this._setState(d,b&&d.visible);else if("NetworkLink"===c.type)this._setInternalVisibility(d,b);else d[h]()},_areLocalAncestorsVisible:function(a){var b=a.parentFolderId;for(a=a.visible;a&&-1!==b;)b=this.getFeature({type:"Folder",id:b}),a=a&&b.visible,b=b.parentFolderId;return a},
_setInternalVisibility:function(a,b){var c=a._parentLayer,d=a._parentFolderId;for(b=b&&a.visible;b&&c;)b=b&&c.visible,-1<d&&(b=b&&c._areLocalAncestorsVisible(c.getFeature({type:"Folder",id:d}))),d=c._parentFolderId,c=c._parentLayer;this._setIntState(a,b)},_setIntState:function(a,b){a&&f.forEach(a.getLayers(),function(c){c.linkInfo?a._setIntState(c,b&&c.visible&&a._areLocalAncestorsVisible(a.getFeature({type:"Folder",id:c._parentFolderId}))):c.setVisibility(b)})},_getLinkParentId:function(a){var b=
-1;this.folders&&f.some(this.folders,function(c){return c.networkLinkIds&&-1!==f.indexOf(c.networkLinkIds,a)?(b=c.id,!0):!1});return b},_checkAutoRefresh:function(){var a=this.linkInfo;if(a)if(this.visible){if(this.loaded&&this._map){var b=a.refreshMode,c=a.refreshInterval,d=a.viewRefreshMode,a=a.viewRefreshTime;b&&-1!==b.toLowerCase().indexOf("oninterval")&&0<c&&(this._stopAutoRefresh(),this._timeoutHandle=setTimeout(this.refresh,1E3*c));d&&-1!==d.toLowerCase().indexOf("onstop")&&0<a&&!this._extChgHandle&&
(this._extChgHandle=m.connect(this._map,"onExtentChange",this,this._extentChanged))}}else this._stopAutoRefresh(),m.disconnect(this._extChgHandle),delete this._extChgHandle},_stopAutoRefresh:function(){clearTimeout(this._timeoutHandle);this._timeoutHandle=null},_getQueryParameters:function(a){a=a||this._map;var b={},c=this.linkInfo,d=a&&a.extent,e;this._url.query&&(k.mixin(b,this._url.query),e=!!this._url.query.token);p.id&&!e&&(e=p.id.findCredential(this._url.path))&&(b.token=e.token);if(c){e=c.viewFormat;
var f=c.httpQuery,c=c.viewBoundScale;if(d&&e){var h=d,g=d,m=d.spatialReference;m&&(m.isWebMercator()?h=q.webMercatorToGeographic(d):4326===m.wkid&&(g=q.geographicToWebMercator(d)));d=h.getCenter();g=Math.max(g.getWidth(),g.getHeight());c&&(h=h.expand(c));e=e.replace(/\[bboxWest\]/ig,h.xmin).replace(/\[bboxEast\]/ig,h.xmax).replace(/\[bboxSouth\]/ig,h.ymin).replace(/\[bboxNorth\]/ig,h.ymax).replace(/\[lookatLon\]/ig,d.x).replace(/\[lookatLat\]/ig,d.y).replace(/\[lookatRange\]/ig,g).replace(/\[lookatTilt\]/ig,
0).replace(/\[lookatHeading\]/ig,0).replace(/\[lookatTerrainLon\]/ig,d.x).replace(/\[lookatTerrainLat\]/ig,d.y).replace(/\[lookatTerrainAlt\]/ig,0).replace(/\[cameraLon\]/ig,d.x).replace(/\[cameraLat\]/ig,d.y).replace(/\[cameraAlt\]/ig,g).replace(/\[horizFov\]/ig,60).replace(/\[vertFov\]/ig,60).replace(/\[horizPixels\]/ig,a.width).replace(/\[vertPixels\]/ig,a.height).replace(/\[terrainEnabled\]/ig,0);k.mixin(b,v.queryToObject(e))}f&&(f=f.replace(/\[clientVersion\]/ig,p.version).replace(/\[kmlVersion\]/ig,
2.2).replace(/\[clientName\]/ig,"ArcGIS API for JavaScript").replace(/\[language\]/ig,l.locale),k.mixin(b,v.queryToObject(f)))}a=[];for(var n in b)A.isDefined(b[n])&&a.push(n+"\x3d"+b[n]);return(a=a.join("\x26"))?"?"+a:""},setScaleRange:function(a,b){this.inherited(arguments);f.forEach(this.getLayers(),function(c){c.setScaleRange(a,b)})},setOpacity:function(a){this.opacity!=a&&(f.forEach(this.getLayers(),function(b){b.setOpacity(a)}),this.opacity=a,this.onOpacityChange(a))},_setMap:function(a,b){this.inherited(arguments);
this._map=a;var c=this._div=w.create("div",null,b);z.set(c,"position","absolute");this._addInternalLayers();this.evaluateSuspension();return c},_unsetMap:function(a,b){this._io&&this._io.cancel();this._stopAutoRefresh();m.disconnect(this._extChgHandle);delete this._extChgHandle;this._removeInternalLayers();var c=this._div;c&&(b.removeChild(c),w.destroy(c));this._wMap=this._div=null;this.inherited(arguments)},onVisibilityChange:function(a){this.loaded?(this._fireUpdateStart(),this._setInternalVisibility(this,
a),this._checkAutoRefresh(),this._fireUpdateEnd()):this.linkInfo&&a&&(this._waitingForMap||this._parseKml(this._wMap))},refresh:function(){this.loaded&&this._map&&!this._io&&this.visible&&this._parseKml()},getFeatureCollection:function(a){var b,c=[];(a=this.getFeature({type:"Folder",id:a}))&&(b=f.map(a.featureInfos,function(a){if("esriGeometryPoint"===a.type||"esriGeometryPolyline"===a.type||"esriGeometryPolygon"===a.type)return a.id},this))&&0<b.length&&f.forEach(this._fLayers,function(a){var e,
d;e=a.toJson();e.featureSet.features&&0<e.featureSet.features.length&&(d=f.filter(e.featureSet.features,function(c){if(-1!==f.indexOf(b,c.attributes[a.objectIdField]))return c},this));d&&0<d.length&&(e.featureSet.features=d,c.push(e))},this);return c},getFeatureCount:function(a){a=this.getFeature({type:"Folder",id:a});var b={points:0,polylines:0,polygons:0};a&&f.forEach(a.featureInfos,function(a){"esriGeometryPoint"===a.type&&(b.points+=1);"esriGeometryPolyline"===a.type&&(b.polylines+=1);"esriGeometryPolygon"===
a.type&&(b.polygons+=1)});return b},_extentChanged:function(){this._stopAutoRefresh();this._timeoutHandle=setTimeout(this.refresh,1E3*this.linkInfo.viewRefreshTime)}});y("extend-esri")&&k.setObject("layers.KMLLayer",u,p);return u});