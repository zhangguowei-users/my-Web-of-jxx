// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/geometry/support/spatialReferenceUtils",["require","exports","./WKIDUnitConversion"],function(d,c,g){function f(a){return a.wkid&&!0===h[a.wkid]}Object.defineProperty(c,"__esModule",{value:!0});var h={102113:!0,102100:!0,3857:!0,3785:!0},k={102113:!0,102100:!0,3857:!0,3785:!0,4326:!0};d=[-2.0037508342788905E7,2.0037508342788905E7];var e=[-2.0037508342787E7,2.0037508342787E7],l={102113:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',
valid:d,origin:e,dx:1E-5},102100:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',valid:d,origin:e,
dx:1E-5},3785:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',valid:d,origin:e,dx:1E-5},3857:{wkTemplate:'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',
valid:d,origin:e,dx:1E-5},4326:{wkTemplate:'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",{Central_Meridian}],UNIT["Degree",0.0174532925199433]]',altTemplate:'PROJCS["WGS_1984_Plate_Carree",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Plate_Carree"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",{Central_Meridian}],UNIT["Degrees",111319.491]]',
valid:[-180,180],origin:[-180,180],dx:1E-5}};c.equals=function(a,b){if(b){if(a===b)return!0;if(null!=a.wkid||null!=b.wkid)return a.wkid===b.wkid||f(a)&&f(b)||null!=b.latestWkid&&a.wkid===b.latestWkid||null!=a.latestWkid&&b.wkid===a.latestWkid;if(a.wkt&&b.wkt)return a.wkt.toUpperCase()===b.wkt.toUpperCase()}return!1};c.getInfo=function(a){return a.wkid?l[a.wkid]:null};c.isGeographic=function(a){return a.wkid?null==g[a.wkid]:a.wkt?!!/^\s*GEOGCS/i.test(a.wkt):!1};c.isWGS84=function(a){return 4326===
a.wkid};c.isWebMercator=f;c.isWrappable=function(a){return a.wkid&&!0===k[a.wkid]}});