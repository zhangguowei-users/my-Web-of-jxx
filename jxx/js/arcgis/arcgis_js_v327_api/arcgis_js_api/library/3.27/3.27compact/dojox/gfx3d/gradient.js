//>>built
define("dojox/gfx3d/gradient",["dojo/_base/lang","./matrix","./vector"],function(c,h,k){c=c.getObject("dojox.gfx3d",!0);var l=function(e,b){return Math.sqrt(Math.pow(b.x-e.x,2)+Math.pow(b.y-e.y,2))};c.gradient=function(e,b,a,f,d,c,g){g=h.normalize(g);var m=h.multiplyPoint(g,f*Math.cos(d)+a.x,f*Math.sin(d)+a.y,a.z),n=h.multiplyPoint(g,f*Math.cos(c)+a.x,f*Math.sin(c)+a.y,a.z),p=h.multiplyPoint(g,a.x,a.y,a.z),v=(c-d)/32,w=l(m,n)/2,q=e[b.type],r=b.finish;b=b.color;var t=[{offset:0,color:q.call(e,k.substract(m,
p),r,b)}];for(d+=v;d<c;d+=v){var u=h.multiplyPoint(g,f*Math.cos(d)+a.x,f*Math.sin(d)+a.y,a.z),x=l(m,u),y=l(n,u);t.push({offset:x/(x+y),color:q.call(e,k.substract(u,p),r,b)})}t.push({offset:1,color:q.call(e,k.substract(n,p),r,b)});return{type:"linear",x1:0,y1:-w,x2:0,y2:w,colors:t}};return c.gradient});