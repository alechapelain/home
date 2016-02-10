'use strict';

var gulp  = require('gulp'),

basePaths = {
    src: 'src/',
    dist: 'dist/',
    bower: 'src/vendor/'
};

require('./gulp/bootstrap')(basePaths);

/**
 * DEFAULT
 */

gulp.task('default', function() {
    console.log('run');
});
