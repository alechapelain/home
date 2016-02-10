'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    });

module.exports = function(basePaths) {

    gulp.task('js-hint', function() {
        return gulp.src(basePaths.src + 'js/**/*.js')
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish'))
            .pipe($.jshint.reporter('fail'));
    });

    gulp.task('html-hint', function() {
        return gulp.src(basePaths.src + './**/*.html')
            .pipe($.htmlhint({htmlhintrc: '.htmlhintrc'}))
            .pipe($.htmlhint.reporter())
            .pipe($.htmlhint.failReporter());
    });

};
