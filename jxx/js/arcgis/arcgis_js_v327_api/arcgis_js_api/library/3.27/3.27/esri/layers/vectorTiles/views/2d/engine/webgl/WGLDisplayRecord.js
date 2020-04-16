// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/WGLDisplayRecord",["require","exports","../../../../core/Logger","./MeshData"],function(q,r,n,l){var p=n.getLogger("esri/views/2d/engine/webgl/WGLDisplayRecord");return function(){function b(a,c,h){this.id=a;this.geometryType=c;this._materialInfo=h;this.meshData=null;this.indexCount=this.indexFrom=this.vertexCount=this.vertexFrom=this.zOrder=this.symbolLevel=0}Object.defineProperty(b.prototype,"sortKey",{get:function(){void 0===this._sortKey&&
this._computeSortKey();return this._sortKey},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"materialInfo",{get:function(){return"number"===typeof this._materialInfo?(p.warn("Tried to read materialInfo, but found an index! Was materialInfo deserialized correctly?"),null):this._materialInfo},set:function(a){this._materialInfo=a},enumerable:!0,configurable:!0});b.prototype.copy=function(){var a=new b(this.id,this.geometryType,this._materialInfo);a.vertexFrom=this.vertexFrom;a.vertexCount=
this.vertexCount;a.indexFrom=this.indexFrom;a.indexCount=this.indexCount;a.zOrder=this.zOrder;a.symbolLevel=this.symbolLevel;a.meshData=this.meshData;return a};b.prototype.setMeshDataFromBuffers=function(a,c,h){var f=new l,b;for(b in c){for(var g=c[b].stride,e=c[b].data,m=[],d=0;d<g*a.vertexCount/4;++d)m[d]=e[d+g*a.vertexFrom/4];f.vertexData.set(b,m)}for(d=f.indexData.length=0;d<a.indexCount;++d)f.indexData[d]=h[d+a.indexFrom]-a.vertexFrom;f.vertexCount=a.vertexCount;this.meshData=f};b.prototype.readMeshDataFromBuffers=
function(a,c){this.meshData?this.meshData.clear():this.meshData=new l;for(var b in a){for(var f=a[b].stride,k=a[b].data,g=[],e=0;e<f*this.vertexCount/4;++e)g[e]=k[e+f*this.vertexFrom/4];this.meshData.vertexData.set(b,g)}for(e=this.meshData.indexData.length=0;e<this.indexCount;++e)this.meshData.indexData[e]=c[e+this.indexFrom]-this.vertexFrom;this.meshData.vertexCount=this.vertexCount};b.prototype.writeMeshDataToBuffers=function(a,c,b,f){for(var k in c)for(var g=c[k].stride,e=this.meshData.vertexData.get(k),
h=c[k].data,d=0;d<g*this.meshData.vertexCount/4;++d)h[d+g*a/4]=e[d];for(d=0;d<this.meshData.indexData.length;++d)f[d+b]=this.meshData.indexData[d]+a;this.vertexFrom=a;this.vertexCount=this.meshData.vertexCount;this.indexFrom=b;this.indexCount=this.meshData.indexData.length};b.writeAllMeshDataToBuffers=function(a,b,h){for(var c=0,k=0,g=0;g<a.length;g++){var e=a[g];e.writeMeshDataToBuffers(c,b,k,h);c+=e.vertexCount;k+=e.indexCount}};b.prototype._computeSortKey=function(){this._sortKey=(this.symbolLevel&
31)<<12|(this.zOrder&127)<<4|this.geometryType&7};b.prototype.serialize=function(a){a.writeInt32(this.geometryType);a.writeInt32(this._materialInfo);a.writeInt32(this.symbolLevel);a.writeInt32(this.zOrder);a.writeInt32(this.vertexFrom);a.writeInt32(this.vertexCount);a.writeInt32(this.indexFrom);a.writeInt32(this.indexCount);return a};b.deserialize=function(a,c){var h=a.readInt32(),f=c.store&&c.store.get(a.readInt32())||a.readInt32();c=new b(c.id,h,f);c.symbolLevel=a.readInt32();c.zOrder=a.readInt32();
c.vertexFrom=a.readInt32();c.vertexCount=a.readInt32();c.indexFrom=a.readInt32();c.indexCount=a.readInt32();return c};return b}()});