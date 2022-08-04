const User = require('../models/User');
import bcrypt from 'bcryptjs';
import { TypedRequest } from '../types/TypedRequest';
import { User } from '../types/User';
import { Response, Request } from 'express';

const createUser = async (req: TypedRequest<User>, res: Response) => {
  try {
    const pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pass, salt);

    const user: User | undefined = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      const result: User = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });
      req.session.uid = result.id;
      res.status(201);
      res.send('Success');
    } else {
      res.status(400).send('Account already exists.');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Due to error user have not been saved' });
  }
};

const loginUser = async (req: TypedRequest<User>, res: Response) => {
  try {
    const pass = req.body.password!;
    const user = await User.findAll({ where: { email: req.body.email } });
    console.log(user[0].password);
    if (user[0]) {
      if (bcrypt.compareSync(pass, user[0].password)) {
        req.session.id = user.id;
        res.status(200);
        res.send(user);
      } else {
        res.status(401);
        res.send('invalid password');
      }
    } else {
      res.status(401);
      res.send('User does not exist');
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

const profileUser = async (req: TypedRequest<User>, res: Response) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((e) => {
    if (e) res.status(500).send('Something went wrong');
    else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
};

module.exports = { createUser, loginUser, profileUser, logoutUser };
