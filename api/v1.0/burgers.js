const router = require('express').Router()
const burgers_controller = require('../../controllers/v1.0/burgers_controller')
const upload_controller = require('../../controllers/v1.0/upload_controller')
const multer = require("multer")

const upload = multer({
  dest: "./public/images",
  limits: {fileSize: 5*1024*1024, files: 2}
})

router.get('/', burgers_controller.getAll)
router.post('/', burgers_controller.create)
router.put('/', burgers_controller.update)
router.delete('/', burgers_controller.delete)

router.post('/:name/upload', upload.single("file"), upload_controller.upload)

module.exports = router