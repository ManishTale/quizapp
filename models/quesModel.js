var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
    
var quesSchema = Schema({
    quesText:String,
});

module.exports=mongoose.model('Question',quesSchema);