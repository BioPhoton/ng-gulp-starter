/// <reference path="../../typings/tsd.d.ts" />
namespace app {

//placeholder for templatecache
angular.module("commons.caching.templates", []);

angular.module('app', [
  'ionic',
  'common',
  'components',
  'commons.caching.templates'
  ])
  .constant('configConstant', ConfigConstant.Default)
  .run(($ionicPlatform) => {
    return new RunFunction($ionicPlatform);
  });

}
