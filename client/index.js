function MongoCtrl($scope, $http) {
 

  $scope.getAllCDs = function(){
 	$http.get("/rest/cd").success(function(data){
 	 	$scope.cds = data;
  	});
  };

  $scope.cdSelected = function(cd){
  	$scope.activeCD = cd;
  }

  $scope.searchBySong = function(){
  	$http.get("/rest/cd?song=").success(function(data){
  		$scope.cds = data;
  	});
  };

  $scope.searchByTitle = function(){
  	$http.get("/rest/cd?title=" + $scope.titlequery).success(function(data){
  		$scope.cds = data;
  	});
  };

  $scope.save = function(){
  	if ($scope.activeCD._id)
  	{
		$http.put( "/rest/cd/" + $scope.activeCD._id, $scope.activeCD ).success(function(data){
			$scope.getAllCDs();
			$scope.activeCD = data[0];
  		});
  	}
  	else
  	{
  		$http.post( "/rest/cd", $scope.activeCD ).success(function(data){
			$scope.getAllCDs();
			$scope.activeCD = data[0];
  		});
  	}
  	
  };

  $scope.clearActiveCD = function(){
  	$scope.activeCD = { title: "" };
  };


  $scope.getAllCDs();

}