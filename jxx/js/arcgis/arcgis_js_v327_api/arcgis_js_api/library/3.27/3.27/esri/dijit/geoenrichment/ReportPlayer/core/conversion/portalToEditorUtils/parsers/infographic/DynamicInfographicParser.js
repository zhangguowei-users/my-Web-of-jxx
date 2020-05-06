// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/parsers/infographic/DynamicInfographicParser",["../../../ConversionUtil","esri/dijit/geoenrichment/ReportPlayer/core/infographics/InfographicTypes","../../../../infographics/utils/InfographicJsonUtil","../_FieldInfoBuilder","esri/dijit/geoenrichment/utils/JsonXmlConverter"],function(e,h,k,f,l){return{portalToEditor:function(a,d){var g=a.attributes.name,c=d.templateJson.metadata.comparisonCalculatorsHash[g],b={type:h.fixTapestryNameToWidget(a.attributes.type),
title:a.attributes.title||"",style:{width:e.ptToPx(a.attributes.width),height:e.ptToPx(a.attributes.height),backgroundColor:a.attributes.backgroundColor},showVerticalAxis:a.attributes.showVerticalAxis};if(c){c.levels&&k.setLevels(b,c.levels);a=l.queryJson(a,"d");b.fieldInfos=a.length?a.map(function(a){return f.getCalculatorOrScriptFieldInfo(a.attributes.f,d,{format:a.attributes.m})}):c.variableObjects.map(function(a){return f.getCalculatorOrScriptFieldInfo(a.templateName,d)});if(b.fieldInfos.some(function(a){return a.isMissing}))return null;
b.calcData={calculatorName:g,variables:b.fieldInfos.map(function(a){return a.fullName})}}else b.variables=a.attributes.dataCollectionID?[a.attributes.dataCollectionID+".*"]:[a.attributes.variableID];return b}}});