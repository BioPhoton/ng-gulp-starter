namespace common {

export const common = angular
  .module('common', [
    'main-menu'
  ])
  .controller('commonController', CommonController)
  .config(($stateProvider, $urlRouterProvider) => {
    console.log('common config');
    $stateProvider
      .state('app', <ng.ui.IState> {
        url: "/app",
        abstract: true,
        controller:CommonController,
        templateUrl: 'app/common/common.html',
        controllerAs: 'common',
      });
      $urlRouterProvider.otherwise('/app');
  })
  .name;

}
