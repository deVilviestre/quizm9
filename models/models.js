//M7
//Este fichero se ocuparía de todas las tablas individuales y se cargará desde el controlador. Luego cada tabla tendra su fichero en este directorio models
var path = require('path');
//Cargar Modelo ORM
var Sequelize = require('sequelize');
//Usar BBDD SQLite: (se indica con el dialecto y se concreta aqui el fichero en el que se guardar la tabla Quiz)
var sequelize = new Sequelize(null,null,null,{dialect: "sqlite", storage: "quiz.sqlite"});
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
			}
			).success(function(){console.log('Base de datos inicializada')});
		};
	});
});