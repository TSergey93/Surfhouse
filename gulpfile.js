"use strict";

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	plumber = require('gulp-plumber'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	server = require('browser-sync'),
	minify = require('gulp-csso'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	run = require('run-sequence'),
	del = require('del'),
	hash = require('gulp-rev-append'),
	gcmq = require('gulp-group-css-media-queries'),
	jsmin = require('gulp-jsmin');


gulp.task('clean', function() {
	return del('build/*');
});

gulp.task('copy', function() {
	return gulp.src([
		'src/fonts/**/*.{woff,woff2}',
		'src/img/**/*.{png,jpg,gif}',
		'src/img/*.svg',
		'src/data/**',
		'src/favicon.ico'
	], {
		base: 'src'
	})
	.pipe(gulp.dest('build'));
});

gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*.{png,jpg,gif}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
		]))
	.pipe(gulp.dest('build/img'));
});

gulp.task('svgsprite', function(){
	return gulp.src('src/img/svg icons/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename('svg_sprite.svg'))
		.pipe(gulp.dest('build/img'));
});

gulp.task('jade', function() {
	gulp.src(['!src/jade/mixins.jade', 'src/jade/*.jade'])
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest('build/'))
		.pipe(server.reload({stream: true}));
});

gulp.task('style', function() {
	gulp.src(['!src/less/mixins.less', '!src/less/normalize.less', '!src/less/variable.less', 'src/less/*.less'])
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer(
				{browsers: [
				"last 1 version",
				"last 2 Chrome versions",
				"last 2 Firefox versions",
				"last 2 Opera versions",
				"last 2 Edge versions"],
				grid: true
			})
		]))
		.pipe(gcmq())
		.pipe(minify())
		.pipe(gulp.dest('build/css'))
		.pipe(server.reload({stream: true}));
});

gulp.task('script', function() {
	gulp.src('src/js/*.js')
		.pipe(plumber())
		.pipe(jsmin())
		.pipe(gulp.dest('build/js/'))
		.pipe(server.reload({stream: true}));
});

gulp.task('hash', function() {
	gulp.src('build/*.html')
		.pipe(hash())
		.pipe(gulp.dest('build'));
});

gulp.task('watcher', function() {
	server.init({
		server: 'build'
	});
	gulp.watch('src/less/**/*.less', ['style', 'hash']);
	gulp.watch('src/**/*.jade',['jade', 'hash']);
	gulp.watch('src/js/*.js',['script', 'hash']);
});

gulp.task('build', function(fn) {
	run('clean', 'copy', 'jade', 'style', 'script', 'imagemin', 'svgsprite', 'hash', fn);
});
