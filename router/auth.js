const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const byscript = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const router = Router();

router.post('/', [
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
], async function(req, res){

    try {
        
        //validacion campos requeridos
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).send({ mensaje: 'User no found' });
        }

        const esIgual = byscript.compareSync(req.body.password, usuario.password);
        if (!esIgual) {
            return res.status(400).send({ mensaje: 'User no found'});
        }

        //Generar Token
        const token = generarJWT(usuario);

        res.json({ _id: usuario._id, nombre: usuario.nombre, rol: usuario.rol, 
        email: usuario.email, access_token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Internal server error'});
    }
});


// como es un modulo, lo exportamos
module.exports = router;