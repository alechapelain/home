'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'run-sequence', 'del']
    });

module.exports = function(basePaths) {

    gulp.task('todo', function() {
        return gulp.src(basePaths.src + 'js/**/*.js')
            .pipe($.todo())
            .pipe(gulp.dest('./'));
    });

    gulp.task('dist-clean', function() {
        return $.del.sync([
            basePaths.dist
        ], {force: true});
    });

    gulp.task('dist-copy-resources-img', function() {
        return gulp.src([
                basePaths.src + 'img/**/*'
            ])
            .pipe(gulp.dest(basePaths.dist + 'img'));
    });

    gulp.task('dist-copy-resources-fonts', function() {
        return gulp.src([
                basePaths.src + 'fonts/**/*'
            ])
            .pipe(gulp.dest(basePaths.dist + 'fonts'));
    });

    gulp.task('dist-pre-inject', function() {
        return gulp.src(basePaths.src + 'index.html')
            .pipe($.rename('index-tmp.html'))
            .pipe(gulp.dest(basePaths.src));
    });

    gulp.task('dist-inject', function() {
        var assets = $.useref.assets(),
            jsFilter = $.filter('**/*.js'),
            cssFilter = $.filter('**/*.css'),
            htmlFilter = $.filter('*.html');

        return gulp.src(basePaths.src + 'index-tmp.html')
            .pipe(assets)
            .pipe($.rev())

            .pipe(jsFilter)
            .pipe($.uglify())
            .pipe(jsFilter.restore())

            .pipe(cssFilter)
            .pipe($.csso())
            .pipe(cssFilter.restore())

            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())

            .pipe(htmlFilter)
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                conditionals: true
            }))
            .pipe(htmlFilter.restore())

            .pipe(gulp.dest(basePaths.dist));
    });

    gulp.task('dist-post-inject', function() {
        return gulp.src(basePaths.dist + 'index-tmp.html')
            .pipe($.rename('index.html'))
            .pipe(gulp.dest(basePaths.dist));
    });

    gulp.task('dist-clean-end', function() {
        return $.del([
            basePaths.dist + 'index-tmp.html',
            basePaths.src + 'index-tmp.html'
        ], function(err, deletedFiles) {
            console.log('Files deleted');
        });
    });

    gulp.task('build', function() {
        $.runSequence(
            'todo',
            'js-hint',
            'html-hint',
            'dist-clean',
            'dist-copy-resources-fonts',
            'dist-copy-resources-img',
            'dist-pre-inject',
            'dist-inject',
            'dist-post-inject',
            'dist-clean-end'
        );
    });
};
