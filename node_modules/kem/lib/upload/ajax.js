var Event = require('./event');

module.exports = class Upload extends Event {
	constructor(file) {
		super();

		this.x = new XMLHttpRequest();
		this.x.open('POST', Upload.host + '?type=' + file.type + '&user=' + Upload.user, true);
		this.x.setRequestHeader('Content-Type', file.type);
		this.x.send(file);
	}

	success(fn) {
		this.x.onreadystatechange = function (e) {
			if (this.readyState === 4 && this.status === 200) fn(this.responseText);
		}
	}

	progress(fn) {
		this.x.upload.addEventListener('progress', function (e) { fn(e.loaded / e.total) }, false)
	}

	error(fn) {
		this.x.onerror = fn;
	}
}