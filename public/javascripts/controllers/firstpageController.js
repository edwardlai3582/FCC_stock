app.controller('firstpageController', ['$scope','$window','stockF','getStocks', function($scope,$window,stockF,getStocks) { 

  $scope.labels =stockF.labels;// ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = stockF.name;
  $scope.data =stockF.data;
  $scope.chartoptions={pointDot : false,
                       pointHitDetectionRadius : 1,
                       datasetFill : false,
                       maintainAspectRatio: true,
                      };
  

}]);