
const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/user');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar_campos.');

const router = Router();

router.get('/', usuariosGet);

router.post('/',[
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'El password debe ser más de 6 letras').isLength({ min:6 }),
check('correo', 'El correo no es valido').isEmail(),
check('correo').custom(existeEmail),
//check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('rol').custom( esRolValido ),
validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

module.exports = router;