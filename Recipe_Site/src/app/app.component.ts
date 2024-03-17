import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginModule } from './login/login.module';
import { RecipeModule } from './recipe/recipe.module';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RouterOutlet,LoginModule, RecipeModule, NavbarComponent]
})
export class AppComponent {
  title = 'RecipeSite';
}
