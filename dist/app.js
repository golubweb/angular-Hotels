/***************************
*
* @author: Darko Golubovic
* @date: 21-06-2016
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
* @date: 21-06-2016
*
***************************/
myApp.controller('hotelCtrl', ['$scope', '$compile', '$filter', '$document', '$templateRequest', 'hotelServices', 'mainFactory', function($scope, $compile, $filter, $document, $templateRequest, hotelServices, mainFactory){
	$scope.howMany = 5;
	$scope.hotelsList = [];
	
	var init = function(){
		$scope.error = true;
		$scope.errorMsg = "Something failed!";
		
		$scope.runAPI();
	};
	
	$scope.runAPI = function(){
		$scope.hotels = [];

		hotelServices.getData('http://fake-hotel-api.herokuapp.com/api/hotels').then(function(response){
			if(response.status === 200){
				$scope.itemsList = Object.keys(response.data).length;
				
				angular.forEach( response.data , function(item, key) {
					var dateStart = item.date_start.slice(0, 10).split('-');
					var dateEnd = item.date_end.slice(0, 10).split('-');
					
					item.dateStart = dateStart[2] + '.' + dateStart[1] + '.' + dateStart[0];
					item.dateEnd = dateEnd[2] + '.' + dateEnd[1] + '.' + dateEnd[0];
					
					$scope.hotelsList.push(item);
				});
				
				mainFactory.partHotels($scope.hotelsList, 0, $scope.howMany).then(function(data){
					$scope.hotels = data;
				});
				
				$scope.error = false;
			} else {
				hotelServices.getError('http://fake-hotel-api.herokuapp.com/api/hotels?force_error=1').then(function(response){
					$scope.error = true;
					$scope.errorMsg = response.data.error;
				});
			}
		});
	};
	
	$document.on('click', '.load_hotels', function() {
		var lastItem = $('article:last-of-type');
		var startItem = $(lastItem.selector + ' .reviews-hotels').attr('reviews');
		
		$scope.sliceHotels(startItem);			
	});

	$scope.sliceHotels = function(itemID) {
		angular.forEach($scope.hotelsList, function(item, key) {
			if(item.id == itemID){
				mainFactory.partHotels($scope.hotelsList, key + 1, $scope.howMany).then(function(data){
					if(Object.keys(data).length > 0){				
						angular.forEach(data, function(item, key) {
							
							$scope.hotels.push(item);
						});
					}
				});
			}
		});		
	};
	
	init();
}]);

/***************************
*
* @author: Darko Golubovic
* @date: 21-05-2016
*
***************************/
myApp.directive('reviews', ['$templateRequest', '$compile', 'hotelServices', function($templateRequest, $compile, hotelServices) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, element, attr) {
			element.bind("click", function () {
				var id = attr.reviews;
				
				hotelServices.getData('http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=' + id).then(function(response){
					scope.itemReviews = [];
					element.parent().find('.reviews').remove();
					
					if(response.status === 200){						
						scope.itemReviews = response.data;
						
						$templateRequest('app/templates/reviews.tpl.html').then(function(html){
							var template = angular.element(html);

							angular.element(element).parent().after($compile(template)(scope));
						});
					}
				});
			});
		}
	};
}]);


/***************************
*
* @author: Darko Golubovic
* @date: 21-05-2016
*
***************************/
myApp.directive('stars', ['$compile', function($compile){
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attr){
			var article = $(element).parent('article');
			
	    	for(var i = 0; i < 5; i++){
	    		if(i < attr.stars){
	    			element.append('<li class="stars full">&#9733;</li>');
	    		} else {
	    			element.append('<li class="stars">&#9733;</li>');
	    		}	    		
	    	}
		}
	};
}]);
/***************************
*
* @author: Darko Golubovic
* @date: 21-05-2016
*
***************************/
myApp.factory('mainFactory', ['$q', function($q) {
	return {
		partHotels: function(allData, start, howMany) {
			var scopeData = [];
			var q = $q.defer();
			
			for(var i = 0; i < howMany; i++){
				scopeData.push(allData[start + i]);
			}

			q.resolve(scopeData);
				
			return q.promise;
		}
	};
}]);


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


