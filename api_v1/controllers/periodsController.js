var periodDB = require('../persistence/periodsDB');
var template = require('../util/Template');
var error = require('../util/error');
var fecha = require('../util/Fecha');

module.exports = {
  new : function (req,res,next) {
    var params = req.body;
    periodDB.newPeriod({
      fInicio : new fecha(params.fInicio,"DD/MM/YYYY").get(),
      fFin : new fecha(params.fFin,"DD/MM/YYYY").get(),
      dias : params.dias,
      pago : params.pago,
      regLaboral : params.regLaboral,
      area : params.area,
      employee : req.params.id,
      cargo : params.cargo
    },function (err,data) {
      if(err) return next(err);

      res.status(200);
      res.jsonp(template.render({period : {
        href : data._id,
        fInicio : new Date(data.fInicio).getTime(),
        fFin : new Date(data.fFin).getTime(),
        dias : data.dias,
        pago : data.pago,
        regLaboral : data.regLaboral,
        area : data.area,
        cargo : data.cargo
      }},res));
    });
  },
  getByEmployee: function (req,res,next) {
    periodDB.getPeriodsByEmployee(req.params.id,req.jio.fields,req.jio.params,function (err,data) {
      if(err) return next(err);

      var lista = [];
      for(var i in data){
        var per = data[i]["_doc"];

        if(per["fInicio"]) per["fInicio"] = new Date(per["fInicio"]).getTime();
        if(per["fFin"]) per["fFin"] = new Date(per["fFin"]).getTime();
        
        lista.push(per);
      }

      res.status(200);
      res.jsonp(template.render({periods : lista},res));
    });
  },
  getById : function (req,res,next) {
    periodDB.getPeriodById(req.params.id,req.jio.fields,req.jio.params,function (err,data) {
      if(err) return next(err);

      data = data["_doc"];
      data["href"] = req.jio.domain+req.baseUrl+req.url;
      delete data._id;

      if(data["fFin"]) data["fFin"] = new Date(data["fFin"]).getTime();
      if(data["fInicio"]) data["fInicio"] = new Date(data["fInicio"]).getTime();

      res.status(200);
      res.jsonp(template.render({period : data},res));
    });
  },
  delete : function (req,res,next) {
    periodDB.deleteById(req.params.id,function (err,data) {
      if(err) return next(err);

      res.status(200);
      res.jsonp(template.render(null,res));
    });
  }
}
