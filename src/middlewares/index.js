const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

const uploadDirectory = 'src/uploads/';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    callback(null, Date.now() + ext); // Unique filename
  },
});

const upload = multer({ storage: storage });

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ error })
}

module.exports = {
    validateDBId, 
    raiseRecord404Error, 
    errorHandler,
    upload
}