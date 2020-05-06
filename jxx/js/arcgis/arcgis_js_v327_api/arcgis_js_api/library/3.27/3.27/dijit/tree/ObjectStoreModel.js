//>>built
define("dijit/tree/ObjectStoreModel","dojo/_base/array dojo/aspect dojo/_base/declare dojo/Deferred dojo/_base/lang dojo/when ../Destroyable".split(" "),function(k,p,l,m,g,f,n){return l("dijit.tree.ObjectStoreModel",n,{store:null,labelAttr:"name",labelType:"text",root:null,query:null,constructor:function(a){g.mixin(this,a);this.childrenCache={}},getRoot:function(a,b){if(this.root)a(this.root);else{var d=this.store.query(this.query);d.then&&this.own(d);f(d,g.hitch(this,function(b){if(1!=b.length)throw Error("dijit.tree.ObjectStoreModel: root query returned "+
b.length+" items, but must return exactly one");this.root=b[0];a(this.root);d.observe&&d.observe(g.hitch(this,function(a){this.onChange(a)}),!0)}),b)}},mayHaveChildren:function(){return!0},getChildren:function(a,b,d){var c=this.store.getIdentity(a);if(this.childrenCache[c])f(this.childrenCache[c],b,d);else{var e=this.childrenCache[c]=this.store.getChildren(a);e.then&&this.own(e);e.observe&&this.own(e.observe(g.hitch(this,function(b,d,c){this.onChange(b);d!=c&&f(e,g.hitch(this,"onChildrenChange",a))}),
!0));f(e,b,d)}},isItem:function(){return!0},getIdentity:function(a){return this.store.getIdentity(a)},getLabel:function(a){return a[this.labelAttr]},newItem:function(a,b,d,c){return this.store.put(a,{parent:b,before:c})},pasteItem:function(a,b,d,c,e,f){var h=new m;if(b===d&&!c&&!f)return h.resolve(!0),h;b&&!c?this.getChildren(b,g.hitch(this,function(c){c=[].concat(c);var e=k.indexOf(c,a);c.splice(e,1);this.onChildrenChange(b,c);h.resolve(this.store.put(a,{overwrite:!0,parent:d,oldParent:b,before:f,
isCopy:!1}))})):h.resolve(this.store.put(a,{overwrite:!0,parent:d,oldParent:b,before:f,isCopy:!0}));return h},onChange:function(){},onChildrenChange:function(){},onDelete:function(){}})});