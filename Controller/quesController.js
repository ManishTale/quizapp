const quesModel = require('../models/quesModel');
const ansModel = require('../models/ansModel');
const bridgeModel = require('../models/bridgeModel');
exports.addQuesAns = function (req, res) {
    var newQues = req.body;
    var addQues = new quesModel({
        quesText: newQues.quesText
    });

    quesModel(addQues).save(function (err, result) {
        if (err) {
            // res.send('error saving quiz');
            res.send('error adding ques');
            console.log(err);
        } else {
            console.log(result);
            //res.json(result);
            //store answer data
            var arr = [];
            for (let i = 0; i < 4; i++) {
                var obj = new ansModel;
                obj.ansText = req.body["ansText" + i];
                console.log("ansText" + i);
                console.log(req.body.option);
                if (req.body.option == "ansText" + i) {

                    obj.option = true;

                } else {
                    obj.option = false;
                }
                console.log(obj.option);
                obj.quesId = result._id;
                console.log(obj);
                arr.push(obj);

            }
            //console.log(arr); 
            ansModel.insertMany(arr, (err, resAns) => {
                if (err) {
                    res.send('error saving quiz');
                    console.log(err);
                } else {
                    console.log(resAns);
                    //res.json(result +  resAns);
                    res.send("Question:" + result + "Answer" + resAns);

                }
            });

        }
    });
};


exports.updateQuesAns = (req, res) => {
    var quesId = req.params.quizId;
    var newQues = req.body;

    quesModel.findOneAndUpdate({
        _id: req.params.quesId
    },
        {
            $set:
            {
                quesText: newQues.quesText,
            }
        },

        function (err, resQues) {
            if (err) {
                res.send('error updating question');
            } else {
                //      res.send(resQues);
                console.log(resQues);
                ansModel.find({ "quesId": resQues._id }, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.send('error updating answer');
                    }
                    else {
                        console.log(data);

                        var arr = [];
                        var arrId = [];
                        var arrVal = [];
                        for (let i = 0; i < data.length; i++) {
                            //var objId=[];
                            var obj = {};
                            var objId = {};
                            var objOp = {};
                            obj.ansText = req.body["ansText" + i];
                            objId = data[i]._id;
                            if (req.body.option == "ansText" + i) {
                                obj.option = true;
                                objOp = {
                                    updateOne: {
                                        filter: { "_id": data[i]._id },
                                        update: {
                                            $set:
                                                { ans_text: req.body['option' + i], isCorrect: true }
                                        }
                                    }
                                }
                                console.log(objOp);
                            } else {
                                objOp = {
                                    updateOne: {
                                        filter: { "_id": data[i]._id },
                                        update: {
                                            $set:
                                                { ans_text: req.body['option' + i], isCorrect: false }
                                        }
                                    }
                                }
                                obj.option = false;
                                console.log(objOp);
                            }

                            obj.quesId = req.params.quesId;
                            //   console.log(obj); 
                            arr.push(obj);
                            arrId.push(objId);
                            arrVal.push(objOp);
                            console.log(arrVal);
                        }
                        //  console.log(arr); 
                        ansModel.bulkWrite(arrVal, (err, resAns) => {
                            if (err) {
                                console.log(err);

                            }
                            else {
                                console.log(resAns);

                            }
                        });
                    }
                });

                //console.log(a);
                res.send("Question" + resQues + "Answer" + data + resAns);

            }

        });
}

exports.deleteQuesAns = (req, res) => {
    quesModel.findOneAndRemove({
        _id: req.params.quesId

    }, (err, quiz) => {
        if (err) {
            res.send('error deleting ques');
        } else {
            console.log(quiz);
            ansModel.remove({ quesId: req.params.quesId }, (err, resAns) => {

                console.log(resAns);
            });
            bridgeModel.remove({ quesId: req.params.quesId }, (err, ret) => {
                console.log(ret);
            });
        }
    });
    res.send('Deleted Question' + 'Deleted Ans'  + 'Deleted Bridge' );
}

exports.displayAns = (req, res) => {
    ansModel.find({ quesId: req.params.quesId }).populate('quesId').exec((err, resMap) => {
        if (err) {
            console.log(err);
            res.status('error getting data');
        } else {
            //console.log(resMap[a] + resMap[a].quesId.quesText +resMap[a].ansText );
            console.log(resMap);
            res.send(resMap);
            // res.render(resMap);
            // res.json(resMap);
        }
        // res.json(resMap);
    });
}

exports.displayAllQues = (req, res) => {
    quesModel.find().populate().exec((err, ques) => {
        if (err) {
            console.log(err);
            res.status('error getting data');
        } else {
            //console.log(resMap[a] + resMap[a].quesId.quesText +resMap[a].ansText );
            console.log(ques);
            res.send(ques);
            // res.render(resMap);
            // res.json(resMap);
        }
    });
}
