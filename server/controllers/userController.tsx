import { Request, Response } from 'express';
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (req: Request, res: Response) => {
  try {
    if(!req.session){throw new Error('missing session')}
      const pass = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(pass, salt);

      const user = await User.findAll({ where: { email: req.body.email } });
      if(!user[0]) {
          const result = await User.create({
              name: req.body.name,
              email: req.body.email,
              password: password,
          });
          
          req.session.sid = result.id;
          res.status(201).send('Success');
      } else {
          res.status(400).send('Account already exists.');
      }
  } catch (err) {
      console.log(err);
      res.status(500).send({"message": "Due to error user have not been saved"});
  }
};

const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: req.body.email } });
      const validatedPass = await bcrypt.compare(password, user.password);
      if (!validatedPass) throw new Error();
      req.session.sid = user.id;
      res.status(200).send(user);
      
    } catch (error) {
      res
        .status(401)
        .send({ error: '401', message: 'Username or password is incorrect' });
    }
};

const profileUser = async (req: Request, res: Response) => {
  try {
    if(req.session.sid){
        res.status(200).send({isAuthenticated: true, id: req.session.id});
    }
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
