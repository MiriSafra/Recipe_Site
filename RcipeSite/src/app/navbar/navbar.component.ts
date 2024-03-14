
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(private router:Router){

}
toRegister() {
  this.router.navigate(["/register"]);

}
toLogin() {
  this.router.navigate(["/signin"]);
}
toLogout() { 
  if(sessionStorage.getItem("connect")!=null && sessionStorage.getItem("connect")=="true"){
     Swal.fire({
    title: ' good bye ',
  });
  }

  sessionStorage.setItem('connect',"false");
  
 
  this.router.navigate(["/signin"]);
}
toAddrecipe() {
  this.router.navigate(["/addRecipe"]);
}
toAllRecipe() {
  this.router.navigate(["/recipes"]);
  

}
toHome() {
  this.router.navigate([""]);
}

}
