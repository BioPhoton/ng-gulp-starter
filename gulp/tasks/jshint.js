'use strict';

var gulp = require('gulp');
var helper = require('../helper');
var $ = require('gulp-load-plugins')();


var config = require('../config');
console.log(config.client);
var defaultConfig = {
    srcFolder : config.client,
    jsHintOptions : {},
    ngAnnotateOptions : {
        remove : true
    }
};

////////////////


/**
 *  Overrides
 *
 * config.build {[see defaultConfig here]}
 *
 **/
var jsHintConfig = defaultConfig;

if('lshint' in config) {
    jsHintConfig = helper.arrayConcatExtend(defaultConfig, config.lshint);
}

//__________________________________________________________________________________________________


////////////////////////

gulp.task('lint', function(done) {
    return gulp.src(jsHintConfig.srcFolder+'**/*.js')
        .pipe($.jshint(jsHintConfig.jsHintOptions))
        .pipe($.jshint.reporter('jshint-stylish'))
        ;
});

gulp.task('ng-annotate', function () {
    return gulp.src(jsHintConfig.srcFolder+'**/*.js')
        .pipe($.ngAnnotate(jsHintConfig.ngAnnotateOptions))
        .pipe(gulp.dest(jsHintConfig.srcFolder));
});