const quizModel = require('../models/quizModel');
const bridgeModel = require('../models/bridgeModel');
const quesModel = require('../models/quesModel');
const ansModel = require('../models/ansModel');
exports.createQuiz = function (req, res) {
    var newQuiz = req.body;
    var addQuiz = new quizModel({
        quizCategory: newQuiz.quizCategory
    });

    quizModel(addQuiz).save(function (err, result) {
        if (err) {
            res.send('error adding quiz');
            console.log(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });

};

exports.updateQuiz = (req, res) => {
    var newQuiz = req.body;
    quizModel.findOneAndUpdate({
        _id: req.params.quizId
    }, {
            $set:
                { quizCategory: newQuiz.quizCategory }
        },
        { upsert: true },
        function (err, result) {
            if (err) {
                res.send('error updating quiz');
            } else {
                res.send(result);
                console.log(result);
            }
        });
};

exports.deleteQuiz = (req, res) => {
    quizModel.findOneAndRemove({
        _id: req.params.quizId

    }, (err, quiz) => {
        if (err) {
            res.send('error deleting quiz');
        } else {
            console.log(quiz);
            res.status(204);
            res.send(quiz);
            bridgeModel.findOneAndRemove({ quizId: req.params.quizId }, (err, result) => {
                console.log(result);
                //res.status(result);
            });
        }
    });
    res.send("Deleted Quiz" + "Deleted Bridge");
}

exports.displayOneQuiz = (req, res) => {

    quizModel.find({ _id: req.params.quizId }).populate().exec((err, quizRes) => {
        if (err) {
            console.log(err);
            res.send('no such quiz');
        } else {

            console.log(quizRes);
            //res.send(quizRes);
            bridgeModel.find({ quizId: req.params.quizId }).populate('quesId').exec((err, quiz) => {
                if (err) {
                    console.log(err);
                    res.send('error diaplaying data');
                } else {

                    console.log(quiz);

                    for (var a = 0; a < quiz.length; a++) {
                        console.log(quiz[a].quesId._id);
                        ansModel.find({ quesId: quiz[a].quesId._id }).populate('quesId').exec((err, resMap) => {
                            if (err) {
                                console.log(err);
                                res.status('error getting data');
                            } else {
                                console.log(resMap);
                                if(resMap.length>0)
                                {
                                    res.send(quizRes + quiz + resMap);
                                }
                                else{
                                    res.send('No Data');
                                }

                            }
                        });
                    }
                    // res.json(quiz);

                }

            });
            // res.send("Quiz"+quizRes+"Question"+quiz+"Answer"+ans);
        }

    });

}

exports.displayAllQuiz = (req, res) => {
    quizModel.find().populate().exec((err, quiz) => {
        if (err) {
            console.log(err);
            res.status('error getting data');
        } else {
            console.log(quiz);
            res.send(quiz);
        }
    });
}



