// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/gridLayoutCalcUtils/GridLayoutSnapper",["dojo/_base/lang","./rows/RowDataUtil","./columns/ColumnDataUtil","./GridElementBoxCalculator"],function(h,k,l,m){return{autoSnapLayout:function(c){function n(){var b=[];c.store.data.forEach(function(d){c.columns.forEach(function(a){b.push(h.mixin({id:d.index+"_"+a.field,data:d,dataIndex:d.index,column:a,field:a.field},m.calcDataBox(c,d,a.field)))})});return b}if(c.looseResize)for(var p=c.store.data.length*
c.columns.length,f={},e=0;e<p;e++){var g=n(),a=g[e],q=a.x+a.w,r=a.y+a.h;f[a.id]=!0;g.forEach(function(b){if(!f[b.id]){var a=q-(b.x+b.w);.5>=Math.abs(a)&&l.setFieldWidth(c,b.data,b.field,b.w+a);a=r-(b.y+b.h);.5>=Math.abs(a)&&k.setDataHeight(c,b.data,b.field,b.h+a)}})}}}});