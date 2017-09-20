var employeeDB = require('../persistence/employeeDB');
var Fecha = require('../util/Fecha');
var template = require('../util/Template');

module.exports = {
  get : function (req,res,next) {
    var f = new Fecha();
    var params = req.jio.params;
    var fini = params.fInicio ? f.get({strdate : params.fInicio}) : f.get();console.log(fini);
    var ffin = params.fFinal ? f.get({strdate : params.fFinal}) : f.add({cant : 30,type : "days",date : fini});console.log(ffin);

    employeeDB.getBirthdays(f.format({date : fini,strout : "DD/MM"}).split("/"),f.format({date : ffin,strout : "DD/MM"}).split("/"),function (err,data) {
      if(err) return next(err);

      res.status(200);
      res.jsonp(template.render({birthdays : data},res));
    });
  }
}
