var express = require('express');
var router = express.Router();
var employees = require('../controllers/employeesController');
var periods = require('../controllers/periodsController');

//crear un usuario
router.post('/',employees.new);

//obtener una lista de empleados por la primera letra de su apellido
//{:apellidos(text)}
//{:apellidos(letter)}
//{:(pages)}
router.get('/',employees.filter);

//obtener un trabajador por el numero de dni
router.get('/:dni([0-9]{8})',employees.getByDni);

//obtener un trabajador por su ID
router.get('/:id([0-9a-f]{24})',employees.getById);

//actualizar un trabajador
router.put("/:id([0-9a-f]{24})",employees.updateById);

/**
 *Solicitudes para periodos
*/
//listar los periodos del trabajador
router.get("/:id([0-9a-f]{24})/periods",periods.getByEmployee);

//obtener informacion de periodo especifico
router.get("/:idEmp([0-9a-f]{24})/periods/:id([0-9a-f]{24})",periods.getById)

//agregar un periodo del trabajador
router.post("/:id([0-9a-f]{24})/periods",periods.new);

//eliminar un periodo del trabajador
router.delete("/:idEmp([0-9a-f]{24})/periods/:id([0-9a-f]{24})",periods.delete);

module.exports = router;
