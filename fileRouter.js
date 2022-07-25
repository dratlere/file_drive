const express = require('express'),
    router = express.Router();

    const multer = require('multer'),
    upload = multer()


const fileLogic = require('./fileLogic');


router.post('/upload', upload.single("myFile"), async (req, res) => {
    try {
        const {file} = req
        fileLogic.create(file.originalname, file.buffer)
        res.send("OK")
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/', fileLogic.isValid, async (req, res) => {
    try {
        await fileLogic.create(req.body.filename, req.body.content)
        res.send("ok")
    }
    catch (err) {
        res.status(400).json(err || 'error')
    }
})

router.put('/', fileLogic.isValid, async (req, res) => {
    try {
        return await fileLogic.update(req.body.filename, req.body.content)
    }
    catch (err) {
        res.status(400).json(err || 'error')
    }
})

router.delete('/', async (req, res) => {
    try {
        fileLogic.remove(req.body.filename)
    }
    catch (err) {
        res.status(400).json(err || 'error')
    }
})
module.exports = router;

