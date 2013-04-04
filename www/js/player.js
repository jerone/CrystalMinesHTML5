define(['config', 'Quintus'], function (config, Q) {

	Q.Sprite.extend("Player", {
		init: function (p) {
			this._super(p, { 
				sheet: "player", 
				stepping: false, 
				stepDistance: config.spriteDimension / 4,
				stepDelay: 0.05,
				scale: config.scale
			});

			this.add('2d, stepControls');

			this.on("hit.sprite", function (collision) {
				if (collision.obj.isA("Exit")) {
					Q.stageScene("endGame", 1, { label: "You Won!" });
					this.destroy();
				}
			});
		}
	});

});
