//>>built
define("dojox/mobile/ScreenSizeAware","dojo/_base/kernel dojo/_base/array dojo/_base/config dojo/_base/connect dojo/_base/declare dojo/_base/lang dojo/_base/window dojo/dom dijit/registry".split(" "),function(f,c,l,e,g,h,k,m,b){f.experimental("dojox.mobile.ScreenSizeAware");var d=g("dojox.mobile.ScreenSizeAware",null,{splitterId:"",leftPaneId:"",rightPaneId:"",leftViewId:"",leftListId:"",constructor:function(a){a&&h.mixin(this,a);e.subscribe("/dojox/mobile/screenSize/tablet",this,function(a){this.transformUI("tablet")});
e.subscribe("/dojox/mobile/screenSize/phone",this,function(a){this.transformUI("phone")})},init:function(){this._initialized||(this._initialized=!0,(this.splitter=this.splitterId?b.byId(this.splitterId):c.filter(b.findWidgets(k.body()),function(a){return-1!==a.declaredClass.indexOf("Splitter")})[0])?(this.leftPane=this.leftPaneId?b.byId(this.leftPaneId):this.splitter.getChildren()[0])?(this.rightPane=this.rightPaneId?b.byId(this.rightPaneId):this.splitter.getChildren()[1])?(this.leftView=this.leftViewId?
b.byId(this.leftViewId):c.filter(b.findWidgets(this.leftPane.containerNode),function(a){return-1!==a.declaredClass.indexOf("View")})[0])?(this.leftList=this.leftListId?b.byId(this.leftListId):c.filter(b.findWidgets(this.leftView.containerNode),function(a){return-1!==a.declaredClass.indexOf("List")||-1!==a.declaredClass.indexOf("IconContainer")})[0])||console.error("Left list not found."):console.error("Left view not found."):console.error("Right pane not found."):console.error("Left pane not found."):
console.error("Splitter not found."))},isPhone:function(){return"phone"===this._currentMode},getShowingView:function(){var a=c.filter(this.rightPane.getChildren(),function(a){return-1!==a.declaredClass.indexOf("View")})[0];return a?a.getShowingView()||c.filter(this.rightPane.getChildren(),function(a){return a.selected})[0]||a:null},updateStateful:function(){this.leftList.set("stateful",!this.isPhone())},getDestinationId:function(a){return a.moveTo},updateBackButton:function(){c.forEach(this.leftList.getChildren(),
function(a){a=this.getDestinationId(a);if(a=b.byId(a))a=c.filter(a.getChildren(),function(a){return-1!==a.declaredClass.indexOf("Heading")})[0],a.backButton&&(a.backButton.domNode.style.display=this.isPhone()?"":"none"),a.backBtnNode&&(a.backBtnNode.style.display=this.isPhone()?"":"none")},this)},updateTransition:function(){var a=this.isPhone()?"slide":"none";c.forEach(this.leftList.getChildren(),function(c){c.set("transition",a)})},moveList:function(){(this.isPhone()?this.rightPane:this.leftPane).containerNode.appendChild(this.leftView.domNode)},
showLeftView:function(){this.leftPane.domNode.style.display=this.isPhone()?"none":"";this.leftView.show()},showRightView:function(){if(!this.isPhone()){var a=this.getShowingView();a?a.show():this.leftItemSelected()}},updateSelectedItem:function(){var a,b=this.getShowingView();b&&!this.isPhone()&&(a=b.id);a?(b=c.filter(this.leftList.getChildren(),function(b){return this.getDestinationId(b)===a},this))&&0<b.length&&b[0].set("selected",!0):this.leftList.deselectAll&&this.leftList.deselectAll()},leftItemSelected:function(){},
transformUI:function(a){this.init();a!==this._currentMode&&(this._currentMode=a,this.updateStateful(),this.updateBackButton(),this.updateTransition(),this.moveList(),this.showLeftView(),this.showRightView(),this.updateSelectedItem())}});d._instance=null;d.getInstance=function(){d._instance||(d._instance=new d);return d._instance};return d});