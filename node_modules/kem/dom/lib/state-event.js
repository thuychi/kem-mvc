class ArrayAction {
	constructor() {
		this.start = new Comment();
		this.end = new Comment();
	}

	get parent() {
		if (!this._parent) this._parent = this.start.parentElement;
		return this._parent;
	}
	get next() {
		var next = this.start.nextSibling;
		this.is_element = next && next.nodeType !== 8;
		return next;
	}

	started(data) {
		var frag = document.createDocumentFragment();
		frag.appendChild(this.start);
		this.appendArray(data, frag);
		frag.appendChild(this.end);
		return frag;
	}
	start_replace(data, fn) {
		var frag = document.createDocumentFragment();
		frag.appendChild(this.start);
		if (data) frag.append(fn(data));
		frag.appendChild(this.end);
		return frag;
	}

	appendArray(array, frag) {
		for (var i = 0, count = array.length; i < count; i++) {
			frag.append(array[i]);
		};
		return frag;
	}

	__append(dom) {
		if (/string|number/.test(typeof dom)) dom = document.createTextNode(dom);
		// new dom insert before end_comment
		this.parent.insertBefore(dom, this.end);
	}
	__prepend(dom) {
		if (/string|number/.test(typeof dom)) dom = document.createTextNode(dom);
		// new dom insert after start_comment
		this.parent.insertBefore(dom, this.start.nextSibling);
	}

	append(fragment) {
		fragment.childNodes.length ? this.__append(fragment) : this.remove();
	}

	prepend(fragment) {
		fragment.childNodes.length ? this.__prepend(fragment) : this.remove();
	}

	replace(dom) {
		this.remove();
		if (dom) this.__append(dom);
	}

	remove(not_remove) {
		var next = this.start.nextSibling,
		    tmp_node;

		// if between 2 comments has node => devare its
		// if is comment then break;

		while (next.nodeType !== 8) {
			tmp_node = next;
			next = next.nextSibling;
			tmp_node.remove();
		}
	}
};

module.exports = ArrayAction;