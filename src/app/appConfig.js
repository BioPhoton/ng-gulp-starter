;(function () {
    'use strict';

    angular.module('gulp-starter.app.configurations', [])
        .config(appConfigurations);

    /**
     * @module:test
     */
    function appConfigurations() {

        /**
         * @name add
         * @param a
         * @param b
         * @returns {*}
         */
        function add(a,b) {
            return a+b;
        }




    };

})();