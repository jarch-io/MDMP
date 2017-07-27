var database = require('./database');
var mongoose = require('mongoose');
var error = require('../util/Error');
var Schema = mongoose.Schema;

var periodsSchema = new Schema({
  fInicio : {
    type : Date,
    required : [true, "Ingrese una fecha de inicio."]
  },
  fFin : {
    type : Date,
    required : [true, "Ingrese una fecha de termino."]
  },
  dias : {
    type : Number,
    required : [true , "Ingrese la cantidad de dias."]
  },
  pago : {
    type : Number,
    required : [true ,"Ingrese un monto de pago."]
  },
  regLaboral : {
    type : String,
    required : [true, "Ingrese un regimen Laboral."]
  },
  area : {
    type : String,
    required : [true, "Ingrese un area."]
  },
  createAt : {
    type : Date,
    default : Date.now
  },
  employee : {
    type : String,
    required : [true, "Ingrese el id del trabajador."]
  }
});

var period = mongoose.model('periods',periodsSchema);

var fieldsExclude = function (str) {
  if(str.trim() == "") str = "_id";
  return str.replace(/employee|createAt|__v/gi,"");
}

module.exports = {
  newPeriod : function (periodo,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No se pudo conectar con la base de datos.",err));

      period.create({
        fInicio : periodo.fInicio,
        fFin : periodo.fFin,
        dias : periodo.dias,
        regLaboral : periodo.regLaboral,
        area : periodo.area,
        employee : periodo.employee,
        pago : periodo.pago
      },function (err,data) {
        if(err){
          next(error.get(404,"No se pudo registrar el periodo.",err));
        }else{
          next(err,data["_doc"]);
        }
        conn && conn.disconnect();
      });
    });
  },
  getPeriodsByEmployee : function (idEmp,fields,cond,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos",err));
      
      period.find({
        employee : idEmp
      },fieldsExclude(fields),{sort : "fFin"},function (err,data) {
        if(err || data.length == 0){
          next(error.get(404,"No se encontraron resultados.",err));
        }else{
          next(err,data);
        }
        conn && conn.disconnect();
      });
    });
  },
  getPeriodById : function (id,fields,params,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No se pudo conectar con la base de datos"));

      period.find({_id : id},fieldsExclude(fields),function (err,data) {
        if(err || data.length == 0){
          next(error.get(404,"No se encontraron resultados.",err));
        }else{
          next(err,data[0]);
        }
        conn && conn.disconnect();
      });
    });
  },
  deleteById : function (id,next) {
    database.execute(function (err,conn) {
      if(err) return next(error.get(500,"No hay conexion con la base de datos",err));

      period.remove({_id : id},function (err,data) {
        if(err){
          return next(error.get(400,"No se pudo eliminar el periodo."));
        }else{
          next(err,data);
        }
        conn && conn.disconnect();
      });
    });
  }
}
