require('kem/dom/prototype');

var { WS, DOM } = require('kem/dom');
var socket = new WS('ws://localhost:3000');
var ul = $('#chat').css({ 'display': 'none' });
/*
socket.on('chat:send', function(data){
	ul.append(<li>{data.text}</li>);
});

$('form').onsubmit = function(e){
	e.preventDefault();

	var text = this.text.val();

	socket.emit('chat:send', {text});

	return false;
}
*/
class Form extends DOM {
	constructor(props) {
		super(props);
		this.state = { list: [] };
	}
	componentWillMount() {
		socket.on('chat:send', data => {
			this.emit('list', data);
		});
	}
	submit_action(e) {
		e.preventDefault();

		socket.emit('chat:send', this.text.val());
		this.text.val('').focus();
	}
	render() {
		return DOM.createElement(
			'div',
			null,
			DOM.createElement(
				'ul',
				null,
				this.state.list.push(function (text) {
					return DOM.createElement(
						'li',
						null,
						text
					);
				})
			),
			DOM.createElement(
				'form',
				{ onsubmit: this.submit_action },
				DOM.createElement('input', { name: 'text', placeholder: 'text' }),
				DOM.createElement(
					'button',
					null,
					'Post'
				)
			)
		);
	}
}

document.body.append(DOM.createElement(Form, null));