module.exports = function(config) {
	config.set({
		// frameworks to be used in testing
		// it is important "jasmine-jquery" to be first
		frameworks: ['jasmine-jquery','jasmine'],
		reporters: ['spec'],
		browsers: ['PhantomJS'],
		// since normally application outputs messages to console, we hide them
		client: { captureConsole: false },
		// development files to be watched
		// order should be based on dependency (libs first, app last)
		files: [
			'index.html',
			'src/libraries/jquery.js',
			'src/libraries/underscore.js',
			'src/libraries/backbone.js',
			'src/libraries/backbone.paginator.js',
			'src/libraries/moment.js',
			'src/templates/templates.js',
			'src/app/model.js',
			'src/app/view.js',
			'src/app/router.js',
			'src/app/main.js',
			'tests/**/*.js'
		]
	});
};