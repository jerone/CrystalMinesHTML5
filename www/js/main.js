requirejs.config({
	baseUrl: 'js',
	paths: {},
	shim: {}
});

require(['config', 'Quintus', 'player', 'finish', 'enemy', 'level1', 'endGame'], function (config, Q) {

	console.log("Game starting...", !!Q);

	Q.load("sprites2.png, sprites2.json, level1.json, tiles2.png", function () {
		Q.sheet("tiles", "tiles2.png", { tilew: config.spriteDimension, tileh: config.spriteDimension });
		Q.compileSheets("sprites2.png", "sprites2.json");
		Q.stageScene("level1");
	});

});
