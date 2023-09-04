import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { deleteItem, getMyShoppingList } from '../Utils/apiDBServiceShoppingList';
import { ItemType } from '../types/ItemType';

type Props = {
	items: ItemType[];
	setItems: Dispatch<SetStateAction<ItemType[]>>;
	isAuthenticated: boolean;
};

const ShoppingList = ({ items, setItems, isAuthenticated }: Props) => {
	useEffect(() => {
		if (isAuthenticated) {
			getMyShoppingList()
				// .then(recipes => console.log(recipes))
				.then((itemsSL) => setItems(itemsSL))
				.catch((err) => console.log.bind(err));
		}
	}, []);

	const delItemHandler = (id: number) => {
		deleteItem(id)
			.then((res) => console.log(res))
			.catch((err) => console.log.bind(err));
		setItems((prev) => {
			const filtered = prev.filter((item) => item.id !== id);
			return [...filtered];
		});
	};

	return (
		<div>
			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Shopping list</h3>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
								<tr>
									<th>Delete</th>
									<th>Name</th>
									<th>Quantity</th>
									<th>Unit</th>
								</tr>
							</thead>
							<tbody>
								{items?.map((item, i) => (
									<tr key={i}>
										<th
											className="text-orange-800 text-2xl cursor-pointer hover:text-black"
											onClick={() => delItemHandler(item.id!)}
										>
											X
										</th>
										<td>{item.name}</td>
										<td>{item.quantity}</td>
										<td>{item.unit}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="modal-action">
						<label htmlFor="my-modal" className="btn btn-warning">
							Close
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingList;
