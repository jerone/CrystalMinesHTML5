define(['config', 'Quintus'], function (config, Q) {

	Q.Sprite.extend("Exit", {
		init: function (p) {
			this._super(p, { sheet: 'exit', scale: config.scale });
		}
	});

});
