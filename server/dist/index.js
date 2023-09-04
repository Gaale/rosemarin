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
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
// const express = require('express');
const cors = require('cors');
const models_1 = __importDefault(require("./models"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
// const session = require('express-session');
const maxAge = parseInt(process.env.MAX_AGE) || 3600000;
const secret = process.env.SESSION_SECRET || 'secret123';
const PORT = 3001;
app.use(cors(corsOptions));
app.use(express_1.default.json());
const express_fileupload_1 = __importDefault(require("express-fileupload"));
app.use((0, express_fileupload_1.default)({
    createParentPath: true,
}));
app.use((0, express_session_1.default)({
    secret: secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: maxAge,
    },
}));
app.use(router_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.sync({ force: false });
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}.`);
        });
    }
    catch (err) {
        console.log('error in server: ', err);
    }
}))();
