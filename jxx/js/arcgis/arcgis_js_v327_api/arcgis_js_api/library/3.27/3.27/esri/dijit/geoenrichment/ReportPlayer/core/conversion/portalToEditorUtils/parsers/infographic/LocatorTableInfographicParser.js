// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/conversion/portalToEditorUtils/parsers/infographic/LocatorTableInfographicParser",["../../../../sections/SectionTypes","../../../ConversionUtil"],function(h,f){return{portalToEditor:function(b,a){var d,c,e;b.tags.forEach(function(a){a.attributes.type===h.INFOGRAPHIC_HEADER?d=a:a.attributes.query&&(c?e=a:c=a)});var g=a.templateJson.metadata.locatorCalculatorsHash[e.attributes.query];return g.isValid?{type:b.attributes.type,scaleToFitHeight:b.attributes.scaleToFitHeight,
showNumberOfLocations:b.attributes.showNumberOfLocations,calculatorName:c.attributes.query,style:{width:f.ptToPx(b.attributes.width),height:f.ptToPx(b.attributes.height)},titleSectionJson:d&&a.parsers.getParser("section").parseSection(d,a),headerSectionJson:a.parsers.getParser("section").parseSection(c,a),dataSectionJson:a.parsers.getParser("section").parseSection(e,a),locatorCalculatorInfo:g}:null}}});