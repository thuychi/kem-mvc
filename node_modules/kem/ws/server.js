var Event = require('./Event'),
  WebSocket = require('./WebSocket');

module.exports = class WebSocketServer extends WebSocket {

	initStart(address, protocols, options){
		initAsServerClient.call(this, address[0], address[1], address[2], options);
	}

	/**
   *  join a client to a room
   */
	join(room){
  	this.room[room] = true;
	}

	/**
   *  leave out from room
   */
	leave(room) {
  	delete this.room[room];
	}

	/**
   *  Send message to all client in a room
   */
	in(room) {
  	this._sendin = room;
  	return this;
	}

 	/**
   *  Send message to all client in a room, but not it self
   */
	to(room) {
  	this._sendto = room;
  	return this;
	}

	emit(name, ...array) {
    var data = [name, array], fn;

    if(Event.EVENT_DEFAULT[name]) return (fn = this._event[name]) ? fn(array[1]) : 0;

    if(this.readyState !== WebSocket.OPEN) return this.close();

    fn = array[array.length - 1];

    if('function' === typeof fn){
      this.on(name, fn);
      array.pop();
      data[2] = 1;
    }

    return this.send([data]);
	}

  sendText(array){
    this.readyState === WebSocket.CONNECTING ? this.wait(array) : this.send([array]);
  }

	on(name, fn){
  	if(Event.EVENT_DEFAULT[name]){
    		this._event[name] = fn;
    		return;
  	}else{
    		var self = this;
    		this._event[name] = function(value, isCb){
      		if(isCb){
        			value.push(function(...array){
            		array.unshift(name);
            		self.sendText(array);
          		})
      		}
      		fn.apply(this, value);
    		}
  	}
	}
}

/**
 * Initialize a WebSocket server client.
 *
 * @param {http.IncomingMessage} req The request object
 * @param {net.Socket} socket The network socket between the server and client
 * @param {Buffer} head The first packet of the upgraded stream
 * @param {Object} options WebSocket attributes
 * @param {Number} options.protocolVersion The WebSocket protocol version
 * @param {Object} options.extensions The negotiated extensions
 * @param {Number} options.maxPayload The maximum allowed message size
 * @param {String} options.protocol The chosen subprotocol
 * @private
 */
function initAsServerClient (req, socket, head, options) {
  this.protocolVersion = options.protocolVersion;
  this.extensions = options.extensions;
  this.maxPayload = options.maxPayload;
  this.protocol = options.protocol;

  this.upgradeReq = req;
  this._isServer = true;

  this.setSocket(socket, head);
}