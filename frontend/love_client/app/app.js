'use strict';

var app = angular.module('LoveClient', ['ui.router', 'ngCookies'])
    .constant('apiUrl', 'http://127.0.0.1:8000');

app.config( ($interpolateProvider, $httpProvider) => {
    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');

    $httpProvider.defaults.withCredentials = true;
});

app.run(function($http, $cookies, RootFactory ) {
    // $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $http.defaults.xsrfCookieName = 'csrftoken';

    // $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    // $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;

    // let token = $cookies.get('csrftoken');
    // if (token) {
    //     console.log('cookie w/token: ', token);
    //     RootFactory.setToken(token);
    // }

});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/login');
    $stateProvider
    .state('login_register', {
        url: '/', // this loads a header with links to our child states
        templateUrl: 'app/templates/login_register/main.html',
        controller: "LoginCtrl"                                  
    })
    .state('login_register.login', {
           url: '^/login',
           templateUrl: 'app/templates/login_register/login.html',
    })
    .state('login_register.register', {
        url: '^/register',
           templateUrl: 'app/templates/login_register/register.html',
    })
    .state('home', {
        url: '/home',
        views: {
            '': {  // the main template will be placed here (relatively named)
                templateUrl: 'app/templates/home/home.html',
                controller: 'HomeCtrl'
            },
                // the child views will be defined here (absolutely named)
                'messages@home': { 
                    templateUrl: 'app/templates/home/home_messages.html'
                },
                'calendar@home': { 
                    templateUrl: 'app/templates/home/home_calendar.html'
                }
    }

    });
 

}]);