define(['config', 'Quintus'], function (config, Q) {

	Q.scene("level-1", function (stage) {
		stage.collisionLayer(new Q.TileLayer({
			dataAsset: 'level-1.json',
			sheet: 'tiles',
			tileW: config.spriteDimension,
			tileH: config.spriteDimension
		}));

		var player = stage.insert(new Q.Player({ x: (13 * config.spriteDimension) - (config.spriteDimension / 2), y: (7 * config.spriteDimension) - (config.spriteDimension / 2), }));
		//stage.add("viewport").follow(player);

		stage.insert(new Q.Enemy({ x: (23 * config.spriteDimension), y: (2 * config.spriteDimension) }));
		stage.insert(new Q.Enemy({ x: (26 * config.spriteDimension), y: (2 * config.spriteDimension) }));

		stage.insert(new Q.Finish({ x: (6 * config.spriteDimension) - (config.spriteDimension / 2), y: (3 * config.spriteDimension) - (config.spriteDimension / 2) }));
	});

});
