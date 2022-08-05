type Signup = {name: string, email: string, password: string}
type Login = {email: string, password: string}
type Section = {components: []}
type Ingredient = {name: string, quantity: string, unit: string}
type Instruction = {display_text?: string, text?: string, temperature?: number}
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

declare namespace Express {
  interface Request {
    image: string,
  }
}