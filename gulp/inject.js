'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    helper = require('./helper'),
    wiredep = require('wiredep').stream,
    runSequence = require('run-sequence');

var config = require('./config'),
    assetsFolder = (config.assetsFolder)?config.assetsFolder:'assets/',
    assetsCssFolder = (config.assetsCssFolder)?config.assetsCssFolder:'css/',
    assetsHtmlFolder = (config.assetsHtmlFolder)?config.assetsHtmlFolder:'html/',
    mainCssFile = 'app.css',
    indexFile = (config.index)?config.index: config.client + 'index.html';

var defaultConfig = {
        injectScr :indexFile,
        injectDest : config.client,
        //bower
        wiredepOptions : {
            bowerJson:  require('../bower.json'),
            directory:  './bower_components/',
            ignorePath: '../../',
            exclude: [
                'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
                'bower_components/jquery/dist/jquery.js'
            ]
        },
        //js
        injectJsSrc: [
            config.clientApp + '**/*.js',
            '!' + config.clientApp + '**/*.config.js'
        ],
        injectJsOrder : [],
        //css
        injectCssSrc: assetsFolder + assetsCssFolder + mainCssFile,
        injectCssOrder : [],
        //html
        injectHtmlSrc: assetsFolder + assetsHtmlFolder,
        injectHtmlOrder : [],
        templateCache : config.client + assetsFolder + assetsHtmlFolder + 'templates.js'
    };

////////////////


/**
 *  Overrides
 *
 *  config.bower = {
 *      json: require('../bower.json'),
 *      directory: './lib/',
 *      ignorePath: '../../'
 *  }
 *
 * config.inject {[see defaultConfig here]}
 *
 **/
var injectConfig = defaultConfig;

if('inject' in config) {
    injectConfig = helper.arrayConcatExtend(defaultConfig, config.inject);
}
//override bower settings
if('bower' in config) {
    if('json' in config.bower) {injectConfig.wiredepOptions.bowerJson = config.bower.json}
    if('directory' in config.bower) {injectConfig.wiredepOptions.directory = config.bower.directory}
    if('ignorePath' in config.bower) {injectConfig.wiredepOptions.ignorePath = config.bower.ignorePath}
}

    //console.log(injectConfig);

//__________________________________________________________________________________________________

gulp.task('inject', function(done) {
    helper.log('Wire up css into the html, after files are ready');
    return runSequence('inject-js','inject-bower','inject-css', done);
});

gulp.task('inject-bower', function(done) {
    helper.log('Wiring bower dependencies into the bower inject section in '+indexFile);

    return gulp
        .src(injectConfig.injectScr)
        .pipe(wiredep(injectConfig.wiredepOptions))
        .pipe(gulp.dest(injectConfig.injectDest), done);
});

gulp.task('inject-css',['setup-assets'], function(done) {
    helper.log('Wiring the css dependencies into index.html');
    console.log(injectConfig.injectCssSrc);
    return gulp
        .src(injectConfig.injectScr)
        .pipe(helper.inject(injectConfig.injectCssSrc))
        .pipe(gulp.dest(injectConfig.injectDest), done);
});

gulp.task('inject-js', function(done) {
    helper.log('Wiring the project dependencies into the html');

    return gulp
        .src(injectConfig.injectScr)
        .pipe(helper.inject(injectConfig.injectJsSrc, '', config.injectJsOrder))
        .pipe(gulp.dest(injectConfig.injectDest), done);
});

gulp.task('inject-html',['compile-html'], function(done) {
    helper.log('Wiring the templatecache dependencies into index.html');
console.log(injectConfig);
    return gulp
        .src(injectConfig.injectScr)
        .pipe(helper.inject(injectConfig.templateCache, 'templates'))
        .pipe(gulp.dest(injectConfig.injectDest), done);
});
