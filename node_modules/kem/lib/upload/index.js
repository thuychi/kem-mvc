module.exports = class Upload {
	constructor(file) {
		this.type = file.type;
		this.r = new FileReader();
		this.r.readAsBinaryString(file);
	}

	success(fn) {
		var type = this.type;
		this.r.onload = function (e) {
			Upload.socket.emit('upload', {bin: e.target.result, type: type, user: Upload.user}, fn);
		}
	}

	progress(fn) {
		this.r.onprogress = function (e) {
			fn(e.loaded / e.total);
		}
	}
}