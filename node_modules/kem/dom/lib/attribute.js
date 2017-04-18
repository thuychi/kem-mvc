module.exports = function Attribute(attributes, node) {
	for (var key in attributes) {
		var value = attributes[key];
		switch (typeof value) {
			case 'string':
				node[key] = value;
				break;
			case 'function':
				'node' === key ? value(node) : node[key] = value;
				break;
			case 'object':
				if (Array.isArray(value)) {
					var dom = document.createDocumentFragment();

					for (var i = 0, n = value.length; i < n; i++) {
						var val = value[i], child;

						if ('object' === typeof val) {
							child = document.createTextNode(val.value);
							val.on(function (attrVal) {
								child.nodeValue = attrVal;
								node[key] = dom.textContent;
							});
						} else {
							child = document.createTextNode(val);
						};
						dom.appendChild(child);
					};
					node[key] = dom.textContent;
				} else if (value.isState) {
					if ('style' === key) {
						// <div style={this.state.style}</div>
						// <div style={this.state.style.css(function(data){ return data })}
						value.__cssAction(node);
					} else {
						node[key] = value.value;

						value.on(function (attrVal) {
							'boolean' === typeof attrVal ? attrVal ? node.setAttribute(key, "true") : node.removeAttr(key) : node[key] = attrVal;
						});
					}
				} else {
					Object.assign(node, attributes);
				};
				break;
		}
	}

	return node;
}