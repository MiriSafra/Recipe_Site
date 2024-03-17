
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category/category-service.service';
import { RecipeService } from '../../recipe/recipe-service.service';
import { Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { Recipe } from '../recipe.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  constructor (
    private _categoryService: CategoryService,
    private _recipeService: RecipeService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  public addRecipeForm!: FormGroup;
  public CategoryList: Category[] = [];
  public myRecipe: Recipe = {
    recipeCode: 0,
    recipeName: "",
    categoryCode: 0,
    preparationTimeMinutes: 0,
    level: 0,
    dateAdded: new Date(),
    ingredients: [],
    instructions: [],
    userCode: "0",
    image: ""
  };

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.CategoryList = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.addRecipeForm = this._formBuilder.group({
      recipeCode: [Math.floor(Math.random() * 100) + 1],
      recipeName: [''],
      categoryCode: ['category'],
      preparationTimeMinutes: ['', ],
      level: ['1'],
      dateAdded: [new Date().getDate()],
      ingredients: this._formBuilder.array([this._formBuilder.control('')]),
      instructions: this._formBuilder.array([this._formBuilder.control('')]),
      userCode: [sessionStorage.getItem('password ')],
      image: ['']
    });
    // this.addRecipeForm = this._formBuilder.group({
    //   recipeName: [''],
    //   categoryCode: ['category'],
    //   preparationTimeMinutes: ['', ],
    //   level: ['1'],
    //   ingredients: this._formBuilder.array([this._formBuilder.control('')]),
    //   instructions: this._formBuilder.array([this._formBuilder.control('')]),
    //   image: ['']
    // });
  }

  saveRecipe(): void {
    for (let i=0;i < this.ingredientsArray.length;i++) {
      if(this.ingredientsArray[i]=="")
      this.ingredientsArray.removeAt(i);
    }
    for (let i=0;i <this.instructionsArray.length;i++) {
      if(this.instructionsArray[i]=="")
      this.instructionsArray.removeAt(i);
    }
    this.myRecipe = this.addRecipeForm.value;
    // this.myRecipe.recipeName = this.addRecipeForm.value.recipeName;
    // this.myRecipe.categoryCode = this.addRecipeForm.value.categoryCode;
    // this.myRecipe.preparationTimeMinutes = this.addRecipeForm.value.preparationTimeMinutes;
    // this.myRecipe.level = this.addRecipeForm.value.level;
    // this.myRecipe.ingredients = this.addRecipeForm.value.ingredients;
    // this.myRecipe.instructions = this.addRecipeForm.value.instructions;
    // this.myRecipe.image = this.addRecipeForm.value.image;
    // this.myRecipe.dateAdded =new Date();
    // this.myRecipe.userCode = parseInt(sessionStorage.getItem('userId'),10);
    // this.myRecipe.recipeCode = Math.floor(Math.random() * 100) + 1;
    this._recipeService.addRecipe(this.myRecipe).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Thank you!',
          text: 'The recipe was successfully added!',
          icon: 'success'
        });
        this._router.navigate(['recipes']);
      },
      error(err) {
        console.log(err);
      }
    });
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
    for (let i = this.instructionsArray.length - 1; i >= 0; i--) {
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