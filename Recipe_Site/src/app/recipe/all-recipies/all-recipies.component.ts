import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe-service.service';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../category/category-service.service';
import { Category } from '../../category/category.model';

@Component({
  selector: 'app-all-recipies',
  templateUrl: './all-recipies.component.html',
  styleUrls: ['./all-recipies.component.css']
})
export class AllRecipesComponent implements OnInit {
  public recipesList: Recipe[] = [];
  public recipesListFilter: Recipe[] = [];
  public categoryList: Category[] = [];
  public filterForm!: FormGroup;

  constructor(
    private _RecipeService: RecipeService,
    private router:Router,
    private _CategoryService: CategoryService
    ) { }

  ngOnInit(){

    this.filterForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      duration: new FormControl(''),
    });

    this.subscribeToFormChanges();


    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res;
      },
      error: (err) => { console.error(err); }
    });


    this._RecipeService.getRecipes().subscribe({
      next: (res) => {
        this.recipesList = res;
        this.filter();
      },
      error: (err) => { console.error(err); }
    });

}  

  private subscribeToFormChanges() {   
      this.filterForm.valueChanges.subscribe(() => {
        this.filter();
      });
  }

  filter() {
    this.recipesListFilter = this.recipesList.filter(recipe =>
      (this.filterForm.controls['name'].value === '' || recipe.recipeName.toLowerCase().includes(this.filterForm.controls['name'].value.toLowerCase())) &&
      (this.filterForm.controls['category'].value === '' || recipe.categoryCode == this.filterForm.controls['category'].value) &&
      (this.filterForm.controls['duration'].value === '' || recipe.preparationTimeMinutes < this.filterForm.controls['duration'].value)
    );
  }
}

