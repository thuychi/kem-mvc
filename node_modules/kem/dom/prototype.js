/**
 *	Array Prototype
 */

function FindStringParser(condition) {
	var where = condition.split(/(and|or)/g).map(function (i) {
		switch (i) {
			case 'and':
				return '&&';
			case 'or':
				return '||';
			default:
				return '$.' + i.replace('=', '==');
		}
	});
	return where.join(' ');
};

Object.defineProperties(Array.prototype, {
	__concat: {
		value: function () {
			this.__isconcat = 1;
			return this;
		}
	},
	__set: {
		value: function (index, value) {
			this.__index = index;
			this.__value = value;
			return this;
		}
	},
	__findOne: {
		value: function (condition) {
			if ('object' === typeof condition) {
				// {id: 1}
				for (var i = 0, n = this.length; i < n; i++) {
					var wrong = 0;
					for (var key in condition) {
						if (condition[key] !== this[i][key]) {
							wrong = 1;
							break;
						}
					};
					if (!wrong) return this.__set(i, this[i]);
				}
			} else {
				for (var i = 0, n = this.length; i < n; i++) {
					if (condition === this[i]) return this.__set(i, this[i]);
				}
			};
			return this.__set(-1);
		}
	},
	index: {
		value: function index(condition) {
			if (condition) this.__findOne(condition);
			return this.__index;
		}
	},
	has: {
		value: function has(condition) {
			return !(this.__findOne(condition).__index < 0);
		}
	},
	get: {
		value: function get(condition) {
			if (condition) this.__findOne(condition);
			return this.__value;
		}
	},
	find: {
		value: function find(condition, limit) {
			var limit = limit || this.length,
			    array = [],
			    i = 0,
			    n = this.length,
			    ok = 0,
			    wrong;

			switch (typeof condition) {
				case 'string':
					/**
				      * where: 	id = 1 and name = 'Thuan'
				      */

					var where = FindStringParser(condition);
					for (; i < n; i++) {
						if (limit === ok) break;
						if (function ($) {
							return eval(where);
						}(this[i])) {
							array.push(this[i]);
							++ok;
						};
					}
				case 'object':
					for (; i < n; i++) {
						if (limit === ok) break;
						wrong = 0;

						for (var key in condition) {

							if (condition[key] !== this[i][key]) {
								wrong = 1;
								break;
							}
						}

						if (!wrong) {
							array.push(this[i]);
							++ok;
						}
					};
					break;
			}

			return array;
		}
	},
	remove: {
		value: function remove(condition) {
			if (this.has(condition)) this.splice(this.__index, 1);
		}
	},
	removeAll: {
		value: function removeAll(condition) {
			var wrong,
			    i = 0,
			    n = this.length;
			if ('object' === typeof condition) {
				for (; i < n; i++) {
					wrong = 0;

					for (var key in condition) {

						if (condition[key] !== this[i][key]) {
							wrong = 1;
							break;
						}
					}

					if (!wrong) this.splice(i, 1);
				}
			} else {
				for (; i < n; i++) {
					if (condition === this[i]) this.splice(i, 1);
				}
			}
		}
	},
	json: {
		value: function toJson() {
			return JSON.stringify(this);
		}
	},
	unique: {
		value: function unique() {
			this.sort();
			for (var i = 0, n = this.length; i < n; i++) {
				if (this[i] === this[i + 1]) this.splice(i, 1);
			}
		}
	}
});
/**
 *	DOM Element Prototype
 */
Element.prototype._event = {};

Object.defineProperties(Element.prototype, {
	set: {
		value: function set(key, value) {
			this[key] = value;
		}
	},
	get: {
		value: function get(key) {
			return this[key];
		}
	},
	find: {
		value: function find(selector) {
			switch (typeof selector) {
				case 'string':
					return this.querySelector(selector);
				case 'number':
					return this.children[selector];
			}
		}
	},
	findAll: {
		value: function findAll(selector) {
			return this.querySelectorAll(selector);
		}
	},
	parent: {
		value: function parent(selector) {
			return selector ? this.closest(selector) : this.parentElement;
		}
	},
	last: {
		value: function last() {
			return this.lastElementChild;
		}
	},
	first: {
		value: function first() {
			return this.children[0];
		}
	},
	next: {
		value: function next(virual) {
			return virual ? this.nextSibling : this.nextElementSibling;
		}
	},
	prev: {
		value: function prev(virual) {
			return virual ? this.previousSibling : this.previousElementSibling;
		}
	},
	html: {
		value: function html(html) {
			if (undefined === html) return this.innerHTML;

			if ('object' === typeof html) {
				this.innerHTML = '';
				this.append(html);
			} else {
				this.innerHTML = html;
			};
			return this;
		}
	},
	text: {
		value: function text(text) {
			if (undefined === text) return this.innerText;

			this.innerText = text;
			return this;
		}
	},
	val: {
		value: function value(value) {
			if (undefined === value) return this.value;

			this.value = value;
			return this;
		}
	},
	css: {
		value: function css(name, value) {
			if (undefined === value) {
				switch (typeof name) {
					case 'string':
						return this.style[name];
					case 'object':
						Object.assign(this.style, name);break;
				}
			} else {
				this.style[name] = value;
			};
			return this;
		}
	},
	attr: {
		value: function attr(name, value) {
			if (undefined === value) {
				switch (typeof name) {
					case 'string':
						return this.getAttribute(name);
					case 'object':
						Object.assign(this, name);break;
				}
			} else {
				this.setAttribute(name, value);
			};
			return this;
		}
	},
	removeAttr: {
		value: function removeAttr(name) {
			this.removeAttribute(name);
			return this;
		}
	},
	hasClass: {
		value: function hasClass(name) {
			return this.classList.contains(name);
		}
	},
	addClass: {
		value: function addClass(name) {
			this.classList.add(name);
			return this;
		}
	},
	removeClass: {
		value: function removeClass(name) {
			this.classList.remove(name);
			return this;
		}
	},
	changeClass: {
		value: function changeClass(oldClass, newClass) {
			this.classList.remove(oldClass);
			this.classList.add(newClass);
			return this;
		}
	},
	append: {
		value: function append(node) {
			this.appendChild('object' === typeof node ? node : document.createTextNode(node));
			return this;
		}
	},
	prepend: {
		value: function prepend(node) {
			this.insertBefore('object' === typeof node ? node : document.createTextNode(node), this.children[0]);
		}
	},
	replace: {
		value: function replace(oldNode, newNode) {
			if (newNode) this.replaceChild(newNode, oldNode);else oldNode.parentElement.replaceChild(this, oldNode);
		}
	},
	before: {
		value: function before(currentNode) {
			if ('string' === typeof currentNode) currentNode = document.querySelector(currentNode);
			if (currentNode) currentNode.parentElement.insertBefore(this, currentNode);
		}
	},
	after: {
		value: function after(currentNode) {
			if ('string' === typeof currentNode) currentNode = document.querySelector(currentNode);
			if (currentNode) currentNode.parentElement.insertBefore(this, currentNode.nextSibling);
		}
	},
	hide: {
		value: function hide() {
			this.style.display = 'none';
			return this;
		}
	},
	show: {
		value: function show() {
			this.style.display = 'block';
			return this;
		}
	},
	toggle: {
		value: function toggle() {
			this.hidden = !this.hidden;
			return this;
		}
	},
	clone: {
		value: function clone() {
			return this.cloneNode(true);
		}
	},
	on: {
		value: function on(name, fn) {
			this._event[name] ? this._event[name].push(fn) : this._event[name] = [];
		}
	},
	emit: {
		value: function emit(name, ...value) {
			var list = this._event[name] || [],
			    fn = function (i) {
				list[i].apply([], value);
			};

			for (var i = 0, n = list.length; i < n; i++) {
				setTimeout(fn.call(null, i), 0);
			}
		}
	},
	setState: {
		value: function setState(list) {
			for (let i in list) {
				this.emit(i, list[i]);
			}
		}
	},
	index: {
		value: function index(where) {
			if (where) return Array.prototype.index.call(this.parentElement, where);

			var children = this.children,
			    i = 0,
			    n = children.length;
			for (; i < n; i++) {
				if (this === children[i]) return i;
			};
			return -1;
		}
	}
});

/**
 *	Query Function
 */

(function(global){

	function $(dom) {
		return document.querySelector(dom);
	}

	function ajax_post(method, url, data, fn){
		var x = new XMLHttpRequest();

		x.open(method, url, true);
		x.setRequestHeader('Content-Type', 'application/json');

		if (fn) {
			x.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) fn(JSON.parse(this.responseText));
			};
		};

		x.send(JSON.stringify(data));
	}

	$.post = function (url, data, fn) {
		ajax_post('POST', url, data, fn)
	}

	$.put = function (url, data, fn) {
		ajax_post('PUT', url, data, fn)
	}

	$.delete = function (url, data, fn) {
		ajax_post('DELETE', url, data, fn)
	}

	$.get = function (url, data, fn) {
		var x = new XMLHttpRequest(),
		    query = [];

		for (var i in data) {
			query.push(i + '=' + data[i]);
		}
		x.open('GET', url + '?' + query.join('&'), true);

		if (fn) {
			x.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) fn(JSON.parse(this.responseText));
			}
		};

		x.send();
	}

	var $contentType = {
		get: 'text/html',
		post: 'application/json',
		put: 'application/json',
		delete: 'application/json'
	};
	var $responseType = {
		get: 'text',
		post: 'object',
		put: 'object',
		delete: 'object'
	};

	/**
	 *	option: {method, url, data, content_type, response_type}
	 */
	$.ajax = function(option){
		var x = new XMLHttpRequest();
		var method = option.method || 'get';
		var data = option.data || {}, array = [];
		var response_type = option.response_type || $responseType[method];
		var content_type = option.content_type || $contentType[method];

		for(var i in data){
			array.push(i + '=' + data[i])
		}

		x.open(method.toLocaleUpperCase(), option.url + '?' + array.join('&'), true);
		x.setRequestHeader('Content-Type', content_type);

		if(option.success){
			x.onreadystatechange = function(){
				if (this.readyState === 4 && this.status === 200){
					switch(response_type){
						case 'text':
							return option.success(this.responseText);
						case 'object':
							return option.success(JSON.parse(this.responseText));
					}
				}
			}
		}
	}

	/**
	 *	option: {data, file, success, progress}
	 */
	$.upload = function(option){
		var x = new XMLHttpRequest();
		var data = option.data || {}, array = [];

		for(var i in data){
			array.push(i + '=' + data[i])
		}

		var querystring = array.length ? ('?' + array.join('&')) : '';

		x.open('POST', option.url + querystring, true);
		x.setRequestHeader('Content-Type', option.file.type);

		if(option.success){
			x.onreadystatechange = function(){
				if (this.readyState === 4 && this.status === 200){
					option.success(this.responseText)
				}
			}
		}

		if(option.progress){
			x.upload.onprogress = function(e){
				option.progress(e.loaded / e.total)
			}
		}
	}

	/**
	 *	Create StyleSheet: .className{ key: value; }
	 *	Option: { className: {key: value} }
	 */
	$.style = function (option) {
		setTimeout(function() {
			var dom = document.getElementsByTagName('style')[0], text = [];

			if (!dom) {
				dom = document.createElement('style');
				document.head.append(dom);
			}

			for (let className in option) {
				let item = [],
				    cls = option[className];
				for (let key in cls) {
					item.push(key + ':' + cls[key]);
				};

				text.push(className + '{' + item.join(';') + '}');
			}

			dom.append(text.join(''));
		})
	}

	global.$ = $;

})(window);

/**
 * 	Object Prototype
 */
Object.defineProperties(Object.prototype, {
	forEach: {
		value: function forEach(fn) {
			for (var key in this) {
				fn(this[key], key);
			}
		}
	},
	json: {
		value: function toJson() {
			return JSON.stringify(this);
		}
	},
	extend: {
		value: function extend(target) {
			Object.assign(this, target);
			return this;
		}
	},
	map: {
		value: function (fn) {
			for (var i in this) {
				this[i] = fn.call(null, this[i], i);
			};
			return this;
		}
	}
});
/**
 *	String Prototype
 */
Object.defineProperties(String.prototype, {
	clean: {
		value: function clean() {
			return this.replace(/[\n\r\t]{2,}/g, '\n\n').replace(/[\n\r\t]/g, '\n').replace(/^[\s\n]+/, '').replace(/[\s\n]+$/, '');
		}
	},
	array: {
		value: function toArray() {
			return JSON.parse(this);
		}
	},
	trim: {
		value: function(){
			return this.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
		}
	}
});