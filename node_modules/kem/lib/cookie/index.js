var Cookie = {
	define: '',
	data: {},
	start: function(cookie_string){
		// cookie_string: 'user=1; time=6f9a14702a2c0df24d9d7d323e16308dddabd42e';
		if (cookie_string) {
			var list_cookie = cookie_string.split('; ');
			for (var i = 0, n = list_cookie.length; i < n; i++) {
				var c = list_cookie[i].split('=');
				this.data[this.decode(c[0])] = this.decode(c[1]);
			}
		}
	},
	encode: function(i) {
		return encodeURIComponent(i);
	},
	decode: function(i) {
		return decodeURIComponent(i);
	},
	init: function(set) {
		var date = new Date(),
		    time = set.day || 1,
		    path = set.path || '/';
		date.setTime(date.getTime() + time * 24 * 3600000);

		var array = ['expires=' + date.toUTCString(), 'path=' + path];
		if (set.host) array.push('domain=' + set.host);
		if (set.secure) array.push('secure=' + set.secure);

		this.define = array.join(';');
		return this;
	},
	set: function(array) {
		for (var i in array) {
			var key = this.decode(i),
			    value = this.decode(array[i]);
			document.cookie = key + '=' + value + ';' + this.define;
			this.data[key] = value;
		}
	},
	has: function(name) {
		return this.data.hasOwnProperty(name);
	},
	get: function(name) {
		return this.data[name];
	},
	remove: function(...array) {
		if (!this.define) this.init({ day: -365, path: '/' });

		for (var i = 0, n = array.length; i < n; i++) {
			document.cookie = this.decode(array[i]) + '=;' + this.define;
			delete this.data[this.decode(array[i])];
		}
	},
	removeAll: function() {
		for (var i in this.data) {
			document.cookie = i + '=;' + this.define;
		}

		this.data = {};
	}
};

Cookie.start(document.cookie);

module.exports = Cookie;