export class Recipe {
  recipeCode: number;
  recipeName: string;
  categoryCode: number;
  preparationTimeMinutes: number;
  level: number;
  dateAdded !: Date;
  ingredients: string[];
  instructions: string[];
  userCode: string;
  image: string;


 constructor(
  recipeCode: number,
  recipeName: string,
  categoryCode: number,
  preparationTimeMinutes: number,
  level: number,
  dateAdded: Date,
  ingredients: string[],
  instructions: string[],
  userCode: string,
  image: string
 ) {
   this.recipeCode = recipeCode;
   this.recipeName = recipeName;
   this.categoryCode = categoryCode;
   this.preparationTimeMinutes = preparationTimeMinutes;
   this.level = level;
   this.dateAdded = dateAdded;
   this.ingredients = ingredients;
   this.instructions = instructions;
   this.userCode = userCode;
   this.image = image;
 }
}