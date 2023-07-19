const ObjectId = require('mongoose').Types.ObjectId;

const validateDBId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
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

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ error })
}

module.exports = {
    validateDBId, 
    raiseRecord404Error, 
    errorHandler
}