// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/rasterFormats/ImageCanvasDecoder",["require","dojo/_base/declare","dojo/Deferred","dojo/sniff"],function(n,p,q,r){var k;return p(null,{constructor:function(a){this.ctx=a.ctx;this._loadRasterFormatModule()},decode:function(a,d){if(!d.width||!d.height)throw"Native decoding requires the image format, width and height";var g=new q,b,e=new Uint8Array(a);a=this._getFormat(a);if("error"===a)throw"invalid format";"jpeg"===a&&(b=this._getMask(e,d));var f="",c,l;for(c=0;c<e.length;c+=65535)l=
e.subarray(c,c+65535>e.length-1?e.length-1:c+65535),f+=String.fromCharCode.apply(null,l);var e="data:image/"+a+";base64,"+window.btoa(f),h=new Image,k;h.src=e;var m=this;h.onload=function(){m.ctx.clearRect(0,0,d.width,d.height);m.ctx.drawImage(h,0,0);var a=m.ctx.getImageData(0,0,h.width,h.height);k=a.data;if(b)for(c=0;c<b.length;c++)k[4*c+3]=b[c]?255:0;m.ctx.putImageData(a,0,0);g.resolve(null)};h.onerror=function(){g.reject("cannot load image")};return g},_getFormat:function(a){a=new Uint8Array(a,
0,10);var d="error";255===a[0]&&216===a[1]?d="jpeg":137===a[0]&&80===a[1]&&78===a[2]&&71===a[3]&&(d="png");return d},_getMask:function(a,d){var g;try{if(!k)throw"The zlib decoder module is not loaded.";var b=0,e=0,f=Math.round(a.length/2);1===f%2&&(f+=1);for(var c=a.length-2,b=f;b<c&&(255!==a[b]||217!==a[b+1]);b++);f=b+=2;if(f<a.length-1){var l=(new k(a.subarray(f))).getBytes();g=new Uint8Array(d.width*d.height);for(b=a=0;b<l.length;b++)for(e=7;0<=e;e--)g[a++]=l[b]>>e&1}}catch(h){}return g},_loadRasterFormatModule:function(){10>
r("ie")||n(["./Zlib"],function(a){k=a})}})});