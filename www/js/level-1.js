define(['config', 'Quintus'], function (config, Q) {

	// Calculate correct tile location;
	function placeSprite(tileIndex){
		var tileLocation = tileIndex * config.spriteDimension,
			tileHalf = config.spriteDimension / 2;
		return (tileLocation - tileHalf) * config.scale;
	}

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
			x: placeSprite(19), 
			y: placeSprite(7)
		}));
		//stage.add("viewport").follow(player);

		// add enemies;
		/*stage.insert(new Q.Enemy({ 
			x: placeSprite(23), 
			y: placeSprite(3) 
		}));*/
		stage.insert(new Q.Enemy({ 
			x: placeSprite(28), 
			y: placeSprite(7) 
		}));
		/*
		// add exit;
		stage.insert(new Q.Exit({ 
			x: placeSprite(6), 
			y: placeSprite(4)
		}));*/
	});

});
