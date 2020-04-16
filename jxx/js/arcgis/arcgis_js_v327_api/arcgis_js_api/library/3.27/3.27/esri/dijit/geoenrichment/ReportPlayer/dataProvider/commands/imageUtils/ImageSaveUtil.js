// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/commands/imageUtils/ImageSaveUtil","dojo/when dojo/Deferred esri/dijit/geoenrichment/utils/FileUtil esri/dijit/geoenrichment/utils/DataUtil esri/dijit/geoenrichment/utils/ImageUtil esri/dijit/geoenrichment/utils/async/AsyncQueue".split(" "),function(d,m,n,h,p,k){return{saveImages:function(e,b){if(e&&e.length){var q=1<e.length,f=0,c=[],a=new m,g={};d(k.executeFunctions(e.map(function(a){return function(){var l=p.base64DataFromDataURL(a.dataURL||
a),d=h.binaryStringToByteArray(atob(l)).buffer;c.push({name:function(){var a=b.reportTitle;q&&(a+="_"+b.analysisAreas[Math.floor(f/b.numPages)].name+"_Page "+(f%b.numPages+1),g[a]?a+=" ("+ ++g[a]+")":g[a]=1);return a+".png"}(),data:h.arrayBuffersToBlob([d],"image/png"),base64Data:l});f++}}),0),function(){1===c.length&&b.saveImageFunc?d(b.saveImageFunc(c[0]),a.resolve,a.reject):1<c.length&&b.saveMultipleImagesFunc?d(b.saveMultipleImagesFunc(c),a.resolve,a.reject):d(k.executeFunctions(c.map(function(a){return function(){if(!b.skipSavingFile){var c=
a.name;return b.confirmSaveFile(c,function(){n.saveAs(a.data,c)})}}}),100),function(){a.resolve(c)},a.reject)});return a.promise}}}});