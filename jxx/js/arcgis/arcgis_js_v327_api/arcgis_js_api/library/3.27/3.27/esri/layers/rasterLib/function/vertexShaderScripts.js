// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/layers/rasterLib/function/vertexShaderScripts",[],function(){return{basic:"varying vec2 v_texCoord;\nattribute vec2 a_texCoord;\nuniform vec2 u_xformOffset;\nuniform vec2 u_xformScale;\nuniform bool u_flipY;\nvoid main() {\nv_texCoord \x3d u_xformOffset + a_texCoord * u_xformScale;\nif (u_flipY) {\nv_texCoord.t \x3d 1.0 - v_texCoord.t;\n}\nvec2 position \x3d a_texCoord * 2.0 - 1.0;\ngl_Position \x3d vec4(position, 0.0, 1.0);\n}",histogram:"attribute float a_pixelIndex;\nuniform sampler2D u_image;\nuniform sampler2D u_image1;\nuniform sampler2D u_image2;\nuniform vec2 u_sourceDim;\nuniform vec2 u_halfPixel;\nuniform vec4 u_bandSelection;\nuniform vec4 u_mins;\nuniform vec4 u_factors;\nuniform float u_size;\nuniform int u_bandCount;\nuniform bool u_minMaxTexture;\nvoid main() {\nfloat row \x3d a_pixelIndex/u_sourceDim.s;\nvec2 coord \x3d vec2(fract(row), floor(row)/u_sourceDim.t);\nvec4 pv \x3d texture2D(u_image, coord + u_halfPixel);\nvec4 minVal, maxVal, pvm;\nif (u_minMaxTexture){\nif (u_bandCount \x3d\x3d1){ //min \x3d red, max \x3d green\nvec4 minmax \x3d texture2D(u_image1, vec2(0.5,0.5));\nminVal \x3d vec4(minmax.r, minmax.r, minmax.r, 0.0);\nmaxVal \x3d vec4(minmax.g, minmax.g, minmax.g, 0.0);\n}\nelse if (u_bandCount \x3d\x3d3){ //min \x3d red, max \x3d green\nminVal \x3d texture2D(u_image1, vec2(0.5,0.5));\nmaxVal \x3d texture2D(u_image2, vec2(0.5,0.5));\n}\nvec4 factors \x3d u_size/(maxVal-minVal+vec4(0.0,0.0,0.0,1.0)) * u_factors;\npvm \x3d (pv - minVal) * factors;\n}\nelse {\npvm \x3d (pv - u_mins) * u_factors;\n}\nfloat histVal \x3d min(floor(pvm.r+pvm.g+pvm.b), u_size-1.0);\nhistVal \x3d pv.a \x3d\x3d 1.0? histVal: u_size;\ngl_Position \x3d vec4((histVal+0.1) / (u_size+1.0) * 2.0 - 1.0, 0.5, 0, 1);\ngl_PointSize \x3d 1.0;\n}",
mesh:"varying vec2 v_texCoord;\nattribute vec2 a_texCoord;\nuniform vec2 u_xformOffset;\nuniform vec2 u_xformScale;\nuniform bool u_projection;\nuniform vec2 u_xformGrid[400];\nuniform vec2 u_meshSize;\nuniform bool u_drawMeshLines;\nuniform bool u_flipY;\nint getOffsetIndex(vec2 indexPos){\nint i \x3d int(indexPos.s*(u_meshSize.s+1.0)+indexPos.y+0.001);\nint maxIndex \x3d int((u_meshSize.s+1.0) * (u_meshSize.t+1.0) -1.0);\nreturn i\x3emaxIndex ? maxIndex:i;\n}\nvoid main() {\nif (u_projection) {\nvec2 index_ul \x3d floor(a_texCoord*u_meshSize);\nvec2 index_ur \x3d floor(a_texCoord*u_meshSize) + vec2(0.0, 1.0);\nvec2 index_ll \x3d floor(a_texCoord*u_meshSize) + vec2(1.0, 0.0);\nvec2 index_lr \x3d floor(a_texCoord*u_meshSize) + vec2(1.0, 1.0);\nvec2 weight \x3d fract(a_texCoord*u_meshSize);\nvec2 offset_ul \x3d u_xformGrid[getOffsetIndex(index_ul)];\nvec2 offset_ur \x3d u_xformGrid[getOffsetIndex(index_ur)];\nvec2 offset_ll \x3d u_xformGrid[getOffsetIndex(index_ll)];\nvec2 offset_lr \x3d u_xformGrid[getOffsetIndex(index_lr)];\nv_texCoord \x3d (offset_ul * (1.0 - weight) + offset_ur * vec2(1.0-weight.s,weight.t) + offset_ll * vec2(weight.s,1.0- weight.t) + offset_lr * weight)/2.0;\n}\nelse {\nv_texCoord \x3d u_xformOffset + a_texCoord * u_xformScale;\n}\nif (u_flipY) {\nv_texCoord.t \x3d 1.0 - v_texCoord.t;\n}\nvec2 position \x3d a_texCoord * 2.0 - 1.0;\nif (u_drawMeshLines){\nvec2 adjustedPos \x3d (v_texCoord - u_xformOffset) / u_xformScale;\ngl_Position \x3d vec4( adjustedPos * 2.0 - 1.0, 0.0, 1.0);\n}\nelse {\ngl_Position \x3d vec4(position, 0.0, 1.0);\n}\n}"}});