namespace home {


export const home = angular
  .module('home', [])
  //.component('home', HomeComponent)
  .controller('homeController', HomeController)
  .service('homeService', HomeService)
  .config(($stateProvider, $urlRouterProvider) => {
    console.log('home config');
    $stateProvider
      .state('app.home', <ng.ui.IState> {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'app/components/home/home.html',
            controller: HomeController,
            //controllerAs:'home'
          }
        }
      });

  })
  .name;

}

