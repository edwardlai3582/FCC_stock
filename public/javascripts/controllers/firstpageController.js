app.controller('firstpageController', ['$scope','$window','barF','authF', function($scope,$window, barF, authF) {

    $scope.user={};
    $scope.bars=barF.bars;
    $scope.isGoin=[];
    
    $scope.search = function(){
        console.log("!search!");
        barF.getAllBars($scope.user.location);
    };

    $scope.goin=function(arrayIndex){
        var whereInArray= $scope.isGoin.indexOf($scope.bars[arrayIndex]);
        //goin
        if(whereInArray===-1){
            $scope.isGoin.push($scope.bars[arrayIndex]);
            //add to DB
        }
        //not goin
        else{
            $scope.isGoin.splice(index, 1); 
            //remove from DB
        }
    }
    
}]);