// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/DataBrowser/VariableStore","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/Deferred dojo/store/util/SimpleQueryEngine dojo/store/util/QueryResults ./DeferredStore ./KeywordFilter".split(" "),function(q,k,g,r,t,u,l,v){return q(null,{categories:null,dataCollections:null,favorites:null,idProperty:"fullName",_data:null,_variables:null,queryEngine:t,constructor:function(){this.categories=new l({syncQuery:k.hitch(this,this._queryCategories)});this.dataCollections=
new l({syncQuery:k.hitch(this,this._queryDataCollections)})},_queryCategories:function(a,b){a=this._cleanUpCountryID(a);var c;"object"==typeof a&&a.dataCollectionID?(c=this.dataCollections.get(a.dataCollectionID),delete a.dataCollectionID,c=c?c.categories:[]):c=this.categories.data;return this.categories.queryEngine(a,b)(c)},_queryDataCollections:function(a,b){a=this._cleanUpCountryID(a);var c;"object"==typeof a&&a.categoryID?(c=this.categories.get(a.categoryID),delete a.categoryID,c=c?c.dataCollections:
[]):c=this.dataCollections.data;return this.dataCollections.queryEngine(a,b)(c)},_cleanUpCountryID:function(a){"object"==typeof a&&(a=k.mixin({},a),"countryID"in a&&delete a.countryID);return a},_clearAllStores:function(){this._data=[];this._variables={};this.categories.setData();this.dataCollections.setData()},synchronize:function(a){return(new r).resolve()},get:function(a){return this._variables[a]||null},getIdentity:function(a){return a&&a[this.idProperty]||null},query:function(a,b){return this._asyncQuery(a,
b)},_asyncQuery:function(a,b,c){return u(l.resolveCallback(c&&c._resolver||this.categories.resolver,a,k.hitch(this,this._syncQuery,a,b,c)))},_syncQuery:function(a,b,c){var e={},d=[c&&c.queryFilter||k.hitch(this,this.queryFilter)];if("function"==typeof a)d.push(a);else{a=a||{};var h,g,f;for(f in a)switch(f){case "countryID":break;case "categoryID":case "dataCollectionID":e[f]=a[f];break;case "searchString":var m=new v(a[f]);d.push(function(a){return m.match(a)});break;case "favorites":var n=a[f];n&&
(n=c&&"undefined"!==typeof c.favorites?c.favorites:this.favorites,d.push(k.hitch(this,function(a){return n&&n.contains&&n.contains(this.getIdentity(a))})));break;case "filters":var p=this._prepareFilterHash(a[f]);p&&d.push(function(a){for(var c in a.filteringTags)if(p[c]||p["*"])return!0;return!1});break;case "additionalData":g=a[f];break;default:h=h||{},h[f]=a[f]}h&&d.push(function(a){for(var c in h){var b=h[c];if(b&&b.test){if(!b.test(a[c],a))return!1}else if(b!=a[c])return!1}return!0})}a=this._composeQuery(d);
return e.dataCollectionID?this._queryDCVariables(e.dataCollectionID,a,b,g):e.categoryID?this._queryCategoryVariables(e.categoryID,a,b,g):this._queryAllVariables(a,b,g)},_queryDCVariables:function(a,b,c,e){var d=this.dataCollections.get(a);!d&&e&&(d=e.getDataCollection(a));return d&&this._query(d.getVisibleVariables(),b,c)||[]},_queryCategoryVariables:function(a,b,c,e){var d=this.categories.get(a);!d&&e&&(d=e.getCategory(a));return d&&this._query(d.data,b,c)||[]},_queryAllVariables:function(a,b,c){return this._query(this._data,
a,b,c&&c.getVariables())},_composeQuery:function(a){return 1==a.length?a[0]:function(b){return g.every(a,function(a){return a(b)})}},queryFilter:function(a){return!a.missedInCategories},_query:function(a,b,c,e){var d=a.length;this._addAdditionalData(a,e);b=this.queryEngine(b,c)(a);a.length=d;return b},_addAdditionalData:function(a,b){g.forEach(b,function(c){c instanceof Array?this._addAdditionalData(a,c):c&&a.push(c)},this)},getPopularVariables:function(a,b,c){return a&&a.getPopularVariables?a.getPopularVariables(b,
c):[]},getRefineFilters:function(a){var b={};if(a.dataCollectionID){var c=this.dataCollections.get(a.dataCollectionID);!c&&a.additionalData&&(c=a.additionalData.getDataCollection(a.dataCollectionID));c&&c.filters&&this._combineFilters(c.filters,b)}else a.categoryID?(c=this.categories.get(a.categoryID),!c&&a.additionalData&&(c=a.additionalData.getCategory(a.categoryID)),c&&this._collectCategoryFilters(c,b)):this._collectAllFilters(b,a.additionalData);if((a=this._prepareFilterHash(a.filters))&&!a["*"]){var c=
b,b={},e;for(e in c)a[e]&&(b[e]=c[e])}return b},_prepareFilterHash:function(a){"string"==typeof a&&(a=a.split(","));if(!a||!a.length)return null;var b={};g.forEach(a,function(a){b[k.trim(a)]=!0});return b},_collectAllFilters:function(a,b){g.forEach(this.categories.data,function(c){this._collectCategoryFilters(c,a)},this);g.forEach(b&&b.getCategories(),function(c){this._collectCategoryFilters(c,a)},this)},_collectCategoryFilters:function(a,b){g.forEach(a.dataCollections,function(a){this._combineFilters(a.filters,
b)},this)},_combineFilters:function(a,b){for(var c in a){var e=a[c],d=b[e.id];d?this._mergeFilter(d,e):(d=k.mixin({},e),b[e.id]=d)}},_mergeFilter:function(a,b){if(a.type==b.type)if("Range"==a.type){var c=a.rangeMin,e=b.rangeMin;!isNaN(c)&&!isNaN(e)&&c>e&&(a.rangeMin=e);c=a.rangeMax;e=b.rangeMax;!isNaN(c)&&!isNaN(e)&&c<e&&(a.rangeMax=e)}else c=this._arrayToObject(a.enumValues.split(",")),e=b.enumValues.split(","),g.forEach(e,function(b){c[b]||(a.enumValues+=","+b)})},getStates:function(a){return null},
_processDataCollections:function(a,b){b=b||{variables:{},categories:{},dataCollections:[]};g.forEach(a,function(a){if(!this._isDataCollectionDisallowed(a)){var c=a.variables||a.data;a=k.mixin({id:a.id||a.dataCollectionID},a.metadata);g.forEach(a.filters,function(a){this._prepareFilter(a)},this);a.filters=this._arrayToObject(a.filters,"id");a.hash={};a.data=a.variables=[];a.hasVariable=function(a){a=a&&a.id;return!(!a||void 0===this.hash[a.toUpperCase()])};a.getVisibleVariables=function(){return g.filter(this.data,
function(a){return this.hash[a.id.toUpperCase()]},this)};var d=[];g.forEach(a.categories,function(c){(c=this._prepareCategory(c,a,b))&&d.push(c)},this);a.categories=d;g.forEach(c,function(c){this._processVariable(c,a,b)},this);b.dataCollections.push(a)}},this);a=this.categories.queryEngine({},{sort:[{attribute:"displayOrder",descending:!0}]})(this._objectToArray(b.categories));this.categories.setData(a);this.dataCollections.setData(b.dataCollections);return b},_prepareFilter:function(a){"Range"==
a.type?(a.rangeMin=Number(a.rangeMin),a.rangeMin||(a.rangeMin=0),a.rangeMax=Number(a.rangeMax)):a.enumValues=this._trimArray(a.enumValues.split(",")).join(",")},_prepareCategory:function(a,b,c){var e=Number(a.displayOrder)||0,d=c.categories[a.id];if(d)d.displayOrder=Math.max(e,d.displayOrder);else{d=a;d.hash={};d.data=[];d.dataCollections=[];d.displayOrder=e;d.popularityHash={};var h=this;d.getPopularVariables=function(a,b){this.popularityArray||(this.popularityArray=h._objectToArray(this.popularityHash));
return h._queryPopularVariables(this.popularityArray,a,b)};c.categories[a.id]=d}d.dataCollections.push(b);return d},_queryPopularVariables:function(a,b,c){var e=this,d=c&&c.queryFilter||this.queryFilter;a=this.queryEngine(function(a){return(a=e.get(a.id))?d(a):!1},b)(a);for(b=0;b<a.length;b++)a[b]=this.get(a[b].id);return a},_processVariable:function(a,b,c){var e=a.popularity;void 0!==e&&(delete a.popularity,e=Number(e));b.categories&&b.categories.length||(a.missedInCategories=!0);if(!this._isVariableDisallowed(a)){this._prepareVariable(a);
var d=this._createUniqueVariableId(a).toUpperCase(),h=b.id+"."+a.id,l=this._isVariableAllowedInCategories(a,b),f=c.variables[d];if(f){f.missedInCategories&&!a.missedInCategories&&delete f.missedInCategories;c=f.hideInDataBrowser&&a.hideInDataBrowser;d=f.__sourceDesc||a.__sourceDesc;Object.keys(a.filteringTags).length&&(Object.keys(f.filteringTags).length?(k.mixin(a.filteringTags,f.filteringTags),a.indexBase=f.indexBase||a.indexBase,a[this.idProperty]=f[this.idProperty]):(a[this.idProperty]=h,d=a.__sourceDesc||
f.__sourceDesc),k.mixin(f,a));if(f.__sourceDesc=d)f.description=d;f.hideInDataBrowser=!!c}else f=a,f[this.idProperty]=h,c.variables[d]=f,this._data.push(f);this._registerVariable(f,h);var h=f[this.idProperty],m=h.toUpperCase();b.hasVariable(f)||(b.hash[f.id]=!!l,b.data.push(f));l&&g.forEach(b.categories,function(a){a.hash[m]||(a.hash[m]=f,a.data.push(f));if(e){var b=a.popularityHash[m];b?b.popularity<e&&(b.popularity=e):(b={id:h,popularity:e},a.popularityHash[m]=b)}},this)}},_isDataCollectionDisallowed:function(a){return!a.metadata||
!a.metadata.categories},_isVariableDisallowed:function(a){return!a.fieldCategory},_createUniqueVariableId:function(a){return a.id+"."+a.alias},_registerVariable:function(a,b){this._variables[b]=a},_isVariableAllowedInCategories:function(a,b){return!0},_prepareVariable:function(a){a.id=a.id.toUpperCase();a.units=a.units&&a.units.toUpperCase();a.filteringTags=this._arrayToObject(a.filteringTags,"id");a.percentBase=a.percentBase||null;a.percentBaseAlias=a.percentBaseAlias||null;a.averageBase=a.averageBase||
null;a.averageBaseAlias=a.averageBaseAlias||null;a.indexBase=a.indexBase||null;a.__sourceDesc=a.description;a.description||(a.description=a.alias)},_trimArray:function(a){for(var b=0;b<a.length;b++)a[b]=k.trim(a[b]);return a},_objectToArray:function(a){var b=[],c;for(c in a)b.push(a[c]);return b},_arrayToObject:function(a,b){var c={};g.forEach(a,function(a){c[b?a[b]:a]=a});return c}})});