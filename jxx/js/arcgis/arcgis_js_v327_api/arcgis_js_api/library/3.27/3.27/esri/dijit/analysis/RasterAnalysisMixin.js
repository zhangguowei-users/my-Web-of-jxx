// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/RasterAnalysisMixin","dojo/_base/declare dojo/_base/Deferred dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/store/Memory dojo/promise/all dojo/when dojo/string dojo/has dojo/dom-class dojo/dom-style dojo/dom-attr dijit/Tooltip ../../kernel ../../lang ../../request ../../symbols/SimpleFillSymbol ../../Color ../../renderers/ClassBreaksRenderer ../../tasks/AlgorithmicColorRamp ../../tasks/MultipartColorRamp ../RasterFunctionEditor/utils ./AnalysisBase ./_AnalysisOptions ./utils ../../layers/RasterFunction".split(" "),
function(l,v,d,k,t,g,w,x,y,n,z,A,m,B,C,D,E,u,F,p,G,H,I,J,K,L,h,q){l=l([L,K],{declaredClass:"esri.dijit.analysis.RasterAnalysisMixin",map:null,outputLayerName:null,resultParameter:"outputRaster",rasterGPToolName:"GenerateRaster",analysisType:"raster",i18n:null,returnProcessInfo:null,unsupportedServiceNameCharacters:/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?\.]/g,_geometryService:null,_findDeepestArgsForRerun:!1,constructor:function(a,b){this._pbConnects=[];a.containerNode&&(this.container=a.containerNode)},
destroy:function(){this.inherited(arguments);k.forEach(this._pbConnects,t.disconnect);delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments);d.mixin(this.i18n,this.toolNlsName)},postCreate:function(){this.inherited(arguments);A.add(this._form.domNode,"esriSimpleForm");this._outputLayerInput.set("validator",d.hitch(this,this.validateServiceName));this._buildUI()},startup:function(){},validateServiceName:function(a){return h.validateServiceName(a,{textInput:this._outputLayerInput})},
_getJobParameters:function(){},_getRasterFunction:function(){},_getRasterArguments:function(){},_getRasterObject:function(a){a=a||this.get("inputLayer");return J.getRasterJsonFromLayer(a)},_getOutputRasterLayerName:function(){},_getOutputItemProperties:function(){},_setDefaultInputs:function(){},_resetUI:function(){},_getDefaultOutputItemProperties:function(a,b,c){b=this._getDefaultRenderingRule(b);var f=this._getDefaultRenderer(),e=this._getDefaultPopupInfo();a={visibility:!0,opacity:a||1,interpolation:c||
"RSP_NearestNeighbor",popupInfo:e};b&&(a.renderingRule=b);f&&(a.layerDefinition={},a.layerDefinition.drawingInfo={},a.layerDefinition.drawingInfo.renderer=f.toJson());return a},_getDefaultRenderingRule:function(a){var b=new q;b.functionName="Stretch";b.functionArguments={StretchType:5,DRA:!1,Gamma:[1],UseGamma:!0};b.outputPixelType="U8";var c=new q;c.functionName="Colormap";c.functionArguments={colorRamp:a||"Aspect",Raster:b};return c},_getDefaultRenderer:function(){if(this.colorValues&&this.colorValues.length&&
this.classMaxValues&&this.classMaxValues.length&&this.labels&&this.labels.length){var a=this.colorValues.length;if(a===this.classMaxValues.length&&a===this.labels.length){var b=new G({field:"Value",showInAscendingOrder:!0,classificationMethod:"natural-breaks"}),c=new I,f,e,d,r;c.colorRamps=[];for(d=0;d<a;d++)r=this.colorValues[d],f&&(e=new H,e.algorithm="hsv",e.fromColor=new p(f),e.toColor=new p(r),c.colorRamps.push(e)),f=r;c&&(b.authoringInfo={},b.authoringInfo.colorRamp=c.toJson());c=[];f=-1;for(d=
0;d<a;d++)e=this.colorValues[d],e=new F("solid",null,new p({r:e[0],g:e[1],b:e[2],a:e[3]})),c.push({minValue:f,maxValue:this.classMaxValues[d],label:this.labels[d],symbol:e}),f=this.classMaxValues[d];b.infos=c;b.attributeField="Value";return b}}},_getDefaultPopupInfo:function(){return{title:this.get("outputLayerName"),description:null,fieldInfos:[{fieldName:"Raster.ServicePixelValue",label:"Service Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!1,format:{places:2,digitSeparator:!0}},{fieldName:"Raster.ServicePixelValue.Raw",
label:"Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!0,format:{places:2,digitSeparator:!0}}],showAttachments:!1,layerOptions:{showNoDataRecords:!0,returnTopmostRaster:!0},mediaInfos:[]}},_getReRunRFxArgs:function(a,b){var c={};this._findFunction(a,b,c);return c&&c.rasterFunctionArguments},_findFunction:function(a,b,c){var f=a&&a.rasterFunction,d=this._getRasterFunction();if(f&&c&&"object"===typeof c){if(f===d&&(c.rasterFunction=a.rasterFunction,c.rasterFunctionArguments=a.rasterFunctionArguments,
!b))return;this._findFunction(a.rasterFunctionArguments&&a.rasterFunctionArguments.Raster,b,c)}},_getSelectedLayerIndexFromUI:function(a,b){if(!a||!b)return-1;var c=-1;k.forEach(a,function(a,d){a&&a.label.toLowerCase()===b.toLowerCase()&&(c=d)});return c},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.rasterGPToolName))},_setInputLayersAttr:function(a){this.inputLayers=a},_setInputLayerAttr:function(a){this.inputLayer=a},_getInputLayerAttr:function(){return this.inputLayer},
_getOutputLayerNameAttr:function(){this._outputLayerInput&&(this.outputLayerName=this._outputLayerInput.get("value"));return this.outputLayerName},_setOutputLayerNameAttr:function(a){this.outputLayerName=a},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",a)},_setDisableExtentAttr:function(a){this._useExtentCheck.set("checked",!a);this._useExtentCheck.set("disabled",a)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_setMapAttr:function(a){this.map=a},_getMapAttr:function(){return this.map},
_handleModeCrumbClick:function(a){a.preventDefault();this._onClose(!0)},_onClose:function(a){this._removePointLayer();a&&(this._save(),this.emit("save",{save:!0}));this.emit("remove-preview-layer");this.emit("close",{save:!a})},_removePointLayer:function(){this.drawnPointLayer&&(this._removeLayer(this.drawnPointLayer,this.inputLayers,this._analysisSelect),this._sourceDrawBtn.deactivate())},_removeLayer:function(a,b,c){this.map.removeLayer(a);k.forEach(b,function(d,e){d===a&&(c.removeOption({value:e+
1,label:b.name}),b.splice(e,1))},this)},_save:function(){},_handleShowCreditsClick:function(a){a.preventDefault();a={};this._form.validate()&&(a.inputLayer=g.toJson(h.constructAnalysisInputLyrObj(this.get("inputLayer"))),a[this.outputName]=g.toJson({serviceProperties:{name:this.get("outputLayerName")}}),this.secondaryOutputNames&&d.mixin(a,this.updateSecondaryOutputNames()),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=g.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,
a).then(d.hitch(this,function(a){this._usageForm.set("content",a);this._usageDialog.show()})))},updateSecondaryOutputNames:function(){var a={};k.forEach(this.secondaryOutputNames,d.hitch(this,function(b){this.get(b)&&(a[b]=g.toJson({serviceProperties:{name:this.get(b).replace(this.unsupportedServiceNameCharacters,"_")}}))}));return a},_validateRFT:function(a){if(a){var b=!1,c=this.analysisGpServer.replace("RasterAnalysisTools/GPServer","RasterRendering/ImageServer/validate");a={renderingRule:a,f:"json"};
this._previewBtnTooltip||(this._previewBtnTooltip=new C({connectId:[this.esriAnalysisPreviewError,this.esriAnalysisPreviewWarning],label:this.i18n.previewError}));return u({url:c,content:a,load:d.hitch(this,function(a){a&&a.renderingRule&&a.renderingRule.isValid&&(b=!0);return b})})}},onValidRFT:function(){this._previewBtnTooltip.label="";this._previewBtn.checked=!0},onInValidRFT:function(){this._previewBtnTooltip.label="\x3cdiv class\x3d'esriAnalysisPreviewErrorToolTip'\x3e"+this.i18n.previewError+
"\x3c/div\x3e";this._previewBtn.checked=!1;this.esriAnalysisPreviewWarning.style.display="none";this.esriAnalysisPreviewError.style.display="block";this.onPreviewLoad()},handleExportImageFailure:function(){this._previewBtnTooltip.label="\x3cdiv class\x3d'esriAnalysisPreviewErrorToolTip'\x3e"+this.i18n.previewWarning+"\x3c/div\x3e";this.esriAnalysisPreviewError.style.display="none";this.esriAnalysisPreviewWarning.style.display="block";this.onPreviewLoad()},onPreviewLoad:function(){this.esriAnalysisPreviewLoading.style.display=
"none"},removePreviewErrors:function(){this.esriAnalysisPreviewError.style.display="none";this.esriAnalysisPreviewWarning.style.display="none"},_handlePreviewBtnClick:function(a){this._form.validate()&&(this._preview?(this._preview=!this._preview,this.onPreviewLoad(),this.removePreviewErrors(),this.emit("hide-preview")):(this.removePreviewErrors(),this.esriAnalysisPreviewLoading.style.display="block",this._validateRFT(this._getRenderingRule()).then(d.hitch(this,function(a){if(this._preview=a)this.onValidRFT(),
this._showPreview();else this.onInValidRFT()}))))},updatePreview:function(){this._preview&&(this.removePreviewErrors(),this._showPreview())},_showPreview:function(){var a=this._getRenderingRule();this.esriAnalysisPreviewLoading.style.display="block";this.emit("show-preview",a)},_getRenderingRule:function(){var a={},b={};this._useRFT?a=this._getRasterFunction():(a.rasterFunction=this._getRasterFunction(),a.rasterFunctionArguments=this._getRasterArguments());return b=g.toJson(a)},_handleSaveBtnClick:function(a){this._form.validate()&&
(a=this.secondaryOutputNames?this._validateSecondaryOutputNames():"done",y(a,d.hitch(this,function(){this._saveBtn.set("disabled",!0);var a=this._webLayerTypeSelect.get("value"),c={},f=this._getJobParameters();if(!E.isDefined(f)){f={};f.rasterFunction=this._getRenderingRule();var e=this._getRasterObject();e&&!this._useRFT&&(f.functionArguments=g.toJson({raster:e}))}f[this.outputName]=g.toJson({serviceProperties:{name:this.get("outputLayerName")}});this.secondaryOutputNames&&d.mixin(f,this.updateSecondaryOutputNames());
f.returnProcessInfo=this.returnProcessInfo;e={};this.showChooseExtent&&!this.get("disableExtent")&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0));f.context=g.toJson(e);c.jobParams=f;if("permanentLayer"===a){c.itemParams={description:this.i18n.itemDescription,tags:n.substitute(this.i18n.itemTags,{layername:this.inputLayer&&this.inputLayer.name,fieldname:f.field||"",valuelayername:f.valuelayername||""}),snippet:this.i18n.itemSnippet};if(a=this._getOutputItemProperties())c.itemParams.text=
a;this.showSelectFolder&&(c.itemParams.folder=this.get("folderId"));c.analysisType=this.analysisType;this.execute(c)}else"dynamicLayer"===a&&this._handleSaveDynamicLayer(f)})))},_handleSaveDynamicLayer:function(a){this.get("inputLayer");this.analysisGpServer.replace("RasterAnalysisTools/GPServer","RasterRendering/ImageServer?viewId\x3d");g.fromJson(a[this.outputName]);a=new q;a.functionName=this._getRasterFunction();a.functionArguments=this._getRasterArguments()},_handleAnalysisLayerChange:function(a){"browse"===
a?this._createBrowseItems({tags:["point"]},this._analysisSelect):(this.inputLayer=this.inputLayers[a],this._updateAnalysisLayerUI(!0))},addPointAnalysisLayer:function(){this._sourceDrawBtn&&(this._sourceDrawBtn.set("map",this.map),this._sourceDrawBtn.on("change",d.hitch(this,this._handleAnalysisPointSelectLayer)))},_handleAnalysisPointSelectLayer:function(a){this.inputLayers&&0!==this.inputLayers.length&&-1!==this.inputLayers.indexOf(a)||(this.drawnPointLayer=a,this.inputLayers.push(a),this.inputLayer=
a,this._analysisSelect.removeOption(this._analysisSelect.getOptions()),h.populateAnalysisLayers(this,"inputLayer","inputLayers"),this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(a){"ApplyRFxTemplate"===this.toolName&&(a&&(this.outputLayerName=this._getOutputRasterLayerName()),this._outputLayerInput.set("value",this.outputLayerName));this.inputLayer&&(this._interpolateToolDescription&&B.set(this._interpolateToolDescription,"innerHTML",n.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),
a&&(this.outputLayerName=this._getOutputRasterLayerName()||n.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name})),this._outputLayerInput.set("value",this.outputLayerName));this._resetUI()},_handleBrowseItemsSelect:function(a,b){a&&a.selection&&h.addAnalysisReadyLayer({item:a.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:this._browsedlg,widget:this},b).always(d.hitch(this,this._updateAnalysisLayerUI,!0))},_validateSecondaryOutputNames:function(a){var b=
new v;this.getUserProfile().then(d.hitch(this,function(a){var c=[],e=!0,g=this.portalUrl+"/sharing/rest/portals/"+a.orgId+"/isServiceNameAvailable";k.forEach(this.secondaryOutputNames,d.hitch(this,function(a){this.get(a)&&(a={name:this.get(a).replace(this.unsupportedServiceNameCharacters,"_"),type:"Image Service",f:"json"},c.push(u({url:g,content:a})))}));x(c).then(d.hitch(this,function(a){k.forEach(a,d.hitch(this,function(a,c){a.available||(e=!1,this.emit("job-fail",{message:this.i18n.servNameExists,
type:"warning",messageCode:"AB_0002"}),b.reject())}));e&&b.resolve()}))}));return b.promise},_buildUI:function(){var a=!0;this._loadConnections();this.signInPromise.then(d.hitch(this,h.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer,analysisMode:"raster"}));if(this.rasterFunction){var b=this._getReRunRFxArgs(this.rasterFunction,this._findDeepestArgsForRerun);b&&d.mixin(this,b)}this.functionArguments&&this.functionArguments.Raster&&this.set("inputLayer",this.functionArguments.Raster);
this.get("showSelectAnalysisLayer")&&(this.inputLayers&&this.inputLayer&&!h.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),h.populateAnalysisLayers(this,"inputLayer","inputLayers"));h.addReadyToUseLayerOption(this,[this._analysisSelect]);this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),a=!1);(this.inputLayer||"ApplyRFxTemplate"===
this.toolName)&&this._updateAnalysisLayerUI(a);m.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(d.hitch(this,function(a){this.folderStore=a;h.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}));this._chooseLayerTypeRow&&(m.set(this._chooseLayerTypeRow,"display",!0===this.showSelectLayerType?
"block":"none"),a=new w({data:[{name:this.i18n.permanentLayer,id:"permanentLayer"},{name:this.i18n.dynamicLayer,id:"dynamicLayer"}]}),this._webLayerTypeSelect.set("store",a),this._webLayerTypeSelect.set("value","permanentLayer"));m.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none");m.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");this.inputLayer&&this.inputLayer.drawnLayer&&this._sourceDrawBtn&&this._sourceDrawBtn.set("pointFeatureLayer",
this.inputLayer);this._setDefaultInputs()},_loadConnections:function(){this.on("start",d.hitch(this,"_onClose",!1));this._connect(this._closeBtn,"onclick",d.hitch(this,"_onClose",!0))},_connect:function(a,b,c){this._pbConnects.push(t.connect(a,b,c))}});z("extend-esri")&&d.setObject("dijit.analysis.RasterAnalysisMixin",l,D);return l});