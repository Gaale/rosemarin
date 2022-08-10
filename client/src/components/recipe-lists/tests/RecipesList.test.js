import RecipesList from '../RecipesList';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

const recipes = [
  {
    title: 'string',
    Ingredients: [],
    Instructions: [],
    UserId: 0,
    id: 1,
    id_tasty: 0,
    img_alt_text: 'string',
    total_time: 0,
    total_time_minutes: 0,
    tags: [
      {
        id: 0,
        type: 'dietary',
        name: 'vegetarian',
        display_name: 'Vegetarian',
      },
      {
        id: 1,
        type: 'holiday',
        name: 'christmas',
        display_name: 'Christmas',
      },
    ],
  },
  {
    title: 'string',
    Ingredients: [],
    Instructions: [],
    UserId: 0,
    id: 0,
    id_tasty: 0,
    img_alt_text: 'string',
    total_time: 0,
    total_time_minutes: 0,
    tags: [
      {
        id: 1,
        type: 'holiday',
        name: 'christmas',
        display_name: 'Christmas',
      },
    ],
  },
];
const setRecipes = jest.fn();
const setIds = jest.fn();
const ids = [
  { id: 0, id_tasty: 0 },
  { id: 1, id_tasty: 1 },
  { id: 2, id_tasty: 2 },
  { id: 3, id_tasty: 3 },
];

it('should render correctly recipes and search form', async () => {
  render(
    <RecipesList
      setIds={setIds}
      recipes={recipes}
      setRecipes={setRecipes}
      ids={ids}
    />,
    { wrapper: MemoryRouter }
  );
  const elements = screen.getAllByText('string');
  expect(elements.length).toBe(2);

  const searchForm = screen.getByPlaceholderText('Search by category');
  expect(searchForm).toBeInTheDocument();
});

it('Should have search bar and trigger a search', async () => {
  render(
    <RecipesList
      setIds={setIds}
      recipes={recipes}
      setRecipes={setRecipes}
      ids={ids}
    />,
    { wrapper: MemoryRouter }
  );

  const searchForm = screen.getByPlaceholderText('Search by category');
  console.log(screen.getByText('Search'));

  const spy = jest.spyOn(console, 'log');
  fireEvent.change(searchForm, {
    target: { value: 'Vegetarian' },
  });
  userEvent.click(screen.getByText('Search'));
  expect(spy).toHaveBeenCalled();
});
