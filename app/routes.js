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

