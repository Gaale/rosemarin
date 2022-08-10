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
const User = require('../models/User');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pass = req.body.password;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const password = bcryptjs_1.default.hashSync(pass, salt);
        const user = yield User.findOne({
            where: { email: req.body.email },
        });
        if (!user) {
            const result = yield User.create({
                name: req.body.name,
                email: req.body.email,
                password: password,
            });
            const session = req.session;
            session.uid = result.id;
            res.status(201);
            res.send('Success');
        }
        else {
            res.status(400).send('Account already exists.');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Due to error user have not been saved' });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pass = req.body.password;
        const user = yield User.findOne({ where: { email: req.body.email } });
        console.log(user.password);
        if (user) {
            if (bcryptjs_1.default.compareSync(pass, user.password)) {
                const session = req.session;
                session.uid = user.id;
                res.status(200);
                res.send('Ok');
            }
            else {
                res.status(401);
                res.send('invalid password');
            }
        }
        else {
            res.status(401);
            res.send('User does not exist');
        }
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
});
const profileUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRes = { name: req.body.user.name, email: req.body.user.email };
        res.status(200).send(userRes);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
});
const logoutUser = (req, res) => {
    req.session.destroy((e) => {
        if (e)
            res.status(500).send('Something went wrong');
        else {
            res.clearCookie('sid');
            res.sendStatus(200);
        }
    });
};
module.exports = { createUser, loginUser, profileUser, logoutUser };
