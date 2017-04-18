var DOM = require('../../lib/dom.js');

module.exports = class ConfirmBox extends DOM {

	init() {
		var content = this.find('.modal-content');
		content.style.top = (window.innerHeight - content.offsetHeight) / 4 - 10 + 'px';
	}

	yes() {
		this.props.data.yes();
		this.remove();
	}

	render() {
		var data = this.props.data;
		return DOM.createElement(
			'div',
			{ className: 'modal' },
			DOM.createElement(
				'div',
				{ className: 'modal-content confirm-content' },
				data.header ? DOM.createElement(
					'header',
					null,
					data.header
				) : null,
				DOM.createElement(
					'section',
					null,
					data.section
				),
				DOM.createElement(
					'footer',
					{ style: 'border-top: 1px solid #DDD;' },
					data.yes ? DOM.createElement(
						'div',
						{ className: 'clearfix' },
						DOM.createElement(
							'button',
							{ type: 'button', className: 'btn btn-sm btn-primary pull-right', onclick: this.yes.bind(this), style: 'margin-left: 5px;' },
							'Yes'
						),
						DOM.createElement(
							'button',
							{ type: 'button', className: 'btn btn-sm btn-default pull-right', onclick: this.remove.bind(this) },
							'No'
						)
					) : DOM.createElement(
						'div',
						{ className: 'clearfix' },
						DOM.createElement(
							'button',
							{ type: 'button', className: 'btn btn-sm btn-default pull-right', onclick: this.remove.bind(this) },
							'OK'
						)
					)
				)
			)
		);
	}
}