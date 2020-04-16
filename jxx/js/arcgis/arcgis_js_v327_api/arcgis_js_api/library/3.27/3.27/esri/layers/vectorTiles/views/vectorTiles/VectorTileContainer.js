// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/VectorTileContainer","require exports ../../core/tsSupport/extendsHelper dojo/has ../../core/promiseUtils ../../core/libs/gl-matrix/mat4 ../../core/libs/gl-matrix/vec3 ../2d/engine/Container ../2d/engine/webgl/enums ../2d/engine/webgl/WGLPainter ./GeometryUtils ./renderers/Renderer".split(" "),function(y,z,p,q,r,l,n,t,u,v,w,x){return function(m){function f(){var a=m.call(this)||this;a.isInitialized=!1;a._displayWidth=0;a._displayHeight=0;a._pointToCallbacks=
new Map;a._tileCoordinateScale=n.create();a._orientationVec=n.create();a._displayScale=n.create();a._orientationVec.set([0,0,1]);a._defaultTransform=l.create();return a}p(f,m);f.prototype.initialize=function(a,g,b,d){this._renderer=new x;this._renderer.initialize(a,g);this._tileInfoView=d;this._tileInfo=b;this.isInitialized=!0};f.prototype.destroy=function(){this._renderer&&(this._renderer.dispose(),this._renderer=null)};f.prototype.hittest=function(a,g){var b=this,d=[a,g];return r.create(function(a,
e){b._pointToCallbacks.set(d,{resolve:a,reject:e});b.requestRender()},function(){b._pointToCallbacks.has(d)&&b._pointToCallbacks.delete(d)})};f.prototype.prepareChildrenRenderParameters=function(a){var g=a.state;if(!g||!this._tileInfo||!this.isInitialized)return a;a.displayLevel=this._tileInfo.scaleToZoom(g.scale);a.requiredLevel=this._tileInfoView.getSmallestInfoForScale(g.scale).level;a.renderer=this._renderer;return a};f.prototype.renderChildren=function(a){var g=this;if(0!==this.children.length&&
this.isInitialized&&a&&a.state){var b=v.default.toWGLDrawPhases(a.drawPhase);if(!(0<b.length&&b[0]===u.WGLDrawPhase.LABEL)){this.sortChildren(function(a,b){return a.key.level-b.key.level});for(var b=this.children.length,d=1;d<=b;d++){var h=this.children[d-1];h.attached&&(h.stencilData.reference=d,h.stencilData.mask=255)}this._updateTilesTransform(a.state,this._tileInfoView.getSmallestInfoForScale(a.state.scale).level,this.children);b=a.context;b.setDepthWriteEnabled(!0);this._renderer.setStateParams(a.state,
a.pixelRatio,a.displayLevel);this._renderer.drawClippingMasks(b,this.children);b.setStencilWriteMask(0);b.setBlendFunctionSeparate(1,771,1,771);b.setStencilOp(7680,7680,7681);b.setDepthFunction(515);b.setBlendingEnabled(!1);b.setStencilTestEnabled(!0);b.setDepthTestEnabled(!0);b.setDepthWriteEnabled(!0);a.drawphase=0;m.prototype.renderChildren.call(this,a);b.setDepthWriteEnabled(!1);b.setBlendingEnabled(!0);a.drawphase=1;m.prototype.renderChildren.call(this,a);a.drawphase=2;m.prototype.renderChildren.call(this,
a);b.setStencilTestEnabled(!1);b.setDepthTestEnabled(!1);if(q("esri-vector-tiles-debug"))for(d=0,h=this.children;d<h.length;d++){var e=h[d];e.attached&&e.visible&&this._renderer.renderTileInfo(b,e)}0<this._pointToCallbacks.size&&(this._pointToCallbacks.forEach(function(b,c){b.resolve(g._hitTest(a,c[0],c[1]))}),this._pointToCallbacks.clear());this._renderer.needsRedraw()&&this.requestRender()}}};f.prototype.removeAllChildren=function(){for(var a=0;a<this.children.length;a++)this.children[a].dispose();
m.prototype.removeAllChildren.call(this)};f.prototype._hitTest=function(a,g,b){var d=this._tileInfoView.getClosestInfoForScale(a.state.scale).level,h=[0,0];a.state.toMap(h,[g,b]);var e=a.state.clone(),f=e.viewpoint.clone(),c=f.targetGeometry;c.x=h[0];c.y=h[1];f.targetGeometry=c;e.viewpoint=f;e.size=[3,3];this._renderer.setStateParams(e,a.pixelRatio,a.displayLevel);return(a=this._renderer.hitTest({drawPhase:0,pixelRatio:a.pixelRatio,stationary:a.stationary,opacity:a.opacity,context:a.context,displayLevel:a.displayLevel,
requiredLevel:a.requiredLevel,renderer:a.renderer,layerOpacity:a.layerOpacity,state:e,drawphase:3,painter:null},g,b,this.children,d,3,this._updateTilesTransform.bind(this)))&&0!==a.length?a[0]:null};f.prototype._updateTilesTransform=function(a,g,b){var d=1/a.width,f=1/a.height,e=[0,0];this._calculateRelativeViewProjMat(this._tileInfo.lodAt(g).resolution,a.resolution,a.rotation,this._tileInfo.size[1],4096,a.width,a.height,this._defaultTransform);for(var k=0;k<b.length;k++){var c=b[k];a.toScreen(e,
c.coords);e[1]=a.height-e[1];c.tileTransform.displayCoord[0]=2*e[0]*d-1;c.tileTransform.displayCoord[1]=2*e[1]*f-1;c.key.level===g&&4096===c.coordRange?c.tileTransform.transform.set(this._defaultTransform):this._calculateRelativeViewProjMat(this._tileInfo.lodAt(c.key.level).resolution,a.resolution,a.rotation,this._tileInfo.size[1],c.coordRange,a.width,a.height,c.tileTransform.transform)}};f.prototype._calculateRelativeViewProjMat=function(a,f,b,d,h,e,k,c){var g=.125;512!==d&&4096!==h&&(g=d/h);a=a/
f*g;this._tileCoordinateScale.set([a,a,1]);if(e!==this._displayWidth||k!==this._displayHeight)this._displayScale.set([2/e,-2/k,1]),this._displayWidth=e,this._displayHeight=k;l.identity(c);l.scale(c,c,this._tileCoordinateScale);l.rotate(c,c,-b*w.C_DEG_TO_RAD,this._orientationVec);l.scale(c,c,this._displayScale);l.transpose(c,c)};return f}(t)});