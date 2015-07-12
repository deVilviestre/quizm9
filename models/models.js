//M7 //M7h para despliegue BD en Heroku(postgresql)
//Este fichero se ocuparía de todas las tablas individuales y se cargará desde el controlador. Luego cada tabla tendra su fichero en este directorio models
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
exports.Quiz = Quiz; //exportar definicion de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().success(function(){
	//success(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if(count===0){ //la tabla se inicializa solo si está vacía
			Quiz.create(
			{
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			});
			Quiz.create(
			{
				pregunta: 'Capital de Peru',
				respuesta: 'Lima'
			});
			Quiz.create(
			{
				pregunta: 'Capital de Portugal',
				respuesta: 'Lisboa'
			}
			).success(function(){console.log('Base de datos inicializada')});
		};
	});
});