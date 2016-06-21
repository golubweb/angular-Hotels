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
		$scope.errorMsg = "Waiting for a response!";
		
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
