var express = require('express');
var router = express.Router();

var quizControler = require('../controllers/quiz_controller'); //Quiz3
var commentController = require('../controllers/comment_controller'); //M9Quiz15
var sessionController = require('../controllers/session_controller'); //M9Quiz16

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});


//M7a Begin
// Autoload de comandos con :quizId // La funcion load se define en el controlador quiz_controller pero necesita cargarse aqui ...
router.param('quizId', quizControler.load); // autoload :quizId
router.param('commentId',commentController.load); //autoload :commentId //M9Quiz18
//M7a End


/* comentado por M7mp
router.get('/quizes/question',quizControler.question); //Quiz3
router.get('/quizes/answer',quizControler.answer); //Quiz3
*/

//M7mp Begin
router.get('/quizes',quizControler.index);                 //lista de preguntas
router.get('/quizes/:quizId(\\d+)',quizControler.show);    //pregunta elegida
router.get('/quizes/:quizId(\\d+)/answer',quizControler.answer);    //pregunta elegida respuesta 
//M7mp 
//M8cp Begin
router.get('/quizes/new', sessionController.loginRequired, quizControler.new); //solicitar formulario para proponer nueva pregunta // LOGINREQUIRED M9Quiz17
router.post('/quizes/create', sessionController.loginRequired, quizControler.create); //para crear nueva pregunta en la BD // LOGINREQUIRED M9Quiz17
//M8cp End
//M8edit Begin
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizControler.edit);  //solicitar formulario para editar una pregunta existente // LOGINREQUIRED M9Quiz17
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizControler.update);  //actualizar la pregunta editada // LOGINREQUIRED M9Quiz17
//M8edit End
//M8borrar Begin
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizControler.destroy);  //Borrar o eliminar la pregunta editada // LOGINREQUIRED M9Quiz17
//M8borrar End

//M9 Begin
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments'   , commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish); //M9Quiz18//LOGINREQUIRED
//M9 End
//M9Quiz16 Begin
// Definición de rutas de sesión
router.get('/login',  sessionController.new); //formulario de login
router.post('/login', sessionController.create); //crear sesión
router.get('/logout', sessionController.destroy); //destruir sesión 
//M9Quiz16 End

router.get('/author',quizControler.author); //Modulo-6 P2P

module.exports = router;
