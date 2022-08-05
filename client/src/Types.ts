type Signup = {name: string, email: string, password: string}
type Login = {email: string, password: string}
type Section = {components: []}
type Ingredient = {name: string, quantity: number, unit: string}
type Instruction = {display_text?: string, text?: string}
type Rendition = {url: string}

export {Signup, Login, Section, Ingredient, Instruction, Rendition}