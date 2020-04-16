//>>built
define("dojox/charting/plot2d/Candlesticks","dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/has ./CartesianBase ./_PlotEvents ./common dojox/lang/functional dojox/lang/functional/reversed dojox/lang/utils dojox/gfx/fx".split(" "),function(r,y,D,I,z,J,E,K,L,v,M){var N=L.lambda("item.purgeGroup()");return y("dojox.charting.plot2d.Candlesticks",[z,J],{defaultParams:{gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(a,
b){this.opt=r.clone(this.defaultParams);v.updateWithObject(this.opt,b);v.updateWithPattern(this.opt,b,this.optionalParams);this.animate=this.opt.animate},collectStats:function(a){for(var b=r.delegate(E.defaultStats),g=0;g<a.length;g++){var f=a[g];if(f.data.length){var c=b.vmin,w=b.vmax;"ymin"in f&&"ymax"in f||D.forEach(f.data,function(a,c){this.isNullValue(a)||(c=a.x||c+1,b.hmin=Math.min(b.hmin,c),b.hmax=Math.max(b.hmax,c),b.vmin=Math.min(b.vmin,a.open,a.close,a.high,a.low),b.vmax=Math.max(b.vmax,
a.open,a.close,a.high,a.low))},this);"ymin"in f&&(b.vmin=Math.min(c,f.ymin));"ymax"in f&&(b.vmax=Math.max(w,f.ymax))}}return b},getSeriesStats:function(){var a=this.collectStats(this.series);a.hmin-=.5;a.hmax+=.5;return a},render:function(a,b){if(this.zoom&&!this.isDataDirty())return this.performZoom(a,b);this.resetEvents();this.dirty=this.isDirty();var g;this.dirty&&(D.forEach(this.series,N),this._eventSeries={},this.cleanGroup(),g=this.getGroup(),K.forEachRev(this.series,function(a){a.cleanGroup(g)}));
var f=this.chart.theme,c,w,r=this._hScaler.scaler.getTransformerFromModel(this._hScaler),t=this._vScaler.scaler.getTransformerFromModel(this._vScaler),v=this.events();c=E.calculateBarSize(this._hScaler.bounds.scale,this.opt);w=c.gap;c=c.size;for(var A=this.series.length-1;0<=A;--A){var d=this.series[A];if(this.dirty||d.dirty){d.cleanGroup();var B=f.next("candlestick",[this.opt,d]),F=Array(d.data.length);if(d.hidden)d.dyn.fill=B.series.fill,d.dyn.stroke=B.series.stroke;else{g=d.group;for(var p=0;p<
d.data.length;++p){var e=d.data[p];if(!this.isNullValue(e)){var h=f.addMixin(B,"candlestick",e,!0),G=r(e.x||p+.5)+b.l+w,m=a.height-b.b,k=t(e.open),l=t(e.close),u=t(e.high),q=t(e.low);if("mid"in e)var H=t(e.mid);if(q>u)var n=u,u=q,q=n;if(1<=c){var n=k>l,y={x1:c/2,x2:c/2,y1:m-u,y2:m-q},z={x:0,y:m-Math.max(k,l),width:c,height:Math.max(n?k-l:l-k,1)},C=g.createGroup();C.setTransform({dx:G,dy:0});var x=C.createGroup();x.createLine(y).setStroke(h.series.stroke);x.createRect(z).setStroke(h.series.stroke).setFill(n?
h.series.fill:"white");"mid"in e&&x.createLine({x1:h.series.stroke?h.series.stroke.width||1:1,x2:c-(h.series.stroke?h.series.stroke.width||1:1),y1:m-H,y2:m-H}).setStroke(n?"white":h.series.stroke);d.dyn.fill=h.series.fill;d.dyn.stroke=h.series.stroke;v&&(e={element:"candlestick",index:p,run:d,shape:x,x:G,y:m-Math.max(k,l),cx:c/2,cy:m-Math.max(k,l)+Math.max(n?k-l:l-k,1)/2,width:c,height:Math.max(n?k-l:l-k,1),data:e},this._connectEvents(e),F[p]=e)}this.animate&&this._animateCandlesticks(C,m-q,u-q)}}this._eventSeries[d.name]=
F;d.dirty=!1}}else f.skip(),this._reconnectEvents(d.name)}this.dirty=!1;I("dojo-bidi")&&this._checkOrientation(this.group,a,b);return this},tooltipFunc:function(a){return'\x3ctable cellpadding\x3d"1" cellspacing\x3d"0" border\x3d"0" style\x3d"font-size:0.9em;"\x3e\x3ctr\x3e\x3ctd\x3eOpen:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.open+'\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eHigh:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.high+'\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eLow:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+
a.data.low+'\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eClose:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.close+"\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e"+(void 0!==a.data.mid?'\x3ctr\x3e\x3ctd\x3eMid:\x3c/td\x3e\x3ctd align\x3d"right"\x3e\x3cstrong\x3e'+a.data.mid+"\x3c/strong\x3e\x3c/td\x3e\x3c/tr\x3e":"")+"\x3c/table\x3e"},_animateCandlesticks:function(a,b,g){M.animateTransform(r.delegate({shape:a,duration:1200,transform:[{name:"translate",start:[0,b-b/g],end:[0,0]},
{name:"scale",start:[1,1/g],end:[1,1]},{name:"original"}]},this.animate)).play()}})});