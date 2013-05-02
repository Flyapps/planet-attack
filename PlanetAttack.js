var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: Hash
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: IntHash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var co = co || {}
if(!co.doubleduck) co.doubleduck = {}
co.doubleduck.Ally = $hxClasses["co.doubleduck.Ally"] = function(type) {
	this._type = type;
	this._allyData = co.doubleduck.DataLoader.getAllyByType(type);
	this._hp = this._allyData.hp | 0;
	this._damage = this._allyData.damage | 0;
	this._actionCooldown = Std.parseFloat(this._allyData.cooldown);
	if(co.doubleduck.Ally._allySpritesheet == null) this.initSpritesheet();
	createjs.BitmapAnimation.call(this,co.doubleduck.Ally._allySpritesheet);
	this.idle();
	co.doubleduck.Utils.waitAndCall(this,200,$bind(this,this.hover));
	co.doubleduck.Utils.waitAndCall(this,200,$bind(this,this.activate));
};
co.doubleduck.Ally.__name__ = ["co","doubleduck","Ally"];
co.doubleduck.Ally.create = function(type) {
	var result = null;
	switch( (type)[1] ) {
	case 4:
		result = new co.doubleduck.allies.LaserAlly();
		break;
	case 0:
		result = new co.doubleduck.allies.BasicAlly();
		break;
	case 1:
		result = new co.doubleduck.allies.DoubleAlly();
		break;
	case 2:
		result = new co.doubleduck.allies.ShieldAlly();
		break;
	case 3:
		result = new co.doubleduck.allies.MineAlly();
		break;
	case 5:
		result = new co.doubleduck.allies.ResourceAlly();
		break;
	default:
		result = new co.doubleduck.allies.LaserAlly();
	}
	return result;
}
co.doubleduck.Ally.getTypeByName = function(name) {
	return Type.createEnum(co.doubleduck.AllyType,name.toUpperCase());
}
co.doubleduck.Ally.getPrice = function(type) {
	return co.doubleduck.DataLoader.getAllyByType(type).cost | 0;
}
co.doubleduck.Ally.getUnlockLevel = function(type) {
	return co.doubleduck.DataLoader.getAllyByType(type).unlockLevel | 0;
}
co.doubleduck.Ally.getUnlockDescription = function(type) {
	return co.doubleduck.DataLoader.getAllyByType(type).unlockDescription;
}
co.doubleduck.Ally.__super__ = createjs.BitmapAnimation;
co.doubleduck.Ally.prototype = $extend(createjs.BitmapAnimation.prototype,{
	setGridRightEdge: function(edgeX) {
		this._gridRightEdge = edgeX;
	}
	,getWidth: function() {
		return this.spriteSheet._frameWidth;
	}
	,destroy: function() {
		createjs.Tween.removeTweens(this);
		this.disable();
	}
	,die: function() {
		if(this.onDeath != null) this.onDeath(this);
	}
	,hitAnim: function() {
		this.gotoAndStop(this._type[0] + "hurt");
		co.doubleduck.Utils.waitAndCall(this,500,$bind(this,this.idle));
	}
	,takeHit: function(damage) {
		this._hp -= damage;
		if(this._hp <= 0) this.die(); else {
			this.hitAnim();
			co.doubleduck.SoundManager.playEffect("sound/Ally_Ship_hit");
		}
	}
	,idle: function() {
		this.gotoAndStop(this._type[0] + "idle");
	}
	,act: function() {
	}
	,initSpritesheet: function() {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage("images/allies/allies.png");
		var imgWidth = 98;
		var imgHeight = 90;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		var allAllies = new AllyDB().getAllAllies();
		var _g1 = 0, _g = allAllies.length;
		while(_g1 < _g) {
			var currAllyIndex = _g1++;
			var currAlly = allAllies[currAllyIndex];
			var allyType = co.doubleduck.Ally.getTypeByName(currAlly.type);
			var idleFrames = currAlly.idleFrames;
			var hurtFrames = currAlly.hurtFrames;
			var actionFrames = currAlly.actionFrames;
			initObject.animations[allyType[0] + "idle"] = { frames : idleFrames, frequency : 20};
			initObject.animations[allyType[0] + "hurt"] = { frames : hurtFrames, frequency : 20};
			if(actionFrames.length > 0) initObject.animations[allyType[0] + "action"] = { frames : actionFrames, frequency : 20};
		}
		co.doubleduck.Ally._allySpritesheet = new createjs.SpriteSheet(initObject);
	}
	,hover: function() {
		var origY = this.y;
		var destY = origY - 8 * co.doubleduck.BaseGame.getScale();
		createjs.Tween.get(this).to({ y : destY},800,createjs.Ease.sineOut).to({ y : origY},1000,createjs.Ease.sineOut).call($bind(this,this.hover));
	}
	,setGrid: function(grid) {
		this._enemyGrid = grid;
	}
	,getGridPos: function() {
		return this._myGridPos;
	}
	,setGridPos: function(pos) {
		this._myGridPos = pos;
	}
	,tick: function() {
		if(this._enemyGrid != null && this._enemyGrid[this._myGridPos.y | 0].length > 0) this.act();
	}
	,disable: function() {
		createjs.Ticker.removeListener(this);
	}
	,activate: function() {
		createjs.Ticker.addListener(this,true);
	}
	,_gridRightEdge: null
	,_enemyGrid: null
	,_myGridPos: null
	,_actionCooldown: null
	,_damage: null
	,_price: null
	,_hp: null
	,_type: null
	,_allyData: null
	,onDeath: null
	,__class__: co.doubleduck.Ally
});
co.doubleduck.AllyType = $hxClasses["co.doubleduck.AllyType"] = { __ename__ : ["co","doubleduck","AllyType"], __constructs__ : ["BASIC","DOUBLE_WHAMMY","SHIELD","MINE","LASER","RESOURCE"] }
co.doubleduck.AllyType.BASIC = ["BASIC",0];
co.doubleduck.AllyType.BASIC.toString = $estr;
co.doubleduck.AllyType.BASIC.__enum__ = co.doubleduck.AllyType;
co.doubleduck.AllyType.DOUBLE_WHAMMY = ["DOUBLE_WHAMMY",1];
co.doubleduck.AllyType.DOUBLE_WHAMMY.toString = $estr;
co.doubleduck.AllyType.DOUBLE_WHAMMY.__enum__ = co.doubleduck.AllyType;
co.doubleduck.AllyType.SHIELD = ["SHIELD",2];
co.doubleduck.AllyType.SHIELD.toString = $estr;
co.doubleduck.AllyType.SHIELD.__enum__ = co.doubleduck.AllyType;
co.doubleduck.AllyType.MINE = ["MINE",3];
co.doubleduck.AllyType.MINE.toString = $estr;
co.doubleduck.AllyType.MINE.__enum__ = co.doubleduck.AllyType;
co.doubleduck.AllyType.LASER = ["LASER",4];
co.doubleduck.AllyType.LASER.toString = $estr;
co.doubleduck.AllyType.LASER.__enum__ = co.doubleduck.AllyType;
co.doubleduck.AllyType.RESOURCE = ["RESOURCE",5];
co.doubleduck.AllyType.RESOURCE.toString = $estr;
co.doubleduck.AllyType.RESOURCE.__enum__ = co.doubleduck.AllyType;
co.doubleduck.AllyIcon = $hxClasses["co.doubleduck.AllyIcon"] = function(type) {
	this._icon = null;
	this._type = type;
	if(co.doubleduck.AllyIcon._spriteSheet == null) this.initSpritesheet();
	createjs.Container.call(this);
	this._icon = new createjs.BitmapAnimation(co.doubleduck.AllyIcon._spriteSheet);
	var frameNum = type[1] + 1;
	this._icon.gotoAndStop("icon" + frameNum);
	this._icon.scaleX = this._icon.scaleY = co.doubleduck.BaseGame.getScale();
	this.addChild(this._icon);
	var fontSize = 18 * co.doubleduck.BaseGame.getScale() | 0;
	this._price = new createjs.Text("" + co.doubleduck.Ally.getPrice(type),"" + fontSize + "px Arial","#FFFFFF");
	this._price.regY = this._price.getMeasuredHeight();
	this._price.textAlign = "left";
	this._price.y = this.getHeight() * co.doubleduck.BaseGame.getScale() * 0.675;
	this._price.x = this.getWidth() * co.doubleduck.BaseGame.getScale() * 0.425;
	this.addChild(this._price);
};
co.doubleduck.AllyIcon.__name__ = ["co","doubleduck","AllyIcon"];
co.doubleduck.AllyIcon.__super__ = createjs.Container;
co.doubleduck.AllyIcon.prototype = $extend(createjs.Container.prototype,{
	getHeight: function() {
		return co.doubleduck.AllyIcon.ICON_SIZE;
	}
	,getWidth: function() {
		return co.doubleduck.AllyIcon.ICON_SIZE;
	}
	,setUnselected: function() {
		createjs.Tween.removeTweens(this);
		createjs.Tween.get(this).to({ y : 0},200,createjs.Ease.sineIn);
	}
	,setSelected: function() {
		createjs.Tween.removeTweens(this);
		createjs.Tween.get(this).to({ y : this.getHeight() * 0.15 * co.doubleduck.BaseGame.getScale()},200,createjs.Ease.sineOut);
	}
	,type: function() {
		return this._type;
	}
	,initSpritesheet: function() {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage("images/session/hud/unit_icons.png");
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : co.doubleduck.AllyIcon.ICON_SIZE, height : co.doubleduck.AllyIcon.ICON_SIZE, regX : 0, regY : co.doubleduck.AllyIcon.ICON_SIZE * 0.23};
		initObject.animations = { };
		var _g = 0;
		while(_g < 6) {
			var i = _g++;
			var myType = Type.createEnumIndex(co.doubleduck.AllyType,i);
			var ally = co.doubleduck.DataLoader.getAllyByType(myType);
			initObject.animations["icon" + (i + 1)] = { frames : ally.iconFrame | 0, frequency : 20};
		}
		co.doubleduck.AllyIcon._spriteSheet = new createjs.SpriteSheet(initObject);
	}
	,_price: null
	,_icon: null
	,_type: null
	,__class__: co.doubleduck.AllyIcon
});
co.doubleduck.BaseAssets = $hxClasses["co.doubleduck.BaseAssets"] = function() {
};
co.doubleduck.BaseAssets.__name__ = ["co","doubleduck","BaseAssets"];
co.doubleduck.BaseAssets.loader = function() {
	if(co.doubleduck.BaseAssets._loader == null) {
		co.doubleduck.BaseAssets._loader = new createjs.LoadQueue(true);
		co.doubleduck.BaseAssets._loader.installPlugin(createjs.LoadQueue.SOUND);
		co.doubleduck.BaseAssets._loader.onFileLoad = co.doubleduck.BaseAssets.handleFileLoaded;
		co.doubleduck.BaseAssets._loader.onError = co.doubleduck.BaseAssets.handleLoadError;
		co.doubleduck.BaseAssets._loader.setMaxConnections(10);
	}
	return co.doubleduck.BaseAssets._loader;
}
co.doubleduck.BaseAssets.loadAndCall = function(uri,callbackFunc) {
	co.doubleduck.BaseAssets.loader().loadFile(uri);
	co.doubleduck.BaseAssets._loadCallbacks[uri] = callbackFunc;
}
co.doubleduck.BaseAssets.finishLoading = function(manifest,sounds) {
	if(co.doubleduck.SoundManager.available) {
		var _g1 = 0, _g = sounds.length;
		while(_g1 < _g) {
			var currSound = _g1++;
			manifest.push(sounds[currSound] + co.doubleduck.SoundManager.EXTENSION);
			co.doubleduck.SoundManager.initSound(sounds[currSound]);
		}
	}
	if(co.doubleduck.BaseAssets._useLocalStorage) co.doubleduck.BaseAssets.loadFromLocalStorage(manifest);
	if(manifest.length == 0) {
		if(co.doubleduck.BaseAssets.onLoadAll != null) co.doubleduck.BaseAssets.onLoadAll();
	}
	co.doubleduck.BaseAssets.loader().onProgress = co.doubleduck.BaseAssets.handleProgress;
	co.doubleduck.BaseAssets.loader().onFileLoad = co.doubleduck.BaseAssets.manifestFileLoad;
	co.doubleduck.BaseAssets.loader().loadManifest(manifest);
	co.doubleduck.BaseAssets.loader().load();
}
co.doubleduck.BaseAssets.loadAll = function(manifest,sounds) {
	manifest[manifest.length] = "images/duckling/orientation_error_port.png";
	manifest[manifest.length] = "images/duckling/orientation_error_land.png";
	manifest[manifest.length] = "images/duckling/page_marker.png";
}
co.doubleduck.BaseAssets.audioLoaded = function(event) {
	co.doubleduck.BaseAssets._cacheData[event.item.src] = event;
}
co.doubleduck.BaseAssets.manifestFileLoad = function(event) {
	if(co.doubleduck.BaseAssets._useLocalStorage && event != null) {
		var utils = new ddjsutils();
		try {
			var fileName = event.item.src;
			if(HxOverrides.substr(fileName,fileName.length - 3,null) == "jpg") return;
			co.doubleduck.BasePersistence.setValue(event.item.src,utils.getBase64Image(event.result));
		} catch( err ) {
		}
	}
}
co.doubleduck.BaseAssets.loadFromLocalStorage = function(manifest) {
	var entriesToRemove = new Array();
	var _g1 = 0, _g = manifest.length;
	while(_g1 < _g) {
		var i = _g1++;
		var entry = manifest[i];
		var value = co.doubleduck.BasePersistence.getValue(entry);
		if(value != null) {
			var bmp = new createjs.Bitmap("data:image/png;base64," + value);
			co.doubleduck.BaseAssets._cacheData[entry] = bmp.image;
			entriesToRemove.push(manifest[i]);
		}
	}
	var _g1 = 0, _g = entriesToRemove.length;
	while(_g1 < _g) {
		var j = _g1++;
		HxOverrides.remove(manifest,entriesToRemove[j]);
	}
}
co.doubleduck.BaseAssets.handleProgress = function(event) {
	co.doubleduck.BaseAssets.loaded = event.loaded;
	if(event.loaded == event.total) {
		co.doubleduck.BaseAssets.loader().onProgress = null;
		co.doubleduck.BaseAssets.onLoadAll();
	}
}
co.doubleduck.BaseAssets.handleLoadError = function(event) {
}
co.doubleduck.BaseAssets.handleFileLoaded = function(event) {
	if(event != null) {
		co.doubleduck.BaseAssets._cacheData[event.item.src] = event.result;
		var callbackFunc = Reflect.field(co.doubleduck.BaseAssets._loadCallbacks,event.item.src);
		if(callbackFunc != null) callbackFunc();
	}
}
co.doubleduck.BaseAssets.getAsset = function(uri) {
	var cache = Reflect.field(co.doubleduck.BaseAssets._cacheData,uri);
	if(cache == null) {
		if(co.doubleduck.BaseAssets.loader().getResult(uri) != null) {
			cache = co.doubleduck.BaseAssets.loader().getResult(uri);
			co.doubleduck.BaseAssets._cacheData[uri] = cache;
		}
	}
	return cache;
}
co.doubleduck.BaseAssets.getRawImage = function(uri) {
	var cache = co.doubleduck.BaseAssets.getAsset(uri);
	if(cache == null) {
		var bmp = new createjs.Bitmap(uri);
		co.doubleduck.BaseAssets._cacheData[uri] = bmp.image;
		cache = bmp.image;
		null;
	}
	return cache;
}
co.doubleduck.BaseAssets.getImage = function(uri,mouseEnabled) {
	if(mouseEnabled == null) mouseEnabled = false;
	var result = new createjs.Bitmap(co.doubleduck.BaseAssets.getRawImage(uri));
	result.mouseEnabled = mouseEnabled;
	return result;
}
co.doubleduck.BaseAssets.prototype = {
	__class__: co.doubleduck.BaseAssets
}
co.doubleduck.Assets = $hxClasses["co.doubleduck.Assets"] = function() {
	co.doubleduck.BaseAssets.call(this);
};
co.doubleduck.Assets.__name__ = ["co","doubleduck","Assets"];
co.doubleduck.Assets.loadAll = function() {
	var manifest = new Array();
	var sounds = new Array();
	co.doubleduck.BaseAssets.loadAll(manifest,sounds);
	sounds.push("sound/Menu_music");
	sounds.push("sound/Win");
	sounds.push("sound/Lose");
	sounds.push("sound/Explosion_1");
	sounds.push("sound/Explosion_2");
	sounds.push("sound/Ally_shot_1");
	sounds.push("sound/Enemy_ship_hit");
	sounds.push("sound/Ally_Ship_hit");
	sounds.push("sound/Ally_ship_placement_1");
	sounds.push("sound/Planet_hit_1");
	sounds.push("sound/Button_click");
	manifest.push("images/general/bg.jpg");
	manifest.push("images/general/star1.png");
	manifest.push("images/general/star2.png");
	manifest.push("images/general/star3.png");
	manifest.push("images/session/grid.png");
	manifest.push("images/session/hud/unit_icons.png");
	manifest.push("images/session/explosions/stars_explosions.png");
	manifest.push("images/session/explosions/ship_explosion.png");
	manifest.push("images/session/end_level/defeat_pop_up.png");
	manifest.push("images/session/end_level/victory_pop_up.png");
	manifest.push("images/session/end_level/star.png");
	manifest.push("images/session/wave_text/final_wave.png");
	manifest.push("images/session/wave_text/wave.png");
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		manifest.push("images/session/wave_text/wave_num_font/" + i + ".png");
	}
	manifest.push("images/session/end_level/unlock_laser.png");
	manifest.push("images/session/end_level/unlock_mine.png");
	manifest.push("images/session/end_level/unlock_resource.png");
	manifest.push("images/session/end_level/unlock_shield.png");
	manifest.push("images/session/end_level/unlock_double_whammy.png");
	manifest.push("images/allies/allies.png");
	manifest.push("images/allies/laser_line.png");
	manifest.push("images/enemies/enemies.png");
	manifest.push("images/session/hud/button_pause.png");
	manifest.push("images/session/hud/button_menu.png");
	manifest.push("images/session/hud/button_next.png");
	manifest.push("images/session/hud/button_play.png");
	manifest.push("images/session/hud/button_restart.png");
	manifest.push("images/session/hud/mineral_counter.png");
	manifest.push("images/session/hud/pause_screen.png");
	manifest.push("images/session/end_level/star.png");
	manifest.push("images/session/hud/cross.png");
	manifest.push("images/session/hud/mineral.png");
	manifest.push("images/splash/splash.jpg");
	manifest.push("images/splash/tap.png");
	manifest.push("images/menu/level_icons.png");
	manifest.push("images/menu/btn_arrow_r.png");
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		manifest.push("images/menu/level_num_font/" + i + ".png");
	}
	manifest.push("images/menu/button_sound.png");
	manifest.push("images/menu/button_help.png");
	manifest.push("images/menu/help_screen.png");
	manifest.push("images/menu/help1.png");
	manifest.push("images/menu/help2.png");
	manifest.push("images/menu/button_got_it.png");
	manifest.push("images/menu/next.png");
	co.doubleduck.BaseAssets.finishLoading(manifest,sounds);
}
co.doubleduck.Assets.__super__ = co.doubleduck.BaseAssets;
co.doubleduck.Assets.prototype = $extend(co.doubleduck.BaseAssets.prototype,{
	__class__: co.doubleduck.Assets
});
co.doubleduck.BaseGame = $hxClasses["co.doubleduck.BaseGame"] = function(stage) {
	this._waitingToStart = false;
	this._orientError = null;
	this._prevWinSize = new createjs.Rectangle(0,0,1,1);
	if(this._wantLandscape) {
		co.doubleduck.BaseGame.MAX_HEIGHT = 427;
		co.doubleduck.BaseGame.MAX_WIDTH = 915;
	} else {
		co.doubleduck.BaseGame.MAX_HEIGHT = 760;
		co.doubleduck.BaseGame.MAX_WIDTH = 427;
	}
	if(co.doubleduck.BaseGame.DEBUG) co.doubleduck.BasePersistence.clearAll();
	var isGS3Stock = /Android 4.0.4/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && /GT-I9300/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && !/Chrome/.test(navigator.userAgent);
	if(isGS3Stock) {
		var loc = window.location.href;
		if(loc.lastIndexOf("index.html") != -1) loc = HxOverrides.substr(loc,0,loc.lastIndexOf("index.html"));
		loc += "error.html";
		window.location.href=loc;
		return;
	}
	co.doubleduck.Persistence.initGameData();
	co.doubleduck.BaseGame._stage = stage;
	co.doubleduck.BaseGame._stage.onTick = $bind(this,this.handleStageTick);
	co.doubleduck.BaseGame._viewport = new createjs.Rectangle(0,0,1,1);
	co.doubleduck.BaseGame.hammer = new Hammer(js.Lib.document.getElementById("stageCanvas"));
	viewporter.preventPageScroll = true;
	viewporter.change($bind(this,this.handleViewportChanged));
	if(viewporter.ACTIVE) {
		viewporter.preventPageScroll = true;
		viewporter.change($bind(this,this.handleViewportChanged));
		if(this._wantLandscape != viewporter.isLandscape()) {
			if(this._wantLandscape) co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.ORIENT_LAND_URI,$bind(this,this.waitForOrientation)); else co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.ORIENT_PORT_URI,$bind(this,this.waitForOrientation));
		} else co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill));
	} else co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill));
};
co.doubleduck.BaseGame.__name__ = ["co","doubleduck","BaseGame"];
co.doubleduck.BaseGame._stage = null;
co.doubleduck.BaseGame.MAX_HEIGHT = null;
co.doubleduck.BaseGame.MAX_WIDTH = null;
co.doubleduck.BaseGame.hammer = null;
co.doubleduck.BaseGame.getViewport = function() {
	return co.doubleduck.BaseGame._viewport;
}
co.doubleduck.BaseGame.getScale = function() {
	return co.doubleduck.BaseGame._scale;
}
co.doubleduck.BaseGame.getStage = function() {
	return co.doubleduck.BaseGame._stage;
}
co.doubleduck.BaseGame.prototype = {
	setScale: function() {
		var fixedVal = co.doubleduck.BaseGame._viewport.width;
		var varVal = co.doubleduck.BaseGame._viewport.height;
		var idealFixed = co.doubleduck.BaseGame.MAX_WIDTH;
		var idealVar = co.doubleduck.BaseGame.MAX_HEIGHT;
		if(this._wantLandscape) {
			fixedVal = co.doubleduck.BaseGame._viewport.height;
			varVal = co.doubleduck.BaseGame._viewport.width;
			idealFixed = co.doubleduck.BaseGame.MAX_HEIGHT;
			idealVar = co.doubleduck.BaseGame.MAX_WIDTH;
		}
		var regScale = varVal / idealVar;
		if(fixedVal >= varVal) co.doubleduck.BaseGame._scale = regScale; else if(idealFixed * regScale < fixedVal) co.doubleduck.BaseGame._scale = fixedVal / idealFixed; else co.doubleduck.BaseGame._scale = regScale;
	}
	,handleViewportChanged: function() {
		if(this._wantLandscape != viewporter.isLandscape()) {
			if(this._orientError == null) {
				var err = co.doubleduck.BaseGame.ORIENT_PORT_URI;
				if(this._wantLandscape) err = co.doubleduck.BaseGame.ORIENT_LAND_URI;
				this._orientError = co.doubleduck.BaseAssets.getImage(err);
				this._orientError.regX = this._orientError.image.width / 2;
				this._orientError.regY = this._orientError.image.height / 2;
				this._orientError.x = co.doubleduck.BaseGame._viewport.height / 2;
				this._orientError.y = co.doubleduck.BaseGame._viewport.width / 2;
				co.doubleduck.BaseGame._stage.addChildAt(this._orientError,co.doubleduck.BaseGame._stage.getNumChildren());
				co.doubleduck.BaseGame._stage.update();
			}
		} else if(this._orientError != null) {
			co.doubleduck.BaseGame._stage.removeChild(this._orientError);
			this._orientError = null;
			if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame._stage.update();
			if(this._waitingToStart) {
				this._waitingToStart = false;
				co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill));
			}
		}
	}
	,focused: function() {
		co.doubleduck.SoundManager.unmute();
	}
	,blured: function(e) {
		co.doubleduck.SoundManager.mute();
	}
	,handleResize: function(e) {
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isAndroid = /Android/.test(navigator.userAgent);
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		co.doubleduck.BaseGame._stage.canvas.width = screenW;
		co.doubleduck.BaseGame._stage.canvas.height = screenH;
		var shouldResize = this._wantLandscape == viewporter.isLandscape() || !viewporter.ACTIVE;
		if(shouldResize) {
			if(isFirefox) {
				screenH = Math.floor(co.doubleduck.Main.getFFHeight());
				var ffEstimate = Math.ceil((js.Lib.window.screen.height - 110) * (screenW / js.Lib.window.screen.width));
				if(!isAndroid) ffEstimate = Math.ceil((js.Lib.window.screen.height - 30) * (screenW / js.Lib.window.screen.width));
				if(ffEstimate < screenH) screenH = Math.floor(ffEstimate);
			}
			var wrongSize = screenH < screenW;
			if(this._wantLandscape) wrongSize = screenH > screenW;
			if(!viewporter.ACTIVE || !wrongSize) {
				co.doubleduck.BaseGame._viewport.width = screenW;
				co.doubleduck.BaseGame._viewport.height = screenH;
				this.setScale();
			}
			if(this._orientError != null && isFirefox) this.handleViewportChanged();
		} else if(isFirefox) this.handleViewportChanged();
		if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame._stage.update();
	}
	,handleBackToMenu: function() {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.BaseGame._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,handleRestart: function(properties) {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this.startSession(properties);
	}
	,handleSessionEnd: function() {
	}
	,handlePlayClick: function(properties) {
		co.doubleduck.BaseGame._stage.removeChild(this._menu);
		this.startSession(properties);
		this._menu.destroy();
		this._menu = null;
	}
	,startSession: function(properties) {
		this._session = new co.doubleduck.Session(properties);
		this._session.onBackToMenu = $bind(this,this.handleBackToMenu);
		this._session.onRestart = $bind(this,this.handleRestart);
		this._session.onSessionEnd = $bind(this,this.handleSessionEnd);
		co.doubleduck.BaseGame._stage.addChild(this._session);
	}
	,showMenu: function() {
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.BaseGame._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,alphaFade: function(fadeElement) {
		if(fadeElement != null && js.Boot.__instanceof(fadeElement,createjs.Bitmap)) this._fadedText = fadeElement; else if(this._fadedText == null) return;
		if(this._fadedText.alpha == 0) createjs.Tween.get(this._fadedText).to({ alpha : 1},750).call($bind(this,this.alphaFade)); else if(this._fadedText.alpha == 1) createjs.Tween.get(this._fadedText).to({ alpha : 0},1500).call($bind(this,this.alphaFade));
	}
	,showGameSplash: function() {
	}
	,splashEnded: function() {
		js.Lib.document.body.bgColor = "#000000";
		co.doubleduck.BaseGame._stage.removeChild(this._splash);
		this._splash = null;
		js.Lib.window.onresize = $bind(this,this.handleResize);
		this.handleResize(null);
		this.showGameSplash();
	}
	,handleDoneLoading: function() {
		createjs.Tween.get(this._splash).wait(200).to({ alpha : 0},800).call($bind(this,this.splashEnded));
		co.doubleduck.BaseGame._stage.removeChild(this._loadingBar);
		co.doubleduck.BaseGame._stage.removeChild(this._loadingStroke);
	}
	,updateLoading: function() {
		if(co.doubleduck.BaseAssets.loaded != 1) {
			this._loadingBar.visible = true;
			var percent = co.doubleduck.BaseAssets.loaded;
			var barMask = new createjs.Shape();
			barMask.graphics.beginFill("#00000000");
			barMask.graphics.drawRect(this._loadingBar.x - this._loadingBar.image.width / 2,this._loadingBar.y,this._loadingBar.image.width * percent | 0,this._loadingBar.image.height);
			barMask.graphics.endFill();
			this._loadingBar.mask = barMask;
			co.doubleduck.Utils.waitAndCall(this,10,$bind(this,this.updateLoading));
		}
	}
	,exitFocus: function() {
		var hidden = document.mozHidden;
		if(hidden) co.doubleduck.SoundManager.mute(false); else if(!co.doubleduck.SoundManager.getPersistedMute()) co.doubleduck.SoundManager.unmute(false);
	}
	,showSplash: function() {
		if(viewporter.ACTIVE) js.Lib.document.body.bgColor = "#00A99D"; else js.Lib.document.body.bgColor = "#D94D00";
		this._splash = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOGO_URI);
		this._splash.regX = this._splash.image.width / 2;
		this._splash.x = js.Lib.window.innerWidth / 2;
		if(this._wantLandscape) this._splash.y = 20; else this._splash.y = 90;
		co.doubleduck.BaseGame._stage.addChild(this._splash);
		this._loadingStroke = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOAD_STROKE_URI);
		this._loadingStroke.regX = this._loadingStroke.image.width / 2;
		co.doubleduck.BaseGame._stage.addChildAt(this._loadingStroke,0);
		this._loadingBar = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOAD_FILL_URI);
		this._loadingBar.regX = this._loadingBar.image.width / 2;
		co.doubleduck.BaseGame._stage.addChildAt(this._loadingBar,1);
		this._loadingBar.x = js.Lib.window.innerWidth / 2;
		this._loadingBar.y = this._splash.y + 192;
		this._loadingStroke.x = this._loadingBar.x;
		this._loadingStroke.y = this._loadingBar.y;
		this._loadingBar.visible = false;
		this.updateLoading();
		co.doubleduck.BaseGame._stage.canvas.width = js.Lib.window.innerWidth;
		co.doubleduck.BaseGame._stage.canvas.height = js.Lib.window.innerHeight;
		co.doubleduck.BaseAssets.onLoadAll = $bind(this,this.handleDoneLoading);
		co.doubleduck.Assets.loadAll();
		document.addEventListener('mozvisibilitychange', this.exitFocus);
	}
	,waitForOrientation: function() {
		this._waitingToStart = true;
		if(this._orientError == null) {
			this._orientError = this.getErrorImage();
			this._orientError.regX = this._orientError.image.width / 2;
			this._orientError.regY = this._orientError.image.height / 2;
			this._orientError.x = js.Lib.window.innerWidth / 2;
			this._orientError.y = js.Lib.window.innerHeight / 2;
			co.doubleduck.BaseGame._stage.addChildAt(this._orientError,co.doubleduck.BaseGame._stage.getNumChildren());
		}
	}
	,getErrorImage: function() {
		if(this._wantLandscape) return co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.ORIENT_LAND_URI); else return co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.ORIENT_PORT_URI);
	}
	,loadBarStroke: function() {
		co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOAD_STROKE_URI,$bind(this,this.showSplash));
	}
	,loadBarFill: function() {
		co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOAD_FILL_URI,$bind(this,this.loadBarStroke));
	}
	,handleStageTick: function() {
		if(js.Lib.window.innerWidth != this._prevWinSize.width || js.Lib.window.innerHeight != this._prevWinSize.height) {
			this._prevWinSize.width = js.Lib.window.innerWidth;
			this._prevWinSize.height = js.Lib.window.innerHeight;
			this.handleResize(null);
		}
	}
	,_prevWinSize: null
	,_fadedText: null
	,_loadingStroke: null
	,_loadingBar: null
	,_waitingToStart: null
	,_orientError: null
	,_wantLandscape: null
	,_session: null
	,_menu: null
	,_splash: null
	,__class__: co.doubleduck.BaseGame
}
co.doubleduck.BaseMenu = $hxClasses["co.doubleduck.BaseMenu"] = function() {
	createjs.Container.call(this);
};
co.doubleduck.BaseMenu.__name__ = ["co","doubleduck","BaseMenu"];
co.doubleduck.BaseMenu.__super__ = createjs.Container;
co.doubleduck.BaseMenu.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		this.onPlayClick = null;
	}
	,onPlayClick: null
	,__class__: co.doubleduck.BaseMenu
});
co.doubleduck.BasePersistence = $hxClasses["co.doubleduck.BasePersistence"] = function() { }
co.doubleduck.BasePersistence.__name__ = ["co","doubleduck","BasePersistence"];
co.doubleduck.BasePersistence.localStorageSupported = function() {
	var result = null;
	try {
		localStorage.setItem("test","test");
		localStorage.removeItem("test");
		result = true;
	} catch( e ) {
		result = false;
	}
	return result;
}
co.doubleduck.BasePersistence.getValue = function(key) {
	if(!co.doubleduck.BasePersistence.available) return "0";
	var val = localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.BasePersistence.setValue = function(key,value) {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key] = value;
}
co.doubleduck.BasePersistence.clearAll = function() {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage.clear();
}
co.doubleduck.BasePersistence.initVar = function(initedVar,defaultVal) {
	if(defaultVal == null) defaultVal = "0";
	var value = co.doubleduck.BasePersistence.getValue(initedVar);
	if(value == null) try {
		co.doubleduck.BasePersistence.setValue(initedVar,defaultVal);
	} catch( e ) {
		co.doubleduck.BasePersistence.available = false;
	}
}
co.doubleduck.BasePersistence.getDynamicValue = function(key) {
	if(!co.doubleduck.BasePersistence.available) return { };
	var val = localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.BasePersistence.setDynamicValue = function(key,value) {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key] = value;
}
co.doubleduck.BasePersistence.initDynamicVar = function(initedVar,defaultVal) {
	var value = co.doubleduck.BasePersistence.getDynamicValue(initedVar);
	if(value == null) try {
		co.doubleduck.BasePersistence.setDynamicValue(initedVar,defaultVal);
	} catch( e ) {
		co.doubleduck.BasePersistence.available = false;
	}
}
co.doubleduck.BasePersistence.printAll = function() {
	var ls = localStorage;
	var localStorageLength = ls.length;
	var _g = 0;
	while(_g < localStorageLength) {
		var entry = _g++;
		null;
	}
}
co.doubleduck.BaseSession = $hxClasses["co.doubleduck.BaseSession"] = function() {
	createjs.Container.call(this);
};
co.doubleduck.BaseSession.__name__ = ["co","doubleduck","BaseSession"];
co.doubleduck.BaseSession.__super__ = createjs.Container;
co.doubleduck.BaseSession.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		createjs.Ticker.removeListener(this);
		this.onRestart = null;
		this.onBackToMenu = null;
		this.onSessionEnd = null;
		this.onNextLevel = null;
	}
	,sessionEnded: function() {
		if(this.onSessionEnd != null) {
			createjs.Ticker.setPaused(false);
			this.onSessionEnd();
		}
	}
	,handleReplayClick: function(properties) {
		if(this.onRestart != null) {
			createjs.Ticker.setPaused(false);
			this.onRestart(properties);
		}
	}
	,handleMenuClick: function() {
		if(this.onBackToMenu != null) {
			createjs.Ticker.setPaused(false);
			this.onBackToMenu();
		}
	}
	,_replayBtn: null
	,_menuBtn: null
	,onNextLevel: null
	,onBackToMenu: null
	,onSessionEnd: null
	,onRestart: null
	,__class__: co.doubleduck.BaseSession
});
co.doubleduck.LabeledContainer = $hxClasses["co.doubleduck.LabeledContainer"] = function(bmp) {
	createjs.Container.call(this);
	this._bitmap = bmp;
	if(this._bitmap != null) {
		if(js.Boot.__instanceof(this._bitmap,createjs.Bitmap)) {
			this._bmp = this._bitmap;
			this.image = this._bmp.image;
		} else if(js.Boot.__instanceof(this._bitmap,createjs.BitmapAnimation)) {
			this.anim = this._bitmap;
			this.image = { width : this.anim.spriteSheet._frameWidth, height : this.anim.spriteSheet._frameHeight};
		}
	}
};
co.doubleduck.LabeledContainer.__name__ = ["co","doubleduck","LabeledContainer"];
co.doubleduck.LabeledContainer.__super__ = createjs.Container;
co.doubleduck.LabeledContainer.prototype = $extend(createjs.Container.prototype,{
	getLabel: function() {
		return this._label;
	}
	,addBitmap: function() {
		this.addChild(this._bitmap);
	}
	,addCenteredBitmap: function() {
		this._bitmap.regX = this.image.width / 2;
		this._bitmap.regY = this.image.height / 2;
		this._bitmap.x = this.image.width / 2;
		this._bitmap.y = this.image.height / 2;
		this.addChild(this._bitmap);
	}
	,addBitmapLabel: function(label,fontType,padding,centered) {
		if(centered == null) centered = true;
		if(padding == null) padding = 0;
		if(fontType == null) fontType = "";
		if(this._bitmapText != null) this.removeChild(this._bitmapText);
		var fontHelper = new co.doubleduck.FontHelper(fontType);
		this._bitmapText = fontHelper.getNumber(Std.parseInt(label),1,true,null,padding,centered);
		if(this.image != null) {
			this._bitmapText.x = this.image.width / 2;
			this._bitmapText.y = this.image.height / 2;
		}
		this._label = label;
		this.addChild(this._bitmapText);
	}
	,scaleBitmapFont: function(scale) {
		this._bitmapText.scaleX = this._bitmapText.scaleY = scale;
	}
	,shiftLabel: function(shiftX,shiftY) {
		this._bitmapText.x *= shiftX;
		this._bitmapText.y *= shiftY;
	}
	,setBitmapLabelY: function(ly) {
		this._bitmapText.y = ly;
	}
	,setBitmapLabelX: function(lx) {
		this._bitmapText.x = lx;
	}
	,getBitmapLabelWidth: function() {
		var maxWidth = 0;
		var _g1 = 0, _g = this._bitmapText.getNumChildren();
		while(_g1 < _g) {
			var digit = _g1++;
			var currentDigit = js.Boot.__cast(this._bitmapText.getChildAt(digit) , createjs.Bitmap);
			var endsAt = currentDigit.x + currentDigit.image.width;
			if(endsAt > maxWidth) maxWidth = endsAt;
		}
		return maxWidth;
	}
	,setLabelY: function(ly) {
		this._text.y = ly;
	}
	,setLabelX: function(lx) {
		this._text.x = lx;
	}
	,addLabel: function(label,color) {
		if(color == null) color = "#000000";
		if(this._text != null) this.removeChild(this._text);
		this._label = label;
		this._text = new createjs.Text(label,"bold 22px Arial",color);
		this._text.regY = this._text.getMeasuredHeight() / 2;
		this._text.textAlign = "center";
		if(this._bitmap != null) {
			this._text.x = this._bitmap.x;
			this._text.y = this._bitmap.y;
		}
		this.addChild(this._text);
	}
	,changeText: function(txt) {
	}
	,_bitmapText: null
	,_text: null
	,_bmp: null
	,_bitmap: null
	,_label: null
	,anim: null
	,image: null
	,__class__: co.doubleduck.LabeledContainer
});
co.doubleduck.Button = $hxClasses["co.doubleduck.Button"] = function(bmp,pauseAffected,clickType,clickSound) {
	if(clickType == null) clickType = 2;
	if(pauseAffected == null) pauseAffected = true;
	this._lastClickTime = 0;
	co.doubleduck.LabeledContainer.call(this,bmp);
	if(clickSound == null && co.doubleduck.Button._defaultSound != null) this._clickSound = co.doubleduck.Button._defaultSound; else this._clickSound = clickSound;
	this._bitmap.mouseEnabled = true;
	this._clickType = clickType;
	this._pauseAffected = pauseAffected;
	if(clickType == co.doubleduck.Button.CLICK_TYPE_TOGGLE) {
		var initObject = { };
		var size = this.image.width / 2;
		initObject.images = [this.image];
		initObject.frames = { width : size, height : this.image.height, regX : size / 2, regY : this.image.height / 2};
		this._states = new createjs.BitmapAnimation(new createjs.SpriteSheet(initObject));
		this._states.gotoAndStop(0);
		this.onClick = $bind(this,this.handleToggle);
		this.addChild(this._states);
	} else this.addCenteredBitmap();
	this.onPress = $bind(this,this.handlePress);
};
co.doubleduck.Button.__name__ = ["co","doubleduck","Button"];
co.doubleduck.Button.setDefaultSound = function(sound) {
	co.doubleduck.Button._defaultSound = sound;
}
co.doubleduck.Button.__super__ = co.doubleduck.LabeledContainer;
co.doubleduck.Button.prototype = $extend(co.doubleduck.LabeledContainer.prototype,{
	handleEndPressTint: function() {
		co.doubleduck.Utils.tintBitmap(this._bmp,1,1,1,1);
		if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame.getStage().update();
	}
	,setToggle: function(flag) {
		if(flag) this._states.gotoAndStop(0); else this._states.gotoAndStop(1);
	}
	,handleToggle: function(e) {
		if(this.onToggle == null) return;
		if(this._lastClickPos == null) this._lastClickPos = new createjs.Point(0,0);
		if((this._lastClickPos.x < e.stageX + 1 || this._lastClickPos.x > e.stageX + 1) && (this._lastClickPos.y < e.stageY + 1 || this._lastClickPos.y > e.stageY + 1)) {
			var now = createjs.Ticker.getTime(true);
			if(now < this._lastClickTime + 500) return;
		}
		this._lastClickPos.x = e.stageX;
		this._lastClickPos.y = e.stageY;
		this._lastClickTime = createjs.Ticker.getTime(true);
		this._states.gotoAndStop(1 - this._states.currentFrame);
		this.onToggle();
	}
	,handlePress: function(event) {
		if(createjs.Ticker.getPaused() && this._pauseAffected) return;
		if(this._clickType == co.doubleduck.Button.CLICK_TYPE_HOLD) {
			if(this.onHoldStart != null) {
				this.onHoldStart();
				event.onMouseUp = this.onHoldFinish;
			}
		}
		if(this.onClick != null) {
			if(this._clickSound != null) co.doubleduck.SoundManager.playEffect(this._clickSound);
			switch(this._clickType) {
			case co.doubleduck.Button.CLICK_TYPE_TINT:
				if(this._bmp != null) {
					co.doubleduck.Utils.tintBitmap(this._bmp,0.55,0.55,0.55,1);
					var tween = createjs.Tween.get(this._bmp);
					tween.ignoreGlobalPause = true;
					tween.wait(200).call($bind(this,this.handleEndPressTint));
					if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame.getStage().update();
				}
				break;
			case co.doubleduck.Button.CLICK_TYPE_JUICY:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.25;
				this._bitmap.scaleY = startScaleY * 0.75;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},500,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_SCALE:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.18;
				this._bitmap.scaleY = startScaleY * 1.18;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},200,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_TOGGLE:
				break;
			case co.doubleduck.Button.CLICK_TYPE_NONE:
				break;
			case co.doubleduck.Button.CLICK_TYPE_HOLD:
				throw "Use onHoldStart with CLICK_TYPE_HOLD, not onClick";
				break;
			}
		}
	}
	,setNoSound: function() {
		this._clickSound = null;
	}
	,_lastClickPos: null
	,_lastClickTime: null
	,_clickSound: null
	,_juiceTween: null
	,_clickType: null
	,_pauseAffected: null
	,_states: null
	,onHoldFinish: null
	,onHoldStart: null
	,onToggle: null
	,__class__: co.doubleduck.Button
});
co.doubleduck.DataLoader = $hxClasses["co.doubleduck.DataLoader"] = function() { }
co.doubleduck.DataLoader.__name__ = ["co","doubleduck","DataLoader"];
co.doubleduck.DataLoader.getAllLevels = function() {
	return new LevelDB().getAllLevels();
}
co.doubleduck.DataLoader.getLevelById = function(id) {
	var levels = co.doubleduck.DataLoader.getAllLevels();
	var _g = 0;
	while(_g < levels.length) {
		var level = levels[_g];
		++_g;
		if((level.id | 0) == id) return level;
	}
	throw "DDuckError: no such level - " + id;
}
co.doubleduck.DataLoader.getLevelsCount = function() {
	return co.doubleduck.DataLoader.getAllLevels().length;
}
co.doubleduck.DataLoader.getWorldCount = function() {
	return Math.ceil(co.doubleduck.DataLoader.getLevelsCount() / co.doubleduck.DataLoader.LEVELS_PER_WORLD);
}
co.doubleduck.DataLoader.getAllyByType = function(type) {
	var result = null;
	var typeString = type[0];
	var adb = new AllyDB();
	var _g1 = 0, _g = adb.getAllAllies().length;
	while(_g1 < _g) {
		var currAllyIndex = _g1++;
		var currAlly = adb.getAllAllies()[currAllyIndex];
		var AllyType = currAlly.type;
		if(AllyType.toUpperCase() == typeString) return currAlly;
	}
	return null;
}
co.doubleduck.DataLoader.getEnemyByType = function(type) {
	var result = null;
	var typeString = type[0];
	var edb = new EnemyDB();
	var _g1 = 0, _g = edb.getAllEnemies().length;
	while(_g1 < _g) {
		var currEnemyIndex = _g1++;
		var currEnemy = edb.getAllEnemies()[currEnemyIndex];
		var enemyType = currEnemy.type;
		if(enemyType.toUpperCase() == typeString) return currEnemy;
	}
	return null;
}
co.doubleduck.Enemy = $hxClasses["co.doubleduck.Enemy"] = function(type) {
	this._disabled = false;
	this._attackingPlanet = null;
	this.onPlanetExplosion = null;
	this.onDeath = null;
	this._type = type;
	this._enemyData = co.doubleduck.DataLoader.getEnemyByType(type);
	if(co.doubleduck.Enemy._enemySpritesheet == null) this.initSpritesheet();
	createjs.BitmapAnimation.call(this,co.doubleduck.Enemy._enemySpritesheet);
	this.idle();
	this._hp = this._enemyData.hp;
	this._speed = this._enemyData.speed;
	this._creditYield = this._enemyData.creditYield;
	this._damage = this._enemyData.damage;
	createjs.Ticker.addListener(this,true);
};
co.doubleduck.Enemy.__name__ = ["co","doubleduck","Enemy"];
co.doubleduck.Enemy.create = function(type) {
	var result = null;
	switch( (type)[1] ) {
	case 0:
		result = new co.doubleduck.enemies.BasicEnemy();
		break;
	case 1:
		result = new co.doubleduck.enemies.FastEnemy();
		break;
	case 2:
		result = new co.doubleduck.enemies.StrongEnemy();
		break;
	case 3:
		result = new co.doubleduck.enemies.ShootingEnemy();
		break;
	case 4:
		result = new co.doubleduck.enemies.StealthEnemy();
		break;
	case 5:
		result = new co.doubleduck.enemies.BombEnemy();
		break;
	default:
		result = new co.doubleduck.enemies.BasicEnemy();
	}
	return result;
}
co.doubleduck.Enemy.getTypeByName = function(name) {
	return Type.createEnum(co.doubleduck.EnemyType,name.toUpperCase());
}
co.doubleduck.Enemy.__super__ = createjs.BitmapAnimation;
co.doubleduck.Enemy.prototype = $extend(createjs.BitmapAnimation.prototype,{
	getGridPosition: function() {
		var result = new createjs.Point(0,0);
		var cellWidth = this._grid.image.width * co.doubleduck.BaseGame.getScale() / co.doubleduck.Session.COLS;
		var cellHeight = this._grid.image.height * co.doubleduck.BaseGame.getScale() / co.doubleduck.Session.ROWS;
		var localGridPoint = this._grid.globalToLocal(this.x - this.getWidth() / 4 * co.doubleduck.BaseGame.getScale(),this.y);
		localGridPoint.x *= co.doubleduck.BaseGame.getScale();
		localGridPoint.y *= co.doubleduck.BaseGame.getScale();
		var gridCol = localGridPoint.x / cellWidth | 0;
		var gridRow = localGridPoint.y / cellHeight | 0;
		result.x = gridCol;
		result.y = gridRow;
		return result;
	}
	,disable: function() {
		createjs.Ticker.removeListener(this);
		this._disabled = true;
	}
	,setGridGfx: function(grid) {
		this._grid = grid;
	}
	,setGridRightEdge: function(edgeX) {
		this._gridRightEdge = edgeX;
	}
	,getCreditYield: function() {
		return this._creditYield;
	}
	,getRow: function() {
		return this._myRow;
	}
	,setRow: function(randRow) {
		this._myRow = randRow;
	}
	,destroy: function() {
		this.disable();
		createjs.Tween.removeTweens(this);
	}
	,getHeight: function() {
		return this.spriteSheet._frameHeight;
	}
	,getWidth: function() {
		return this.spriteSheet._frameWidth;
	}
	,handleDeath: function(causedByPlayer) {
		if(causedByPlayer == null) causedByPlayer = false;
		if(this.onDeath != null) this.onDeath(this,causedByPlayer);
	}
	,handlePlanetExplosion: function() {
		if(this.onPlanetExplosion != null) this.onPlanetExplosion(this);
	}
	,planetExplosion: function() {
		this.handlePlanetExplosion();
	}
	,kamikaze: function() {
		this.disable();
		var rand = 0.4 + Math.random() * 0.2;
		var destX = (this._attackingPlanet.x + this._attackingPlanet.get_image().width / 2 * co.doubleduck.BaseGame.getScale()) * rand;
		var destY = this.y;
		if(this.y > co.doubleduck.BaseGame.getViewport().height * 0.55) destY = this.y - Math.random() * 70 * co.doubleduck.BaseGame.getScale(); else if(this.y < co.doubleduck.BaseGame.getViewport().height * 0.45) destY = this.y + Math.random() * 70 * co.doubleduck.BaseGame.getScale();
		createjs.Tween.get(this).to({ x : destX, scaleX : 0.2 * co.doubleduck.BaseGame.getScale(), scaleY : 0.2 * co.doubleduck.BaseGame.getScale(), y : destY},1100).call($bind(this,this.planetExplosion));
	}
	,tick: function(elapsed) {
		if(this._attackingPlanet != null) {
			var myFrontX = this.x - this.getWidth() * co.doubleduck.BaseGame.getScale();
			var planetFrontX = this._attackingPlanet.x + (this._attackingPlanet.get_image().width / 2 - 30) * co.doubleduck.BaseGame.getScale();
			if(myFrontX < planetFrontX) {
				this.kamikaze();
				return;
			}
		}
		if(this._allyLine != null && this._allyLine.children.length > 0) this.act();
		var dx = elapsed / 1000 * co.doubleduck.BaseGame.getViewport().width * 0.015 * this._speed;
		this.x -= dx;
	}
	,setAttackingPlanet: function(planet) {
		this._attackingPlanet = planet;
	}
	,setAllyLine: function(line) {
		this._allyLine = line;
	}
	,die: function() {
		this.handleDeath(false);
	}
	,hurtAnim: function() {
		createjs.Tween.removeTweens(this);
		this.gotoAndStop(this._type[0] + "hurt");
		co.doubleduck.Utils.waitAndCall(this,500,$bind(this,this.idle));
	}
	,takeHit: function(damage) {
		this._hp -= damage;
		if(this._hp <= 0) this.handleDeath(true); else this.hurtAnim();
	}
	,idle: function() {
		createjs.Tween.removeTweens(this);
		this.gotoAndStop(this._type[0] + "idle");
	}
	,act: function() {
	}
	,initSpritesheet: function() {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage("images/enemies/enemies.png");
		var imgWidth = 90;
		var imgHeight = 90;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		var allEnemies = new EnemyDB().getAllEnemies();
		var _g1 = 0, _g = allEnemies.length;
		while(_g1 < _g) {
			var currEnemyIndex = _g1++;
			var currEnemy = allEnemies[currEnemyIndex];
			var enemyType = co.doubleduck.Enemy.getTypeByName(currEnemy.type);
			var idleFrames = currEnemy.idleFrames;
			var hurtFrames = currEnemy.hurtFrames;
			var actionFrames = currEnemy.actionFrames;
			initObject.animations[enemyType[0] + "idle"] = { frames : idleFrames, frequency : 20};
			initObject.animations[enemyType[0] + "hurt"] = { frames : hurtFrames, frequency : 20};
			if(actionFrames.length > 0) initObject.animations[enemyType[0] + "action"] = { frames : actionFrames, frequency : 20};
		}
		co.doubleduck.Enemy._enemySpritesheet = new createjs.SpriteSheet(initObject);
	}
	,_disabled: null
	,_grid: null
	,_gridRightEdge: null
	,_myRow: null
	,_attackingPlanet: null
	,_allyLine: null
	,_creditYield: null
	,_damage: null
	,_speed: null
	,_hp: null
	,_enemyData: null
	,_type: null
	,onPlanetExplosion: null
	,onDeath: null
	,__class__: co.doubleduck.Enemy
});
co.doubleduck.EnemyType = $hxClasses["co.doubleduck.EnemyType"] = { __ename__ : ["co","doubleduck","EnemyType"], __constructs__ : ["BASIC","FAST","STRONG","SHOOTING","STEALTH","BOMB"] }
co.doubleduck.EnemyType.BASIC = ["BASIC",0];
co.doubleduck.EnemyType.BASIC.toString = $estr;
co.doubleduck.EnemyType.BASIC.__enum__ = co.doubleduck.EnemyType;
co.doubleduck.EnemyType.FAST = ["FAST",1];
co.doubleduck.EnemyType.FAST.toString = $estr;
co.doubleduck.EnemyType.FAST.__enum__ = co.doubleduck.EnemyType;
co.doubleduck.EnemyType.STRONG = ["STRONG",2];
co.doubleduck.EnemyType.STRONG.toString = $estr;
co.doubleduck.EnemyType.STRONG.__enum__ = co.doubleduck.EnemyType;
co.doubleduck.EnemyType.SHOOTING = ["SHOOTING",3];
co.doubleduck.EnemyType.SHOOTING.toString = $estr;
co.doubleduck.EnemyType.SHOOTING.__enum__ = co.doubleduck.EnemyType;
co.doubleduck.EnemyType.STEALTH = ["STEALTH",4];
co.doubleduck.EnemyType.STEALTH.toString = $estr;
co.doubleduck.EnemyType.STEALTH.__enum__ = co.doubleduck.EnemyType;
co.doubleduck.EnemyType.BOMB = ["BOMB",5];
co.doubleduck.EnemyType.BOMB.toString = $estr;
co.doubleduck.EnemyType.BOMB.__enum__ = co.doubleduck.EnemyType;
co.doubleduck.FontHelper = $hxClasses["co.doubleduck.FontHelper"] = function(type) {
	this._fontType = type;
};
co.doubleduck.FontHelper.__name__ = ["co","doubleduck","FontHelper"];
co.doubleduck.FontHelper.prototype = {
	getNumber: function(num,scale,forceContainer,dims,padding,centered) {
		if(centered == null) centered = true;
		if(padding == null) padding = 0;
		if(forceContainer == null) forceContainer = false;
		if(scale == null) scale = 1;
		if(num >= 0 && num < 10) {
			var result = new createjs.Container();
			var bmp = this.getDigit(num);
			bmp.scaleX = bmp.scaleY = scale;
			result.addChild(bmp);
			if(centered) {
				result.regX = bmp.image.width / 2;
				result.regY = bmp.image.height / 2;
			}
			if(forceContainer) {
				if(dims != null) {
					dims.width = bmp.image.width;
					dims.height = bmp.image.height;
				}
				return result;
			} else return bmp;
		} else {
			var result = new createjs.Container();
			var numString = "" + num;
			var digits = new Array();
			var totalWidth = 0;
			digits[digits.length] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,0,1)));
			digits[0].scaleX = digits[0].scaleY = scale;
			result.addChild(digits[0]);
			totalWidth += digits[0].image.width * scale;
			if(numString.length == 4 || numString.length == 7) {
				this._lastComma = this.getComma();
				this._lastComma.scaleX = this._lastComma.scaleY = scale;
				this._lastComma.x = digits[0].x + digits[0].image.width + padding;
				result.addChild(this._lastComma);
				totalWidth += this._lastComma.image.width * scale;
			}
			var _g1 = 1, _g = numString.length;
			while(_g1 < _g) {
				var i = _g1++;
				var index = digits.length;
				digits[index] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,i,1)));
				if(numString.length - i == 3 || numString.length - i == 6) digits[index].x = this._lastComma.x + this._lastComma.image.width + padding; else digits[index].x = digits[index - 1].x + digits[index - 1].image.width + padding;
				digits[index].scaleX = digits[index].scaleY = scale;
				result.addChild(digits[index]);
				totalWidth += digits[index].image.width * scale + padding;
				if(numString.length - i == 4 || numString.length - i == 7) {
					this._lastComma = this.getComma();
					this._lastComma.scaleX = this._lastComma.scaleY = scale;
					this._lastComma.x = digits[index].x + digits[index].image.width + padding;
					result.addChild(this._lastComma);
					totalWidth += this._lastComma.image.width * scale + padding;
				}
			}
			if(centered) {
				result.regX = totalWidth / 2;
				result.regY = digits[0].image.height / 2;
			}
			if(dims != null) {
				dims.width = totalWidth;
				dims.height = digits[0].image.height;
			}
			return result;
		}
	}
	,getDigit: function(digit) {
		var digit1 = co.doubleduck.BaseAssets.getImage(this._fontType + digit + ".png");
		return digit1;
	}
	,getComma: function() {
		return co.doubleduck.BaseAssets.getImage(this._fontType + "comma.png");
	}
	,_fontType: null
	,_lastComma: null
	,__class__: co.doubleduck.FontHelper
}
co.doubleduck.Game = $hxClasses["co.doubleduck.Game"] = function(stage) {
	this._wantLandscape = true;
	co.doubleduck.BaseGame.call(this,stage);
};
co.doubleduck.Game.__name__ = ["co","doubleduck","Game"];
co.doubleduck.Game.__super__ = co.doubleduck.BaseGame;
co.doubleduck.Game.prototype = $extend(co.doubleduck.BaseGame.prototype,{
	startSession: function(properties) {
		co.doubleduck.BaseGame.prototype.startSession.call(this,properties);
		this._session.onNextLevel = $bind(this,this.handleNextLevel);
	}
	,handleNextLevel: function() {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		var params = { };
		params.levelId = co.doubleduck.Session.levelNumber + 1 | 0;
		params.backOffset = 0;
		this.startSession(params);
	}
	,handleRestart: function(properties) {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		var params = { };
		params.levelId = co.doubleduck.Session.levelNumber;
		params.backOffset = 0;
		this.startSession(params);
	}
	,removeSplash: function() {
		co.doubleduck.BaseGame._stage.removeChild(this._splashBack);
		co.doubleduck.BaseGame._stage.removeChild(this._splashTap2Play);
	}
	,handleSplashTapped: function() {
		createjs.Tween.removeTweens(this._splashTap2Play);
		createjs.Tween.get(this._splashTap2Play).to({ alpha : 0},250);
		createjs.Tween.get(this._splashBack).to({ alpha : 0},400).call($bind(this,this.removeSplash));
		co.doubleduck.BaseGame.prototype.showMenu.call(this);
	}
	,showGameSplash: function() {
		this._splashBack = co.doubleduck.BaseAssets.getImage("images/splash/splash.jpg",true);
		this._splashBack.regX = this._splashBack.image.width / 2;
		this._splashBack.regY = this._splashBack.image.height / 2;
		this._splashBack.scaleX = this._splashBack.scaleY = co.doubleduck.BaseGame.getScale();
		this._splashBack.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._splashBack.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this._splashBack.onClick = $bind(this,this.handleSplashTapped);
		co.doubleduck.BaseGame._stage.addChild(this._splashBack);
		this._splashTap2Play = co.doubleduck.BaseAssets.getImage("images/splash/tap.png");
		this._splashTap2Play.regX = this._splashTap2Play.image.width / 2;
		this._splashTap2Play.regY = this._splashTap2Play.image.height / 2;
		this._splashTap2Play.scaleX = this._splashTap2Play.scaleY = co.doubleduck.BaseGame.getScale();
		this._splashTap2Play.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._splashTap2Play.y = co.doubleduck.BaseGame.getViewport().height * 0.33;
		co.doubleduck.BaseGame.prototype.alphaFade.call(this,this._splashTap2Play);
		co.doubleduck.BaseGame._stage.addChild(this._splashTap2Play);
	}
	,_splashTap2Play: null
	,_splashBack: null
	,__class__: co.doubleduck.Game
});
co.doubleduck.Main = $hxClasses["co.doubleduck.Main"] = function() { }
co.doubleduck.Main.__name__ = ["co","doubleduck","Main"];
co.doubleduck.Main._stage = null;
co.doubleduck.Main._game = null;
co.doubleduck.Main._ffHeight = null;
co.doubleduck.Main.main = function() {
	co.doubleduck.Main.testFFHeight();
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
	co.doubleduck.Main._stage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	co.doubleduck.Main._game = new co.doubleduck.Game(co.doubleduck.Main._stage);
	createjs.Ticker.addListener(co.doubleduck.Main._stage);
	createjs.Touch.enable(co.doubleduck.Main._stage,true,false);
}
co.doubleduck.Main.testFFHeight = function() {
	var isAplicable = /Firefox/.test(navigator.userAgent);
	if(isAplicable && viewporter.ACTIVE) co.doubleduck.Main._ffHeight = js.Lib.window.innerHeight;
}
co.doubleduck.Main.getFFHeight = function() {
	return co.doubleduck.Main._ffHeight;
}
co.doubleduck.Menu = $hxClasses["co.doubleduck.Menu"] = function() {
	this._currWorld = 0;
	this._isMoving = false;
	this._justViewedTutor = false;
	this.WORLD_MOVE_EASE = 0.0035;
	co.doubleduck.BaseMenu.call(this);
	this._back = co.doubleduck.BaseAssets.getImage("images/general/bg.jpg");
	this._back.regX = 0;
	this._back.regY = this._back.image.height / 2;
	this._back.scaleX = this._back.scaleY = co.doubleduck.BaseGame.getScale();
	if(co.doubleduck.DataLoader.getWorldCount() > 1) {
		this._backOffset = this._back.image.width * co.doubleduck.BaseGame.getScale() - co.doubleduck.BaseGame.getViewport().width;
		this._backOffset /= co.doubleduck.DataLoader.getWorldCount() - 1;
	} else this._backOffset = 0;
	this._back.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this.addChild(this._back);
	this._planets = new Array();
	this._levelButtons = new Array();
	this._levelsLayer = new createjs.Container();
	if(co.doubleduck.Menu._iconSpritesheet == null) {
		var img = co.doubleduck.BaseAssets.getRawImage("images/menu/level_icons.png");
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : img.width / 5, height : img.height, regX : 0, regY : 0};
		initObject.animations = { };
		initObject.animations.locked = { frames : 0, frequency : 20};
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			initObject.animations["star" + i] = { frames : i + 1, frequency : 20};
		}
		co.doubleduck.Menu._iconSpritesheet = new createjs.SpriteSheet(initObject);
	}
	var _g1 = 0, _g = co.doubleduck.DataLoader.getWorldCount();
	while(_g1 < _g) {
		var i = _g1++;
		this._planets[i] = co.doubleduck.BaseAssets.getImage("images/general/star" + (i + 1) + ".png");
		this._planets[i].scaleX = this._planets[i].scaleY = 0.9 * co.doubleduck.BaseGame.getScale();
		this._planets[i].regX = this._planets[i].image.width / 2;
		this._planets[i].x = co.doubleduck.BaseGame.getViewport().width * 0.5;
		this._planets[i].x += i * co.doubleduck.BaseGame.getViewport().width;
		this._planets[i].y = co.doubleduck.BaseGame.getViewport().height * 0.7;
		this._levelsLayer.addChild(this._planets[i]);
		var _g3 = 0, _g2 = co.doubleduck.DataLoader.LEVELS_PER_WORLD;
		while(_g3 < _g2) {
			var j = _g3++;
			var currLvl = new co.doubleduck.Button(new createjs.BitmapAnimation(co.doubleduck.Menu._iconSpritesheet),true,2,"sound/Button_click");
			var lvlNum = i * co.doubleduck.DataLoader.LEVELS_PER_WORLD + j + 1;
			currLvl.name = "" + lvlNum;
			currLvl.scaleX = currLvl.scaleY = co.doubleduck.BaseGame.getScale();
			currLvl.regX = currLvl.image.width / 2;
			currLvl.regY = currLvl.image.height / 2;
			currLvl.x = co.doubleduck.BaseGame.getViewport().width * (0.2 + j % (co.doubleduck.DataLoader.LEVELS_PER_WORLD / 2) * 0.15);
			currLvl.x += co.doubleduck.BaseGame.getViewport().width * i;
			currLvl.y = co.doubleduck.BaseGame.getViewport().height * (0.23 + Math.floor(j / (co.doubleduck.DataLoader.LEVELS_PER_WORLD / 2)) * 0.29);
			if(lvlNum <= co.doubleduck.Persistence.getUnlockedLevel()) {
				var stars = co.doubleduck.Persistence.getStarRating(lvlNum);
				currLvl.anim.gotoAndStop("star" + stars);
				currLvl.addBitmapLabel("" + lvlNum,"images/menu/level_num_font/");
				currLvl.onClick = $bind(this,this.handleLevelClick);
			} else currLvl.anim.gotoAndStop("locked");
			this._levelButtons[lvlNum - 1] = currLvl;
			this._levelsLayer.addChild(currLvl);
		}
	}
	this.addChild(this._levelsLayer);
	this._menuRightBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/btn_arrow_r.png"),true,2,"sound/Button_click");
	this._menuRightBtn.scaleX = this._menuRightBtn.scaleY = co.doubleduck.BaseGame.getScale();
	this._menuRightBtn.regX = this._menuRightBtn.image.width;
	this._menuRightBtn.regY = this._menuRightBtn.image.height / 2;
	this._menuRightBtn.x = co.doubleduck.BaseGame.getViewport().width - co.doubleduck.BaseGame.getScale() * 20;
	this._menuRightBtn.y = co.doubleduck.BaseGame.getViewport().height * 0.375;
	this._menuRightBtn.onClick = $bind(this,this.goToNext);
	this.addChild(this._menuRightBtn);
	this._menuLeftBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/btn_arrow_r.png"),true,2,"sound/Button_click");
	this._menuLeftBtn.scaleX = this._menuLeftBtn.scaleY = co.doubleduck.BaseGame.getScale();
	this._menuLeftBtn.scaleX *= -1;
	this._menuLeftBtn.regX = this._menuLeftBtn.image.width;
	this._menuLeftBtn.regY = this._menuLeftBtn.image.height / 2;
	this._menuLeftBtn.x = co.doubleduck.BaseGame.getScale() * 20;
	this._menuLeftBtn.y = this._menuRightBtn.y;
	this._menuLeftBtn.onClick = $bind(this,this.goToPrev);
	this.addChild(this._menuLeftBtn);
	this._helpBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/button_help.png"),true,2,"sound/Button_click");
	this._helpBtn.regX = 0;
	this._helpBtn.regY = this._helpBtn.image.height;
	this._helpBtn.scaleX = this._helpBtn.scaleY = co.doubleduck.BaseGame.getScale();
	this._helpBtn.x = co.doubleduck.BaseGame.getScale() * 20;
	this._helpBtn.y = co.doubleduck.BaseGame.getViewport().height - co.doubleduck.BaseGame.getScale() * 20;
	this._helpBtn.onClick = $bind(this,this.showHelpMenu);
	this.addChild(this._helpBtn);
	if(co.doubleduck.SoundManager.available) {
		this._muteBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/button_sound.png"),true,co.doubleduck.Button.CLICK_TYPE_TOGGLE);
		this.addChild(this._muteBtn);
		this._muteBtn.regX = -this._muteBtn.image.width / 4;
		this._muteBtn.regY = this._muteBtn.image.height / 2;
		this._muteBtn.scaleX = this._muteBtn.scaleY = co.doubleduck.BaseGame.getScale();
		this._muteBtn.x = this._helpBtn.x + co.doubleduck.BaseGame.getScale() * (this._helpBtn.image.width + 12);
		this._muteBtn.y = this._helpBtn.y;
		this._muteBtn.setToggle(!co.doubleduck.SoundManager.isMuted());
		this._muteBtn.onToggle = $bind(this,this.handleMuteToggle);
		this.addChild(this._muteBtn);
	}
	this._helpScreen = new co.doubleduck.PagedHelp("images/menu/help_screen.png","images/menu/next.png","images/menu/button_got_it.png",["images/menu/help1.png","images/menu/help2.png"]);
	this._helpScreen.x = co.doubleduck.BaseGame.getViewport().width / 2;
	this._helpScreen.y = co.doubleduck.BaseGame.getViewport().height * 0.475;
	this._helpScreen.scaleX = this._helpScreen.scaleY = co.doubleduck.BaseGame.getScale();
	this._helpScreen.setMarkersPos(5,0);
	this._helpScreen.setButtonsPos(0.91,0.93);
	this._helpScreen.changeContentMask(0,20,20,20);
	this._helpScreen.onGotIt = $bind(this,this.closeHelp);
	this.addChild(this._helpScreen);
	this._helpScreen.alpha = 0;
	this._helpScreen.visible = false;
	this.goToWorld(0,true);
	this.setArrowBtnVisibility();
	this._music = co.doubleduck.SoundManager.playMusic("sound/Menu_music");
};
co.doubleduck.Menu.__name__ = ["co","doubleduck","Menu"];
co.doubleduck.Menu.__super__ = co.doubleduck.BaseMenu;
co.doubleduck.Menu.prototype = $extend(co.doubleduck.BaseMenu.prototype,{
	goToPrev: function() {
		if(this._currWorld == 0) return;
		this.goToWorld(this._currWorld - 1);
		this.setArrowBtnVisibility();
	}
	,goToNext: function() {
		if(this._currWorld == co.doubleduck.DataLoader.getWorldCount() - 1) return;
		this.goToWorld(this._currWorld + 1);
		this.setArrowBtnVisibility();
	}
	,handleTick: function(elapsed) {
		var delta = this.WORLD_MOVE_EASE * elapsed;
		delta = Math.min(delta,0.2);
		this._back.x += (this._targetBackPos - this._back.x) * delta;
		this._levelsLayer.x += (this._targetLevelsPos - this._levelsLayer.x) * delta;
		if(Math.abs(this._targetLevelsPos - this._levelsLayer.x) < 0.1) {
			this._back.x = this._targetBackPos;
			this._levelsLayer.x = this._targetLevelsPos;
			this._isMoving = false;
			this.onTick = null;
		}
	}
	,setArrowBtnVisibility: function() {
		this._menuRightBtn.visible = this._currWorld < co.doubleduck.DataLoader.getWorldCount() - 1;
		this._menuLeftBtn.visible = this._currWorld > 0;
	}
	,goToWorld: function(id,force) {
		if(force == null) force = false;
		this._targetBackPos = id * this._backOffset * -1;
		this._targetLevelsPos = id * co.doubleduck.BaseGame.getViewport().width * -1;
		this._currWorld = id;
		if(force) {
			this._back.x = this._targetBackPos;
			this._levelsLayer.x = this._targetLevelsPos;
		} else if(!this._isMoving) {
			this.onTick = $bind(this,this.handleTick);
			this._isMoving = true;
		}
	}
	,handleDonePlanetMove: function() {
		if(this.onPlayClick != null) {
			var params = { };
			params.levelId = this._chosenLevel;
			params.backOffset = this._back.x;
			this.onPlayClick(params);
		}
	}
	,handleLevelClick: function(e) {
		var levelID = Std.parseInt(e.target.name);
		this._chosenLevel = levelID;
		if(co.doubleduck.Persistence.getUnlockedLevel() == 1) {
			if(this._justViewedTutor) this._justViewedTutor = false; else {
				this._justViewedTutor = true;
				this.showHelpMenu();
				return;
			}
		}
		this._levelsLayer.mouseEnabled = false;
		this._helpBtn.onClick = null;
		if(this._muteBtn != null) this._muteBtn.onClick = null;
		var planet = Math.floor((levelID - 1) / co.doubleduck.DataLoader.LEVELS_PER_WORLD);
		this._movingPlanet = this._planets[planet].clone();
		this._movingPlanet.x += this._levelsLayer.x;
		this._movingPlanet.y -= this._levelsLayer.y;
		this._movingPlanet.regY = this._movingPlanet.image.height / 2;
		this._movingPlanet.y += this._movingPlanet.image.height / 2 * co.doubleduck.BaseGame.getScale() * 0.9;
		this.addChildAt(this._movingPlanet,this.getChildIndex(this._levelsLayer));
		if(this._muteBtn != null) createjs.Tween.get(this._muteBtn).to({ alpha : 0},140);
		createjs.Tween.get(this._helpBtn).to({ alpha : 0},140);
		createjs.Tween.get(this._menuRightBtn).to({ alpha : 0},140);
		createjs.Tween.get(this._menuLeftBtn).to({ alpha : 0},140);
		createjs.Tween.get(this._levelsLayer).to({ alpha : 0},500);
		createjs.Tween.get(this._movingPlanet).wait(750).to({ scaleX : co.doubleduck.BaseGame.getScale(), scaleY : co.doubleduck.BaseGame.getScale(), x : 0, y : co.doubleduck.BaseGame.getViewport().height / 2},1300,createjs.Ease.sineInOut).call($bind(this,this.handleDonePlanetMove));
		this._music.stop();
	}
	,closeHelp: function() {
		createjs.Tween.removeTweens(this._helpScreen);
		createjs.Tween.removeTweens(this._helpBtn);
		createjs.Tween.get(this._helpScreen).to({ alpha : 0},400,createjs.Ease.sineOut);
		this._helpBtn.onClick = $bind(this,this.showHelpMenu);
		this._levelsLayer.mouseEnabled = true;
		if(this._justViewedTutor) {
			var e = { target : { name : "1"}};
			this.handleLevelClick(e);
		} else {
			this.setArrowBtnVisibility();
			this._helpBtn.alpha = 1;
		}
	}
	,showHelpMenu: function() {
		this._helpScreen.rewindPages();
		createjs.Tween.get(this._helpScreen).to({ alpha : 1},400,createjs.Ease.sineOut);
		createjs.Tween.get(this._helpBtn).to({ alpha : 0},200,createjs.Ease.sineOut);
		this._helpScreen.visible = true;
		this._helpBtn.onClick = null;
		this._levelsLayer.mouseEnabled = false;
		this._menuRightBtn.visible = this._menuLeftBtn.visible = false;
	}
	,handleMuteToggle: function() {
		co.doubleduck.SoundManager.toggleMute();
	}
	,_music: null
	,_movingPlanet: null
	,_chosenLevel: null
	,_levelsLayer: null
	,_currWorld: null
	,_isMoving: null
	,_targetLevelsPos: null
	,_targetBackPos: null
	,_back: null
	,_menuLeftBtn: null
	,_menuRightBtn: null
	,_helpScreen: null
	,_helpBtn: null
	,_muteBtn: null
	,_justViewedTutor: null
	,_backOffset: null
	,_levelButtons: null
	,_planets: null
	,WORLD_MOVE_EASE: null
	,__class__: co.doubleduck.Menu
});
co.doubleduck.PagedHelp = $hxClasses["co.doubleduck.PagedHelp"] = function(backUri,nextBtnUri,gotItBtnUri,pages) {
	createjs.Container.call(this);
	this._background = co.doubleduck.BaseAssets.getImage(backUri);
	this.addChild(this._background);
	this.regX = this._background.image.width / 2;
	this.regY = this._background.image.height / 2;
	this._contentLayer = new createjs.Container();
	if(pages.length > 0) {
		var _g1 = 0, _g = pages.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.addPage(pages[i],i);
		}
		this.addChild(this._contentLayer);
		this._pagesCount = pages.length;
		this._mask = new createjs.Shape();
		this._mask.graphics.beginFill("#000000");
		this._mask.graphics.drawRect(20,20,this._background.image.width - 40,this._background.image.height - 40);
		this._mask.graphics.endFill();
		this._contentLayer.mask = this._mask;
	} else this._pagesCount = 0;
	if(nextBtnUri != null && nextBtnUri != "") {
		this._nextBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(nextBtnUri),true,co.doubleduck.Button.CLICK_TYPE_SCALE);
		this._nextBtn.regX = this._nextBtn.image.width / 2;
		this._nextBtn.regY = this._nextBtn.image.height / 2;
		this._nextBtn.onClick = $bind(this,this.handleNextClick);
		this.addChild(this._nextBtn);
	}
	this._gotItBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(gotItBtnUri),true,co.doubleduck.Button.CLICK_TYPE_SCALE);
	this._gotItBtn.regX = this._gotItBtn.image.width / 2;
	this._gotItBtn.regY = this._gotItBtn.image.height / 2;
	this._gotItBtn.onClick = $bind(this,this.handleGotItClick);
	this.addChild(this._gotItBtn);
	this.setButtonsPos();
	this._currPage = 0;
	this.enableSwipe();
	this.addPageMarkers();
	this.setButtonsVis();
};
co.doubleduck.PagedHelp.__name__ = ["co","doubleduck","PagedHelp"];
co.doubleduck.PagedHelp.__super__ = createjs.Container;
co.doubleduck.PagedHelp.prototype = $extend(createjs.Container.prototype,{
	createPageMarker: function() {
		var img = co.doubleduck.BaseAssets.getRawImage("images/duckling/page_marker.png");
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : 16, height : 18};
		initObject.animations = { };
		initObject.animations.idle = { frames : 0, frequency : 20};
		initObject.animations.active = { frames : 1, frequency : 20};
		var pageMarker = new createjs.BitmapAnimation(new createjs.SpriteSheet(initObject));
		pageMarker.gotoAndStop("idle");
		return pageMarker;
	}
	,handleNextClick: function() {
		this._currPage++;
		if(this._currPage >= this._pagesCount) {
			this._currPage = this._pagesCount - 1;
			return;
		}
		this._pageMarkers[this._currPage - 1].gotoAndStop("idle");
		this._pageMarkers[this._currPage].gotoAndStop("active");
		createjs.Tween.get(this._contentLayer).to({ x : -1 * this._background.image.width * this._currPage},200,createjs.Ease.sineOut);
		this.setButtonsVis();
	}
	,handlePrevClick: function() {
		this._currPage--;
		if(this._currPage < 0) {
			this._currPage = 0;
			return;
		}
		this._pageMarkers[this._currPage + 1].gotoAndStop("idle");
		this._pageMarkers[this._currPage].gotoAndStop("active");
		createjs.Tween.get(this._contentLayer).to({ x : -1 * this._background.image.width * this._currPage},200,createjs.Ease.sineOut);
		this.setButtonsVis();
	}
	,setButtonsVis: function() {
		if(this._pagesCount == 0) {
			this._gotItBtn.visible = true;
			return;
		}
		if(this._currPage == this._pagesCount - 1) {
			this._gotItBtn.visible = true;
			this._nextBtn.visible = false;
		} else {
			this._gotItBtn.visible = false;
			this._nextBtn.visible = true;
		}
	}
	,handleSwipe: function(event) {
		if(event.direction == "left") this.handleNextClick(); else if(event.direction == "right") this.handlePrevClick();
	}
	,handleGotItClick: function() {
		if(this.onGotIt != null) this.onGotIt();
	}
	,addPageMarkers: function() {
		if(this._pagesCount == 0) return;
		this._pageMarkers = new Array();
		var totalWidth = 0;
		this._markersLayer = new createjs.Container();
		var _g1 = 0, _g = this._pagesCount;
		while(_g1 < _g) {
			var currPage = _g1++;
			var pageMarker = this.createPageMarker();
			this._pageMarkers.push(pageMarker);
			if(currPage != 0) {
				pageMarker.x = this._pageMarkers[currPage - 1].x + this._pageMarkers[currPage - 1].spriteSheet._frameWidth + 5;
				totalWidth += 5;
			}
			totalWidth += pageMarker.spriteSheet._frameWidth;
			this._markersLayer.addChild(pageMarker);
		}
		this._markersLayer.y = this._background.image.height * 0.80;
		this._markersLayer.x = this._background.image.width / 2;
		this._markersLayer.regX = totalWidth / 2;
		this.addChild(this._markersLayer);
		this._pageMarkers[0].gotoAndStop("active");
	}
	,addPage: function(pageUri,index) {
		var page = co.doubleduck.BaseAssets.getImage(pageUri);
		page.x += this._background.image.width * index;
		this._contentLayer.addChild(page);
	}
	,goToPage: function(page) {
		this._pageMarkers[this._currPage].gotoAndStop("idle");
		this._currPage = page;
		this._pageMarkers[this._currPage].gotoAndStop("active");
		this._contentLayer.x = -1 * this._background.image.width * this._currPage;
		this.setButtonsVis();
	}
	,changeContentMask: function(topPad,bottomPad,leftPad,rightPad) {
		this._mask.graphics.clear();
		this._mask.graphics.beginFill("#000000");
		this._mask.graphics.drawRect(leftPad,topPad,this._background.image.width - (rightPad + leftPad),this._background.image.height - (bottomPad + topPad));
		this._mask.graphics.endFill();
	}
	,rewindPages: function() {
		this.goToPage(0);
	}
	,enableSwipe: function() {
		co.doubleduck.BaseGame.hammer.onswipe = $bind(this,this.handleSwipe);
	}
	,setMarkersPos: function(percentY,percentX) {
		if(percentX == null) percentX = 0.5;
		this._markersLayer.y = this._background.image.height * percentY;
		this._markersLayer.x = this._background.image.width * percentX;
	}
	,setButtonsPos: function(percentX,percentY) {
		if(percentY == null) percentY = 0.5;
		if(percentX == null) percentX = 0.5;
		if(this._nextBtn != null) {
			this._nextBtn.x = this._background.image.width * percentX;
			this._nextBtn.y = this._background.image.height * percentY;
		}
		this._gotItBtn.x = this._background.image.width * percentX;
		this._gotItBtn.y = this._background.image.height * percentY;
	}
	,_currPage: null
	,_pagesCount: null
	,_gotItBtn: null
	,_nextBtn: null
	,_pageMarkers: null
	,_markersLayer: null
	,_mask: null
	,_contentLayer: null
	,_background: null
	,onGotIt: null
	,__class__: co.doubleduck.PagedHelp
});
co.doubleduck.Persistence = $hxClasses["co.doubleduck.Persistence"] = function() { }
co.doubleduck.Persistence.__name__ = ["co","doubleduck","Persistence"];
co.doubleduck.Persistence.initGameData = function() {
	co.doubleduck.BasePersistence.GAME_PREFIX = "PATK_";
	co.doubleduck.BasePersistence.initVar("unlockedLVL","1");
	var _g1 = 0, _g = co.doubleduck.DataLoader.getLevelsCount();
	while(_g1 < _g) {
		var i = _g1++;
		co.doubleduck.BasePersistence.initVar("starRating" + (i + 1),"0");
	}
}
co.doubleduck.Persistence.getUnlockedLevel = function() {
	return Std.parseInt(co.doubleduck.BasePersistence.getValue("unlockedLVL"));
}
co.doubleduck.Persistence.setUnlockedLevel = function(newLevel) {
	co.doubleduck.BasePersistence.setValue("unlockedLVL","" + newLevel);
}
co.doubleduck.Persistence.getStarRating = function(lvl) {
	return Std.parseInt(co.doubleduck.BasePersistence.getValue("starRating" + lvl));
}
co.doubleduck.Persistence.setStarRating = function(lvl,rating) {
	co.doubleduck.BasePersistence.setValue("starRating" + lvl,"" + rating);
}
co.doubleduck.Persistence.__super__ = co.doubleduck.BasePersistence;
co.doubleduck.Persistence.prototype = $extend(co.doubleduck.BasePersistence.prototype,{
	__class__: co.doubleduck.Persistence
});
co.doubleduck.Planet = $hxClasses["co.doubleduck.Planet"] = function(type) {
	this.onExplosion = null;
	this._type = type;
	var imgUrl = "";
	switch( (this._type)[1] ) {
	case 0:
		imgUrl = "images/general/star1.png";
		break;
	case 1:
		imgUrl = "images/general/star2.png";
		break;
	case 2:
		imgUrl = "images/general/star3.png";
		break;
	default:
	}
	this._hp = 100;
	createjs.Container.call(this);
	this._image = co.doubleduck.BaseAssets.getImage(imgUrl);
	this.addChild(this._image);
};
co.doubleduck.Planet.__name__ = ["co","doubleduck","Planet"];
co.doubleduck.Planet._explosionSpritesheet = null;
co.doubleduck.Planet.__super__ = createjs.Container;
co.doubleduck.Planet.prototype = $extend(createjs.Container.prototype,{
	image: null
	,get_image: function() {
		return this._image.image;
	}
	,initExplosionSpritesheet: function() {
		var img;
		var initObject;
		img = co.doubleduck.BaseAssets.getRawImage("images/session/explosions/stars_explosions.png");
		var imgWidth = 85;
		var imgHeight = 85;
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
		initObject.animations = { };
		var frequency = 2;
		initObject.animations["0" + "explosion"] = { frames : [20,21,22,23,24,25,26,27,28,29], frequency : frequency, next : false};
		initObject.animations["1" + "explosion"] = { frames : [0,1,2,3,4,5,6,7,8,9], frequency : frequency, next : false};
		initObject.animations["2" + "explosion"] = { frames : [10,11,12,13,14,15,16,17,18,19], frequency : frequency, next : false};
		co.doubleduck.Planet._explosionSpritesheet = new createjs.SpriteSheet(initObject);
	}
	,removeExplosion: function(target) {
		var explosion = target;
		this.removeChild(explosion);
	}
	,handleExplosionEnd: function(target) {
		var explosion = target;
		createjs.Tween.get(explosion).to({ alpha : 0},500,createjs.Ease.sineOut).call($bind(this,this.removeExplosion),[explosion]);
	}
	,getExplosion: function() {
		var typeIndex = this._type[1];
		if(co.doubleduck.Planet._explosionSpritesheet == null) this.initExplosionSpritesheet();
		var anim = new createjs.BitmapAnimation(co.doubleduck.Planet._explosionSpritesheet);
		anim.gotoAndPlay(this._type[1] + "explosion");
		anim.onAnimationEnd = $bind(this,this.handleExplosionEnd);
		return anim;
	}
	,explode: function() {
		if(this.onExplosion != null) this.onExplosion();
	}
	,takeHit: function(loc) {
		this._hp -= 5;
		if(this._hp <= 0) this.explode(); else {
			var locPoint = this.globalToLocal(loc.x,loc.y);
			var explosion = this.getExplosion();
			explosion.x = locPoint.x;
			explosion.y = locPoint.y;
			this.addChild(explosion);
			co.doubleduck.SoundManager.playEffect("sound/Planet_hit_1");
		}
	}
	,_image: null
	,_hp: null
	,_type: null
	,onExplosion: null
	,__class__: co.doubleduck.Planet
	,__properties__: {get_image:"get_image"}
});
co.doubleduck.PlanetType = $hxClasses["co.doubleduck.PlanetType"] = { __ename__ : ["co","doubleduck","PlanetType"], __constructs__ : ["FIRST","SECOND","THIRD"] }
co.doubleduck.PlanetType.FIRST = ["FIRST",0];
co.doubleduck.PlanetType.FIRST.toString = $estr;
co.doubleduck.PlanetType.FIRST.__enum__ = co.doubleduck.PlanetType;
co.doubleduck.PlanetType.SECOND = ["SECOND",1];
co.doubleduck.PlanetType.SECOND.toString = $estr;
co.doubleduck.PlanetType.SECOND.__enum__ = co.doubleduck.PlanetType;
co.doubleduck.PlanetType.THIRD = ["THIRD",2];
co.doubleduck.PlanetType.THIRD.toString = $estr;
co.doubleduck.PlanetType.THIRD.__enum__ = co.doubleduck.PlanetType;
co.doubleduck.Session = $hxClasses["co.doubleduck.Session"] = function(properties) {
	this._pauseScreen = null;
	this._properties = properties;
	co.doubleduck.Session.levelNumber = properties.levelId | 0;
	this._levelData = co.doubleduck.DataLoader.getLevelById(co.doubleduck.Session.levelNumber);
	co.doubleduck.BaseSession.call(this);
	this.constructLevel();
	this.addHud();
	this.initScore();
	this.initGrid();
	this._waveHandler = new co.doubleduck.WaveHandler(co.doubleduck.Session.levelNumber);
	this._waveHandler.onSpawnEnemy = $bind(this,this.spawnEnemy);
	this._waveHandler.startWaveTiming();
	this._waveHandler.onShowWaveLabel = $bind(this,this.handleNewWave);
	this._waveHandler.onWavesFinished = $bind(this,this.handleWavesFinished);
	this._sessionEnded = false;
};
co.doubleduck.Session.__name__ = ["co","doubleduck","Session"];
co.doubleduck.Session.__super__ = co.doubleduck.BaseSession;
co.doubleduck.Session.prototype = $extend(co.doubleduck.BaseSession.prototype,{
	unpause: function() {
		this.removeChild(this._pauseScreen);
		createjs.Ticker.setPaused(false);
		this.enableUI();
		this._pauseBtn.visible = true;
		this._pauseScreen.visible = false;
	}
	,pause: function() {
		if(this._pauseScreen == null) this.initPauseScreen();
		this.addChild(this._pauseScreen);
		this._pauseScreen.visible = true;
		this.disableUI();
		this._pauseBtn.visible = false;
		createjs.Ticker.setPaused(true);
		this.getStage().update();
	}
	,destroyAllEnemies: function() {
		var _g1 = 0, _g = co.doubleduck.Session.ROWS;
		while(_g1 < _g) {
			var currRow = _g1++;
			var _g3 = 0, _g2 = this._enemiesOnGrid[currRow].length;
			while(_g3 < _g2) {
				var currEnemyIndex = _g3++;
				var currEnemy = this._enemiesOnGrid[currRow][currEnemyIndex];
				currEnemy.destroy();
			}
		}
	}
	,destroyAllAllies: function() {
		var _g1 = 0, _g = co.doubleduck.Session.COLS;
		while(_g1 < _g) {
			var currCol = _g1++;
			var _g3 = 0, _g2 = co.doubleduck.Session.ROWS;
			while(_g3 < _g2) {
				var currRow = _g3++;
				var currAlly = this._alliesOnGrid[currCol][currRow];
				if(currAlly != null) currAlly.destroy();
			}
		}
	}
	,destroy: function() {
		this._waveHandler.stopWaves();
		co.doubleduck.BaseSession.prototype.destroy.call(this);
		this.destroyAllEnemies();
		this.destroyAllAllies();
	}
	,getRowYPos: function(row) {
		var YPos = this._grid.y - this._grid.image.width / 2 * co.doubleduck.BaseGame.getScale() + (row + 1) * co.doubleduck.Session.CELL_SIZE * co.doubleduck.BaseGame.getScale() + co.doubleduck.Session.CELL_SIZE * 0.5 * co.doubleduck.BaseGame.getScale();
		return YPos;
	}
	,handleExplosionEnd: function(explosion) {
		this.removeChild(explosion);
	}
	,doExplosion: function(args) {
		var args1 = args;
		var x = args1.x;
		var y = args1.y;
		var explosion = new createjs.BitmapAnimation(co.doubleduck.Session._explosionSpritesheet);
		if(Math.random() > 0.5) explosion.scaleY *= -1;
		if(Math.random() > 0.5) explosion.scaleX *= -1;
		explosion.gotoAndPlay("explosion");
		explosion.onAnimationEnd = $bind(this,this.handleExplosionEnd);
		explosion.x = x;
		explosion.y = y;
		this.addChild(explosion);
		co.doubleduck.SoundManager.playEffect("sound/Explosion_1");
	}
	,explosion: function(x,y) {
		if(co.doubleduck.Session._explosionSpritesheet == null) {
			var img;
			var initObject;
			img = co.doubleduck.BaseAssets.getRawImage("images/session/explosions/ship_explosion.png");
			var imgWidth = 95;
			var imgHeight = 95;
			initObject = { };
			initObject.images = [img];
			initObject.frames = { width : imgWidth, height : imgHeight, regX : imgWidth / 2, regY : imgHeight / 2};
			initObject.animations = { };
			var frequency = 2;
			initObject.animations.explosion = { frames : [0,1,2,3,4,5,6,7,8,9], frequency : frequency, next : false};
			co.doubleduck.Session._explosionSpritesheet = new createjs.SpriteSheet(initObject);
		}
		var args = { };
		args.x = x;
		args.y = y;
		co.doubleduck.Utils.waitAndCall(null,20 + Math.random() * 30 | 0,$bind(this,this.doExplosion),[args]);
	}
	,handleAllyDeath: function(a) {
		a.destroy();
		this._allyLayers[a.getGridPos().y | 0].removeChild(a);
		this._alliesOnGrid[a.getGridPos().x | 0][a.getGridPos().y | 0] = null;
		this.explosion(a.x,a.y);
	}
	,showUnlockedUnit: function(args) {
		var type = args;
		var imageUrl = "images/session/end_level/unlock_" + type[0].toLowerCase() + ".png";
		var image = co.doubleduck.Utils.getCenteredImage(imageUrl,true);
		image.x = co.doubleduck.BaseGame.getViewport().width / 2;
		image.y = co.doubleduck.BaseGame.getViewport().height / 2;
		image.alpha = 0;
		image.scaleX *= 2;
		image.scaleY *= 2;
		createjs.Tween.get(image).to({ alpha : 1, scaleX : co.doubleduck.BaseGame.getScale(), scaleY : co.doubleduck.BaseGame.getScale()},350,createjs.Ease.sineInOut);
		this.addChild(image);
	}
	,handlePersistence: function(unitUnlockDelay,stars) {
		var ldb = new LevelDB();
		if(co.doubleduck.Persistence.getStarRating(co.doubleduck.Session.levelNumber) < stars) co.doubleduck.Persistence.setStarRating(co.doubleduck.Session.levelNumber,stars);
		var currLevelUnlocked = co.doubleduck.Persistence.getUnlockedLevel();
		if(co.doubleduck.Session.levelNumber == currLevelUnlocked) {
			var newLevel = co.doubleduck.Session.levelNumber + 1;
			if(newLevel <= ldb.getAllLevels().length) {
				co.doubleduck.Persistence.setUnlockedLevel(newLevel);
				var allyDB = new AllyDB();
				var _g1 = 0, _g = allyDB.getAllAllies().length;
				while(_g1 < _g) {
					var currAllyIndex = _g1++;
					var currAlly = allyDB.getAllAllies()[currAllyIndex];
					if((currAlly.unlockLevel | 0) == newLevel) {
						var type = co.doubleduck.Ally.getTypeByName(currAlly.type);
						co.doubleduck.Utils.waitAndCall(this,unitUnlockDelay,$bind(this,this.showUnlockedUnit),[type]);
					}
				}
			}
		}
	}
	,handleLevelWin: function() {
		co.doubleduck.SoundManager.playEffect("sound/Win");
		this._waveHandler.stopWaves();
		this.destroyAllAllies();
		this.destroyAllEnemies();
		this._sessionEnded = true;
		this.disableUI();
		var winCaption = co.doubleduck.Utils.getCenteredImage("images/session/end_level/victory_pop_up.png",true);
		winCaption.x = co.doubleduck.BaseGame.getViewport().width / 2;
		winCaption.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this.addChild(winCaption);
		winCaption.scaleX = winCaption.scaleX = co.doubleduck.BaseGame.getScale();
		var btnMenu = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_menu.png"),true,2,"sound/Button_click");
		btnMenu.regY = 0;
		btnMenu.onClick = this.onBackToMenu;
		var btnRestart = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_restart.png"),true,2,"sound/Button_click");
		btnRestart.regY = 0;
		btnRestart.onClick = this.onRestart;
		var btnNext = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_next.png"),true,2,"sound/Button_click");
		btnNext.regY = 0;
		btnNext.onClick = this.onNextLevel;
		var buttonContainer = co.doubleduck.Utils.containBitmaps([btnRestart,btnMenu,btnNext],20);
		buttonContainer.x = winCaption.x;
		buttonContainer.y = winCaption.y + winCaption.image.height * co.doubleduck.BaseGame.getScale() * 0.44;
		this.addChild(buttonContainer);
		buttonContainer.scaleX = buttonContainer.scaleY = co.doubleduck.BaseGame.getScale();
		var numStars = this._strikesRemaining;
		var stars = new Array();
		var basicInterval = 402;
		var totalTweenTime = 0;
		var _g = 0;
		while(_g < numStars) {
			var currStarNum = _g++;
			var star = co.doubleduck.BaseAssets.getImage("images/session/end_level/star.png");
			star.y = -star.image.height / 6;
			if(numStars == 3 && currStarNum == 1) star.y = -star.image.height / 2;
			star.alpha = 0;
			var interval = basicInterval * currStarNum;
			stars[currStarNum] = star;
			co.doubleduck.Utils.setCenterReg(star);
			var currScale = star.scaleX;
			var targetScale = star.scaleX * 1.5;
			if(numStars == 3) {
				if(currStarNum == 0) interval = basicInterval; else if(currStarNum == 1) interval = basicInterval * 3; else interval = basicInterval * 2;
			}
			if(totalTweenTime < interval + 250) totalTweenTime = interval + 250;
			createjs.Tween.get(star).wait(interval).to({ alpha : 1},10).to({ scaleX : targetScale, scaleY : targetScale},90).to({ scaleX : currScale, scaleY : currScale},140);
		}
		var space = 20;
		if(numStars == 3) space = -4;
		var starContainer = co.doubleduck.Utils.containBitmaps(stars,space);
		starContainer.regY = 0;
		starContainer.regX -= stars[0].image.width / 2;
		starContainer.regY -= stars[0].image.height / 2;
		starContainer.x = co.doubleduck.BaseGame.getViewport().width / 2;
		starContainer.y = winCaption.y - winCaption.image.height * 0.41 * co.doubleduck.BaseGame.getScale();
		starContainer.scaleX = starContainer.scaleY = co.doubleduck.BaseGame.getScale();
		this.addChild(starContainer);
		this.handlePersistence(totalTweenTime,numStars);
	}
	,handleEnemyDeath: function(e,killedByPlayer,showExplosion) {
		if(showExplosion == null) showExplosion = true;
		if(killedByPlayer == null) killedByPlayer = false;
		if(killedByPlayer) this.increaseBalance(e.getCreditYield());
		e.destroy();
		this.removeChild(e);
		HxOverrides.remove(this._enemiesOnGrid[e.getRow()],e);
		this._nunEnemiesOnGrid -= 1;
		if(showExplosion) this.explosion(e.x,e.y);
		if(!this._sessionEnded && this._wavesFinished && this._nunEnemiesOnGrid == 0) this.handleLevelWin();
	}
	,enableUI: function() {
		this._pauseBtn.mouseEnabled = true;
		this._hudContainer.mouseEnabled = true;
		this._background.mouseEnabled = true;
	}
	,disableUI: function() {
		this._pauseBtn.mouseEnabled = false;
		this._hudContainer.mouseEnabled = false;
		this._background.mouseEnabled = false;
	}
	,handlePlanetDestruction: function() {
		co.doubleduck.SoundManager.playEffect("sound/Lose");
		this._sessionEnded = true;
		this.disableUI();
		var loseCaption = co.doubleduck.Utils.getCenteredImage("images/session/end_level/defeat_pop_up.png",true);
		loseCaption.x = co.doubleduck.BaseGame.getViewport().width / 2;
		loseCaption.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this.addChild(loseCaption);
		loseCaption.scaleX = loseCaption.scaleY = co.doubleduck.BaseGame.getScale();
		var btnMenu = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_menu.png"),true,2,"sound/Button_click");
		btnMenu.regY = 0;
		btnMenu.onClick = this.onBackToMenu;
		var btnRestart = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_restart.png"),true,2,"sound/Button_click");
		btnRestart.regY = 0;
		btnRestart.onClick = this.onRestart;
		var buttonContainer = co.doubleduck.Utils.containBitmaps([btnMenu,btnRestart],20);
		buttonContainer.x = loseCaption.x;
		buttonContainer.y = loseCaption.y + loseCaption.image.height * co.doubleduck.BaseGame.getScale() * 0.4;
		this.addChild(buttonContainer);
		buttonContainer.scaleX = buttonContainer.scaleY = co.doubleduck.BaseGame.getScale();
		this._waveHandler.stopWaves();
		this.destroyAllAllies();
		this.destroyAllEnemies();
	}
	,handlePlanetExplosion: function(e) {
		if(!this._sessionEnded) {
			this._strikesRemaining -= 1;
			this._strikeGraphics[3 - this._strikesRemaining - 1].alpha = 1;
			if(this._strikesRemaining == 0) this.handlePlanetDestruction();
		}
		this._planet.takeHit(new createjs.Point(e.x,e.y));
		this.handleEnemyDeath(e,false,false);
	}
	,spawnEnemy: function(type) {
		if(this._sessionEnded) return;
		var nme = co.doubleduck.Enemy.create(type);
		nme.x = co.doubleduck.BaseGame.getViewport().width + (nme.getWidth() / 2 + 10) * co.doubleduck.BaseGame.getScale();
		nme.y = co.doubleduck.BaseGame.getViewport().height / 2;
		nme.scaleX = nme.scaleY = co.doubleduck.BaseGame.getScale();
		nme.onDeath = $bind(this,this.handleEnemyDeath);
		nme.onPlanetExplosion = $bind(this,this.handlePlanetExplosion);
		this.addChild(nme);
		var randRow = Std.random(co.doubleduck.Session.ROWS);
		nme.setAttackingPlanet(this._planet);
		nme.y = this.getRowYPos(randRow);
		nme.setAllyLine(this._allyLayers[randRow]);
		nme.setRow(randRow);
		nme.setGridRightEdge(this._grid.x);
		nme.setGridGfx(this._grid);
		if(js.Boot.__instanceof(nme,co.doubleduck.enemies.BombEnemy)) {
			var bombNme = nme;
			bombNme.setAllyGrid(this._alliesOnGrid);
		}
		this._enemiesOnGrid[randRow].push(nme);
		this._nunEnemiesOnGrid += 1;
	}
	,removeMineral: function(mineral) {
		this.removeChild(mineral);
	}
	,handleResourceMine: function(amount,source) {
		if(this._sessionEnded) return;
		var mineral = co.doubleduck.BaseAssets.getImage("images/session/hud/mineral.png");
		mineral.scaleX = mineral.scaleY = co.doubleduck.BaseGame.getScale();
		mineral.x = source.x;
		mineral.y = source.y;
		mineral.alpha = 0;
		var tweenTime = 1000;
		createjs.Tween.get(mineral).to({ x : this._mineralCounterContainer.x},tweenTime);
		createjs.Tween.get(mineral).to({ y : this._mineralCounterContainer.y},tweenTime,createjs.Ease.sineOut).call($bind(this,this.increaseBalance),[amount]);
		createjs.Tween.get(mineral).to({ alpha : 1},tweenTime / 2,createjs.Ease.sineIn).to({ alpha : 0},tweenTime / 2,createjs.Ease.sineOut).call($bind(this,this.removeMineral),[mineral]);
		this.addChild(mineral);
	}
	,removeLaser: function(laser) {
		this.removeChild(laser);
	}
	,handleLaserFired: function(source) {
		var laser = co.doubleduck.BaseAssets.getImage("images/allies/laser_line.png");
		laser.scaleX = laser.scaleY = co.doubleduck.BaseGame.getScale();
		laser.x = source.x + 20 * co.doubleduck.BaseGame.getScale();
		laser.y = source.y + 11 * co.doubleduck.BaseGame.getScale();
		laser.alpha = 0;
		this.addChildAt(laser,this.getChildIndex(this._allyLayers[co.doubleduck.Session.ROWS - 1]) - 1);
		createjs.Tween.get(laser).to({ alpha : 1},200,createjs.Ease.sineIn).to({ alpha : 0},350,createjs.Ease.sineOut).call($bind(this,this.removeLaser),[laser]);
	}
	,placeAlly: function(col,row) {
		var ally = co.doubleduck.Ally.create(this._selectedAllyType);
		this._allyLayers[row].addChild(ally);
		ally.scaleX = ally.scaleY = co.doubleduck.BaseGame.getScale();
		var allyX = this._grid.x - this._grid.image.width * co.doubleduck.BaseGame.getScale() + col * co.doubleduck.Session.CELL_SIZE * co.doubleduck.BaseGame.getScale() + co.doubleduck.Session.CELL_SIZE / 2 * co.doubleduck.BaseGame.getScale();
		var allyY = this.getRowYPos(row);
		ally.x = allyX;
		ally.y = allyY;
		ally.setGrid(this._enemiesOnGrid);
		ally.setGridPos(new createjs.Point(col,row));
		ally.setGridRightEdge(this._grid.x);
		ally.onDeath = $bind(this,this.handleAllyDeath);
		if(js.Boot.__instanceof(ally,co.doubleduck.allies.ResourceAlly)) {
			var resource = ally;
			resource.onMineResources = $bind(this,this.handleResourceMine);
		}
		if(js.Boot.__instanceof(ally,co.doubleduck.allies.LaserAlly)) {
			var laserAlly = ally;
			laserAlly.onFireLaser = $bind(this,this.handleLaserFired);
		}
		this._alliesOnGrid[col][row] = ally;
		co.doubleduck.SoundManager.playEffect("sound/Ally_ship_placement_1");
	}
	,handleClick: function(e) {
		var gridLocal = this._grid.globalToLocal(e.stageX,e.stageY);
		if(gridLocal.x > 0 && gridLocal.x < this._grid.image.width && gridLocal.y > 0 && gridLocal.y < this._grid.image.height) {
			var col = gridLocal.x / co.doubleduck.Session.CELL_SIZE | 0;
			var row = gridLocal.y / co.doubleduck.Session.CELL_SIZE | 0;
			if(this._alliesOnGrid[col][row] != null) return;
			if(this._selectedAllyType != null && co.doubleduck.Ally.getPrice(this._selectedAllyType) <= this._balance) {
				this.placeAlly(col,row);
				this.decreaseBalance(co.doubleduck.Ally.getPrice(this._selectedAllyType));
			}
		}
	}
	,showGrid: function() {
		createjs.Tween.get(this._grid).to({ alpha : 1},400,createjs.Ease.bounceIn);
	}
	,constructLevel: function() {
		this._background = co.doubleduck.Utils.getCenteredImage("images/general/bg.jpg",true);
		this.addChild(this._background);
		this._background.regX = 0;
		this._background.x = this._properties.backOffset | 0;
		this._background.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this._background.mouseEnabled = true;
		this._background.onClick = $bind(this,this.handleClick);
		var ratio = co.doubleduck.BaseGame.getViewport().height / co.doubleduck.BaseGame.getViewport().width;
		var interval = co.doubleduck.Utils.map(ratio,0.5,0.66,90,15);
		this._grid = co.doubleduck.Utils.getCenteredImage("images/session/grid.png",true);
		this._grid.regX = this._grid.image.width;
		this._grid.regY = this._grid.image.height / 2;
		this._grid.x = co.doubleduck.BaseGame.getViewport().width - interval * co.doubleduck.BaseGame.getScale();
		this._grid.y = co.doubleduck.BaseGame.getViewport().height * 0.57;
		this._grid.alpha = 0;
		this.addChild(this._grid);
		var interval2 = co.doubleduck.Utils.map(ratio,0.5,0.66,70,15);
		var planetType = co.doubleduck.PlanetType.FIRST;
		if(co.doubleduck.Session.levelNumber > 10 && co.doubleduck.Session.levelNumber <= 20) planetType = co.doubleduck.PlanetType.SECOND; else if(co.doubleduck.Session.levelNumber > 20) planetType = co.doubleduck.PlanetType.THIRD;
		this._planet = new co.doubleduck.Planet(planetType);
		this._planet.regX = this._planet.get_image().width / 2;
		this._planet.regY = this._planet.get_image().height / 2;
		this._planet.scaleX = this._planet.scaleY = co.doubleduck.BaseGame.getScale();
		this._planet.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this._planet.x = 0;
		var planetX = this._grid.x - (this._grid.image.width + interval2) * co.doubleduck.BaseGame.getScale() - this._planet.get_image().width / 2 * co.doubleduck.BaseGame.getScale();
		this.addChild(this._planet);
		createjs.Tween.get(this._planet).to({ x : planetX},452,createjs.Ease.sineInOut).call($bind(this,this.showGrid));
	}
	,handleIconClick: function(e) {
		var clickedIcon = e.target;
		var type = clickedIcon.type();
		this._selectedAllyType = type;
		var _g1 = 0, _g = this._allyIcons.length;
		while(_g1 < _g) {
			var currIcon = _g1++;
			var icon = this._allyIcons[currIcon];
			if(icon.type() == type) icon.setSelected(); else icon.setUnselected();
		}
	}
	,addHud: function() {
		var totalWidth = 0;
		this._hudContainer = new createjs.Container();
		this._mineralCounterContainer = co.doubleduck.BaseAssets.getImage("images/session/hud/mineral_counter.png");
		this._mineralCounterContainer.x = 10 * co.doubleduck.BaseGame.getScale();
		this._mineralCounterContainer.y = (10 + this._mineralCounterContainer.image.height / 2) * co.doubleduck.BaseGame.getScale();
		this._mineralCounterContainer.regY = this._mineralCounterContainer.image.height / 2;
		this._mineralCounterContainer.scaleX = this._mineralCounterContainer.scaleY = co.doubleduck.BaseGame.getScale();
		this.addChild(this._mineralCounterContainer);
		this._allyIcons = new Array();
		var iconIndex = 0;
		var _g = 0;
		while(_g < 6) {
			var currIcon = _g++;
			var type = Type.createEnumIndex(co.doubleduck.AllyType,currIcon);
			if(co.doubleduck.Ally.getUnlockLevel(type) > (this._levelData.id | 0)) continue;
			var icon = new co.doubleduck.AllyIcon(type);
			icon.x = (icon.getWidth() + 5) * co.doubleduck.BaseGame.getScale() * iconIndex;
			icon.y = 0;
			icon.onClick = $bind(this,this.handleIconClick);
			if(type == co.doubleduck.AllyType.BASIC) {
				icon.setSelected();
				this._selectedAllyType = type;
			}
			this._hudContainer.addChild(icon);
			totalWidth += (icon.getWidth() + 5) * co.doubleduck.BaseGame.getScale();
			this._allyIcons.push(icon);
			iconIndex += 1;
		}
		this._pauseBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_pause.png"),false,2,"sound/Button_click");
		this._pauseBtn.regX = this._pauseBtn.image.width;
		this._pauseBtn.scaleX = this._pauseBtn.scaleY = co.doubleduck.BaseGame.getScale();
		this._pauseBtn.x = co.doubleduck.BaseGame.getViewport().width - 10 * co.doubleduck.BaseGame.getScale();
		this._pauseBtn.y = 5 * co.doubleduck.BaseGame.getScale();
		this._pauseBtn.onClick = $bind(this,this.pause);
		this.addChild(this._pauseBtn);
		this.addChild(this._hudContainer);
		this._hudContainer.regX = totalWidth / 2;
		this._hudContainer.x = (this._mineralCounterContainer.x + this._mineralCounterContainer.image.width * co.doubleduck.BaseGame.getScale() + this._pauseBtn.x - this._pauseBtn.image.width * co.doubleduck.BaseGame.getScale()) / 2;
		var pxSize = 18 * co.doubleduck.BaseGame.getScale() | 0;
		this._mineralsDisplay = new createjs.Text("","" + pxSize + "px Arial","#FFFFFF");
		this._mineralsDisplay.regY = this._mineralsDisplay.getMeasuredHeight() / 2;
		this._mineralsDisplay.textAlign = "center";
		this.addChild(this._mineralsDisplay);
		this._mineralsDisplay.x = this._mineralCounterContainer.x + this._mineralCounterContainer.image.width * 0.65 * co.doubleduck.BaseGame.getScale();
		this._mineralsDisplay.y = this._mineralCounterContainer.y;
	}
	,initScore: function() {
		this._balance = this._levelData.initialBalance | 0;
		this._strikesRemaining = 3;
		this._wavesFinished = false;
		this._nunEnemiesOnGrid = 0;
		this.setBalance();
		this._strikeGraphics = new Array();
		var _g = 0;
		while(_g < 3) {
			var currCross = _g++;
			var cross = co.doubleduck.BaseAssets.getImage("images/session/hud/cross.png");
			this._strikeGraphics[currCross] = cross;
			cross.alpha = 0.2;
		}
		var dims = new createjs.Rectangle(0,0,0,0);
		var strikeContainer = co.doubleduck.Utils.containBitmaps(this._strikeGraphics,7,true,dims);
		strikeContainer.regX = 0;
		strikeContainer.regY = this._strikeGraphics[0].image.height;
		strikeContainer.scaleX = strikeContainer.scaleY = co.doubleduck.BaseGame.getScale();
		this.addChild(strikeContainer);
		strikeContainer.x = 10 * co.doubleduck.BaseGame.getScale();
		strikeContainer.y = co.doubleduck.BaseGame.getViewport().height;
	}
	,initGrid: function() {
		this._alliesOnGrid = new Array();
		var _g1 = 0, _g = co.doubleduck.Session.COLS;
		while(_g1 < _g) {
			var currCol = _g1++;
			var newColumn = new Array();
			this._alliesOnGrid[currCol] = newColumn;
			var _g3 = 0, _g2 = co.doubleduck.Session.ROWS;
			while(_g3 < _g2) {
				var currRow = _g3++;
				this._alliesOnGrid[currCol][currRow] = null;
			}
		}
		this._allyLayers = new Array();
		var _g1 = 0, _g = co.doubleduck.Session.ROWS;
		while(_g1 < _g) {
			var row = _g1++;
			this._allyLayers.push(new createjs.Container());
			this.addChild(this._allyLayers[row]);
		}
		this._enemiesOnGrid = new Array();
		var _g1 = 0, _g = co.doubleduck.Session.ROWS;
		while(_g1 < _g) {
			var currRow = _g1++;
			var currRow1 = new Array();
			this._enemiesOnGrid.push(currRow1);
		}
	}
	,removeWaveGfx: function(target) {
		var waveGfx = target;
		this.removeChild(waveGfx);
	}
	,handleNewWave: function(waveNum) {
		var waveGfx = new createjs.Container();
		var width = 0;
		if(waveNum == 0) {
			var finalWave = co.doubleduck.BaseAssets.getImage("images/session/wave_text/final_wave.png");
			waveGfx = co.doubleduck.Utils.containBitmaps([finalWave]);
			waveGfx.regX = finalWave.image.width / 2;
			waveGfx.regY = 0;
			width = finalWave.image.width;
		} else {
			var wave = co.doubleduck.BaseAssets.getImage("images/session/wave_text/wave.png");
			var waveNum1 = co.doubleduck.BaseAssets.getImage("images/session/wave_text/wave_num_font/" + waveNum + ".png");
			var dims = new createjs.Rectangle(0,0,0,0);
			waveGfx = co.doubleduck.Utils.containBitmaps([wave,waveNum1],20,true,dims);
			waveGfx.regX = dims.width / 2;
			waveGfx.regY = 0;
			width = dims.width;
		}
		waveGfx.x = -width / 2;
		waveGfx.y = co.doubleduck.BaseGame.getViewport().height * 0.3;
		waveGfx.alpha = 0;
		waveGfx.scaleX = waveGfx.scaleY = co.doubleduck.BaseGame.getScale();
		this.addChild(waveGfx);
		createjs.Tween.get(waveGfx).to({ alpha : 1},1500,createjs.Ease.none).wait(2000).to({ alpha : 0},1500,createjs.Ease.none);
		createjs.Tween.get(waveGfx).to({ x : co.doubleduck.BaseGame.getViewport().width + width / 2 * co.doubleduck.BaseGame.getScale()},5000,createjs.Ease.none).call($bind(this,this.removeWaveGfx),[waveGfx]);
	}
	,handleWavesFinished: function() {
		this._wavesFinished = true;
	}
	,decreaseBalance: function(amount) {
		if(this._sessionEnded) return;
		this._balance -= amount;
		this.setBalance();
	}
	,increaseBalance: function(amount) {
		if(this._sessionEnded) return;
		this._balance += amount;
		this.setBalance();
	}
	,setBalance: function() {
		this._mineralsDisplay.text = "" + this._balance;
	}
	,handlePauseMenuClick: function() {
		createjs.Ticker.setPaused(false);
		if(this.onBackToMenu != null) this.onBackToMenu();
	}
	,handlePauseRestartClick: function() {
		createjs.Ticker.setPaused(false);
		if(this.onRestart != null) this.onRestart();
	}
	,initPauseScreen: function() {
		this._pauseScreen = new createjs.Container();
		var pauseBg = co.doubleduck.BaseAssets.getImage("images/session/hud/pause_screen.png",true);
		pauseBg.onClick = $bind(this,this.unpause);
		this._pauseScreen.addChild(pauseBg);
		this._pauseScreen.regX = pauseBg.image.width / 2;
		this._pauseScreen.regY = pauseBg.image.height / 2;
		this._pauseScreen.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._pauseScreen.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this._pauseScreen.visible = false;
		var restartBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_restart.png"),false,2,"sound/Button_click");
		restartBtn.regX = 0;
		restartBtn.regY = 0;
		restartBtn.onClick = $bind(this,this.handlePauseRestartClick);
		var menuBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_menu.png"),false,2,"sound/Button_click");
		menuBtn.regX = 0;
		menuBtn.regY = 0;
		menuBtn.onClick = $bind(this,this.handlePauseMenuClick);
		var playBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/hud/button_play.png"),false,2,"sound/Button_click");
		playBtn.regX = 0;
		playBtn.regY = 0;
		playBtn.onClick = $bind(this,this.unpause);
		var buttonContainer = co.doubleduck.Utils.containBitmaps([restartBtn,menuBtn,playBtn],15);
		buttonContainer.regY = 0;
		this._pauseScreen.addChild(buttonContainer);
		buttonContainer.x = pauseBg.image.width / 2;
		buttonContainer.y = pauseBg.image.height * 0.65;
		this._pauseScreen.scaleX = this._pauseScreen.scaleY = co.doubleduck.BaseGame.getScale();
	}
	,_pauseScreen: null
	,_sessionEnded: null
	,_waveHandler: null
	,_nunEnemiesOnGrid: null
	,_properties: null
	,_enemiesOnGrid: null
	,_allyLayers: null
	,_alliesOnGrid: null
	,_grid: null
	,_planet: null
	,_background: null
	,_mineralsDisplay: null
	,_hudContainer: null
	,_selectedAllyType: null
	,_pauseBtn: null
	,_allyIcons: null
	,_mineralCounterContainer: null
	,_strikeGraphics: null
	,_wavesFinished: null
	,_strikesRemaining: null
	,_balance: null
	,_levelData: null
	,__class__: co.doubleduck.Session
});
co.doubleduck.SoundType = $hxClasses["co.doubleduck.SoundType"] = { __ename__ : ["co","doubleduck","SoundType"], __constructs__ : ["WEB_AUDIO","AUDIO_FX","AUDIO_NO_OVERLAP","HOWLER","NONE"] }
co.doubleduck.SoundType.WEB_AUDIO = ["WEB_AUDIO",0];
co.doubleduck.SoundType.WEB_AUDIO.toString = $estr;
co.doubleduck.SoundType.WEB_AUDIO.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_FX = ["AUDIO_FX",1];
co.doubleduck.SoundType.AUDIO_FX.toString = $estr;
co.doubleduck.SoundType.AUDIO_FX.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP = ["AUDIO_NO_OVERLAP",2];
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.toString = $estr;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.HOWLER = ["HOWLER",3];
co.doubleduck.SoundType.HOWLER.toString = $estr;
co.doubleduck.SoundType.HOWLER.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.NONE = ["NONE",4];
co.doubleduck.SoundType.NONE.toString = $estr;
co.doubleduck.SoundType.NONE.__enum__ = co.doubleduck.SoundType;
if(!co.doubleduck.audio) co.doubleduck.audio = {}
co.doubleduck.audio.AudioAPI = $hxClasses["co.doubleduck.audio.AudioAPI"] = function() { }
co.doubleduck.audio.AudioAPI.__name__ = ["co","doubleduck","audio","AudioAPI"];
co.doubleduck.audio.AudioAPI.prototype = {
	setVolume: null
	,pause: null
	,stop: null
	,playMusic: null
	,playEffect: null
	,init: null
	,__class__: co.doubleduck.audio.AudioAPI
}
co.doubleduck.audio.WebAudioAPI = $hxClasses["co.doubleduck.audio.WebAudioAPI"] = function(src) {
	this._src = src;
	this.loadAudioFile(this._src);
};
co.doubleduck.audio.WebAudioAPI.__name__ = ["co","doubleduck","audio","WebAudioAPI"];
co.doubleduck.audio.WebAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.WebAudioAPI.context = null;
co.doubleduck.audio.WebAudioAPI.webAudioInit = function() {
	co.doubleduck.audio.WebAudioAPI.context = new webkitAudioContext();
}
co.doubleduck.audio.WebAudioAPI.saveBuffer = function(buffer,name) {
	co.doubleduck.audio.WebAudioAPI._buffers[name] = buffer;
}
co.doubleduck.audio.WebAudioAPI.decodeError = function() {
	null;
}
co.doubleduck.audio.WebAudioAPI.prototype = {
	setVolume: function(volume) {
		if(this._gainNode != null) this._gainNode.gain.value = volume;
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._source != null) this._source.noteOff(0);
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playBuffer: function(name,loop) {
		if(loop == null) loop = false;
		if(this._gainNode == null) {
			this._gainNode = co.doubleduck.audio.WebAudioAPI.context.createGainNode();
			this._gainNode.connect(co.doubleduck.audio.WebAudioAPI.context.destination);
		}
		this._buffer = Reflect.getProperty(co.doubleduck.audio.WebAudioAPI._buffers,this._src);
		if(this._buffer == null) return;
		this._source = co.doubleduck.audio.WebAudioAPI.context.createBufferSource();
		this._source.buffer = this._buffer;
		this._source.loop = loop;
		this._source.connect(this._gainNode);
		this._source.noteOn(0);
	}
	,loadAudioFile: function(src) {
		var request = new XMLHttpRequest();
		request.open("get",src,true);
		request.responseType = "arraybuffer";
		request.onload = function() { co.doubleduck.audio.WebAudioAPI.context.decodeAudioData(request.response, function(decodedBuffer) { buffer = decodedBuffer; co.doubleduck.audio.WebAudioAPI.saveBuffer(buffer,src); }, co.doubleduck.audio.WebAudioAPI.decodeError) }
		request.send();
	}
	,init: function() {
	}
	,_source: null
	,_gainNode: null
	,_buffer: null
	,_src: null
	,__class__: co.doubleduck.audio.WebAudioAPI
}
co.doubleduck.SoundManager = $hxClasses["co.doubleduck.SoundManager"] = function() {
};
co.doubleduck.SoundManager.__name__ = ["co","doubleduck","SoundManager"];
co.doubleduck.SoundManager.engineType = null;
co.doubleduck.SoundManager.EXTENSION = null;
co.doubleduck.SoundManager.getPersistedMute = function() {
	var mute = co.doubleduck.BasePersistence.getValue("mute");
	if(mute == "0") {
		mute = "false";
		co.doubleduck.SoundManager.setPersistedMute(false);
	}
	return mute == "true";
}
co.doubleduck.SoundManager.setPersistedMute = function(mute) {
	var val = "true";
	if(!mute) val = "false";
	co.doubleduck.BasePersistence.setValue("mute",val);
}
co.doubleduck.SoundManager.isSoundAvailable = function() {
	var isFirefox = /Firefox/.test(navigator.userAgent);
	var isChrome = /Chrome/.test(navigator.userAgent);
	var isMobile = /Mobile/.test(navigator.userAgent);
	var isAndroid = /Android/.test(navigator.userAgent);
	var isAndroid4 = /Android 4/.test(navigator.userAgent);
	var isSafari = /Safari/.test(navigator.userAgent);
	var agent = navigator.userAgent;
	var reg = new EReg("iPhone OS 6","");
	var isIOS6 = reg.match(agent) && isSafari && isMobile;
	var isIpad = /iPad/.test(navigator.userAgent);
	isIpad = isIpad && /OS 6/.test(navigator.userAgent);
	isIOS6 = isIOS6 || isIpad;
	if(isFirefox) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.AUDIO_FX;
		co.doubleduck.SoundManager.EXTENSION = ".ogg";
		return true;
	}
	if(isChrome && (!isAndroid && !isMobile)) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.WEB_AUDIO;
		co.doubleduck.audio.WebAudioAPI.webAudioInit();
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	}
	if(isIOS6) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.WEB_AUDIO;
		co.doubleduck.audio.WebAudioAPI.webAudioInit();
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	} else if(isAndroid4 && !isChrome) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.AUDIO_NO_OVERLAP;
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	}
	co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.NONE;
	co.doubleduck.BasePersistence.initVar("mute");
	return false;
}
co.doubleduck.SoundManager.mute = function(persisted) {
	if(persisted == null) persisted = true;
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = true;
	var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
	while(_g1 < _g) {
		var currSound = _g1++;
		var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
		if(mySound != null) mySound.setVolume(0);
	}
	if(persisted) co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.unmute = function(persisted) {
	if(persisted == null) persisted = true;
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = false;
	try {
		var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
		while(_g1 < _g) {
			var currSound = _g1++;
			var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
			if(mySound != null) mySound.setVolume(1);
		}
	} catch( e ) {
		null;
	}
	if(persisted) co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.toggleMute = function() {
	if(co.doubleduck.SoundManager._muted) co.doubleduck.SoundManager.unmute(); else co.doubleduck.SoundManager.mute();
}
co.doubleduck.SoundManager.isMuted = function() {
	co.doubleduck.SoundManager._muted = co.doubleduck.SoundManager.getPersistedMute();
	return co.doubleduck.SoundManager._muted;
}
co.doubleduck.SoundManager.getAudioInstance = function(src) {
	if(!co.doubleduck.SoundManager.available) return new co.doubleduck.audio.DummyAudioAPI();
	src += co.doubleduck.SoundManager.EXTENSION;
	var audio = Reflect.getProperty(co.doubleduck.SoundManager._cache,src);
	if(audio == null) {
		switch( (co.doubleduck.SoundManager.engineType)[1] ) {
		case 1:
			audio = new co.doubleduck.audio.AudioFX(src);
			break;
		case 0:
			audio = new co.doubleduck.audio.WebAudioAPI(src);
			break;
		case 2:
			audio = new co.doubleduck.audio.NonOverlappingAudio(src);
			break;
		case 3:
			audio = new co.doubleduck.audio.HowlerAudio(src);
			break;
		case 4:
			return new co.doubleduck.audio.DummyAudioAPI();
		}
		Reflect.setProperty(co.doubleduck.SoundManager._cache,src,audio);
	}
	return audio;
}
co.doubleduck.SoundManager.playEffect = function(src,volume,optional) {
	if(optional == null) optional = false;
	if(volume == null) volume = 1;
	if(optional && co.doubleduck.SoundManager.engineType == co.doubleduck.SoundType.AUDIO_NO_OVERLAP) return new co.doubleduck.audio.DummyAudioAPI();
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playEffect(playVolume);
	return audio;
}
co.doubleduck.SoundManager.playMusic = function(src,volume,loop) {
	if(loop == null) loop = true;
	if(volume == null) volume = 1;
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playMusic(playVolume,loop);
	return audio;
}
co.doubleduck.SoundManager.initSound = function(src) {
	co.doubleduck.SoundManager.getAudioInstance(src);
}
co.doubleduck.SoundManager.prototype = {
	__class__: co.doubleduck.SoundManager
}
co.doubleduck.Utils = $hxClasses["co.doubleduck.Utils"] = function() { }
co.doubleduck.Utils.__name__ = ["co","doubleduck","Utils"];
co.doubleduck.Utils.dateDeltaInDays = function(day1,day2) {
	var delta = Math.abs(day2.getTime() - day1.getTime());
	return delta / 86400000;
}
co.doubleduck.Utils.getTodayDate = function() {
	var newDate = new Date();
	return HxOverrides.dateStr(newDate);
}
co.doubleduck.Utils.getHour = function() {
	var newDate = new Date();
	return newDate.getHours();
}
co.doubleduck.Utils.rectOverlap = function(r1,r2) {
	var r1TopLeft = new createjs.Point(r1.x,r1.y);
	var r1BottomRight = new createjs.Point(r1.x + r1.width,r1.y + r1.height);
	var r1TopRight = new createjs.Point(r1.x + r1.width,r1.y);
	var r1BottomLeft = new createjs.Point(r1.x,r1.y + r1.height);
	var r2TopLeft = new createjs.Point(r2.x,r2.y);
	var r2BottomRight = new createjs.Point(r2.x + r2.width,r2.y + r2.height);
	var r2TopRight = new createjs.Point(r2.x + r2.width,r2.y);
	var r2BottomLeft = new createjs.Point(r2.x,r2.y + r2.height);
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1BottomLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2BottomLeft)) return true;
	return false;
}
co.doubleduck.Utils.overlap = function(obj1,obj1Width,obj1Height,obj2,obj2Width,obj2Height) {
	var o1TopLeft = new createjs.Point(obj1.x - obj1.regX * co.doubleduck.BaseGame.getScale(),obj1.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1BottomRight = new createjs.Point(o1TopLeft.x - obj1.regX * co.doubleduck.BaseGame.getScale() + obj1Width * co.doubleduck.BaseGame.getScale(),o1TopLeft.y + obj1Height * co.doubleduck.BaseGame.getScale() - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1TopRight = new createjs.Point(o1BottomRight.x - obj1.regX * co.doubleduck.BaseGame.getScale(),o1TopLeft.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1BottomLeft = new createjs.Point(o1TopLeft.x - obj1.regX * co.doubleduck.BaseGame.getScale(),o1BottomRight.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o2TopLeft = new createjs.Point(obj2.x - obj2.regX * co.doubleduck.BaseGame.getScale(),obj2.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2BottomRight = new createjs.Point(o2TopLeft.x + obj2Width * co.doubleduck.BaseGame.getScale() - obj2.regX * co.doubleduck.BaseGame.getScale(),o2TopLeft.y + obj2Height * co.doubleduck.BaseGame.getScale() - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2TopRight = new createjs.Point(o2BottomRight.x - obj2.regX * co.doubleduck.BaseGame.getScale(),o2TopLeft.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2BottomLeft = new createjs.Point(o2TopLeft.x - obj2.regX * co.doubleduck.BaseGame.getScale(),o2BottomRight.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1BottomLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2BottomLeft)) return true;
	return false;
}
co.doubleduck.Utils.rectContainPoint = function(rectTopLeft,rectBottomRight,point) {
	return point.x >= rectTopLeft.x && point.x <= rectBottomRight.x && point.y >= rectTopLeft.y && point.y <= rectBottomRight.y;
}
co.doubleduck.Utils.objectContains = function(dyn,memberName) {
	return Reflect.hasField(dyn,memberName);
}
co.doubleduck.Utils.contains = function(arr,obj) {
	var _g = 0;
	while(_g < arr.length) {
		var element = arr[_g];
		++_g;
		if(element == obj) return true;
	}
	return false;
}
co.doubleduck.Utils.isMobileFirefox = function() {
	var isFirefox = /Firefox/.test(navigator.userAgent);
	return isFirefox && viewporter.ACTIVE;
}
co.doubleduck.Utils.get = function(x,y,tiles,columns) {
	return tiles[columns * y + x];
}
co.doubleduck.Utils.getBitmapLabel = function(label,fontType,padding) {
	if(padding == null) padding = 0;
	if(fontType == null) fontType = "";
	var fontHelper = new co.doubleduck.FontHelper(fontType);
	var bitmapText = fontHelper.getNumber(Std.parseInt(label),1,true,null,padding);
	return bitmapText;
}
co.doubleduck.Utils.concatWithoutDuplicates = function(array,otherArray) {
	var _g = 0;
	while(_g < otherArray.length) {
		var element = otherArray[_g];
		++_g;
		co.doubleduck.Utils.addToArrayWithoutDuplicates(array,element);
	}
	return array;
}
co.doubleduck.Utils.addToArrayWithoutDuplicates = function(array,element) {
	var _g = 0;
	while(_g < array.length) {
		var currElement = array[_g];
		++_g;
		if(currElement == element) return array;
	}
	array.push(element);
	return array;
}
co.doubleduck.Utils.getImageData = function(image) {
	var ctx = co.doubleduck.Utils.getCanvasContext();
	var img = co.doubleduck.BaseAssets.getImage(image);
	ctx.drawImage(img.image,0,0);
	return ctx.getImageData(0,0,img.image.width,img.image.height);
}
co.doubleduck.Utils.getCanvasContext = function() {
	var dom = js.Lib.document.createElement("Canvas");
	var canvas = dom;
	return canvas.getContext("2d");
}
co.doubleduck.Utils.joinArrays = function(a1,a2) {
	var arr = a1.slice();
	var _g = 0;
	while(_g < a2.length) {
		var el = a2[_g];
		++_g;
		arr.push(el);
	}
	return arr;
}
co.doubleduck.Utils.getRandomElement = function(arr) {
	return arr[Std.random(arr.length)];
}
co.doubleduck.Utils.splitArray = function(arr,parts) {
	var arrs = new Array();
	var _g = 0;
	while(_g < parts) {
		var p = _g++;
		arrs.push(new Array());
	}
	var currArr = 0;
	while(arr.length > 0) {
		arrs[currArr].push(arr.pop());
		currArr++;
		currArr %= parts;
	}
	return arrs;
}
co.doubleduck.Utils.map = function(value,aMin,aMax,bMin,bMax) {
	if(bMax == null) bMax = 1;
	if(bMin == null) bMin = 0;
	if(value <= aMin) return bMin;
	if(value >= aMax) return bMax;
	return (value - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
co.doubleduck.Utils.waitAndCall = function(parent,delay,func,args) {
	createjs.Tween.get(parent).wait(delay).call(func,args);
}
co.doubleduck.Utils.tintBitmap = function(src,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	var colorFilter = new createjs.ColorFilter(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
	src.cache(src.x,src.y,src.image.width,src.image.height);
	src.filters = [colorFilter];
	src.updateCache();
}
co.doubleduck.Utils.containBitmaps = function(bitmapList,spacing,isRow,dims) {
	if(isRow == null) isRow = true;
	if(spacing == null) spacing = 0;
	var totalWidth = 0;
	var totalHeight = 0;
	var result = new createjs.Container();
	var _g1 = 0, _g = bitmapList.length;
	while(_g1 < _g) {
		var currBitmap = _g1++;
		var bmp = bitmapList[currBitmap];
		bmp.regY = bmp.image.height / 2;
		if(currBitmap != 0) {
			if(isRow) {
				bmp.x = bitmapList[currBitmap - 1].x + bitmapList[currBitmap - 1].image.width + spacing;
				if(bmp.image.height > totalHeight) totalHeight = bmp.image.height;
				totalWidth += bmp.image.width + spacing;
			} else {
				bmp.y = bitmapList[currBitmap - 1].y + bitmapList[currBitmap - 1].image.height + spacing;
				if(bmp.image.width > totalWidth) totalWidth = bmp.image.width;
				totalHeight += bmp.image.height + spacing;
			}
		} else {
			totalWidth = bmp.image.width;
			totalHeight = bmp.image.height;
		}
		result.addChild(bmp);
	}
	result.regX = totalWidth / 2;
	result.regY = totalHeight / 2;
	if(dims != null) {
		dims.width = totalWidth;
		dims.height = totalHeight;
	}
	return result;
}
co.doubleduck.Utils.getCenteredImage = function(name,scaleToGame) {
	if(scaleToGame == null) scaleToGame = false;
	var img = co.doubleduck.BaseAssets.getImage(name);
	img.regX = img.image.width / 2;
	img.regY = img.image.height / 2;
	if(scaleToGame) img.scaleX = img.scaleY = co.doubleduck.BaseGame.getScale();
	return img;
}
co.doubleduck.Utils.setCenterReg = function(bmp) {
	bmp.regX = bmp.image.width / 2;
	bmp.regY = bmp.image.height / 2;
}
co.doubleduck.Utils.shuffleArray = function(arr) {
	var tmp, j, i = arr.length;
	while(i > 0) {
		j = Math.random() * i | 0;
		tmp = arr[--i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
}
co.doubleduck.WaveHandler = $hxClasses["co.doubleduck.WaveHandler"] = function(level) {
	this._level = level;
	this._wavesData = co.doubleduck.DataLoader.getLevelById(this._level).content;
};
co.doubleduck.WaveHandler.__name__ = ["co","doubleduck","WaveHandler"];
co.doubleduck.WaveHandler.prototype = {
	attackTick: function() {
		if(this._attackTween == null) return;
		var deltaTime = (createjs.Ticker.getTime(false) | 0) - this._attackStartTime;
		var percentage = deltaTime / this._attackDuration;
		var easedPerc = this._attackEase(percentage);
		var currSpawnCount = Math.floor(easedPerc * this._attackEnemiesCount);
		if(currSpawnCount > this._prevSpawnCount) {
			var toSpawn = currSpawnCount - this._prevSpawnCount;
			while(toSpawn > 0) {
				var enemiesLeft = 0;
				var _g1 = 0, _g = this._attackEnemies.length;
				while(_g1 < _g) {
					var i = _g1++;
					enemiesLeft += this._attackEnemies[i].amount | 0;
				}
				var enemyRand = Std.random(enemiesLeft);
				var currEnemyIndex = 0;
				while(enemyRand >= 0) try {
					enemyRand -= this._attackEnemies[currEnemyIndex].amount | 0;
					currEnemyIndex++;
				} catch( err ) {
				}
				var enemyId = this._attackEnemies[currEnemyIndex - 1].id;
				this._attackEnemies[currEnemyIndex - 1].amount = (this._attackEnemies[currEnemyIndex - 1].amount | 0) - 1;
				if(this.onSpawnEnemy != null) this.onSpawnEnemy(enemyId);
				toSpawn--;
			}
			this._prevSpawnCount = currSpawnCount;
		}
		if(percentage >= 1) {
			this._attackTween.pause();
			this._attackTween = null;
			this.handleWaveStage();
		} else if(this._attackTween != null) {
			this._attackTween = new createjs.Tween();
			this._attackTween.wait(co.doubleduck.WaveHandler.TICK_INTERVAL).call($bind(this,this.attackTick));
		}
	}
	,startAttack: function(data) {
		if(data != null) {
			if(data.rate == "constant") this._attackEase = createjs.Ease.linear; else if(data.rate == "increasing") this._attackEase = createjs.Ease.circIn; else throw "DDuckError: Unsupported attack rate '" + Std.string(data.rate) + "' in level " + this._level;
			this._attackDuration = Std.parseInt(data.duration) * 1000;
			this._attackEnemies = new Array();
			var _g1 = 0, _g = data.enemies.length;
			while(_g1 < _g) {
				var i = _g1++;
				var curr = { };
				curr.id = co.doubleduck.Enemy.getTypeByName(data.enemies[i].id);
				curr.amount = data.enemies[i].amount | 0;
				this._attackEnemies.push(curr);
			}
			this._attackEnemiesCount = 0;
			var _g1 = 0, _g = this._attackEnemies.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._attackEnemiesCount += this._attackEnemies[i].amount | 0;
			}
			this._prevSpawnCount = 0;
			this._attackTween = new createjs.Tween();
			this._attackStartTime = createjs.Ticker.getTime(false) | 0;
			this.attackTick();
		} else {
		}
	}
	,stopWaves: function() {
		createjs.Tween.removeTweens(this);
		if(this._attackTween != null) {
			this._attackTween.pause();
			this._attackTween = null;
		}
		this.onWavesFinished = null;
		this.onSpawnEnemy = null;
		this.onShowWaveLabel = null;
	}
	,handleWaveStage: function() {
		if(this._currStage >= this._wavesData.length) {
			if(this.onWavesFinished != null) this.onWavesFinished();
			createjs.Tween.removeTweens(this);
			this.onSpawnEnemy = null;
			this.onWavesFinished = null;
			this.onShowWaveLabel = null;
			return;
		}
		var nextStageIn = -1;
		if(this._wavesData[this._currStage].type == "attack") this.startAttack(this._wavesData[this._currStage]); else if(this._wavesData[this._currStage].type == "wait") nextStageIn = Std.parseInt(this._wavesData[this._currStage].duration) * 1000; else if(this._wavesData[this._currStage].type == "waveNotice") {
			var waveNum = this._wavesData[this._currStage].number | 0;
			if(this.onShowWaveLabel != null) this.onShowWaveLabel(waveNum);
			nextStageIn = 250;
		} else throw "DDuckError: Unknown wave type - \"" + this._wavesData[this._currStage].type + "\"";
		this._currStage++;
		if(nextStageIn != -1) createjs.Tween.get(this).wait(nextStageIn).call($bind(this,this.handleWaveStage));
	}
	,startWaveTiming: function() {
		this._currStage = 0;
		this.handleWaveStage();
	}
	,_prevSpawnCount: null
	,_attackEnemiesCount: null
	,_attackDuration: null
	,_attackEnemies: null
	,_attackEase: null
	,_attackStartTime: null
	,_attackTween: null
	,_currStage: null
	,_wavesData: null
	,_level: null
	,onWavesFinished: null
	,onShowWaveLabel: null
	,onSpawnEnemy: null
	,__class__: co.doubleduck.WaveHandler
}
if(!co.doubleduck.allies) co.doubleduck.allies = {}
co.doubleduck.allies.BasicAlly = $hxClasses["co.doubleduck.allies.BasicAlly"] = function() {
	co.doubleduck.Ally.call(this,co.doubleduck.AllyType.BASIC);
	this._lastAttackTime = 0;
};
co.doubleduck.allies.BasicAlly.__name__ = ["co","doubleduck","allies","BasicAlly"];
co.doubleduck.allies.BasicAlly.__super__ = co.doubleduck.Ally;
co.doubleduck.allies.BasicAlly.prototype = $extend(co.doubleduck.Ally.prototype,{
	attack: function() {
		var now = createjs.Ticker.getTime(true);
		if(now - this._actionCooldown * 1000 > this._lastAttackTime) {
			var enemyToHit = null;
			var minRangeFound = co.doubleduck.BaseGame.getViewport().width;
			var _g1 = 0, _g = this._enemyGrid[this._myGridPos.y | 0].length;
			while(_g1 < _g) {
				var currEnemy = _g1++;
				var nme = this._enemyGrid[this._myGridPos.y | 0][currEnemy];
				if(js.Boot.__instanceof(nme,co.doubleduck.enemies.StealthEnemy)) {
					var stealthEnemy = nme;
					if(stealthEnemy.isCloacked()) continue;
				}
				var nmeFrontX = nme.x - nme.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
				var myFrontX = this.x + this.getWidth() * 0.1 * co.doubleduck.BaseGame.getScale();
				var range = nmeFrontX - myFrontX;
				var nmeInGrid = nme.x - nme.getWidth() * 0.25 * co.doubleduck.BaseGame.getScale() < this._gridRightEdge;
				if(range > 0 && range < minRangeFound && nmeInGrid) {
					minRangeFound = range;
					enemyToHit = nme;
				}
			}
			if(enemyToHit != null) {
				this.gotoAndStop(this._type[0] + "action");
				co.doubleduck.Utils.waitAndCall(null,250,$bind(this,this.idle));
				this._lastAttackTime = now;
				enemyToHit.takeHit(this._damage);
				co.doubleduck.SoundManager.playEffect("sound/Ally_shot_1");
			}
		}
	}
	,act: function() {
		co.doubleduck.Ally.prototype.act.call(this);
		this.attack();
	}
	,_lastAttackTime: null
	,__class__: co.doubleduck.allies.BasicAlly
});
co.doubleduck.allies.DoubleAlly = $hxClasses["co.doubleduck.allies.DoubleAlly"] = function() {
	co.doubleduck.Ally.call(this,co.doubleduck.AllyType.DOUBLE_WHAMMY);
	this._lastAttackTime = 0;
};
co.doubleduck.allies.DoubleAlly.__name__ = ["co","doubleduck","allies","DoubleAlly"];
co.doubleduck.allies.DoubleAlly.__super__ = co.doubleduck.Ally;
co.doubleduck.allies.DoubleAlly.prototype = $extend(co.doubleduck.Ally.prototype,{
	attack: function() {
		var now = createjs.Ticker.getTime(true);
		if(now - this._actionCooldown * 1000 > this._lastAttackTime) {
			var enemyToHit = null;
			var minRangeFound = co.doubleduck.BaseGame.getViewport().width;
			var _g1 = 0, _g = this._enemyGrid[this._myGridPos.y | 0].length;
			while(_g1 < _g) {
				var currEnemy = _g1++;
				var nme = this._enemyGrid[this._myGridPos.y | 0][currEnemy];
				if(js.Boot.__instanceof(nme,co.doubleduck.enemies.StealthEnemy)) {
					var stealthEnemy = nme;
					if(stealthEnemy.isCloacked()) continue;
				}
				var nmeFrontX = nme.x - nme.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
				var myFrontX = this.x + this.getWidth() * 0.1 * co.doubleduck.BaseGame.getScale();
				var range = nmeFrontX - myFrontX;
				var nmeInGrid = nme.x - nme.getWidth() * 0.25 * co.doubleduck.BaseGame.getScale() < this._gridRightEdge;
				if(range > 0 && range < minRangeFound && nmeInGrid) {
					minRangeFound = range;
					enemyToHit = nme;
				}
			}
			if(enemyToHit != null) {
				this.gotoAndStop(this._type[0] + "action");
				co.doubleduck.Utils.waitAndCall(null,250,$bind(this,this.idle));
				this._lastAttackTime = now;
				enemyToHit.takeHit(this._damage);
				co.doubleduck.SoundManager.playEffect("sound/Ally_shot_1");
			}
		}
	}
	,act: function() {
		co.doubleduck.Ally.prototype.act.call(this);
		this.attack();
	}
	,_lastAttackTime: null
	,__class__: co.doubleduck.allies.DoubleAlly
});
co.doubleduck.allies.LaserAlly = $hxClasses["co.doubleduck.allies.LaserAlly"] = function() {
	co.doubleduck.Ally.call(this,co.doubleduck.AllyType.LASER);
	this._lastAttackTime = 0;
};
co.doubleduck.allies.LaserAlly.__name__ = ["co","doubleduck","allies","LaserAlly"];
co.doubleduck.allies.LaserAlly.__super__ = co.doubleduck.Ally;
co.doubleduck.allies.LaserAlly.prototype = $extend(co.doubleduck.Ally.prototype,{
	attack: function() {
		var now = createjs.Ticker.getTime(true);
		if(now - this._actionCooldown * 1000 > this._lastAttackTime) {
			var enemiesToAttack = new Array();
			var _g1 = 0, _g = this._enemyGrid[this._myGridPos.y | 0].length;
			while(_g1 < _g) {
				var currEnemy = _g1++;
				var nme = null;
				try {
					nme = this._enemyGrid[this._myGridPos.y | 0][currEnemy];
					if(js.Boot.__instanceof(nme,co.doubleduck.enemies.StealthEnemy)) {
						var stealthEnemy = nme;
						if(stealthEnemy.isCloacked()) continue;
					}
					var nmeFrontX = nme.x - nme.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
					var myFrontX = this.x + this.getWidth() * 0.1 * co.doubleduck.BaseGame.getScale();
					var range = nmeFrontX - myFrontX;
					var nmeInGrid = nme.x - nme.getWidth() * 0.25 * co.doubleduck.BaseGame.getScale() < this._gridRightEdge;
					if(range > 0 && nmeInGrid) enemiesToAttack.push(nme);
				} catch( e ) {
					continue;
				}
			}
			if(enemiesToAttack.length > 0) {
				co.doubleduck.SoundManager.playEffect("sound/Ally_shot_1");
				this.gotoAndStop(this._type[0] + "action");
				if(this.onFireLaser != null) this.onFireLaser(new createjs.Point(this.x,this.y));
				co.doubleduck.Utils.waitAndCall(null,250,$bind(this,this.idle));
				this._lastAttackTime = now;
				var _g = 0;
				while(_g < enemiesToAttack.length) {
					var currEnemy = enemiesToAttack[_g];
					++_g;
					currEnemy.takeHit(this._damage);
				}
			}
		}
	}
	,act: function() {
		co.doubleduck.Ally.prototype.act.call(this);
		this.attack();
	}
	,_lastAttackTime: null
	,onFireLaser: null
	,__class__: co.doubleduck.allies.LaserAlly
});
co.doubleduck.allies.MineAlly = $hxClasses["co.doubleduck.allies.MineAlly"] = function() {
	co.doubleduck.Ally.call(this,co.doubleduck.AllyType.MINE);
	null;
};
co.doubleduck.allies.MineAlly.__name__ = ["co","doubleduck","allies","MineAlly"];
co.doubleduck.allies.MineAlly.__super__ = co.doubleduck.Ally;
co.doubleduck.allies.MineAlly.prototype = $extend(co.doubleduck.Ally.prototype,{
	detonate: function() {
		var minRow = (this._myGridPos.y | 0) - 1;
		if(minRow < 0) minRow = 0;
		var maxRow = (this._myGridPos.y | 0) + 1;
		if(maxRow > this._enemyGrid.length - 1) maxRow = this._enemyGrid.length - 1;
		var enemiesToDestroy = new Array();
		var _g1 = minRow, _g = maxRow + 1;
		while(_g1 < _g) {
			var currRow = _g1++;
			var _g3 = 0, _g2 = this._enemyGrid[currRow].length;
			while(_g3 < _g2) {
				var currEnemyIndex = _g3++;
				var currEnemy = this._enemyGrid[currRow][currEnemyIndex];
				var enemyPos = currEnemy.getGridPosition();
				var enemyInRange = enemyPos.x <= this._myGridPos.x + 1 && enemyPos.x >= this._myGridPos.x - 1;
				var enemyInBounds = enemyPos.x >= 0 && enemyPos.x < co.doubleduck.Session.COLS;
				if(enemyInBounds && enemyInRange) enemiesToDestroy.push(currEnemy);
			}
		}
		var _g = 0;
		while(_g < enemiesToDestroy.length) {
			var currEnemyToDestroy = enemiesToDestroy[_g];
			++_g;
			currEnemyToDestroy.takeHit(this._damage);
		}
		this.die();
	}
	,signalDetonation: function() {
		this.gotoAndStop(this._type[0] + "action");
		this.alpha = 0.5;
		createjs.Tween.get(this).to({ alpha : 1},500).call($bind(this,this.detonate));
	}
	,act: function() {
		var _g1 = 0, _g = this._enemyGrid[this._myGridPos.y | 0].length;
		while(_g1 < _g) {
			var currEnemyIndex = _g1++;
			var currEnemy = this._enemyGrid[this._myGridPos.y | 0][currEnemyIndex];
			var myFrontX = this.x + this.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
			var enemyFrontX = 0;
			try {
				enemyFrontX = currEnemy.x;
			} catch( e ) {
				continue;
			}
			var dx = enemyFrontX - myFrontX;
			if(dx < 5 && dx > -5) {
				this.disable();
				this.signalDetonation();
			}
		}
	}
	,__class__: co.doubleduck.allies.MineAlly
});
co.doubleduck.allies.ResourceAlly = $hxClasses["co.doubleduck.allies.ResourceAlly"] = function() {
	co.doubleduck.Ally.call(this,co.doubleduck.AllyType.RESOURCE);
	var data = co.doubleduck.DataLoader.getLevelById(co.doubleduck.Session.levelNumber);
	this._collectionAmount = data.resourceCollectAmount | 0;
	this._collectionInterval = data.resourceCollectInterval | 0;
	co.doubleduck.Utils.waitAndCall(this,this._collectionInterval * 1000 | 0,$bind(this,this.mine));
};
co.doubleduck.allies.ResourceAlly.__name__ = ["co","doubleduck","allies","ResourceAlly"];
co.doubleduck.allies.ResourceAlly.__super__ = co.doubleduck.Ally;
co.doubleduck.allies.ResourceAlly.prototype = $extend(co.doubleduck.Ally.prototype,{
	destroy: function() {
		co.doubleduck.Ally.prototype.destroy.call(this);
		createjs.Tween.removeTweens(this);
	}
	,mine: function() {
		var amount = this._allyData.minerals_collection | 0;
		if(this.onMineResources != null) {
			this.onMineResources(this._collectionAmount,new createjs.Point(this.x,this.y));
			co.doubleduck.Utils.waitAndCall(this,this._collectionInterval * 1000 | 0,$bind(this,this.mine));
			null;
		}
	}
	,_collectionInterval: null
	,_collectionAmount: null
	,onMineResources: null
	,__class__: co.doubleduck.allies.ResourceAlly
});
co.doubleduck.allies.ShieldAlly = $hxClasses["co.doubleduck.allies.ShieldAlly"] = function() {
	co.doubleduck.Ally.call(this,co.doubleduck.AllyType.SHIELD);
};
co.doubleduck.allies.ShieldAlly.__name__ = ["co","doubleduck","allies","ShieldAlly"];
co.doubleduck.allies.ShieldAlly.__super__ = co.doubleduck.Ally;
co.doubleduck.allies.ShieldAlly.prototype = $extend(co.doubleduck.Ally.prototype,{
	__class__: co.doubleduck.allies.ShieldAlly
});
co.doubleduck.audio.AudioFX = $hxClasses["co.doubleduck.audio.AudioFX"] = function(src) {
	this._jsAudio = null;
	this._src = src;
	this._loop = false;
	this._volume = 1;
};
co.doubleduck.audio.AudioFX.__name__ = ["co","doubleduck","audio","AudioFX"];
co.doubleduck.audio.AudioFX.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.AudioFX._currentlyPlaying = null;
co.doubleduck.audio.AudioFX.prototype = {
	setVolume: function(volume) {
		this._volume = volume;
		if(this._jsAudio != null) this._jsAudio.setVolume(volume);
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		this._jsAudio.stop();
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop,2);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,load: function(isLoop,pool) {
		if(pool == null) pool = 1;
		var pathNoExtension = this._src;
		this._jsAudio = AudioFX(pathNoExtension, { loop: isLoop, pool: pool });
	}
	,init: function() {
	}
	,_volume: null
	,_loop: null
	,_jsAudio: null
	,_src: null
	,__class__: co.doubleduck.audio.AudioFX
}
co.doubleduck.audio.DummyAudioAPI = $hxClasses["co.doubleduck.audio.DummyAudioAPI"] = function() {
};
co.doubleduck.audio.DummyAudioAPI.__name__ = ["co","doubleduck","audio","DummyAudioAPI"];
co.doubleduck.audio.DummyAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.DummyAudioAPI.prototype = {
	setVolume: function(volume) {
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
	}
	,init: function() {
	}
	,__class__: co.doubleduck.audio.DummyAudioAPI
}
co.doubleduck.audio.HowlerAudio = $hxClasses["co.doubleduck.audio.HowlerAudio"] = function(src) {
	this._jsAudio = null;
	this._src = src;
	this._loop = false;
	this._volume = 1;
};
co.doubleduck.audio.HowlerAudio.__name__ = ["co","doubleduck","audio","HowlerAudio"];
co.doubleduck.audio.HowlerAudio.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.HowlerAudio._currentlyPlaying = null;
co.doubleduck.audio.HowlerAudio.prototype = {
	setVolume: function(volume) {
		this._volume = volume;
		if(this._jsAudio != null) this._jsAudio.volume = volume;
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		this._jsAudio.stop();
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop,1);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,load: function(isLoop,pool) {
		if(pool == null) pool = 1;
		var pathNoExtension = this._src;
		var myUrls = new Array();
		myUrls.push(this._src + ".mp3");
		myUrls.push(this._src + ".ogg");
		this._jsAudio = new Howl({urls: myUrls, loop: false});
	}
	,init: function() {
	}
	,_volume: null
	,_loop: null
	,_jsAudio: null
	,_src: null
	,__class__: co.doubleduck.audio.HowlerAudio
}
co.doubleduck.audio.NonOverlappingAudio = $hxClasses["co.doubleduck.audio.NonOverlappingAudio"] = function(src) {
	this._src = src;
	this.load();
	this._isMusic = false;
};
co.doubleduck.audio.NonOverlappingAudio.__name__ = ["co","doubleduck","audio","NonOverlappingAudio"];
co.doubleduck.audio.NonOverlappingAudio.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = null;
co.doubleduck.audio.NonOverlappingAudio.prototype = {
	getSrc: function() {
		return this._src;
	}
	,audio: function() {
		return this._audio;
	}
	,setVolume: function(volume) {
		if(this._audio != null) this._audio.volume = volume;
	}
	,pause: function() {
		if(this._audio != null) this._audio.pause();
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._isMusic) co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
		if(this._audio != null) {
			this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
			this._audio.currentTime = 0;
			this._audio.pause();
		}
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._isMusic = true;
		co.doubleduck.audio.NonOverlappingAudio._musicPlaying = true;
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
	}
	,handleEnded: function() {
		this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
		this._audio.currentTime = 0;
	}
	,handleTimeUpdate: function() {
		if(this._audio.currentTime >= this._audio.duration - 0.3) this.stop();
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._musicPlaying) return;
		if(overrideOtherEffects && co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
		co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = this;
	}
	,handleError: function() {
	}
	,handleCanPlay: function() {
	}
	,load: function() {
		this._audio = new Audio();
		this._audio.src = this._src;
		this._audio.initialTime = 0;
		this._audio.addEventListener("canplaythrough",$bind(this,this.handleCanPlay));
		this._audio.addEventListener("onerror",$bind(this,this.handleError));
	}
	,init: function() {
	}
	,_isMusic: null
	,_audio: null
	,_src: null
	,__class__: co.doubleduck.audio.NonOverlappingAudio
}
if(!co.doubleduck.enemies) co.doubleduck.enemies = {}
co.doubleduck.enemies.MeleeEnemy = $hxClasses["co.doubleduck.enemies.MeleeEnemy"] = function(type) {
	co.doubleduck.Enemy.call(this,type);
};
co.doubleduck.enemies.MeleeEnemy.__name__ = ["co","doubleduck","enemies","MeleeEnemy"];
co.doubleduck.enemies.MeleeEnemy.__super__ = co.doubleduck.Enemy;
co.doubleduck.enemies.MeleeEnemy.prototype = $extend(co.doubleduck.Enemy.prototype,{
	act: function() {
		var _g1 = 0, _g = this._allyLine.children.length;
		while(_g1 < _g) {
			var currAllyIndex = _g1++;
			var currAlly = this._allyLine.getChildAt(currAllyIndex);
			if(js.Boot.__instanceof(currAlly,co.doubleduck.allies.MineAlly)) return;
			var myFrontX = this.x - this.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
			var allyFrontX = 0;
			try {
				allyFrontX = currAlly.x;
			} catch( e ) {
				continue;
			}
			var dx = myFrontX - allyFrontX;
			if(dx < -5 && dx > -10) {
				currAlly.takeHit(this._damage);
				this.disable();
				this.handleDeath();
			}
		}
	}
	,__class__: co.doubleduck.enemies.MeleeEnemy
});
co.doubleduck.enemies.BasicEnemy = $hxClasses["co.doubleduck.enemies.BasicEnemy"] = function() {
	co.doubleduck.enemies.MeleeEnemy.call(this,co.doubleduck.EnemyType.BASIC);
};
co.doubleduck.enemies.BasicEnemy.__name__ = ["co","doubleduck","enemies","BasicEnemy"];
co.doubleduck.enemies.BasicEnemy.__super__ = co.doubleduck.enemies.MeleeEnemy;
co.doubleduck.enemies.BasicEnemy.prototype = $extend(co.doubleduck.enemies.MeleeEnemy.prototype,{
	__class__: co.doubleduck.enemies.BasicEnemy
});
co.doubleduck.enemies.BombEnemy = $hxClasses["co.doubleduck.enemies.BombEnemy"] = function() {
	co.doubleduck.Enemy.call(this,co.doubleduck.EnemyType.BOMB);
};
co.doubleduck.enemies.BombEnemy.__name__ = ["co","doubleduck","enemies","BombEnemy"];
co.doubleduck.enemies.BombEnemy.__super__ = co.doubleduck.Enemy;
co.doubleduck.enemies.BombEnemy.prototype = $extend(co.doubleduck.Enemy.prototype,{
	detonate: function() {
		var minRow = (this.getGridPosition().y | 0) - 1;
		if(minRow < 0) minRow = 0;
		var maxRow = (this.getGridPosition().y | 0) + 1;
		if(maxRow >= co.doubleduck.Session.ROWS) maxRow = co.doubleduck.Session.ROWS - 1;
		var minCol = (this.getGridPosition().x | 0) - 1;
		if(minCol < 0) minCol = 0;
		var maxCol = (this.getGridPosition().x | 0) + 1;
		if(maxCol >= co.doubleduck.Session.COLS) maxCol = co.doubleduck.Session.COLS - 1;
		var _g1 = minRow, _g = maxRow + 1;
		while(_g1 < _g) {
			var currRow = _g1++;
			var _g3 = minCol, _g2 = maxCol + 1;
			while(_g3 < _g2) {
				var currCol = _g3++;
				var currAlly = this._allyGrid[currCol][currRow];
				if(currAlly == null) continue;
				currAlly.takeHit(this._damage);
				null;
			}
		}
		this.die();
	}
	,act: function() {
		var _g1 = 0, _g = this._allyLine.children.length;
		while(_g1 < _g) {
			var currAllyIndex = _g1++;
			var currAlly = this._allyLine.getChildAt(currAllyIndex);
			if(js.Boot.__instanceof(currAlly,co.doubleduck.allies.MineAlly)) return;
			var myFrontX = this.x - this.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
			var allyFrontX = 0;
			try {
				allyFrontX = currAlly.x;
			} catch( e ) {
				continue;
			}
			var dx = myFrontX - allyFrontX;
			if(dx < -5 && dx > -10) {
				this.disable();
				this.detonate();
			}
		}
	}
	,setAllyGrid: function(grid) {
		this._allyGrid = grid;
	}
	,_allyGrid: null
	,__class__: co.doubleduck.enemies.BombEnemy
});
co.doubleduck.enemies.FastEnemy = $hxClasses["co.doubleduck.enemies.FastEnemy"] = function() {
	co.doubleduck.enemies.MeleeEnemy.call(this,co.doubleduck.EnemyType.FAST);
};
co.doubleduck.enemies.FastEnemy.__name__ = ["co","doubleduck","enemies","FastEnemy"];
co.doubleduck.enemies.FastEnemy.__super__ = co.doubleduck.enemies.MeleeEnemy;
co.doubleduck.enemies.FastEnemy.prototype = $extend(co.doubleduck.enemies.MeleeEnemy.prototype,{
	__class__: co.doubleduck.enemies.FastEnemy
});
co.doubleduck.enemies.ShootingEnemy = $hxClasses["co.doubleduck.enemies.ShootingEnemy"] = function() {
	co.doubleduck.enemies.MeleeEnemy.call(this,co.doubleduck.EnemyType.SHOOTING);
	this._coolDown = this._enemyData.cooldown | 0;
	this._lastAttackTime = 0;
};
co.doubleduck.enemies.ShootingEnemy.__name__ = ["co","doubleduck","enemies","ShootingEnemy"];
co.doubleduck.enemies.ShootingEnemy.__super__ = co.doubleduck.enemies.MeleeEnemy;
co.doubleduck.enemies.ShootingEnemy.prototype = $extend(co.doubleduck.enemies.MeleeEnemy.prototype,{
	attack: function() {
		createjs.Tween.removeTweens(this);
		this.gotoAndStop(this._type[0] + "action");
		co.doubleduck.Utils.waitAndCall(this,250,$bind(this,this.idle));
		co.doubleduck.SoundManager.playEffect("sound/Enemy_shot");
	}
	,shootingAct: function() {
		var now = createjs.Ticker.getTime(true);
		if(now < this._coolDown * 1000 + this._lastAttackTime) return;
		var inGrid = this.x - this.getWidth() * 0.25 * co.doubleduck.BaseGame.getScale() < this._gridRightEdge;
		if(!inGrid) return;
		var minDelta = co.doubleduck.BaseGame.getViewport().width;
		var allyToAttack = null;
		var _g1 = 0, _g = this._allyLine.children.length;
		while(_g1 < _g) {
			var currAllyIndex = _g1++;
			var currAlly = this._allyLine.getChildAt(currAllyIndex);
			var myFrontX = this.x - this.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
			var allyFrontX = 0;
			try {
				allyFrontX = currAlly.x;
			} catch( e ) {
				continue;
			}
			var dx = myFrontX - allyFrontX;
			if(dx > 0 && dx < minDelta) {
				minDelta = dx;
				allyToAttack = currAlly;
			}
		}
		if(allyToAttack != null) {
			this.attack();
			this._lastAttackTime = now;
			allyToAttack.takeHit(this._damage);
		}
	}
	,act: function() {
		co.doubleduck.enemies.MeleeEnemy.prototype.act.call(this);
		if(!this._disabled) this.shootingAct();
	}
	,_lastAttackTime: null
	,_coolDown: null
	,__class__: co.doubleduck.enemies.ShootingEnemy
});
co.doubleduck.enemies.StealthEnemy = $hxClasses["co.doubleduck.enemies.StealthEnemy"] = function() {
	co.doubleduck.enemies.MeleeEnemy.call(this,co.doubleduck.EnemyType.STEALTH);
	this.gotoAndStop(this._type[0] + "action");
	this._cloacked = true;
	this._isUncloacking = false;
};
co.doubleduck.enemies.StealthEnemy.__name__ = ["co","doubleduck","enemies","StealthEnemy"];
co.doubleduck.enemies.StealthEnemy.__super__ = co.doubleduck.enemies.MeleeEnemy;
co.doubleduck.enemies.StealthEnemy.prototype = $extend(co.doubleduck.enemies.MeleeEnemy.prototype,{
	isCloacked: function() {
		return this._cloacked;
	}
	,takeHit: function(damage) {
		co.doubleduck.enemies.MeleeEnemy.prototype.takeHit.call(this,damage);
	}
	,setUnCloacked: function() {
		this._cloacked = false;
		this._isUncloacking = false;
	}
	,showSelf: function() {
		this.idle();
		this.alpha = 0;
		createjs.Tween.get(this).to({ alpha : 1},500,createjs.Ease.bounceInOut).call($bind(this,this.setUnCloacked));
	}
	,act: function() {
		var _g1 = 0, _g = this._allyLine.children.length;
		while(_g1 < _g) {
			var currAllyIndex = _g1++;
			var currAlly = this._allyLine.getChildAt(currAllyIndex);
			var myFrontX = this.x - this.getWidth() / 2 * co.doubleduck.BaseGame.getScale();
			var allyFrontX = 0;
			try {
				allyFrontX = currAlly.x;
			} catch( e ) {
				continue;
			}
			var dx = myFrontX - allyFrontX;
			if(this._cloacked && !this._isUncloacking) {
				var cellWidth = this._grid.image.width * co.doubleduck.BaseGame.getScale() / co.doubleduck.Session.COLS;
				if(dx > 0 && dx < cellWidth * co.doubleduck.enemies.StealthEnemy.UNCLOACK_CELLS_DELTA) {
					this.uncloack();
					return;
				}
			}
			if(js.Boot.__instanceof(currAlly,co.doubleduck.allies.MineAlly)) return;
			if(dx < -5 && dx > -10) {
				currAlly.takeHit(this._damage);
				this.disable();
				this.handleDeath();
			}
		}
	}
	,uncloack: function() {
		this._isUncloacking = true;
		createjs.Tween.get(this).to({ alpha : 0.2},300).call($bind(this,this.showSelf));
	}
	,_isUncloacking: null
	,_cloacked: null
	,__class__: co.doubleduck.enemies.StealthEnemy
});
co.doubleduck.enemies.StrongEnemy = $hxClasses["co.doubleduck.enemies.StrongEnemy"] = function() {
	co.doubleduck.enemies.MeleeEnemy.call(this,co.doubleduck.EnemyType.STRONG);
};
co.doubleduck.enemies.StrongEnemy.__name__ = ["co","doubleduck","enemies","StrongEnemy"];
co.doubleduck.enemies.StrongEnemy.__super__ = co.doubleduck.enemies.MeleeEnemy;
co.doubleduck.enemies.StrongEnemy.prototype = $extend(co.doubleduck.enemies.MeleeEnemy.prototype,{
	__class__: co.doubleduck.enemies.StrongEnemy
});
var haxe = haxe || {}
haxe.Http = $hxClasses["haxe.Http"] = function(url) {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
};
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype = {
	onStatus: function(status) {
	}
	,onError: function(msg) {
	}
	,onData: function(data) {
	}
	,request: function(post) {
		var me = this;
		var r = new js.XMLHttpRequest();
		var onreadystatechange = function() {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
			case null: case undefined:
				me.onError("Failed to connect or resolve host");
				break;
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange();
	}
	,setPostData: function(data) {
		this.postData = data;
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
	}
	,setHeader: function(header,value) {
		this.headers.set(header,value);
	}
	,params: null
	,headers: null
	,postData: null
	,async: null
	,url: null
	,__class__: haxe.Http
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Public = $hxClasses["haxe.Public"] = function() { }
haxe.Public.__name__ = ["haxe","Public"];
haxe.Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	serializeException: function(e) {
		this.buf.b += Std.string("x");
		this.serialize(e);
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.b += Std.string("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.b += Std.string("z");
				return;
			}
			this.buf.b += Std.string("i");
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += Std.string("k"); else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += Std.string("d");
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += Std.string("a");
				var l = v.length;
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += Std.string("n"); else {
								this.buf.b += Std.string("u");
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += Std.string("n"); else {
						this.buf.b += Std.string("u");
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += Std.string("h");
				break;
			case List:
				this.buf.b += Std.string("l");
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += Std.string("h");
				break;
			case Date:
				var d = v;
				this.buf.b += Std.string("v");
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case Hash:
				this.buf.b += Std.string("b");
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case IntHash:
				this.buf.b += Std.string("q");
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += Std.string(":");
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += Std.string("s");
				this.buf.b += Std.string(chars.length);
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += Std.string("C");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += Std.string("g");
				} else {
					this.buf.b += Std.string("c");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += Std.string("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += Std.string(":");
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += Std.string("g");
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += Std.string("r");
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += Std.string("R");
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += Std.string("y");
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += Std.string(":");
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,useEnumIndex: null
	,useCache: null
	,scount: null
	,shash: null
	,cache: null
	,buf: null
	,__class__: haxe.Serializer
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.Stack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += Std.string("\nCalled from ");
		haxe.Stack.itemToString(b,s);
	}
	return b.b;
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += Std.string("a C function");
		break;
	case 1:
		var m = $e[2];
		b.b += Std.string("module ");
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b += Std.string(" (");
		}
		b.b += Std.string(file);
		b.b += Std.string(" line ");
		b.b += Std.string(line);
		if(s1 != null) b.b += Std.string(")");
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += Std.string(".");
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += Std.string("local function #");
		b.b += Std.string(n);
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
haxe.Unserializer = $hxClasses["haxe.Unserializer"] = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,getResolver: function() {
		return this.resolver;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,resolver: null
	,scache: null
	,cache: null
	,length: null
	,pos: null
	,buf: null
	,__class__: haxe.Unserializer
}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.charCodeAt(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	getData: function() {
		return this.b;
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,b: null
	,length: null
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.AsyncConnection = $hxClasses["haxe.remoting.AsyncConnection"] = function() { }
haxe.remoting.AsyncConnection.__name__ = ["haxe","remoting","AsyncConnection"];
haxe.remoting.AsyncConnection.prototype = {
	setErrorHandler: null
	,call: null
	,resolve: null
	,__class__: haxe.remoting.AsyncConnection
}
haxe.remoting.FlashJsConnection = $hxClasses["haxe.remoting.FlashJsConnection"] = function() { }
haxe.remoting.FlashJsConnection.__name__ = ["haxe","remoting","FlashJsConnection"];
haxe.remoting.FlashJsConnection.flashCall = function(flashObj,name,path,params) {
	try {
		var fobj = window.document[flashObj];
		if(fobj == null) fobj = window.document.getElementById[flashObj];
		if(fobj == null) throw "Could not find flash object '" + flashObj + "'";
		var data = null;
		try {
			data = fobj.flashJsRemotingCall(name,path,params);
		} catch( e ) {
		}
		if(data == null) throw "Flash object " + flashObj + " does not have an active FlashJsConnection";
		return data;
	} catch( e ) {
		var s = new haxe.Serializer();
		s.serializeException(e);
		return s.toString();
	}
}
haxe.remoting.HttpAsyncConnection = $hxClasses["haxe.remoting.HttpAsyncConnection"] = function(data,path) {
	this.__data = data;
	this.__path = path;
};
haxe.remoting.HttpAsyncConnection.__name__ = ["haxe","remoting","HttpAsyncConnection"];
haxe.remoting.HttpAsyncConnection.__interfaces__ = [haxe.remoting.AsyncConnection];
haxe.remoting.HttpAsyncConnection.urlConnect = function(url) {
	return new haxe.remoting.HttpAsyncConnection({ url : url, error : function(e) {
		throw e;
	}},[]);
}
haxe.remoting.HttpAsyncConnection.prototype = {
	call: function(params,onResult) {
		var h = new haxe.Http(this.__data.url);
		var s = new haxe.Serializer();
		s.serialize(this.__path);
		s.serialize(params);
		h.setHeader("X-Haxe-Remoting","1");
		h.setParameter("__x",s.toString());
		var error = this.__data.error;
		h.onData = function(response) {
			var ok = true;
			var ret;
			try {
				if(HxOverrides.substr(response,0,3) != "hxr") throw "Invalid response : '" + response + "'";
				var s1 = new haxe.Unserializer(HxOverrides.substr(response,3,null));
				ret = s1.unserialize();
			} catch( err ) {
				ret = null;
				ok = false;
				error(err);
			}
			if(ok && onResult != null) onResult(ret);
		};
		h.onError = error;
		h.request(true);
	}
	,setErrorHandler: function(h) {
		this.__data.error = h;
	}
	,resolve: function(name) {
		var c = new haxe.remoting.HttpAsyncConnection(this.__data,this.__path.slice());
		c.__path.push(name);
		return c;
	}
	,__path: null
	,__data: null
	,__class__: haxe.remoting.HttpAsyncConnection
}
if(!haxe.unit) haxe.unit = {}
haxe.unit.TestCase = $hxClasses["haxe.unit.TestCase"] = function() {
};
haxe.unit.TestCase.__name__ = ["haxe","unit","TestCase"];
haxe.unit.TestCase.__interfaces__ = [haxe.Public];
haxe.unit.TestCase.prototype = {
	assertEquals: function(expected,actual,c) {
		this.currentTest.done = true;
		if(actual != expected) {
			this.currentTest.success = false;
			this.currentTest.error = "expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "'";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertFalse: function(b,c) {
		this.currentTest.done = true;
		if(b == true) {
			this.currentTest.success = false;
			this.currentTest.error = "expected false but was true";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertTrue: function(b,c) {
		this.currentTest.done = true;
		if(b == false) {
			this.currentTest.success = false;
			this.currentTest.error = "expected true but was false";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,print: function(v) {
		haxe.unit.TestRunner.print(v);
	}
	,tearDown: function() {
	}
	,setup: function() {
	}
	,currentTest: null
	,__class__: haxe.unit.TestCase
}
haxe.unit.TestResult = $hxClasses["haxe.unit.TestResult"] = function() {
	this.m_tests = new List();
	this.success = true;
};
haxe.unit.TestResult.__name__ = ["haxe","unit","TestResult"];
haxe.unit.TestResult.prototype = {
	toString: function() {
		var buf = new StringBuf();
		var failures = 0;
		var $it0 = this.m_tests.iterator();
		while( $it0.hasNext() ) {
			var test = $it0.next();
			if(test.success == false) {
				buf.b += Std.string("* ");
				buf.b += Std.string(test.classname);
				buf.b += Std.string("::");
				buf.b += Std.string(test.method);
				buf.b += Std.string("()");
				buf.b += Std.string("\n");
				buf.b += Std.string("ERR: ");
				if(test.posInfos != null) {
					buf.b += Std.string(test.posInfos.fileName);
					buf.b += Std.string(":");
					buf.b += Std.string(test.posInfos.lineNumber);
					buf.b += Std.string("(");
					buf.b += Std.string(test.posInfos.className);
					buf.b += Std.string(".");
					buf.b += Std.string(test.posInfos.methodName);
					buf.b += Std.string(") - ");
				}
				buf.b += Std.string(test.error);
				buf.b += Std.string("\n");
				if(test.backtrace != null) {
					buf.b += Std.string(test.backtrace);
					buf.b += Std.string("\n");
				}
				buf.b += Std.string("\n");
				failures++;
			}
		}
		buf.b += Std.string("\n");
		if(failures == 0) buf.b += Std.string("OK "); else buf.b += Std.string("FAILED ");
		buf.b += Std.string(this.m_tests.length);
		buf.b += Std.string(" tests, ");
		buf.b += Std.string(failures);
		buf.b += Std.string(" failed, ");
		buf.b += Std.string(this.m_tests.length - failures);
		buf.b += Std.string(" success");
		buf.b += Std.string("\n");
		return buf.b;
	}
	,add: function(t) {
		this.m_tests.add(t);
		if(!t.success) this.success = false;
	}
	,success: null
	,m_tests: null
	,__class__: haxe.unit.TestResult
}
haxe.unit.TestRunner = $hxClasses["haxe.unit.TestRunner"] = function() {
	this.result = new haxe.unit.TestResult();
	this.cases = new List();
};
haxe.unit.TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe.unit.TestRunner.print = function(v) {
	var msg = StringTools.htmlEscape(js.Boot.__string_rec(v,"")).split("\n").join("<br/>");
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("haxe:trace element not found"); else d.innerHTML += msg;
}
haxe.unit.TestRunner.customTrace = function(v,p) {
	haxe.unit.TestRunner.print(p.fileName + ":" + p.lineNumber + ": " + Std.string(v) + "\n");
}
haxe.unit.TestRunner.prototype = {
	runCase: function(t) {
		var old = haxe.Log.trace;
		haxe.Log.trace = haxe.unit.TestRunner.customTrace;
		var cl = Type.getClass(t);
		var fields = Type.getInstanceFields(cl);
		haxe.unit.TestRunner.print("Class: " + Type.getClassName(cl) + " ");
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe.unit.TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					field.apply(t,new Array());
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe.unit.TestRunner.print(".");
					} else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe.unit.TestRunner.print("W");
					}
				} catch( $e0 ) {
					if( js.Boot.__instanceof($e0,haxe.unit.TestStatus) ) {
						var e = $e0;
						haxe.unit.TestRunner.print("F");
						t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					} else {
					var e = $e0;
					haxe.unit.TestRunner.print("E");
					if(e.message != null) t.currentTest.error = "exception thrown : " + Std.string(e) + " [" + Std.string(e.message) + "]"; else t.currentTest.error = "exception thrown : " + Std.string(e);
					t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
		haxe.unit.TestRunner.print("\n");
		haxe.Log.trace = old;
	}
	,run: function() {
		this.result = new haxe.unit.TestResult();
		var $it0 = this.cases.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.runCase(c);
		}
		haxe.unit.TestRunner.print(this.result.toString());
		return this.result.success;
	}
	,add: function(c) {
		this.cases.add(c);
	}
	,cases: null
	,result: null
	,__class__: haxe.unit.TestRunner
}
haxe.unit.TestStatus = $hxClasses["haxe.unit.TestStatus"] = function() {
	this.done = false;
	this.success = false;
};
haxe.unit.TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe.unit.TestStatus.prototype = {
	backtrace: null
	,posInfos: null
	,classname: null
	,method: null
	,error: null
	,success: null
	,done: null
	,__class__: haxe.unit.TestStatus
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
js.XMLHttpRequest = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
co.doubleduck.Ally._allySpritesheet = null;
co.doubleduck.AllyIcon.ICON_SIZE = 75;
co.doubleduck.AllyIcon._spriteSheet = null;
co.doubleduck.BaseAssets.onLoadAll = null;
co.doubleduck.BaseAssets._loader = null;
co.doubleduck.BaseAssets._cacheData = { };
co.doubleduck.BaseAssets._loadCallbacks = { };
co.doubleduck.BaseAssets.loaded = 0;
co.doubleduck.BaseAssets._useLocalStorage = false;
co.doubleduck.BaseGame._viewport = null;
co.doubleduck.BaseGame._scale = 1;
co.doubleduck.BaseGame.DEBUG = false;
co.doubleduck.BaseGame.LOGO_URI = "images/duckling/splash_logo.png";
co.doubleduck.BaseGame.LOAD_STROKE_URI = "images/duckling/loading_stroke.png";
co.doubleduck.BaseGame.LOAD_FILL_URI = "images/duckling/loading_fill.png";
co.doubleduck.BaseGame.ORIENT_PORT_URI = "images/duckling/orientation_error_port.png";
co.doubleduck.BaseGame.ORIENT_LAND_URI = "images/duckling/orientation_error_land.png";
co.doubleduck.BasePersistence.GAME_PREFIX = "DUCK";
co.doubleduck.BasePersistence.available = co.doubleduck.BasePersistence.localStorageSupported();
co.doubleduck.Button.CLICK_TYPE_NONE = 0;
co.doubleduck.Button.CLICK_TYPE_TINT = 1;
co.doubleduck.Button.CLICK_TYPE_JUICY = 2;
co.doubleduck.Button.CLICK_TYPE_SCALE = 3;
co.doubleduck.Button.CLICK_TYPE_TOGGLE = 4;
co.doubleduck.Button.CLICK_TYPE_HOLD = 5;
co.doubleduck.Button._defaultSound = null;
co.doubleduck.DataLoader.LEVELS_PER_WORLD = 10;
co.doubleduck.Enemy._enemySpritesheet = null;
co.doubleduck.Menu._iconSpritesheet = null;
co.doubleduck.Session.CELL_SIZE = 69.2;
co.doubleduck.Session.ROWS = 5;
co.doubleduck.Session.COLS = 7;
co.doubleduck.Session.levelNumber = 1;
co.doubleduck.Session._explosionSpritesheet = null;
co.doubleduck.audio.WebAudioAPI._buffers = { };
co.doubleduck.SoundManager._muted = false;
co.doubleduck.SoundManager._cache = { };
co.doubleduck.SoundManager.available = co.doubleduck.SoundManager.isSoundAvailable();
co.doubleduck.WaveHandler.TICK_INTERVAL = 100;
co.doubleduck.allies.MineAlly.DETONATION_DELAY = 500;
co.doubleduck.audio.AudioFX._muted = false;
co.doubleduck.audio.HowlerAudio._muted = false;
co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
co.doubleduck.enemies.StealthEnemy.UNCLOACK_CELLS_DELTA = 2;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
js.Lib.onerror = null;
co.doubleduck.Main.main();
