var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var ansSchema = Schema({
    ansText:String,
    option:Boolean,
    quesId:{type:Schema.Types.ObjectId , ref:'Question'}
});

module.exports=mongoose.model('Answer',ansSchema);
