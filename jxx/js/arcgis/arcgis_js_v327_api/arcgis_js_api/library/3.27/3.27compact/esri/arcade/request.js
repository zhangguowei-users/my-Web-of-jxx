// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/arcade/request",["require","exports","dojo/Deferred","../request"],function(q,e,g,f){Object.defineProperty(e,"__esModule",{value:!0});e.serviceRequest=function(a,b,e,l,c){void 0===c&&(c=null);if(null!==c){var d=new g;c.getToken().then(function(n){try{if(a=a+="?token\x3d"+n,"get"===l.toLowerCase())f({url:a,disableIdentityLookup:!0,handleAs:"json",callbackParamName:"callback",content:b}).then(function(a){d.resolve({data:a})},function(a){d.reject(a)});else{if(b)for(var c in b)a=-1<a.indexOf("?")?
a+"\x26":a+"?",a+=encodeURIComponent(c)+"\x3d"+encodeURIComponent(b[c]);f({url:a,disableIdentityLookup:!0,callbackParamName:"callback",content:e,handleAs:"json"},{usePost:!0}).then(function(a){d.resolve({data:a})},function(a){d.reject(a)})}}catch(p){d.reject(p)}},function(a){d.reject(a)});return d.promise}if("get"===l.toLowerCase()){var h=new g;f({url:a,disableIdentityLookup:!0,callbackParamName:"callback",handleAs:"json",content:b}).then(function(a){h.resolve({data:a})},function(a){h.reject(a)});
return h.promise}if(b)for(var m in b)a=-1<a.indexOf("?")?a+"\x26":a+"?",a+=encodeURIComponent(m)+"\x3d"+encodeURIComponent(b[m]);var k=new g;f({url:a,disableIdentityLookup:!0,callbackParamName:"callback",handleAs:"json",content:e},{usePost:!0}).then(function(a){k.resolve({data:a})},function(a){k.reject(a)});return k.promise}});