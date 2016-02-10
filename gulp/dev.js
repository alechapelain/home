'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    });

module.exports = function(basePaths) {

    gulp.task('watch', function() {
        gulp.watch(basePaths.src + 'less/**/*.less', ['less']);
    });

    gulp.task('connect:src', function(){
        $.connect.server({
          root: 'src',
          port: 8888,
          livereload: true
        });
    });

    gulp.task('connect:build', function(){
        $.connect.server({
          root: 'dist',
          port: 8888,
          livereload: true
        });
    });

    gulp.task('serve:src', ['connect:src', 'watch']);
    gulp.task('serve:build', ['connect:build', 'watch']);

};
