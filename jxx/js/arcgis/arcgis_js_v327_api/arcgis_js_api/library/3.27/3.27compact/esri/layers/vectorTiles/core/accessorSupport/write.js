// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/accessorSupport/write","require exports ../Error ../Logger ./PropertyOrigin ./utils ./extensions/serializableProperty".split(" "),function(u,h,q,r,m,l,n){function p(a,f,c,e,d,b){if(!e||!e.write)return!1;var g=a.get(c);if(void 0===g)return!1;if(!d&&e.write.overridePolicy){var h=e.write.overridePolicy.call(a,g,c,b);void 0!==h&&(d=h)}d||(d=e.write);if(!d||!1===d.enabled)return!1;if(null===g){if(d.allowNull)return!0;d.isRequired&&((a=new q("web-document-write:property-required",
"Missing value for required property '"+c+"' on '"+a.declaredClass+"'",{propertyName:c,target:a}),b)&&b.messages?b.messages.push(a):a&&!b&&t.error(a.name,a.message));return!1}return!d.ignoreOrigin&&b&&b.origin&&f.store.originOf(c)<m.nameToId(b.origin)?!1:!0}function k(a,f,c){if(a&&"function"===typeof a.toJSON&&(!a.toJSON.isDefaultToJSON||!a.write))return l.merge(f,a.toJSON());var e=l.getProperties(a),d=e.metadatas,b;for(b in d){var g=n.originSpecificWritePropertyDefinition(d[b],c);if(p(a,e,b,g,null,
c)){var h=a.get(b),k={};g.write.writer.call(a,h,k,"string"===typeof g.write.target?g.write.target:b,c);g=k;0<Object.keys(g).length&&(f=l.merge(f,g),c&&c.writtenProperties&&c.writtenProperties.push({target:a,propName:b,oldOrigin:m.idToReadableName(e.store.originOf(b)),newOrigin:c.origin}))}}return f}Object.defineProperty(h,"__esModule",{value:!0});var t=r.getLogger("esri.core.accessorSupport.write");h.willPropertyWrite=function(a,f,c,e){var d=l.getProperties(a),b=n.originSpecificWritePropertyDefinition(d.metadatas[f],
e);return b?p(a,d,f,b,c,e):!1};h.write=k;h.disableWriteDefaultPolicy=function(a){return function(f){return{enabled:f!==a}}};h.default=k});