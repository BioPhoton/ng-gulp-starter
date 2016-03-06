'use strict';
var config = require('./../config');

var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var helper = require('./../helper');
var merge = require('merge-stream');
var $ = require('gulp-load-plugins')();


///////////

var favicon = 'favicon.png';

var assetsSrc = [config.clientAssets+'**/*.*', '!'+config.clientAssets+'css/**/*.*', '!'+config.clientAssets+'html/**/*.*'],
    assetsDest = config.build+config.assets;

var favicionSrc =  config.client+favicon,
    favicionDest = config.build;



var manifestSrc = [
    './dist/**/*.*',
    './dist/index.html'];

var manifestOptions = {
    hash		: true,
    timestamp 	: false,
    preferOnline: true,
    network		: [
        '*'
        //'http://*'
    ],
    filename	: 'appcache.manifest',
    exclude		: 'appcache.manifest'
};

////////////////////////

gulp.task('manifest', function(done){
    helper.log('Creating cachemanifest');

    return gulp.src(manifestSrc, { base: config.build })
        .pipe($.manifest(manifestOptions))
        .pipe(gulp.dest(config.build), done);
});

gulp.task('move-dist-assets',['clean-dist-assets'], function(done){
    helper.log('Moving assets files to dist');

    var assets = gulp.src(assetsSrc)
        .pipe(gulp.dest(assetsDest))
        .on('end', function(){ helper.log('copied assets files from '+assetsSrc+' to '+ assetsDest); });

    var favicion = gulp.src(favicionSrc)
        .pipe(gulp.dest(favicionDest))
        .on('end', function(){ helper.log('copied favicon files from '+favicionSrc+' to '+ favicionDest); });

    return merge(assets, favicion);

});

gulp.task('clean-dist-assets', function(done){
    helper.log('Cleaning assets files in dist');
    return helper.clean([config.build+config.assets+'images/', config.build+config.assets+'fonts/'], done);
});