/**
 * typescript.js
 *
 * This file uses the config.js and helper.js file located in ./gulp
 *
 * This File requires following npm modules:
 * ``
 * $ npm install gulp gulp-load-plugins gulp-bump gulp-print yargs --save-dev
 * ``
 *
 * This file contains often used modules and functions created in a generic reusable way.
 *
 */
'use strict';

var gulp = require('gulp'),
    args = require('yargs').argv,
    helper = require('../helper'),
    $ = require('gulp-load-plugins')();

var config = require('../config');

var defaultConfig = {
    root : config.root,
    packages :  [
        './package.json',
        './bower.json',
        //'./manifest.json'
    ]
};

//////////////////


var  versionConfig = defaultConfig;

/**
 *  Overrides
 *
 *  config.version {[see defaultConfig here]}
 *
 **/

if('versionConfig' in config) {
    versionConfig = helper.arrayConcatExtend(defaultConfig, config.version);
}

//__________________________________________________________________________________________________


var typePre = "pre",
    typePatch = "patch",
    typeMinor = "minor",
    typeMajor = "major";

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('version:bump', function(done) {
    var options = getOptions(args.type, args.version);
    return bumpVersion(options, done);
});

gulp.task('version:bump-patch', function(done) {
    var options = getOptions(typePatch);
    return bumpVersion(options, done);
});

gulp.task('version:bump-minor', function(done) {
    var options = getOptions(typeMinor);
    return bumpVersion(options, done);
});

gulp.task('version:bump-major', function(done) {
    var options = getOptions(typeMajor);
    return bumpVersion(options, done);
});

function bumpVersion(options, done){
    return gulp
      .src(versionConfig.packages)
      .pipe($.print())
      .pipe($.bump(options))
      .pipe(gulp.dest(versionConfig.root), done);
}

function getOptions(type,version) {
    var msg = 'Bumping versions ',
      options = {};

    if (version) {
        options.version = version;
        msg += 'to ' + version;
    } else {
        if(type != undefined) {
            options.type = type;
            msg += 'for a ' + type;
        }
        else {
            helper.log('No param to bump version to. Task stopped!');
            return;
        }
    }

    helper.log(msg);

    return options;
}