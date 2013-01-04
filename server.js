'use strict';

var connect = require('connect'),
	http = require('http'),
	url = require('url'),
	sys = require('sys');
	
var HOST = 'localhost',//'172.0.0.223',
	PORT = 1337;

// http://roguejs.com/2011-11-30/console-colors-in-node-js/
var colors = {
	bright	: '\u001b[1m',
	red		: '\u001b[31m',
	green	: '\u001b[32m',
	yellow	: '\u001b[33m',
	blue	: '\u001b[34m',
	magenta	: '\u001b[35m',
	cyan	: '\u001b[36m',
	white	: '\u001b[37m',
	reset	: '\u001b[0m'
};

var app =  connect().use(connect.static('app'))
					.use('/js/lib/', connect.static('node_modules/requirejs/'))
					.use('/node_modules', connect.static('node_modules'))
					.use(function onCallback(request, response){
						if (request.url === '/') {
							console.log('request made:', request.url);
						} else {
							response.writeHead(404);
							response.end();
						}
					});

http.createServer(app).listen(PORT, HOST, function onCallback() {
	console.log(colors.green + 'Server running on http://' + HOST + ':' + PORT + '...' + 
				'\n' + colors.magenta + 'Press Ctrl+C to stop!' + colors.reset);
}).on('error', function onError(e) {
	if (e.code === 'EADDRINUSE') {
		console.log(colors.bright + colors.red + 'Port (' + PORT + ') already in use!' + colors.reset);
	}
});