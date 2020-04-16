// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/renderers/LineRenderer","require exports ../../../core/libs/gl-matrix/mat4 ../../../core/libs/gl-matrix/vec2 ../../../core/libs/gl-matrix/vec3 ../../../core/libs/gl-matrix/vec4 ../GeometryUtils ./rendererUtils ./vtShaderSnippets ../../webgl/ShaderVariations ../../webgl/VertexArrayObject".split(" "),function(F,G,w,y,z,A,B,C,D,E,u){return function(){function n(){this._attributeLocations={a_pos:0,a_offsetAndNormal:1,a_accumulatedDistance:2};this._attributeLocationsDD=
{a_pos:0,a_offsetAndNormal:1,a_accumulatedDistance:2,a_color:3,a_width:4};this._initialized=!1;this._viewProjMat=w.create();this._offsetVector=z.create();this._color=A.create();this._dashArray=y.create()}n.prototype.dispose=function(){};n.prototype.render=function(c,d,b,f,l,q,e,p,n,x,a){if(0!==d.triangleElementCount){this._initialized||this._initialize(c);var r=q.tileTransform.transform,v=q.coordRange/512,g=e.getPaintValue("line-translate",b);if(0!==g[0]||0!==g[1]){w.copy(this._viewProjMat,q.tileTransform.transform);
var r=g[0],g=g[1],m=0,h=0,h=(1<<q.key.level)/Math.pow(2,b)*v;l=l.rotation;if(1===e.getPaintValue("line-translate-anchor",b)){m=-B.C_DEG_TO_RAD*l;l=Math.sin(m);var k=Math.cos(m),m=h*(r*k-g*l),h=h*(r*l+g*k)}else m=h*r,h*=g;this._offsetVector[0]=m;this._offsetVector[1]=h;this._offsetVector[2]=0;w.translate(this._viewProjMat,this._viewProjMat,this._offsetVector);r=this._viewProjMat}g=e.getPaintValue("line-pattern",b);h=void 0!==g;x=1/x;l=e.getPaintValue("line-blur",b);var k=e.hasDataDrivenColor?[1,1,
1,1]:e.getPaintValue("line-color",b),u=e.hasDataDrivenOpacity?1:e.getPaintValue("line-opacity",b),m=e.hasDataDrivenWidth?1:e.getPaintValue("line-width",b);a*=u*k[3];this._color[0]=a*k[0];this._color[1]=a*k[1];this._color[2]=a*k[2];this._color[3]=a;a=e.hasDataDrivenLine;f=3===f;var t;f&&(t=C.int32To4Bytes(d.layerID));if(k=this._getLineVAO(c,q,a)){c.bindVAO(k);a=this._shaderVariations.getProgram([h,a,f],void 0,void 0,a?this._attributeLocationsDD:this._attributeLocations);c.bindProgram(a);a.setUniformMatrix4fv("u_transformMatrix",
r);a.setUniformMatrix4fv("u_extrudeMatrix",n);a.setUniform2fv("u_normalized_origin",q.tileTransform.displayCoord);a.setUniform1f("u_depth",e.z);a.setUniform1f("u_blur",l);a.setUniform1f("u_antialiasing",x);a.setUniform4fv("u_color",this._color);a.setUniform1f("u_width",m);f&&a.setUniform4f("u_id",t[0],t[1],t[2],t[3]);if(h){if(b=p.getMosaicItemPosition(g,!0))p.bind(c,9729,b.page,1),a.setUniform2f("u_pattern_tl",b.tl[0],b.br[1]),a.setUniform2f("u_pattern_br",b.br[0],b.tl[1]),a.setUniform2f("u_spriteSize",
v*b.size[0],b.size[1]),a.setUniform1i("u_texture",1)}else p=e.getPaintValue("line-dasharray",b),2>p.length&&(p=[1,-1]),this._dashArray[0]=v*p[0],this._dashArray[1]=v*p[1],a.setUniform2fv("u_dasharray",this._dashArray);c.drawElements(4,d.triangleElementCount,5125,12*d.triangleElementStart);c.bindVAO()}}};n.prototype._initialize=function(c){if(this._initialized)return!0;c=new E("line",["lineVS","lineFS"],[],D,c);c.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN");c.addDefine("DD","DD",[!0,!1],"DD");
c.addDefine("ID","ID",[!0,!0],"ID");this._shaderVariations=c;this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5123,offset:8,stride:12,normalized:!1,divisor:0}]};this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:20,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,
offset:4,stride:20,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5122,offset:8,stride:20,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:20,normalized:!0,divisor:0},{name:"a_width",count:1,type:5126,offset:16,stride:20,normalized:!1,divisor:0}]};return this._initialized=!0};n.prototype._getLineVAO=function(c,d,b){if(b){if(d.lineDDVertexArrayObject)return d.lineDDVertexArrayObject;b=d.lineDDVertexBuffer;var f=d.lineIndexBuffer;if(!b||!f)return null;
d.lineDDVertexArrayObject=new u(c,this._attributeLocationsDD,this._vertexAttributesDD,{geometry:b},f);return d.lineDDVertexArrayObject}if(d.lineVertexArrayObject)return d.lineVertexArrayObject;b=d.lineVertexBuffer;f=d.lineIndexBuffer;if(!b||!f)return null;d.lineVertexArrayObject=new u(c,this._attributeLocations,this._vertexAttributes,{geometry:b},f);return d.lineVertexArrayObject};return n}()});