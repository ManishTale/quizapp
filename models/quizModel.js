var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var quizSchema = Schema({
    quizCategory:String,
});
module.exports=mongoose.model('Quiz',quizSchema);
