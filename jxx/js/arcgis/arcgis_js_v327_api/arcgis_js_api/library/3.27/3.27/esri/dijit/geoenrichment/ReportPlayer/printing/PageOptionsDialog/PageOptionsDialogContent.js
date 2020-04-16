// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/printing/PageOptionsDialog/templates/PageOptionsDialogContent.html":'\x3cdiv class\x3d"esriGEPageOptionsDialog"\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"exportOptionsBlock" class\x3d"pageOptionsDialog_section"\x3e\r\n        \x3cdiv class\x3d"esriGERowHigh"\x3e${nls.exportAs}\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"exportSelectDiv" class\x3d"esriGESpaceBeforeBig"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"staticOutputSettingsBlock"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"autoScaleBlock" class\x3d"pageOptionsDialog_bigRow20 pageOptionsDialog_section"\x3e\r\n            \x3cdiv class\x3d"esriGERowHigh"\x3e${nls.autoAdjustSections}\x3c/div\x3e\r\n            \x3cdiv class\x3d"esriGESpaceBeforeBig"\x3e\r\n                \x3cdiv class\x3d"dijitInline esriGESpaceAfterBig"\x3e\x3clabel data-dojo-attach-point\x3d"autoScaleLabel"\x3e\x26nbsp;${nls.autoScaleRowsLabel}\x3c/label\x3e\x3c/div\x3e\r\n                \x3cdiv class\x3d"dijitInline pageOptionsDialog_infoIcon" data-dojo-attach-point\x3d"autoScaleInfoIcon"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n\r\n        \x3cdiv data-dojo-attach-point\x3d"staticExportSettings"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"layoutBlock" class\x3d"pageOptionsDialog_bigRow20 pageOptionsDialog_section"\x3e\r\n                \x3cdiv class\x3d"esriGERowHigh"\x3e${nls.pageSize}\x3c/div\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"optionsBlock" class\x3d"esriGESpaceBeforeBig"\x3e\r\n                    \x3cdiv class\x3d"esriGERowHigh" data-dojo-attach-point\x3d"sizeListDiv"\x3e\x3c/div\x3e\r\n                    \x3cdiv class\x3d"esriGERowHigh esriGESpaceBeforeBig"\x3e\r\n                        \x3cdiv class\x3d"dijitInline esriGESpaceAfterBig" data-dojo-attach-point\x3d"portraitRadioButtonDiv"\x3e\x3c/div\x3e\r\n                        \x3cdiv class\x3d"dijitInline esriGEClickable" data-dojo-attach-point\x3d"portraitRadioButtonLabel"\x3e${nls.portrait}\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv class\x3d"esriGERowHigh esriGESpaceBeforeBig"\x3e\r\n                        \x3cdiv class\x3d"dijitInline esriGESpaceAfterBig" data-dojo-attach-point\x3d"landscapeRadioButtonDiv"\x3e\x3c/div\x3e\r\n                        \x3cdiv class\x3d"dijitInline esriGEClickable" data-dojo-attach-point\x3d"landscapeRadioButtonLabel"\x3e${nls.landscape}\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n\r\n            \x3cdiv data-dojo-attach-point\x3d"headerFooterBlock" class\x3d"pageOptionsDialog_bigRow20 pageOptionsDialog_section"\x3e\r\n                \x3cdiv class\x3d"esriGERowHigh"\x3e${nls.headerAndFooter}\x3c/div\x3e\r\n                \x3cdiv class\x3d"esriGERowHigh esriGESpaceBeforeBig"\x3e\r\n                    \x3clabel data-dojo-attach-point\x3d"headerLabel"\x3e\x26nbsp;${nls.headerLabel}\x3c/label\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"reportTitleBlock"\x3e\r\n                    \x3cdiv class\x3d"esriGERowHigh esriGESpaceBefore30"\x3e\r\n                        \x3cdiv class\x3d"dijitInline esriGESpaceAfterBig reportTitleBlock_label"\x3e${nls.title}\x3c/div\x3e\r\n                        \x3cdiv class\x3d"dijitInline" data-dojo-attach-point\x3d"reportTitleTextBoxDiv"\x3e\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv class\x3d"esriGERowHigh esriGESpaceBefore30"\x3e\r\n                        \x3cdiv class\x3d"dijitInline esriGESpaceAfterBig reportTitleBlock_label"\x3e${nls.subtitle}\x3c/div\x3e\r\n                        \x3cdiv class\x3d"dijitInline" data-dojo-attach-point\x3d"reportSubtitleTextBoxDiv"\x3e\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv class\x3d"esriGERowHigh esriGESpaceBeforeBig" data-dojo-attach-point\x3d"dataSourceBlock"\x3e\r\n                    \x3clabel data-dojo-attach-point\x3d"dataSourceLabel"\x3e\x26nbsp;${nls.dataSourceLabel}\x3c/label\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv class\x3d"esriGERowHigh esriGESpaceBeforeBig"\x3e\r\n                    \x3clabel data-dojo-attach-point\x3d"footerLabel"\x3e\x26nbsp;${nls.footerLabel}\x3c/label\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n\r\n        \x3cdiv data-dojo-attach-point\x3d"dynamicExportSettings" class\x3d"pageOptionsDialog_bigRow20 pageOptionsDialog_section"\x3e\r\n            \x3cdiv class\x3d"esriGERowHigh"\x3e\r\n                \x3clabel data-dojo-attach-point\x3d"dataDrillingLabel"\x3e\x26nbsp;${nls.dataDrillingLabel}\x3c/label\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"pageOptionsDialog_actionButtonsBlock"\x3e\r\n        \x3cdiv class\x3d"pageOptionsDialog_actionButton dijitInline" data-dojo-attach-point\x3d"exportButton"\x3e\x3c/div\x3e\r\n        \x3cdiv class\x3d"pageOptionsDialog_actionButton dijitInline" data-dojo-attach-point\x3d"cancelButton"\x3e${nls.cancel}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/geoenrichment/ReportPlayer/printing/PageOptionsDialog/PageOptionsDialogContent","dojo/_base/declare dojo/_base/lang dojo/on dojo/string dijit/_WidgetBase dijit/_TemplatedMixin dijit/form/TextBox esri/dijit/geoenrichment/TriStateItem esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/TooltipUtil esri/dijit/geoenrichment/OnDemandSelect dijit/form/RadioButton esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/DocumentOptions esri/dijit/geoenrichment/ReportPlayer/printing/PageSizeUtil esri/dijit/geoenrichment/ReportPlayer/PlayerCommands dojo/text!./templates/PageOptionsDialogContent.html dojo/i18n!esri/nls/jsapi".split(" "),
function(p,h,g,q,r,t,k,f,d,u,l,m,n,v,c,w,b){b=b.geoenrichment.dijit.ReportPlayer.PageOptionsDialog;var e={};e[c.HTML]=b.createHTMLLabel;e[c.IMAGE]=b.createImageLabel;e[c.PDF]=b.createPDFLabel;e[c.PRINT]=b.printLabel;e[c.DYNAMIC_HTML]=b.createDynamicHTMLLabel;return p([r,t],{templateString:w,nls:b,exportSelect:null,sizeList:null,autoScaleCheckbox:null,addHeaderCheckbox:null,addDataSourceCheckbox:null,addFooterCheckbox:null,postCreate:function(){var a=this;this.inherited(arguments);g(this.exportButton,
"click",function(){a.onPrint()});g(this.cancelButton,"click",function(){a.onCancel()});this.exportSelect=(new l({"class":"exportSelect",listClass:"esriGEOnDemandSelectSpacedOut",options:[],onChange:function(){a._currentSettings.commandId=a.exportSelect.get("value");a._syncViewForSelectedCommand()}})).placeAt(this.exportSelectDiv);this.own(this.exportSelect);this.autoScaleCheckbox=new f(this.autoScaleLabel);this.autoScaleCheckbox.set("checked",!0);this.sizeList=(new l({"class":"sizeList",listClass:"esriGEOnDemandSelectSpacedOut esriGEOnDemandSelectUnlimitedTallList"})).placeAt(this.sizeListDiv);
this.own(this.sizeList);this.portraitButton=(new m({checked:!1,name:this.id})).placeAt(this.portraitRadioButtonDiv);this.own(this.portraitButton);this.portraitButton.startup();g(this.portraitRadioButtonLabel,"click",function(){a.portraitButton.set("checked",!0)});this.landscapeButton=(new m({checked:!1,name:this.id})).placeAt(this.landscapeRadioButtonDiv);this.own(this.landscapeButton);this.landscapeButton.startup();g(this.landscapeRadioButtonLabel,"click",function(){a.landscapeButton.set("checked",
!0)});this.addHeaderCheckbox=new f(this.headerLabel);this.addHeaderCheckbox.onClick=function(){this._syncHeaderTitleBlockVisibility()}.bind(this);this.addDataSourceCheckbox=new f(this.dataSourceLabel);this.addFooterCheckbox=new f(this.footerLabel);this.reportTitleTextBox=(new k({value:"",placeHolder:b.titlePlaceholder})).placeAt(this.reportTitleTextBoxDiv);this.own(this.reportTitleTextBox);this.reportSubtitleTextBox=(new k({value:"",placeHolder:b.subtitlePlaceholder})).placeAt(this.reportSubtitleTextBoxDiv);
this.own(this.reportSubtitleTextBox);this.dataDrillingCheckbox=new f(this.dataDrillingLabel);this.dataDrillingCheckbox.set("checked",!0);u.setTooltipToNode(this.autoScaleInfoIcon,b.autoScaleRowsTooltip)},_currentSettings:null,update:function(a){this._currentSettings=h.mixin({},a);this._configureExportOptions(a);this._configureAutoScale(a);this._configurePageSize(a);this._configureHeaderAndFooter(a);this._syncViewForSelectedCommand()},_configureExportOptions:function(a){if(a.exportCommands&&a.exportCommands.length){d.show(this.exportOptionsBlock);
var b=a.exportCommands.map(function(a){return{label:a.label,value:a.id}});this.exportSelect.set("options",b);this.exportSelect.set("value",a.commandId||b[0])}else d.hide(this.exportOptionsBlock)},_syncViewForSelectedCommand:function(){this.exportButton.innerHTML=e[this._currentSettings.commandId];d.hide([this.staticExportSettings,this.dynamicExportSettings]);d.show(this._currentSettings.commandId===c.DYNAMIC_HTML?this.dynamicExportSettings:this.staticExportSettings)},_configureAutoScale:function(a){d[a.canAutoScale?
"show":"hide"](this.autoScaleBlock)},_configureHeaderAndFooter:function(a){this.reportTitleTextBox.set("value",a.reportTitle||"");this.reportSubtitleTextBox.set("value",a.reportSubtitle||"");this._syncHeaderTitleBlockVisibility()},_syncHeaderTitleBlockVisibility:function(){d[this.addHeaderCheckbox.get("checked")?"show":"hide"](this.reportTitleBlock)},_configurePageSize:function(a){var d=!n.hasStandardSize(a.currentPageSettings.pagesize),c;d&&(c=n.getPageDim(a.currentPageSettings.pagesize,a.currentPageSettings.orientation,
{places:2}),c=q.substitute(b.customWithDimensions,{w:c.w,h:c.h}));this.sizeList.set("options",v.getSupportedPageSizes(d,c));this.sizeList.set("value",d?"custom":a.currentPageSettings.pagesize);this.portraitButton.set("checked","portrait"===a.currentPageSettings.orientation);this.landscapeButton.set("checked","landscape"===a.currentPageSettings.orientation)},getSettings:function(){var a=h.mixin({},this._currentSettings.currentPageSettings);"custom"!==this.sizeList.get("value")&&(a.orientation=this.portraitButton.get("checked")?
"portrait":"landscape",a.pagesize=this.sizeList.get("value"));return{needAutoScale:this.autoScaleCheckbox.get("checked"),addHeader:this.addHeaderCheckbox.get("checked"),addDataSource:this.addDataSourceCheckbox.get("checked"),addFooter:this.addFooterCheckbox.get("checked"),allowDataDrilling:this.dataDrillingCheckbox.get("checked"),reportTitle:this.reportTitleTextBox.get("value"),reportSubtitle:this.reportSubtitleTextBox.get("value"),pageSettings:a,commandId:this._currentSettings.commandId}},setState:function(a){this.autoScaleCheckbox.set("checked",
a.needAutoScale);this.addHeaderCheckbox.set("checked",a.addHeader);this.addDataSourceCheckbox.set("checked",a.addDataSource);this.addFooterCheckbox.set("checked",a.addFooter);this.dataDrillingCheckbox.set("checked",a.allowDataDrilling);this._syncHeaderTitleBlockVisibility();this.exportSelect.options.some(function(b){return b.value===a.commandId})||(a.commandId=this.exportSelect.options[0]&&this.exportSelect.options[0].value);a.commandId&&(this.exportSelect.set("value",a.commandId),this.exportSelect.onChange())},
onPrint:function(){},onCancel:function(){}})});