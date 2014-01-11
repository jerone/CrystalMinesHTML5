var config = {
  spriteDimension: 13, // amount of pixels the sprites are width & height;
  scale: 1				// overall scale;
};




window.addEventListener("load", function () {


  var Q = window.Q = Quintus()
					.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
					.setup({ maximize: true })
					.controls();

  //Q.debug = true;



  Q.load("sprites.png, sprites.json, level-1.json, level-2.json, level-3.json, tiles.png", function () {
    Q.sheet("tiles", "tiles.png", { tilew: config.spriteDimension, tileh: config.spriteDimension });
    Q.animations("player", {
      walk_right: { frames: [0], loop: true },
      walk_down: { frames: [1], loop: true },
      walk_left: { frames: [2], loop: true },
      walk_up: { frames: [3], loop: true }
    });
    Q.animations("enemy", {
      walk_right: { frames: [0], loop: true },
      walk_down: { frames: [1], loop: true },
      walk_left: { frames: [2], loop: true },
      walk_up: { frames: [3], loop: true }
    });
    Q.compileSheets("sprites.png", "sprites.json");
    Q.stageScene("level-2");
  });



  Q.Sprite.extend("Player", {
    init: function (p) {
      this._super(p, {
        sheet: "player",
        sprite: "player",
        stepping: false,
        stepDistance: config.spriteDimension / 4,
        stepDelay: 0.05,
        scale: config.scale
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
        this.play("walk_right");
      } else if (this.p.diffX < 0) {
        this.play("walk_left");
      } else if (this.p.diffY > 0) {
        this.play("walk_down");
      } else if (this.p.diffY < 0) {
        this.play("walk_up");
      }
    }
  });





  Q.Sprite.extend("Enemy", {
    init: function (p) {
      this._super(p, {
        sheet: 'enemy',
        sprite: "enemy",
        vx: 20,
        vy: 20,
        scale: config.scale
      });

      this.add('WalkAround2, animation');

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
      this._super(p, { sheet: 'exit', scale: config.scale });
    }
  });







  // Calculate correct tile location;
  function placeSprite(tileIndex) {
    var tileLocation = tileIndex * config.spriteDimension,
			tileHalf = config.spriteDimension / 2;
    return (tileLocation - tileHalf) * config.scale;
  }

  Q.scene("level-1", function (stage) {

    // add level;
    var tileLayer = new (Q.TileLayer.extend({
      init: function (props, defaultProps) {
        this._super(Q._extend({
          dataAsset: 'level-1.json',
          sheet: 'tiles',
          tileW: config.spriteDimension,
          tileH: config.spriteDimension,
          scale: config.scale
        }, props), defaultProps);
      }
    }))();
    //tileLayer.matrix.scale(config.scale, config.scale);
    stage.collisionLayer(tileLayer);

    // add player;
    var player = stage.insert(new Q.Player({
      x: placeSprite(20),
      y: placeSprite(7)
    }));
    //stage.add("viewport").follow(player);

    stage.insert(new Q.Enemy({
      x: placeSprite(4),
      y: placeSprite(2)
    }));

    /*// add exit;
		stage.insert(new Q.Exit({ 
		x: placeSprite(6), 
		y: placeSprite(4)
		}));*/
  });

  Q.scene("level-2", function (stage) {

    // add level;
    var tileLayer = new (Q.TileLayer.extend({
      init: function (props, defaultProps) {
        this._super(Q._extend({
          dataAsset: 'level-2.json',
          sheet: 'tiles',
          tileW: config.spriteDimension,
          tileH: config.spriteDimension,
          scale: config.scale
        }, props), defaultProps);
      }
    }))();
    //tileLayer.matrix.scale(config.scale, config.scale);
    stage.collisionLayer(tileLayer);

    // add player;
    var player = stage.insert(new Q.Player({
      x: placeSprite(20),
      y: placeSprite(7)
    }));
    //stage.add("viewport").follow(player);

    stage.insert(new Q.Enemy({
      x: placeSprite(6),
      y: placeSprite(3)
    }));

    /*// add exit;
		stage.insert(new Q.Exit({ 
		x: placeSprite(6), 
		y: placeSprite(4)
		}));*/
  });







  Q.component("WalkAround2", {
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












  var dir = "";

  Q.component("WalkAround", {
    added: function () {
      var entity = this.entity;
      Q._defaults(entity.p, {
        vx: 0,
        vy: 0,
        collisionMask: Q.SPRITE_DEFAULT
      });
      entity.on("step", this, "step");
      entity.on("hit", this, "collision");
    },

    collision: function (col, last) {
      var entity = this.entity,
						p = entity.p;

      var direction = "";
      var x = 0;
      var y = 0;

      if (col.normalX > 0) {
        direction = "left";
        x = -Math.abs(p.vx);
        y = -Math.abs(p.vy);
      }
      else if (col.normalX < 0) {
        direction = "right";
        x = Math.abs(p.vx);
        y = Math.abs(p.vy);
      }
      if (col.normalY > 0) {
        direction = "top";
        x = Math.abs(p.vx);
        y = -Math.abs(p.vy);
      }
      else if (col.normalY < 0) {
        direction = "bottom";
        x = -Math.abs(p.vx);
        y = Math.abs(p.vy);
      }

      console.log(col.normalX, col.normalY, direction, p.vx, p.vy, x, y);
      if (dir !== direction) {
        dir = direction;
      }

      //console.log(col.normalX, col.normalY, direction, p.vx, p.vy);
      // console.log(col.normalX, col.normalY, direction);





      //Q.pauseGame();

      //p.hitted = true;

      //var impactX = Math.abs(p.vx);
      //var impactY = Math.abs(p.vy);

      // p.vx = impactX;
      // p.vy = impactY;
      p.x -= col.separate[0];
      p.y -= col.separate[1];

      //					console.log("test", col.normalX, col.normalY);
      //console.log("test", impactX, impactY);
      ///////////					console.log("test", p.vx, p.vy);
      //debugger;

      if (col.normalX > 0) { // bump left;
        //debugger;
        //if(p.vx < 0) { p.vx = 0; }
        //if(p.vy > 0) { p.vy = 0; }
        //p.vx = 0;
        //p.direction = p.vy > 0 ? 0 : 2;
        //p.bump = 3;
        //p.direction = 0;

        p.vy = -Math.abs(p.vy);
        p.vx = -Math.abs(p.vx);
        //p.vy = p.vy * (col.normalY > 0 ? -1 : 1);
        //p.vx = p.vx * (col.normalX > 0 ? -1 : 1);
      }
      else if (col.normalX < 0) { // bump right;
        //	debugger;
        //if(p.vx > 0) { p.vx = 0; }
        //if(p.vy > 0) { p.vy = 0; }
        //p.vx = 0;
        // p.direction = p.vy <= 0 ? 0 : 2;
        //p.bump = 1;
        //p.direction = 2;
        p.vy = Math.abs(p.vy);
        p.vx = Math.abs(p.vx);
      }
      if (col.normalY > 0) { // bump top;
        //	debugger;
        //if(p.vy < 0) { p.vy = 0; }
        //if(p.vx > 0) { p.vx = 0; }
        //p.vy = 0;
        // p.direction = p.vx > 0 ? 1 : 3;
        //p.bump = 0;
        //p.direction = 1;
        p.vy = -Math.abs(p.vy);
        p.vx = Math.abs(p.vx);
      }
      else if (col.normalY < 0) { // bump bottom;
        //	debugger;
        //if(p.vy > 0) { p.vy = 0; }
        //if(p.vx > 0) { p.vx = 0; }
        //p.vy = 0;
        // p.direction = p.vx <= 0 ? 1 : 3;
        //p.bump = 2;
        //p.direction = 3;
        p.vy = Math.abs(p.vy);
        p.vx = -Math.abs(p.vx);
      }
    },

    step: function (dt) {
      //   var p = this.entity.p;

      //console.log("test", p.x, p.y, p.vx, p.vy);
      // debugger;

      //p.hitted = false;
      //					console.log(p.bump, p.direction, p.vx, p.vy);

      //if(p.hitted===false){
      /*if(p.bump==0){
			p.vx = 0;
			}
			else if(p.bump==1){
			p.vy = 0;
			}
			else if(p.bump==2){
			p.vx = 0;
			}
			else if(p.bump==3) {
			p.vy = 0;
			}*/
      // debugger;
      //}


      /*
			var obj = this.entity,
						colOjb = this.entity.stage;

			var p = this.entity.p,
						tileStartX = Math.floor((obj.p.x - obj.p.cx - p.x) / p.tileW),
						tileStartY = Math.floor((obj.p.y - obj.p.cy - p.y) / p.tileH),
						tileEndX = Math.ceil((obj.p.x - obj.p.cx + obj.p.w - p.x) / p.tileW),
						tileEndY = Math.ceil((obj.p.y - obj.p.cy + obj.p.h - p.y) / p.tileH),
						colObj = this.collisionObject,
						normal = this.collisionNormal,
						col;
			
			normal.collided = false;

			for (var tileY = tileStartY; tileY <= tileEndY; tileY++) {
				for (var tileX = tileStartX; tileX <= tileEndX; tileX++) {
					if (this.tilePresent(tileX, tileY)) {
						colObj.p.x = tileX * p.tileW + p.x + p.tileW / 2;
						colObj.p.y = tileY * p.tileH + p.y + p.tileH / 2;

						col = Q.collision(obj, colObj);
						if (col && col.magnitude > 0 &&
									 (!normal.collided || normal.magnitude < col.magnitude)) {
							normal.collided = true;
							normal.separate[0] = col.separate[0];
							normal.separate[1] = col.separate[1];
							normal.magnitude = col.magnitude;
							normal.distance = col.distance;
							normal.normalX = col.normalX;
							normal.normalY = col.normalY;
							normal.tileX = tileX;
							normal.tileY = tileY;
							normal.tile = this.getTile(tileX, tileY);
						}
					}
				}
			}

			//return normal.collided ? normal : false;

			console.log(normal);
			*/


      this.entity.p.x += this.entity.p.vx * dt;
      this.entity.p.y += this.entity.p.vy * dt;
      this.entity.stage.collide(this.entity);
    }
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