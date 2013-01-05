define(['config',
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

			var Q = Quintus()
					.include("Sprites, Scenes, Input, 2D, Touch, UI")
					.setup({ maximize: true })
					.controls().touch();

			Q.debug = true;

			// no gravity;
			Q.gravityX = 0;
			Q.gravityY = 0;
			
			Q._nullContainer.c.scale = config.scale;
			//Q._nullContainer.matrix.scale(config.scale, config.scale);

			return Q;

		});
