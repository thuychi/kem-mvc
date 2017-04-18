var Link = require('../link.js'), 
	ConfirmBox = require('./box.js');

module.exports = function Confirm(option) {
	Link.modal(ConfirmBox, option);
}