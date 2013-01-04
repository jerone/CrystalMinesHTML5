requirejs.config({
	baseUrl: 'js',
	paths: {},
	shim: {}
});

require(['config', 'Quintus', 'player', 'finish', 'enemy', 'level1', 'endGame'], function (config, Q) {

	console.log("Game starting...", !!Q);

	Q.load("sprites.png, sprites.json, level1.json, tiles.png", function () {
		Q.sheet("tiles", "tiles.png", { tilew: config.spriteDimension, tileh: config.spriteDimension });
		Q.compileSheets("sprites.png", "sprites.json");
		Q.stageScene("level1");
	});

});
