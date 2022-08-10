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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = require('url');
const path_1 = __importDefault(require("path"));
const fileMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            console.log('Llega aqui?');
            let file = req.files.file;
            if (!Array.isArray(file)) {
                let ext = path_1.default.extname(file.name);
                let newName = file.md5 + ext;
                yield file.mv('./images/' + newName);
                req.body.img_data = url.pathToFileURL(path_1.default.relative('/', `../images/${newName}`));
                req.body.image = path_1.default.relative('/', `../images/${newName}`);
                next();
            }
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('some error with file');
    }
});
module.exports = fileMiddleware;
