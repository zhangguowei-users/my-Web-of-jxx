//>>built
define("dijit/_editor/plugins/FullScreen","dojo/aspect dojo/_base/declare dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/i18n dojo/keys dojo/_base/lang dojo/on dojo/sniff dojo/_base/window dojo/window ../../focus ../_Plugin ../../form/ToggleButton ../../registry dojo/i18n!../nls/commands".split(" "),function(u,v,p,g,e,w,m,f,q,n,z,l,r,k,x,y){var t=v("dijit._editor.plugins.FullScreen",k,{zIndex:500,_origState:null,_origiFrameState:null,_resizeHandle:null,isFullscreen:!1,toggle:function(){this.button.set("checked",
!this.button.get("checked"))},_initButton:function(){var b=w.getLocalization("dijit._editor","commands"),a=this.editor;this.button=new x({label:b.fullScreen,ownerDocument:a.ownerDocument,dir:a.dir,lang:a.lang,showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"FullScreen",tabIndex:"-1",onChange:f.hitch(this,"_setFullScreen")})},setEditor:function(b){this.editor=b;this._initButton();this.editor.addKeyHandler(m.F11,!0,!0,f.hitch(this,function(a){this.toggle();a.stopPropagation();a.preventDefault();
this.editor.defer("focus",250);return!0}));this.own(q(this.editor.domNode,"keydown",f.hitch(this,"_containFocus")))},_containFocus:function(b){if(this.isFullscreen){var a=this.editor;if(!a.isTabIndent&&a._fullscreen_oldOnKeyDown&&b.keyCode===m.TAB){b=r.curNode;var d=this._getAltViewNode();b==a.iframe||d&&b===d?setTimeout(f.hitch(this,function(){a.toolbar.focus()}),10):d&&"none"===e.get(a.iframe,"display")?setTimeout(f.hitch(this,function(){r.focus(d)}),10):setTimeout(f.hitch(this,function(){a.focus()}),
10);event.stopPropagation();event.preventDefault()}else a._fullscreen_oldOnKeyDown&&a._fullscreen_oldOnKeyDown(b)}},_resizeEditor:function(){var b=l.getBox(this.editor.ownerDocument);g.setMarginBox(this.editor.domNode,{w:b.w,h:b.h});var a=this.editor.getHeaderHeight(),d=this.editor.getFooterHeight(),c=g.getPadBorderExtents(this.editor.domNode),e=g.getPadBorderExtents(this.editor.iframe.parentNode),f=g.getMarginExtents(this.editor.iframe.parentNode),a=b.h-(a+c.h+d);g.setMarginBox(this.editor.iframe.parentNode,
{h:a,w:b.w});g.setMarginBox(this.editor.iframe,{h:a-(e.h+f.h)})},_getAltViewNode:function(){},_setFullScreen:function(b){var a=this.editor,d=a.ownerDocumentBody,c=a.domNode.parentNode,k=l.getBox(a.ownerDocument);if(this.isFullscreen=b){for(;c&&c!==d;)p.add(c,"dijitForceStatic"),c=c.parentNode;this._editorResizeHolder=this.editor.resize;a.resize=function(){};a._fullscreen_oldOnKeyDown=a.onKeyDown;a.onKeyDown=f.hitch(this,this._containFocus);this._origState={};this._origiFrameState={};c=(b=a.domNode)&&
b.style||{};this._origState={width:c.width||"",height:c.height||"",top:e.get(b,"top")||"",left:e.get(b,"left")||"",position:e.get(b,"position")||"static",marginBox:g.getMarginBox(a.domNode)};b=(b=a.iframe)&&b.style||{};c=e.get(a.iframe,"backgroundColor");this._origiFrameState={backgroundColor:c||"transparent",width:b.width||"auto",height:b.height||"auto",zIndex:b.zIndex||""};e.set(a.domNode,{position:"absolute",top:"0px",left:"0px",zIndex:this.zIndex,width:k.w+"px",height:k.h+"px"});e.set(a.iframe,
{height:"100%",width:"100%",zIndex:this.zIndex,backgroundColor:"transparent"!==c&&"rgba(0, 0, 0, 0)"!==c?c:"white"});e.set(a.iframe.parentNode,{height:"95%",width:"100%"});this._oldOverflow=d.style&&d.style.overflow?e.get(d,"overflow"):"";if(n("ie")&&!n("quirks")){if(d.parentNode&&d.parentNode.style&&d.parentNode.style.overflow)this._oldBodyParentOverflow=d.parentNode.style.overflow;else try{this._oldBodyParentOverflow=e.get(d.parentNode,"overflow")}catch(A){this._oldBodyParentOverflow="scroll"}e.set(d.parentNode,
"overflow","hidden")}e.set(d,"overflow","hidden");this._resizeHandle=q(window,"resize",f.hitch(this,function(){var b=l.getBox(a.ownerDocument);if("_prevW"in this&&"_prevH"in this){if(b.w===this._prevW&&b.h===this._prevH)return}else this._prevW=b.w,this._prevH=b.h;this._resizer&&(clearTimeout(this._resizer),delete this._resizer);this._resizer=setTimeout(f.hitch(this,function(){delete this._resizer;this._resizeEditor()}),10)}));this._resizeHandle2=u.after(a,"onResize",f.hitch(this,function(){this._resizer&&
(clearTimeout(this._resizer),delete this._resizer);this._resizer=setTimeout(f.hitch(this,function(){delete this._resizer;this._resizeEditor()}),10)}));this._resizeEditor();var m=this.editor.toolbar.domNode;setTimeout(function(){l.scrollIntoView(m)},250)}else{this._resizeHandle&&(this._resizeHandle.remove(),this._resizeHandle=null);this._resizeHandle2&&(this._resizeHandle2.remove(),this._resizeHandle2=null);this._rst&&(clearTimeout(this._rst),this._rst=null);for(;c&&c!==d;)p.remove(c,"dijitForceStatic"),
c=c.parentNode;this._editorResizeHolder&&(this.editor.resize=this._editorResizeHolder);if(this._origState||this._origiFrameState){a._fullscreen_oldOnKeyDown&&(a.onKeyDown=a._fullscreen_oldOnKeyDown,delete a._fullscreen_oldOnKeyDown);var h=this;setTimeout(function(){var b=h._origState.marginBox,c=h._origState.height;n("ie")&&!n("quirks")&&(d.parentNode.style.overflow=h._oldBodyParentOverflow,delete h._oldBodyParentOverflow);e.set(d,"overflow",h._oldOverflow);delete h._oldOverflow;e.set(a.domNode,h._origState);
e.set(a.iframe.parentNode,{height:"",width:""});e.set(a.iframe,h._origiFrameState);delete h._origState;delete h._origiFrameState;var g=y.getEnclosingWidget(a.domNode.parentNode);g&&g.resize?g.resize():(!c||0>c.indexOf("%"))&&setTimeout(f.hitch(this,function(){a.resize({h:b.h})}),0);l.scrollIntoView(h.editor.toolbar.domNode)},100)}}},updateState:function(){this.button.set("disabled",this.get("disabled"))},destroy:function(){this._resizeHandle&&(this._resizeHandle.remove(),this._resizeHandle=null);
this._resizeHandle2&&(this._resizeHandle2.remove(),this._resizeHandle2=null);this._resizer&&(clearTimeout(this._resizer),this._resizer=null);this.inherited(arguments)}});k.registry.fullScreen=k.registry.fullscreen=function(b){return new t({zIndex:"zIndex"in b?b.zIndex:500})};return t});