// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/rasterLib/raster/BasicRaster","require dojo/_base/declare dojo/_base/lang dojo/_base/Deferred dojo/_base/array dojo/_base/config dojo/_base/json dojo/sniff dojo/DeferredList dojo/when ../../../kernel ../../../Evented ../../../request ../../../geometry/Extent ../../../geometry/Point ../../../SpatialReference ../../../deferredUtils ../../../urlUtils ../../MosaicRule ../../ImageServiceParameters ../../PixelBlock ../../rasterFormats/rasterCodec ../tile/RasterHandler ./rasterProjectionHelper ./RasterInfo".split(" "),
function(z,q,m,n,A,B,C,D,E,F,p,r,t,u,G,H,k,v,I,J,w,x,y,l,K){return q([r],{url:null,dataType:null,rasterInfo:null,tileInfo:null,serviceInfo:null,loaded:null,constructor:function(a){if(a){var b=a.url;b&&(b=v.urlToObject(b),this.url=b.path,this._query=b.query);this.dataType=a.dataType;this.serviceInfo=a.serviceInfo;this.rasterInfo=a.rasterInfo;this.tileInfo=a.tileInfo;this.serviceInfo=a.serviceInfo}},open:function(){},read:function(a){},getProjectedFullExtent:function(a,b){var c=new n;if(this.projectedFullExtent&&
!b)return c.resolve(this.projectedFullExtent),c.promise;var f=this.rasterInfo.extent,d;l.requirePE(this.rasterInfo.extent.spatialReference,a)?l.load().then(m.hitch(this,function(){d=l.project(f,a);this.projectedFullExtent=d=new u(d.toJson());c.resolve(d)}),function(){c.reject(Error("cannot project into this spatial reference"))}):(d=l.project(f,a),c.resolve(d));return c.promise},setFetchParameters:function(a,b){},_setRasterHandler:function(a){this._rasterHandler=a;this.getMemberRasters&&this.getMemberRasters().forEach(m.hitch(this,
function(b){b._rasterHandler=a}))},_findCredential:function(){this.url&&((this._credential=p.id&&p.id.findCredential(this.url))&&this._credential.ssl||this.serviceInfo&&this.serviceInfo._ssl)&&(this.url=this.url.replace(/^http:/i,"https:"))},_initWorker:function(){this._rasterHandler=new y;this._rasterHandler.start().then(function(){this._rasterHandlerInitialized=!0}.bind(this))},_requestPixels:function(a){var b=a.url,c=a.payload,f=a.decodeParams,d=a.tileOptions,e=new n(k._dfdCanceller);this._rasterHandler||
this._initWorker();var h=this._rasterHandler,g={},b={url:b,handleAs:"arraybuffer",content:c};a.headers&&(b.headers=a.headers);e._pendingDfd=t(b).then(m.hitch(this,function(a){(h&&this._rasterHandlerInitialized?h.decode({encodedData:a,decodeParams:f}):x.decode(a,f)).then(function(a){g.pixelBlock=new w(a);g.extent=d.extent;g.level=d.level;g.row=d.row;g.col=d.col;g.width=d.width;g.height=d.height;k._resDfd(e,[g])},function(a){k._resDfd(e,[a],!0)})}),function(a){k._resDfd(e,[a],!0)});return e},_computeSignature:function(a){if("string"===
typeof a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);a=b}for(var c=b=65535,f=a.length,d=Math.floor(f/2),e=0;d;){var h=359<=d?359:d,d=d-h;do b+=a[e++]<<8,c+=b+=a[e++];while(--h);b=(b&65535)+(b>>>16);c=(c&65535)+(c>>>16)}f&1&&(c+=b+=a[e]<<8);return((c&65535)+(c>>>16)<<16|(b&65535)+(b>>>16))>>>0}})});