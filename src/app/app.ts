/// <reference path="../../typings/tsd.d.ts" />

//placeholder for templatecache
angular.module("commons.caching.templates", []);

angular.module('starterApp', [
  'ionic',
  'commons.caching.templates'])
  .run(($ionicPlatform) => {
    return new RunFunction($ionicPlatform);
  });

class RunFunction {

  constructor(private $ionicPlatform:ionic.platform.IonicPlatformService)
  {}

  private init():void {
    this.$ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

}




