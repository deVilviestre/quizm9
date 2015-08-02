//M7 //M7h para despliegue BD en Heroku(postgresql) //M9
//Este fichero se ocupar�a de todas las tablas individuales y se cargar� desde el controlador. Luego cada tabla tendra su fichero en este directorio models
var path = require('path');

//M7h begin
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;
//M7h end

//Cargar Modelo ORM
var Sequelize = require('sequelize');


//Usar BBDD SQLite: (se indica con el dialecto y se concreta aqui el fichero en el que se guardar la tabla Quiz)
//var sequelize = new Sequelize(null,null,null,{dialect: "sqlite", storage: "quiz.sqlite"}); //comentado por M7h
//M7h Begin
// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(
	DB_name, user, pwd,
	{
		dialect:	protocol,
		protocol:	protocol,
		port:		port,
		host:		host,
		storage:	storage, //solo SQLite (.env)
		omitNull:	true     //solo Postgres
	}
);
//M7h End


//Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importar la definicion de la tabla Comment de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Relaciones entre tablas
Comment.belongsTo(Quiz, {onDelete: 'cascade'});
Quiz.hasMany(Comment);

exports.Quiz = Quiz; //exportar definicion de tabla Quiz
exports.Comment = Comment; //exportar definicion de tabla Comment

// sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().then(function(){
	//then success(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count===0){ //la tabla se inicializa solo si est� vac�a
		    Quiz.bulkCreate( 
              [ {pregunta: 'Capital de Puerto Rico',	respuesta: 'San Juan', 	tema: 'Geografia'}, 
                {pregunta: 'Capital de Zambia',			respuesta: 'Lusaka', 	tema: 'Geografia'}, 
                {pregunta: 'Capital de Italia',			respuesta: 'Roma', 		tema: 'Geografia'}, 
                {pregunta: 'Capital de Portugal',		respuesta: 'Lisboa', 	tema: 'Geografia'}, 
                {pregunta: 'Capital de Peru',			respuesta: 'Lima', 		tema: 'Geografia'}, 
                {pregunta: 'Color de la sangre',		respuesta: 'Rojo', 		tema: 'Ciencia'}
              ]
            ).then(function(){console.log('Base de datos inicializada (quiz).')});

			/*
			Quiz.create(
			{
				pregunta: 'Capital de Puerto Rico',
				respuesta: 'San Juan'
			});
			*/
		};
	});
});