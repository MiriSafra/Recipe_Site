import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesComponent } from './all-recipies/all-recipies.component';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import {HoursAndMinutesPipe} from './recipe-details/hours-and-minutes.pipe'
import {AddRecipeComponent} from './add-recipe/add-recipe.component'
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { CategoryModule } from '../category/category.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    AllRecipesComponent,SmallRecipeComponent,RecipeDetailsComponent,AddRecipeComponent, EditRecipeComponent,
    
  ],
  imports: [
    CommonModule,HoursAndMinutesPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSidenavModule,
    SidebarModule
   
  ]
})




export class RecipeModule { }