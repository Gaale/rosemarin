import { UserInfo } from "os"
import { Session } from "express-session"

export type Signup = {name: string, email: string, password: string}
export type Login = {email: string, password: string}
export type Section = {components: []}
export type Ingredient = {name: string, quantity: string, unit: string}
export type Instruction = {display_text?: string, text?: string, temperature?: number}
export type Rendition = {url: string}
export type Recipe = {
  name: string,
  thumbnail_url: string,
  description: string,
  sections:  Section[] | [],
  instructions: Instruction[] | [],
  renditions:  Rendition[] | [],
}
export type MyRecipe = {
  title: string,
  img_url?: string,
  img_data?: string,
  description: string,
  Ingredients: Ingredient[] | [],
  Instructions: Instruction[] | []
  id?: number,
  id_tasty?: number
}
export type Ids = {
  id: number,
  id_tasty: number
}

declare global{
  namespace Express {
    interface Request {
      image: string;
    }
  } 
}
  
declare module 'express-session' {
       interface SessionData {
           sid: number;
       }
   }
