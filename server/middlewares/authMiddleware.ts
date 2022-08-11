const User = require('../models/User.js');
import { Request, Response, NextFunction } from 'express';
import { TypedSessionData } from '../types/TypedSession';
import { User } from '../types/User';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session: TypedSessionData = req.session;
    const uid = session.uid;

    if (uid) {
      req.body.user = await User.findByPk(uid);
      next();
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
};

module.exports = authMiddleware;
