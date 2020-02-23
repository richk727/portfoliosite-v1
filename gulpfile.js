'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const browserSync = require('browser-sync');

const server = browserSync.create();


const paths = {
  styles: {
    src: 'dev/sass/**/*.sass',
    dest: 'public/assets/css/'
  },
  scripts: {
    src: 'deb/js/**/*.js',
    dest: 'public/assets/js/'
  }
};
 
/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
  	.pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}
 
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: false })
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}
 
function reload(done) {
	server.reload();
	done();
}

function serve(done) {
	server.init({
	  server: {
		baseDir: 'public/'
	  }
	});
	done();
}

function watch() {
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
}


 
/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = gulp.series(gulp.parallel(styles, scripts));

const dev = gulp.series(styles, scripts, serve, watch);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.dev = dev;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = dev;