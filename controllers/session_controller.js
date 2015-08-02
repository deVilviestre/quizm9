//M9Quiz17 Begin
// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
//M9Quiz17 End

//M9Quiz16 Begin

// GET /login  --Formulario de login
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new', {errors: errors});
};

// POST /login  --Crear la sesión
exports.create = function(req, res){
  var login    = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user){
    if (error) {  //si hay error retornamos mensajes de error de sesión
       req.session.errors = [{"message": 'Se ha producido un error: '+error}];
       res.redirect("/login");
       return;
    }
    // Crear req.session.user y guardar campos id y username
    // La sesión se define por la existencia de: req.session.user
    req.session.user = {id: user.id, username: user.username};
    // Redirección a path anterior a login
	res.redirect(req.session.redir?req.session.redir.toString():"/quizes"); //Si no hay donde redireccionar elijo /quizes
  });
};

// GET /logout  --Destruir la sesión (Debiera de ser DELETE (REST))
exports.destroy = function(req, res){
  delete req.session.user;
  // Redirección a path anterior a login
  res.redirect(req.session.redir?req.session.redir.toString():"/quizes"); //Si no hay donde redireccionar elijo /quizes
};

//M9Quiz16 End