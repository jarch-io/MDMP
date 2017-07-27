var moment = require('moment');

module.exports = function () {
  var _fecha,_format;

  switch(arguments.length){
    case 0:
      _fecha = Date.now();
      break;
    case 1:
      _fecha = arguments[0];
      break;
    case 2:
      _fecha = arguments[0];
      _format = arguments[1];
      break;
  }

  function getDate() {
    if(_format) return moment(_fecha,_format);

    return moment(_fecha);
  }

  function getFormat(format) {
    if(_format) return moment(_fecha,_format).format(format);

    return moment(_fecha).format(format);
  }

  /**
   * Muestra la fecha consignada en el formato de salida solicitado
   * @param  {String} strOut Formato de salida requerido
   * @return {String}        Fecha con el formato solicitado
   */
  this.get = function () {
    if(arguments.length == 0) return getDate();

    if(arguments.length == 1) return getFormat(arguments[0]);
  }

}
