
/***************************
*
* @author: Darko Golubovic
* @date:19-06-2016
*
***************************/

var myApp = angular.module('myApp', ['ngRoute']);

/***************************
*
* @author: Darko Golubovic
* @date: 19-06-2016
*
***************************/

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/', {templateUrl: 'app/templates/hotels.tpl.html', controller: 'hotelCtrl'}).
		otherwise({redirectTo: '/'});
}]);
/***************************
*
* @author: Darko Golubovic
* @date: 19-06-2016
*
***************************/
myApp.controller('mainCtrl', ['$scope', function($scope){

	
}]);

/***************************
*
* @author: Darko Golubovic
* @date: 19-06-2016
*
***************************/

myApp.service('gamesServices', ['$http', function($http){
	return {
		getData: function(url) {

			return $http({
				method: 'GET',
				url: url
			});
		}
	};
}]);
