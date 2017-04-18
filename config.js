module.exports = {

	"dev": true,

	"host": "localhost",
	"port": 3000,

	"app": __dirname + "/app",
	"socket": __dirname + "/socket",
	"public": __dirname + "/public",

	"mongodb": {
		"url": "localhost:27017/kem",
		"option": {}
	},
	"redis": {
		"host": "127.0.0.1",
		"port": 6379,
		"auth": "6eeb73df91baf0106f3322fb4a5440cda1b04b88",
		"option": {
			"detect_buffers": true
		},
		"table": [0, "login", "follow", "chat"]
	},
	"sql": {
		"host": "localhost",
		"port": 3306,
		"user": "thuychi",
		"password": "thuan1992",
		"db": "test",
		"multiStatements": true,
		"charset": "UTF8"
	}
	
}