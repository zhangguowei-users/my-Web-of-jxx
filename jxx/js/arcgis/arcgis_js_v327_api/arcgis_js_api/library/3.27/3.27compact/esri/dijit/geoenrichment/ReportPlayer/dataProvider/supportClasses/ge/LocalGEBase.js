// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/supportClasses/ge/LocalGEBase","dojo/_base/declare dojo/_base/lang dojo/Evented dojo/on esri/graphic esri/tasks/FeatureSet ./_GEFilterSupport ../AreaDataUtil ../stdGeographies/StdGeographiesUtil esri/dijit/geoenrichment/ReportPlayer/countryConfig dojo/i18n!esri/nls/jsapi".split(" "),function(e,f,g,h,k,l,m,n,p,q,d){d=d.geoenrichment.dijit.ReportPlayer.ReportPlayer;return e([g,m],{metadata:{name:"StdGeographyName",address:"address"},variables:null,
data:null,_variableShortToFullNameCache:null,_areaData:null,_skipThisArea:!1,_initGE:function(a,b,c){this.variables=a||[];this._variableShortToFullNameCache={};this.variables.forEach(function(a){this._variableShortToFullNameCache[-1===a.indexOf(".")?a:a.substr(a.indexOf(".")+1)]=a},this);(a=b&&n.getAreaDataObjectCalculator(b,c))?this._areaData=[a.data].concat(a.comparisonLevels||[]):this._handleError(Error("Can't get calculator"))},setVariables:function(a){this.variables=a},_createFeatureSet:function(){var a=
new l,b=this._prepareFeatures();a.features=b;a.fields=this._prepareFields(b);this._prepareFieldAliases(a);return a},_prepareFeatures:function(){var a=[];if(!this._areaData)return a;for(var b=0;b<this._areaData.length;b++){var c={};this._propulateAttributesFromAreaData(c,this._areaData[b]);c.StdGeographyName=String(c.StdGeographyName||"");c.StdGeographyID=String(c.StdGeographyID||"");c.StdGeographyLevel=String(c.StdGeographyLevel||"");if(0!==b||this._skipThisArea){if(!c.StdGeographyName&&!c.StdGeographyID&&
!c.StdGeographyLevel){console.log("LocalGEBase.js can't add an unidentifiable geography.");continue}c.StdGeographyName=p.getAreaName(c)}else c.StdGeographyName=d.thisArea,c.isThisArea=!0;a.push(new k(null,null,c))}return a},_propulateAttributesFromAreaData:function(a,b){f.mixin(a,b)},_prepareFields:function(a){var b=[];if(!a.length)return b;a=a[0].attributes;for(var c in a)b.push(this._createField(c,a));return b},_stringAttrs:{StdGeographyName:1,StdGeographyID:1,StdGeographyLevel:1},_createField:function(a,
b){b=this._stringAttrs[a]||"string"===typeof b[a];return{name:a,alias:a,type:b?"esriFieldTypeString":"esriFieldTypeDouble",length:b?256:void 0,fullName:this._variableShortToFullNameCache[a],decimals:b?void 0:0,units:b?"other":"double",symbol:q.getCurrencySymbol()}},_prepareFieldAliases:function(a){a.fieldAliases={};a.fields.forEach(function(b){a.fieldAliases[b.name]=b.alias})},_handleError:function(a){setTimeout(function(){a&&h.emit(this,"error",a)}.bind(this))},isBusy:function(){return!1},setOutSR:function(){},
setGeoLevels:function(){},setStudyArea:function(){},stop:function(){}})});