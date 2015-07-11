//Quiz3
//  GET /quizes/question
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

//  GET /author   // Modulo-6 P2P
exports.author = function(req,res){
	res.render('author', {autor: 'Luis Miguel MARTIN', foto: '/turing.jpg'});
};
