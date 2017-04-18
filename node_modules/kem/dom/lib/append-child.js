var StateNode = require('./state-node');

module.exports = function AppendChild(children, node) {

	for (let i = 0, n = children.length; i < n; i++) {
		var child = children[i];
		switch (typeof child) {
			case 'string':
			case 'number':
				node.insertAdjacentHTML('beforeend', child);
				break;
			case 'function':
				setTimeout(function () {
					child(node);
				});
				break;
			case 'object':
				if (child) {
					if (Array.isArray(child)) {
						AppendChild(child, node);
					}else if (child.nodeType) {
						node.appendChild(child);
					}else if (child.isState) {
						StateNode(child, node);
					}else if (child.name) {
						child.self.on(child.name, child.fn.bind(node));
					}
				} else {
					node.appendChild(document.createTextNode(''));
				};
				break;
		}
	};

	return node;
};