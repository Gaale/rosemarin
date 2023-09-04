import { getByTestId, render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import userEvent from '@testing-library/user-event';
import Heart from '../Heart';

const setIds = jest.fn();
const ids = [
	{ id: 0, id_tasty: 0 },
	{ id: 1, id_tasty: 1 },
	{ id: 2, id_tasty: 2 },
];
const recipeNoFav = {
	title: 'string',
	Ingredients: [],
	Instructions: [],
	UserId: 0,
	id: 5,
	id_tasty: 5,
	img_alt_text: 'string',
	total_time: 0,
	total_time_minutes: 0,
};
const recipeFav = {
	title: 'string',
	Ingredients: [],
	Instructions: [],
	UserId: 0,
	id: 0,
	id_tasty: 0,
	img_alt_text: 'string',
	total_time: 0,
	total_time_minutes: 0,
};
test('should render the component Correctly and add a Recipe to Favorites when clicked', async () => {
	const { getByTestId } = render(<Heart recipe={recipeNoFav} setIds={setIds} ids={ids} />);

	const iconNoFav = getByTestId('icon-no-fav');
	userEvent.click(iconNoFav);

	expect(setIds).toHaveBeenCalledWith([...ids, { id: 0, id_tasty: recipeNoFav.id_tasty }]);
	//TEST IF IT RENDERED THE FAV ICON
	getByTestId('icon-fav');
});

test('should render the component Correctly and remove a Recipe from Favorites when clicked', async () => {
	const { getByTestId } = render(<Heart recipe={recipeFav} setIds={setIds} ids={ids} />);

	const jsdomAlert = window.confirm; // remember the jsdom alert
	window.confirm = () => {
		return true;
	};

	const iconFav = getByTestId('icon-fav');
	userEvent.click(iconFav);

	window.confirm = jsdomAlert;

	expect(setIds).toHaveBeenCalledWith(ids.filter((id) => id.id !== 0));
	//TEST IF IT RENDERED THE NOT FAV ICON
	getByTestId('icon-no-fav');
});
