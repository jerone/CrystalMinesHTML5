define('Quintus',
		['config',
		'lib/quintus',
		'lib/quintus_2d',
		/*'lib/quintus_anim',*/
		/*'lib/quintus_audio',*/
		/*'lib/quintus_dom',*/
		'lib/quintus_input',
		/*'lib/quintus_physics',*/
		'lib/quintus_scenes',
		'lib/quintus_sprites',
		/*'lib/quintus_svg',*/
		'lib/quintus_touch',
		'lib/quintus_ui'], function (config) {

			console.log(!!Quintus);
			console.log(arguments);

			var Q = Quintus()
					.include("Sprites, Scenes, Input, 2D, Touch, UI")
					.setup({ maximize: true })
					.controls().touch();

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
