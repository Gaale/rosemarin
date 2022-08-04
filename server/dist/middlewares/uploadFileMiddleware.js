"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require('path');
const fileMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.files);
        if (req.files) {
            let file = req.files.file;
            let ext = path.extname(file.name);
            let newName = file.md5 + ext;
            file.mv("./images/" + newName);
            req.image = path.relative('/', './images/') + '/' + newName;
            next();
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("some error with file");
    }
});
module.exports = fileMiddleware;
