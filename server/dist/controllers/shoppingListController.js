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
const ShoppingListItem = require('../models/ShoppingListItem');
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ShoppingListItem.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            //todo const userId = req.session.sid;
            UserId: 1
        });
        res.status(201).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error item has not been added" });
    }
});
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield ShoppingListItem.destroy({ where: { id: id } });
        yield ShoppingListItem.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            // todo const userId = req.session.sid;
            UserId: 1
        });
        res.status(200).send({ "message": "Item has been successfully updated" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error item has not been updated" });
    }
});
const removeItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        yield ShoppingListItem.destroy({ where: { id: id } });
        res.status(200).send({ "message": "Item has been successfully deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error item has not been deleted" });
    }
});
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo const userId = req.session.sid;
        const userId = 1;
        const allItems = yield ShoppingListItem.findAll({ where: { UserId: userId } });
        res.status(200).send(allItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error items have not been received" });
    }
});
module.exports = { addItem, removeItem, updateItem, getAllItems };
