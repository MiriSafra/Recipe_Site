import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category-service.service';
import { Category } from './category.model';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,Category,CategoryService,NgModule
  ]
})
export class CategoryModule { }
