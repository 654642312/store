const multer = require('multer');
const { v4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    }
});

module.exports = multer({storage});