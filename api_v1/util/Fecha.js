var moment = require('moment');
/**
 *
 */
var Fecha = (function () {
    /**
     * Examples
     *         Fecha()
     *         Fecha({strdate : string})
     *         Fecha({strdate : string,strinp : string})
     *         Fecha({strdate : string,strinp : string,strout : string})
     * @param {IParams} params Parametros de inicializacion
     */
    function Fecha(params) {
        params = params || {};
        this._formatInput = params.strinp || "DD/MM/YYYY";
        this._formatOutput = params.strout || this._formatInput;
        this._date = params.strdate ? moment(params.strdate, this._formatInput) : moment();
    }
    /**
     * Example
     *       Fecha.get()
     *       Fecha.get({strdate : string})
     *       Fecha.get({strdate : string,strinp : string})
     * @param  {IParams} params
     * @return {Date}
     */
    Fecha.prototype.get = function (params) {
        params = params || {};
        var _strinp = params.strinp || this._formatInput;
        if (params.strdate)
            return moment(params.strdate, _strinp);
        return this._date;
    };
    /**
     * Examples
     *         Fecha.add({cant : integer,type : string})
     *         Fecha.add({date : Date,cant : integer,type : string})
     * @param  {IParams} params
     * @return {Date}
     */
    Fecha.prototype.add = function (params) {
        params = params || {};
        return moment(params.date ? params.date : this._date).add(params.cant, params.type);
    };
    /**
     * Examples
     *         Fecha.format()
     *         Fecha.format({strout : string})
     *         Fecha.format({strdate : string, strout : string})
     *         Fecha.format({date : Date,strout : string})
     *         Fecha.format({strdate : string, strinp : string, strout : string})
     *         Fecha.foamr({date : date,strinp : string,strout : string})
     * @param  {IParams} params
     * @return {string}         Devuelve una cadena de texto representando la fecha segun se solicite
     */
    Fecha.prototype.format = function (params) {
        params = params || {};
        var _strinp = params.strinp || params.strout || this._formatInput;
        var _strout = params.strout || this._formatOutput;
        if (params.strdate)
            return moment(params.strdate, _strinp).format(_strout);
        if (params.date)
            return moment(params.date).format(_strout);
        return moment(this._date, _strinp).format(_strout);
    };
    /**
     * Examples
     *        Fecha.now()
     * @return {Date} Devuelve la fecha actual
     */
    Fecha.prototype.now = function () {
        return moment();
    };
    return Fecha;
}());
module.exports = Fecha;
