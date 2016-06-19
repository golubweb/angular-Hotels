
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
