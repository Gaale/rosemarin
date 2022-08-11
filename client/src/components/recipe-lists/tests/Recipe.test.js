import { render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import { MemoryRouter } from 'react-router';
import Recipe from '../Recipe';

const setIds = jest.fn();
const ids = [
  { id: 0, id_tasty: 0 },
  { id: 1, id_tasty: 1 },
  { id: 2, id_tasty: 2 },
];
const recipe = {
  title: 'Recipe 1',
  Ingredients: [],
  Instructions: [],
  UserId: 0,
  id: 0,
  id_tasty: 0,
  img_alt_text: 'string',
  total_time: 0,
  total_time_minutes: 0,
  thumbnail_url: 'url',
};
const className = 'vertical card bg-base-100 shadow-xl';

test('should render the component Correctly', async () => {
  render(
    <Recipe recipe={recipe} setIds={setIds} ids={ids} className={className} />,
    { wrapper: MemoryRouter }
  );

  const img = screen.getByAltText(recipe.title);
  expect(img).toBeVisible();

  const getByText = screen.getByText('Recipe 1');
  expect(getByText).toHaveClass('card-title font-rufina-bold');
});
