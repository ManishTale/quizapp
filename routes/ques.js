const express = require('express');
const router = express.Router();

const quesController = require('../Controller/quesController');
const quizController = require('../Controller/quizController');
const bridgeController = require('../Controller/bridgeController');
//quiz
router.post('/quiz/create',quizController.createQuiz);
router.put('/quiz/:quizId',quizController.updateQuiz);
router.delete('/quiz/:quizId',quizController.deleteQuiz);

router.get('/quiz/:quizId',quizController.displayOneQuiz);
router.get('/quiz',quizController.displayAllQuiz);

//ques
router.post('/ques/create',quesController.addQuesAns);
router.put('/ques/:quesId',quesController.updateQuesAns);
router.delete('/ques/:quesId',quesController.deleteQuesAns);

router.get('/ques',quesController.displayAllQues);

//ans
router.get('/ans/:quesId',quesController.displayAns);

//bridge
router.post('/bridge/map',bridgeController.addMapping);
router.delete('/bridge/map',bridgeController.removeMapping);

module.exports=router;  