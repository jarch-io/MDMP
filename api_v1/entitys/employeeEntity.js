module.exports = function (args) {
	var nombres;
	var apellidos;
	var dni;
	var fNacimiento;
	var cargo;
	var sexo;
  var habilitado;
  var photo;
  var direccion;
  var distrito;
  var email;
  var telefonos;
  var estadoCivil;
  var conyuge;
  var hijos;
  var id;

	/*
		Metodos privados
	 */
	function init() {
		//validar los argumentos
		nombres = args.nombres;
		apellidos = args.apellidos;
		dni = args.dni;
		fNacimiento = args.fNacimiento;
		cargo = args.cargo;
		sexo = args.sexo;
    habilitado = args.habilitado;
    photo = args.photo;
    direccion = args.direccion;
    distrito = args.distrito;
    email = args.email;
    telefonos = args.telefonos;
    estadoCivil = args.estadoCivil;
    conyuge = args.conyuge;
    hijos = args.conyuge;
    id = args.id;
	}

	/*
		Metodos publicos
	 */
	this.getNombres = function () {
		return nombres;
	}

	this.getApellidos = function () {
		return apellidos;
	}

	this.getDni = function () {
		return dni;
	}

	this.getFNacimiento = function () {
		return fNacimiento;
	}

	this.getCargo = function () {
		return cargo;
	}

	this.getSexo = function () {
		return sexo;
	}

	this.toString = function () {
		return apellidos+" "+nombres;
	}

	init();
}
