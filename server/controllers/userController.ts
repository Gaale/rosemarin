const User = require('../models/User');
import bcrypt from 'bcryptjs';
import { User } from '../types/User';
import { Response, Request } from 'express';
import { TypedSessionData } from '../types/TypedSession';

const createUser = async (req: Request<any, any, User>, res: Response) => {
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
			const session: TypedSessionData = req.session;
			session.uid = result.id;
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

const loginUser = async (req: Request<any, any, User>, res: Response) => {
	try {
		const pass = req.body.password!;
		const user = await User.findOne({ where: { email: req.body.email } });
		console.log(user.password);
		if (user) {
			if (bcrypt.compareSync(pass, user.password)) {
				const session: TypedSessionData = req.session;
				session.uid = user.id;
				res.status(200);
				res.send('Ok');
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

const profileUser = async (req: Request, res: Response) => {
	try {
		const userRes = { name: req.body.user.name, email: req.body.user.email };
		res.status(200).send(userRes);
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
