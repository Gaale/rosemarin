import { Response, Request, NextFunction } from 'express';
const url = require('url');
import path from 'path';
import { RecipeType } from '../types/Recipe';

const fileMiddleware = async (
  req: Request<any, any, RecipeType>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.files) {
      console.log('Llega aqui?');
      let file = req.files.file;
      if (!Array.isArray(file)) {
        let ext = path.extname(file.name);
        let newName = file.md5 + ext;
        await file.mv('./images/' + newName);

        req.body.img_data = url.pathToFileURL(
          path.relative('/', `../images/${newName}`)
        );
        req.body.image = path.relative('/', `../images/${newName}`);
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('some error with file');
  }
};

module.exports = fileMiddleware;
