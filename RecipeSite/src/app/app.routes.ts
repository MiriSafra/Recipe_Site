import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import {AllRecipesComponent} from './recipe/all-recipies/all-recipies.component'
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
export const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "signin", component: LoginComponent},
    { path: "register", component: RegisterComponent},
     { path: "register/:name", component: RegisterComponent},
    { path: "recipes", component: AllRecipesComponent },
    { path: "recipeDetails/:recipeCode", component: RecipeDetailsComponent },
   { path: "addRecipe", component: AddRecipeComponent },
    { path: "edit/:recipeCode", component: EditRecipeComponent },
    // { path: "recipes", component: AllRecipiesComponent },
    // { path: "recipes", component: AllRecipiesComponent },
];
