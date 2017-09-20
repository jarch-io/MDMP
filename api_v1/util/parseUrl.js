module.exports = function (url) {
    /**
     * Objeto con todas los parametros encontrados con sus respectivos valores
     * @type {Object}
     */
    var params = {};
    /**
     * Array que contiene todos los fields encontrados en la url
     * @type {Array}
     */
    var fields = [];
    /**
     * Coleccion de valores encontrados
     * @type {Array}
     */
    var values = [];
    /**
     * Nos recorre todos los posibles fields
     * @param  {String} fields cadenas en donde se encuentran los fields buscados. Su formato es el siguiente ":(field1,field2,...,fieldN)"
     */
    function parseFields(f) {
        var strArr = f.split(',');
        for (var i in strArr) {
            fields.push(strArr[i]);
        }
    }
    /**
     * obtiene el nombres del parametro y su valor
     * @param  {String} params Cadena en donde se obtiene el parametro que se busca. Tiene el siguiente formato "::name(value)"
     */
    function parseParams(p) {
        var str = p.split("(");
        params[str[0]] = str[1];
    }
    /**
     * decodifica la cadena del url
     * @param  {String} url cadena donde esta toda la url
     */
    function parseUrl(url) {
        var matchs = url.split(/:/g);
        for (var i in matchs) {
            var str = matchs[i];
            if (str === "")
                continue;
            if (/^\(.*\)$/g.test(str)) {
                parseFields(str.replace(/\(|\)/g, ""));
                continue;
            }
            if (/^[a-zA-Z]*\(.*\)$/g.test(str)) {
                parseParams(str.replace(/\)$/g, ""));
                continue;
            }
            values.push(str);
        }
    }
    parseUrl(url);
    return {
        getFields: function () {
            return fields;
        },
        getValues: function () {
            return values;
        },
        getParams: function () {
            return params;
        }
    };
};
