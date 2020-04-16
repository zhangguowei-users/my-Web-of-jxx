//>>built
define("dojox/drawing/ui/Tooltip",["dojo","../util/oo","../plugins/_Plugin","../manager/_registry"],function(d,g,k,l){var h=null,m=g.declare(k,function(a){this.createDom()},{show:function(a,b){this.domNode.innerHTML=b;b=a.data.x+a.data.width+this.mouse.origin.x+30;a=a.data.y+a.data.height+this.mouse.origin.y+30;d.style(this.domNode,{display:"inline",left:b+"px",top:a+"px"});var c=d.marginBox(this.domNode);this.createShape(b-this.mouse.origin.x,a-this.mouse.origin.y,c.w,c.h)},createShape:function(a,
b,c,e){this.balloon&&this.balloon.destroy();c=a+c;e=b+e;var d=[],f=function(){for(var a=0;a<arguments.length;a++)d.push(arguments[a])};f({x:a,y:b+5},{t:"Q",x:a,y:b},{x:a+5,y:b});f({t:"L",x:c-5,y:b});f({t:"Q",x:c,y:b},{x:c,y:b+5});f({t:"L",x:c,y:e-5});f({t:"Q",x:c,y:e},{x:c-5,y:e});f({t:"L",x:a+5,y:e});f({t:"Q",x:a,y:e},{x:a,y:e-5});f({t:"L",x:a,y:b+5});this.balloon=this.drawing.addUI("path",{points:d})},createDom:function(){this.domNode=d.create("span",{"class":"drawingTooltip"},document.body);d.style(this.domNode,
{display:"none",position:"absolute"})}});g=g.declare(k,function(a){h||(h=new m(a));!a.stencil&&this.button&&(this.connect(this.button,"onOver",this,"onOver"),this.connect(this.button,"onOut",this,"onOut"))},{width:300,height:200,onOver:function(){h.show(this.button,this.data.text)},onOut:function(){}});d.setObject("dojox.drawing.ui.Tooltip",g);l.register({name:"dojox.drawing.ui.Tooltip"},"stencil");return g});