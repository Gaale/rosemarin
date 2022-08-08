import { render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import Heart from '../Heart';

test('should render the component Correctly', () => {
	const setIds = jest.fn();
	const ids = [
		{ id: 0, id_tasty: 0 },
		{ id: 1, id_tasty: 1 },
		{ id: 2, id_tasty: 2 },
	];
	const recipe = {
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
	render(<Heart recipe={recipe} setIds={setIds} ids={ids} />);
});
