// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/arcade/arcadeCompiler","require exports ./Dictionary ./Feature ./ImmutablePathArray ./ImmutablePointArray ./languageUtils ./treeAnalysis ./functions/date ./functions/geometry ./functions/geomsync ./functions/maths ./functions/stats ./functions/string ./polyfill/promiseUtils ../geometry/Extent ../geometry/Geometry ../geometry/Multipoint ../geometry/Point ../geometry/Polygon ../geometry/Polyline ../SpatialReference".split(" "),function(Y,t,v,x,P,Z,d,h,aa,ba,ca,da,ea,fa,q,ga,ha,ia,ja,ka,
la,ma){function m(a,b,c){try{return c(a,null,b)}catch(e){throw e;}}function na(a){return a instanceof Error?q.reject(a):q.reject(Error(a))}function g(a,b){try{switch(b.type){case "EmptyStatement":return"lc.voidOperation";case "VariableDeclarator":return oa(a,b);case "VariableDeclaration":for(var c=[],e=0;e<b.declarations.length;e++)c.push(g(a,b.declarations[e]));return c.join("\n")+" \n lastStatement\x3d  lc.voidOperation; \n";case "BlockStatement":return M(a,b);case "FunctionDeclaration":var f=b.id.name.toLowerCase(),
d={isAsync:a.isAsync,applicationCache:void 0===a.applicationCache?null:a.applicationCache,spatialReference:a.spatialReference,console:a.console,lrucache:a.lrucache,services:a.services,symbols:a.symbols,mangleMap:a.mangleMap,localScope:{_SymbolsMap:{}},depthCounter:a.depthCounter+1,globalScope:a.globalScope};if(64<d.depthCounter)throw Error("Exceeded maximum function depth");for(var c="new lc.SizzleFunction( lang.functionDepthchecker(function() { var lastStatement \x3d lc.voidOperation; \n   var lscope \x3d runtimeCtx.localStack[runtimeCtx.localStack.length-1];\n",
E=0;E<b.params.length;E++){var l=b.params[E].name.toLowerCase(),n=K(l,a);d.localScope._SymbolsMap[l]=n;d.mangleMap[l]=n;c+="lscope['"+n+"']\x3darguments["+E.toString()+"];\n"}!0===a.isAsync?(c=c+"return lang.__awaiter(this, void 0, void 0, function* () {\n"+(M(d,b.body)+"\n return lastStatement;"),c+="});  }, runtimeCtx))\n lastStatement \x3d lc.voidOperation; \n"):(c+=M(d,b.body)+"\n return lastStatement; }, runtimeCtx))",c+="\n lastStatement \x3d lc.voidOperation; \n");void 0!==a.globalScope[f]?
e="gscope['"+f+"']\x3d"+c:void 0!==a.globalScope._SymbolsMap[f]?e="gscope['"+a.globalScope._SymbolsMap[f]+"']\x3d"+c:(n=K(f,a),a.globalScope._SymbolsMap[f]=n,a.mangleMap[f]=n,e="gscope['"+n+"']\x3d"+c);return e;case "ReturnStatement":var Q;Q=null===b.argument?"return lc.voidOperation;":"return "+g(a,b.argument)+";";return Q;case "IfStatement":if("AssignmentExpression"===b.test.type||"UpdateExpression"===b.test.type)throw Error(h.nodeErrorMessage(b.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));
var I=g(a,b.test),L=F(a),m="var "+L+" \x3d "+I+";\n if ("+L+" \x3d\x3d\x3d true) {\n"+R(a,b.consequent)+"\n }\n",m=null!==b.alternate?m+("else if ("+L+"\x3d\x3d\x3dfalse)   { \n"+R(a,b.alternate)+"}\n"):m+("else if ("+L+"\x3d\x3d\x3dfalse) { \n lastStatement \x3d lc.voidOperation;\n }\n");return m+="else { lang.error({type: '"+b.type+"'},'RUNTIME','CANNOT_USE_NONBOOLEAN_IN_CONDITION'); \n}\n";case "ExpressionStatement":var t;t="AssignmentExpression"===b.expression.type?"lastStatement \x3d lc.voidOperation; "+
g(a,b.expression)+" \n ":"lastStatement \x3d "+g(a,b.expression)+";";return t;case "AssignmentExpression":return qa(a,b);case "UpdateExpression":return ra(a,b);case "BreakStatement":return"break;";case "ContinueStatement":return"continue;";case "ForStatement":c="lastStatement \x3d lc.voidOperation; \n";null!==b.init&&(c+=g(a,b.init));var q=F(a),v=F(a),c=c+("var "+q+" \x3d true;")+"\n do { ";null!==b.update&&(c+=" if ("+q+"\x3d\x3d\x3dfalse) {\n "+g(a,b.update)+"  \n}\n "+q+"\x3dfalse; \n");null!==
b.test&&(c+="var "+v+" \x3d "+g(a,b.test)+";",c+="if ("+v+"\x3d\x3d\x3dfalse) { break; } else if ("+v+"!\x3d\x3dtrue) { lang.error({type: '"+b.type+"'},'RUNTIME','CANNOT_USE_NONBOOLEAN_IN_CONDITION');   }\n");c+=g(a,b.body);null!==b.update&&(c+="\n "+g(a,b.update));return c+("\n"+q+" \x3d true; \n} while(true);  lastStatement \x3d lc.voidOperation;");case "ForInStatement":var r=F(a),y=F(a),p=F(a),k="var "+r+" \x3d "+g(a,b.right)+";\n";"VariableDeclaration"===b.left.type&&(k+=g(a,b.left));var z="VariableDeclaration"===
b.left.type?b.left.declarations[0].id.name:b.left.name,z=z.toLowerCase(),c="";null!==a.localScope&&(void 0!==a.localScope[z]?c="lscope['"+z+"']":void 0!==a.localScope._SymbolsMap[z]&&(c="lscope['"+a.localScope._SymbolsMap[z]+"']"));""===c&&(void 0!==a.globalScope[z]?c="gscope['"+z+"']":void 0!==a.globalScope._SymbolsMap[z]&&(c="gscope['"+a.globalScope._SymbolsMap[z]+"']"));k=k+("if ("+r+"\x3d\x3d\x3dnull) {  lastStatement \x3d lc.voidOperation; }\n ")+("else if (lc.isArray("+r+") || lc.isString("+
r+")) {")+("var "+y+"\x3d"+r+".length; \n")+("for(var "+p+"\x3d0; "+p+"\x3c"+y+"; "+p+"++) {\n");k+=c+"\x3d"+p+";\n";k+=g(a,b.body);k+="\n}\n";k+=" lastStatement \x3d lc.voidOperation; \n";k+=" \n}\n";k+="else if (lc.isImmutableArray("+r+")) {";k=k+("var "+y+"\x3d"+r+".length(); \n")+("for(var "+p+"\x3d0; "+p+"\x3c"+y+"; "+p+"++) {\n");k+=c+"\x3d"+p+";\n";k+=g(a,b.body);k+="\n}\n";k+=" lastStatement \x3d lc.voidOperation; \n";k+=" \n}\n";k+="else if (( "+r+" instanceof lang.Dictionary) || ( "+r+" instanceof lang.Feature)) {";
k=k+("var "+y+"\x3d"+r+".keys(); \n")+("for(var "+p+"\x3d0; "+p+"\x3c"+y+".length; "+p+"++) {\n");k+=c+"\x3d"+y+"["+p+"];\n";k+=g(a,b.body);k+="\n}\n";k+=" lastStatement \x3d lc.voidOperation; \n";k+=" \n}\n";a.isAsync&&(k+="else if (lc.isFeatureSet("+r+")) {",k=k+("var "+y+"\x3d"+r+".iterator(runtimeCtx.progressTracker); \n")+("for(var "+p+"\x3dlang. graphicToFeature( yield "+y+".next(),"+r+"); "+p+"!\x3dnull; "+p+"\x3dlang. graphicToFeature( yield "+y+".next(),"+r+")) {\n")+(c+"\x3d"+p+";\n"),k+=
g(a,b.body),k+="\n}\n",k+=" lastStatement \x3d lc.voidOperation; \n",k+=" \n}\n");return k+"else { lastStatement \x3d lc.voidOperation; } \n";case "Identifier":return sa(a,b);case "MemberExpression":var w;try{c=void 0,c=!0===b.computed?g(a,b.property):"'"+b.property.name+"'",w="lang.member("+g(a,b.object)+","+c+")"}catch(u){throw u;}return w;case "Literal":return null===b.value||void 0===b.value?"null":JSON.stringify(b.value);case "ThisExpression":throw Error(h.nodeErrorMessage(b,"RUNTIME","NOTSUPPORTED"));
case "CallExpression":try{if("Identifier"!==b.callee.type)throw Error(h.nodeErrorMessage(b,"RUNTIME","ONLYNODESSUPPORTED"));var D=b.callee.name.toLowerCase(),e="";null!==a.localScope&&(void 0!==a.localScope[D]?e="lscope['"+D+"']":void 0!==a.localScope._SymbolsMap[D]&&(e="lscope['"+a.localScope._SymbolsMap[D]+"']"));""===e&&(void 0!==a.globalScope[D]?e="gscope['"+D+"']":void 0!==a.globalScope._SymbolsMap[D]&&(e="gscope['"+a.globalScope._SymbolsMap[D]+"']"));if(""!==e){f="[";for(d=0;d<b.arguments.length;d++)0<
d&&(f+=", "),f+=g(a,b.arguments[d]);f+="]";c=a.isAsync?"(yield lang.callfunc("+e+","+f+",runtimeCtx) )":"lang.callfunc("+e+","+f+",runtimeCtx)"}else throw Error(h.nodeErrorMessage(b,"RUNTIME","NOTFOUND"));}catch(u){throw u;}return c;case "UnaryExpression":var x;try{x="lang.unary("+g(a,b.argument)+",'"+b.operator+"')"}catch(u){throw u;}return x;case "BinaryExpression":var A;try{A="lang.binary("+g(a,b.left)+","+g(a,b.right)+",'"+b.operator+"')"}catch(u){throw u;}return A;case "LogicalExpression":var C;
try{if("AssignmentExpression"===b.left.type||"UpdateExpression"===b.left.type)throw Error(h.nodeErrorMessage(b.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("AssignmentExpression"===b.right.type||"UpdateExpression"===b.right.type)throw Error(h.nodeErrorMessage(b.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("\x26\x26"===b.operator||"||"===b.operator)C="(lang.logicalCheck("+g(a,b.left)+") "+b.operator+" lang.logicalCheck("+g(a,b.right)+"))";else throw Error(h.nodeErrorMessage("LogicalExpression",
"RUNTIME","ONLYORORAND"));}catch(u){throw u;}return C;case "ConditionalExpression":throw Error(h.nodeErrorMessage(b,"RUNTIME","NOTSUPPORTED"));case "ArrayExpression":try{c=[];for(e=0;e<b.elements.length;e++)"Literal"===b.elements[e].type?c.push(g(a,b.elements[e])):c.push("lang.aCheck("+g(a,b.elements[e])+",'ArrayExpression')");E="["+c.join(",")+"]"}catch(u){throw u;}return E;case "ObjectExpression":c="lang.dictionary([";for(e=0;e<b.properties.length;e++){var B=b.properties[e],G="Identifier"===B.key.type?
"'"+B.key.name+"'":g(a,B.key),J=g(a,B.value);0<e&&(c+=",");c+="lang.strCheck("+G+",'ObjectExpression'),lang.aCheck("+J+", 'ObjectExpression')"}return c+"])";case "Property":throw Error("Should not get here");case "Array":throw Error(h.nodeErrorMessage(b,"RUNTIME","NOTSUPPORTED"));default:throw Error(h.nodeErrorMessage(b,"RUNTIME","UNREOGNISED"));}}catch(u){throw u;}}function ra(a,b){var c=null,e="";if("MemberExpression"===b.argument.type)return c=g(a,b.argument.object),e=!0===b.argument.computed?
g(a,b.argument.property):"'"+b.argument.property.name+"'","lang.memberupdate("+c+","+e+",'"+b.operator+"',"+b.prefix+")";c=b.argument.name.toLowerCase();if(null!==a.localScope){if(void 0!==a.localScope[c])return"lang.update(lscope, '"+c+"','"+b.operator+"',"+b.prefix+")";if(void 0!==a.localScope._SymbolsMap[c])return"lang.update(lscope, '"+a.localScope._SymbolsMap[c]+"','"+b.operator+"',"+b.prefix+")"}if(void 0!==a.globalScope[c])return"lang.update(gscope, '"+c+"','"+b.operator+"',"+b.prefix+")";
if(void 0!==a.globalScope._SymbolsMap[c])return"lang.update(gscope, '"+a.globalScope._SymbolsMap[c]+"','"+b.operator+"',"+b.prefix+")";throw Error("Variable not recognised");}function qa(a,b){var c=g(a,b.right),e=null,d="";if("MemberExpression"===b.left.type)return e=g(a,b.left.object),d=!0===b.left.computed?g(a,b.left.property):"'"+b.left.property.name+"'","lang.assignmember("+e+","+d+",'"+b.operator+"',"+c+");";e=b.left.name.toLowerCase();if(null!==a.localScope){if(void 0!==a.localScope[e])return"lscope['"+
e+"']\x3dlang.assign("+c+",'"+b.operator+"', lscope['"+e+"']); ";if(void 0!==a.localScope._SymbolsMap[e])return"lscope['"+a.localScope._SymbolsMap[e]+"']\x3dlang.assign("+c+",'"+b.operator+"', lscope['"+a.localScope._SymbolsMap[e]+"']); "}if(void 0!==a.globalScope[e])return"gscope['"+e+"']\x3dlang.assign("+c+",'"+b.operator+"', gscope['"+e+"']); ";if(void 0!==a.globalScope._SymbolsMap[e])return"gscope['"+a.globalScope._SymbolsMap[e]+"']\x3dlang.assign("+c+",'"+b.operator+"', gscope['"+a.globalScope._SymbolsMap[e]+
"']); ";throw Error("Variable not recognised");}function R(a,b){return"BlockStatement"===b.type?g(a,b):"ReturnStatement"===b.type?g(a,b):"BreakStatement"===b.type?g(a,b):"ContinueStatement"===b.type?g(a,b):"UpdateExpression"===b.type?"lastStatement \x3d "+g(a,b)+";":"ExpressionStatement"===b.type?g(a,b):"ObjectExpression"===b.type?"lastStatement \x3d "+g(a,b)+";":g(a,b)}function M(a,b){for(var c="",e=0;e<b.body.length;e++)c="ReturnStatement"===b.body[e].type?c+(g(a,b.body[e])+" \n"):"BreakStatement"===
b.body[e].type?c+(g(a,b.body[e])+" \n"):"ContinueStatement"===b.body[e].type?c+(g(a,b.body[e])+" \n"):"UpdateExpression"===b.body[e].type?c+("lastStatement \x3d "+g(a,b.body[e])+"; \n"):"ObjectExpression"===b.body[e].type?c+("lastStatement \x3d "+g(a,b.body[e])+"; \n"):c+(g(a,b.body[e])+" \n");return c}function oa(a,b){var c=null===b.init?null:g(a,b.init);c===d.voidOperation&&(c=null);b=b.id.name.toLowerCase();if(null!==a.localScope){if(void 0!==a.localScope[b])return"lscope['"+b+"']\x3d"+c+";";if(void 0!==
a.localScope._SymbolsMap[b])return"lscope['"+a.localScope._SymbolsMap[b]+"']\x3d"+c+";";var e=K(b,a);a.localScope._SymbolsMap[b]=e;a.mangleMap[b]=e;return"lscope['"+e+"']\x3d"+c+";"}if(void 0!==a.globalScope[b])return"gscope['"+b+"']\x3d"+c+";";if(void 0!==a.globalScope._SymbolsMap[b])return"gscope['"+a.globalScope._SymbolsMap[b]+"']\x3d"+c+";";e=K(b,a);a.globalScope._SymbolsMap[b]=e;a.mangleMap[b]=e;return"gscope['"+e+"']\x3d"+c+";"}function ta(a,b,c){b=b.toLowerCase();switch(b){case "hasz":return a=
a.hasZ,void 0===a?!1:a;case "hasm":return a=a.hasM,void 0===a?!1:a;case "spatialreference":return b=a.spatialReference._arcadeCacheId,void 0===b&&(c=!0,Object.freeze&&Object.isFrozen(a.spatialReference)&&(c=!1),c&&(w++,b=a.spatialReference._arcadeCacheId=w)),a=new v({wkt:a.spatialReference.wkt,wkid:a.spatialReference.wkid}),void 0!==b&&(a._arcadeCacheId="SPREF"+b.toString()),a}switch(a.type){case "extent":switch(b){case "xmin":case "xmax":case "ymin":case "ymax":case "zmin":case "zmax":case "mmin":case "mmax":return a=
a[b],void 0!==a?a:null;case "type":return"Extent"}break;case "polygon":switch(b){case "rings":return b=a.getCacheValue("_arcadeCacheId"),void 0===b&&(w++,b=w,a.setCacheValue("_arcadeCacheId",b)),a=new P(a.rings,a.spatialReference,!0===a.hasZ,!0===a.hasM,b);case "type":return"Polygon"}break;case "point":switch(b){case "x":case "y":case "z":case "m":return void 0!==a[b]?a[b]:null;case "type":return"Point"}break;case "polyline":switch(b){case "paths":return b=a.getCacheValue("_arcadeCacheId"),void 0===
b&&(w++,b=w,a.setCacheValue("_arcadeCacheId",b)),a=new P(a.paths,a.spatialReference,!0===a.hasZ,!0===a.hasM,b);case "type":return"Polyline"}break;case "multipoint":switch(b){case "points":return b=a.getCacheValue("_arcadeCacheId"),void 0===b&&(w++,b=w,a.setCacheValue("_arcadeCacheId",b)),a=new Z(a.points,a.spatialReference,!0===a.hasZ,!0===a.hasM,b,1);case "type":return"Multipoint"}}throw Error(h.nodeErrorMessage(c,"RUNTIME","PROPERTYNOTFOUND"));}function sa(a,b){try{var c=b.name.toLowerCase();if(null!==
a.localScope){if(void 0!==a.localScope[c])return"lscope['"+c+"']";if(void 0!==a.localScope._SymbolsMap[c])return"lscope['"+a.localScope._SymbolsMap[c]+"']"}if(void 0!==a.globalScope[c])return"gscope['"+c+"']";if(void 0!==a.globalScope._SymbolsMap[c])return"gscope['"+a.globalScope._SymbolsMap[c]+"']";throw Error(h.nodeErrorMessage(b,"RUNTIME","VARIABLENOTFOUND"));}catch(e){throw e;}}function S(a){return null===a?"":d.isArray(a)||d.isImmutableArray(a)?"Array":d.isDate(a)?"Date":d.isString(a)?"String":
d.isBoolean(a)?"Boolean":d.isNumber(a)?"Number":a instanceof v?"Dictionary":a instanceof x?"Feature":a instanceof ja?"Point":a instanceof ka?"Polygon":a instanceof la?"Polyline":a instanceof ia?"Multipoint":a instanceof ga?"Extent":d.isFunctionParameter(a)?"Function":d.isFeatureSet(a)?"FeatureSet":d.isFeatureSetCollection(a)?"FeatureSetCollection":a===d.voidOperation?"":"number"===typeof a&&isNaN(a)?"Number":"Unrecognised Type"}function T(a,b,c,e){try{if(d.equalityTest(b[c],e))return b[c+1];var f=
b.length-c;return 1===f?b[c]:2===f?null:3===f?b[c+2]:T(a,b,c+2,e)}catch(H){throw H;}}function U(a,b,c,e){try{if(!0===e)return b[c+1];if(3===b.length-c)return b[c+2];var f=b[c+2];if(!1===d.isBoolean(f))throw Error("WHEN needs boolean test conditions");return U(a,b,c+2,f)}catch(H){throw H;}}function A(a,b){var c=a.length,e=Math.floor(c/2);if(0===c)return[];if(1===c)return[a[0]];var d=A(a.slice(0,e),b);a=A(a.slice(e,c),b);for(c=[];0<d.length||0<a.length;)0<d.length&&0<a.length?(e=b(d[0],a[0]),isNaN(e)&&
(e=0),0>=e?(c.push(d[0]),d=d.slice(1)):(c.push(a[0]),a=a.slice(1))):0<d.length?(c.push(d[0]),d=d.slice(1)):0<a.length&&(c.push(a[0]),a=a.slice(1));return c}function J(a,b){try{var c=a.length,e=Math.floor(c/2);if(0===c)return q.resolve([]);if(1===c)return q.resolve([a[0]]);var d=[J(a.slice(0,e),b),J(a.slice(e,c),b)];return q.all(d).then(function(a){return G(a[0],a[1],b,[])})}catch(H){return q.reject(H)}}function G(a,b,c,e){return q.create(function(d,g){0<a.length||0<b.length?0<a.length&&0<b.length?
c(a[0],b[0]).then(function(f){try{isNaN(f)&&(f=1),0>=f?(e.push(a[0]),a=a.slice(1)):(e.push(b[0]),b=b.slice(1)),G(a,b,c,e).then(function(a){d(a)},g)}catch(pa){g(pa)}},g):0<a.length?(e.push(a[0]),a=a.slice(1),G(a,b,c,e).then(function(a){d(a)},g)):0<b.length&&(e.push(b[0]),b=b.slice(1),G(a,b,c,e).then(function(a){d(a)},g)):d(e)})}function K(a,b){b.symbols.symbolCounter++;return"_T"+b.symbols.symbolCounter.toString()}function F(a){a.symbols.symbolCounter++;return"_Tvar"+a.symbols.symbolCounter.toString()}
function ua(a,b,c){var e={};a||(a={});c||(c={});e._SymbolsMap={};e.textformatting=1;e.infinity=1;e.pi=1;for(var d in b)e[d]=1;for(d in c)e[d]=1;for(d in a)e[d]=1;return e}function V(a,b){for(var c={mode:b,compiled:!0,functions:{},signatures:[],failDefferred:na,standardFunction:m,standardFunctionAsync:m,evaluateIdentifier:va},e=0;e<a.length;e++)a[e].registerFunctions(c);if("sync"===b){for(var f in c.functions)l[f]=new d.NativeFunction(c.functions[f]),N.prototype[f]=l[f];for(e=0;e<c.signatures.length;e++)h.addFunctionDeclaration(c.signatures[e],
"sync")}else{for(f in c.functions)B[f]=new d.NativeFunction(c.functions[f]),O.prototype[f]=B[f];for(e=0;e<c.signatures.length;e++)h.addFunctionDeclaration(c.signatures[e],"async")}}function va(a,b){b=b.name;if("_SymbolsMap"===b)throw"Illegal";if(0<a.localStack.length){if("_t"!==b.substr(0,2).toLowerCase()&&void 0!==a.localStack[a.localStack.length-1][b])return a.localStack[a.localStack.length-1][b];var c=a.mangleMap[b];if(void 0!==c&&void 0!==a.localStack[a.localStack.length-1][c])return a.localStack[a.localStack.length-
1][c]}if("_t"!==b.substr(0,2).toLowerCase()&&void 0!==a.globalScope[b]||1===a.globalScope._SymbolsMap[b])return a.globalScope[b];b=a.mangleMap[b];if(void 0!==b)return a.globalScope[b]}function W(a){console.log(a)}Object.defineProperty(t,"__esModule",{value:!0});var w=0,l={};aa.registerFunctions(l,m);fa.registerFunctions(l,m);da.registerFunctions(l,m);ba.registerFunctions(l,m);ea.registerFunctions(l,m);l["typeof"]=function(a,b){return m(a,b,function(a,b,f){d.pcCheck(f,1,1);a=S(f[0]);if("Unrecognised Type"===
a)throw Error("Unrecognised Type");return a})};l.iif=function(a,b){try{return m(a,b,function(a,b,f){d.pcCheck(f,3,3);if(!1===d.isBoolean(f[0]))throw Error("IF Function must have a boolean test condition");return f[0]?f[1]:f[2]})}catch(c){throw c;}};l.decode=function(a,b){try{return m(a,b,function(b,e,d){if(2>d.length)throw Error("Missing Parameters");if(2===d.length)return d[1];if(0===(d.length-1)%2)throw Error("Must have a default value result.");return T(a,d,1,d[0])})}catch(c){throw c;}};l.when=
function(a,b){try{return m(a,b,function(b,e,f){if(3>f.length)throw Error("Missing Parameters");if(0===f.length%2)throw Error("Must have a default value result.");b=f[0];if(!1===d.isBoolean(b))throw Error("WHEN needs boolean test conditions");return U(a,f,0,b)})}catch(c){throw c;}};l.top=function(a,b){return m(a,b,function(a,b,f){d.pcCheck(f,2,2);if(d.isArray(f[0]))return d.toNumber(f[1])>=f[0].length?f[0].slice(0):f[0].slice(0,d.toNumber(f[1]));if(d.isImmutableArray(f[0]))return d.toNumber(f[1])>=
f[0].length()?f[0].slice(0):f[0].slice(0,d.toNumber(f[1]));throw Error("Top cannot accept this parameter type");})};l.first=function(a,b){return m(a,b,function(a,b,f){d.pcCheck(f,1,1);return d.isArray(f[0])?0===f[0].length?null:f[0][0]:d.isImmutableArray(f[0])?0===f[0].length()?null:f[0].get(0):null})};l.sort=function(a,b){return m(a,b,function(b,e,f){d.pcCheck(f,1,2);e=f[0];d.isImmutableArray(e)&&(e=e.toArray());if(!1===d.isArray(e))throw Error("Illegal Argument");if(1<f.length){if(!1===d.isFunctionParameter(f[1]))throw Error("Illegal Argument");
var c=function(a,c){return X.callfunc(f[1],[a,c],b)};return a.isAsync?J(e,c):e=A(e,function(a,b){return c(a,b)})}if(0===e.length)return[];for(var g={},h=0;h<e.length;h++){var n=S(e[h]);""!==n&&(g[n]=!0)}if(!0===g.Array||!0===g.Dictionary||!0===g.Feature||!0===g.Point||!0===g.Polygon||!0===g.Polyline||!0===g.Multipoint||!0===g.Extent||!0===g.Function)return e.slice(0);var h=0,n="",l;for(l in g)h++,n=l;return e=1<h||"String"===n?A(e,function(a,b){if(null===a||void 0===a||a===d.voidOperation)return null===
b||void 0===b||b===d.voidOperation?0:1;if(null===b||void 0===b||b===d.voidOperation)return-1;a=d.toString(a);b=d.toString(b);return a<b?-1:a===b?0:1}):"Number"===n?A(e,function(a,b){return a-b}):"Boolean"===n?A(e,function(a,b){return a===b?0:b?-1:1}):"Date"===n?A(e,function(a,b){return b-a}):e.slice(0)})};var B={},C;for(C in l)B[C]=new d.NativeFunction(l[C]);ca.registerFunctions(l,m);for(C in l)l[C]=new d.NativeFunction(l[C]);var N=function(){};N.prototype=l;var O=function(){};O.prototype=B;t.functionHelper=
{fixSpatialReference:d.fixSpatialReference,parseArguments:function(a,b){for(var c=[],e=0;e<b.arguments.length;e++)c.push(g(a,b.arguments[e]));return c},standardFunction:m};t.extend=V;t.executeScript=function(a,b,c){return a(b,c)};t.extractFieldLiterals=function(a,b){void 0===b&&(b=!1);return h.findFieldLiterals(a,b)};t.validateScript=function(a,b){return h.validateScript(a,b,"sync")};t.referencesMember=function(a,b){return h.referencesMember(a,b)};t.referencesFunction=function(a,b){return h.referencesFunction(a,
b)};var X={error:function(a,b,c){throw Error(h.nodeErrorMessage(a,b,c));},__awaiter:function(a,b,c,e){return q.create(function(c,g){function f(a){try{n(e.next(a))}catch(I){g(I)}}function h(a){try{n(e["throw"](a))}catch(I){g(I)}}function n(a){a.done?c(a.value):a.value&&d.isFeatureSet(a.value)?f(a.value):a.value&&a.value.then?a.value.then(f,h):f(a.value)}n((e=e.apply(a,b||[])).next())})},functionDepthchecker:function(a,b){return function(){b.depthCounter++;b.localStack.push([]);if(64<b.depthCounter)throw Error("Exceeded maximum function depth");
var c=a.apply(this,arguments);b.depthCounter--;--b.localStack.length;return c}},aCheck:function(a,b){if(d.isFunctionParameter(a))throw Error(h.nodeErrorMessage({type:b},"RUNTIME","FUNCTIONCONTEXTILLEGAL"));return a===d.voidOperation?null:a},Dictionary:v,Feature:x,dictionary:function(a){for(var b={},c=0;c<a.length;c+=2){if(d.isFunctionParameter(a[c+1]))throw Error("Illegal Argument");if(!1===d.isString(a[c]))throw Error("Illegal Argument");b[a[c].toString()]=a[c+1]===d.voidOperation?null:a[c+1]}a=
new v(b);a.immutable=!1;return a},strCheck:function(a,b){if(!1===d.isString(a))throw Error("Illegal Argument");return a},unary:function(a,b){if(d.isBoolean(a)){if("!"===b)return!a;if("-"===b)return-1*d.toNumber(a);if("+"===b)return 1*d.toNumber(a);throw Error(h.nodeErrorMessage({type:"UnaryExpression"},"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"));}if("-"===b)return-1*d.toNumber(a);if("+"===b)return 1*d.toNumber(a);throw Error(h.nodeErrorMessage({type:"UnaryExpression"},"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"));
},logicalCheck:function(a){if(!1===d.isBoolean(a))throw Error(h.nodeErrorMessage("LogicalExpression","RUNTIME","ONLYORORAND"));return a},logical:function(a,b,c){if(d.isBoolean(a)&&d.isBoolean(b))switch(c){case "||":return a||b;case "\x26\x26":return a&&b;default:throw Error(h.nodeErrorMessage("LogicalExpression","RUNTIME","ONLYORORAND"));}else throw Error(h.nodeErrorMessage("LogicalExpression","RUNTIME","ONLYORORAND"));},binary:function(a,b,c){switch(c){case "\x3d\x3d":return d.equalityTest(a,b);
case "\x3d":return d.equalityTest(a,b);case "!\x3d":return!d.equalityTest(a,b);case "\x3c":return d.greaterThanLessThan(a,b,c);case "\x3e":return d.greaterThanLessThan(a,b,c);case "\x3c\x3d":return d.greaterThanLessThan(a,b,c);case "\x3e\x3d":return d.greaterThanLessThan(a,b,c);case "+":return d.isString(a)||d.isString(b)?d.toString(a)+d.toString(b):d.toNumber(a)+d.toNumber(b);case "-":return d.toNumber(a)-d.toNumber(b);case "*":return d.toNumber(a)*d.toNumber(b);case "/":return d.toNumber(a)/d.toNumber(b);
case "%":return d.toNumber(a)%d.toNumber(b);default:throw Error(h.nodeErrorMessage({type:"BinaryExpression"},"RUNTIME","OPERATORNOTRECOGNISED"));}},assign:function(a,b,c){switch(b){case "\x3d":return a===d.voidOperation?null:a;case "/\x3d":return d.toNumber(c)/d.toNumber(a);case "*\x3d":return d.toNumber(c)*d.toNumber(a);case "-\x3d":return d.toNumber(c)-d.toNumber(a);case "+\x3d":return d.isString(c)||d.isString(a)?d.toString(c)+d.toString(a):d.toNumber(c)+d.toNumber(a);case "%\x3d":return d.toNumber(c)%
d.toNumber(a);default:throw Error(h.nodeErrorMessage("AssignmentExpression","RUNTIME","OPERATORNOTRECOGNISED"));}},update:function(a,b,c,e){var f=d.toNumber(a[b]);a[b]="++"===c?f+1:f-1;return!1===e?f:"++"===c?f+1:f-1},graphicToFeature:function(a,b){return null===a?null:x.createFromGraphicLikeObject(a.geometry,a.attributes,b)},memberupdate:function(a,b,c,e){var f;if(d.isArray(a))if(d.isNumber(b)){0>b&&(b=a.length+b);if(0>b||b>=a.length)throw Error("Assignment outside of array bounds");f=d.toNumber(a[b]);
a[b]="++"===c?f+1:f-1}else throw Error("Invalid Parameter");else if(a instanceof v){if(!1===d.isString(b))throw Error("Dictionary accessor must be a string");if(!0===a.hasField(b))f=d.toNumber(a.field(b)),a.setField(b,"++"===c?f+1:f-1);else throw Error("Invalid Parameter");}else if(a instanceof x){if(!1===d.isString(b))throw Error("Feature accessor must be a string");if(!0===a.hasField(b))f=d.toNumber(a.field(b)),a.setField(b,"++"===c?f+1:f-1);else throw Error("Invalid Parameter");}else{if(d.isImmutableArray(a))throw Error("Array is Immutable");
throw Error("Invalid Parameter");}return!1===e?f:"++"===c?f+1:f-1},assignmember:function(a,b,c,e){if(d.isArray(a))if(d.isNumber(b)){0>b&&(b=a.length+b);if(0>b||b>a.length)throw Error("Assignment outside of array bounds");if(b===a.length&&"\x3d"!==c)throw Error("Invalid Parameter");a[b]=this.assign(e,c,a[b])}else throw Error("Invalid Parameter");else if(a instanceof v){if(!1===d.isString(b))throw Error("Dictionary accessor must be a string");if(!0===a.hasField(b))a.setField(b,this.assign(e,c,a.field(b)));
else{if("\x3d"!==c)throw Error("Invalid Parameter");a.setField(b,this.assign(e,c,null))}}else if(a instanceof x){if(!1===d.isString(b))throw Error("Feature accessor must be a string");if(!0===a.hasField(b))a.setField(b,this.assign(e,c,a.field(b)));else{if("\x3d"!==c)throw Error("Invalid Parameter");a.setField(b,this.assign(e,c,null))}}else{if(d.isImmutableArray(a))throw Error("Array is Immutable");throw Error("Invalid Parameter");}},member:function(a,b){if(null===a)throw Error(h.nodeErrorMessage("MemberExpression",
"RUNTIME","NOTFOUND"));if(a instanceof v||a instanceof x){if(d.isString(b))return a.field(b)}else if(a instanceof ha){if(d.isString(b))return ta(a,b,"MemberExpression")}else if(d.isArray(a)){if(d.isNumber(b)&&isFinite(b)&&Math.floor(b)===b){0>b&&(b=a.length+b);if(b>=a.length||0>b)throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","OUTOFBOUNDS"));return a[b]}}else if(d.isString(a)){if(d.isNumber(b)&&isFinite(b)&&Math.floor(b)===b){0>b&&(b=a.length+b);if(b>=a.length||0>b)throw Error(h.nodeErrorMessage("MemberExpression",
"RUNTIME","OUTOFBOUNDS"));return a[b]}}else if(d.isImmutableArray(a)&&d.isNumber(b)&&isFinite(b)&&Math.floor(b)===b){0>b&&(b=a.length()+b);if(b>=a.length()||0>b)throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","OUTOFBOUNDS"));return a.get(b)}throw Error(h.nodeErrorMessage("MemberExpression","RUNTIME","INVALIDTYPE"));},callfunc:function(a,b,c){return a instanceof d.NativeFunction?a.fn(c,b):a instanceof d.SizzleFunction?a.fn.apply(this,b):a.apply(this,b)}};t.compileScript=function(a,b,c){void 0===
b&&(b=null);void 0===c&&(c=!1);null===b&&(b={vars:{},customfunctions:{}});b={isAsync:c,globalScope:ua(b.vars,c?B:l,b.customfunctions),localScope:null,mangleMap:{},console:W,lrucache:b.lrucache,services:b.services,symbols:{symbolCounter:0}};a=g(b,a.body[0].body);""===a&&(a="lc.voidOperation;");b={lc:d,lang:X,mangles:b.mangleMap,postProcess:function(a){a instanceof d.ReturnResult&&(a=a.value);a instanceof d.ImplicitResult&&(a=a.value);a===d.voidOperation&&(a=null);if(a===d.breakResult)throw Error("Cannot return BREAK");
if(a===d.continueResult)throw Error("Cannot return CONTINUE");if(d.isFunctionParameter(a))throw Error("Cannot return FUNCTION");return a},prepare:function(a,b,c){b||(b=new ma({wkid:102100}));var d=a.vars,e=a.customfunctions,f=c?new O:new N;d||(d={});e||(e={});var g=new v({newline:"\n",tab:"\t",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});g.immutable=!1;f._SymbolsMap={textformatting:1,infinity:1,pi:1};f.textformatting=g;f.infinity=Number.POSITIVE_INFINITY;f.pi=Math.PI;for(var h in e)f[h]=
e[h],f._SymbolsMap[h]=1;for(h in d)f._SymbolsMap[h]=1,f[h]=d[h]&&"esri.Graphic"===d[h].declaredClass?x.createFromGraphic(d[h]):d[h];return{localStack:[],isAsync:c,mangleMap:this.mangles,spatialReference:b,globalScope:f,progressTracker:void 0===a.progressTracker||null===a.progressTracker?q.createDeferred().promise:a.progressTracker,localScope:null,services:a.services,console:a.console?a.console:W,lrucache:a.lrucache,symbols:{symbolCounter:0},depthCounter:1,applicationCache:void 0===a.applicationCache?
null:a.applicationCache}}};return(new Function("context","spatialReference",c?"var runtimeCtx\x3dthis.prepare(context, spatialReference, true);\n var lc \x3d this.lc;  var lang \x3d this.lang; var gscope\x3druntimeCtx.globalScope; \nreturn lang.__awaiter(this, void 0, void 0, function* () {\n\n function mainBody() {\n var lastStatement\x3dlc.voidOperation;\n return lang.__awaiter(this, void 0, void 0, function* () {\n"+a+"\n return lastStatement; }); } \n return this.postProcess(yield mainBody()); });":
"var runtimeCtx\x3dthis.prepare(context, spatialReference, false);\n var lc \x3d this.lc;  var lang \x3d this.lang; var gscope\x3druntimeCtx.globalScope; \n function mainBody() {\n var lastStatement\x3dlc.voidOperation;\n "+a+"\n return lastStatement; } \n return this.postProcess(mainBody());")).bind(b)};t.enableAsyncSupport=function(){return q.create(function(a,b){Y(["./functions/geomasync"],function(b){V([b],"async");a(!0)},function(a){b(a)})})}});