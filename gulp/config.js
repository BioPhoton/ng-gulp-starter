/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 */
'use strict';

module.exports = (function() {

    //dir paths
    var root = './',
        resources = root+'resources/',
        bower = {
            json: require('../bower.json'),
            directory: './bower_components/',
            ignorePath: '../../'
        },
        src = './src/',
        //optional wrapper folder here (src+'client/')
        client = src,
        app = 'app/',
        assetsFolder = 'assets/',
        clientAssets = client + assetsFolder,
        baseDirs = ['./', client],
        clientApp = client + app,
        build = './dist/',
        assetsFontsFolder = 'fonts/',
        assetsImagesFolder = 'images/';

    var fontCopies = [
        {
            src:bower.directory + 'font-awesome/fonts/**.*',
            dest:clientAssets + assetsFontsFolder + 'fontawesome',
            name : 'fontawesome'
        },
        {
            src:bower.directory + 'bootstrap-sass/assets/fonts/bootstrap/**.*',
            dest:clientAssets + assetsFontsFolder + 'bootstrap',
            name : 'bootstrap'
        },
    ];

    var imageCopies = [
            {
                src:[
                    resources+assetsImagesFolder+'default-avatar.jpg'
                ],
                dest:clientAssets +assetsImagesFolder,
                name : 'defaultImages'
            }
        ];


    //default envs
    var env = {
        staging : 'staging',
        live : 'live'
    };


    //@TODO refactore
    var fonts = 'fonts/';
    var images = 'images/';
    var css = 'css/';

    var config = {
        app : app,
        clientApp : clientApp,
        styles : {
            fontCopies : fontCopies,
            imageCopies : imageCopies
        },
        //templateCache
        inject : {
            injectJsSrc : ['./app.js'],
            injectJsOrder: [
                '**/app/app.js',
                '**/app/*.js',
                '**/app/**/*.js',
                '**/assets/html/tempaltes.js'
            ]
        },
        env:env,
        //versioConfig
        root : root,
        baseDirs:baseDirs,
        client: client,
        build: build,
        resources : resources,
        assetsFolder : assetsFolder,
        clientAssets : clientAssets,
        fonts : fonts,
        images: images,
        index: client + 'index.html',

        css : css,
        html: client + '**/*.html',
        allJs: [
            './src/**/*.js',
            './*.js'
        ],

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Bower and NPM files
         */
        bower: bower,
        defaultPort: '8001'

    };



    return config;

    ////////////////

})();
