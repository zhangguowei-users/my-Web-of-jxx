// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/base/etc/validationUtil",["dojo/_base/lang","dojo/_base/array","dojo/has","dojo/i18n!../../nls/i18nBase","../../../../kernel"],function(g,k,m,e,n){var l={formatMessage:function(a,b){var c=a.label,d=null,f=e.validation.pattern,h=e.validation.patternWithHint;!a.isValid&&a.considerHint&&(a=a.inputWidget.hint,"undefined"!==typeof a&&null!==a&&(a=g.trim(a),0<a.length&&(d=a)));return null!=d?h.replace("{label}",c).replace("{message}",b).replace("{hint}",d):f.replace("{label}",
c).replace("{message}",b)},validateValue:function(a,b){a.isValid=!0;a.message=this.formatMessage(a,e.validation.ok);a._continue=!0;this._checkEmpty(a,b);a.isValid&&a._continue&&(this._checkAlternates(a,b),a.isValid&&a._continue&&(a.considerHint=!0,a.inputWidget._isGxeInputNumber?this._checkNumber(a,b):a.inputWidget._isFgdcInputDate?this._checkFgdcDate(a,b):a.inputWidget._isFgdcInputTime?this._checkFgdcTime(a,b):a.inputWidget._isGxeInputDate&&(a.inputWidget.forceTime?this._checkDateTime(a,b):a.inputWidget.allowTime&&
-1!==b.indexOf("T")?this._checkDateTime(a,b):this._checkDate(a,b))))},_checkAlternates:function(a,b){var c;(c=a.xnodeWidget.alternateValues)&&c.push&&0<c.length&&(c=k.some(c,function(a){return a===b}))&&(a._continue=!1)},_checkDate:function(a,b){var c=!1,d=/^(\d{2})$/;b=b.split("-");/^(\d{4})$/.test(b[0])&&(1<b.length?d.test(b[1])&&(2<b.length?3==b.length&&("Z"===b[2].charAt(b[2].length-1)&&(b[2]=b[2].substring(0,b[2].length-1)),d.test(b[2])&&(c=!0)):c=!0):c=!0);c||(a.isValid=!1,a.message=this.formatMessage(a,
e.validation.date))},_checkDateTime:function(a,b){/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[0-1][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[0-1][0-9]):[0-5][0-9])?$/.test(b)||(a.isValid=!1,a.message=this.formatMessage(a,e.validation.other))},_checkEmpty:function(a,b){var c=a.isRequired,d=a.xnodeWidget.serializeIfEmpty,f=null===b;null!=b&&("string"===typeof b?f=a.xnodeWidget.trim?0===g.trim(b).length:0===b.length:b.push&&(f=0===b.length));f&&
(c?d?a._continue=!1:(this._checkIndeterminates(a,b),a._continue&&(a.isValid=!1,a.message=this.formatMessage(a,e.validation.empty))):a._continue=!1)},_checkFgdcDate:function(a,b){var c=!1;0===b.indexOf("-")&&(c=!0);b=b.replace(/-/g,"");c&&(b="-"+b);/^\d{4}(\d{2}(\d{2})?)?$/.test(b)||(a.isValid=!1,a.message=this.formatMessage(a,e.validation.date))},_checkFgdcTime:function(a,b){b=b.replace(/:/g,"");b=b.replace(/\./g,"");var c=/^\d{2}(\d{2}(\d{2,})?)?[+\-]\d{4}$/,d=/^\d{2}(\d{2}(\d{2,})?)?Z$/;/^\d{2}(\d{2}(\d{2,})?)?$/.test(b)||
c.test(b)||d.test(b)||(a.isValid=!1,a.message=this.formatMessage(a,e.validation.other))},_checkIndeterminates:function(a,b){if(a.xnodeWidget._isGxeElement){b=a.xnodeWidget.target;var c,d=null;if("gml:beginPosition"===b||"gml:endPosition"===b)d=a.xnodeWidget.findAttributes(),k.some(d,function(b){if("indeterminatePosition"===b.target)return!b._isOptionallyOff&&b.inputWidget&&(c=b.inputWidget.getInputValue(),"unknown"===c||"now"===c)&&(a._continue=!1),!0})}},_checkNumber:function(a,b){var c,d=a.inputWidget,
f=d.minValue,h=d.maxValue;if(d.integerOnly){if(c=/(^-?\d\d*$)/,!c.test(b)){a.isValid=!1;a.message=this.formatMessage(a,e.validation.integer);return}}else c=/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/,c.test(b)||(a.isValid=!1,a.message=this.formatMessage(a,e.validation.number));if(null!==f||null!==h){b=Number(b);var g=c=!0;null!=f&&(c=d.minValueIsExclusive?b>f:b>=f);null!=h&&(g=d.maxValueIsExclusive?b<h:b<=h);c&&g||(a.isValid=!1,a.message=this.formatMessage(a,e.validation.other))}}};m("extend-esri")&&
g.setObject("dijit.metadata.base.etc.validationUtil",l,n);return l});