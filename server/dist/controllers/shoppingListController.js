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
const ShoppingListItem_1 = __importDefault(require("../models/ShoppingListItem"));
const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        yield ShoppingListItem_1.default.destroy({ where: { id: id } });
        res.status(200).send({ message: 'Item has been successfully deleted' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Due to error item has not been deleted' });
    }
});
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = req.session;
        const userId = session.uid;
        const allItems = yield ShoppingListItem_1.default.findAll({
            where: { UserId: userId },
        });
        res.status(200).send(allItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Due to error items have not been received' });
    }
});
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = req.session;
        const result = yield ShoppingListItem_1.default.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            UserId: session.uid,
        });
        console.log(result);
        res.status(201).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Due to error item has not been added' });
    }
});
module.exports = { addItem, removeItem, getAllItems };
