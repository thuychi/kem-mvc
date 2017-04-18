class Event {
	constructor() {
		this._event = {};
	}

	on(name, fn){
    	this._event[name] = fn;
	}

	removeListener(name){
  		delete this._event[name];
	}

	removeAllListeners(){
  		this._event = {};
	}
};

Event.EVENT_DEFAULT = { open: 1, close: 1, error: 1, headers: 1, listening: 1 };

module.exports = Event;