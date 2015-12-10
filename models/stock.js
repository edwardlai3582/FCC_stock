var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
  stockName: String,  
  
});

mongoose.model('Stock', StockSchema);