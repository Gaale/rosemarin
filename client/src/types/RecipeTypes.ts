import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';

export class MyRecipe {
  constructor() {
    this.title = 'string';

    this.ingredients = [];
    this.instructions = [];
    this.UserId = 0;
    this.id = 0;
    this.id_tasty = 0;
    this.img_alt_text = 'string';
    this.total_time = 0;
    this.total_time_minutes = 0;
  }
  title: string;
  img_url?: string;
  img_data?: string;
  description?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  UserId: number;
  createdAt?: string;
  updatedAt?: string;
  id: number;
  id_tasty: number;
  img_alt_text: string;
  total_time: number;
  total_time_minutes: number;
}

//TRANSFORM THIS INTO MY RECIPE TYPE
export class GeneralRecipe extends MyRecipe {
  constructor() {
    super();

    this.name = 'string';
    this.thumbnail_url = 'string';
    this.instructions = []; //Change
  }
  renditions?: { url?: string }[];
  name: string;
  thumbnail_url: string;
  instructions: Instruction[]; //Change
  // instructions: Ingredient[]; //Change
}

// export class GeneralRecipe = MyRecipe & RecipeType;
