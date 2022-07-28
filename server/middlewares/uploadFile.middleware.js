const path = require('path');

const fileMiddleware = async (req, res, next) => {
    try {
        if (!req.files) {
            res.status(500).send({
                message: "No file uploaded",
            });
        } else {
            let file = req.files.file;
            let ext = path.extname(file.name);
            let newName = file.md5 + ext;
            file.mv("./images/" +  newName);
            req.image = path.relative('/', './images/') + '/' + newName;
            next();
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = fileMiddleware;

