const fs = require("fs")
const burgers_menu = require('../../data/preData').burgers_menu

const handleError = (err, res) => {
  return res
    .status(500)
    .json({error: "Oops! Something went wrong!"});
}

exports.upload = (req, res) => {
    if (req.file.originalname in burgers_menu &&
        (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png")) {
      const tempPath = req.file.path
      const fileName = `public/images/${req.file.originalname}.${req.file.mimetype  === "image/jpeg" ? "jpeg" : "png" }`

      fs.rename(
        tempPath,
        fileName,
        (err) => {
          console.log(err)
          if (err) return handleError(err, res);
          burgers_menu[req.file.originalname].image = `/${fileName}`
          return res.status(200).json({
            msg: "File uploaded!",
            burger: {
              ...burgers_menu[req.file.originalname],
              name: req.file.originalname
            }
          })
      })
    } else {
      fs.unlink(req.file.path, err => {
        if (err) return handleError(err, res);

        return res.status(403).json({error: "Check Burger's name if it exists. Only .png and .jpeg files are allowed!"})
      })
    }
}
