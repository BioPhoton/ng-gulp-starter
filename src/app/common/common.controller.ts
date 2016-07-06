namespace common {

  export class CommonController {

    version:string;

    constructor(private $state:ng.ui.IStateService
      , private $window:ng.IWindowService
                // , private appConfig:AppConfig
    ) {

    }

  }

}


