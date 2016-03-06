'use strict';
var config = require('./../config');

var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var helper = require('./../helper');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

////////////////////////

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-build', function(done) {
    return helper.clean(config.build + '**/*.*', done);
});


/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
gulp.task('build', ['clean-build'], function(done) {
    helper.log('Building everything');

    var injectConfigTask = "inject-local-config";

    if(args.staging) { injectConfigTask = "inject-staging-config" }
    if(args.live) { injectConfigTask = "inject-live-config" }

    return runSequence(injectConfigTask,'inject','optimize','move-dist-assets','manifest',  done);

});

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize',['inject-html'], function () {

    // Filters are named for the gulp-useref path
    var cssFilter = $.filter('**/*.css',{restore: true});
    var jsAppFilter = $.filter('**/' + config.optimized.app,{restore: true});
    var jslibFilter = $.filter('**/' + config.optimized.lib,{restore: true});
    var notIndexFilter = $.filter(['**/*', '!**/index.html'],{restore: true});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        // Apply the concat and file replacement with useref
        .pipe($.useref({searchPath: config.baseDirs}))
        // Get the css
        .pipe(cssFilter)
        .pipe($.cssnano())
        .pipe(cssFilter.restore)
        // Get the custom javascript
        .pipe(jsAppFilter)
        //.pipe($.ngAnnotate({add: true}))
        .pipe($.uglify())
        //.pipe(getHeader())
        .pipe(jsAppFilter.restore)
        // Get the vendor javascript
        .pipe(jslibFilter)
        .pipe($.uglify()) // another option is to override wiredep to use min files
        .pipe(jslibFilter.restore)
        //add hashes to filenames
        // Take inventory of the file names for future rev numbers
        .pipe(notIndexFilter)
        .pipe($.rev())
        .pipe(notIndexFilter.restore)
        // Replace the file names in the html with rev numbers
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build));
});