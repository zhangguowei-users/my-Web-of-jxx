// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/arcade/featureset/support/WhereClause","require exports dojo/Deferred dojo/promise/all ../../../moment ./shared ./StandardizedFunctions ./WhereGrammar ../../../geometry/geometryEngineAsync".split(" "),function(J,K,n,C,u,g,l,G,v){function r(e){if(e){for(var a="",b=0;b<e.length;b++){var c=e[b];""!==c&&(a=""===a?c:D[a]<D[c]?c:a)}return a}return""}function w(e){return u(e,["YYYY-M-D H:m:s","YYYY-M-D H:mZ","YYYY-M-D H:m:sZ","YYYY-M-D H:m","YYYY-m-d"]).toDate()}function x(e){return u(e,["YYYY-M-D"]).toDate()}
function y(e){return Array.isArray(e)?e:[e]}function p(e){return null!==e?!0!==e:null}function E(e,a){return null!=e&&null!=a?!0===e&&!0===a:!1===e||!1===a?!1:null}function F(e,a){return null!=e&&null!=a?!0===e||!0===a:!0===e||!0===a?!0:null}function q(e,a){if(null==e)return null;for(var b=!1,c=0;c<a.length;c++){var d=a[c];if(null==d)b=null;else if(e===d){b=!0;break}}return b}function t(e,a,b){if(null==e)return null;var c="",d,f=d||(d={});f[f.Normal=0]="Normal";f[f.Escaped=1]="Escaped";for(f=d=0;f<
a.length;f++){var h=a.charAt(f);switch(d){case 0:h===b?d=1:c=0<="-[]/{}()*+?.\\^$|".indexOf(h)?c+("\\"+h):"%"===h?c+".*":"_"===h?c+".":c+h;break;case 1:c=0<="-[]/{}()*+?.\\^$|".indexOf(h)?c+("\\"+h):c+h,d=0}}return(new RegExp("^"+c+"$")).test(e)}function m(e){return e instanceof Date?e.valueOf():e}function z(e,a,b){if(null==a||null==b)return null;a=m(a);b=m(b);switch(e){case "\x3c\x3e":return a!==b;case "\x3d":return a===b;case "\x3e":return a>b;case "\x3c":return a<b;case "\x3e\x3d":return a>=b;
case "\x3c\x3d":return a<=b}}function A(e){for(var a=[],b={},c=0;c<e.length;c++){var d=e[c],f=d.toLowerCase();void 0===b[f]&&(a.push(d),b[f]=1)}return a}var D={boolean:1,string:2,integer:3,double:4,date:5},H=function(){function e(){}e.makeBool=function(a){return!0===a};e.featureValue=function(a,b){var c=a.attributes[b];if(void 0!==c)return c;for(var d in a.attributes)if(b.toLowerCase()===d.toLowerCase())return a.attributes[d];return null};e.equalsNull=function(a){return null===a};e.applyLike=function(a,
b,c){return t(a,b,c)};e.ensureArray=function(a){return y(a)};e.applyIn=function(a,b){return q(a,b)};e.currentDate=function(){var a=new Date;a.setHours(0,0,0,0);return a};e.currentTimestamp=function(){return new Date};e.compare=function(a,b,c){return z(a,b,c)};e.makeComparable=function(a){return m(a)};e.evaluateFunction=function(a,b){return l.evaluateFunction(a,b)};e.lookup=function(a,b){a=b[a];return void 0===a?null:a};e.between=function(a,b){return null==a||null==b[0]||null==b[1]?null:a>=b[0]&&a<=
b[1]};e.notbetween=function(a,b){return null==a||null==b[0]||null==b[1]?null:a<b[0]||a>b[1]};return e}();return function(){function e(){this.parameters=this.parseTree=null}e.create=function(a){var b=new e;b.parseTree=G.WhereGrammar.parse(a);return b};e.prototype.isStandardized=function(){var a=!0;this.visitAll(this.parseTree,function(b){a&&"function"===b.type&&(a=l.isStandardized(b.name,b.args.value.length))});return a};e.prototype.setVariablesDictionary=function(a){this.parameters=a};e.prototype.testFeature=
function(a){return!!this.evaluateNode(this.parseTree,a)};e.prototype.testFeatureCompiled=function(a){void 0===this.parseTree._compiledVersion&&this._compileMe();return!!this.parseTree._compiledVersion(a,this.parameters)};e.prototype._compileMe=function(){var a="return "+this.evaluateNodeToJavaScript(this.parseTree);this.parseTree._compiledVersion=(new Function("feature","lookups",a)).bind(H)};e.prototype.evaluateNodeToJavaScript=function(a){switch(a.type){case "case_expression":var b="";if("simple"===
a.format)for(var c="this.makeComparable("+this.evaluateNodeToJavaScript(a.operand)+")",b="( ",d=0;d<a.clauses.length;d++)b+=" ("+c+" \x3d\x3d\x3d this.makeComparable("+this.evaluateNodeToJavaScript(a.clauses[d].operand)+")) ? ("+this.evaluateNodeToJavaScript(a.clauses[d].value)+") : ";else for(b="( ",d=0;d<a.clauses.length;d++)b+=" this.makeBool("+this.evaluateNodeToJavaScript(a.clauses[d].operand)+")\x3d\x3d\x3dtrue ? ("+this.evaluateNodeToJavaScript(a.clauses[d].value)+") : ";b=null!==a.else?b+
this.evaluateNodeToJavaScript(a.else):b+"null";return b+" )";case "param":return"this.lookup("+JSON.stringify(a.value.toLowerCase())+",lookups)";case "expr_list":b="[";c=0;for(a=a.value;c<a.length;c++)d=a[c],"["!==b&&(b+=","),b+=this.evaluateNodeToJavaScript(d);return b+"]";case "unary_expr":return"this.ternaryNot("+this.evaluateNodeToJavaScript(a.expr)+")";case "binary_expr":switch(a.operator){case "AND":return"this.ternaryAnd("+this.evaluateNodeToJavaScript(a.left)+","+this.evaluateNodeToJavaScript(a.right)+
" )";case "OR":return"this.ternaryOr("+this.evaluateNodeToJavaScript(a.left)+","+this.evaluateNodeToJavaScript(a.right)+" )";case "IS":if("null"!==a.right.type)throw Error("Unsupported RHS for IS");return"this.equalsNull("+this.evaluateNodeToJavaScript(a.left)+")";case "ISNOT":if("null"!==a.right.type)throw Error("Unsupported RHS for IS");return"(!(this.equalsNull("+this.evaluateNodeToJavaScript(a.left)+")))";case "IN":return"this.applyIn("+this.evaluateNodeToJavaScript(a.left)+",this.ensureArray("+
this.evaluateNodeToJavaScript(a.right)+"))";case "NOT IN":return"this.ternaryNot(this.applyIn("+this.evaluateNodeToJavaScript(a.left)+",this.ensureArray("+this.evaluateNodeToJavaScript(a.right)+")))";case "BETWEEN":return"this.between("+this.evaluateNodeToJavaScript(a.left)+","+this.evaluateNodeToJavaScript(a.right)+")";case "NOTBETWEEN":return"this.notbetween("+this.evaluateNodeToJavaScript(a.left)+","+this.evaluateNodeToJavaScript(a.right)+")";case "LIKE":return"this.applyLike("+this.evaluateNodeToJavaScript(a.left)+
","+this.evaluateNodeToJavaScript(a.right)+","+JSON.stringify(a.escape)+")";case "NOT LIKE":return"this.ternaryNot(this.applyLike("+this.evaluateNodeToJavaScript(a.left)+","+this.evaluateNodeToJavaScript(a.right)+","+JSON.stringify(a.escape)+"))";case "\x3c\x3e":case "\x3c":case "\x3e":case "\x3e\x3d":case "\x3c\x3d":case "\x3d":return"this.compare("+JSON.stringify(a.operator)+","+this.evaluateNodeToJavaScript(a.left)+","+this.evaluateNodeToJavaScript(a.right)+")";case "*":return"("+this.evaluateNodeToJavaScript(a.left)+
" * "+this.evaluateNodeToJavaScript(a.right)+")";case "-":return"("+this.evaluateNodeToJavaScript(a.left)+" - "+this.evaluateNodeToJavaScript(a.right)+")";case "+":return"("+this.evaluateNodeToJavaScript(a.left)+" + "+this.evaluateNodeToJavaScript(a.right)+")";case "/":return"("+this.evaluateNodeToJavaScript(a.left)+" / "+this.evaluateNodeToJavaScript(a.right)+")"}throw Error("Not Supported Operator "+a.operator);case "null":case "bool":case "string":case "number":return JSON.stringify(a.value);case "date":return"(new Date("+
x(a.value).getTime().toString()+"))";case "timestamp":return"(new Date("+w(a.value).getTime().toString()+"))";case "column_ref":return"CURRENT_DATE"===a.column.toUpperCase()?"this.currentDate()":"CURRENT_TIMESTAMP"===a.column.toUpperCase()?"this.currentTimestamp()":"this.featureValue(feature,"+JSON.stringify(a.column)+")";case "function":return"this.evaluateFunction("+JSON.stringify(a.name)+","+this.evaluateNodeToJavaScript(a.args)+")"}throw Error("Unsupported sql syntax "+a.type);};e.prototype.calculateValue=
function(a){return this.evaluateNode(this.parseTree,a)};e.prototype.predictType=function(a,b){void 0===b&&(b={});for(var c={},d={},f={esriFieldTypeSmallInteger:"integer",esriFieldTypeInteger:"integer",esriFieldTypeSingle:"double",esriFieldTypeDouble:"double",esriFieldTypeString:"string",esriFieldTypeDate:"date",esriFieldTypeOID:"integer",oid:"integer",long:"integer","small-integer":"integer",integer:"integer",single:"double",double:"double",date:"date",string:"string"},e=0;e<a.length;e++){var g=a[e],
k=f[g.type];c[g.name.toLowerCase()]=void 0===k?"":k}for(g in b)k=f[b[g]],d[g.toLowerCase()]=void 0===k?"":k;switch(this.evaluateType(c,this.parseTree,d)){case "double":return"double";case "integer":return"integer";case "double":return"double";case "date":return"date";case "string":return"string"}return""};e.prototype.evaluateType=function(a,b,c){switch(b.type){case "case_expression":var d=[];if("simple"===b.format)for(var f=0;f<b.clauses.length;f++)d.push(this.evaluateType(a,b.clauses[f].value,c));
else for(f=0;f<b.clauses.length;f++)d.push(this.evaluateType(a,b.else,c));null!==b.else&&d.push(this.evaluateType(a,b.else,c));return r(d);case "param":a=c[b.value.toLowerCase()];if(void 0===a&&this.parameters){b=this.parameters[b.value.toLowerCase()];if(void 0===b||null===b)return"";if("string"===typeof b||b instanceof String)return"string";if("boolean"===typeof b)return"boolean";if(b instanceof Date)return"date";if("number"===typeof b)return 0===b%1?"integer":"double"}return void 0===a?"":a;case "expr_list":d=
[];f=0;for(b=b.value;f<b.length;f++)d.push(this.evaluateType(a,b[f],c));return d;case "unary_expr":return"boolean";case "binary_expr":switch(b.operator){case "AND":return"boolean";case "OR":return"boolean";case "IS":if("null"!==b.right.type)throw Error("Unsupported RHS for IS");return"boolean";case "ISNOT":if("null"!==b.right.type)throw Error("Unsupported RHS for IS");return"boolean";case "IN":return"boolean";case "NOT IN":return"boolean";case "BETWEEN":return"boolean";case "NOTBETWEEN":return"boolean";
case "LIKE":return"boolean";case "NOT LIKE":return"boolean";case "\x3c\x3e":case "\x3c":case "\x3e":case "\x3e\x3d":case "\x3c\x3d":case "\x3d":return"boolean";case "*":case "-":case "+":case "/":return r([this.evaluateType(a,b.left,c),this.evaluateType(a,b.right,c)])}throw Error("Not Supported Operator "+b.operator);case "null":return"";case "bool":return"boolean";case "string":return"string";case "number":return null===b.value?"":0===b.value%1?"integer":"double";case "date":return"date";case "timestamp":return"date";
case "column_ref":if("CURRENT_DATE"===b.column.toUpperCase()||"CURRENT_TIMESTAMP"===b.column.toUpperCase())return"date";a=a[b.column.toLowerCase()];return void 0===a?"":a;case "function":switch(b.name.toLowerCase()){case "position":case "extract":case "char_length":return"integer";case "round":a=this.evaluateType(a,b.args,c);if(a instanceof Array){if(0<a.length)return a[0];break}return a;case "sign":return a=this.evaluateType(a,b.args,c),a instanceof Array&&(a=r(a)),"integer"===a||"double"===a?a:
"double";case "ceiling":case "floor":case "abs":return a=this.evaluateType(a,b.args,c),a instanceof Array?r(a):a;case "area":case "length":case "log":case "log10":case "sin":case "cos":case "tan":case "asin":case "acos":case "atan":case "power":return"double";case "substring":case "trim":case "concat":case "lower":case "upper":return"string";case "truncate":return"double";case "round":if(a=this.evaluateType(a,b.args,c),a instanceof Array){if(0<a.length)return a[0]}else return a}return""}throw Error("Unsupported sql syntax "+
b.type);};e.prototype.calculateValueCompiled=function(a){void 0===this.parseTree._compiledVersion&&this._compileMe();return this.parseTree._compiledVersion(a,this.parameters)};e.prototype.getFunctions=function(){var a=[];this.visitAll(this.parseTree,function(b){"function"===b.type&&a.push(b.name.toLowerCase())});return A(a)};e.prototype.getFields=function(){var a=[];this.visitAll(this.parseTree,function(b){"column_ref"===b.type&&a.push(b.column)});return A(a)};e.prototype.getVariables=function(){var a=
[];this.visitAll(this.parseTree,function(b){"param"===b.type&&a.push(b.value.toLowerCase())});return A(a)};e.prototype.featureValue=function(a,b,c){var d=a.attributes[b];if(void 0!==d)return d;for(var f in a.attributes)if(b.toLowerCase()===f.toLowerCase())return c.column=f,a.attributes[f];return null};e.prototype.visitAll=function(a,b){if(null!=a)switch(b(a),a.type){case "when_clause":this.visitAll(a.operand,b);this.visitAll(a.value,b);break;case "case_expression":for(var c=0,d=a.clauses;c<d.length;c++){var f=
d[c];this.visitAll(f,b)}"simple"===a.format&&this.visitAll(a.operand,b);null!==a.else&&this.visitAll(a.else,b);break;case "expr_list":c=0;for(a=a.value;c<a.length;c++)f=a[c],this.visitAll(f,b);break;case "unary_expr":this.visitAll(a.expr,b);break;case "binary_expr":this.visitAll(a.left,b);this.visitAll(a.right,b);break;case "function":this.visitAll(a.args,b)}};e.prototype.toWhereClause=function(a){return this.evaluateNodeToWhereClause(this.parseTree,a)};e.prototype.reformulateWithoutField=function(a,
b){return e.create(this.evaluateNodeToWhereClause(this.parseTree,g.FeatureServiceDatabaseType.Standardised,a,b))};e.prototype.statisticFunction=function(){if("function"===this.parseTree.type){if(0===this.parseTree.args.value.length)return{name:this.parseTree.name,expr:null};if(1<this.parseTree.args.value.length)throw Error("Statistic does not have 1 or 0 Parameters");var a=new e;a.parseTree=this.parseTree.args.value[0];return{name:this.parseTree.name,expr:a}}return null};e.prototype.testFeatureDeferred=
function(a){var b=new n;this.evaluateNodeDeferred(this.parseTree,a).then(g.callback(function(a){b.resolve(a)},b),g.errback(b));return b.promise};e.prototype.calculateValueDeferred=function(a){var b=new n;this.evaluateNodeDeferred(this.parseTree,a).then(g.callback(function(a){b.resolve(a)},b),g.errback(b));return b.promise};e.prototype.scanForField=function(a){return this.findField(this.parseTree,a)};e.combine=function(a,b,c){void 0===c&&(c="AND");return e.create("(("+a.toWhereClause(g.FeatureServiceDatabaseType.Standardised)+
")"+c+"("+b.toWhereClause(g.FeatureServiceDatabaseType.Standardised)+"))")};e.prototype.isSingleField=function(){return"column_ref"===this.parseTree.type?!0:!1};e.prototype.findField=function(a,b){if(null===a||void 0===a)return!1;switch(a.type){case "when_clause":return this.findField(a.operand,b)||this.findField(a.value,b);case "case_expression":for(var c=0,d=a.clauses;c<d.length;c++){var f=d[c];if(this.findField(f,b))return!0}if("simple"===a.format&&this.findField(a.operand,b)||null!==a.else&&this.findField(a.else,
b))return!0;break;case "expr_list":c=0;for(a=a.value;c<a.length;c++)if(f=a[c],this.findField(f,b))return!0;break;case "unary_expr":return this.findField(a.expr,b);case "binary_expr":return this.findField(a.left,b)||this.findField(a.right,b);case "column_ref":return b.toLowerCase()===a.column.toLowerCase();case "function":return this.findField(a.args,b)}return!1};e.prototype.evaluateNode=function(a,b){switch(a.type){case "case_expression":if("simple"===a.format)for(var c=m(this.evaluateNode(a.operand,
b)),d=0;d<a.clauses.length;d++){if(c===m(this.evaluateNode(a.clauses[d].operand,b)))return this.evaluateNode(a.clauses[d].value,b)}else for(d=0;d<a.clauses.length;d++)if(!0===this.evaluateNode(a.clauses[d].operand,b))return this.evaluateNode(a.clauses[d].value,b);return null!==a.else?this.evaluateNode(a.else,b):null;case "param":return this.parameters[a.value.toLowerCase()];case "expr_list":c=[];d=0;for(a=a.value;d<a.length;d++){var f=a[d];c.push(this.evaluateNode(f,b))}return c;case "unary_expr":return p(this.evaluateNode(a.expr,
b));case "binary_expr":switch(a.operator){case "AND":return E(this.evaluateNode(a.left,b),this.evaluateNode(a.right,b));case "OR":return F(this.evaluateNode(a.left,b),this.evaluateNode(a.right,b));case "IS":if("null"!==a.right.type)throw Error("Unsupported RHS for IS");return null===this.evaluateNode(a.left,b);case "ISNOT":if("null"!==a.right.type)throw Error("Unsupported RHS for IS");return null!==this.evaluateNode(a.left,b);case "IN":return c=y(this.evaluateNode(a.right,b)),q(this.evaluateNode(a.left,
b),c);case "NOT IN":return c=y(this.evaluateNode(a.right,b)),p(q(this.evaluateNode(a.left,b),c));case "BETWEEN":return c=this.evaluateNode(a.left,b),b=this.evaluateNode(a.right,b),null==c||null==b[0]||null==b[1]?null:c>=b[0]&&c<=b[1];case "NOTBETWEEN":return c=this.evaluateNode(a.left,b),b=this.evaluateNode(a.right,b),null==c||null==b[0]||null==b[1]?null:c<b[0]||c>b[1];case "LIKE":return t(this.evaluateNode(a.left,b),this.evaluateNode(a.right,b),a.escape);case "NOT LIKE":return p(t(this.evaluateNode(a.left,
b),this.evaluateNode(a.right,b),a.escape));case "\x3c\x3e":case "\x3c":case "\x3e":case "\x3e\x3d":case "\x3c\x3d":case "\x3d":return z(a.operator,this.evaluateNode(a.left,b),this.evaluateNode(a.right,b));case "*":return this.evaluateNode(a.left,b)*this.evaluateNode(a.right,b);case "-":return this.evaluateNode(a.left,b)-this.evaluateNode(a.right,b);case "+":return this.evaluateNode(a.left,b)+this.evaluateNode(a.right,b);case "/":return this.evaluateNode(a.left,b)/this.evaluateNode(a.right,b)}throw Error("Not Supported Operator "+
a.operator);case "null":case "bool":case "string":case "number":return a.value;case "date":return x(a.value);case "timestamp":return w(a.value);case "column_ref":return"CURRENT_DATE"===a.column.toUpperCase()?(f=new Date,f.setHours(0,0,0,0),f):"CURRENT_TIMESTAMP"===a.column.toUpperCase()?new Date:this.featureValue(b,a.column,a);case "function":return b=this.evaluateNode(a.args,b),l.evaluateFunction(a.name,b)}throw Error("Unsupported sql syntax "+a.type);};e.prototype._makeDateString=function(a,b){a=
u(a);var c=0===a.minute()&&0===a.hour()&&0===a.second()&&0===a.millisecond();switch(b){case g.FeatureServiceDatabaseType.FILEGDB:case g.FeatureServiceDatabaseType.Standardised:return c?"date '"+a.format("YYYY-MM-DD")+"'":"date '"+a.format("YYYY-MM-DD HH:mm:ss")+"'";case g.FeatureServiceDatabaseType.Oracle:return c?"TO_DATE('"+a.format("YYYY-MM-DD")+"','YYYY-MM-DD')":"TO_DATE('"+a.format("YYYY-MM-DD HH:mm:ss")+"','YYYY-MM-DD HH24:MI:SS')";case g.FeatureServiceDatabaseType.SqlServer:return"'"+a.format(c?
"YYYY-MM-DD":"YYYY-MM-DD HH:mm:ss")+"'";case g.FeatureServiceDatabaseType.PGDB:return"#"+a.format(c?"MM-DD-YYYY":"MM-DD-YYYY HH:mm:ss")+"#";case g.FeatureServiceDatabaseType.Postgres:return"TIMESTAMP '"+a.format(c?"YYYY-MM-DD":"YYYY-MM-DD HH:mm:ss")+"'";default:return"date '"+a.format("YYYY-MM-DD HH:mm:ss")+"'"}};e.prototype._makeToday=function(a,b){switch(b){case g.FeatureServiceDatabaseType.FILEGDB:case g.FeatureServiceDatabaseType.Standardised:return a?"CURRENT_DATE":"CURRENT_TIMESTAMP";case g.FeatureServiceDatabaseType.Oracle:return a?
"CURRENT_DATE":"CURRENT_TIMESTAMP";case g.FeatureServiceDatabaseType.SqlServer:return a?"CAST(GETDATE() AS DATE)":"GETDATE()";case g.FeatureServiceDatabaseType.PGDB:return a?"CURRENT_DATE":"CURRENT_TIMESTAMP";case g.FeatureServiceDatabaseType.Postgres:return a?"CURRENT_DATE":"CURRENT_TIMESTAMP";default:return a?"CURRENT_DATE":"CURRENT_TIMESTAMP"}};e.prototype.evaluateNodeToWhereClause=function(a,b,c,d){void 0===c&&(c=null);void 0===d&&(d=null);var f;switch(a.type){case "case_expression":var e=" CASE ";
"simple"===a.format&&(e+=this.evaluateNodeToWhereClause(a.operand,b,c,d));for(f=0;f<a.clauses.length;f++)e+=" WHEN "+this.evaluateNodeToWhereClause(a.clauses[f].operand,b,c,d)+" THEN "+this.evaluateNodeToWhereClause(a.clauses[f].value,b,c,d);null!==a.else&&(e+=" ELSE "+this.evaluateNodeToWhereClause(a.else,b,c,d));return e+" END ";case "param":c=this.parameters[a.value.toLowerCase()];if("string"===typeof c)return"'"+this.parameters[a.value.toLowerCase()].toString().replace(/'/g,"''")+"'";if(c instanceof
Date)return this._makeDateString(c,b);if(c instanceof Array){a=[];for(f=0;f<c.length;f++)"string"===typeof c[f]?a.push("'"+c[f].toString().replace(/'/g,"''")+"'"):c[f]instanceof Date?a.push(this._makeDateString(c[f],b)):a.push(c[f].toString());return a}return c.toString();case "expr_list":f=[];e=0;for(a=a.value;e<a.length;e++)f.push(this.evaluateNodeToWhereClause(a[e],b,c,d));return f;case "unary_expr":return" ( NOT "+this.evaluateNodeToWhereClause(a.expr,b,c,d)+" ) ";case "binary_expr":switch(a.operator){case "AND":return" ("+
this.evaluateNodeToWhereClause(a.left,b,c,d)+" AND "+this.evaluateNodeToWhereClause(a.right,b,c,d)+") ";case "OR":return" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" OR "+this.evaluateNodeToWhereClause(a.right,b,c,d)+") ";case "IS":if("null"!==a.right.type)throw Error("Unsupported RHS for IS");return" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" IS NULL )";case "ISNOT":if("null"!==a.right.type)throw Error("Unsupported RHS for IS");return" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+
" IS NOT NULL )";case "IN":f=[];if("expr_list"===a.right.type)return f=this.evaluateNodeToWhereClause(a.right,b,c,d)," ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" IN ("+f.join(",")+")) ";f=this.evaluateNodeToWhereClause(a.right,b,c,d);return f instanceof Array?" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" IN ("+f.join(",")+")) ":" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" IN ("+f+")) ";case "NOT IN":f=[];if("expr_list"===a.right.type)return f=this.evaluateNodeToWhereClause(a.right,
b,c,d)," ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" NOT IN ("+f.join(",")+")) ";f=this.evaluateNodeToWhereClause(a.right,b,c,d);return f instanceof Array?" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" NOT IN ("+f.join(",")+")) ":" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" NOT IN ("+f+")) ";case "BETWEEN":return f=this.evaluateNodeToWhereClause(a.right,b,c,d)," ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" BETWEEN "+f[0]+" AND "+f[1]+" ) ";case "NOTBETWEEN":return f=this.evaluateNodeToWhereClause(a.right,
b,c,d)," ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" NOT BETWEEN "+f[0]+" AND "+f[1]+" ) ";case "LIKE":return""!==a.escape?" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" LIKE "+this.evaluateNodeToWhereClause(a.right,b,c,d)+" ESCAPE '"+a.escape+"') ":" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" LIKE "+this.evaluateNodeToWhereClause(a.right,b,c,d)+") ";case "NOT LIKE":return""!==a.escape?" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" NOT LIKE "+this.evaluateNodeToWhereClause(a.right,
b,c,d)+" ESCAPE '"+a.escape+"') ":" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" NOT LIKE "+this.evaluateNodeToWhereClause(a.right,b,c,d)+") ";case "\x3c\x3e":case "\x3c":case "\x3e":case "\x3e\x3d":case "\x3c\x3d":case "\x3d":case "*":case "-":case "+":case "/":return" ("+this.evaluateNodeToWhereClause(a.left,b,c,d)+" "+a.operator+" "+this.evaluateNodeToWhereClause(a.right,b,c,d)+") "}throw Error("Not Supported Operator "+a.operator);case "null":return"null";case "bool":return!0===a.value?"1":
"0";case "string":return"'"+a.value.toString().replace(/'/g,"''")+"'";case "timestamp":return this._makeDateString(a.value,b);case "date":return this._makeDateString(a.value,b);case "number":return a.value.toString();case "column_ref":return"CURRENT_DATE"===a.column.toUpperCase()?this._makeToday(!0,b):"CURRENT_TIMESTAMP"===a.column.toUpperCase()?this._makeToday(!1,b):c?c.toLowerCase()===a.column.toLowerCase()?"("+d+")":a.column:a.column;case "function":return c=this.evaluateNodeToWhereClause(a.args,
b,c,d),this._translateFunctionToDatabaseSpecific(a.name,c,b)}throw Error("Unsupported sql syntax "+a.type);};e.prototype._translateFunctionToDatabaseSpecific=function(a,b,c){switch(a.toLowerCase().trim()){case "abs":if(1!==b.length)throw Error("Invalid Parameter for call to ABS");return"abs("+b[0]+")";case "ceiling":case "ceil":if(1!==b.length)throw Error("Invalid Parameter for call to CEILING");switch(c){case g.FeatureServiceDatabaseType.Standardised:return"CEILING("+b[0]+")";default:return"CEILING("+
b[0]+")"}case "floor":if(1!==b.length)throw Error("Invalid Parameter for call to Floor");return"FLOOR("+b[0]+")";case "log":if(1!==b.length)throw Error("Invalid Parameter for call to LOG");return"LOG("+b[0]+")";case "log10":if(1!==b.length)throw Error("Invalid Parameter for call to LOG10");return"LOG10("+b[0]+")";case "power":if(2!==b.length)throw Error("Invalid Parameter for call to POWER");return"POWER("+b[0]+","+b[1]+")";case "round":if(2===b.length)return"ROUND("+b[0]+","+b[1]+")";if(1===b.length)return"ROUND("+
b[0]+")";throw Error("Invalid Parameter for call to ROUND");case "truncate":if(1>b.length||2<b.length)throw Error("Invalid Parameter for TRUNCATE function");switch(c){case g.FeatureServiceDatabaseType.SqlServer:return"ROUND("+b[0]+(1===b.length?"0":","+b[1])+",1)";default:return"TRUNCATE("+b[0]+(1===b.length?")":","+b[1]+")")}case "char_length":case "len":if(1!==b.length)throw Error("Invalid Parameter for CHAR_LENGTH function");switch(c){case g.FeatureServiceDatabaseType.SqlServer:return"LEN("+b[0]+
")";case g.FeatureServiceDatabaseType.Oracle:return"LENGTH("+b[0]+")";default:return"CHAR_LENGTH("+b[0]+")"}case "concat":if(1>b.length)throw Error("Invalid Parameter for CONCAT function");c="CONCAT(";for(a=0;a<b.length;a++)0!==a&&(c+=","),c+=b[a];return c+")";case "lower":case "lcase":if(1!==b.length)throw Error("Invalid Parameter for Lower function");return"LOWER("+b[0]+")";case "upper":case "ucase":if(1!==b.length)throw Error("Invalid Parameter for Upper function");return"UPPER("+b[0]+")";case "substring":switch(a=
"",c){case g.FeatureServiceDatabaseType.Oracle:return a="SUBSTR("+b[0]+","+b[1],3===b.length&&(a+=","+b[2]),a+")";case g.FeatureServiceDatabaseType.SqlServer:return a=3===b.length?"SUBSTRING("+b[0]+","+b[1]+","+b[2]+")":"SUBSTRING("+b[0]+",  "+b[1]+", LEN("+b[0]+") - "+b[1]+")";default:return a="SUBSTRING("+b[0]+" FROM "+b[1],3===b.length&&(a+=" FOR "+b[2]),a+")"}case "extract":return"EXTRACT("+b[0].replace(/\'/g,"")+" FROM "+b[1]+")"}throw Error("Function Not Recognised");};e.prototype.evaluateWhereClausesSimpleDeferred=
function(a,b,c,d,e){var f=this,g=new n;try{b>=a.length?null===c?g.resolve(null):this.evaluateNodeDeferred(c,e).then(function(a){g.resolve(a)},function(a){g.reject(a)}):this.evaluateNodeDeferred(a[b],e).then(function(h){try{d===m(h)?f.evaluateNodeDeferred(a[b].value,e).then(function(a){g.resolve(a)},function(a){g.reject(a)}):f.evaluateWhereClausesSimpleDeferred(a,b+1,c,d,e).then(function(a){g.resolve(a)},function(a){g.reject(a)})}catch(B){g.reject(B)}},function(a){g.reject(a)})}catch(k){g.reject(k)}return g.promise};
e.prototype.evaluateWhereClausesDeferred=function(a,b,c,d){var e=this,g=new n;try{b>=a.length?null===c?g.resolve(null):this.evaluateNodeDeferred(c,d).then(function(a){g.resolve(a)},function(a){g.reject(a)}):this.evaluateNodeDeferred(a[b].operand,d).then(function(f){try{!0===f?e.evaluateNodeDeferred(a[b].value,d).then(function(a){g.resolve(a)},function(a){g.reject(a)}):e.evaluateWhereClausesDeferred(a,b+1,c,d).then(function(a){g.resolve(a)},function(a){g.reject(a)})}catch(k){g.reject(k)}},function(a){g.reject(a)})}catch(I){g.reject(I)}return g.promise};
e.prototype.evaluateNodeDeferred=function(a,b){var c=this,d=new n,e;try{var h=void 0;switch(a.type){case "case_expression":"simple"===a.format?this.evaluateNodeDeferred(a.operand,b).then(function(e){e=m(e);c.evaluateWhereClausesSimpleDeferred(a.clauses,0,a.else,e,b).then(function(a){d.resolve(a)},function(a){d.reject(a)})},function(a){d.reject(a)}):this.evaluateWhereClausesDeferred(a.clauses,0,a.else,b).then(function(a){d.resolve(a)},function(a){d.reject(a)});break;case "param":d.resolve(this.parameters[a.value.toLowerCase()]);
break;case "expr_list":h=[];e=0;for(var l=a.value;e<l.length;e++){var k=l[e];h.push(this.evaluateNodeDeferred(k,b))}C(h).then(g.callback(function(a){d.resolve(a)},d),g.errback(d));break;case "unary_expr":this.evaluateNodeDeferred(a.value,b).then(g.callback(function(a){d.resolve(p(a))},d),g.errback(d));break;case "binary_expr":switch(a.operator){case "IS":"null"!==a.right.type?d.reject(Error("Unsupported RHS for IS")):this.evaluateNodeDeferred(a.left,b).then(g.callback(function(a){d.resolve(null===
a)},d),g.errback(d));break;case "ISNOT":"null"!==a.right.type?d.reject(Error("Unsupported RHS for IS")):this.evaluateNodeDeferred(a.left,b).then(g.callback(function(a){d.resolve(null!==a)},d),g.errback(d));break;case "LIKE":case "NOT LIKE":case "BETWEEN":case "NOTBETWEEN":case "IN":case "NOT IN":case "AND":case "OR":case "\x3c\x3e":case "\x3c":case "\x3e":case "\x3e\x3d":case "\x3c\x3d":case "\x3d":case "*":case "-":case "+":case "/":e=[this.evaluateNodeDeferred(a.left,b),this.evaluateNodeDeferred(a.right,
b)];C(e).then(g.callback(function(b){switch(a.operator){case "LIKE":case "NOT LIKE":b=t(b[0],b[0],a.escape);d.resolve("LIKE"===a.operator?b:p(b));break;case "BETWEEN":var c=b[0];b=b[1];d.resolve(null==c||null==b[0]||null==b[1]?null:c>=b[0]&&c<=b[1]);break;case "NOTBETWEEN":c=b[0];b=b[1];d.resolve(null==c||null==b[0]||null==b[1]?null:c<b[0]||c>b[1]);break;case "IN":case "NOT IN":c=b[1]instanceof Array?b[1]:[null];"IN"===a.operator?d.resolve(q(b[0],c)):"NOT IN"===a.operator&&d.resolve(p(q(b[0],c)));
break;case "AND":d.resolve(E(b[0],b[1]));break;case "OR":d.resolve(F(b[0],b[1]));break;case "\x3c\x3e":case "\x3c":case "\x3e":case "\x3e\x3d":case "\x3c\x3d":case "\x3d":d.resolve(z(a.operator,b[0],b[1]));break;case "*":d.resolve(b[0]*b[1]);break;case "-":d.resolve(b[0]-b[1]);break;case "+":d.resolve(b[0]+b[1]);break;case "/":d.resolve(b[0]/b[1]);break;default:d.reject(Error("Unrecognised operator"))}},d),g.errback(d));break;default:d.reject(Error("Not Supported Operator "+a.operator))}break;case "null":case "bool":case "string":case "number":d.resolve(a.value);
break;case "date":d.resolve(x(a.value));break;case "timestamp":d.resolve(w(a.value));break;case "column_ref":"CURRENT_DATE"===a.column.toUpperCase()?(k=new Date,k.setHours(0,0,0,0),d.resolve(k)):"CURRENT_TIMESTAMP"===a.column.toUpperCase()?d.resolve(new Date):d.resolve(this.featureValue(b,a.column,a));break;case "function":this.evaluateNodeDeferred(a.args,b).then(g.callback(function(e){c.executeFunctionDeferred(a.name,b,e).then(g.callback(function(a){d.resolve(a)},d),g.errback(d))},d),g.errback(d));
break;default:d.reject(Error("Malformed Where Clause"))}}catch(B){d.reject(B)}return d.promise};e.prototype.executeFunctionDeferred=function(a,b,c){var d=new n,e=0;try{if(l.isStandardized(a,c.length))d.resolve(l.evaluateFunction(a,c));else switch(a.toLowerCase().trim()){case "area":e=g.convertSquareUnitsToCode(c[0]);a=!1;void 0===c[1]||null===c[1]||"1"!==c[1].toString()&&"true"!==c[1].toString().toLowerCase()&&"geodesic"!==c[1].toString().toLowerCase()||(a=!0);null===b.geometry?d.resolve(0):a?v.geodesicArea(b.geometry,
e).then(g.callback(function(a){d.resolve(a)},d),g.errback(d)):v.planarArea(b.geometry,e).then(g.callback(function(a){d.resolve(a)},d),g.errback(d));break;case "length":e=g.convertLinearUnitsToCode(c[0]);void 0===c[1]||null===c[1]||"1"!==c[1].toString()&&"true"!==c[1].toString().toLowerCase()&&"geodesic"!==c[1].toString().toLowerCase()||(a=!0);null===b.geometry?d.resolve(0):v.planarLength(b.geometry,e).then(g.callback(function(a){d.resolve(a)},d),g.errback(d));break;default:d.reject(Error("Function Not Recognised"))}}catch(h){d.reject(h)}return d.promise};
return e}()});