// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/SymbolStyler/colorRampUtil",["../../symbols/utils","dojo/_base/array","dojox/gfx"],function(l,m,k){var f={create:function(a){var b=a.colors,d=a.node,c=a.numClasses,g=a.height||70,e=a.width||20,h=a.size||40;return"grid"===(a.style||"ramp")?f._create2DColorRamp({node:d,size:h,colors:b,numClasses:c}):f._createColorRamp({node:d,height:g,width:e,colors:b,numClasses:c})},_createColorRamp:function(a){var b=a.node,d=a.width,c=a.height;a=f._stopsFromColors(a);b=k.createSurface(b,d,c);return b=
b.createRect(b.getDimensions()).setFill({type:"linear",x1:0,y1:0,x2:0,y2:c,colors:a})},_create2DColorRamp:function(a){var b=a.size,d=a.colors,c=a.numClasses;a=k.createSurface(a.node,b,b);return a=l.create2DColorRamp({surface:a,colors:f._to2DArray(d,c),numClasses:c,size:b})},_to2DArray:function(a,b){for(var d=[],c=0;c<b;c++){for(var g=[],e=0;e<b;e++)g.push(a[c*b+e]);d.push(g.reverse())}return d},_stopsFromColors:function(a){var b=a.colors;a=0<a.numClasses;var d=b.length,c=a?1/d:1/(d-1),g=[],e=b[0],
h;if("object"===typeof e&&e.hasOwnProperty("offset")&&e.hasOwnProperty("color"))return b;for(var f=0;f<d;f++)h=f*c,e=b[d-1-f],g.push({offset:h,color:e}),a&&(h=(f+1)*c,g.push({offset:h,color:e}));return g}};return f});