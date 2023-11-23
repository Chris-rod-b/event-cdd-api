const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;

const uploadDirectory = 'uploads/';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

const errorHandler = (error, req, res, next) => {
  res.status(500).json({ error })
}

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

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    callback(null, Date.now() + ext); 
  },
});

const upload = multer({ storage: storage });

const storageUpdate = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    if (file.originalname == req.body.previousFileName) {
      callback(null, file.originalname);
    } else {
      const ext = path.extname(file.originalname);
      const newFileName = Date.now() + ext;
      
      const previousFilePath = path.join(uploadDirectory, req.body.previousFileName);
      deleteFile(previousFilePath);

      callback(null, newFileName);
    }
  },
});

const update = multer({ storage: storageUpdate });

module.exports = {
  validateDBId, 
  raiseRecord404Error, 
  errorHandler,
  upload,
  update,
  deleteFile
}
