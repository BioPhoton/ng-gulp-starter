'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var helper = require('../helper');
var $ = require('gulp-load-plugins')();

var config = require('../config'),
    assetsFolder = (config.assetsFolder)?config.client+config.assetsFolder:config.client+'assets/',
    indexFile = (config.index)?config.index: config.client + 'index.html',
    htmlSelector = 'html',
    manifetsAttribute = 'manifest';

var defaultConfig = {
    manifestSrc : [
        assetsFolder+'**/*.*',
        indexFile
    ],
    manifestDest : config.buildFolder,
    manifestOptions : {
        hash		: true,
        timestamp 	: false,
        preferOnline: true,
        network		: [
            '*'
            //'http://*'
        ],
        filename	: 'appcache.manifest',
        exclude		: 'appcache.manifest'
    }
};


//////////////////


var  cacheManifestConfig = defaultConfig;

/**
 *  Overrides
 *
 *  config.manifest {[see defaultConfig here]}
 *
 **/

if('manifest' in config) {
    cacheManifestConfig = helper.arrayConcatExtend(defaultConfig, config.manifest);
}

//__________________________________________________________________________________________________


gulp.task('manifest',['clean-manifest'], function(done){
    helper.log('Creating cachemanifest');

    return gulp.src(cacheManifestConfig.manifestSrc, { base: config.buildFolder })
        .pipe($.manifest(cacheManifestConfig.manifestOptions))
        .pipe(gulp.dest(cacheManifestConfig.manifestDest), done);
});

gulp.task('clean-manifest',['remove-manifest'], function(done){
    helper.log('Cleaning assets files in dist');
    return helper.clean([config.client+cacheManifestConfig.manifestOptions.filename], done);
});

gulp.task('remove-manifest', function(done) {

    return helper.htmlEdit(indexFile, cacheManifestConfig.manifestDest, callback, done);

    ///////

    function callback($) {
        $(htmlSelector).each(function () {
            var elem = $(this)[0];
            delete elem.attribs[manifetsAttribute];
        });
    }
});

gulp.task('inject-manifest',['manifest'], function(done) {

    return helper.htmlEdit(indexFile, cacheManifestConfig.manifestDest, callback, done);

    ///////

    function callback($) {
        $(htmlSelector).each(function () {
            var elem = $(this)[0];
            elem.attribs[manifetsAttribute] = cacheManifestConfig.manifestOptions.filename;
        });
    }
});

