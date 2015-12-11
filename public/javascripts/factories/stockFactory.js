app.factory('stockF', ['$http','$q',function($http, $q){
    var o = {};
    /////
    o.stocks=[];
    o.xAxisArray=[];
    ////
    o.historyRequest= function(stockName){
        console.log(stockName+" start");
        return $http.get('https://www.quandl.com/api/v3/datasets/WIKI/'+stockName+'/data.json?api_key=Rv-9x2BVx1XW48BRc3ZL&start_date=2015-05-28').success(function(data){
                var temp={};
                var tempData=[];
                temp['name']=stockName;
                for(var i=data["dataset_data"]["data"].length-1;i>=0;i--){
                    if(o.xAxisArray.length<data["dataset_data"]["data"].length){
                        o.xAxisArray.push(data["dataset_data"]["data"][i][0]);    
                    }
                    tempData.push(data["dataset_data"]["data"][i][4]); 
                }    
                temp['data']=tempData;
                o.stocks.push(temp);
                console.log(stockName+" finished");
        });
    }
    
    o.getStocks = function() {
        return $http.get('/stocks').then(function(response){            
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
            o.historyRequest(stock.stockName);      
        });
    }; 
   
    o.deleteStock = function(stockname){
        return $http.delete('/stocks/'+ stockname);        
    }
    
    ///////////
    return o;
}]);