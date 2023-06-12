const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    const payload = { _id: usuario._id, nombre: usuario.nombre,
    email: usuario.email, password: usuario.password, rol: usuario.rol };
    const token = jwt.sign(payload, '123456', { expiresIn: '2h' });
    return token;
}

module.exports = {
    generarJWT
}