//Quiz3 //M6 P2P // M7 //M7 multiples preguntas: M7mp //M7 autoload: M7a  //M7p2p //M8 crear pregunta:  //M8 validaciones: M8v
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

//M7a Begin
// Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.find({
		where: {id: Number(quizId)},
		include: [{model: models.Comment}]
	}).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			} else {next(new Error('No existe quizId='+quizId));}
		}
	).catch(function(error){next(error);});
};
//M7a End

//M7mp M7a Begin
//GET /quizes/:quizId
exports.show = function(req,res){
	res.render('quizes/show',{quiz: req.quiz, errors: []});
};

//GET /quizes/:quizId/answer
exports.answer = function(req,res){
	var resultado='Incorrecto';
	if(req.query.respuesta===req.quiz.respuesta){
		resultado='Correcto';
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
};

//GET /quizes   (todas las preguntas)
exports.index = function(req,res){
	if(req.query.search){ //se filtra, se buscan preguntas
		var search='%'+req.query.search.replace(/ /g, '%')+'%';
		models.Quiz.findAll({where: ["pregunta like ?", search], order: 'pregunta ASC'}).then(function(quizes){
		res.render('quizes/index.ejs',{quizes: quizes, errors: []});
		}).catch(function(error){next(error);})		
	} else { // no se filtra, se mostraran todas las preguntas
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes: quizes, errors: []});
		}).catch(function(error){next(error);})
	}
};
//M7mp M7a End

//M8cp Begin
// GET /quizes/new
exports.new = function(req,res){
	var quiz=models.Quiz.build({pregunta: 'Pregunta', respuesta: 'Respuesta', tema: 'Otro'}); //creo objeto quiz para proponerlo como el nuevo ...
	res.render('quizes/new',{quiz: quiz, errors: []}); //a la vista new
};

// POST /quizes/create
exports.create = function(req,res){
	var quiz=models.Quiz.build(req.body.quiz); //viene del formulario por elegir esos nombres de campo tipo objeto[propiedad] !!
	//ahora guardamos en la BD la pregunta
	/*
	quiz.save({fields: ['pregunta','respuesta']}).then(function(){
		res.redirect('/quizes'); //tras meter la nueva pregunta en la BD se hace redireccion a la lista de preguntas para verla (no hay vista propia)
	})
	*/
	quiz.validate().then(
		function(err){
			if(err){
				res.render('quizes/new',{quiz: quiz, errors: err.errors}); //proponemos otra vez nueva pregunta conservando lo ya puesto 
			} else {
				quiz.save({fields: ["pregunta","respuesta","tema"]})  //guarda en la BD
				.then(function(){res.redirect('/quizes')})     //redirige a lista de preguntas (no vista propia a renderizar)
			}
		}
	);
};
//M8cp End

//M8edit Begin
//GET /quizes/:quizId/edit
exports.edit = function(req,res){
	var quiz=req.quiz; //el autoload nos la ha cargado
	res.render('quizes/edit',{quiz: quiz, errors: []});
};

exports.update = function(req,res){
	req.quiz.pregunta=req.body.quiz.pregunta;  //recogemos del formulario
	req.quiz.respuesta=req.body.quiz.respuesta;//recogemos del formulario
	req.quiz.tema=req.body.quiz.tema;//recogemos del formulario
	
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz  //save guarda en la BD los campos que digamos
				.save({fields: ["pregunta","respuesta","tema"]})
				//.update({pregunta: req.quiz.pregunta, respuesta: req.quiz.respuesta})
				.then(function(){res.redirect('/quizes');});  //redireccion a lista de preguntas, no hay vista propia a renderizar tras editar una pregunta
			}
		}
	);
	
};
//M8edit End

//M8borrar Begin
exports.destroy = function(req,res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};
//M8borrar End

//  GET /author   // Modulo-6 P2P
exports.author = function(req,res){
	res.render('author', {autor: 'Luis Miguel MARTIN', foto: '/turing.jpg', errors: []});
};
