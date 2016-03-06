'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    helper = require('./helper')
;

var config = require('./config'),
    scssFoldername = (config.scssFoldername)?config.scssFoldername:'scss/';


var defaultConfig = {
    bowerFiles : config.bower.directory+'**/*',
    cssFiles : config.clientApp+'**/'+scssFoldername+'*.scss',
    jsFiles : config.client+'**/*.js',
    htmlFiles : config.client+'**/*.js'
};

////////////////

var  watchConfig = defaultConfig;

/**
 *  Overrides
 *
 *  config.styles {[see defaultConfig here]}
 *
 **/

if('watch' in config) {
    watchConfig = helper.arrayConcatExtend(defaultConfig, config.watch);
}

//__________________________________________________________________________________________________




/**
 * watch all
 */
gulp.task('watch-all', ['watch-css', 'watch-html','watch-js'], function(done) {
    helper.log('Watching all files for changes');
    return done();
});

gulp.task('watch-bower', function(done) {
    helper.log('Watching all bower files for changes and inject into index.html');
    return helper.watch(watchConfig.bowerFiles, ['inject-bower'])
        .on('change', changeEvent);
});

gulp.task('watch-js', function(done) {
    helper.log('Watching all projects .js files for changes and inject into index.html');
    return helper.watch(watchConfig.jsFiles, ['inject-js'])
        .on('change', changeEvent);
});

gulp.task('watch-scss', function(done) {
    helper.log('Watching all .scss files for changes and recompile scss');
    return helper.watch(watchConfig.cssFiles, ['compile-css'])
            .on('change', changeEvent);
});

gulp.task('watch-html', ['html'], function(done) {
    helper.log('Watching all .html files for changes and rebuild templatecache');
    return helper.watch(watchConfig.htmlFiles, ['html'])
            .on('change', changeEvent);
});


/////

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.src + ')/');
    helper.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}



