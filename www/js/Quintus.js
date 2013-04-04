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

			// custom 2d component;
			Q.component('aiRound', {
				added: function () {
					this.entity.on("bump.right", this, "goBottom");
					this.entity.on("bump.bottom", this, "goLeft");
					this.entity.on("bump.left", this, "goTop");
					this.entity.on("bump.top", this, "goRight");
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
						//if(p.vx < 0) { p.vx = 0; }
						//if(p.vy > 0) { p.vy = 0; }
						//p.vx = 0;
						//p.direction = p.vy > 0 ? 0 : 2;
						//p.bump = 3;
						//p.direction = 0;
						p.vy = -Math.abs(p.vy);
						p.vx = -Math.abs(p.vx);
					}
					else if (col.normalY > 0) { // bump top;
						//if(p.vy < 0) { p.vy = 0; }
						//if(p.vx > 0) { p.vx = 0; }
						//p.vy = 0;
						// p.direction = p.vx > 0 ? 1 : 3;
						//p.bump = 0;
						//p.direction = 1;
						p.vy = -Math.abs(p.vy);
						p.vx = Math.abs(p.vx);
					}
					else if (col.normalX < 0) { // bump right;
						//if(p.vx > 0) { p.vx = 0; }
						//if(p.vy > 0) { p.vy = 0; }
						//p.vx = 0;
						// p.direction = p.vy <= 0 ? 0 : 2;
						//p.bump = 1;
						//p.direction = 2;
						p.vy = Math.abs(p.vy);
						p.vx = Math.abs(p.vx);
					}
					else if (col.normalY < 0) { // bump bottom;
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
					this.entity.stage.collide(this.entity);
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
