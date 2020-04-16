// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/supportClasses/PlayerConfigurator","../PlayerResizeModes ../PlayerZoomBehaviors ../PlayerThemes ../PlayerViewModes ../config esri/dijit/geoenrichment/utils/DeviceUtil".split(" "),function(b,d,f,c,g,h){var e={configurePlayer:function(a){h.isMobileDevice()?e._configureMobile(a):e._configurePC(a)},_configureMobile:function(a){a.allowAutoOrientation&&(a.viewMode=h.isLandscape()?a.mobileLandscapeViewMode||c.PANELS_IN_SLIDES:c.PANELS_IN_STACK);a.theme=a.theme||
f.DARK;a.viewMode=c.isMobileSupported(a.viewMode)?a.viewMode:c.PANELS_IN_STACK;a.resizeMode=a.resizeMode||b.FIT_WINDOW;a.enableDataDrilling=!1!==a.enableDataDrilling;a.showAreaTitle=!1;a.showToolbarInPopup=!0;a.defaultZoomBehavior=a.viewMode===c.PANELS_IN_STACK?d.FIT_PAGE_WIDTH:a.viewMode===c.PANELS_IN_ROW?d.FIT_PAGE_HEIGHT:void 0;a.showDataDrillingInsidePanel=!1;a.scaleSlidesToFitWindow=a.viewMode===c.PANELS_IN_SLIDES;for(var e in g.modules)g.modules[e]=!1},_configurePC:function(a){a.theme=a.theme||
f.DARK;a.viewMode=a.viewMode||c.FULL_PAGES;a.resizeMode=a.resizeMode||b.FIT_WINDOW;a.showToolbarInPopup=!!a.showToolbarInPopup;a.enableDataDrilling=!1!==a.enableDataDrilling;a.showDataDrillingInsidePanel=!!a.showDataDrillingInsidePanel;switch(a.viewMode){case c.FULL_PAGES:e._configurePC_fullPages(a);break;case c.PANELS_IN_SLIDES:e._configurePC_panelsInSlides(a);break;case c.PANELS_IN_STACK:e._configurePC_panelsInStack(a);break;case c.PANELS_IN_ROW:e._configurePC_panelsInRow(a)}},_configurePC_fullPages:function(a){a.showAreaTitle=
!1!==a.showAreaTitle;a.scaleSlidesToFitWindow=!1;switch(a.resizeMode){case b.FIT_WINDOW:a.defaultZoomBehavior=a.defaultZoomBehavior||d.FIT_PAGE;break;case b.AUTO:a.defaultZoomBehavior=d.RESET;break;case b.MANUAL:a.defaultZoomBehavior=a.defaultZoomBehavior||d.FIT_PAGE}},_configurePC_panelsInSlides:function(a){a.showAreaTitle=!!a.showAreaTitle;a.defaultZoomBehavior=null;switch(a.resizeMode){case b.FIT_WINDOW:a.scaleSlidesToFitWindow=!1!==a.scaleSlidesToFitWindow;break;case b.AUTO:a.scaleSlidesToFitWindow=
!1;break;case b.MANUAL:a.scaleSlidesToFitWindow=!1!==a.scaleSlidesToFitWindow}},_configurePC_panelsInStack:function(a){a.showAreaTitle=!!a.showAreaTitle;a.scaleSlidesToFitWindow=!1;switch(a.resizeMode){case b.FIT_WINDOW:a.defaultZoomBehavior=d.FIT_PAGE_WIDTH;break;case b.AUTO:a.defaultZoomBehavior=d.RESET;break;case b.MANUAL:a.defaultZoomBehavior=d.FIT_PAGE_WIDTH}},_configurePC_panelsInRow:function(a){a.showAreaTitle=!!a.showAreaTitle;a.scaleSlidesToFitWindow=!1;switch(a.resizeMode){case b.FIT_WINDOW:a.defaultZoomBehavior=
d.FIT_PAGE_HEIGHT;break;case b.AUTO:a.defaultZoomBehavior=d.RESET;break;case b.MANUAL:a.defaultZoomBehavior=d.FIT_PAGE_HEIGHT}}};return e});