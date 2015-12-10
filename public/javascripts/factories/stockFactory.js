app.factory('stockF', ['$http',function($http){
    var o = {};
    /////
    o.names=[];
    o.labels = [];
    o.data = [];
    ////
    o.getStocks = function() {
        return $http.get('/stocks').then(function(response){
            console.log(response.data);
            angular.copy(response.data, o.names);
            for(var i=0; i<response.data.length;i++){
                $http.get('https://www.quandl.com/api/v3/datasets/WIKI/'+response.data[i]+'/data.json?api_key=Rv-9x2BVx1XW48BRc3ZL&start_date=2015-05-28').success(function(data){
                var temp=[];   
                for(var i=data["dataset_data"]["data"].length-1;i>=0;i--){
                    if(o.labels.length<data["dataset_data"]["data"].length){
                        o.labels.push(data["dataset_data"]["data"][i][0]);    
                    }
                    temp.push(data["dataset_data"]["data"][i][4]); 
                }    
                o.data.push(temp);    
                });
            }
        });    
    };
 
    o.addStock = function(stock) {
        return $http.post('/stocks', stock).success(function(stock){
            o.names.push(stock.stockName);
            $http.get('https://www.quandl.com/api/v3/datasets/WIKI/'+stock.stockName+'/data.json?api_key=Rv-9x2BVx1XW48BRc3ZL&start_date=2015-05-28').success(function(data){
                var temp=[];   
                for(var i=data["dataset_data"]["data"].length-1;i>=0;i--){
                    if(o.labels.length<data["dataset_data"]["data"].length){
                        o.labels.push(data["dataset_data"]["data"][i][0]);    
                    }
                    temp.push(data["dataset_data"]["data"][i][4]); 
                }    
                o.data.push(temp);    
            });
        });
    }; 
   
    
    return o;
}]);