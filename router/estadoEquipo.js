const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {validarEstadoEquipo} = require('../helpers/validar-estadoEquipo')
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const router = Router()

// Todos los roles pueden listar los estados
router.get('/', [validarJWT], async function(req, res) {
    try {
        const estados = await EstadoEquipo.find()
        res.send(estados)
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error')
    }
})

// Solo ADMIN puede crear un nuevo estado
router.post('/', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        const validaciones = validarEstadoEquipo(req)
        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre
        estadoEquipo.estado = req.body.estado
        estadoEquipo.fechaCreacion = new Date()
        estadoEquipo.fechaActualizacion = new Date()
        estadoEquipo = await estadoEquipo.save()   
        res.send(estadoEquipo)
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error')
    }
})

// Solo ADMIN puede actualizar un estado
router.put('/:estadoEquipoId', [validarJWT, validarRolAdmin], async function(req,res){
    try{
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId)
        if(!estadoEquipo){
            return res.send('No existe estado')
        }
        estadoEquipo.nombre = req.body.nombre
        estadoEquipo.estado = req.body.estado
        estadoEquipo.fechaActualizacion = new Date()
        estadoEquipo = await estadoEquipo.save()   
        res.send(estadoEquipo)
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error')
    }
})

// Todos los roles pueden obtener un estado específico
router.get('/:estadoEquipoId', [validarJWT], async function(req, res) {
    try {
        const estado = await EstadoEquipo.findById(req.params.estadoEquipoId)
        if (!estado) {
            return res.status(404).send('Estado no existe')
        }
        res.send(estado)
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar Estado Equipo')
    }
 })

module.exports = router
