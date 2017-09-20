var employeeDB = require('../persistence/employeeDB');
var Employee = require('../entitys/employeeEntity');
var template = require('../util/Template');
var error = require('../util/error');
var Fecha = require('../util/Fecha');

module.exports = {
	new : function (req,res,next) {
		var data  = req.body;

		var employee = new Employee({
			nombres : data.nombres,
			apellidos : data.apellidos,
			dni : data.dni,
			fNacimiento : data.fNacimiento ? new Fecha({strdate : data.fNacimiento}).get() : null,
			cargo : data.cargo,
			sexo : data.sexo
		});

		employeeDB.newEmployee(employee,function (err,data) {
			if(err) return next(err);

			res.status(201);
      res.jsonp(template.render({employee : data},res));
		});
	},
  filter : function (req,res,next) {
    if(req.jio.params.apellidos){
      module.exports.filterByApellidos(req,res,next);
      return;
    }

    if(/pages/gi.test(req.jio.fields)){
      module.exports.getAlphabetByApellidos(req,res,next);
      return;
    }

    res.status(404);
    next(error.get(404,"Not Found"));
  },
  filterByApellidos : function (req,res,next) {
    var str = req.jio.params.apellidos;

    if(str) delete req.jio.params.apellidos;

    if(/^[a-z]{1}$/g.test(str)){

      module.exports.getByLetterApellidos(str,req,res,next);
      return;

    }else if(/^[a-z\s]*$/g.test(str)){

      module.exports.getByTextApellidos(str,req, res, next);
      return;

    }

    res.status(404);
    next(error.get(404,"Not Found"));
  },
  getByDni : function (req,res,next) {
    employeeDB.getEmployeeByDni(req.jio.fields,req.params.dni,function (err,data) {
      if(err) return next(err);

      //data["href"] = req.jio.domain+req.baseUrl+"/"+data["_id"];

      //if(!/_id/gi.test(req.jio.fields)) delete data["_id"];
      
      if(data["fNacimiento"]) data["fNacimiento"] = new Date(data["fNacimiento"]).getTime();

      res.status(200);
      res.jsonp(template.render({employee : data},res));
    });
  },
  getById : function (req,res,next) {
    employeeDB.getEmployeeById(req.jio.fields,req.params.id,function (err,data) {
        if(err) return next(err);

        //data["href"] = req.jio.domain+req.baseUrl+"/"+req.params.id;

        //if(!/_id/gi.test(req.jio.fields)) delete data["_id"];

        res.status(200);
        res.jsonp(template.render({employee : data},res));
      });
  },
  getByLetterApellidos : function (letter,req,res,next) {
    employeeDB.getEmployeesByLetter(req.jio.fields,req.jio.params,letter,function (err,data) {
        if(err) return next(err);

        var lista = [];

        for(var indx in data){
          var emp = data[indx]["_doc"];

          //emp.href = req.jio.domain+req.baseUrl+"/"+emp._id;

          //if(!/_id/gi.test(req.jio.fields)) delete emp._id;

          if(!/dni/gi.test(req.jio.fields)) delete emp.dni;

          lista.push(emp);
        }

        res.status(200);
        res.jsonp(template.render({employees : lista},res));
      });
  },
  getByTextApellidos : function (text,req,res,next) {
    employeeDB.getEmployeesByText(req.jio.fields,req.jio.params,text,function (err,data) {
        if(err) return next(err);

        var lista = [];

        for(var indx in data){
          var emp = data[indx]["_doc"];

          //emp.href = req.jio.domain+req.baseUrl+"/"+emp._id;

          //if(!/_id/gi.test(req.jio.fields)) delete emp._id;

          if(!/dni/gi.test(req.jio.fields)) delete emp.dni;

          lista.push(emp);
        }

        res.status(200);
        res.jsonp(template.render({employees : lista},res));
      });
  },
  getAlphabetByApellidos : function (req,res,next) {
    var habilitado;

    if(req.jio.params.habilitado) habilitado = /true|1/gi.test(req.jio.params.habilitado) ? true : false;

    employeeDB.getEmployeesAlphabet(habilitado,function (err,data) {
      if(err) return next(err);
      
      for(var key in data){
        data[key]["page"] = data[key]["_id"];
        delete data[key]["_id"];
      }
      
      res.status(200);
      res.jsonp(template.render({pages : data},res));
    });
  },
  updateById : function (req,res,next) {
    var params = req.body;
    employeeDB.updateEmployee(req.params.id,{
      nombres : params.nombres,
      apellidos : params.apellidos,
      dni : params.dni,
      fNacimiento : params.fNacimiento ? new Fecha(params.fNacimiento).get() : null,
      cargo : params.cargo,
      photo : params.photo,
      direccion : params.direccion,
      distrito : params.distrito,
      email : params.email,
      sexo : params.sexo,
      telefonos : params.telefonos,
      estadoCivil : params.estadoCivil,
      conyuge : params.conyuge,
      regLaboral : params.regLaboral,
      area : params.area,
      fTerContrato : params.fTerContrato ? new Fecha(params.fTerContrato).get() : null,
      habilitado : params.habilitado,
      hijos : params.hijos,
      updateAt : Date.now()
    },function (err,data) {
      if(err) return next(err);
  
      res.status(200);
      res.jsonp(template.render({},res));
    });
  }
};
