var each = function (data) {
    var a = [];
    for (var it in data) {
        a.push(data[it].message);
    }
    return a;
};
module.exports = {
    get: function (code, msg, err) {
        if (!err)
            err = {};
        err.status = code || 500;
        err.message = msg || "Ocurrio un error. Intentelo nuevamente.";
        err.errors = each(err.errors);
        if (err.code) {
            switch (err.code) {
                case 11000:
                    err.errors.push("Se esta duplicando el resgistro");
                    break;
            }
        }
        return err;
    }
};
