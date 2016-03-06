'use strict';
var config = require('./../config');

var gulp = require('gulp');
var args = require('yargs').argv;
var helper = require('./../helper');
var fs = require('fs');
var scp = require('gulp-scp2');
var $ = require('gulp-load-plugins')();

var staHost = '11384-02.root.nessus.at',
    staDest  = "/donut/frontend",
    proHost = '11384-01.root.nessus.at',
    proDest = '/donut/frontend';

var scp2Options = {
    //host:
    //port:"8000";
    //hostHash:
    //hostVerifier:"",
    //username:"donut",
    //password:"bumbum",
    //agent:"",
    //privateKey: fs.readFileSync('~/.ssh/id_rsa'),
    //passphrase:"bumbum",
    //publicKey:"~/.ssh/id_rsa.pub"
    //dest:
    //watch:""
}

////////////////////////

gulp.task('deploy-staging', function(done){
    var deployStagingConfig = require('../deploy.staging.config.js');
    var sources = [config.build+'**/*'];

    scp2Options.host = staHost;
    scp2Options.dest = staDest;
    scp2Options.privateKey =  fs.readFileSync(deployStagingConfig.privateKeyPath);
    scp2Options.username =  deployStagingConfig.username;

    helper.log('copy '+sources+' to '+scp2Options.dest);

    return gulp.src(sources)
        .pipe(scp(scp2Options), done)
        .on('error', function(err) {
            console.log(err);
        });

});

gulp.task('deploy-live', function(done){
    var deployLiveConfig = require('../deploy.live.config.js');
    var sources = [config.build+'**/*'];

    scp2Options.host = proHost;
    scp2Options.dest = proDest;
    scp2Options.privateKey =  fs.readFileSync(deployLiveConfig.privateKeyPath);
    scp2Options.username = deployLiveConfig.username;

    helper.log('copy '+sources+' to '+scp2Options.dest);

    return gulp.src(buildFolder+'/**/*')
        .pipe(scp(scp2Options), done)
        .on('error', function(err) {
            console.log(err);
        });
});
