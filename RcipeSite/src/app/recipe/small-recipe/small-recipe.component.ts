import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model'
import { Router } from '@angular/router';
import { RecipeService } from '../recipe-service.service';
import { RouterModule, Routes } from '@angular/router';
import { connect } from 'http2';
import { HoursAndMinutesPipe } from '../recipe-details/hours-and-minutes.pipe';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrls: ['./small-recipe.component.css'],

})
export class SmallRecipeComponent {
  @Input() recipe: Recipe;

  constructor(private router: Router) { }
  redirectToRecipe(recipe: Recipe) {
    // this.router.navigate(['/recipeDetails', recipe.recipeCode], { state: { recipe } });
    if(sessionStorage.getItem("connect")!=null && sessionStorage.getItem("connect")=="true")
    this.router.navigate(['/recipeDetails', recipe.recipeCode]);
  else {
      Swal.fire({
    title: ' you have to sign in',
     });
   this.router.navigate(["/signin"]);
  }

  }
   // Custom method to generate an array of a specific length for stars
   generateArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }
}

