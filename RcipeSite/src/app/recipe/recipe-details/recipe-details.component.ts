
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeCode: number;
  recipe: Recipe;
  constructor(private route: ActivatedRoute, private _RecipeService: RecipeService,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeCode = +params['recipeCode']; // Convert to number
    });

    this._RecipeService.getRecipeById(this.recipeCode).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  isOwner(): boolean {
    return  (sessionStorage.getItem('password')==this.recipe.userCode);
  }

  deleteRecipe() {
    if(this.isOwner())
    this._RecipeService.deleteReceipe(this.recipeCode).subscribe();
  }

  // Custom method to generate an array of a specific length for stars
  generateArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  editRecipe() {
   if(this.isOwner())
    this.router.navigate(['/edit', this.recipe.recipeCode]);
  else
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: 'you have no premmission to edit this Recipe.'
  });
  }
}