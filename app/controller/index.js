module.exports = class IndexController {
	index(r){
		r.html('index.index', {name: 'Nguyen Thuan'})
	}
}