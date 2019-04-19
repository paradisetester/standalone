/*
*
* ng Model
*/
var app = angular.module ('project' , ['ngRoute', 'toaster', 'ngAnimate']);


/*
*
* Angular Routes
*/
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'pages/login.htm',
		controller: 'LoginCtrl'
	})
	.when('/register', {
		templateUrl: 'pages/register.htm',
		controller: 'LoginCtrl'
	})
	.when('/profile', {
		templateUrl: 'pages/profile/index.htm',
		controller: 'ProfileCtrl'
	})
	.when('/profile/edit', {
		templateUrl: 'pages/profile/edit.htm',
		controller: 'ProfileCtrl'
	})
	.when('/tele-health', {
		templateUrl: 'pages/tele-health/index.htm',
		controller: 'TeleHealthCtrl'
	})
	.when('/sud', {
		templateUrl: 'pages/sud/index.htm',
		controller: 'SudCtrl'
	})
	.when('/1115', {
		templateUrl: 'pages/1115/index.htm',
		controller: 'SudCtrl'
	})
	.when('/logout', {
		templateUrl: 'pages/login.htm',
		controller: 'LogoutCtrl'
	})
	.otherwise({redirectTo :'/'});
});


/*
*
* callback function
* check user session
*/
app.run(function ($rootScope, $location, $templateCache) {
	$rootScope.currentpath = $location.$$path;
	
	$rootScope.$on('$viewContentLoaded', function() {
		$templateCache.removeAll();
		jQuery(".nav").removeClass("mobilemenu");
	});
	
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		$rootScope.authenticated = true;
		nextUrl = next.$$route.originalPath;
		$rootScope.page = nextUrl;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				$rootScope.authenticated = true;
				if (nextUrl == '/' || nextUrl == '/register') {
					$location.path("/profile");
				}
			}
			else {
				$rootScope.authenticated = false;
				if (nextUrl == '/' || nextUrl == '/register') {
				} else {
					$location.path("/");
				}
			}
		});
	});

});


/*
*
* Request handler
* using for rest api
*/
app.factory("Req", ['toaster',
	function (toaster) {
		
		var obj = {};
		//obj.base = base;
		
		obj.toast = function (data) {
			toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
		}
		
		return obj;
	}
]);