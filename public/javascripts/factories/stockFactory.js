app.factory('stockF', ['$http',function($http){
    var o = {};

    o.stocks=[];
    o.xAxisArray=[];
    ////////////////////////////////////////
    o.socket = io( 'localhost:3000' );
    o.socket.on( 'connect', function() { 
        console.log( 'connected' );
    } );
    o.socket.on('addStock', function(msg){
        console.log( "add "+msg );
        o.historyRequest(msg);
    });
 

    o.historyRequest= function(stockName){
        console.log(stockName+" start");
        var d = new Date().setMonth(new Date().getMonth() - 6);
        var dd = new Date(d);
        var dString=[dd.getFullYear(), dd.getMonth()+1,dd.getDate() ].join('-') ;
        
        return $http.get('https://www.quandl.com/api/v3/datasets/WIKI/'+stockName+'/data.json?api_key=Rv-9x2BVx1XW48BRc3ZL&start_date='+dString).success(function(data){
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
        return o.historyRequest(stock.stockName).success(function(response){
            $http.post('/stocks', stock).success(function(response){
                o.socket.emit('addStock', stock.stockName);    
            });
        });
    }; 
   
    o.deleteStock = function(stockname){
        return $http.delete('/stocks/'+ stockname).success(function(response){
            o.socket.emit('deleteStock', stockname);     
        });        
    }
    
    ///////////
    return o;
}]);