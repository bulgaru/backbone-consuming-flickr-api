/* 
 * Install directives
 * - production tools:
 * npm install --save-dev gulp browser-sync gulp-sass gulp-notify gulp-autoprefixer gulp-minify-css gulp-concat gulp-uglify gulp-template-compile
 * - testing tools:
 * npm install --save-dev karma karma-jasmine karma-phantomjs-launcher karma-spec-reporter karma-jasmine-jquery
 */

var gulp		= require('gulp');
var browserSync		= require('browser-sync');
var reload		= browserSync.reload;
var sass		= require('gulp-sass');
var notify		= require('gulp-notify');
var autoprefixer 	= require('gulp-autoprefixer');
var minifyCSS 		= require('gulp-minify-css');
var concat		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var template 		= require('gulp-template-compile');
var Server		= require('karma').Server;
 
// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
	//watch files
	var files = [
		'dist/*.css',
		'dist/*.js'
	];
 
	//initialize browsersync
	browserSync.init(files, {
		//browsersync with a php server
		proxy: "localhost/backbone/",
		notify: false
	});
});
 
// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('styles', function () {
	return gulp.src('src/scss/*.scss')
		.pipe(sass({style: "compressed"}))
		.on("error", notify.onError({
			message: 'Error: <%= error.message %>'
		}))
		.pipe(autoprefixer())
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/'))
		.pipe(reload({stream:true}));
});

gulp.task('templates', function () {
	gulp.src('src/templates/*.html')
		.pipe(template()) // converts html to JS
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('src/templates/'))
});

// JS task, will run when any JS files change & BrowserSync
// will auto-update browsers
gulp.task('scripts', function () {
	return gulp.src([
			'src/libraries/jquery.js',
			'src/libraries/underscore.js',
			'src/libraries/backbone.js',
			'src/libraries/backbone.paginator.js',
			'src/libraries/moment.js',
			'src/templates/templates.js',
			'src/app/model.js',
			'src/app/view.js',
			'src/app/router.js',
			'src/app/main.js'])
		.pipe(concat('script.js'))
		.pipe(uglify())
		.on("error", notify.onError({
			message: 'Error: <%= error.message %>'
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(reload({stream:true}));
});

gulp.task('test', function (done) {
	return new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function() {
        	done();
    	}).start();
});
 
gulp.task('tdd', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
	}, function() {
        	done();
    	}).start();
});

// Default task to be run with `gulp`
gulp.task('default', ['styles', 'templates', 'scripts', 'browser-sync'], function () {
	gulp.watch("src/scss/*.scss", ['styles']);
	gulp.watch("src/templates/*.html", ['templates']);
	gulp.watch("src/**/*.js", ['scripts']);
});
