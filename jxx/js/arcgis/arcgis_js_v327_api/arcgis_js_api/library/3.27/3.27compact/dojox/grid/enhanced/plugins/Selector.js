//>>built
define("dojox/grid/enhanced/plugins/Selector","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/_base/event dojo/keys dojo/query dojo/_base/html dojo/_base/window dijit/focus ../../_RowSelector ../_Plugin ../../EnhancedGrid ../../cells/_base ./AutoScroll".split(" "),function(v,m,A,f,B,w,y,l,C,z,t,D,E){var q={col:"row",row:"col"},p=function(a,b,c,d,e){return"cell"!==a?(b=b[a],c=c[a],d=d[a],"number"!==typeof b||"number"!==typeof c||"number"!==typeof d?!1:e?b>=c&&b<d||b>d&&
b<=c:b>=c&&b<=d||b>=d&&b<=c):p("col",b,c,d,e)&&p("row",b,c,d,e)},x=function(a,b,c){try{if(b&&c)switch(a){case "col":case "row":return b[a]==c[a]&&"number"==typeof b[a]&&!(q[a]in b)&&!(q[a]in c);case "cell":return b.col==c.col&&b.row==c.row&&"number"==typeof b.col&&"number"==typeof b.row}}catch(d){}return!1},u=function(a){try{a&&a.preventDefault&&B.stop(a)}catch(b){}},k=function(a,b,c){switch(a){case "col":return{col:"undefined"==typeof c?b:c,except:[]};case "row":return{row:b,except:[]};case "cell":return{row:b,
col:c}}return null};v=A("dojox.grid.enhanced.plugins.Selector",D,{name:"selector",constructor:function(a,b){this.grid=a;this._config={row:2,col:2,cell:2};this.noClear=b&&b.noClear;this.setupConfig(b);"single"===a.selectionMode&&(this._config.row=1);this._enabled=!0;this._selecting={};this._selected={col:[],row:[],cell:[]};this._startPoint={};this._currentPoint={};this._lastAnchorPoint={};this._lastEndPoint={};this._lastSelectedAnchorPoint={};this._lastSelectedEndPoint={};this._keyboardSelect={};this._lastType=
null;this._selectedRowModified={};this._hacks();this._initEvents();this._initAreas();this._mixinGrid()},destroy:function(){this.inherited(arguments)},setupConfig:function(a){if(a&&m.isObject(a)){var b=["row","col","cell"],c;for(c in a)0<=f.indexOf(b,c)&&(this._config[c]=a[c]&&"disabled"!=a[c]?"single"==a[c]?1:2:0);this.grid.selection.setMode(["none","single","extended"][this._config.row])}},isSelected:function(a,b,c){return this._isSelected(a,k(a,b,c))},toggleSelect:function(a,b,c){this._startSelect(a,
k(a,b,c),2===this._config[a],!1,!1,!this.isSelected(a,b,c));this._endSelect(a)},select:function(a,b,c){this.isSelected(a,b,c)||this.toggleSelect(a,b,c)},deselect:function(a,b,c){this.isSelected(a,b,c)&&this.toggleSelect(a,b,c)},selectRange:function(a,b,c,d){this.grid._selectingRange=!0;b="cell"==a?k(a,b.row,b.col):k(a,b);c="cell"==a?k(a,c.row,c.col):k(a,c);this._startSelect(a,b,!1,!1,!1,d);this._highlight(a,c,void 0===d?!0:d);this._endSelect(a);this.grid._selectingRange=!1},clear:function(a){this._clearSelection(a||
"all")},isSelecting:function(a){return"undefined"==typeof a?this._selecting.col||this._selecting.row||this._selecting.cell:this._selecting[a]},selectEnabled:function(a){"undefined"==typeof a||this.isSelecting()||(this._enabled=!!a);return this._enabled},getSelected:function(a,b){switch(a){case "cell":return f.map(this._selected[a],function(a){return a});case "col":case "row":return f.map(b?this._selected[a]:f.filter(this._selected[a],function(a){return 0===a.except.length}),function(c){return b?c:
c[a]})}return[]},getSelectedCount:function(a,b){switch(a){case "cell":return this._selected[a].length;case "col":case "row":return(b?this._selected[a]:f.filter(this._selected[a],function(a){return 0===a.except.length})).length}return 0},getSelectedType:function(){var a=this._selected;return" cell row row|cell col col|cell col|row col|row|cell".split(" ")[!!a.cell.length|!!a.row.length<<1|!!a.col.length<<2]},getLastSelectedRange:function(a){return this._lastAnchorPoint[a]?{start:this._lastAnchorPoint[a],
end:this._lastEndPoint[a]}:null},_hacks:function(){var a=this.grid,b=function(b){if(b.cellNode)a.onMouseUp(b);a.onMouseUpRow(b)},c=m.hitch(a,"onMouseUp"),d=m.hitch(a,"onMouseDown"),e=function(a){a.cellNode.style.border="solid 1px"};f.forEach(a.views.views,function(a){a.content.domouseup=b;a.header.domouseup=c;"dojox.grid._RowSelector"==a.declaredClass&&(a.domousedown=d,a.domouseup=c,a.dofocus=e)});a.selection.clickSelect=function(){};this._oldDeselectAll=a.selection.deselectAll;var g=this;a.selection.selectRange=
function(b,c){g.selectRange("row",b,c,!0);a.selection.preserver&&a.selection.preserver._updateMapping(!0,!0,!1,b,c);a.selection.onChanged()};a.selection.deselectRange=function(b,c){g.selectRange("row",b,c,!1);a.selection.preserver&&a.selection.preserver._updateMapping(!0,!1,!1,b,c);a.selection.onChanged()};a.selection.deselectAll=function(){a._selectingRange=!0;g._oldDeselectAll.apply(a.selection,arguments);g._clearSelection("all");a._selectingRange=!1;a.selection.preserver&&a.selection.preserver._updateMapping(!0,
!1,!0);a.selection.onChanged()};var h=a.views.views[0];h instanceof t&&(h.doStyleRowNode=function(b,c){l.removeClass(c,"dojoxGridRow");l.addClass(c,"dojoxGridRowbar");l.addClass(c,"dojoxGridNonNormalizedCell");l.toggleClass(c,"dojoxGridRowbarOver",a.rows.isOver(b));l.toggleClass(c,"dojoxGridRowbarSelected",!!a.selection.isSelected(b))});this.connect(a,"updateRow",function(b){f.forEach(a.layout.cells,function(a){this.isSelected("cell",b,a.index)&&this._highlightNode(a.getNode(b),!0)},this)})},_mixinGrid:function(){var a=
this.grid;a.setupSelectorConfig=m.hitch(this,this.setupConfig);a.onStartSelect=function(){};a.onEndSelect=function(){};a.onStartDeselect=function(){};a.onEndDeselect=function(){};a.onSelectCleared=function(){}},_initEvents:function(){var a=this.grid,b=this,c=m.partial,d=function(a,c){"row"===a&&(b._isUsingRowSelector=!0);if(b.selectEnabled()&&b._config[a]&&2!=c.button){if(b._keyboardSelect.col||b._keyboardSelect.row||b._keyboardSelect.cell)b._endSelect("all"),b._keyboardSelect.col=b._keyboardSelect.row=
b._keyboardSelect.cell=0;b._usingKeyboard&&(b._usingKeyboard=!1);var g=k(a,c.rowIndex,c.cell&&c.cell.index);b._startSelect(a,g,c.ctrlKey,c.shiftKey)}},e=m.hitch(this,"_endSelect");this.connect(a,"onHeaderCellMouseDown",c(d,"col"));this.connect(a,"onHeaderCellMouseUp",c(e,"col"));this.connect(a,"onRowSelectorMouseDown",c(d,"row"));this.connect(a,"onRowSelectorMouseUp",c(e,"row"));this.connect(a,"onCellMouseDown",function(c){c.cell&&c.cell.isRowSelector||(a.singleClickEdit&&(b._singleClickEdit=!0,a.singleClickEdit=
!1),d(0==b._config.cell?"row":"cell",c))});this.connect(a,"onCellMouseUp",function(c){b._singleClickEdit&&(delete b._singleClickEdit,a.singleClickEdit=!0);e("all",c)});this.connect(a,"onCellMouseOver",function(a){"row"!=b._curType&&b._selecting[b._curType]&&2==b._config[b._curType]&&(b._highlight("col",k("col",a.cell.index),b._toSelect),b._keyboardSelect.cell||b._highlight("cell",k("cell",a.rowIndex,a.cell.index),b._toSelect))});this.connect(a,"onHeaderCellMouseOver",function(a){b._selecting.col&&
2==b._config.col&&b._highlight("col",k("col",a.cell.index),b._toSelect)});this.connect(a,"onRowMouseOver",function(a){b._selecting.row&&2==b._config.row&&b._highlight("row",k("row",a.rowIndex),b._toSelect)});this.connect(a,"onSelectedById","_onSelectedById");this.connect(a,"_onFetchComplete",function(){a._notRefreshSelection||this._refreshSelected(!0)});this.connect(a.scroller,"buildPage",function(){a._notRefreshSelection||this._refreshSelected(!0)});this.connect(C.doc,"onmouseup",c(e,"all"));this.connect(a,
"onEndAutoScroll",function(a,c,e,d){e=b._selecting.cell;c=c?1:-1;a&&(e||b._selecting.row)?(a=e?"cell":"row",e=b._currentPoint[a],b._highlight(a,k(a,e.row+c,e.col),b._toSelect)):a||!e&&!b._selecting.col||(a=e?"cell":"col",e=b._currentPoint[a],b._highlight(a,k(a,e.row,d),b._toSelect))});this.subscribe("dojox/grid/rearrange/move/"+a.id,"_onInternalRearrange");this.subscribe("dojox/grid/rearrange/copy/"+a.id,"_onInternalRearrange");this.subscribe("dojox/grid/rearrange/change/"+a.id,"_onExternalChange");
this.subscribe("dojox/grid/rearrange/insert/"+a.id,"_onExternalChange");this.subscribe("dojox/grid/rearrange/remove/"+a.id,"clear");this.connect(a,"onSelected",function(a){this._selectedRowModified&&this._isUsingRowSelector?delete this._selectedRowModified:this.grid._selectingRange||this.select("row",a)});this.connect(a,"onDeselected",function(a){this._selectedRowModified&&this._isUsingRowSelector?delete this._selectedRowModified:this.grid._selectingRange||this.deselect("row",a)})},_onSelectedById:function(a,
b,c){if(!this.grid._noInternalMapping){var d=[this._lastAnchorPoint.row,this._lastEndPoint.row,this._lastSelectedAnchorPoint.row,this._lastSelectedEndPoint.row],d=d.concat(this._selected.row),e=!1;f.forEach(d,function(c){c&&(c.id===a?(e=!0,c.row=b):c.row===b&&c.id&&(c.row=-1))});!e&&c&&f.some(this._selected.row,function(c){return!c||c.id||c.except.length?!1:(c.id=a,c.row=b,!0)});e=!1;d=[this._lastAnchorPoint.cell,this._lastEndPoint.cell,this._lastSelectedAnchorPoint.cell,this._lastSelectedEndPoint.cell];
d=d.concat(this._selected.cell);f.forEach(d,function(c){c&&(c.id===a?(e=!0,c.row=b):c.row===b&&c.id&&(c.row=-1))})}},onSetStore:function(){this._clearSelection("all")},_onInternalRearrange:function(a,b){try{this._refresh("col",!1);f.forEach(this._selected.row,function(a){f.forEach(this.grid.layout.cells,function(b){this._highlightNode(b.getNode(a.row),!1)},this)},this);y(".dojoxGridRowSelectorSelected").forEach(function(a){l.removeClass(a,"dojoxGridRowSelectorSelected");l.removeClass(a,"dojoxGridRowSelectorSelectedUp");
l.removeClass(a,"dojoxGridRowSelectorSelectedDown")});var c=[this._lastAnchorPoint[a],this._lastEndPoint[a],this._lastSelectedAnchorPoint[a],this._lastSelectedEndPoint[a]];if("cell"===a){this.selectRange("cell",b.to.min,b.to.max);var d=this.grid.layout.cells;f.forEach(c,function(a){if(!a.converted)for(var c=b.from.min.row,e=b.to.min.row;c<=b.from.max.row;++c,++e)for(var n=b.from.min.col,r=b.to.min.col;n<=b.from.max.col;++n,++r){for(;d[n].hidden;)++n;for(;d[r].hidden;)++r;if(a.row==c&&a.col==n){a.row=
e;a.col=r;a.converted=!0;return}}})}else c=this._selected.cell.concat(this._selected[a]).concat(c).concat([this._lastAnchorPoint.cell,this._lastEndPoint.cell,this._lastSelectedAnchorPoint.cell,this._lastSelectedEndPoint.cell]),f.forEach(c,function(c){if(c&&!c.converted){var e=c[a];e in b&&(c[a]=b[e]);c.converted=!0}}),f.forEach(this._selected[q[a]],function(a){for(var c=0,d=a.except.length;c<d;++c){var e=a.except[c];e in b&&(a.except[c]=b[e])}});f.forEach(c,function(a){a&&delete a.converted});this._refreshSelected(!0);
this._focusPoint(a,this._lastEndPoint)}catch(e){console.warn("Selector._onInternalRearrange() error",e)}},_onExternalChange:function(a,b){this.selectRange(a,"cell"==a?b.min:b[0],"cell"==a?b.max:b[b.length-1])},_refresh:function(a,b){this._keyboardSelect[a]||f.forEach(this._selected[a],function(c){this._highlightSingle(a,b,c,void 0,!0)},this)},_refreshSelected:function(){this._refresh("col",!0);this._refresh("row",!0);this._refresh("cell",!0)},_initAreas:function(){var a=this.grid,b=a.focus,c=this,
d=function(d,e,r,g,f){var h=c._keyboardSelect;if(f.shiftKey&&h[d]){if(1===h[d]){if("cell"===d){var n=c._lastEndPoint[d];if(b.cell!=a.layout.cells[n.col+g]||b.rowIndex!=n.row+r){h[d]=0;return}}c._startSelect(d,c._lastAnchorPoint[d],!0,!1,!0);c._highlight(d,c._lastEndPoint[d],c._toSelect);h[d]=2}e=e(d,r,g,f);c._isValid(d,e,a)&&c._highlight(d,e,c._toSelect);u(f)}},e=function(b,d,e,g){if(g&&c.selectEnabled()&&0!=c._config[b])switch(e.keyCode){case w.SPACE:c._startSelect(b,d(),e.ctrlKey,e.shiftKey);c._endSelect(b);
break;case w.SHIFT:2==c._config[b]&&c._isValid(b,c._lastAnchorPoint[b],a)&&(c._endSelect(b),c._keyboardSelect[b]=1,c._usingKeyboard=!0)}},g=function(a,b,d){d&&b.keyCode==w.SHIFT&&c._keyboardSelect[a]&&(c._endSelect(a),c._keyboardSelect[a]=0)};a.views.views[0]instanceof t&&(this._lastFocusedRowBarIdx=0,b.addArea({name:"rowHeader",onFocus:function(d,e){e=a.views.views[0];if(e instanceof t){var h=e.getCellNode(c._lastFocusedRowBarIdx,0);h&&l.toggleClass(h,b.focusClass,!1);d&&"rowIndex"in d&&(0<=d.rowIndex?
c._lastFocusedRowBarIdx=d.rowIndex:c._lastFocusedRowBarIdx||(c._lastFocusedRowBarIdx=0));if(h=e.getCellNode(c._lastFocusedRowBarIdx,0))z.focus(h),l.toggleClass(h,b.focusClass,!0);b.rowIndex=c._lastFocusedRowBarIdx;u(d);return!0}return!1},onBlur:function(d,e){e=a.views.views[0];e instanceof t&&((e=e.getCellNode(c._lastFocusedRowBarIdx,0))&&l.toggleClass(e,b.focusClass,!1),u(d));return!0},onMove:function(d,e,g){e=a.views.views[0];if(d&&e instanceof t&&(d=c._lastFocusedRowBarIdx+d,0<=d&&d<a.rowCount)){u(g);
g=e.getCellNode(c._lastFocusedRowBarIdx,0);l.toggleClass(g,b.focusClass,!1);g=a.scroller;var h=g.getLastPageRow(g.page),f=Math.min(a.rowCount-1,d);d>h&&a.setScrollTop(a.scrollTop+g.findScrollTop(f)-g.findScrollTop(c._lastFocusedRowBarIdx));g=e.getCellNode(d,0);z.focus(g);l.toggleClass(g,b.focusClass,!0);c._lastFocusedRowBarIdx=d;b.cell=g;b.cell.view=e;b.cell.getNode=function(a){return b.cell};b.rowIndex=c._lastFocusedRowBarIdx;b.scrollIntoView();b.cell=null}}}),b.placeArea("rowHeader","before","content"));
b.addArea({name:"cellselect",onMove:m.partial(d,"cell",function(a,b,d,e){a=c._currentPoint[a];return k("cell",a.row+b,a.col+d)}),onKeyDown:m.partial(e,"cell",function(){return k("cell",b.rowIndex,b.cell.index)}),onKeyUp:m.partial(g,"cell")});b.placeArea("cellselect","below","content");b.addArea({name:"colselect",onMove:m.partial(d,"col",function(a,b,d,e){return k("col",c._currentPoint[a].col+d)}),onKeyDown:m.partial(e,"col",function(){return k("col",b.getHeaderIndex())}),onKeyUp:m.partial(g,"col")});
b.placeArea("colselect","below","header");b.addArea({name:"rowselect",onMove:m.partial(d,"row",function(a,c,d,e){return k("row",b.rowIndex)}),onKeyDown:m.partial(e,"row",function(){return k("row",b.rowIndex)}),onKeyUp:m.partial(g,"row")});b.placeArea("rowselect","below","rowHeader")},_clearSelection:function(a,b){"all"==a?(this._clearSelection("cell",b),this._clearSelection("col",b),this._clearSelection("row",b)):(this._isUsingRowSelector=!0,f.forEach(this._selected[a],function(c){x(a,b,c)||this._highlightSingle(a,
!1,c)},this),this._blurPoint(a,this._currentPoint),this._selecting[a]=!1,this._startPoint[a]=this._currentPoint[a]=null,this._selected[a]=[],"row"!=a||this.grid._selectingRange||(this._oldDeselectAll.call(this.grid.selection),this.grid.selection._selectedById={}),this.grid.onEndDeselect(a,null,null,this._selected),this.grid.onSelectCleared(a))},_startSelect:function(a,b,c,d,e,g){if(this._isValid(a,b)){var f=this._isSelected(a,this._lastEndPoint[a]),n=this._isSelected(a,b);this._toSelect=this.noClear&&
!c?void 0===g?!0:g:e?n:!n;if(!c||!n&&1==this._config[a])this._clearSelection("col",b),this._clearSelection("cell",b),(!this.noClear||"row"===a&&1==this._config[a])&&this._clearSelection("row",b),this._toSelect=void 0===g?!0:g;this._selecting[a]=!0;this._currentPoint[a]=null;d&&this._lastType==a&&f==this._toSelect&&2==this._config[a]?("row"===a&&(this._isUsingRowSelector=!0),this._startPoint[a]=this._lastAnchorPoint[a],this._highlight(a,this._startPoint[a]),this._isUsingRowSelector=!1):this._startPoint[a]=
b;this._curType=a;this._fireEvent("start",a);this._isUsingRowSelector=this._isStartFocus=!0;this._highlight(a,b,this._toSelect);this._isStartFocus=!1}},_endSelect:function(a){"row"===a&&delete this._isUsingRowSelector;"all"==a?(this._endSelect("col"),this._endSelect("row"),this._endSelect("cell")):this._selecting[a]&&(this._addToSelected(a),this._lastAnchorPoint[a]=this._startPoint[a],this._lastEndPoint[a]=this._currentPoint[a],this._toSelect&&(this._lastSelectedAnchorPoint[a]=this._lastAnchorPoint[a],
this._lastSelectedEndPoint[a]=this._lastEndPoint[a]),this._startPoint[a]=this._currentPoint[a]=null,this._selecting[a]=!1,this._lastType=a,this._fireEvent("end",a))},_fireEvent:function(a,b){switch(a){case "start":this.grid[this._toSelect?"onStartSelect":"onStartDeselect"](b,this._startPoint[b],this._selected);break;case "end":this.grid[this._toSelect?"onEndSelect":"onEndDeselect"](b,this._lastAnchorPoint[b],this._lastEndPoint[b],this._selected)}},_calcToHighlight:function(a,b,c,d){if(void 0!==d){var e;
if(this._usingKeyboard&&!c&&this._isInLastRange(this._lastType,b)){e=this._isSelected(a,b);if(d&&e)return!1;if(!d&&!e&&this._isInLastRange(this._lastType,b,!0))return!0}return c?d:e||this._isSelected(a,b)}return c},_highlightNode:function(a,b){a&&(l.toggleClass(a,"dojoxGridRowSelected",b),l.toggleClass(a,"dojoxGridCellSelected",b))},_highlightHeader:function(a,b){a=this.grid.layout.cells[a].getHeaderNode();l.toggleClass(a,"dojoxGridHeaderSelected",b)},_highlightRowSelector:function(a,b){var c=this.grid.views.views[0];
c instanceof t&&(a=c.getRowNode(a))&&l.toggleClass(a,"dojoxGridRowSelectorSelected",b)},_highlightSingle:function(a,b,c,d,e){var g=this,h,n=g.grid,k=n.layout.cells;switch(a){case "cell":h=this._calcToHighlight(a,c,b,d);a=k[c.col];a.hidden||a.notselectable||this._highlightNode(c.node||a.getNode(c.row),h);break;case "col":h=this._calcToHighlight(a,c,b,d);this._highlightHeader(c.col,h);y("td[idx\x3d'"+c.col+"']",n.domNode).forEach(function(a){var b=k[c.col].view.content.findRowTarget(a);b&&g._highlightSingle("cell",
h,{row:b[dojox.grid.util.rowIndexTag],col:c.col,node:a})});break;case "row":h=this._calcToHighlight(a,c,b,d),this._highlightRowSelector(c.row,h),this._config.cell&&f.forEach(k,function(a){g._highlightSingle("cell",h,{row:c.row,col:a.index,node:a.getNode(c.row)})}),this._selectedRowModified=!0,e||n.selection.setSelected(c.row,h)}},_highlight:function(a,b,c){if(this._selecting[a]&&null!==b){var d=this._startPoint[a],e=this._currentPoint[a],g=this,f=function(b,d,e){g._forEach(a,b,d,function(b){g._highlightSingle(a,
e,b,c)},!0)};switch(a){case "col":case "row":null!==e?p(a,b,d,e,!0)?f(e,b,!1):(p(a,d,b,e,!0)&&(f(e,d,!1),e=d),f(b,e,!0)):this._highlightSingle(a,!0,b,c);break;case "cell":null!==e&&(p("row",b,d,e,!0)||p("col",b,d,e,!0)||p("row",d,b,e,!0)||p("col",d,b,e,!0))&&f(d,e,!1),f(d,b,!0)}this._currentPoint[a]=b;this._focusPoint(a,this._currentPoint)}},_focusPoint:function(a,b){if(!this._isStartFocus){b=b[a];var c=this.grid.focus;"col"==a?(c._colHeadFocusIdx=b.col,c.focusArea("header")):"row"==a?c.focusArea("rowHeader",
{rowIndex:b.row}):"cell"==a&&c.setFocusIndex(b.row,b.col)}},_blurPoint:function(a,b){b=this.grid.focus;"cell"==a&&b._blurContent()},_addToSelected:function(a){var b=this._toSelect,c=this,d=[],e=[],g=this._startPoint[a],h=this._currentPoint[a];this._usingKeyboard&&this._forEach(a,this._lastAnchorPoint[a],this._lastEndPoint[a],function(c){p(a,c,g,h)||(b?e:d).push(c)});this._forEach(a,g,h,function(g){var f=c._isSelected(a,g);b&&!f?d.push(g):b||e.push(g)});this._add(a,d);this._remove(a,e);f.forEach(this._selected.row,
function(a){0<a.except.length&&(this._selectedRowModified=!0,this.grid.selection.setSelected(a.row,!1))},this)},_forEach:function(a,b,c,d,e){if(this._isValid(a,b,!0)&&this._isValid(a,c,!0))switch(a){case "col":case "row":b=b[a];c=c[a];var g=c>b?1:-1;for(e||(c+=g);b!=c;b+=g)d(k(a,b));break;case "cell":e=c.col>b.col?1:-1;for(var g=c.row>b.row?1:-1,f=b.row,m=c.row+g;f!=m;f+=g)for(var l=b.col,p=c.col+e;l!=p;l+=e)d(k(a,f,l))}},_makeupForExceptions:function(a,b){var c=[];f.forEach(this._selected[a],function(d){f.forEach(b,
function(b){if(d[a]==b[a]){var e=f.indexOf(d.except,b[q[a]]);0<=e&&d.except.splice(e,1);c.push(b)}})});return c},_makeupForCells:function(a,b){var c=[];f.forEach(this._selected.cell,function(d){f.some(b,function(b){return d[a]==b[a]?(c.push(d),!0):!1})});this._remove("cell",c);f.forEach(this._selected[q[a]],function(c){f.forEach(b,function(b){b=f.indexOf(c.except,b[a]);0<=b&&c.except.splice(b,1)})})},_addException:function(a,b){f.forEach(this._selected[a],function(c){f.forEach(b,function(b){c.except.push(b[q[a]])})})},
_addCellException:function(a,b){f.forEach(this._selected[a],function(c){f.forEach(b,function(b){c[a]==b[a]&&c.except.push(b[q[a]])})})},_add:function(a,b){var c=this.grid.layout.cells;if("cell"==a){var d=this._makeupForExceptions("col",b),e=this._makeupForExceptions("row",b);b=f.filter(b,function(a){return 0>f.indexOf(d,a)&&0>f.indexOf(e,a)&&!c[a.col].hidden&&!c[a.col].notselectable})}else"col"==a&&(b=f.filter(b,function(a){return!c[a.col].hidden&&!c[a.col].notselectable})),this._makeupForCells(a,
b),this._selected[a]=f.filter(this._selected[a],function(c){return f.every(b,function(b){return c[a]!==b[a]})});"col"!=a&&this.grid._hasIdentity&&f.forEach(b,function(a){var b=this.grid._by_idx[a.row];b&&(a.id=b.idty)},this);this._selected[a]=this._selected[a].concat(b)},_remove:function(a,b){var c=m.partial(x,a);this._selected[a]=f.filter(this._selected[a],function(a){return!f.some(b,function(b){return c(a,b)})});"cell"==a?(this._addCellException("col",b),this._addCellException("row",b)):this._config.cell&&
this._addException(q[a],b)},_isCellNotInExcept:function(a,b){var c=b[a],d=b[q[a]];return f.some(this._selected[a],function(b){return b[a]==c&&0>f.indexOf(b.except,d)})},_isSelected:function(a,b){if(!b)return!1;var c=f.some(this._selected[a],function(c){var d=x(a,b,c);return d&&"cell"!==a?0===c.except.length:d});c||"cell"!==a||(c=this._isCellNotInExcept("col",b)||this._isCellNotInExcept("row",b),"cell"===a&&(c=c&&!this.grid.layout.cells[b.col].notselectable));return c},_isInLastRange:function(a,b,
c){var d=this[c?"_lastSelectedAnchorPoint":"_lastAnchorPoint"][a];c=this[c?"_lastSelectedEndPoint":"_lastEndPoint"][a];return b&&d&&c?p(a,b,d,c):!1},_isValid:function(a,b,c){if(!b)return!1;try{var d=this.grid,e=b[a];switch(a){case "col":return 0<=e&&e<d.layout.cells.length&&m.isArray(b.except)&&(c||!d.layout.cells[e].notselectable);case "row":return 0<=e&&e<d.rowCount&&m.isArray(b.except);case "cell":return 0<=b.col&&b.col<d.layout.cells.length&&0<=b.row&&b.row<d.rowCount&&(c||!d.layout.cells[b.col].notselectable)}}catch(g){}return!1}});
E.registerPlugin(v,{dependency:["autoScroll"]});return v});