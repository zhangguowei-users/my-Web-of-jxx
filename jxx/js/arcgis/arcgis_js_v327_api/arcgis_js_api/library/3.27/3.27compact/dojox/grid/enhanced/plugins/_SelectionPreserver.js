//>>built
define("dojox/grid/enhanced/plugins/_SelectionPreserver",["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","../../_SelectionPreserver"],function(n,f,g,p){return n("dojox.grid.enhanced.plugins._SelectionPreserver",p,{constructor:function(b){var a=this.grid;a.onSelectedById=this.onSelectedById;this._oldClearData=a._clearData;var c=this;a._clearData=function(){c._updateMapping(!a._noInternalMapping);c._trustSelection=[];c._oldClearData.apply(a,arguments)};this._connects.push(g.connect(b,"selectRange",
f.hitch(this,"_updateMapping",!0,!0,!1)),g.connect(b,"deselectRange",f.hitch(this,"_updateMapping",!0,!1,!1)),g.connect(b,"deselectAll",f.hitch(this,"_updateMapping",!0,!1,!0)))},destroy:function(){this.inherited(arguments);this.grid._clearData=this._oldClearData},reset:function(){this.inherited(arguments);this._idMap=[];this._trustSelection=[];this._defaultSelected=!1},_reSelectById:function(b,a){var c=this.selection,h=this.grid;b&&h._hasIdentity&&(b=h.store.getIdentity(b),void 0===this._selectedById[b]?
this._trustSelection[a]||(c.selected[a]=this._defaultSelected):c.selected[a]=this._selectedById[b],this._idMap.push(b),h.onSelectedById(b,a,c.selected[a]))},_selectById:function(b,a){this.inherited(arguments)||(this._trustSelection[a]=!0)},onSelectedById:function(b,a,c){},_updateMapping:function(b,a,c,h,f){var g=this.selection,e=this.grid,l=0,m=0,d,k;for(d=e.rowCount-1;0<=d;--d)e._by_idx[d]?(k=e._by_idx[d].idty)&&(b||void 0===this._selectedById[k])&&(this._selectedById[k]=!!g.selected[d]):(++m,l+=
g.selected[d]?1:-1);m&&(this._defaultSelected=0<l);c||void 0===h||void 0===f||(c=!e.usingPagination&&Math.abs(f-h+1)===e.rowCount);if(c&&(!e.usingPagination||"single"===e.selectionMode))for(d=this._idMap.length-1;0<=d;--d)this._selectedById[this._idMap[d]]=a}})});