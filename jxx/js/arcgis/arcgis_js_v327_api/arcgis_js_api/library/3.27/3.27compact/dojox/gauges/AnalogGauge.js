//>>built
define("dojox/gauges/AnalogGauge","dojo/_base/kernel dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/html dojo/_base/event dojox/gfx ./_Gauge ./AnalogLineIndicator dojo/dom-geometry".split(" "),function(r,g,h,e,t,m,n,p,q,f){return g("dojox.gauges.AnalogGauge",p,{startAngle:-90,endAngle:90,cx:0,cy:0,radius:0,orientation:"clockwise",_defaultIndicator:q,startup:function(){this.getChildren&&h.forEach(this.getChildren(),function(a){a.startup()});this.startAngle=Number(this.startAngle);this.endAngle=
Number(this.endAngle);this.cx=Number(this.cx);this.cx||(this.cx=this.width/2);this.cy=Number(this.cy);this.cy||(this.cy=this.height/2);this.radius=Number(this.radius);this.radius||(this.radius=Math.min(this.cx,this.cy)-25);this.inherited(arguments)},_getAngle:function(a){var b=Number(a);null==a||isNaN(b)||b<=this.min?b=this._mod360(this.startAngle):b>=this.max?b=this._mod360(this.endAngle):(a=this._mod360(this.startAngle),b-=this.min,"clockwise"!=this.orientation&&(b=-b),b=this._mod360(a+this._getAngleRange()*
b/Math.abs(this.min-this.max)));return b},_getValueForAngle:function(a){var b=this._mod360(this.startAngle),c=this._mod360(this.endAngle);if(this._angleInRange(a))return c=Math.abs(this.max-this.min),a=this._mod360("clockwise"==this.orientation?a-b:-a+b),this.min+c*a/this._getAngleRange();var b=this._mod360(b-a),d=360-b;a=this._mod360(c-a);return Math.min(b,d)<Math.min(a,360-a)?this.min:this.max},_getAngleRange:function(){var a=this._mod360(this.startAngle),b=this._mod360(this.endAngle);return a==
b?360:"clockwise"==this.orientation?b<a?360-(a-b):b-a:b<a?a-b:360-(b-a)},_angleInRange:function(a){var b=this._mod360(this.startAngle),c=this._mod360(this.endAngle);if(b==c)return!0;a=this._mod360(a);return"clockwise"==this.orientation?b<c?a>=b&&a<=c:!(a>c&&a<b):b<c?!(a>b&&a<c):a>=c&&a<=b},_isScaleCircular:function(){return this._mod360(this.startAngle)==this._mod360(this.endAngle)},_mod360:function(a){for(;360<a;)a-=360;for(;0>a;)a+=360;return a},_getRadians:function(a){return a*Math.PI/180},_getDegrees:function(a){return 180*
a/Math.PI},drawRange:function(a,b){b.shape&&(b.shape.parent.remove(b.shape),b.shape=null);var c,d;if(b.low==this.min&&b.high==this.max&&this._mod360(this.endAngle)==this._mod360(this.startAngle))a=a.createCircle({cx:this.cx,cy:this.cy,r:this.radius});else{c=this._getRadians(this._getAngle(b.low));d=this._getRadians(this._getAngle(b.high));if("cclockwise"==this.orientation){var k=d;d=c;c=k}var k=this.cx+this.radius*Math.sin(c),f=this.cy-this.radius*Math.cos(c),g=this.cx+this.radius*Math.sin(d),h=this.cy-
this.radius*Math.cos(d),l=0;(c<=d?d-c:2*Math.PI-c+d)>Math.PI&&(l=1);a=a.createPath();b.size?a.moveTo(this.cx+(this.radius-b.size)*Math.sin(c),this.cy-(this.radius-b.size)*Math.cos(c)):a.moveTo(this.cx,this.cy);a.lineTo(k,f);a.arcTo(this.radius,this.radius,0,l,1,g,h);b.size&&(a.lineTo(this.cx+(this.radius-b.size)*Math.sin(d),this.cy-(this.radius-b.size)*Math.cos(d)),a.arcTo(this.radius-b.size,this.radius-b.size,0,l,0,this.cx+(this.radius-b.size)*Math.sin(c),this.cy-(this.radius-b.size)*Math.cos(c)));
a.closePath()}e.isArray(b.color)||e.isString(b.color)?(a.setStroke({color:b.color}),a.setFill(b.color)):b.color.type?(c=this._getRadians(this._getAngle(b.low)),d=this._getRadians(this._getAngle(b.high)),b.color.x1=this.cx+this.radius*Math.sin(c)/2,b.color.x2=this.cx+this.radius*Math.sin(d)/2,b.color.y1=this.cy-this.radius*Math.cos(c)/2,b.color.y2=this.cy-this.radius*Math.cos(d)/2,a.setFill(b.color),a.setStroke({color:b.color.colors[0].color})):n.svg&&(a.setStroke({color:"green"}),a.setFill("green"),
a.getEventSource().setAttribute("class",b.color.style));a.connect("onmouseover",e.hitch(this,this._handleMouseOverRange,b));a.connect("onmouseout",e.hitch(this,this._handleMouseOutRange,b));b.shape=a},getRangeUnderMouse:function(a){var b=null,c=f.getContentBox(this.gaugeContent),d=a.clientX-c.x;a=a.clientY-c.y;if(Math.sqrt((a-this.cy)*(a-this.cy)+(d-this.cx)*(d-this.cx))<this.radius&&(d=this._getDegrees(Math.atan2(a-this.cy,d-this.cx)+Math.PI/2),d=this._getValueForAngle(d),this._rangeData))for(a=
0;a<this._rangeData.length&&!b;a++)Number(this._rangeData[a].low)<=d&&Number(this._rangeData[a].high)>=d&&(b=this._rangeData[a]);return b},_dragIndicator:function(a,b){this._dragIndicatorAt(a,b.pageX,b.pageY);m.stop(b)},_dragIndicatorAt:function(a,b,c){var d=f.position(a.gaugeContent,!0);b=a._getDegrees(Math.atan2(c-d.y-a.cy,b-d.x-a.cx)+Math.PI/2);b=a._getValueForAngle(b);b=Math.min(Math.max(b,a.min),a.max);a._drag.value=a._drag.currentValue=b;a._drag.onDragMove(a._drag);a._drag.draw(this._indicatorsGroup,
!0);a._drag.valueChanged()}})});