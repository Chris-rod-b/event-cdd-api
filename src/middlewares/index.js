const ObjectId = require('mongoose').Types.ObjectId;

const validateDbId = (req, res, next) => {
    if (!!ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            error: 'Id usado nao valido!',
            id: req.params.id
        })
    } else 
        next();
}

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error: 'Registro nao encontrado!',
        id: req.params.id
    }) 
}

module.exports = {
    validateDbId, raiseRecord404Error
}