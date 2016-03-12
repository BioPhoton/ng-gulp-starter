'use strict';

var gulp = require('gulp');
var fs = require('fs')
var helper = require('../helper');
var $ = require('gulp-load-plugins')();



var config = require('../config');

var defaultConfig = {
    srcFolder : config.client,
    jsdoc2mdOptions : {
        template: fs.readFileSync('./README.md', 'utf8')
    }
};

////////////////


/**
 *  Overrides
 *
 * config.build {[see defaultConfig here]}
 *
 **/
var docsConfig = defaultConfig;

if('docs' in config) {
    docsConfig = helper.arrayConcatExtend(defaultConfig, config.docs);
}

//__________________________________________________________________________________________________


////////////////////////



var gutil = require('gulp-util')
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown')
var rename = require('gulp-rename')
var concat = require('gulp-concat')

gulp.task('docs', function () {
    return gulp.src(docsConfig.srcFolder+'**/*.js')
        .pipe(concat('all.md'))
        .pipe(gulpJsdoc2md(docsConfig.jsdoc2mdOptions))
        .on('error', function (err) {
            $.gutil.log($.gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe($.rename(function (path) {
            path.extname = '.md'
        }))
        .pipe(gulp.dest('docs'))
})