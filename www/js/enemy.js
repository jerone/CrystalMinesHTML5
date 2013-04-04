define(['config', 'Quintus'], function (config, Q) {

	Q.Sprite.extend("Enemy", {
		init: function (p) {
			this._super(p, { 
				sheet: 'enemy', 
				vx: 80, 
				vy: 80, 
				scale: config.scale 
			});
			
			this.add('WalkAround');

			this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
				if (collision.obj.isA("Player")) {
					Q.stageScene("endGame", 1, { label: "You Died" });
					collision.obj.destroy();
				}
			});

			//this.on("bump.top", function(collision) {
			//	if(collision.obj.isA("Player")) { 
			//		this.destroy();
			//		collision.obj.p.vy = -300;
			//	}
			//});
		}
	});

});
