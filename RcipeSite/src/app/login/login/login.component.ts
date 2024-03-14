import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, ReactiveFormsModule,FormsModule, FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service'
import { user } from '../user.model';
import Swal from 'sweetalert2';
import { log } from 'console';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  //providers: [FormsModule,NgModel,NgForm],
})

export class LoginComponent implements OnInit  {
    public LoginForm!: FormGroup
    public users!: user[];

    static flag :boolean |null=false;
    showRotatingIcon: boolean | undefined;
    hide: boolean | undefined;
    userExists: boolean | undefined;

  constructor(private _UserService: UserService,private router:Router){}
  // public user: user = { name: '', password: '', Address: '', Email: ''}; // Initialize user object
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'name': new FormControl("",[Validators.required, Validators.minLength(3)]),
      'password': new FormControl( "",Validators.required),
    
     
    });
  }
  public getUsers() {
    if (this.LoginForm.valid) {
      const username = this.LoginForm.get('name')?.value;
      const password = this.LoginForm.get('password')?.value;
      console.log("name",username)
      console.log("pass",password)
      this._UserService.getUserDetails().subscribe(      

        (users: user[]) => {
          console.log("users",users)
          console.log("this: ",username)
          this.userExists = users.some(u=>u.name==username);
         console.log(users)
          console.log(this.userExists,"fghjk")
          if (this.userExists) {
            
            if (users.some(user => (user.name == username && user.password == password))) {
              console.log("ss")
              // שמירת פרטי הגולש ב-SessionStorage
              sessionStorage.setItem('username', username);
              sessionStorage.setItem('password', password);
              sessionStorage.setItem('userId', JSON.stringify(users.find(user => user.name == username && user.password== password)?.id));
              sessionStorage.setItem('connect',"true");
              Swal.fire({
                icon: 'success',
                title: 'User Exists!',
                text: 'User was found in the system.'
              });
              this.router.navigate(["/recipes"]);
  
            }
            else{
              Swal.fire({
                icon: 'error',
                title: ' Not correct password!',
                text: 'User exist, but the password is incorrect.'
              });
            }
          } else {
            this.showRotatingIcon = true; // הצגת האייקון המסתובב
            setTimeout(() => {
              this.router.navigate(["/register",username]);
             
            }, 2000); // אם רוצים שהאנימציה תמשך שתי שניות
          }
        },
        (error) => {
          console.log('Error occurred while fetching users:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while fetching users.'
          });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }


    
  }













// import { Component, OnInit } from '@angular/core';
// import { NgForm, NgModel, ReactiveFormsModule,FormsModule, FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from '../user-service.service'
// import { user } from '../user.model';
// import Swal from 'sweetalert2';
// import { log } from 'console';
// @Component({
//   selector: 'app-login',
//   // standalone: true,
//   // imports: [ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   //providers: [FormsModule,NgModel,NgForm],
// })

// export class LoginComponent implements OnInit  {
//     public LoginForm!: FormGroup
//     public users!: user[];

//     static flag :boolean |null=false;
//     showRotatingIcon: boolean | undefined;
//     hide: boolean | undefined;
//     userExists: boolean | undefined;

//   constructor(private _UserService: UserService,private router:Router){}
//   // public user: user = { name: '', password: '', Address: '', Email: ''}; // Initialize user object
//   ngOnInit(): void {
//     this.LoginForm = new FormGroup({
//       'name': new FormControl("",[Validators.required, Validators.minLength(3)]),
//       'password': new FormControl( "",Validators.required),
    
     
//     });
//   }
//   public getUsers() {
//     if (this.LoginForm.valid) {
//       const username = this.LoginForm.get('name')?.value;
//       const password = this.LoginForm.get('password')?.value;
//       console.log("name",username)
//       console.log("pass",password)
//       this._UserService.getUserDetails().subscribe(      

//         (users: user[]) => {
//           console.log("users",users)
//           console.log("this: ",username)
//           this.userExists = users.some(u=>u.name==username);
//          console.log(users)
//           console.log(this.userExists,"fghjk")
//           if (this.userExists) {
            
//             if (users.some(user => (user.name == username && user.password == password))) {
//               console.log("ss")
//               // שמירת פרטי הגולש ב-SessionStorage
//               sessionStorage.setItem('username', username);
//               sessionStorage.setItem('password', password);
//               sessionStorage.setItem('userId', JSON.stringify(users.find(user => user.name == username && user.password== password)?.id));
//               sessionStorage.setItem('connect',"true");
//               Swal.fire({
//                 icon: 'success',
//                 title: 'User Exists!',
//                 text: 'User was found in the system.'
//               });
//               this.router.navigate(["/recipes"]);
  
//             }
//             else{
//               Swal.fire({
//                 icon: 'error',
//                 title: ' Not correct password!',
//                 text: 'User exist, but the password is incorrect.'
//               });
//             }
//           } else {
//             this.showRotatingIcon = true; // הצגת האייקון המסתובב
//             setTimeout(() => {
//               this.router.navigate(["/register",username]);
             
//             }, 2000); // אם רוצים שהאנימציה תמשך שתי שניות
//           }
//         },
//         (error) => {
//           console.log('Error occurred while fetching users:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: 'An error occurred while fetching users.'
//           });
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//     }
//   }
  

//   togglePasswordVisibility() {
//     this.hide = !this.hide;
//   }


    
//   }















