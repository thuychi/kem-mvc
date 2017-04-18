var gulp = require('gulp');
var minify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('jsx', function(){
	return gulp.src('./asset/jsx/**/*.jsx')
		.pipe(babel())
		.pipe(gulp.dest('./asset/js/'));
});

gulp.task('js', ['jsx'], function(){
	return gulp.src('./asset/js/index.js')
		.pipe(babel())
		.pipe(browserify())
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function(){
	gulp.watch('./asset/js/index.js', ['js']);
});

gulp.task('default', ['js', 'watch']);