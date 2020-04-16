// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/commands/createHTML/DomProcessor","dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-style dojo/query esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/DynamicStyleUtil ../supportClasses/HeaderFooterRenderer".split(" "),function(q,r,g,m,c,t,u,v){var p={PROPS_TO_REMOVE:{"data-dojo-attach-point":1,id:1,widgetid:1},processMainNode:function(h,e,w,k){var l=[],f=function(a){var d=[],b=c(".reportContainerGrid_gridContainerWrapper",
a);1<b.length?(b.forEach(function(a){a.parentNode.removeChild(a)}),c(".esriGEReportPlayer_reportContainerGrid",a).forEach(function(a,d){0<d&&a.parentNode.removeChild(a)}),b.forEach(function(b){var e=g.toDom(a.outerHTML);c(".reportContainerGrid_gridStackContainer",e)[0].appendChild(b);d.push(e)})):d.push(a);return d}(function(){var a=g.toDom(h.domNode.outerHTML);p.processNode(a,l);c(".esriGEReportPlayer_reportContainerGrid",a).forEach(function(a){m.set(a,{width:"auto",height:"auto"})});c(".reportContainerGrid_mainContainer",
a).forEach(function(a){m.set(a,{width:"auto",height:"auto"})});x.processTooltips(a);return a}());(function(a){a.forEach(function(b,n){var d=h.getNumberOfPages(),c=Math.floor(n/d);v.addHeaderAndFooterToPage({pageNode:b.children[0],headerFooterParams:e&&e[c],documentOptions:w,pageIndex:k?n:n%d,numPages:k?a.length:d})})})(f);var b=function(a){return function(a){return a&&a.replace(/esriMapsAnalystXNonSelectable|esriGENonSelectable|esriMapsAnalystXClickable|dojogfxstrokestyle="solid"/g,"")}(a.map(function(a){return a.outerHTML}).join(""))}(f);
(function(a){a.forEach(function(a){g.destroy(a)})})(f);return{domString:b,additionalStyleNodes:l}},processNode:function(c,e){function h(b,a){return a?"line"===b.nodeName&&b.getAttribute("x1")===b.getAttribute("x2")&&b.getAttribute("y1")===b.getAttribute("y2")?!1:!0:!(t.isHidden(b)||"none"===m.get(b,"display")||r.contains(b,"esriTriStateCheckBoxIcon"))}function k(b,a){a=void 0===a?!0:a;for(var d in f.PROPS_TO_REMOVE)(a||"id"!==d)&&q.remove(b,d)}function l(b,a){"svg"===b.nodeName&&(a=!0);if(!a){var d=
u.getStyle(b.id);d&&d.forEach(function(a){e.push(a)});k(b,!d)}if(!h(b,a))return g.destroy(b),!1;if(b.children)for(var d=b.children.length,c=0,f=0;c+f<d;)l(b.children[c],a)?c++:f++;return!0}var f=this;l(c)}},x={processTooltips:function(h){c(".selectableLegendRootLabel",h).forEach(function(c){c.title=c.innerHTML})}};return{getDomString:function(c,e,g,k){return p.processMainNode(c,e,g,k)}}});