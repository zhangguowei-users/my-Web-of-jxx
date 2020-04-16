// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/layers/vectorTiles/views/2d/engine/webgl/shaders/labelShaders.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\x3c!--\r\n  Add your GLSL snippets to this file. You should start from\r\n  importing your old GLSL files. For instance, if you have a\r\n  file such as myShader.vs.glsl you should create a new \x3csnippet name\x3d"myShaderVS"\x3e\r\n  and then copy and paste the GLSL source as the content. You will then convert your\r\n  code to use the {@link esri/views/2d/engine/webgl/glShaderSnippets glShaderSnippets}\r\n  instance to access the GLSL code, instead of importing it directly with require("dojo/text!...").\r\n--\x3e\r\n\x3csnippets\x3e\r\n\r\n  \x3csnippet name\x3d"labelVS"\x3e\r\n  \x3c![CDATA[\r\n    precision mediump float;\r\n\r\n      attribute vec2 a_pos;                  // 2 * 2 (2 x signed 16)\r\n      attribute vec4 a_color;                // 4 (4 x unsigned byte)\r\n      attribute vec2 a_vertexOffset;         // 2 * 2 // (2 x signed 16) offset from the anchor point of the string\r\n      attribute vec4 a_texAndSize;          // 4 (4 x unsigned byte) texture coordinatesm and font size. w is for the halo size\r\n      attribute vec4 a_refSymbolAndPlacementOffset; // 4 (4 x unsigned byte) the offset of the reference symbol of the feature (x,y) and the placement offset (z, w) all given in pixels\r\n\r\n      attribute lowp float  a_visible; // a one byte controlling the visibility of the vertex (a separate visibility buffer), values are 0 or 1 (visible)\r\n\r\n      attribute mediump vec2 a_visibilityRange; // 2 x unsigned byte;\r\n\r\n      // the relative transformation of a vertex given in tile coordinates to a relative normalized coordinate\r\n      // relative to the tile\'s upper left corner\r\n      // the extrusion vector.\r\n      uniform highp mat4 u_transformMatrix;\r\n      // the extrude matrix which is responsible for the \'anti-zoom\' as well as the rotation\r\n      uniform highp mat4 u_extrudeMatrix;\r\n      // u_normalized_origin is the tile\'s upper left corner given in normalized coordinates\r\n      uniform highp vec2 u_normalized_origin;\r\n      // the size of the mosaic given in pixels\r\n      uniform vec2 u_mosaicSize;\r\n      uniform float u_pixelRatio;\r\n\r\n      // the opacity of the layer\r\n      uniform mediump float u_opacity;\r\n\r\n      // the curent zoom\r\n      uniform mediump float u_zoomLevel; // the current zoom level X 10\r\n      uniform lowp float u_mapRotation;\r\n      uniform lowp float u_mapAligned;\r\n\r\n      varying mediump float v_antialiasingWidth;\r\n      varying mediump float v_edgeDistanceOffset;\r\n\r\n      // the interpolated texture coordinate value to be used by the fragment shader in order to sample the sprite texture\r\n      varying mediump vec2 v_tex;\r\n      // the calculated transparency to be applied by the fragment shader. It is incorporating both the fade as well as the\r\n      // opacity of the layer given by the painter\r\n      varying lowp float v_transparency;\r\n\r\n    #ifdef ID\r\n       uniform mediump float u_fadeStep;\r\n       varying mediump float v_fadeStep;\r\n    #else\r\n       varying mediump vec4 v_color;\r\n    #endif // ID\r\n\r\n      // the vertex offsets are given in integers, therefore in order to maintain a reasonable precission we multiply the values\r\n      // by 16 and then at the shader devide by the same number\r\n      const float offsetPrecision \x3d 1.0 / 8.0;\r\n      const float outlineScale \x3d 1.0 / 10.0;\r\n      const float sdfFontSize \x3d 24.0;\r\n\r\n      // maximum SDF distance of 8 pixels represent the distance values that range from -2 inside the geometry to 6 on the outside.\r\n      // 6 is actually the maximum distance outside the glyph, therefore it is the limitation of the halo which is 1/4 of the geometry size.\r\n      const float maxSdfDistance \x3d 8.0;\r\n\r\n      const float C_DEG_TO_RAD \x3d 3.14159265359 / 180.0;\r\n\r\n      void main()\r\n      {\r\n        // make sure to clip the vertices in case that given record is marked as invisible\r\n        float z \x3d 2.0 * (1.0 - a_visible);\r\n\r\n        // clip the vertex if we are beyond the visibility range of the vertex\r\n        // please note: min value of 0 is regarded infinity. max value of 255 is regarded infinity\r\n        z +\x3d 1.0 + sign(a_visibilityRange.x - u_zoomLevel);\r\n        z +\x3d 1.0 + sign(u_zoomLevel - a_visibilityRange.y);\r\n\r\n        // we use the list significant bit of the position in order to store the indication whethe the vertex is of a halow of a glyph\r\n        mediump float halo \x3d mod(a_pos, 2.0).x;\r\n\r\n        float fontSize \x3d a_texAndSize.z;\r\n\r\n        float fontScale \x3d fontSize / sdfFontSize;\r\n        // we need to scale the extrude matrix by the font-scale in order to get the right text size\r\n        mat4 extrudeMatrix \x3d fontScale * u_extrudeMatrix;\r\n\r\n        float mapRotation \x3d u_mapAligned * C_DEG_TO_RAD * -u_mapRotation;\r\n        float sinA \x3d sin(mapRotation);\r\n        float cosA \x3d cos(mapRotation);\r\n\r\n        mat4 mapRotationMat \x3d mat4(cosA, sinA, 0.0, 0.0,\r\n                                  -sinA, cosA, 0.0, 0.0,\r\n                                    0.0,  0.0, 1.0, 0.0,\r\n                                    0.0,  0.0, 0.0, 1.0);\r\n\r\n        vec4 refSymbolOffset \x3d mapRotationMat *  vec4(a_refSymbolAndPlacementOffset.xy, 0.0, 0.0);\r\n\r\n        gl_Position \x3d vec4(u_normalized_origin, 0.0, 0.0) +\r\n                      u_transformMatrix * vec4(floor(a_pos * 0.5), z, 1.0) +\r\n                      u_extrudeMatrix * vec4(refSymbolOffset.xy + a_refSymbolAndPlacementOffset.zw, 0.0, 0.0) +\r\n                      extrudeMatrix * vec4(offsetPrecision * a_vertexOffset, 0.0, 0.0);\r\n\r\n        v_tex \x3d a_texAndSize.xy / u_mosaicSize;\r\n        v_antialiasingWidth \x3d 0.106 * sdfFontSize / fontSize / u_pixelRatio;\r\n        // if halo.x is zero (not a halo) v_edgeDistanceOffset will end up being zero as well.\r\n        v_edgeDistanceOffset \x3d halo * outlineScale * a_texAndSize.w / fontScale / maxSdfDistance;\r\n\r\n        v_transparency \x3d u_opacity;\r\n\r\n      #ifdef ID\r\n        v_fadeStep \x3d u_fadeStep;\r\n      #else\r\n        v_color \x3d a_color;\r\n      #endif // ID\r\n      }\r\n  ]]\x3e\r\n  \x3c/snippet\x3e\r\n\r\n  \x3csnippet name\x3d"labelFS"\x3e\r\n   \x3c![CDATA[\r\n      precision lowp float;\r\n\r\n      uniform mediump sampler2D u_referenceTex;\r\n      uniform mediump vec2 u_screenSize;\r\n      uniform mediump float u_pixelRatio;\r\n\r\n      varying mediump float v_antialiasingWidth;\r\n      varying mediump float v_edgeDistanceOffset;\r\n      varying mediump vec2 v_tex;\r\n      varying lowp float v_transparency;\r\n\r\n    #ifdef ID\r\n      varying mediump float v_fadeStep;\r\n    #else\r\n      uniform lowp sampler2D u_texture;\r\n      varying mediump vec4 v_color;\r\n    #endif // ID\r\n\r\n    const vec3 epsilon \x3d vec3(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);\r\n\r\n      void main()\r\n      {\r\n        mediump vec2 refTextPos \x3d gl_FragCoord.xy / (u_pixelRatio * u_screenSize.xy);\r\n        mediump vec4 referenceFragment \x3d texture2D(u_referenceTex, refTextPos);\r\n    #ifdef ID\r\n        mediump float alpha \x3d clamp(referenceFragment.a + v_fadeStep, 0.0, 1.0);\r\n        // fill the whole quad\r\n        gl_FragColor \x3d vec4(alpha);\r\n    #else\r\n        // read the fade alpha\r\n        lowp float fadeAlpha \x3d referenceFragment.a;\r\n\r\n        // read the distance from the SDF texture\r\n        lowp float dist \x3d texture2D(u_texture, v_tex).a;\r\n\r\n        // the edge distance if a factor of the outline width\r\n        float glyphEdgeDistance \x3d 0.75 - v_edgeDistanceOffset;\r\n\r\n        // use a smooth-step in order to calculate the geometry of the shape given by the distance field\r\n        lowp float sdfAlpha \x3d smoothstep(glyphEdgeDistance - v_antialiasingWidth, glyphEdgeDistance + v_antialiasingWidth, dist) * v_transparency;\r\n\r\n        gl_FragColor \x3d fadeAlpha * sdfAlpha * v_transparency * v_color;\r\n    #endif\r\n      }\r\n   ]]\x3e\r\n  \x3c/snippet\x3e\r\n\x3c/snippets\x3e\r\n\r\n'}});
define("esri/layers/vectorTiles/views/2d/engine/webgl/shaders/labelShaderSnippets",["require","exports","dojo/text!./labelShaders.xml","../../../../webgl/ShaderSnippets"],function(a,d,c,b){a=new b;b.parse(c,a);return a});