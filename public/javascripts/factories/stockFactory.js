app.factory('stockF', ['$http','$q',function($http, $q){
    var o = {};
    /////
    o.historyRequest= function(stockName){
        console.log(stockName+" start");
        return $http.get('https://www.quandl.com/api/v3/datasets/WIKI/'+stockName+'/data.json?api_key=Rv-9x2BVx1XW48BRc3ZL&start_date=2015-05-28').success(function(data){
                var temp=[];   
                for(var i=data["dataset_data"]["data"].length-1;i>=0;i--){
                    if(o.labels.length<data["dataset_data"]["data"].length){
                        o.labels.push(data["dataset_data"]["data"][i][0]);    
                    }
                    temp.push(data["dataset_data"]["data"][i][4]); 
                }    
                o.data.push(temp);
                console.log(stockName+" finished");
        });
    }
    /////
    o.names=[];
    o.labels = [];
    o.data = [];
    ////
    o.getStocks = function() {
        return $http.get('/stocks').then(function(response){
            console.log(response.data);
            angular.copy(response.data, o.names);
            
            var cntr = 0;
            function next() {
                if (cntr < response.data.length) {
                    o.historyRequest(response.data[cntr++]).then(next);
                }
            }
            next();
        });    
    };
 
    o.addStock = function(stock) {
        return $http.post('/stocks', stock).success(function(stock){
            o.names.push(stock.stockName);
            o.historyRequest(stock.stockName);
        });
    }; 
   
    o.deleteStock = function(index,stockname){
        return $http.delete('/stocks/'+ stockname).success(function(stock){
            o.names.splice(index, 1);
            o.data.splice(index, 1);
        });        
    }
    
    ///////////
    return o;
}]);