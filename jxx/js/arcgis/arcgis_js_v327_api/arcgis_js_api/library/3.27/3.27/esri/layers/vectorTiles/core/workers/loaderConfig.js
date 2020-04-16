// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/workers/loaderConfig",["require","exports","../tsSupport/assignHelper","dojo/has","../urlUtils"],function(g,b,f,m,e){Object.defineProperty(b,"__esModule",{value:!0});b.DEFAULT_LOADER_URL=e.makeAbsolute(e.removeQueryParameters(g.toUrl("./worker-init.js")));b.DEFAULT_CONFIG={baseUrl:function(){var a=e.removeQueryParameters(g.toUrl("dojo/x.js"));return e.makeAbsolute(a.slice(0,a.length-5))}(),packages:[{name:"esri"},{name:"dojo"},{name:"dojox"},{name:"dstore"},{name:"moment",
main:"moment"},{name:"@dojo"},{name:"cldrjs",main:"dist/cldr"},{name:"globalize",main:"dist/globalize"},{name:"maquette",main:"dist/maquette.umd"},{name:"maquette-css-transitions",main:"dist/maquette-css-transitions.umd"},{name:"maquette-jsx",main:"dist/maquette-jsx.umd"},{name:"tslib",main:"tslib"}],map:{globalize:{cldr:"cldrjs/dist/cldr","cldr/event":"cldrjs/dist/cldr/event","cldr/supplemental":"cldrjs/dist/cldr/supplemental","cldr/unresolved":"cldrjs/dist/cldr/unresolved"}}};b.default=function(a){var d=
{async:a.async,isDebug:a.isDebug,locale:a.locale,baseUrl:a.baseUrl,has:f({},a.has),map:f({},a.map),packages:a.packages&&a.packages.concat()||[],paths:f({},a.paths)};a.hasOwnProperty("async")||(d.async=!0);a.hasOwnProperty("isDebug")||(d.isDebug=!1);a.baseUrl||(d.baseUrl=b.DEFAULT_CONFIG.baseUrl);b.DEFAULT_CONFIG.packages.forEach(function(a){a:{for(var b=d.packages,c=0;c<b.length;c++)if(b[c].name===a.name)break a;a=f({},a);c=e.removeQueryParameters(g.toUrl(a.name+"/x.js"));c=c.slice(0,c.length-5);
a.location=e.makeAbsolute(c);b.push(a)}});a=d.map=d.map||{};for(var h=0,l=Object.keys(b.DEFAULT_CONFIG.map);h<l.length;h++){var k=l[h];a[k]||(a[k]=b.DEFAULT_CONFIG.map[k])}return d}});