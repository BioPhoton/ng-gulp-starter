'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    helper = require('./helper'),
    $ = require('gulp-load-plugins')();

var config = require('./config'),
    assetsFolder = (config.clientAssets)?config.clientAssets:config.client+'assets/',
    assetsHtmlFolder = (config.assetsFontsFolder)?config.assetsFontsFolder:'html/',
    templateCacheRoot =   (config.app)?config.app:"app/";

var defaultConfig = {
    htmlSrc : [config.clientApp + '**/*.html'],
    htmlDest : assetsFolder + assetsHtmlFolder,
    file : 'templates.js',
    htmlminOptions : {
        empty: true,                      // KEEP empty attributes
        //cdata: true,                      // KEEP CDATA from scripts
        comments: false,                   // KEEP comments
        //ssi: true,                        // KEEP Server Side Includes
        //conditionals: true,               // KEEP conditional internet explorer comments
        spare: true,                      // KEEP redundant attributes
        quotes: true,                     // KEEP arbitrary quotes
        //loose: true,                      // KEEP one whitespace
        //dom: {                            // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
        //    xmlMode: false,                     // Disables the special behavior for script/style tags (false by default)
        //    lowerCaseAttributeNames: true,      // call .toLowerCase for each attribute name (true if xmlMode is `false`)
        //    lowerCaseTags: true                 // call .toLowerCase for each tag name (true if xmlMode is `false`)
        //}
    },

    templateCacheOptions : {
        root : templateCacheRoot,
        module : "commons.caching.templates",
        standalone : false,
        //base : './app/',
        //moduleSystem : "Wrap the templateCache in a module system. Currently supported systems: RequireJS, Browserify, ES6 and IIFE (Immediately-Invoked Function Expression).",
        //transformUrl : "Transform the generated URL before it's put into $templateCache.",
        //templateHeader : "Override template header.",
        //templateBody :  "Override template body.",
        //templateFooter : "Override template footer."
    },
    uglifyOptions : {}
};

//////////////////

var  templateCacheConfig = defaultConfig;

/**
 *  Overrides
 *
 *  config.templateCache {[see defaultConfig here]}
 *
 **/
if('styles' in config) {
    templateCacheConfig = helper.arrayConcatExtend(defaultConfig, config.templateCache);
}

//__________________________________________________________________________________________________

gulp.task('clean-html', function(done) {
    return helper.clean(config.clientAssets + 'html/**/*.*', done);
});
gulp.task('compile-html',['clean-html'], function (done) {
    helper.log('Collecting html files from '+templateCacheConfig.htmlSrc+' minify, uglify and put in '+templateCacheConfig.htmlDest+' file');
    return gulp
        .src(templateCacheConfig.htmlSrc)
        .pipe($.if(args.verbose, $.bytediff.start()))
        .pipe($.htmlmin(templateCacheConfig.htmlminOptions))
        .pipe($.if(args.verbose, $.bytediff.stop(helper.bytediffFormatter)))
        .pipe($.angularTemplatecache(templateCacheConfig.file, templateCacheConfig.templateCacheOptions))
        .pipe($.uglify(templateCacheConfig.uglifyOptions))
        .pipe(gulp.dest(templateCacheConfig.htmlDest), done);
});