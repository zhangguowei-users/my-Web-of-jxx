// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/FileUtil",["dojo/Deferred"],function(f){function h(){return new f.reject(Error("Saving not supported."))}var e=h,k=/[\\/:*?"<>|]/g,c={savingSupported:function(){return void 0!==window.Blob},saveTextFile:function(a,b,d){return c.savingSupported()?c.saveAs(new Blob([a],{type:d||"text/plain"}),b||"text.txt"):h()},saveAs:function(a,b){return e(a,c.validateName(b||"download"))},validateName:function(a){return String(a).trim().replace(k,"")}};if(!c.savingSupported())return c;
if(window.navigator&&window.navigator.msSaveOrOpenBlob)return e=function(a,b){var d=new f;window.navigator.msSaveOrOpenBlob(a,b)?d.resolve():d.reject(Error("Failed to save or open downloaded file."));return d.promise},c;var g=window.URL||window.webkitURL;if("download"in window.document.createElement("a")){var l=function(a){var b;void 0!==window.MouseEvent?b=new MouseEvent("click",{bubbles:!0,cancelable:!1}):(b=document.createEvent("MouseEvent"),b.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,
!1,!1,0,null));a.dispatchEvent(b)},e=function(a,b){var d=new f,c=g.createObjectURL(a);a=window.document.createElement("a");a.href=c;a.download=b;l(a);setTimeout(function(){g.revokeObjectURL(c);d.resolve()},1E3);return d.promise};return c}e=function(a,b){var c=new f;a=new File([a],b,{type:a.type});var e=g.createObjectURL(a);window.open(e,"_blank");setTimeout(function(){g.revokeObjectURL(e);c.resolve()},1E3);return c.promise};return c});