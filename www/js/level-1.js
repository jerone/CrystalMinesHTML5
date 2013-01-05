define(['config', 'Quintus'], function (config, Q) {

	Q.scene("level-1", function (stage) {
	
		// add level;
		var tileLayer = new (Q.TileLayer.extend({
			init: function(props,defaultProps) {
				this._super(Q._extend({
					dataAsset: 'level-1.json',
					sheet: 'tiles',
					tileW: config.spriteDimension,
					tileH: config.spriteDimension,
					scale: config.scale
				},props),defaultProps);
			}
		}))();
		//tileLayer.matrix.scale(config.scale, config.scale);
		stage.collisionLayer(tileLayer);
		

		// add player;
		var player = stage.insert(new Q.Player({ 
			x: ((13 * config.spriteDimension) - (config.spriteDimension / 2)) * config.scale, 
			y: ((8 * config.spriteDimension) - (config.spriteDimension / 2)) * config.scale
		}));
		//stage.add("viewport").follow(player);

		// add enemies;
		stage.insert(new Q.Enemy({ 
			x: (23 * config.spriteDimension * config.scale), 
			y: (2 * config.spriteDimension * config.scale) 
		}));
		stage.insert(new Q.Enemy({ 
			x: (26 * config.spriteDimension * config.scale), 
			y: (2 * config.spriteDimension * config.scale) 
		}));

		// add exit;
		stage.insert(new Q.Exit({ 
			x: ((6 * config.spriteDimension) - (config.spriteDimension / 2)) * config.scale, 
			y: ((4 * config.spriteDimension) - (config.spriteDimension / 2)) * config.scale 
		}));
	});

});
