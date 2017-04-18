var fs = require('fs'),
	file = require('kem/db/mongo/file'), 
	app = require('kem'),
	dirname = app.get('public'),
	dev = app.get('dev'), 
	path = '',
	cache = {};

function get_text(param, content_type){
	return fs.existsSync(path) ? fs.readFileSync(path) : '';
}

function common_action(r, param, type, content_type){
	param.unshift(dirname, type);
	path = param.join('/');

	r.header('Content-Type', content_type);

	if(dev) return r.end(get_text(path));

	if(!cache[path]) cache[path] = get_text(path);

	r.end(cache[path]);
}

module.exports = class AssetController {


	// GET: /asset/js/...js
	js(r, ...param){
		common_action(r, param, 'js', 'application/javascript')
	}

	css(r, ...param){
		common_action(r, param, 'css', 'text/css')
	}
	
	fonts(r, ...param){
		common_action(r, param, 'fonts', '*/*')
	}
	
	// read image, audio, video from mongodb
	// http://localhost:3000/asset/file/{file_id}
	file(r, id){
		if(id && id.length===24){
			file.read(id, function(content_type, stream){
				if(stream){
					r.header('Content-Type', content_type);
					stream.pipe(r.res);
				}else{
					r.end();
				}
			})
		}else{
			r.end();
		}
	}
	
	// Upload file and save to MongoDB
	// file.write(binary, content_type, metadata);
	post_upload(r){
		file.write(r.bin, r.header('content-type'), r.query, function(fileid){
			r.end(fileid);
		});
	}
}