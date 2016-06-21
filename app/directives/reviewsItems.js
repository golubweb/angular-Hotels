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

