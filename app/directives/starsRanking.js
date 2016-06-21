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