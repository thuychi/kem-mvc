module.exports = class Event {
	constructor() {
		this._event = {};
	}

	on(name, fn) {
		this._event.hasOwnProperty(name) ? this._event[name].push(fn) : this._event[name] = [fn];
	}

	emit(name, ...value) {
		var list = this._event[name] || [];

		for (var i = 0, n = list.length; i < n; i++) {
			list[i].apply(null, value);
		}
	}

	setState(list) {
		for (var i in list) {
			this.emit(i, list[i]);
		}
	}

	removeListener(name) {
		if (name) delete this._event[name]; else this._event = {};
	}

	removeAllListeners(){
		this._event = {};
	}
}