const {check} = require('express-validator')
const {validateResult} = require('../helpers/validateHelper')
const User = require('../model/user');

exports.validateUser = [
    check('name').exists().withMessage('name field must exist').not().isEmpty().withMessage('Field name cannot be empty'),
    check('lastname').exists().not().isEmpty(),
    check('gender').exists().not().isEmpty(),
    check('age').exists().isNumeric(),
    check('email').exists().isEmail().custom(async value => {
        const userFound = await User.findOne({email: value})
        if(userFound) {throw new Error("Email ya existe")}
        return true
    }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]