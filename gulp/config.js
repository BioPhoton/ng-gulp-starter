/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 */
'use strict';

module.exports = (function () {

  var path = require('path');

  var ENV_LOCAL = "local",
    ENV_STAGING = "staging",
    ENV_PRODUCTION = "production",
    ENV_TESTING = "testing";

  var validEnvs = [ENV_LOCAL, ENV_STAGING, ENV_PRODUCTION, ENV_TESTING];


  //dir paths
  var root = './',
    resourcesFolder = 'project_resources/',
    src = root + 'src/',
    buildFolder = root + 'www/',

    baseDirs = [root, buildFolder],
    bower = {
      json: require('../bower.json'),
      directory: root + path.join(root, buildFolder, 'lib')
      //ignorePath: '../'
    },

  //optional wrapper folder here (src+'client/')
    client = buildFolder,

    indexFileName = 'index.html',
    appFolder = 'app/',
    assetsFolder = 'assets/',
    configFolder = 'config/',

    buildAppFolder = buildFolder + appFolder,

    assetsFontsFolder = 'fonts/',
    assetsImagesFolder = 'images/',
    assetsTemplatecacheFolder = 'html/',

    buildAssets = buildFolder + assetsFolder;

  var envJsonFileName = "build.config.json",
    envJsFileName = "build.config.js",
    configFiles = {
      default: root + configFolder + "base.config.json",
      build: src + appFolder + envJsonFileName
    };
  configFiles[ENV_LOCAL] = root + configFolder + ENV_LOCAL + ".config.json";
  configFiles[ENV_STAGING] = root + configFolder + ENV_STAGING + ".config.json";
  configFiles[ENV_PRODUCTION] = root + configFolder + ENV_PRODUCTION + ".config.json";


  //file copy sets and templates
  var mainCssFile = "app.css";
  var minCssFile = "app.min.css";

  var templateFileName = "templates.js";
  var buildTemplatecacheFolder = buildAssets + assetsTemplatecacheFolder;

  var templatecacheFiles = [
    src + appFolder + '**/*.html',
    '!' + indexFileName
  ];

  var buildImagesFolder = buildAssets + assetsImagesFolder;
  var imageCopies = [
    {
      src: [
        resourcesFolder + assetsImagesFolder + 'logo.gif'
      ],
      dest: buildImagesFolder,
      name: 'defaultImages'
    }
  ];

  var config = {
    root: root,
    src: src,
    resourcesFolder: resourcesFolder,
    buildFolder: buildFolder,
    baseDirs: baseDirs,

    indexFileName: indexFileName,
    appFolder: appFolder,
    assetsFolder: assetsFolder,
    configFolder: configFolder,

    buildAppFolder: buildAppFolder,
    buildAssets: buildAssets,
    buildIndex: buildFolder + indexFileName,

    templateFileName: templateFileName,
    mainCssFile: mainCssFile,
    minCssFile: minCssFile,
    srcIndex: src + indexFileName,

    //
    env: {
      injectConfigSrc: buildFolder + envJsFileName,
      envJsonFileName: envJsonFileName,
      envJsFileName: envJsFileName,
      configFiles: configFiles
    },
    scripts: {
      //injectJsSrc : [path.join(buildAppFolder,'**','*.js')],
      injectJsOrder: [
        '**/app/commons/*.js',
        '**/app/commons/**/*.js',
        '**/app/components/*.js',
        '**/app/components/**/*.js',
        '**/app/**/*.js',
        '**/app/*.js',
        '**/app/app.js'
      ]
    },
    //
    images: {
      imageDest: buildImagesFolder,
      imageCopies: imageCopies
    },
    templatecache: {
      templateSrc: templatecacheFiles,
      templateDest: buildTemplatecacheFolder,
      templateCacheOptions: {
        module: "commons.caching.templates"
      },
      injectTemplateSrc: ''

    },
    //
    typescript: {
      srcFiles: [path.join(src, '**', '*.ts'), path.join(src, '**', '*.js')]
    },
    //

    /**
     * browser sync
     */
    browserReloadDelay: 1000 * 6,

    /**
     * Bower and NPM files
     */
    bower: bower

  };

  return config;

  ////////////////

})();
