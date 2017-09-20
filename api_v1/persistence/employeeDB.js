var database = require('./Database');
var mongoose = require('mongoose');
var error = require('../util/Error');
var json = require('../util/json');
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
						nombres : {
							type : String,
							required : [true , "Ingrese los nombres del trabajador."]
						},
						apellidos : {
							type : String,
							required : [true , 'Ingrese los apellidos del trabajador.']
						},
						dni : Number,
						fNacimiento : Date,
						cargo : String,
						sexo : String,
            photo : String,
            direccion : String,
            distrito : String,
            email : String,
            telefonos : Array,
            estadoCivil : String,
            conyuge : String,
            hijos : Array,
            regLaboral : String,
            area : String,
            fTerContrato : Date,
            habilitado : {
              type : Boolean,
              default : true
            },
						createdAt : {
							type : Date,
							default : Date.now
						},
            updatedAt : Date
					});

var employee = mongoose.model('employees',employeeSchema);

var fieldsExclude = function (str) {
  return str.replace(/createdAt|__v|updatedAt/g,"");
}

module.exports = {
	newEmployee : function (emp,next) {
		database.execute(function (err,conn) {
			if(err) return next(error.get(500,"No hay conexion con la base de datos.",err));

			employee.create({
				nombres : emp.getNombres(),
				apellidos : emp.getApellidos(),
				dni : emp.getDni(),
				fNacimiento : emp.getFNacimiento(),
				cargo : emp.getCargo(),
				sexo : emp.getSexo()
			},function (err,data) {
				if(err) {conn && conn.disconnect();return next(error.get(400,"No se registro el trabajador.",err))};
				
				next(err,data["_doc"]);
        conn && conn.disconnect();
			});
		});
	},
  getEmployeeById : function (fields,id,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos",err));

      if(fields.trim() === "") fields = "apellidos nombres";

      employee.findOne({_id : id},fieldsExclude(fields),function (err,data) {
        if(err) {conn && conn.disconnect();return next(error.get(404,"No se encontraron resultados.",err));}

        if(data == null){
          next(error.get(404,"El trabajador no existe."));
        }else{
          next(err,data["_doc"]);
        }
        conn && conn.disconnect();
      });
    });
  },
  getEmployeeByDni : function (fields,dni,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos.",err));

      if(fields.trim() === "") fields = "apellidos nombres";

      employee.findOne({dni : dni},fieldsExclude(fields),function (err,data) {
        if(err) {conn && conn.disconnect();return next(error.get(500,"Ocurrio un error en la base de datos.",err))}
        
        if(data == null){
          next(error.get(404,"El trabajador no existe."));
        }else{
          next(err,data["_doc"]);
        }
        conn && conn.disconnect();
      });
    });
  },
  getEmployeesByLetter : function (fields,params,letter,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos.",err));

      if(fields.trim() == "") fields = "apellidos nombres";
      var wheres = params;
      wheres.apellidos = new RegExp('^'+letter.toLowerCase(),"i");
      
      employee.find(wheres,fieldsExclude(fields)+" dni",{sort : "apellidos"},function (err,data) {
        if(err) {conn && conn.disconnect();return next(error.get(500,"Ocurrio un error en la base de datos.",err))}

        if(data == null || data.length == 0){
          next(error.get(404,"No hay resultados."));
        }else{
          next(err,data);
        }
        conn && conn.disconnect();
      });
    });
  },
  getEmployeesByText : function (fields,params,text,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos.",err));

      if(fields.trim() == "") fields = "apellidos nombres";
      var wheres = params;
      wheres.apellidos = new RegExp(text,"i");
      
      employee.find(wheres,fieldsExclude(fields)+" dni",{sort : "apellidos"},function (err,data) {
        if(err) {conn && conn.disconnect();return next(error.get(500,"Ocurrio un error en la base de datos.",err))}

        if(data == null || data.length == 0){
          next(error.get(404,"No hay resultados."));
        }else{
          next(err,data);
        }
        conn && conn.disconnect();
      });
    });
  },
  getEmployeesAlphabet : function (habilitado,next){
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion en la base de datos",err));

      var conds = [
          {
            $project : {
              letter : {
                $toLower : {$substr : ["$apellidos",0,1]}
              }
            }
          },
          {
            $sort : {letter : 1}
          },{
            $group : {
              _id : "$letter"
            }
          }
        ];

      if(/true|false/gi.test(habilitado)) conds.unshift({$match : {habilitado : habilitado}});
      
      employee.aggregate(conds,function (err,data) {
        if(err) {conn && conn.disconnect();return next(error.get(404,"No se encontraron resultados"));}

        next(err,data);

        conn && conn.disconnect();
      });
    });    
  },
  updateEmployee : function (id,emp,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos."),err);

      employee.findOneAndUpdate({_id : id},{$set : json(emp).clearValuesNull()},function (err,data) {
        if(err){
          next(error.get(400,"No se actualizo el trabajador.",err));
        }else{
          next(err,data);
        }
        conn && conn.disconnect();
      });
    });
  },
  getBirthdays : function (fini,ffin,next) {
    database.execute(function (err,conn) {
      if (err) return next(error.get(500,"No hay conexion con la base de datos",err));

      employee.aggregate([
          {
            $match : {
              $and : [
                {fNacimiento : {$exists : true}},
                {habilitado : true},
              ]
            }
          },
          {
            $project : {
              birthday : "$fNacimiento",
              _id : 0,
              employee : {
                $concat : ["$nombres"," ","$apellidos"]
              },
              photo : 1,
              sexo : 1
            }
          }
        ],function (err,data) {
        if(err || data.length == 0){
          next(error.get(404,"No se encontraron resultados.",err));
        }else{
          next(err,data);
        }
        conn && conn.disconnect();
      });
    });
  },
  getContracts : function (fini,ffin,next) {console.log(fini,ffin);
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos.",err));

      employee.find({
        fTerContrato : {
          $gte : fini,
          $lte : ffin
        }
      },"apellidos fTerContrato nombres cargo area regLaboral",{
        sort : {fTerContrato : 1}
      },function (err,data) {
        if(err){
          next(error.get(500,"Ocurrio un error al tratar de obtener los contratos.",err));
        }else if(data.length == 0){
          next(error.get(404,"No se encontraron contratos en este periodo.",err));
        }else{
          next(err,data)
        }
        conn && conn.disconnect();
      });
    });
  }
};
