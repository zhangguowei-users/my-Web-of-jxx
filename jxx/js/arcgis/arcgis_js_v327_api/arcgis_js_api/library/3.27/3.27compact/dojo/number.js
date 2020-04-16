/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/number",["./_base/lang","./i18n","./i18n!./cldr/nls/number","./string","./regexp"],function(p,m,t,q,k){var f={};p.setObject("dojo.number",f);f.format=function(b,a){a=p.mixin({},a||{});var c=m.normalizeLocale(a.locale),c=m.getLocalization("dojo.cldr","number",c);a.customs=c;c=a.pattern||c[(a.type||"decimal")+"Format"];return isNaN(b)||Infinity==Math.abs(b)?null:f._applyPattern(b,c,a)};f._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;f._applyPattern=function(b,a,c){c=c||{};var d=c.customs.group,
e=c.customs.decimal;a=a.split(";");var g=a[0];a=a[0>b?1:0]||"-"+g;if(-1!=a.indexOf("%"))b*=100;else if(-1!=a.indexOf("\u2030"))b*=1E3;else if(-1!=a.indexOf("\u00a4"))d=c.customs.currencyGroup||d,e=c.customs.currencyDecimal||e,a=a.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/,function(b,a,d,e){return(b=c[["symbol","currency","displayName"][d.length-1]]||c.currency||"")?a+b+e:""});else if(-1!=a.indexOf("E"))throw Error("exponential notation not supported");var h=f._numberPatternRE,g=g.match(h);if(!g)throw Error("unable to find a number expression in pattern: "+
a);!1===c.fractional&&(c.places=0);return a.replace(h,f._formatAbsolute(b,g[0],{decimal:e,group:d,places:c.places,round:c.round}))};f.round=function(b,a,c){c=10/(c||10);return(c*+b).toFixed(a)/c};if(0==(.9).toFixed()){var r=f.round;f.round=function(b,a,c){var d=Math.pow(10,-a||0),e=Math.abs(b);if(!b||e>=d)d=0;else if(e/=d,.5>e||.95<=e)d=0;return r(b,a,c)+(0<b?d:-d)}}f._formatAbsolute=function(b,a,c){c=c||{};!0===c.places&&(c.places=0);Infinity===c.places&&(c.places=6);a=a.split(".");var d="string"==
typeof c.places&&c.places.indexOf(","),e=c.places;d?e=c.places.substring(d+1):0<=e||(e=(a[1]||[]).length);0>c.round||(b=f.round(b,e,c.round));b=String(Math.abs(b)).split(".");var g=b[1]||"";a[1]||c.places?(d&&(c.places=c.places.substring(0,d)),d=void 0!==c.places?c.places:a[1]&&a[1].lastIndexOf("0")+1,d>g.length&&(b[1]=q.pad(g,d,"0",!0)),e<g.length&&(b[1]=g.substr(0,e))):b[1]&&b.pop();e=a[0].replace(",","");d=e.indexOf("0");-1!=d&&(d=e.length-d,d>b[0].length&&(b[0]=q.pad(b[0],d)),-1==e.indexOf("#")&&
(b[0]=b[0].substr(b[0].length-d)));var e=a[0].lastIndexOf(","),h,n;-1!=e&&(h=a[0].length-e-1,a=a[0].substr(0,e),e=a.lastIndexOf(","),-1!=e&&(n=a.length-e-1));a=[];for(e=b[0];e;)d=e.length-h,a.push(0<d?e.substr(d):e),e=0<d?e.slice(0,d):"",n&&(h=n,n=void 0);b[0]=a.reverse().join(c.group||",");return b.join(c.decimal||".")};f.regexp=function(b){return f._parseInfo(b).regexp};f._parseInfo=function(b){b=b||{};var a=m.normalizeLocale(b.locale),a=m.getLocalization("dojo.cldr","number",a),c=b.pattern||a[(b.type||
"decimal")+"Format"],d=a.group,e=a.decimal,g=1;if(-1!=c.indexOf("%"))g/=100;else if(-1!=c.indexOf("\u2030"))g/=1E3;else{var h=-1!=c.indexOf("\u00a4");h&&(d=a.currencyGroup||d,e=a.currencyDecimal||e)}a=c.split(";");1==a.length&&a.push("-"+a[0]);a=k.buildGroupRE(a,function(a){a="(?:"+k.escapeString(a,".")+")";return a.replace(f._numberPatternRE,function(a){var c={signed:!1,separator:b.strict?d:[d,""],fractional:b.fractional,decimal:e,exponent:!1};a=a.split(".");var l=b.places;1==a.length&&1!=g&&(a[1]=
"###");1==a.length||0===l?c.fractional=!1:(void 0===l&&(l=b.pattern?a[1].lastIndexOf("0")+1:Infinity),l&&void 0==b.fractional&&(c.fractional=!0),!b.places&&l<a[1].length&&(l+=","+a[1].length),c.places=l);a=a[0].split(",");1<a.length&&(c.groupSize=a.pop().length,1<a.length&&(c.groupSize2=a.pop().length));return"("+f._realNumberRegexp(c)+")"})},!0);h&&(a=a.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(a,c,d,e){a=k.escapeString(b[["symbol","currency","displayName"][d.length-1]]||b.currency||
"");if(!a)return"";c=c?"[\\s\\xa0]":"";e=e?"[\\s\\xa0]":"";return b.strict?c+a+e:(c&&(c+="*"),e&&(e+="*"),"(?:"+c+a+e+")?")}));return{regexp:a.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:d,decimal:e,factor:g}};f.parse=function(b,a){a=f._parseInfo(a);b=(new RegExp("^"+a.regexp+"$")).exec(b);if(!b)return NaN;var c=b[1];if(!b[1]){if(!b[2])return NaN;c=b[2];a.factor*=-1}c=c.replace(new RegExp("["+a.group+"\\s\\xa0]","g"),"").replace(a.decimal,".");return c*a.factor};f._realNumberRegexp=function(b){b=b||{};
"places"in b||(b.places=Infinity);"string"!=typeof b.decimal&&(b.decimal=".");"fractional"in b&&!/^0/.test(b.places)||(b.fractional=[!0,!1]);"exponent"in b||(b.exponent=[!0,!1]);"eSigned"in b||(b.eSigned=[!0,!1]);var a=f._integerRegexp(b),c=k.buildGroupRE(b.fractional,function(a){var c="";a&&0!==b.places&&(c="\\"+b.decimal,c=Infinity==b.places?"(?:"+c+"\\d+)?":c+("\\d{"+b.places+"}"));return c},!0),d=k.buildGroupRE(b.exponent,function(a){return a?"([eE]"+f._integerRegexp({signed:b.eSigned})+")":""}),
a=a+c;c&&(a="(?:(?:"+a+")|(?:"+c+"))");return a+d};f._integerRegexp=function(b){b=b||{};"signed"in b||(b.signed=[!0,!1]);"separator"in b?"groupSize"in b||(b.groupSize=3):b.separator="";var a=k.buildGroupRE(b.signed,function(a){return a?"[-+]":""},!0),c=k.buildGroupRE(b.separator,function(a){if(!a)return"(?:\\d+)";a=k.escapeString(a);" "==a?a="\\s":"\u00a0"==a&&(a="\\s\\xa0");var c=b.groupSize,d=b.groupSize2;return d?(a="(?:0|[1-9]\\d{0,"+(d-1)+"}(?:["+a+"]\\d{"+d+"})*["+a+"]\\d{"+c+"})",0<c-d?"(?:"+
a+"|(?:0|[1-9]\\d{0,"+(c-1)+"}))":a):"(?:0|[1-9]\\d{0,"+(c-1)+"}(?:["+a+"]\\d{"+c+"})*)"},!0);return a+c};return f});