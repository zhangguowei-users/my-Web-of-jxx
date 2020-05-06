// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/mesh/templates/WGLMarkerTemplate","require exports ../../../../../../core/tsSupport/extendsHelper ../../../../../../core/Logger ../../../../../../core/screenUtils ../../../../../../core/libs/gl-matrix/mat2d ../../../../../../core/libs/gl-matrix/vec2 ../../color ../../definitions ../../enums ../../number ../../WGLDisplayRecord ./WGLMeshTemplate".split(" "),function(u,z,C,D,r,y,v,A,E,w,t,F,G){Object.defineProperty(z,"__esModule",{value:!0});var B=
D.getLogger("esri.views.2d.engine.webgl.WGLMeshTemplate");u=function(u){function d(c,a,b,n,g,h,m,l,f,d,p){var k=u.call(this)||this;k.geometryType=w.WGLGeometryType.MARKER;var e=v.create(),q=y.create(),x=p.sdf?.5:1;y.translate(q,q,new Float32Array([x*b,x*-n]));g&&y.rotate(q,q,3.14159265359/180*g);k._materialStore=c;k.vvFlags=a;k._materialId=c.createSpriteMaterial(p,k.geometryType,a);k._fillColor=h;k._outlineColor=f;k._sizeOutlineWidth=t.i8888to32(m,l,d,0);c=Math.round(p.rect.x/4);a=Math.round(p.rect.y/
4);g=c+Math.round(p.rect.width/4);p=a+Math.round(p.rect.height/4);e.set([-.5*m,-.5*l]);v.transformMat2d(e,e,q);k._offsetAndTexUpperLeft=t.i8888to32(e[0],e[1],c,a);e.set([.5*m,-.5*l]);v.transformMat2d(e,e,q);k._offsetAndTexUpperRight=t.i8888to32(e[0],e[1],g,a);e.set([-.5*m,.5*l]);v.transformMat2d(e,e,q);k._offsetAndTexBottomLeft=t.i8888to32(e[0],e[1],c,p);e.set([.5*m,.5*l]);v.transformMat2d(e,e,q);k._offsetAndTexBottomRight=t.i8888to32(e[0],e[1],g,p);k.height=l;k.width=m;k.xOffset=b;k.yOffset=n;return k}
C(d,u);d.fromPictureMarker=function(c,a,b,n,g){g=Math.round(r.pt2px(b.width));var h=Math.round(r.pt2px(b.height)),m=E.PICTURE_FILL_COLOR,l=Math.round(r.pt2px(b.xoffset||0)),f=Math.round(r.pt2px(b.yoffset||0));return new d(c,a,l,f,b.angle,m,g,h,0,0,n)};d.fromSimpleMarker=function(c,a,b,n,g){g=A.premultiplyAlphaRGBA(b.color);var h=Math.round(r.pt2px(b.size)),m=Math.round(r.pt2px(b.xoffset||0)),l=Math.round(r.pt2px(b.yoffset||0)),f=b.outline,x=(f&&f.color&&A.premultiplyAlphaRGBA(f.color))|0,f=(f&&f.width&&
Math.round(r.pt2px(f.width)))|0;return new d(c,a,m,l,b.angle,g,h,h,x,f,n)};d.prototype.writeMesh=function(c,a,b,n,g,h,m){h=this._materialStore.get(this._materialId);var l=a.indexVector;a=a.get("geometry");var f=new F(n,this.geometryType,this._materialId),d=this._getOffset(a,h);c.push(f);f.vertexFrom=d;f.indexFrom=l.length;switch(b){case "esriGeometryPoint":b=g.geometry;c=b.x;b=b.y;this._writeVertices(f,a,n,this._getPos(c,b),h,m);this._writeIndices(f,l,d);break;case "esriGeometryPolyline":this._writeMany(f,
l,a,d,n,g.geometry.paths[0],h,m);break;case "esriGeometryPolygon":(b=g.centroid)?(c=b.x,b=b.y,this._writeVertices(f,a,n,this._getPos(c,b),h,m),this._writeIndices(f,l,d)):B.error("Tried to render polygon geometries as markers, but found no centroid!");break;case "esriGeometryMultipoint":this._writeMany(f,l,a,d,n,g.geometry.points,h,m);break;default:B.error("Unable to handle geometryType: "+b)}};d.prototype._getPos=function(c,a){return t.i1616to32(c,a)};d.prototype._writeMany=function(c,a,b,d,g,h,m,
l){for(var f=0,n=0,p=0,k=0;k<h.length;k++){var e=h[k],q=e[0],e=e[1];this._writeVertices(c,b,g,this._getPos(q+f,e+n),m,l);this._writeIndices(c,a,d+p);f+=q;n+=e;p+=4}};d.prototype._getOffset=function(c,a){a=a.materialKeyInfo.hasVV()?10:6;return c.length/a};d.prototype._writeVertices=function(c,a,b,d,g,h){a.push(d);a.push(this._offsetAndTexUpperLeft);a.push(b);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);this._writeVV(a,h,g);a.push(d);a.push(this._offsetAndTexUpperRight);
a.push(b);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);this._writeVV(a,h,g);a.push(d);a.push(this._offsetAndTexBottomLeft);a.push(b);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);this._writeVV(a,h,g);a.push(d);a.push(this._offsetAndTexBottomRight);a.push(b);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);this._writeVV(a,h,g);c.vertexCount+=4};d.prototype._writeVV=function(c,a,b){b.materialKeyInfo.hasVV()&&
(c.push(a[w.VVType.SIZE]),c.push(a[w.VVType.COLOR]),c.push(a[w.VVType.OPACITY]),c.push(a[w.VVType.ROTATION]))};d.prototype._writeIndices=function(c,a,b){a.push(b+0);a.push(b+1);a.push(b+2);a.push(b+1);a.push(b+3);a.push(b+2);c.indexCount+=6};return d}(G.default);z.default=u});