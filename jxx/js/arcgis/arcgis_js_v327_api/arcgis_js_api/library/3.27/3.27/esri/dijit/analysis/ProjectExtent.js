// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/ProjectExtent",["dojo/_base/array","esri/geometry/Extent","esri/geometry/webMercatorUtils","esri/geometry/Polygon","esri/tasks/GeometryService"],function(l,r,m,g,t){function n(a,c){if(a&&c.xmin>c.xmax){var e=a.valid[1]-c.xmin,f=c.xmax-a.valid[0];e>f?c.xmax=a.valid[1]+f:c.xmin=a.valid[0]-e}}return function(a,c,e,f,d,h){var p=[102113,102100,3857],k=a.spatialReference.wkid;if(k===c.wkid)return e([a],null);if(4326==k&&-1<l.indexOf(p,c.wkid))return a.ymin=Math.max(a.ymin,-89.99),
a.ymax=Math.min(a.ymax,89.99),a=m.geographicToWebMercator(a),d=a.spatialReference._getInfo(),n(d,a),a.spatialReference.wkid=c.wkid,e([a],null);if(-1<l.indexOf(p,k)&&4326==c.wkid)return a=m.webMercatorToGeographic(a),d=a.spatialReference._getInfo(),n(d,a),e([a],null);h||(h=new t(window.esriGeowConfig.self.helperServices.geometry.url));var q;d&&d.wrapAround180&&"extent"===a.type&&(q=a,a=g.fromExtent(a));h.project([a],c,function(b,a){if(!(b&&0<b.length&&b[0]&&"extent"==b[0].type)||isNaN(b[0].xmin)||
isNaN(b[0].ymin)||isNaN(b[0].xmax)||isNaN(b[0].ymax)){if(b&&0<b.length&&b[0]&&"point"==b[0].type&&!isNaN(b[0].x)&&!isNaN(b[0].y))return e(b,a);if(q&&"polygon"===b[0].type){if(1===b[0].rings.length)b[0]=new r(b[0].getExtent());else{var c=(new g(b[0].spatialReference.toJson())).addRing(b[0].rings[0]).getExtent(),d=(new g(b[0].spatialReference.toJson())).addRing(b[0].rings[1]).getExtent();b[0]=d;b[0].xmin=d.xmin-c.getWidth();b[0].ymin=Math.min(d.ymin,c.ymin);b[0].ymax=Math.max(d.ymax,c.ymax)}return e(b,
a)}if(f)return f()}else return e(b,a)},f)}});