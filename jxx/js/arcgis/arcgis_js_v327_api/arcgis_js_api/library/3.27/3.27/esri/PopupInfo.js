// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/PopupInfo","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/i18n dojo/has dojo/Deferred dojo/sniff dojo/promise/all dojox/html/entities ./lang ./kernel ./request ./promiseList ./ArcadeExpression ./tasks/query ./tasks/QueryTask ./tasks/RelationshipQuery ./tasks/StatisticDefinition ./arcadeProfiles/popupProfile ./layers/support/attributeUtils dojo/i18n!dojo/cldr/nls/number".split(" "),function(u,r,l,E,Q,I,J,K,A,L,n,F,M,B,N,z,G,O,P,C,R,H){u=u(null,{declaredClass:"esri.PopupInfo",
_reNewline:/(\n)/ig,_reExprField:/^\s*expression\//i,_reExprFieldPattern:/\{expression\/([^\}]+)\}/ig,_exprPrefix:"expression/",_relatedFieldPrefix:"relationships/",initialize:function(a,b){if(a){r.mixin(this,b);this.info=a;this.title=this.getTitle;this.content=this.getContent;this._exprCache=this._compileExpressions(this.info.expressionInfos);var c=this._fieldLabels={},d=this._fieldsMap={};this.info.fieldInfos&&l.forEach(this.info.fieldInfos,function(a){var b=a.fieldName.toLowerCase(),e=this._isExpressionField(b)?
this.getExpressionInfo(b):null;c[b]=e?e.title:a.label;d[b]=a},this);this.titleHasRelatedFields=!(!this.info.title||-1===this.info.title.indexOf("{"+this._relatedFieldPrefix));this.titleHasAsyncExpressions=this._titleHasAsyncExpressions()}},toJson:function(){return E.fromJson(E.toJson(this.info))},getTitle:function(){},getContent:function(){},getFieldInfo:function(a){var b;l.some(this.info&&this.info.fieldInfos,function(c){c.fieldName===a&&(b=c);return!!b});return b},getExpressionInfo:function(a){if(this._isExpressionField(a)){a=
a.replace(this._reExprField,"");a=a.toLowerCase();var b;l.some(this.info.expressionInfos,function(c){c.name.toLowerCase()===a&&(b=c);return!!b});return b}},getExpressionFieldsInTitle:function(){var a=this.info.title?this.info.title.match(this._reExprFieldPattern):null;return l.map(a,function(a){return a.replace(this._reExprFieldPattern,"$1")},this)},hasGeometryOperations:function(){return l.some(this._getArcadeExpressions(),function(a){return a.hasGeometryOperations()})},hasAsyncExpressions:function(){return l.some(this._getArcadeExpressions(),
function(a){return a.async})},initializeArcadeEngine:function(){return C.initialize(this._getArcadeExpressions())},getComponents:function(a){var b=this.info,c={};b.fieldInfos&&(b=l.filter(b.fieldInfos,function(a){return-1!==a.fieldName.indexOf(this._relatedFieldPrefix)},this))&&0<b.length&&(c.relatedInfo=this._getRelatedRecords({graphic:a,fieldsInfo:b}));this._needFullResolutionFeature(a)&&(c.fullResolutionFeature=this._getFullResolutionFeature(a));return B(c).then(r.hitch(this,function(b){b=b.fullResolutionFeature;
b=this.hasAsyncExpressions()?this._fetchAttributesAsync(a,b):this._fetchAttributes(a,b);return B([b]).then(r.hitch(this,function(b){return this._getPopupValues(a,b[0])}))}))},getAttachments:function(a){var b=a.getSourceLayer();a=a.attributes;if(this.info.showAttachments&&b&&b.hasAttachments&&b.objectIdField&&(a=a&&a[b.objectIdField]))return b.queryAttachmentInfos(a)},_needFullResolutionFeature:function(a){return(a=a.getSourceLayer())?"function"===typeof a.getMaxAllowableOffset&&0<a.getMaxAllowableOffset()&&
this.hasGeometryOperations():!1},_getFullResolutionFeature:function(a){var b=a.getSourceLayer(),c=b.objectIdField;a=(a=a.attributes)&&c&&a[c];if(null==a)return null;var d=new z;d.objectIds=[a];d.maxAllowableOffset=0;d.outFields=[c];return b.queryFeatures(d).then(function(a){return a.features&&a.features[0]})},_isExpressionField:function(a){return this._reExprField.test(a)},_titleHasAsyncExpressions:function(){return l.some(this.getExpressionFieldsInTitle(),function(a){a=this._exprCache[a];return!(!a||
!a.async)},this)},_compileExpressions:function(a){var b={};l.forEach(a,function(a){var c=a.returnType&&a.returnType.toLowerCase();b[a.name]=new N({expression:a.expression,returnType:"number"===c?"number":"string",profile:C})});return b},_getArcadeExpressions:function(){var a=[],b;for(b in this._exprCache)a.push(this._exprCache[b]);return a},_fetchAttributesAsync:function(a,b){var c=this._fetchAttributes(a,b);a={};for(var d in c)(b=c[d])&&b.then&&(a[d]=b);return B(a).then(function(a){for(var b in a){var d=
a[b];c[b]=d instanceof Error?null:d}return c})},_fetchAttributes:function(a,b,c){var d=r.clone(a.attributes)||{},e=b&&b.geometry,f=this._exprPrefix,p=this._exprCache;c=c||l.map(this.info.expressionInfos,function(a){return a.name});l.forEach(c,function(b){var c=f+b;b=(b=p[b])?a.evaluateExpression(b,this._getEvalOptions(b,a,e)):null;"string"===typeof b&&(b=L.encode(b));d[c]=b},this);return d},_getEvalOptions:function(a,b,c){var d=a.hasGeometryOperations(),e=b.getSourceLayer(),f=e&&(e.getMap()||e.parentLayer&&
e.parentLayer.getMap());a=C.getEvalOptions({expression:a,feature:b,layer:e,map:f,spatialReference:f&&f.spatialReference});b=a.context.vars.$feature;d=!(!d||!c);b&&d&&(b._geometry=c);a.skipCache=d;return a},_getPopupValues:function(a,b,c){b=b||this._fetchAttributes(a);var d=this.info,e=a.getSourceLayer(),f=r.clone(b),p="",m="",q,h,g,k,v,t=e&&e._getDateOpts&&e._getDateOpts().properties,t=t&&t.slice(0),w={dateFormat:{properties:t,formatter:"DateFormat"+this._insertOffset(this._dateFormats.shortDateShortTime)}};
if(this._relatedInfo)for(k in this._relatedInfo)if(this._relatedInfo.hasOwnProperty(k)){var x=this._relatedInfo[k],D=this._relatedLayersInfo[k];x&&(l.forEach(x.relatedFeatures,function(a){for(v in a.attributes)if(a.attributes.hasOwnProperty(v)&&"esriRelCardinalityOneToOne"===D.relation.cardinality){var c=this._toRelatedFieldName([D.relation.id,v]);b[c]=f[c]=a.attributes[v]}},this),l.forEach(x.relatedStatsFeatures,function(a){for(v in a.attributes)if(a.attributes.hasOwnProperty(v)){var c=this._toRelatedFieldName([D.relation.id,
v]);b[c]=f[c]=a.attributes[v]}},this))}for(h in f)k=this._fieldsMap[h.toLowerCase()],x=this._getLayerFieldInfo(e,h),k&&x&&(k.fieldName=x.name),f[h]=this._formatValue(f[h],h,w),t&&k&&k.format&&k.format.dateFormat&&(k=l.indexOf(t,h),-1<k&&t.splice(k,1));if(e)for(h in t=e.typeIdField,b)b.hasOwnProperty(h)&&-1===h.indexOf(this._relatedFieldPrefix)&&(g=b[h],n.isDefined(g)&&(k=this._getDomainName(e,a,h,g),n.isDefined(k)?f[h]=k:h===t&&(k=this._getTypeName(e,a,g),n.isDefined(k)&&(f[h]=k))));d.title&&(p=this._processFieldsInLinks(this._fixTokens(d.title,
e),b),p=r.trim(this._removeEmptyHref(n.substitute(f,p,w)||"")));if(c)return{title:p};d.description&&(m=this._processFieldsInLinks(this._fixTokens(d.description,e),b),m=r.trim(this._removeEmptyHref(n.substitute(f,m,w)||"")));d.fieldInfos&&(q=[],l.forEach(d.fieldInfos,function(a){(h=a.fieldName)&&a.visible&&q.push([this._fieldLabels[h.toLowerCase()]||h,n.substitute(f,"${"+h+"}",w)||""])},this));var y,u;d.mediaInfos&&(y=[],l.forEach(d.mediaInfos,function(a){u=0;g=a.value;switch(a.type){case "image":var c=
g.sourceURL,c=c&&r.trim(this._removeEmptyHref(n.substitute(b,this._fixTokens(c,e))));u=!!c;break;case "piechart":case "linechart":case "columnchart":case "barchart":var d,c=g.normalizeField;g.fields=l.map(g.fields,function(a){return(d=this._getLayerFieldInfo(e,a))?d.name:a},this);c&&(d=this._getLayerFieldInfo(e,c),g.normalizeField=d?d.name:c);u=l.some(g.fields,function(a){return n.isDefined(b[a])||-1!==a.indexOf(this._relatedFieldPrefix)&&this._relatedInfo},this);break;default:return}if(u){a=r.clone(a);
g=a.value;var c=a.title?this._processFieldsInLinks(this._fixTokens(a.title,e),b):"",h=a.caption?this._processFieldsInLinks(this._fixTokens(a.caption,e),b):"";a.title=c?r.trim(this._removeEmptyHref(n.substitute(f,c,w)||"")):"";a.caption=h?r.trim(this._removeEmptyHref(n.substitute(f,h,w)||"")):"";if("image"===a.type)g.sourceURL=n.substitute(b,this._fixTokens(g.sourceURL,e)),g.linkURL&&(g.linkURL=r.trim(n.substitute(b,this._fixTokens(g.linkURL,e))||""));else{var k,m;l.forEach(g.fields,function(a,c){if(-1!==
a.indexOf(this._relatedFieldPrefix))m=this._getRelatedChartInfos(a,g,b,w),m instanceof Array?g.fields=m:g.fields[c]=m;else{var d=b[a],d=void 0===d?null:d;k=b[g.normalizeField]||0;d&&k&&(d/=k);g.fields[c]={y:d,tooltip:(this._fieldLabels[a.toLowerCase()]||a)+":\x3cbr/\x3e"+this._formatValue(d,a,w,!!k)}}},this)}y.push(a)}},this));return{title:p,description:m,hasDescription:!!d.description,fields:q&&q.length?q:null,mediaInfos:y&&y.length?y:null,formatted:f,editSummary:!1!==d.showLastEditInfo&&e&&e.getEditSummary?
e.getEditSummary(a):""}},_getRelatedChartInfos:function(a,b,c,d){var e,f,p,m,q,h;e=[];h=this._fromRelatedFieldName(a);q=h[0];f=this._relatedInfo[q];q=this._relatedLayersInfo[q];f&&l.forEach(f.relatedFeatures,function(g){g=g.attributes;var f,l;for(l in g)if(g.hasOwnProperty(l)&&l===h[1]){f={};m=g[l];b.normalizeField&&(p=-1!==b.normalizeField.indexOf(this._relatedFieldPrefix)?g[this._fromRelatedFieldName(b.normalizeField)[1]]:c[b.normalizeField]);m&&p&&(m/=p);if(b.tooltipField)if(-1!==b.tooltipField.indexOf(this._relatedFieldPrefix)){var q=
this._fromRelatedFieldName(b.tooltipField)[1],r=n.isDefined(g[q])?this._formatValue(g[q],b.tooltipField,d,!!p):q;f.tooltip=r+":\x3cbr/\x3e"+this._formatValue(m,q,d,!!p)}else f.tooltip=(this._fieldLabels[a.toLowerCase()]||a)+":\x3cbr/\x3e"+this._formatValue(m,b.tooltipField,d,!!p);else f.tooltip=m;f.y=m;e.push(f)}},this);return"esriRelCardinalityOneToMany"===q.relation.cardinality||"esriRelCardinalityManyToMany"===q.relation.cardinality?e:e[0]},_dateFormats:{shortDate:"(datePattern: 'M/d/y', selector: 'date')",
shortDateLE:"(datePattern: 'd/M/y', selector: 'date')",longMonthDayYear:"(datePattern: 'MMMM d, y', selector: 'date')",dayShortMonthYear:"(datePattern: 'd MMM y', selector: 'date')",longDate:"(datePattern: 'EEEE, MMMM d, y', selector: 'date')",shortDateShortTime:"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateLEShortTime:"(datePattern: 'd/M/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateShortTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')",
shortDateLEShortTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLongTime:"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLELongTime:"(datePattern: 'd/M/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLongTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')",shortDateLELongTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm:ss', selector: 'date and time')",longMonthYear:"(datePattern: 'MMMM y', selector: 'date')",
shortMonthYear:"(datePattern: 'MMM y', selector: 'date')",year:"(datePattern: 'y', selector: 'date')"},_reHref:/href\s*=\s*\"([^\"]+)\"/ig,_reHrefApos:/href\s*=\s*\'([^\']+)\'/ig,_fixTokens:function(a,b){var c=this;return a.replace(/(\{([^\{\r\n]+)\})/g,function(a,e,f){a=c._getLayerFieldInfo(b,f);return"$"+(a?"{"+a.name+"}":e)})},_encodeAttributes:function(a){a=r.clone(a)||{};var b,c;for(b in a)(c=a[b])&&"string"===typeof c&&(c=encodeURIComponent(c).replace(/\'/g,"\x26apos;"),a[b]=c);return a},_processFieldsInLinks:function(a,
b){var c=this._encodeAttributes(b);b=r.hitch(this,this._addValuesToHref,b,c);a&&(a=a.replace(this._reHref,b).replace(this._reHrefApos,b));return a},_addValuesToHref:function(a,b,c,d){d=d&&r.trim(d);return c=n.substitute(d&&0===d.indexOf("${")?a:b,c)},_getLayerFieldInfo:function(a,b){return a&&a.getField?a.getField(b):null},_formatValue:function(a,b,c,d){var e=this._fieldsMap[b.toLowerCase()],f=e&&e.format;b=-1!==l.indexOf(c.dateFormat.properties,b);var p="number"===typeof a&&!b&&(!f||!f.dateFormat);
if(!n.isDefined(a)||!e||!n.isDefined(f))return this._applyFormatting(a,p);var m="",e=[],q=f.hasOwnProperty("places")||f.hasOwnProperty("digitSeparator"),h=f.hasOwnProperty("digitSeparator")?f.digitSeparator:!0;if(q&&!b)m="NumberFormat",e.push("places: "+(n.isDefined(f.places)&&(!d||0<f.places)?Number(f.places):"Infinity")),e.length&&(m+="("+e.join(",")+")");else if(f.dateFormat)m="DateFormat"+this._insertOffset(this._dateFormats[f.dateFormat]||this._dateFormats.shortDateShortTime);else return this._applyFormatting(a,
p);var g=this._applyFormatFunctions(a,m,c);q&&-1<a.constructor.toString().indexOf("Array")&&(g="",l.forEach(a,r.hitch(this,function(a,b){b&&(g+=" ");g+=this._applyFormatFunctions(a,m,c)})));q&&!h&&H.group&&(g=g.replace(new RegExp("\\"+H.group,"g"),""));b&&(g='\x3cspan class\x3d"esriDateValue"\x3e'+g+"\x3c/span\x3e");return this._applyFormatting(g,p)},_applyFormatFunctions:function(a,b,c){return n.substitute({myKey:a},"${myKey:"+b+"}",c)||""},_applyFormatting:function(a,b){return b?this._forceLTR(a):
this._applyPreWrap(a)},_forceLTR:function(a){var b=K("ie");return b&&10>=b?a:"\x3cspan class\x3d'esriNumericValue'\x3e"+a+"\x3c/span\x3e"},_applyPreWrap:function(a){return"string"===typeof a?a.replace(this._reNewline,"\x3cspan class\x3d'charNewLine'\x3e$1\x3c/span\x3e"):a},_insertOffset:function(a){a&&(a=n.isDefined(this.utcOffset)?a.replace(/\)\s*$/,", utcOffset:"+this.utcOffset+")"):a);return a},_getDomainName:function(a,b,c,d){return(a=a.getDomain&&a.getDomain(c,{feature:b}))&&a.codedValues?a.getName(d):
null},_getTypeName:function(a,b,c){return(a=a.getType&&a.getType(b))&&a.name},_getRelatedRecords:function(a){var b=a.graphic,c;this._relatedLayersInfoPromise||(this._relatedLayersInfoPromise=this._getRelatedLayersInfo(a).then(r.hitch(this,function(a){for(c in a)a.hasOwnProperty(c)&&a[c]&&(this._relatedLayersInfo[c].relatedLayerInfo=a[c])})));return this._relatedLayersInfoPromise.then(r.hitch(this,function(){return this._queryRelatedLayers(b)})).then(r.hitch(this,function(a){this._setRelatedRecords(b,
a);return a}))},_getRelatedLayersInfo:function(a){var b=a.fieldsInfo,c,d,e={};c=a.graphic.getSourceLayer();this._relatedLayersInfo||(this._relatedLayersInfo={});l.forEach(b,function(a){var b,d,e,f;b=this._fromRelatedFieldName(a.fieldName);d=b[0];b=b[1];d&&(!this._relatedLayersInfo[d]&&c&&c.relationships&&(l.some(c.relationships,function(a){if(a.id==d)return f=a,!0}),f&&(this._relatedLayersInfo[d]={relation:f,relatedFields:[],outStatistics:[]})),this._relatedLayersInfo[d]&&(this._relatedLayersInfo[d].relatedFields.push(b),
a.statisticType&&(e=new P,e.statisticType=a.statisticType,e.onStatisticField=b,e.outStatisticFieldName=b,this._relatedLayersInfo[d].outStatistics.push(e))))},this);for(d in this._relatedLayersInfo)this._relatedLayersInfo.hasOwnProperty(d)&&this._relatedLayersInfo[d]&&(a=this._relatedLayersInfo[d].relation,a=c.url.replace(/[0-9]+$/,a.relatedTableId),this._relatedLayersInfo[d].relatedLayerUrl=a,e[d]=M({url:a,content:{f:"json"},callbackParamName:"callback"}));return A(e)},_queryRelatedLayers:function(a){var b=
{},c;for(c in this._relatedLayersInfo)this._relatedLayersInfo.hasOwnProperty(c)&&(b[c]=this._queryRelatedLayer({graphic:a,relatedInfo:this._relatedLayersInfo[c]}));return A(b)},_queryRelatedLayer:function(a){var b,c,d,e,f,p,m,q,h,g,k,n,t;b=a.graphic;c=b.getSourceLayer();d=c.url.match(/[0-9]+$/g)[0];k=a.relatedInfo;g=k.relatedLayerInfo;n=k.relatedLayerUrl;a=k.relation;l.some(g.relationships,function(a){if(a.relatedTableId===parseInt(d,10))return e=a,!0},this);e&&(f=new z,l.some(g.fields,function(a){if(a.name===
e.keyField)return q=-1!==l.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],a.type)?"number":"string",!0}),e.relationshipTableId&&e.keyFieldInRelationshipTable?(t=new J,this._queryRelatedRecords(b,e).then(r.hitch(this,function(a){var d;(d=a[b.attributes[c.objectIdField]])?(a=l.map(d.features,function(a){return a.attributes[g.objectIdField]},this),k.outStatistics&&0<k.outStatistics.length&&g.supportsStatistics&&(h=new z,h.objectIds=a,h.outFields=
f.outFields,h.outStatistics=k.outStatistics),h&&(p=new G(n),p.execute(h).then(r.hitch(this,function(a){var b=[];b.push(d);b.push(a);t.resolve(b)})))):t.resolve()}))):(m="string"===q?e.keyField+"\x3d'"+b.attributes[a.keyField]+"'":e.keyField+"\x3d"+b.attributes[a.keyField],f.where=m,f.outFields=k.relatedFields,k.outStatistics&&0<k.outStatistics.length&&g.supportsStatistics&&(h=new z,h.where=f.where,h.outFields=f.outFields,h.outStatistics=k.outStatistics),p=new G(n),m=[],m.push(p.execute(f)),h&&m.push(p.execute(h))));
return m?A(m):t?t.promise:void 0},_setRelatedRecords:function(a,b){this._relatedInfo=[];for(var c in b)b.hasOwnProperty(c)&&b[c]&&(a=b[c],this._relatedInfo[c]={},this._relatedInfo[c].relatedFeatures=a[0].features,n.isDefined(a[1])&&(this._relatedInfo[c].relatedStatsFeatures=a[1].features))},_handlerErrorResponse:function(a,b){a.reject(b)},_fromRelatedFieldName:function(a){var b=[];-1!==a.indexOf(this._relatedFieldPrefix)&&(a=a.split("/"),b=a.slice(1));return b},_toRelatedFieldName:function(a){var b=
"";a&&0<a.length&&(b=this._relatedFieldPrefix+a[0]+"/"+a[1]);return b},_queryRelatedRecords:function(a,b){var c=a.getSourceLayer(),d=new O;d.outFields=["*"];d.relationshipId=b.id;d.objectIds=[a.attributes[c.objectIdField]];return c.queryRelatedFeatures(d)},_removeEmptyHref:function(a){return a.replace(/href=(""|'')/gi,"")}});I("extend-esri")&&(F.PopupInfo=F.PopupInfoTemplate=u);return u});