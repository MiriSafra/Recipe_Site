import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from './recipe.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }
  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://localhost:7142/Recipe')
  } 
  public getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`https://localhost:7142/Recipe/${id}`)
  }
  public addRecipe(recipe:Recipe): Observable<Recipe> {
    // debugger;
     return this.http.post<Recipe>(`https://localhost:7142/Recipe`,recipe);
   
   }
   public updateReceipe(recipe:Recipe,id: number): Observable<Recipe> {
    // debugger;
     return this.http.put<Recipe>(`https://localhost:7142/Recipe/${id}`,recipe);
   
   }
   public deleteReceipe(id: number){
    // debugger;
     return this.http.delete(`https://localhost:7142/Recipe/${id}`);
   
   }
}
