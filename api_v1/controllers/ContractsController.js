var employeeDB = require('../persistence/employeeDB');
var Fecha = require('../util/Fecha');
var Template = require('../util/Template');
module.exports = {
    get: function (req, res, next) {
        var f = new Fecha();
        var params = req.jio.params;
        var fini = params.fInicio ? f.get({ strdate: params.fInicio }) : f.get();
        var ffin = params.fFinal ? f.get({ strdate: params.fFinal }) : f.add({ date: fini, cant: 30, type: "days" });
        employeeDB.getContracts(fini, ffin, function (err, data) {
            if (err)
                return next(err);
            var lista = [];
            for (var i in data) {
                var contr = data[i]["_doc"];
                contr["fTerContrato"] = new Date(contr["fTerContrato"]).getTime();
                lista.push(contr);
            }
            res.status(200);
            res.jsonp(Template.render({ contracts: lista }, res));
        });
    }
};
