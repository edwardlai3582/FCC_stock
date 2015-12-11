var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET stocks. */
router.get('/stocks', function(req, res, next) {
  Stock.find(function(err, stocks){
    if(err){ return next(err); }
    nameArray=[];
    for(var i=0; i<stocks.length; i++){
        nameArray.push(stocks[i].stockName);    
    }  
    res.json(nameArray);
  });
});

/* POST stock. */
router.post('/stocks', function(req, res, next) {
  var stock = new Stock(req.body);

  stock.save(function(err, stock){
    if(err){ return next(err); }

    res.json(stock);
  });
});

/* DELETE stock. */
router.delete('/stocks/:name', function(req, res, next) {
    console.log(req.params.name);
    Stock.findOneAndRemove({'stockName': req.params.name}, function(err){
        if(err){ return next(err); }
        console.log("delete success");
        res.send("delete success");
    });
});

module.exports = router;
