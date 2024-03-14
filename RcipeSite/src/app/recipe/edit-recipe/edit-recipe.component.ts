import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category/category-service.service';
import { RecipeService } from '../../recipe/recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { Recipe } from '../recipe.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl:'./edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit{

  constructor (
    private _categoryService: CategoryService,
    private _recipeService: RecipeService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}
  public recipe:Recipe;
  public recipeCode : number;
  public addRecipeForm!: FormGroup;
  public CategoryList: Category[] = [];
  
  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.CategoryList = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this._route.params.subscribe(params => {
      this.recipeCode = +params['recipeCode']; // Convert to number
    });

    this.addRecipeForm = this._formBuilder.group({
      recipeName: new FormControl(),
      categoryCode: new FormControl(),
      preparationTimeMinutes: new FormControl(),
      level: new FormControl(),
      ingredients: this._formBuilder.array([]),
      instructions: this._formBuilder.array([]),
      image: new FormControl(),
    });
    
    this._recipeService.getRecipeById(this.recipeCode).subscribe(recipe => {
      this.recipe = recipe;
      this.addRecipeForm.controls["recipeName"].setValue(this.recipe.recipeName);
      this.addRecipeForm.controls["categoryCode"].setValue(this.recipe.categoryCode);
      this.addRecipeForm.controls["preparationTimeMinutes"].setValue(this.recipe.preparationTimeMinutes);
      this.addRecipeForm.controls["level"].setValue(this.recipe.level);
      this.addRecipeForm.controls["image"].setValue(this.recipe.image);
      this.recipe.ingredients.forEach(item => {
        this.ingredientsArray.push(new FormControl(item));
      });
      this.recipe.instructions.forEach(item => {
        this.instructionsArray.push(new FormControl(item));
      });
    });
   
  }

  saveRecipe(): void {
    this.recipe.recipeName = this.addRecipeForm.value.recipeName;
    this.recipe.categoryCode = this.addRecipeForm.value.categoryCode;
    this.recipe.preparationTimeMinutes = this.addRecipeForm.value.preparationTimeMinutes;
    this.recipe.level = this.addRecipeForm.value.level;
    this.recipe.ingredients = this.addRecipeForm.value.ingredients;
    this.recipe.instructions = this.addRecipeForm.value.instructions;
    this.recipe.image = this.addRecipeForm.value.image;

    
    this._recipeService.updateReceipe(this.recipe,this.recipe.recipeCode).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Thank you!',
          text: 'The recipe was update successfully !',
          icon: 'success'
        });
        this._router.navigate(['/recipes']);
      },
      error(err) {
        console.log(err);
      }
    });
  }
  cancel(){
    this._router.navigate(['/recipeDetails', this.recipe.recipeCode]);
  }
  get ingredientsArray(): FormArray {
    return this.addRecipeForm.get('ingredients') as FormArray;
  }

  get instructionsArray(): FormArray {
    return this.addRecipeForm.get('instructions') as FormArray;
  }

  addIngredient(): void {
    const lastControl = this.ingredientsArray.at(this.ingredientsArray.length - 1);
    if (lastControl.value.trim() !== '') {
      this.ingredientsArray.push(this._formBuilder.control(''));
    }
  }

  addPreparationStep(): void {
    const lastControl = this.instructionsArray.at(this.instructionsArray.length - 1);
    if (lastControl.value.trim() !== '') {
      this.instructionsArray.push(this._formBuilder.control(''));
    }
  }

  removeEmptyIngredients(): void {
    for (let i = this.ingredientsArray.length - 1; i >= 0; i--) {
      if (this.ingredientsArray.at(i).value.trim() === '') {
        this.ingredientsArray.removeAt(i);
      }
    }
  }

  removeEmptyPreparationSteps(): void {
    for (let i = this.instructionsArray.length - 1; i >= 0; i--) {
      if (this.instructionsArray.at(i).value.trim() === '') {
        this.instructionsArray.removeAt(i);
      }
    }
  }
}
