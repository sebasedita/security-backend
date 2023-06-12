const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const byscript = require('bcryptjs');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn([ 'ADMIN', 'OBSERVADOR' ]),
    validarJWT,  
    validarRolAdmin
], async function(req, res){

    try {
        
        //validacion campos requeridos
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.rol = req.body.rol;

        const salt = byscript.genSaltSync()
        const password = byscript.hashSync(req.body.password, salt);
        usuario.password = password;

        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Internal server error'});
    }

});

router.get('/', [ validarJWT ], async function(req, res){

    try{

        const usuarios = await Usuario.find(); //select * from usuarios where
        res.send(usuarios);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }

});


// como es un modulo, lo exportamos
module.exports = router;