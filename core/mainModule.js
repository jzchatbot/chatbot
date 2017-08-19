angular.module('chatBot', ['ngRoute'])
.config(['$httpProvider', function($httpProvider) {
	//initialize get if not there
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}

	// Answer edited to include suggestions from comments
	// because previous version of code introduced browser-related errors


}])
.config(['$routeProvider', function($routeProvider) {
	console.log('$routeProvider:' , $routeProvider);
	$routeProvider
	.when('/home', {
		controller: 'ChatCtrl',
		controllerAs: 'chat',
		templateUrl: 'core/angular.chat.html'
	})
  .otherwise( {
		redirectTo: '/home'
	});
}])
