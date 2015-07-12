//Quiz3 //M6 P2P // M7
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


//  GET /author   // Modulo-6 P2P
exports.author = function(req,res){
	res.render('author', {autor: 'Luis Miguel MARTIN', foto: '/turing.jpg'});
};
