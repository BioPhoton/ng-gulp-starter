'use strict';
var config = require('./config');

var gulp = require('gulp');
var args = require('yargs').argv;
var helper = require('./helper');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')();


var port = config.defaultPort;


///////////////

/**
 * serve the build environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-build',['build'], function() {
    startBrowserSync(false /*isDev*/);
});

/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', ['inject'], function() {
    startBrowserSync(true /*isDev*/);
});


//////////////////////


/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(isDev) {
    if (args.nosync || browserSync.active) {
        return;
    }

    helper.log('Starting BrowserSync on port ' + port);

    var serverRoot =  config.baseDirs;

    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches sass, compiles it to css, browser-sync handles reload
    if (isDev) {
        gulp.start('watch-all').on('change', browserSync.reload);
    } else {
        serverRoot =  config.build;
        gulp
            .watch([].concat(config.allSass, config.js, config.html),
            ['optimize', browserSync.reload]);
    }

    var options = {
        //proxy: 'localhost:' + port,
        port: 8010,
        server: {
            baseDir: serverRoot
        },
        /*files: isDev ? [
            config.client + '**\/*.*',
            '!' + config.allSass,
            config.temp + '**\/*.css'
        ] : [],*/
        /*ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },*/
        //injectChanges: true,
        //logFileChanges: true,
        //logLevel: 'debug',
        //logPrefix: 'gulp-patterns',
        //notify: true,
        reloadDelay: config.browserReloadDelay
    } ;

    browserSync.init(options);

}