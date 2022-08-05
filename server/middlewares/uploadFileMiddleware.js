import { Response, Request, NextFunction } from 'express';

import path from 'path';

const fileMiddleware = async (req, res, next) => {
  try {
    console.log('REq.Files ===========', req.files);
    if (req.files) {
      console.log('Llega aqui?');
      let file = req.files.file;
      let ext = path.extname(file.name);
      let newName = file.md5 + ext;
      file.mv('./images/' + newName);
      req.image = path.relative('/', './images/') + '/' + newName;
      next();
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('some error with file');
  }
};

module.exports = fileMiddleware;
