import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe-service.service';
import { CategoryModule } from '../../category/category.module';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../category/category-service.service';
import { Category } from '../../category/category.model';
@Component({
  selector: 'app-all-recipies',
  templateUrl: './all-recipies.component.html',
  styleUrls: ['./all-recipies.component.css']
})
export class AllRecipesComponent implements OnInit {
  public recipesList: Recipe[] = []
  public recipesListFilter: Recipe[] = []
  public categoryList: Category[] = []
  public filterForm!: FormGroup;
  public inputCategory: FormControl = new FormControl("");
  public selectedCategory: FormControl = new FormControl(0);

  constructor(private _RecipeService: RecipeService,private router:Router,private _CategoryService: CategoryService) { }
  ngOnInit(): void {
    this.filterForm = new FormGroup({
      inputCategory: this.inputCategory,
      selectedCategory: this.selectedCategory
    })
    this.selectedCategory.valueChanges.subscribe((value: number) => {
      this.recipesListFilter = this.recipesList.filter(x => x.categoryCode == value) 
      
      if(value == 0)
      this.recipesListFilter = this.recipesList;
    });
    this.inputCategory.valueChanges.subscribe((value: string) => {
      this.recipesListFilter = this.recipesList.filter(x => x.recipeName.includes(value))
    });

    this._RecipeService.getRecipes().subscribe({
      next: (res) => {
        this.recipesList = res;
        this.recipesListFilter = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        if (res) {
          res.unshift({ code: 0, name: "הכל", icon: "" })
          this.categoryList = res
        }
      },
      error: (err) => {
        console.log(err);
      }
    })


  }


}
// import { Component, OnInit } from '@angular/core';
// import { Recipe } from '../recipe.model';
// import { Router } from '@angular/router';
// import { RecipeService } from '../recipe-service.service';
// import { CategoryModule } from '../../category/category.module';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { CategoryService } from '../../category/category-service.service';

// @Component({
//   selector: 'app-all-recipies',
//   templateUrl: './all-recipies.component.html',
//   styleUrls: ['./all-recipies.component.css']
// })
// export class AllRecipesComponent implements OnInit {
//   public recipesList: Recipe[] = [];
//   public recipesListFilter: Recipe[] = [];
//   public categoryList: CategoryModule[] = [];
//   public filterForm!: FormGroup;

//   constructor(private _recipeService: RecipeService, private router: Router, private _categoryService: CategoryService) { }

//   ngOnInit(): void {
//     this.filterForm = new FormGroup({
//       inputCategory: new FormControl(''),
//       selectedCategory: new FormControl(0)
//     });

//     this.filterForm.get('selectedCategory')?.valueChanges.subscribe((value: number) => {
//       this.filterRecipes();
//     });

//     this.filterForm.get('inputCategory')?.valueChanges.subscribe((value: string) => {
//       this.filterRecipes();
//     });

//     this._recipeService.getRecipes().subscribe({
//       next: (res) => {
//         this.recipesList = res;
//         this.recipesListFilter = res;
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });

//     this._categoryService.getAllCategories().subscribe({
//       next: (res) => {
//         if (res) {
//           res.unshift({ code: 0, name: "All", icon: "" });
//           this.categoryList = res;
//         }
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//   }

//   filterRecipes(): void {
//     const selectedCategory = this.filterForm.get('selectedCategory')?.value;
//     const inputCategory = this.filterForm.get('inputCategory')?.value.toLowerCase();

//     this.recipesListFilter = this.recipesList.filter(recipe => {
//       const byCategory = selectedCategory === 0 || recipe.categoryCode === selectedCategory;
//       const byName = recipe.recipeName.toLowerCase().includes(inputCategory);
//       return byCategory && byName;
//     });
//   }
// }
