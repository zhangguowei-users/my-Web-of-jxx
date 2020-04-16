// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/sections/dynamicSettings/SectionDynamicSettings","dojo/_base/declare dojo/aspect dojo/dom-construct dijit/_WidgetBase dijit/_TemplatedMixin ./chart/ChartSettings ./locator/LocatorSettings ./areaDetails/AreaDetailsSettings ./comparison/ComparisonSettings ./dynamicInfographic/DynamicInfographicSettings ./map/MapSettings".split(" "),function(e,d,c,f,g,h,k,l,m,n,p){return e([f,g],{templateString:"\x3cdiv class\x3d'esriGEReportPlayer_sectionDynamicSettings'\x3e\x3c/div\x3e",
chartSettings:null,locatorSettings:null,areaDetailsSettings:null,comparisonSettings:null,dynamicInfographicSettings:null,mapSettings:null,_chartSettingsWidget:null,_locatorSettingsWidget:null,_areaDetailsSettingsWidget:null,_comparisonSettingsWidget:null,_dynamicInfographicSettingsWidget:null,_mapSettingsWidget:null,postCreate:function(){this._tryInitChartSettings();this._tryInitLocatorSettings();this._tryInitAreaDetailsSettings();this._tryInitComparisonSettings();this._tryInitDynamicInfographicSettings();
this._tryInitMapSettings()},_tryInitChartSettings:function(){function a(){b._chartSettingsWidget.setNumAreas(b.chartSettings.getNumAreasTotal(),b.chartSettings.getNumAreasShown())}var b=this;this.chartSettings&&(this._chartSettingsWidget=(new h({onSortChart:this.onSortChart.bind(this),onChartToTable:this.onChartToTable.bind(this),onTableToChart:this.onTableToChart.bind(this),onCalcStateChanged:this.onCalcStateChanged.bind(this),onFilterRangesChanged:this.onChartFilterChanged.bind(this)})).placeAt(c.create("div",
{"class":"sectionDynamicSettings_row"},this.domNode)),this.own(this._chartSettingsWidget),this._chartSettingsWidget.setSortingOptions(this.chartSettings.sortingOptions,this.chartSettings.sorting),this._chartSettingsWidget.setViewOptions(this.chartSettings.canViewTable),this._chartSettingsWidget.setToggleCalcStateOptions(this.chartSettings.group),this._chartSettingsWidget.setFilterRanges(this.chartSettings.filterRanges),a(),this.own(d.after(this.chartSettings,"onContentUpdated",a)))},_tryInitLocatorSettings:function(){function a(){b._locatorSettingsWidget.setNumPoints(b.locatorSettings.getNumPointsTotal(),
b.locatorSettings.getNumPointsShown())}var b=this;this.locatorSettings&&(this._locatorSettingsWidget=(new k({onLocatorFilterChanged:this.onLocatorFilterChanged.bind(this)})).placeAt(c.create("div",{"class":"sectionDynamicSettings_row"},this.domNode)),this.own(this._locatorSettingsWidget),this._locatorSettingsWidget.setFilterRanges(this.locatorSettings.filterRanges),a(),this.own(d.after(this.locatorSettings,"onContentUpdated",a)))},_tryInitAreaDetailsSettings:function(){function a(){b._areaDetailsSettingsWidget.setNumItems(b.areaDetailsSettings.getNumItemsTotal(),
b.areaDetailsSettings.getNumItemsShown())}var b=this;this.areaDetailsSettings&&(this._areaDetailsSettingsWidget=(new l({onAreaDetailsFilterChanged:this.onAreaDetailsFilterChanged.bind(this)})).placeAt(c.create("div",{"class":"sectionDynamicSettings_row"},this.domNode)),this.own(this._areaDetailsSettingsWidget),a(),this.own(d.after(this.areaDetailsSettings,"onContentUpdated",a)))},_tryInitComparisonSettings:function(){function a(){b._comparisonSettingsWidget.setNumAreas(b.comparisonSettings.getNumAreasTotal(),
b.comparisonSettings.getNumAreasShown())}var b=this;this.comparisonSettings&&(this._comparisonSettingsWidget=(new m({onShowChart:this.onShowChart.bind(this),onComparisonFilterChanged:this.onComparisonFilterChanged.bind(this)})).placeAt(c.create("div",{"class":"sectionDynamicSettings_row"},this.domNode)),this.own(this._comparisonSettingsWidget),this._comparisonSettingsWidget.setSettings(this.comparisonSettings),a(),this.own(d.after(this.comparisonSettings,"onContentUpdated",a)))},_tryInitDynamicInfographicSettings:function(){function a(){b._dynamicInfographicSettingsWidget.setNumAreas(b.dynamicInfographicSettings.getNumAreasTotal(),
b.dynamicInfographicSettings.getNumAreasShown())}var b=this;this.dynamicInfographicSettings&&(this._dynamicInfographicSettingsWidget=(new n({onDynamicInfographicFilterChanged:this.onDynamicInfographicFilterChanged.bind(this)})).placeAt(c.create("div",{"class":"sectionDynamicSettings_row"},this.domNode)),this.own(this._dynamicInfographicSettingsWidget),this._dynamicInfographicSettingsWidget.setSettings(this.dynamicInfographicSettings),a(),this.own(d.after(this.dynamicInfographicSettings,"onContentUpdated",
a)))},updateDynamicInfographicSettings:function(a){if(this.dynamicInfographicSettings){var b=this._dynamicInfographicSettingsWidget.domNode.parentNode;this._dynamicInfographicSettingsWidget.destroy();c.destroy(b);this.dynamicInfographicSettings=a;this._tryInitDynamicInfographicSettings()}},_tryInitMapSettings:function(){this.mapSettings&&(this._mapSettingsWidget=(new p({onLegendVisibilityChanged:this.onLegendVisibilityChanged.bind(this)})).placeAt(c.create("div",{"class":"sectionDynamicSettings_row"},
this.domNode)),this.own(this._mapSettingsWidget),this._mapSettingsWidget.setLegendVisible(this.mapSettings.showLegend))},setVisualState:function(a){this._chartSettingsWidget&&this._chartSettingsWidget.setVisualState(a);this._locatorSettingsWidget&&this._locatorSettingsWidget.setVisualState(a);this._areaDetailsSettingsWidget&&this._areaDetailsSettingsWidget.setVisualState(a);this._comparisonSettingsWidget&&this._comparisonSettingsWidget.setVisualState(a);this._dynamicInfographicSettingsWidget&&this._dynamicInfographicSettingsWidget.setVisualState(a);
this._mapSettingsWidget&&this._mapSettingsWidget.setVisualState(a)},onSortChart:function(a){},onChartToTable:function(){},onTableToChart:function(){},onCalcStateChanged:function(a){},onChartFilterChanged:function(a){},onLocatorFilterChanged:function(a){},onAreaDetailsFilterChanged:function(a){},onShowChart:function(a){},onComparisonFilterChanged:function(a){},onDynamicInfographicFilterChanged:function(a){},onLegendVisibilityChanged:function(a){},onClosePopup:function(){}})});