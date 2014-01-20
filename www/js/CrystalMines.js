
window.addEventListener("load", function () {

	var config = {
		spriteDimension: 13, // amount of pixels the sprites are width & height;
		scale: 2,				// overall scale;
		debug: false
	};


	var helpers = {
		placeSprite: function (tileIndex) {  // Calculate correct tile location;
			var tileLocation = tileIndex * config.spriteDimension,
				tileHalf = config.spriteDimension / 2;
			return (tileLocation - tileHalf);
		}
	};


	var Q = window.Q = Quintus({ development: config.debug })
					.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
					.setup({ maximize: true })
					.controls();

	Q.debug = config.debug;


	Q.load(["tiles.png", "sprites.png", "sprites.json", "level-1.json", "level-2.json", "level-3.json"], function () {

		Q.sheet("tiles", "tiles.png", { tilew: config.spriteDimension, tileh: config.spriteDimension });

		Q.compileSheets("sprites.png", "sprites.json");

		Q.animations("player", {
			walk_right: { frames: [1, 2, 3, 4, 5, 6], rate: 1 / 15, flip: false, loop: false },
			walk_down: { frames: [7], loop: false },
			walk_left: { frames: [1, 2, 3, 4, 5, 6], rate: 1 / 15, flip: "x", loop: false },
			walk_up: { frames: [9], loop: false },
			stand_right: { frames: [0, 1], rate: 1 / 5, flip: false, loop: true },
			stand_down: { frames: [7], loop: false },
			stand_left: { frames: [0, 1], rate: 1 / 5, flip: "x", loop: true },
			stand_up: { frames: [9], loop: false }
		});
		Q.animations("enemy", {
			walk_right: { frames: [0], loop: false },
			walk_down: { frames: [1], loop: false },
			walk_left: { frames: [2], loop: false },
			walk_up: { frames: [3], loop: false }
		});

		Q.stageScene("level-3");
	});


	Q.Sprite.extend("Player", {
		init: function (p) {
			this._super(p, {
				sheet: "player",
				sprite: "player",
				stepping: false,
				stepDistance: config.spriteDimension / 4,
				stepDelay: 0.05,
				direction: "left",
				scale: 0.5
			});

			this.add('2d, stepControls, animation');

			this.on("hit.sprite", function (collision) {
				if (collision.obj.isA("Exit")) {
					Q.stageScene("endGame", 1, { label: "You Won!" });
					this.destroy();
				}
			});
		},
		step: function () {
			if (this.p.diffX > 0) {
				this.p.direction = "right";
				this.play("walk_right");
			} else if (this.p.diffX < 0) {
				this.p.direction = "left";
				this.play("walk_left");
			} else if (this.p.diffY > 0) {
				this.p.direction = "down";
				this.play("walk_down");
			} else if (this.p.diffY < 0) {
				this.p.direction = "up";
				this.play("walk_up");
			} else {
				this.play("stand_" + this.p.direction);
			}
		}
	});

	Q.Sprite.extend("Enemy", {
		init: function (p) {
			this._super(p, {
				sheet: 'enemy',
				sprite: "enemy",
				type: Q.SPRITE_ENEMY,
				vx: 30,
				vy: 30,
				scale: 0.5
			});

			this.add('WalkAround, animation');

			/*     this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
						 if (collision.obj.isA("Player")) {
							 Q.stageScene("endGame", 1, { label: "You Died" });
							 collision.obj.destroy();
						 }
					 });*/
		},
		step: function () {
			this.play("walk_" + this.p.direction);
		}
	});

	Q.Sprite.extend("Exit", {
		init: function (p) {
			this._super(p, { sheet: 'exit' });
		}
	});


	Q.scene("level-1", function (stage) {
		stage.add("viewport");
		stage.viewport.scale = config.scale;

		// add level;
		var tileLayer = new (Q.TileLayer.extend({
			init: function (props, defaultProps) {
				this._super(Q._extend({
					dataAsset: 'level-1.json',
					sheet: 'tiles',
					tileW: config.spriteDimension,
					tileH: config.spriteDimension
				}, props), defaultProps);
			}
		}))();
		stage.collisionLayer(tileLayer);

		// add player;
		var player = stage.insert(new Q.Player({
			x: helpers.placeSprite(20),
			y: helpers.placeSprite(7)
		}));
		//stage.add("viewport").follow(player);

		stage.insert(new Q.Enemy({
			x: helpers.placeSprite(4),
			y: helpers.placeSprite(2)
		}));

		/*// add exit;
		stage.insert(new Q.Exit({ 
		x: helpers.placeSprite(6), 
		y: helpers.placeSprite(4)
		}));*/
	});

	Q.scene("level-2", function (stage) {
		stage.add("viewport");
		stage.viewport.scale = config.scale;

		// add level;
		var tileLayer = new (Q.TileLayer.extend({
			init: function (props, defaultProps) {
				this._super(Q._extend({
					dataAsset: 'level-2.json',
					sheet: 'tiles',
					tileW: config.spriteDimension,
					tileH: config.spriteDimension
				}, props), defaultProps);
			}
		}))();
		stage.collisionLayer(tileLayer);

		// add player;
		var player = stage.insert(new Q.Player({
			x: helpers.placeSprite(20),
			y: helpers.placeSprite(7)
		}));
		//stage.add("viewport").follow(player);

		stage.insert(new Q.Enemy({
			x: helpers.placeSprite(6),
			y: helpers.placeSprite(3)
		}));

		/*// add exit;
		stage.insert(new Q.Exit({ 
		x: helpers.placeSprite(6), 
		y: helpers.placeSprite(4)
		}));*/
	});

	Q.scene("level-3", function (stage) {
		stage.add("viewport");
		stage.viewport.scale = config.scale;

		// add level;
		var tileLayer = new (Q.TileLayer.extend({
			init: function (props, defaultProps) {
				this._super(Q._extend({
					dataAsset: 'level-3.json',
					sheet: 'tiles',
					tileW: config.spriteDimension,
					tileH: config.spriteDimension
				}, props), defaultProps);
			}
		}))();
		stage.collisionLayer(tileLayer);

		// add player;
		var player = stage.insert(new Q.Player({
			x: helpers.placeSprite(20),
			y: helpers.placeSprite(7)
		}));
		//stage.add("viewport").follow(player);

		stage.insert(new Q.Enemy({
			x: helpers.placeSprite(6),
			y: helpers.placeSprite(3)
		}));

		/*// add exit;
		stage.insert(new Q.Exit({ 
		x: helpers.placeSprite(6), 
		y: helpers.placeSprite(4)
		}));*/
	});


	// Movement component for walking along walls;
	Q.component("WalkAround", {
		added: function () {
			var entity = this.entity;
			Q._defaults(entity.p, {
				vx: 0,
				vy: 0,
				collisionMask: Q.SPRITE_DEFAULT,
				direction: 'right'
			});
			entity.on("step", this, "step");
			entity.on("hit", this, "collision");
		},
		collision: function (col, last) {
			this.entity.p.x -= col.separate[0];
			this.entity.p.y -= col.separate[1];
			if (col.normalX > 0) { // bump left;
				this.entity.p.direction = "up";
				this.entity.p.vy = -Math.abs(this.entity.p.vy);
				this.entity.p.vx = -Math.abs(this.entity.p.vx);
			}
			else if (col.normalX < 0) { // bump right;
				this.entity.p.direction = "down";
				this.entity.p.vy = Math.abs(this.entity.p.vy);
				this.entity.p.vx = Math.abs(this.entity.p.vx);
			}
			if (col.normalY > 0) { // bump top;
				this.entity.p.direction = "right";
				this.entity.p.vy = -Math.abs(this.entity.p.vy);
				this.entity.p.vx = Math.abs(this.entity.p.vx);
			}
			else if (col.normalY < 0) { // bump bottom;
				this.entity.p.direction = "left";
				this.entity.p.vy = Math.abs(this.entity.p.vy);
				this.entity.p.vx = -Math.abs(this.entity.p.vx);
			}
		},
		step: function (dt) {
			this.entity.p.x += this.entity.p.vx * dt;
			this.entity.p.y += this.entity.p.vy * dt;
			this.entity.stage.collide(this.entity);
		}
	});


	// Pause game by pressing P;
	Q.KEY_NAMES.P = 80;
	Q.input.keyboardControls({ P: "pause" });
	var pauze = false;
	Q.input.on("pause", function () {
		pauze ? Q.unpauseGame() : Q.pauseGame();
		pauze = !pauze;
	});


	// override this method to show background sprite;
	Q.TileLayer.prototype.drawableTile = function (tileNum) {
		return tileNum >= 0;
	};


	// no gravity;
	Q.gravityX = 0;
	Q.gravityY = 0;


	Q._nullContainer.c.scale = config.scale;
	//Q._nullContainer.matrix.scale(config.scale, config.scale);

});