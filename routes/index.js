var express = require('express');
var router = express.Router();

var quizControler = require('../controllers/quiz_controller'); //Quiz3

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question',quizControler.question); //Quiz3
router.get('/quizes/answer',quizControler.answer); //Quiz3

router.get('/author',quizControler.author); //Modulo-6 P2P

module.exports = router;
