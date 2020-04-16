// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/reportContainerGrid/_ScrollSupport",["dojo/_base/declare","dojo/dom-geometry"],function(f,g){return f(null,{scrollToCell:function(a,b){if(a&&a.parentGrid&&this._getGridContainerWrapper(a.parentGrid))return this._scrollToNode(a.domNode,b)},_scrollToNode:function(a,b){b=b||{};var c=g.position(this.getScrollableContainer()),d=g.position(a);a=!(d.x>c.x&&c.x+c.w>d.x+d.w);var h=!(d.y>c.y&&c.y+c.h>d.y+d.h),e=b.anchorTop&&("number"===typeof b.anchorTop?b.anchorTop:
30),f=void 0!==e?e:Math.min(c.h-d.h-30,(c.h-d.h)/2),e=Math.max(30,(c.w-d.w)/2)-(d.x-c.x),c=f-(d.y-c.y);if(!b.onlyIfOutOfView||a||h)if(!1===b.scrollHorizontally||!a&&b.onlyIfOutOfView||(this.getScrollableContainer().scrollLeft-=e),h||!b.onlyIfOutOfView)return this._animateScrolling(this.getScrollableContainer().scrollTop-c,b.immdediate)},_animateScrolling:function(a,b){this.getScrollableContainer().scrollTop=a},scrollToPageAt:function(a,b){a=this._grids[a];var c=a.getFirstCell();return c?this.scrollToCell(c,
{scrollHorizontally:!1,anchorTop:b&&b.anchorTop}):this._scrollToNode(a.domNode,{scrollHorizontally:!1,anchorTop:0})},scrollToLastPage:function(){return this.scrollToPageAt(this._grids.length-1)},getCurrentViewedPageIndex:function(){var a=this.getScrollableContainer().scrollHeight/this._grids.length;return Math.round(this.getScrollableContainer().scrollTop/a)},getGridInView:function(){return this.getGrids()[this.getCurrentViewedPageIndex()]},getScrollableContainer:function(){return this.mainContainer},
isScrollShown:function(){return this.getScrollableContainer().clientHeight<this.getScrollableContainer().scrollHeight}})});