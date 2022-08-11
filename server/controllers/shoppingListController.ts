import ShoppingListItem from '../models/ShoppingListItem';
import { Request, Response } from 'express';
import { ShoppingListItemType } from '../types/ShoppingListItem';
import { TypedSessionData } from '../types/TypedSession';
import { WhereOptions } from 'sequelize/types';

const removeItem = async (req: Request, res: Response) => {
	try {
		const id: number = req.body.id;
		await ShoppingListItem.destroy({ where: { id: id } });
		res.status(200).send({ message: 'Item has been successfully deleted' });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Due to error item has not been deleted' });
	}
};

const getAllItems = async (req: Request, res: Response) => {
	try {
		const session: TypedSessionData = req.session;
		const userId = session.uid;
		const allItems = await ShoppingListItem.findAll({
			where: { UserId: userId } as WhereOptions,
		});
		res.status(200).send(allItems);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Due to error items have not been received' });
	}
};

const addItem = async (req: Request<any, any, ShoppingListItemType>, res: Response) => {
	try {
		const session: TypedSessionData = req.session;

		const result = await ShoppingListItem.create({
			name: req.body.name,
			unit: req.body.unit,
			quantity: req.body.quantity,
			UserId: session.uid,
		});
		console.log(result);
		res.status(201).send(result);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Due to error item has not been added' });
	}
};

module.exports = { addItem, removeItem, getAllItems };
