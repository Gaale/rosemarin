type Signup = {name: string, email: string, password: string}
type Login = {email: string, password: string}
type Section = {components: []}
type Ingredient = {name: string, quantity: number, unit: string}
type Instruction = {display_text?: string, text?: string}
type Rendition = {url: string}
type Recipe = {
  name: string,
  thumbnail_url: string,
  description: string,
  sections:  Section[] | [],
  instructions: Instruction[] | [],
  renditions:  Rendition[] | [],
}
type MyRecipe = {
  title: string,
  img_url?: string,
  img_data?: string,
  description: string,
  Ingredients: Ingredient[] | [],
  Instructions: Instruction[] | [],
}


export {Signup, Login, Section, Ingredient, Instruction, Rendition, Recipe, MyRecipe}