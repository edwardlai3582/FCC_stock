app.controller('firstpageController', ['$scope','stockF',function($scope,stockF) { 
    $scope.socket=stockF.socket;

    
    $scope.stockName="";
    $scope.stocks=stockF.stocks;
    $scope.xAxisArray=stockF.xAxisArray;

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'line',
                backgroundColor:null,
                spacingBottom: 10,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10,
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            }
        },
        series: $scope.stocks,
        title: {
            text: ''
        },
        //Boolean to control showing loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,
        xAxis: {
            categories: $scope.xAxisArray,
            labels: {enabled:false},
        },
        yAxis: {
            title: {text: ''},
        },        
    };  
  
    $scope.addStock = function(){
        if(!$scope.stockName || $scope.stockName === '') { return; }
        for(var i=0; i<$scope.stocks.length;i++){
            if($scope.stocks[i]['name']===$scope.stockName.toUpperCase()){
                console.log("duplicate");
                $scope.stockName = '';
                return;                
            }
        }
        stockF.addStock({
            stockName: $scope.stockName.toUpperCase()
        });
        $scope.stockName = '';
    };
    
    $scope.deleteStock= function(index){
        console.log("delete "+$scope.stocks[index]['name']);
        stockF.deleteStock($scope.stocks[index]['name']).then(function(stock){
            var seriesArray = $scope.chartConfig.series;
            seriesArray.splice(index, 1);
        });
    }
    
    $scope.socket.on('deleteStock', function(msg){
        console.log( "delete " + msg );
        var i;
        for(i=0;i<$scope.chartConfig.series.length;i++){
            if($scope.chartConfig.series[i]['name']===msg){
                console.log('found! '+$scope.chartConfig.series[i]['name']);
                $scope.chartConfig.series.splice(i, 1);
                for(var j=0;j<$scope.chartConfig.series.length;j++){
                console.log($scope.chartConfig.series[j]['name']);    
                }
                return;
            }
        }
    });
    
    angular.element(document).ready(function () {
        stockF.getStocks();
    });
     
}]);