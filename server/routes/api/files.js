const express = require("express");
const multer = require('multer')
let router = express.Router();


///// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage, fileFilter})

router.route('/multerupload').post(upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({message: 'Upload failed!'})
        res.json({message: 'File was stored'})
    } catch (e) {
        res.status(400).json({message: 'Uploaded failed: ' + e})
    }
})
module.exports = router;
