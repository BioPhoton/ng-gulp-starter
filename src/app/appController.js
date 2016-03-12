(function () {
    'use strict';

    angular
        .module('gulp-starter.app.controller', [])
        .controller('AppController', AppController);

    function AppController($q) {

        var vm = this;

        init();

        /////////

        /**
         *
         * @param state
         * @returns {*}
         */
        function init(state){
            return state;
        }

    }


})();
