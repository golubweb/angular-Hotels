/***************************
*
* @author: Darko Golubovic
* @date: 19-06-2016
*
***************************/
myApp.service('hotelServices', ['$http', function($http){
	return {
		getData: function(url) {

			return $http({
				method: 'GET',
				url: url
			});
		},
		
		getError: function(url) {
			return $http({
				method: 'GET',
				url: url
			});
		}
	};
}]);


