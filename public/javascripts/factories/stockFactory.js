app.factory('stockF', ['$http',function($http){
    var o = {};
    
    o.history=["fff"];
    
    /////
    o.name=['FB'];
     o.labels = [];
  o.series = ['test'];
  o.data = [
    [],
  ];
    ////

    o.getStocks = function() {
        return $http.get('https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=Rv-9x2BVx1XW48BRc3ZL&start_date=2015-05-28').success(function(data){
            console.log(data["dataset_data"]["data"]);
            angular.copy(data["dataset_data"]["data"], o.history);
            for(var i=o.history.length-1;i>=0;i--){
                o.labels.push(o.history[i][0]);
                o.data[0].push(o.history[i][4]); 
            }
        });
    };     
    
 
   
    return o;
}]);