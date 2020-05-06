// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/ImageServiceLayerMixin","dojo/_base/declare dojo/_base/lang dojo/_base/Deferred dojo/_base/array dojo/_base/json dojo/_base/config dojo/_base/connect dojo/has dojo/io-query dojo/DeferredList ../kernel ../config ../lang ../request ../deferredUtils ../urlUtils ../geometry/Extent ../geometry/Point ../geometry/Polygon ./MosaicRule ./RasterFunction ./DimensionalDefinition ./Raster ./PixelBlock ./pixelFilters/VectorFieldPixelFilter ./rasterFormats/ImageCanvasDecoder ./TimeInfo ./Field ../graphic ../tasks/ImageServiceIdentifyTask ../tasks/ImageServiceIdentifyParameters".split(" "),
function(J,f,t,m,l,C,N,O,P,da,Q,R,F,B,r,L,K,S,T,D,z,U,V,M,W,X,Y,Z,aa,ba,ca){J=J(null,{declaredClass:"esri.layers.ImageServiceLayerMixin",_rasterFieldPrefix:"Raster.",_renderingRuleFieldSubPrefix:"ServicePixelValue.",_rasterFunctionServiceInfoProps:"bandCount pixelType hasRasterAttributeTable hasHistograms minValues maxValues meanValues stdvValues serviceDataType".split(" "),_rasterFunctionTemplateInfos:{},_customRenderingRuleId:{},_pixelTypeRanges:{U1:[0,1],U2:[0,3],U4:[0,15],U8:[0,255],S8:[-128,
127],U16:[0,65535],S16:[-32768,32767]},_eventMap:{"rendering-change":!0,"mosaic-rule-change":!0,"spatial-reference-change":!0,"renderer-change":!0},constructor:function(a,b){this.useMapTime=b&&b.hasOwnProperty("useMapTime")?!!b.useMapTime:!0},_initialize:function(a,b){this._url=L.urlToObject(a);this.raster=new V(this._url.path);this.infoTemplate=b&&b.infoTemplate;this.format=(a=b&&b.imageServiceParameters)&&a.format;this.compressionTolerance=a&&a.compressionTolerance?a.compressionTolerance:.01;this.interpolation=
a?a.interpolation:null;this.compressionQuality=a?a.compressionQuality:null;this.bandIds=a?a.bandIds:null;this.mosaicRule=a?a.mosaicRule:null;this.renderingRule=a?a.renderingRule:null;this.renderer=a?a.renderer:null;this.useMapDimensionValue=b&&b.hasOwnProperty("useMapDimensionValue")?!!b.useMapDimensionValue:!0;this.hasImageFilter=b&&b.hasImageFilter;this.activeMapDimensions=b&&b.activeMapDimensions;this._params=f.mixin({},this._url.query,{f:"image",interpolation:this.interpolation,format:this.format,
compressionQuality:this.compressionQuality,bandIds:this.bandIds?this.bandIds.join(","):null},a?a.toJson():{});this.pixelFilter=b&&b.pixelFilter;this.originalPixelData=this.pixelData=null;this.hasDataChanged=!0;this._requestDataHandler=f.hitch(this,this._requestDataHandler);this._requestDataErrorHandler=f.hitch(this,this._requestDataErrorHandler);this._rasterReadPromise=null;this._initLayer=f.hitch(this,this._initLayer);this._queryVisibleRastersHandler=f.hitch(this,this._queryVisibleRastersHandler);
this._visibleRasters=[];this._rasterAttributeTableFields=[];this._rasterAttributeTableFeatures=[];this._renderingRuleAttributeTable={};this._useRenderingRuleAttributeTable=!1;this._loadCallback=b&&b.loadCallback;(b=b&&b.resourceInfo)?this._initLayer(b):B({url:this._url.path,content:f.mixin({f:"json"},this._url.query),callbackParamName:"callback",load:this._initLayer,error:this._errorHandler});this.registerConnectEvents()},disableClientCaching:!1,_initLayer:function(a,b){if(null!==a&&void 0!==a){this._findCredential();
(this.credential&&this.credential.ssl||a&&a._ssl)&&this._useSSL();b=this.minScale;var c=this.maxScale;f.mixin(this,a);this.minScale=b;this.maxScale=c;this.initialExtent=this.fullExtent=this.extent=new K(a.extent);this.spatialReference=this.initialExtent.spatialReference;this.pixelSizeX=parseFloat(this.pixelSizeX);this.pixelSizeY=parseFloat(this.pixelSizeY);var d=this.minValues,e=this.maxValues,g=this.meanValues,k=this.stdvValues,A=this.bands=[];b=0;for(c=this.bandCount;b<c;b++)A[b]={min:d[b],max:e[b],
mean:g[b],stddev:k[b]};this.timeInfo=(b=this.timeInfo)&&b.timeExtent?new Y(b):null;c=this.fields=[];if(d=a.fields)for(b=0;b<d.length;b++)c.push(new Z(d[b]));this._updateInfoTemplateFields(this.fields);this.version=a.currentVersion;this.version||(this.version="fields"in a||"objectIdField"in a||"timeInfo"in a?10:9.3);F.isDefined(a.minScale)&&!this._hasMin&&this.setMinScale(a.minScale);F.isDefined(a.maxScale)&&!this._hasMax&&this.setMaxScale(a.maxScale);b={};a.defaultMosaicMethod?(b.method=a.defaultMosaicMethod,
b.operation=a.mosaicOperator,b.sortField=a.sortField,b.sortValue=a.sortValue):b.method=D.METHOD_NONE;this.defaultMosaicRule=new D(b);this.defaultMosaicRule.ascending=!0;this._useRenderingRuleAttributeTable=10<this.version&&"esriImageServiceDataTypeThematic"===this.serviceDataType;this._setDefaultRenderingRule(!0);this.renderingRule&&this.getRenderingRuleServiceInfo(this.renderingRule).then(f.hitch(this,function(a){a.hasRasterAttributeTable&&this.getRenderingRuleAttributeTable({renderingRule:this.renderingRule}).then(f.hitch(this,
function(){!this.renderer||"esri.renderer.ClassBreaksRenderer"!==this.renderer.declaredClass&&"esri.renderer.UniqueValueRenderer"!==this.renderer.declaredClass||this.refresh()}))}));this._isScientificData()&&(!this.mosaicRule||this.mosaicRule&&!this.mosaicRule.multidimensionalDefinition)&&this._setDefaultMultidimensionalDefinition(!0);10<this.version&&this.hasRasterAttributeTable&&this.getRasterAttributeTable().then(f.hitch(this,function(a){a&&(a.features&&a.fields&&(this.rasterAttributeTable=f.clone(a)),
a.features&&0<a.features.length&&(this._rasterAttributeTableFeatures=f.clone(a.features)),a.fields&&0<a.fields.length&&(this._rasterAttributeTableFields=f.clone(a.fields)),this.renderingRule||!this.renderer||"esri.renderer.ClassBreaksRenderer"!==this.renderer.declaredClass&&"esri.renderer.UniqueValueRenderer"!==this.renderer.declaredClass||this.refresh())}));this._initVectorPixelFilter();10.3<=this.version&&this.rasterFunctionInfos&&this.rasterFunctionInfos.length&&this.getRasterFunctionInfos().then(f.hitch(this,
function(a){if(a&&a.length){this.rasterFunctionInfos=a;var b=[],c;m.forEach(a,function(a){if(a){var d=a.functionType;c=c||1===d||2===d;b.push(a.name)}},this);this._hasItemLevelRFT=c;this._rasterFunctionNames=b;c&&(this._initVectorPixelFilter(),this.refresh())}}));this.loaded=!0;this._setDefaultFilter();this.onLoad(this);if(a=this._loadCallback)delete this._loadCallback,a(this)}},_updateInfoTemplateFields:function(a){if(a&&!(1>a.length)&&this.infoTemplate&&this.infoTemplate.info&&this.infoTemplate.info.fieldInfos&&
!(1>this.infoTemplate.info.fieldInfos.length)){var b,c,d,e;e=this.infoTemplate.info.fieldInfos;for(b=0;b<a.length;b++)for(d=a[b],c=0;c<e.length;c++)if(e[c].fieldName.toLowerCase()===d.name.toLowerCase()&&e[c].fieldName!==d.name){e[c].fieldName=d.name;break}}},getKeyProperties:function(a){var b=this._url.path+"/keyProperties",c=new t(r._dfdCanceller),d={f:"json"};a&&a.renderingRule&&(d.renderingRule=l.toJson(a.renderingRule.toJson()));10<this.version?(c._pendingDfd=B({url:b,content:d,handleAs:"json",
callbackParamName:"callback"}),c._pendingDfd.then(function(a){c.callback(a)},function(a){c.errback(a)})):(a=Error("Layer does not have key properties"),a.log=!!C.isDebug,c.errback(a));return c},getRasterAttributeTable:function(a){var b=this._url.path+"/rasterAttributeTable",c=new t(r._dfdCanceller),d={f:"json"},e=this.hasRasterAttributeTable;a&&a.renderingRule&&(d.renderingRule=l.toJson(a.renderingRule.toJson()),e=!0);10<this.version&&e?(c._pendingDfd=B({url:b,content:d,handleAs:"json",callbackParamName:"callback"}),
c._pendingDfd.then(function(a){c.callback(a)},function(a){c.errback(a)})):(a=Error("Layer does not support raster attribute table"),a.log=!!C.isDebug,c.errback(a));return c},getRenderingRuleAttributeTable:function(a){var b=new t(r._dfdCanceller);if(!a||!a.renderingRule)return b.errback(Error("Rendering rule is not specified")),b;a=a.renderingRule;var c=this._getRenderingRuleId(a);this._renderingRuleAttributeTable&&c&&this._renderingRuleAttributeTable.hasOwnProperty(c)?b.resolve(this._renderingRuleAttributeTable[c]):
b=this.getRasterAttributeTable({renderingRule:a}).then(f.hitch(this,function(a){var b;a&&a.features&&a.features.length&&a.fields&&a.fields.length&&(b={features:f.clone(a.features),fields:f.clone(a.fields)},c&&(this._renderingRuleAttributeTable[c]=b));return b}));return b},_initVectorPixelFilter:function(){var a;this._hasItemLevelRFT&&this.renderingRule&&(a=this._getItemLevelRenderingRule(this.renderingRule));if(a=a||this.renderingRule)return this.getRenderingRuleServiceInfo(a).then(f.hitch(this,function(a){a&&
this._isVectorData(a)&&!F.isDefined(this.pixelFilter)&&"esri.layers.ArcGISImageServiceVectorLayer"===this.declaredClass&&(this.vectorFieldPixelFilter=new W,this.vectorFieldPixelFilter.isDataUV="esriImageServiceDataTypeVector-UV"===a.serviceDataType,this.pixelFilter=this.vectorFieldPixelFilter.computeMagnitudeAndDirection,this.getKeyProperties().then(f.hitch(this,this._setFlowRepresentation)),this._applyVectorResamplingType(a.serviceDataType))}))},_applyVectorResamplingType:function(a){if(a){var b=
this.renderingRule;b&&"Resample"===b.functionName&&((b.functionArguments||{}).ResamplingType="esriImageServiceDataTypeVector-UV"===a?7:10,this.setRenderingRule(new z(b.toJson())))}},_getRasterAttributeTableFeatures:function(){var a=new t;if(this._rasterAttributeTableFeatures&&0<this._rasterAttributeTableFeatures.length)return a.resolve(this._rasterAttributeTableFeatures),a;if(10<this.version&&this.hasRasterAttributeTable)return a=this.getRasterAttributeTable(),a.then(f.hitch(this,function(a){a&&a.features&&
0<a.features.length&&(this._rasterAttributeTableFeatures=f.clone(a.features))})),a;a.resolve(this._rasterAttributeTableFeatures);return a},_getRenderingRuleAttributeTableFeatures:function(a){a=a&&a.renderingRule;return a?this.getRenderingRuleAttributeTable({renderingRule:a}).then(function(a){return a&&a.features}):(a=new t,a.errback(Error("Rendering rule is not specified")),a)},getCustomRasterFields:function(a){var b=a?a.rasterAttributeTableFieldPrefix:this._rasterFieldPrefix;a=10.3<=this.version?
"esriFieldTypeDouble":"esriFieldTypeString";var c={name:this._rasterFieldPrefix+"ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:a},d={name:this._rasterFieldPrefix+"ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:a},e={name:this._rasterFieldPrefix+"ServicePixelValue.Raw",alias:"Raw Service Pixel Value",domain:null,editable:!1,length:50,type:"esriFieldTypeDouble"},g=this.fields?f.clone(this.fields):[];a=g.length;g[a]=d;10.4<=this.version&&
"esri.layers.ArcGISImageServiceLayer"===this.declaredClass&&(!this.rasterFunctionInfos||!this.rasterFunctionInfos.length||this._isRenderingRuleAProcessingTemplate({functionName:"none"}))&&(a++,g[a]=e);if(this.capabilities&&-1<this.capabilities.toLowerCase().indexOf("catalog")||this.fields&&0<this.fields.length)a++,g[a]=c;!F.isDefined(this.pixelFilter)||"esriImageServiceDataTypeVector-UV"!==this.serviceDataType&&"esriImageServiceDataTypeVector-MagDir"!==this.serviceDataType||(c={name:this._rasterFieldPrefix+
"Magnitude",alias:"Magnitude",domain:null,editable:!1,type:"esriFieldTypeDouble"},d={name:this._rasterFieldPrefix+"Direction",alias:"Direction",domain:null,editable:!1,type:"esriFieldTypeDouble"},a++,g[a]=c,a++,g[a]=d);a=this._rasterAttributeTableFields;(c=this.renderingRule&&this._getRenderingRuleId(this.renderingRule))&&this._renderingRuleAttributeTable&&this._renderingRuleAttributeTable.hasOwnProperty(c)&&(a=this._renderingRuleAttributeTable[c].fields);a&&0<a.length&&(a=m.filter(a,function(a){return"esriFieldTypeOID"!==
a.type&&"value"!==a.name.toLowerCase()}),a=m.map(a,function(a){var c=f.clone(a);c.name=b+a.name;return c}),g=g.concat(a));var k=this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;10.4<=this.version&&this.rasterFunctionInfos&&m.forEach(this.rasterFunctionInfos,function(a){a&&a.name&&"none"!==a.name.toLowerCase()&&(a={name:k+a.name.replace(/ /gi,"_"),alias:a.name,domain:null,editable:!1,type:"esriFieldTypeDouble"},g.push(a))});return g},_prepareGetImageParameters:function(a,b,c,d){d=F.isDefined(d)?
d:this._params;if(this.renderer||this._hasItemLevelRFT&&this.renderingRule){var e=this.getExportImageRenderingRule();d.renderingRule=e?l.toJson(e.toJson()):null;e=this.getExportImageMosaicRule(d);d.mosaicRule=e?l.toJson(e.toJson()):null}e=a.spatialReference.wkid||l.toJson(a.spatialReference.toJson(!1));delete d._ts;f.mixin(d,{bbox:a.xmin+","+a.ymin+","+a.xmax+","+a.ymax,imageSR:e,bboxSR:e,size:b+","+c},this.disableClientCaching?{_ts:(new Date).getTime()}:{});delete d.compressionTolerance;d.format&&
"LERC"===d.format.toUpperCase()&&(d.compressionTolerance=this.compressionTolerance);d.token=this._getToken()},getImageUrl:function(a,b,c,d,e){e=F.isDefined(e)?e:this._params;this._prepareGetImageParameters(a,b,c,e);a=f.clone(e);this._cleanupRequestParams(a);b=this._url.path+"/exportImage?";c=L.addProxy(b+P.objectToQuery(f.mixin(a,{f:"image"})));var g=a.token;c.length>R.defaults.io.postLength||this.useMapImage?this._jsonRequest=B({url:b,content:f.mixin(a,{f:"json"}),callbackParamName:"callback",load:function(a,
b){a=a.href;g&&(a+=-1===a.indexOf("?")?"?token\x3d"+g:"\x26token\x3d"+g);d(L.addProxy(a))},error:this._errorHandler}):d(c)},onRenderingChange:function(){},onMosaicRuleChange:function(){},onRendererChange:function(){},setInterpolation:function(a,b){this.interpolation=this._params.interpolation=a;b||this.refresh(!0)},setCompressionQuality:function(a,b){this.compressionQuality=this._params.compressionQuality=a;b||this.refresh(!0)},setCompressionTolerance:function(a,b){this.compressionTolerance=a;b||
this.refresh(!0)},setBandIds:function(a,b){var c=!1;this.bandIds!==a&&(c=!0);this.bandIds=a;this._params.bandIds=a.join(",");if(c&&!b)this.onRenderingChange();b||this.refresh(!0)},setDefaultBandIds:function(a){this.bandIds=this._params.bandIds=null;a||this.refresh(!0)},setDisableClientCaching:function(a){this.disableClientCaching=a},setMosaicRule:function(a,b){var c=!1;this.mosaicRule!==a&&(c=!0);this.mosaicRule=a;this._params.mosaicRule=l.toJson(a.toJson());if(c&&!b)this.onMosaicRuleChange();b||
this.refresh(!0)},getRasterFunctionInfos:function(){if(10.3>this.version||!this.rasterFunctionInfos||!this.rasterFunctionInfos.length)console.log("Layer doesn't support /rasterFunctionInfos resource.");else return B({url:this._url.path+"/rasterFunctionInfos",content:{f:"json"},handleAs:"json",load:function(a){return a&&a.rasterFunctionInfos}})},setRenderingRule:function(a,b){var c=!1;this.renderingRule!==a&&(c=!0);this.renderingRule=a;this._params.renderingRule=a?l.toJson(a.toJson()):null;this._useRenderingRuleAttributeTable&&
this.getRenderingRuleAttributeTable({renderingRule:a});if(c)this.onRenderingChange();this._setDefaultFilter();b||this.refresh(!0)},setImageFormat:function(a,b){this.format=this._params.format=a;this._setDefaultFilter();b||this.refresh(!0)},setInfoTemplate:function(a){this.infoTemplate=a;this._updateInfoTemplateFields(this.fields)},setDefinitionExpression:function(a,b){var c=this.mosaicRule?this.mosaicRule.toJson():{};this.mosaicRule||(this.defaultMosaicRule?c=this.defaultMosaicRule.toJson():c.method=
D.METHOD_NONE);c.where=a;a=new D(c);this.setMosaicRule(a,b);return this},getDefinitionExpression:function(){return this.mosaicRule?this.mosaicRule.where:null},setPixelFilter:function(a){this.pixelFilter=a;this._isDefaultPixelFilter=!1},getPixelData:function(a){return a?(this._useBrowserDecoding()&&(this.originalPixelData={pixelBlock:this._getPixelBlockFromCanvas(this._context,this._map.width,this._map.height),extent:this._map.extent}),this.originalPixelData):this.pixelData},getExportImageRenderingRule:function(){var a;
this._hasItemLevelRFT&&this.renderingRule&&(a=this._getServiceLevelRenderingRule(this.renderingRule));a=a||this.renderingRule;return this._combineRenderingRule(this._convertRendererToRenderingRule(this.renderer),a)},getExportImageMosaicRule:function(){var a=this.mosaicRule,b;this._hasItemLevelRFT&&this.renderingRule&&(b=this._getItemLevelRenderingRule(this.renderingRule));b&&(a=a||this.defaultMosaicRule||new D,a.itemRenderingRule=b);return a},redraw:function(){this.hasDataChanged=!1;this._setPixelData(this.originalPixelData)},
getHistograms:function(){var a=new t(r._dfdCanceller);if(this.hasHistograms)a._pendingDfd=B({url:this._url.path+"/histograms",content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),a._pendingDfd.then(function(b){a.callback(b)},function(b){a.errback(b)});else{var b=Error("Layer does not have histograms.");b.log=!!C.isDebug;a.errback(b)}return a},computeHistograms:function(a){var b=new t(r._dfdCanceller);if(10.1<=this.currentVersion){a=a||{};var c=a.geometry||this.fullExtent,d=(a.geometry||
this.fullExtent).toJson(),c="extent"===c.type?"esriGeometryEnvelope":"esriGeometryPolygon",e=a.renderingRule||this.renderingRule||this.defaultRenderingRule,e=e?e.toJson():null,g=a.mosaicRule||this.mosaicRule||this.defaultMosaicRule,g=g?g.toJson():null;a=a.pixelSize||{x:this.pixelSizeX,y:this.pixelSizeY};b._pendingDfd=B({url:this._url.path+"/computeHistograms",content:f.mixin({f:"json",geometry:JSON.stringify(d),geometryType:c,renderingRule:JSON.stringify(e),mosaicRule:JSON.stringify(g),pixelSize:JSON.stringify(a),
callbackParamName:"callback"}),handleAs:"json"});b._pendingDfd.then(function(a){b.callback(a)},function(a){b.errback(a)})}else d=Error("Layer doesn't support computeHistograms."),d.log=!!C.isDebug,b.errback(d);return b},getRenderingRuleServiceInfo:function(a){var b=new r._fixDfd(new t(r._dfdCanceller));if(!a)return b.errback(Error("Rendering rule is not specified")),b;var c=this._getRenderingRuleId(a);return c&&this._rasterFunctionTemplateInfos[c]?(b.resolve(this._rasterFunctionTemplateInfos[c]),
b):B({url:this._url.path,content:f.mixin(f.mixin({f:"json",renderingRule:JSON.stringify(a.toJson())},this._url.query)),callbackParamName:"callback",load:f.hitch(this,function(a){var b={};m.forEach(this._rasterFunctionServiceInfoProps,function(c){b[c]=a[c]});return this._rasterFunctionTemplateInfos[c]=b}),error:this._errorHandler})},queryVisibleRasters:function(a,b,c,d){var e=this._map,g=r._fixDfd(new t(r._dfdCanceller));this._visibleRasters=[];var k,A,n=!0,p=!0,h=null,q=this.infoTemplate?this.infoTemplate.info:
null,u=q?f.clone(this.infoTemplate.info.fieldInfos):null;b=b||{};if(q&&this.infoTemplate.info.mediaInfos&&this.infoTemplate.info.mediaInfos.length){var w=[];m.forEach(this.infoTemplate.info.mediaInfos,function(a){w=w.concat(a&&a.value&&a.value.fields||[])});w.length&&m.forEach(u,function(a){a&&-1<w.indexOf(a.fieldName)&&(a.visible=!0)})}if(u&&0<u.length)for(n=!1,k=0;k<u.length;k++)if((A=u[k])&&A.fieldName.toLowerCase()!==this._rasterFieldPrefix.toLowerCase()+"servicepixelvalue"&&(A.visible||q.title&&
-1<q.title.toLowerCase().indexOf(A.fieldName.toLowerCase()))){n=!0;break}this.infoTemplate&&this.infoTemplate.info&&this.infoTemplate.info.layerOptions&&this.infoTemplate.info.layerOptions.hasOwnProperty("returnTopmostRaster")&&(h=this.infoTemplate.info.layerOptions.returnTopmostRaster?1:null);u&&0<u.length&&(p=!1,m.some(u,function(a){if(a&&a.fieldName.toLowerCase()===this._rasterFieldPrefix.toLowerCase()+"itempixelvalue"&&a.visible)return p=!0},this));var x=(A=this._removeVisualizationStretchFunction(this.renderingRule))&&
A.functionName,v=[];if(10.4<=this.version){var H=!1;if(this.rasterFunctionInfos&&u){var E=this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;m.forEach(this.rasterFunctionInfos,function(a){var b=E+a.name.replace(/ /gi,"_");m.some(u,function(a){return a.visible&&a.fieldName===b})&&(H=H||x&&x===a.name,v.push(new z({rasterFunction:a.name})))})}A&&!H&&v.push(A)}k=new ca;k.geometry=a.geometry;k.returnGeometry=this._map.spatialReference.equals(this.spatialReference);k.returnCatalogItems=n;k.timeExtent=
a.timeExtent;k.returnPixelValues=p;k.maxItemCount=h||a.maxItemCount;this._params.time&&this.mosaicRule?(a=f.clone(this.mosaicRule),a=this._filterOutTimeDimension(a),k.mosaicRule=a):k.mosaicRule=this.mosaicRule||null;k.renderingRule=10.4>this.version&&A||null;k.renderingRules=v||null;10.61>this.version&&(k.returnPixelValues=void 0,k.maxItemCount=void 0);e&&(e=new S((e.extent.xmax-e.extent.xmin)/e.width,(e.extent.ymax-e.extent.ymin)/e.height,e.extent.spatialReference),k.pixelSize=e);b.requestParams=
k;var l=this,e=new ba(this.url);(g._pendingDfd=e.execute(k)).addCallbacks(function(a){l._queryVisibleRastersHandler(a,b,c,d,g)},function(a){l._resolve([a],null,d,g,!0)});return g},_queryVisibleRastersHandler:function(a,b,c,d,e){function g(){var a=this.getCustomRasterFields(b),d=this._getDomainFields(a),g=b?b.returnDomainValues:!1,u=b&&b.rasterAttributeTableFieldPrefix,h,q,w,x,v,l,r,t,E,z,a=(a=this._getRenderingRuleId(this.renderingRule))&&this._rasterFunctionTemplateInfos[a];this.renderingRule&&(this._useRenderingRuleAttributeTable||
a)?(a=this._getRenderingRuleAttributeTableFeatures({renderingRule:this.renderingRule}),z=k):a=this._getRasterAttributeTableFeatures();a.then(f.hitch(this,function(a){for(h=0;h<p.length;h++){y=p[h];y.setInfoTemplate(this.infoTemplate);y._layer=this;if(k){E=k.replace(/ /gi,"").split(",");q=k;w=E;n&&n.length>=h&&(q=n[h].replace(/ /gi,", "),w=n[h].split(" "));y.attributes[this._rasterFieldPrefix+"ItemPixelValue"]=w;y.attributes[this._rasterFieldPrefix+"ServicePixelValue"]=E;A&&(y.attributes[this._rasterFieldPrefix+
"ServicePixelValue.Raw"]=A.replace(/ /gi,"").split(","));if(this.pixelFilter){var b=new M({height:1,width:1,pixelType:"F32",pixels:[],statistics:[]});m.forEach(w,function(a){b.addData({pixels:[a],statistics:{minValue:a,maxValue:a,noDataValue:null}})});this.pixelFilter({pixelBlock:b,extent:new K(0,0,0,0,this._map.spatialReference)});if("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)y.attributes[this._rasterFieldPrefix+"Magnitude"]=
b.pixels[0][0],y.attributes[this._rasterFieldPrefix+"Direction"]=b.pixels[1][0]}m.forEach(H,function(a){y.attributes[a.name]=a.value});var B=z||q;if(a&&0<a.length&&(x=m.filter(a,function(a){if(a&&a.attributes)return a.attributes.hasOwnProperty("Value")?a.attributes.Value==B:a.attributes.VALUE==B}),0<x.length&&(v=f.clone(x[0]),u&&v))){t={};for(l in v.attributes)v.attributes.hasOwnProperty(l)&&(r=u+l,t[r]=v.attributes[l]);v.attributes=t;y.attributes=f.mixin(y.attributes,v.attributes)}}g&&d&&0<d.length&&
m.forEach(d,function(a){if(a){var b=y.attributes[a.name];F.isDefined(b)&&(b=this._getDomainValue(a.domain,b),F.isDefined(b)&&(y.attributes[a.name]=b))}},this);C.push(y);this._visibleRasters.push(y)}this._resolve([C,null,!0],null,c,e)}))}var k=a.value,A=a.value,n,p,h=0,q=0,u=this,w=this.objectIdField,x,v,H=[];d=b.requestParams.renderingRules;var E=a.processedValues,r=this.renderingRule&&l.toJson(this._removeVisualizationStretchFunction(this.renderingRule).toJson());if(d&&E&&d.length===E.length){var t=
this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;m.forEach(d,function(a,b){if(a.functionName){var c={name:t+a.functionName.replace(/ /gi,"_"),value:E[b].replace(/ /gi,"").split(",")};H.push(c);r&&r===l.toJson(a.toJson())&&(k=E[b])}})}d=this.infoTemplate&&this.infoTemplate.info&&this.infoTemplate.info.layerOptions&&this.infoTemplate.info.layerOptions.hasOwnProperty("showNoDataRecords")?this.infoTemplate.info.layerOptions.showNoDataRecords:!0;if(a.catalogItems){var z=0,D,I,G=a.catalogItems.features.length;
v=0;p=Array(G);n=Array(G);x=Array(G);if(a.properties&&a.properties.Values){G=a.properties.Values.length;for(h=0;h<G;h++)-1<a.properties.Values[h].toLowerCase().indexOf("nodata")&&v++;D=G-v;for(h=0;h<G;h++)v=!0,-1<a.properties.Values[h].toLowerCase().indexOf("nodata")?(I=D++,d||(v=!1,p.length--,n.length--,x.length--)):I=z++,v&&(p[I]=a.catalogItems.features[h],n[I]=a.properties.Values[h],x[I]=p[I].attributes[w])}else{for(h=0;h<G;h++)p[h]=a.catalogItems.features[h],x[h]=p[h].attributes[w];n=null}}this._visibleRasters=
[];var y;(a=-1<k.toLowerCase().indexOf("nodata"))&&!d&&(p=[],n=[],x=[]);!k||p||a||(w="ObjectId",p=[],y=new aa(new K(this.fullExtent),null,{ObjectId:0}),p.push(y));var C=[];p?!this._map.spatialReference.equals(this.spatialReference)&&x&&0<x.length?B({url:this._url.path+"/query",content:{f:"json",objectIds:x.join(","),returnGeometry:!0,outSR:l.toJson(u._map.spatialReference.toJson()),outFields:w},handleAs:"json",callbackParamName:"callback",load:function(a){if(0===a.features.length)u._resolve([C,null,
null],null,c,e);else{for(h=0;h<a.features.length;h++)for(q=0;q<p.length;q++)p[q].attributes[w]==a.features[h].attributes[w]&&(p[q].geometry=new T(a.features[h].geometry),p[q].geometry.setSpatialReference(u._map.spatialReference));g.call(u)}},error:function(a){u._resolve([C,null,null],null,c,e)}}):g.call(this):this._resolve([C,null,null],null,c,e)},getVisibleRasters:function(){var a=this._visibleRasters,b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b},_getDomainFields:function(a){if(a){var b=
[];m.forEach(a,function(a){if(a.domain){var c={};c.name=a.name;c.domain=a.domain;b.push(c)}});return b}},_getDomainValue:function(a,b){if(a&&a.codedValues){var c;m.some(a.codedValues,function(a){return a.code===b?(c=a.name,!0):!1});return c}},_requestData:function(a,b,c){this._rasterReadPromise&&this._rasterReadPromise.cancel();a=f.clone(a);var d=a._normalize(!0);this._prepareGetImageParameters(d,b,c);b=f.clone(this._params);this._cleanupRequestParams(b);b.extent=a;b.format=b.format||(10.3<=this.version?
"lerc":"jpgpng");"lerc"===b.format.toLowerCase()&&!b.lercVersion&&10.5<=this.version&&(b.lercVersion=2);c=null;this._useBrowserDecoding()&&(c=new X({ctx:this._context}));b={imageServiceParameters:b,nBands:Math.min(this.bandCount,3),pixelType:this.pixelType,decodeFunc:c?f.hitch(c,"decode"):null};this._rasterReadPromise=this.raster.read(b,this._requestDataHandler,this._requestDataErrorHandler)},_requestDataHandler:function(a){this._rasterReadPromise&&this._rasterReadPromise.isCanceled()||(this.originalPixelData=
a,this.hasDataChanged=!0,this._setPixelData(a))},_setPixelData:function(a){a=this._clonePixelData(a);this.pixelFilter&&this.pixelFilter(a);this.pixelData=a;this._rasterReadPromise&&this._rasterReadPromise.isCanceled()||(this._drawPixelData(),this._rasterReadPromise=null)},_clonePixelData:function(a){if(null===a||void 0===a)return a;var b={};a.extent&&(b.extent=f.clone(a.extent));a=a.pixelBlock;if(null===a||void 0===a)return b;b.pixelBlock=a.clone();return b},_setDefaultFilter:function(){},_getPixelBlockFromCanvas:function(a,
b,c){a=a.getImageData(0,0,b,c).data;for(var d=b*c,e=0,g=0,f=new Uint8Array(d),m=new Uint8Array(d),n=new Uint8Array(d),p=new Uint8Array(d),h=Infinity,q=Infinity,u=Infinity,w=-Infinity,x=-Infinity,v=-Infinity,l,r,t,e=0;e<d;e++)l=a[g++],r=a[g++],t=a[g++],h=h<l?h:l,w=w>l?w:l,q=q<r?q:r,x=x>r?x:r,u=u<t?u:t,v=v>t?v:t,f[e]=l,m[e]=r,n[e]=t,p[e]=a[g++]&1;return new M({width:b,height:c,pixels:[f,m,n],pixelType:"U8",mask:p,statistics:[{minValue:h,maxValue:w},{minValue:q,maxValue:x},{minValue:u,maxValue:v}]})},
_useBrowserDecoding:function(){return(void 0===this.pixelFilter||null===this.pixelFilter)&&("jpeg"===this.format.toLowerCase()||"jpg"===this.format.toLowerCase()||-1<this.format.toLowerCase().indexOf("png"))},getMultidimensionalInfo:function(){var a=this._url.path+"/multiDimensionalInfo",b=new t(r._dfdCanceller);if(this._multidimensionalInfo)return b.resolve(this._multidimensionalInfo),b;10.3<=this.version&&this.hasMultidimensions?(b._pendingDfd=B({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),
b._pendingDfd.then(f.hitch(this,function(a){this._multidimensionalInfo=a.multidimensionalInfo;b.callback(a.multidimensionalInfo)}),function(a){b.errback(a)})):(a=Error("Layer does not support multidimensional info"),a.log=!!C.isDebug,b.errback(a));return b},getDefaultMultidimensionalDefinition:function(){var a,b,c,d=[],e=new t(r._dfdCanceller),g;if(this._defaultMultidimensionalDefinition)return e.resolve(f.clone(this._defaultMultidimensionalDefinition)),e;e._pendingDfd=this.getMultidimensionalInfo();
e._pendingDfd.then(f.hitch(this,function(k){a=k;b=a.variables[0].dimensions;for(c in b)b.hasOwnProperty(c)&&"StdTime"!==b[c].name&&(g=b[c],d.push(new U({variableName:"",dimensionName:g.name,isSlice:!g.hasRanges,values:[this._getDefaultDimensionValue(g)]})));this._defaultMultidimensionalDefinition=d;e.callback(f.clone(d))}),function(a){e.errback(a)});return e},_getDefaultDimensionValue:function(a){if(a&&a.values&&a.values.length){var b,c,d=Infinity,e,g;if(a.hasRanges)return a.values[0];if(a.name&&
"stdz"===a.name.toLowerCase()){for(g=0;g<a.values.length&&(e=a.values[g],c=Math.abs(e-0),c<d&&(d=c,b=e),0!==c);g++);return b}return a.extent[0]}},_setDefaultMultidimensionalDefinition:function(a){var b,c={};this.getDefaultMultidimensionalDefinition().then(f.hitch(this,function(d){b=d;0<b.length&&(this.mosaicRule?(c=f.clone(this.mosaicRule),c.multidimensionalDefinition=b):this.defaultMosaicRule?(c=f.clone(this.defaultMosaicRule),c.multidimensionalDefinition=b):c=new D({multidimensionalDefinition:b}),
this.setMosaicRule(c,a))}))},_setDefaultRenderingRule:function(a){var b={},c=this.renderingRule;if(!c&&"esri.layers.ArcGISImageServiceVectorLayer"!==this.declaredClass&&!this.bandIds&&this.rasterFunctionInfos&&this.rasterFunctionInfos.length&&"none"!==this.rasterFunctionInfos[0].name.toLowerCase())b.rasterFunction=this.rasterFunctionInfos[0].name;else if("esri.layers.ArcGISImageServiceVectorLayer"===this.declaredClass&&10.3<this.version&&(!c||"Resample"!==c.functionName)){var d="esriImageServiceDataTypeVector-UV"===
this.serviceDataType?7:10;b.rasterFunction="Resample";b.rasterFunctionArguments={ResamplingType:d,InputCellSize:{x:this.pixelSizeX,y:this.pixelSizeY}};c&&(b.rasterFunctionArguments.Raster=c.toJson())}b.hasOwnProperty("rasterFunction")&&(this.defaultRenderingRule=new z(b),this.setRenderingRule(this.defaultRenderingRule,a))},_cleanupRequestParams:function(a){if(!a)return a;if(a.time&&a.mosaicRule){var b=new D(l.fromJson(a.mosaicRule)),b=this._filterOutTimeDimension(b);a.mosaicRule=l.toJson(b.toJson())}var b=
"displayOnPan drawMode styling id opacity visible resourceInfo useMapDimensionValue extent renderer".split(" "),c;for(c in b)a.hasOwnProperty(b[c])&&delete a[b[c]];return a},_filterOutTimeDimension:function(a){if(a&&a.multidimensionalDefinition&&0<a.multidimensionalDefinition.length){var b=m.filter(a.multidimensionalDefinition,function(a){return"StdTime"!==a.dimensionName});a.multidimensionalDefinition=b}return a},_removeVisualizationStretchFunction:function(a){var b=a&&a.functionName;if(!b||"stretch"!==
b.toLowerCase())return a;var c=a.functionArguments.Raster;return c&&c.functionName&&m.some(this.rasterFunctionInfos,function(a){return c.functionName===a.name})?c:a},_isScientificData:function(){return"esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType||"esriImageServiceDataTypeScientific"===this.serviceDataType},_isVectorData:function(a){a=(a=a||this)&&a.serviceDataType;return"esriImageServiceDataTypeVector-UV"===a||"esriImageServiceDataTypeVector-MagDir"===
a},_isRenderingRuleAProcessingTemplate:function(a){var b=a&&a.functionName;return!b||a.functionArguments?!1:m.some(b&&(this.rasterFunctionInfos||[]),function(a){return a&&a.name&&a.name.toLowerCase()===b.toLowerCase()})},_getRenderingRuleId:function(a){var b=a&&a.functionName;if(b){if(this._isRenderingRuleAProcessingTemplate(a))return b;var c=this._customRenderingRuleId[b];if(c){if(c!==a){for(var d in this._customRenderingRuleId)if(this._customRenderingRuleId[d]===a)return d;for(c=0;this._customRenderingRuleId[e];)c+=
1;var e;this._customRenderingRuleId[b+c]=a}}else this._customRenderingRuleId[b]=a;return b}},_createPixelData:function(a){a=new M({width:2,height:2,pixels:a,pixelType:this.pixelType,statistics:a});var b=this.fullExtent.getCenter(),b=new K(b.x,b.y,b.x+this.pixelSizeX,b.y+this.pixelSizeY,this.spatialReference);return{pixelBlock:a,extent:b}},_convertRendererToRenderingRule:function(a){var b=a&&a.declaredClass;if(!b||"esri.renderer.UniqueValueRenderer"!==b&&"esri.renderer.ClassBreaksRenderer"!==b&&"esri.renderer.StretchRenderer"!==
b)return null;var c=null;"esri.renderer.StretchRenderer"===b?c=a.toRenderingRule({convertToColormap:10.6>this.version}):"esri.renderer.ClassBreaksRenderer"===b?c=this._convertClassifyRenderer(a):"esri.renderer.UniqueValueRenderer"===b&&(c=this._convertUniqueValueRenderer(a));return c},_getValueField:function(a){if(a&&a.length){var b,c;m.some(a,function(a){if((c=a.name)&&"value"===c.toLowerCase())return b=c,!0});return b}},_convertClassifyRenderer:function(a){var b,c=[],d=[],e=[],g=[],f;b=this.renderingRule&&
this._getRenderingRuleId(this.renderingRule);var l,n,p=this.hasRasterAttributeTable,h,q;b&&(p=this._rasterFunctionTemplateInfos[b]?this._rasterFunctionTemplateInfos[b].hasRasterAttributeTable:this.hasRasterAttributeTable,n=this._renderingRuleAttributeTable[b],q=this._rasterFunctionTemplateInfos[b]);l=n&&n.features?n.features:this._rasterAttributeTableFeatures;h=this._getValueField(n&&n.fields?n.fields:this._rasterAttributeTableFields);p&&l?(m.forEach(a.infos,function(b,c){var d,e=b.symbol.color;e.a&&
m.forEach(l,function(f){d=f.attributes[a.attributeField];(d>=b.minValue&&d<b.maxValue||c===a.infos.length-1&&d>=b.minValue)&&g.push([f.attributes[h],e.r,e.g,e.b])},this)},this),b=q&&q.pixelType||this.pixelType,this._adjustColormapToPixelTypeRange(g,b),b=new z,b.functionName="Colormap",b.functionArguments={},b.functionArguments.Colormap=g,b.variableName="Raster"):(m.forEach(a.infos,function(a,b){f=a.symbol&&a.symbol.color;f.a?(0===b?c.push.call(c,a.minValue,a.maxValue+1E-6):c.push.call(c,a.minValue+
1E-6,a.maxValue+1E-6),d.push(b),g.push([b,f.r,f.g,f.b])):e.push(a.minValue,a.maxValue)}),b=q&&q.pixelType||this.pixelType,this._adjustColormapToPixelTypeRange(g,b),b=new z,b.functionName="Remap",b.functionArguments={InputRanges:c,OutputValues:d,NoDataRanges:e},b.variableName="Raster",n=new z,n.functionName="Colormap",n.functionArguments={Colormap:g,Raster:b},b=n);return b},_convertUniqueValueRenderer:function(a){var b=[],c=this.renderingRule&&this._getRenderingRuleId(this.renderingRule),d,e,f,k;c&&
(e=this._renderingRuleAttributeTable[c],k=this._rasterFunctionTemplateInfos[c]);d=e&&e.features?e.features:this._rasterAttributeTableFeatures;f=this._getValueField(e&&e.fields?e.fields:this._rasterAttributeTableFields);m.forEach(a.infos,function(c){var e=c.symbol.color;e.a&&(a.attributeField!==f&&d?m.forEach(d,function(d){d.attributes[a.attributeField]==c.value&&b.push([d.attributes[f],e.r,e.g,e.b])},this):b.push([c.value,e.r,e.g,e.b]))},this);this._adjustColormapToPixelTypeRange(b,k&&k.pixelType||
this.pixelType);c=new z;c.functionName="Colormap";c.functionArguments={};c.functionArguments.Colormap=b;c.variableName="Raster";return c},_adjustColormapToPixelTypeRange:function(a,b){(b=this._pixelTypeRanges[b])&&a.push([Math.floor(b[0]-1),0,0,0],[Math.ceil(b[1]+1),0,0,0]);return a},_combineRenderingRule:function(a,b){if(!a||!b)return a||b;var c=function(a){var b=a.Raster;return b=b&&"esri.layers.RasterFunction"===b.declaredClass?c(b.functionArguments):a};a=f.clone(a);"none"!==b.functionName.toLocaleLowerCase()&&
(c(a.functionArguments).Raster=b);return a},_isItemLevelRasterFunction:function(a){var b=a&&a.functionName;if(!b||!this._hasItemLevelRFT)return!1;var c=!1;m.some(this.rasterFunctionInfos,function(a){if(a&&a.name===b){if(1===a.functionType||2===a.functionType)c=!0;return!0}});return c},_getServiceLevelRenderingRule:function(a){if(!this._hasItemLevelRFT||!a)return a;a=new z(a.toJson());var b;b=a.functionArguments;for(var c;;)if((c=b&&b.Raster)&&c.functionArguments&&c.functionArguments.Raster)b=c,b=
b.functionArguments;else{this._isItemLevelRasterFunction(c)&&delete b.Raster;break}return a},_getItemLevelRenderingRule:function(a){if(!this._hasItemLevelRFT||!a)return null;a=new z(a.toJson());for(a=a.functionArguments;;)if((a=a&&a.Raster)&&a.functionArguments&&a.functionArguments.Raster)a=a.functionArguments;else{if(this._isItemLevelRasterFunction(a))return a;break}},_resolve:function(a,b,c,d,e){b&&this[b].apply(this,a);c&&c.apply(null,a);d&&r._resDfd(d,a,e)},_toggleTime:function(){var a=this._map;
this.timeInfo&&this.useMapTime&&a&&!this.suspended?(this._timeConnect||(this._timeConnect=N.connect(a,"onTimeExtentChange",this,this._onTimeExtentChangeHandler)),this._setTime(a.timeExtent)):(N.disconnect(this._timeConnect),this._timeConnect=null,this._setTime(null))},setUseMapTime:function(a,b){this.useMapTime=a;this._toggleTime();!b&&this._map&&this.refresh(!0)},_setTime:function(a){this._params&&(this._params.time=a?a.toJson().join(","):null)},_onTimeExtentChangeHandler:function(a){this.suspended||
(this._setTime(a),this.refresh(!0))},handleSpatialReferenceChange:function(){this.onSpatialReferenceChange()}});O("extend-esri")&&f.setObject("layers.ImageServiceLayerMixin",J,Q);return J});