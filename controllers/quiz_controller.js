//Quiz3 //M6 P2P // M7 //M7 multiples preguntas: M7mp
//  GET /quizes/question
/*
exports.question = function(req,res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

//  GET /quizes/answer
exports.answer = function(req,res){
	if(req.query.respuesta==='Roma'){
		res.render('quizes/answer',{respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer',{respuesta: 'Incorreto'});
	}
};
*/

var models = require('../models/models.js'); //El controlador debe importar el modelo para acceder a la BD. Luego metodos de Quiz como findAll y find permiten acceso a registros

/* --comentado por M7mp
//GET /quizes/question //M7
exports.question = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{pregunta: quiz[0].pregunta});
	})
};

//GET /quizes/answer //M7
exports.answer = function(req,res){
	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta===quiz[0].respuesta){
			res.render('quizes/answer',{respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer',{respuesta: 'Incorrecto'});
		}
		
	})
};
*/

//M7mp Begin
//GET /quizes/:quizId
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: quiz});
	})
};

//GET /quizes/:quizId/answer
exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta===quiz.respuesta){
			res.render('quizes/answer',{quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer',{quiz: quiz, respuesta: 'Incorrecto'});
		}
		
	})
};

//GET /quizes   (todas las preguntas)
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes: quizes});
	})
};
//M7mp End

//  GET /author   // Modulo-6 P2P
exports.author = function(req,res){
	res.render('author', {autor: 'Luis Miguel MARTIN', foto: '/turing.jpg'});
};
