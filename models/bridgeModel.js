var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var bridgeSchema = Schema({
    quesId:{type:Schema.Types.ObjectId , ref:'Question'},
    quizId:{type:Schema.Types.ObjectId , ref:'Quiz'}
});

module.exports=mongoose.model('Bridge',bridgeSchema);
