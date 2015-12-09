app.factory('barF', ['$http','authF',function($http,authF){
    var o = {};
    
    o.bars=[];

    o.getAllBars = function(location) {
        return $http.get('/bars/'+location )
               .success(function(data){
                  console.log(data);    
                  angular.copy(data.businesses, o.bars);
               });
    };     
    /*
    o.createPoll = function(poll) {
        return $http.post('/polls', poll, {
            headers: {Authorization: 'Bearer '+authF.getToken()}
        });          
    };
    
    o.getPoll = function(id) {
        return $http.get('/polls/' + id).then(function(res){
            console.log("res= "+JSON.stringify(res.data));
            return res.data;
        });
    };
    
    o.deletePoll = function(id) {
        return $http.delete('/polls/' + id, {
            headers: {Authorization: 'Bearer '+authF.getToken()}
        });
    };
    
    o.vote = function(pollId, option) {
        return $http.put('/polls/' + pollId + '/options/'+ option, null, {
            headers: {Authorization: 'Bearer '+authF.getToken()}
        });
    }; 
    */
    return o;
}]);