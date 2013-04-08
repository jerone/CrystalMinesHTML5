define('Quintus',
		['config',
		'lib/quintus',
		'lib/quintus_2d',
		//'lib/quintus_anim',
		//'lib/quintus_audio',
		'lib/quintus_input',
		'lib/quintus_scenes',
		'lib/quintus_sprites',
		'lib/quintus_touch',
		'lib/quintus_ui'], function (config) {

			var Q = Quintus()
					.include("Sprites, Scenes, Input, 2D, Touch, UI")
					.setup({ maximize: true })
					.controls();

			Q.debug = true;

			Q.component('2dAround', {
				added: function () {
					var entity = this.entity;
					Q._defaults(entity.p, {
						vx: 0,
						vy: 0,
						ax: 0,
						ay: 0,
						gravity: 1,
						collisionMask: Q.SPRITE_DEFAULT
					});
					entity.on('step', this, "step");
					entity.on('hit', this, 'collision');
				},

				collision: function (col, last) {
					var entity = this.entity,
						p = entity.p,
						magnitude = 0;

					col.impact = 0;
					var impactX = Math.abs(p.vx);
					var impactY = Math.abs(p.vy);

					p.x -= col.separate[0];
					p.y -= col.separate[1];

					// Top collision
					if (col.normalY < -0.3) {
						if (p.vy > 0) { p.vy = 0; }
						col.impact = impactY;
						entity.trigger("bump.bottom", col);
					}
					if (col.normalY > 0.3) {
						if (p.vy < 0) { p.vy = 0; }
						col.impact = impactY;

						entity.trigger("bump.top", col);
					}

					if (col.normalX < -0.3) {
						if (p.vx > 0) { p.vx = 0; }
						col.impact = impactX;
						entity.trigger("bump.right", col);
					}
					if (col.normalX > 0.3) {
						if (p.vx < 0) { p.vx = 0; }
						col.impact = impactX;

						entity.trigger("bump.left", col);
					}


				},

				step: function (dt) {
					var p = this.entity.p,
						dtStep = dt;
					// TODO: check the entity's magnitude of vx and vy,
					// reduce the max dtStep if necessary to prevent 
					// skipping through objects.
					while (dtStep > 0) {
						dt = Math.min(1 / 30, dtStep);
						// Updated based on the velocity and acceleration
						p.vx += p.ax * dt + Q.gravityX * dt * p.gravity;
						p.vy += p.ay * dt + Q.gravityY * dt * p.gravity;
						p.x += p.vx * dt;
						p.y += p.vy * dt;

						this.entity.stage.collide(this.entity);
						dtStep -= dt;
					}
				}
			});

			// custom 2d component;
			Q.component('aiRound', {
				added: function () {
					this.entity.on("bump.right", this, "goBottom");
					this.entity.on("bump.bottom", this, "goLeft");
					this.entity.on("bump.left", this, "goTop");
					this.entity.on("bump.top", this, "goRight");
					this.entity.on('hit', this, 'collision');
					this.entity.on('step', this, "step");
				},

				goLeft: function (col) {
					this.entity.p.vx = -col.impact;
				},
				goRight: function (col) {
					this.entity.p.vx = col.impact;
				},
				goTop: function (col) {
					this.entity.p.vy = -col.impact;
				},
				goBottom: function (col) {
					this.entity.p.vy = col.impact;
				},
				collision: function () { console.log("collision", this, arguments); },
				step: function () {
					console.log("step", this, arguments); this.entity.stage.collide(this.entity);
				}
		});


			Q.component('WalkAround', {
				added: function () {
					var entity = this.entity;
					Q._defaults(entity.p, {
						vx: 0,
						vy: 0,
						direction: 2,
						collisionMask: Q.SPRITE_DEFAULT
					});
					entity.on('step', this, "step");
					entity.on('hit', this, 'collision');
				},

				collision: function (col, last) {
					var entity = this.entity,
						p = entity.p;

					console.log(col);

					//Q.pauseGame();

					//p.hitted = true;

					//var impactX = Math.abs(p.vx);
					//var impactY = Math.abs(p.vy);

					// p.vx = impactX;
					// p.vy = impactY;
					p.x -= col.separate[0];
					p.y -= col.separate[1];

////////					console.log("test", col.normalX, col.normalY);
					//console.log("test", impactX, impactY);
///////////					console.log("test", p.vx, p.vy);
					//debugger;

					if (col.normalX > 0) { // bump left;
						debugger;
						//if(p.vx < 0) { p.vx = 0; }
						//if(p.vy > 0) { p.vy = 0; }
						//p.vx = 0;
						//p.direction = p.vy > 0 ? 0 : 2;
						//p.bump = 3;
						//p.direction = 0;
						p.vy = -Math.abs(p.vy);
						p.vx = -Math.abs(p.vx);
					}
					 if (col.normalY > 0) { // bump top;
						debugger;
						//if(p.vy < 0) { p.vy = 0; }
						//if(p.vx > 0) { p.vx = 0; }
						//p.vy = 0;
						// p.direction = p.vx > 0 ? 1 : 3;
						//p.bump = 0;
						//p.direction = 1;
						p.vy = -Math.abs(p.vy);
						p.vx = Math.abs(p.vx);
					}
					 if (col.normalX < 0) { // bump right;
						debugger;
						//if(p.vx > 0) { p.vx = 0; }
						//if(p.vy > 0) { p.vy = 0; }
						//p.vx = 0;
						// p.direction = p.vy <= 0 ? 0 : 2;
						//p.bump = 1;
						//p.direction = 2;
						p.vy = Math.abs(p.vy);
						p.vx = Math.abs(p.vx);
					}
					 if (col.normalY < 0) { // bump bottom;
						//debugger;
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
					var p = this.entity.p;

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

					p.x += p.vx * dt;
					p.y += p.vy * dt;
					//this.entity.stage.collide(this.entity);
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

			return Q;

		});
