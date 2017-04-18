module.exports = function StateNode(state, node){

	var value = state.value, fn = function(data){ return data }, child;

	switch(typeof(value)){
		case 'object':
			if(Array.isArray(value)) child = state.push(fn);
			else child = value ? (value.nodeType ? value : state.update(fn)) : state.update(fn);
			break;
		case 'string':
		case 'number':
			child = state.text(fn);
			break;
	}

	if(child) node.appendChild(child);

	return node;
}