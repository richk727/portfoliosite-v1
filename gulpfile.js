/******************************
	REQUIRED DEPENDENCIES
*******************************/

var gulp = require('gulp');

var gulpPlumber = require('gulp-plumber');

var gulpWatch = require('gulp-watch');

var cleanCSS = require('gulp-clean-css');

var uglifyJs = require('gulp-uglify');


/******************************
	DEFAULT TASKS
*******************************/

gulp.task('default', [
	'minify-css:watch',
	'minify-js:watch'
]);


/******************************
	CSS TASKS
*******************************/

gulp.task('minify-css', function(){
	return gulp.src('./css/style.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('./'));
});

gulp.task('minify-css:watch', function(){
	gulp.watch('./css/style.css', ['minify-css']);
});


/******************************
	JAVASCRIPT TASKS
*******************************/

gulp.task('minify-js', function(){
	return gulp.src('./js/main.js')
		.pipe(uglifyJs())
		.pipe(gulp.dest('./'));
});

gulp.task('minify-js:watch', function(){
	gulp.watch('./js/main.js', ['minify-js']);
});