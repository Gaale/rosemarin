import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';

export type RecipeType = {
  title: string;
  description?: string;
  img_url?: string;
  img_data?: Blob;
  image?: string;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  img_alt_text?: string;
  total_time?: number;
  id_tasty?: number;
  UserId?: number;
  id?: number;
};
