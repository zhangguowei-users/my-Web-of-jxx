//>>built
define("dojox/xml/parser",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/sniff"],function(c){c.getObject("xml.parser",!0,dojox);dojox.xml.parser.parse=function(a,d){var b=c.doc,e;d=d||"text/xml";if(a&&c.trim(a)&&"DOMParser"in c.global){e=(new DOMParser).parseFromString(a,d);a=e.documentElement;if("parsererror"==a.nodeName&&"http://www.mozilla.org/newlayout/xml/parsererror.xml"==a.namespaceURI){if(b=a.getElementsByTagNameNS("http://www.mozilla.org/newlayout/xml/parsererror.xml",
"sourcetext")[0])b=b.firstChild.data;throw Error("Error parsing text "+a.firstChild.data+" \n"+b);}return e}if("ActiveXObject"in c.global){b=function(a){return"MSXML"+a+".DOMDocument"};b=["Microsoft.XMLDOM",b(6),b(4),b(3),b(2)];c.some(b,function(a){try{e=new ActiveXObject(a)}catch(g){return!1}return!0});if(a&&e&&(e.async=!1,e.loadXML(a),a=e.parseError,0!==a.errorCode))throw Error("Line: "+a.line+"\nCol: "+a.linepos+"\nReason: "+a.reason+"\nError Code: "+a.errorCode+"\nSource: "+a.srcText);if(e)return e}else if(b.implementation&&
b.implementation.createDocument){if(a&&c.trim(a)&&b.createElement){d=b.createElement("xml");d.innerHTML=a;var f=b.implementation.createDocument("foo","",null);c.forEach(d.childNodes,function(a){f.importNode(a,!0)});return f}return b.implementation.createDocument("","",null)}return null};dojox.xml.parser.textContent=function(a,d){if(1<arguments.length)return dojox.xml.parser.replaceChildren(a,(a.ownerDocument||c.doc).createTextNode(d)),d;if(void 0!==a.textContent)return a.textContent;var b="";a&&c.forEach(a.childNodes,
function(a){switch(a.nodeType){case 1:case 5:b+=dojox.xml.parser.textContent(a);break;case 3:case 2:case 4:b+=a.nodeValue}});return b};dojox.xml.parser.replaceChildren=function(a,d){var b=[];c.isIE&&c.forEach(a.childNodes,function(a){b.push(a)});dojox.xml.parser.removeChildren(a);c.forEach(b,c.destroy);c.isArray(d)?c.forEach(d,function(b){a.appendChild(b)}):a.appendChild(d)};dojox.xml.parser.removeChildren=function(a){for(var c=a.childNodes.length;a.hasChildNodes();)a.removeChild(a.firstChild);return c};
dojox.xml.parser.innerXML=function(a){return a.innerXML?a.innerXML:a.xml?a.xml:"undefined"!=typeof XMLSerializer?(new XMLSerializer).serializeToString(a):null};return dojox.xml.parser});