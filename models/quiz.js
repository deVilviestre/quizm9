//M7
//Definicion  del modelo de Quiz
module.exports = function(sequelize, DataTypes){
	return sequelize.define(
		'Quiz',
		{
			pregunta: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta la pregunta"}}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta la respuesta"}}
			},
			tema: {
				type: DataTypes.STRING,
				validate: {
					isIn: {
						args: [[ "Otro","Geografia","Humanidades","Ocio","Ciencia","Tecnologia" ]],
						msg: "-> Tema no v&aacute;lido"
					}
				}
			}
		}
	);
}