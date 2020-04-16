// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/LayerDataSource","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../lang ./LayerSource ./TableDataSource ./QueryDataSource ./JoinDataSource ./RasterDataSource".split(" "),function(b,c,d,e,f,g,h,k,l,m){b=b(g,{declaredClass:"esri.layers.LayerDataSource",type:"dataLayer",constructor:function(a){if(a&&a.dataSource){switch(a.dataSource.type){case "table":a=new h(a.dataSource);break;case "queryTable":a=new k(a.dataSource);break;case "joinTable":a=new l(a.dataSource);break;case "raster":a=
new m(a.dataSource);break;default:a=a.dataSource}this.dataSource=a}},toJson:function(){var a={type:"dataLayer",dataSource:this.dataSource&&this.dataSource.toJson()};return f.fixJson(a)}});d("extend-esri")&&c.setObject("layers.LayerDataSource",b,e);return b});