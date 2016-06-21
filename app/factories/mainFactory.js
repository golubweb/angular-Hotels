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

