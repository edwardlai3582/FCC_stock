var express = require('express');
var router = express.Router();
var yelp = require("node-yelp");
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET location */
router.get('/bars/:location', function(req, res) {
  //res.send(req.params.version);
    console.log("req.params.location= "+req.params.location);
    var client = yelp.createClient({
          oauth: {
            "consumer_key": "V6BLNYVnhJuekBq-dr3H3w",
            "consumer_secret": "6L0OInhhEhQmfW-a_sVwF7OLXnE",
            "token": "WINw_DBk20USK6rgdqDLPLadiGpJ-n5F",
            "token_secret": "lWudOKU0i0LYCMfnzbne7TyzVJM"
          },

          // Optional settings: 
          httpClient: {
            maxSockets: 25  // ~> Default is 10 
          }
    });
    
    client.search({
      term: "bars",
      location: req.params.location
    }).then(function (data) {
        console.log(data);
        res.json(data);
    });

});


module.exports = router;
