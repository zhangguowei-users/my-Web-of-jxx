// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/SVGUtil",["dojo/sniff","dojo/dom-construct"],function(g,k){var c={},h=g("ie")||g("trident"),d;c.getOuterHTML=function(a){c.fixSVG(a);if(a.outerHTML)return a.outerHTML;if(!a.parentNode)return"";var l=a.parentNode;d=d||k.create("div",null,document.body);var e=a.nextSibling;a.parentNode.removeChild(a);d.appendChild(a);var b=a.parentNode.innerHTML;d.removeChild(a);e?e.parentNode.insertBefore(a,e):l.appendChild(a);b=b.replace(/preserveAspectRatio="none meet"/g,'preserveAspectRatio\x3d"none"');
return b=b.replace(/preserveAspectRatio='none meet'/g,"preserveAspectRatio\x3d'none'")};c.fixSVG=function(a){function c(a,b){if(a&&(a.hasAttribute&&a.hasAttribute("xlink:href")&&(e=!0),"svg"===a.nodeName.toLowerCase()&&b(a),a.childNodes))for(var f=0,d=a.childNodes.length;f<d;f++)c(a.childNodes[f],b)}var e=!1,b=["xmlns","xmlns:xlink","xlink:href","version"];c(a,function(a){b.forEach(function(b){for(;a.hasAttribute(b);)a.removeAttribute(b)});a.hasAttribute("preserveAspectRatio")&&"none meet"===a.getAttribute("preserveAspectRatio")&&
(a.removeAttribute("preserveAspectRatio"),a.setAttribute("preserveAspectRatio","none"))});a.hasAttribute("xmlns")||h||a.setAttribute("xmlns","http://www.w3.org/2000/svg");!e||a.hasAttribute("xmlns:xlink")||h||a.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");a.setAttribute("version","1.1")};return c});