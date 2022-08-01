const path = require('path');

const fileMiddleware = async (req, res, next) => {
    try {
        console.log(req.files);
        if(req.files) {
            let file = req.files.file;
            let ext = path.extname(file.name);
            let newName = file.md5 + ext;
            file.mv("./images/" + newName);
            req.image = path.relative('/', './images/') + '/' + newName;
            next();
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("some error with file");
    }
}

module.exports = fileMiddleware;

