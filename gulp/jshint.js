'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('code:lint:hint', [], function () {
  gulp.src(['./app/**/*.js'])
    .pipe($.jshint())
    .pipe($.jscs());
});