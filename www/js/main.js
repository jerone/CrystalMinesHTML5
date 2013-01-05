requirejs.config({
	baseUrl: 'js',
	paths: {},
	shim: {}
});

require(['config', 'Quintus', 'player', 'exit', 'enemy', 'level-1', 'endGame'], function (config, Q) {

	console.log("Game starting...", !!Q);
	window.Q = Q;

	Q.load("sprites.png, sprites.json, level-1.json, tiles.png", function () {
		Q.sheet("tiles", "tiles.png", { tilew: config.spriteDimension, tileh: config.spriteDimension });
		Q.compileSheets("sprites.png", "sprites.json");
		Q.stageScene("level-1");
	});

});
