//M9

var models = require('../models/models.js');

//M9Quiz18 Begin
// Autoload :id de comentarios
exports.load = function(req, res, next, commentId){
  models.Comment.find({where: {id: Number(commentId)}}).then(
    function(comment){
      if (comment) {
        req.comment = comment;
        next();
      } else {
        next(new Error('No existe commentId= '+commentId));
      }
    }
  ).catch(function(error){next(error)});
};

//M9Quiz18 End

//GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

//POST /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.build(
    { texto: req.body.comment.texto,
      QuizId: req.params.quizId }
  );

  comment.validate().then(
    function(err) {
      if (err) {
        res.render('comments/new.ejs',
            {comment: comment, quizid: req.params.quizId, errors: err.errors});
      } else {
        // save: guarda en DB campo texto de comment
        comment.save().then(
          // res.redirect: Redirección HTTP a la lista de preguntas
          function(){ res.redirect('/quizes/'+req.params.quizId)}
        ).catch(function(error){next(error)});
      }
    }
  ).catch(function(error){next(error)});
};

//M9Quiz18 Begin
// GET /quizes/:quizId/comments/:commentId/publish (Esta debiera ser una operación PUT)
exports.publish = function(req, res, next){
  req.comment.publicado = true;
  req.comment.save({fields: ["publicado"]}).then(
    function(){res.redirect('/quizes/'+req.params.quizId);}
  ).catch(function(error){next(error)});
};
//M9Quiz18 End
