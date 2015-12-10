app.controller('firstpageController', ['$scope','$window','stockF','getStocks', function($scope,$window,stockF,getStocks) { 
    $scope.stockName="";
    $scope.labels =stockF.labels;// ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = stockF.names;
    $scope.data =stockF.data;
    $scope.chartoptions={
                         pointDot : false,
                         pointHitDetectionRadius : 1,
                         datasetFill : false,
                         maintainAspectRatio: true,
                        };
  
    $scope.addStock = function(){
        console.log("clickAdd");
        if(!$scope.stockName || $scope.stockName === '') { return; }
        if($scope.series.indexOf($scope.stockName.toUpperCase())!==-1){
            $scope.stockName = '';
            return;
        }
        stockF.addStock({
            stockName: $scope.stockName.toUpperCase()
        });
        $scope.stockName = '';
    };
    
    $scope.deleteStock= function(stockIndex){
        console.log("delete "+$scope.series[stockIndex]);
        stockF.deleteStock(stockIndex,$scope.series[stockIndex]);
    }
    
}]);