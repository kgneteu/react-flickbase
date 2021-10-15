const express = require("express");
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const formidableMiddleware =require('express-formidable')
let router = express.Router();

///////// Cloudinary ///////////////////////////////////////////////////////////////////////////////////
cloudinary.config({
    cloud_name: process.env.CN_CLOUD_NAME,
    api_key: process.env.CN_API_KEY,
    api_secret: process.env.CN_API_SECRET,
    secure: true
});


///// Multer ////////////////////////////////////////////////////////////////////////////////////////////
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

router.route('/cloudinary_upload')
    .post(formidableMiddleware(), async (req, res) => {
        try {
            const file = req.files.file.path;
            const upload = await cloudinary.uploader.upload(file,
                {
                    public_id: `${Date.now()}`,
                    folder: 'flickbase',
                    aspect_ratio: '1',
                    radius: 'max',
                    crop: 'thumb',
                    gravity: 'face',
                    // responsive_breakpoints:{
                    //     create_derived: true,
                    //     bytes_step: 20000,
                    //     min_width: 200,
                    //     max_width: 2000,
                    // }

                });
            console.log('f:',file)
            console.log('c:',upload)
            res.json({message: 'File was stored'})
        } catch (e) {
            res.status(400).json({message: 'Uploaded failed: ' + e})
        }
    })
module.exports = router;
