import { Component, OnInit } from '@angular/core';
import { user } from '../user.model';
import { UserService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel, ReactiveFormsModule,FormsModule, FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  // standalone: true,
  // imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  public SigninForm!: FormGroup
  // public user!: user;
  public myUser: user = { name: '', password: '', address: '', email: ''}; // Initialize user object
  static flag: boolean | null = false;
  showRotatingIcon: boolean | undefined;
  hide: boolean | undefined;
  userExists: boolean | undefined;
  constructor(private _UserService: UserService, private router: Router,private route :ActivatedRoute) { }

  ngOnInit(): void {
    let newName:string
 this.route.params.subscribe(param=>newName=param['name'])



    this.SigninForm = new FormGroup({
      'name': new FormControl(newName, [Validators.required, Validators.minLength(3)]),
      'password': new FormControl("", Validators.required),
      'address': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required)

    });
  }

  public getNewUsers() {

    if (this.SigninForm.valid) {
     
      console.log("vvvv")   
      this.myUser.email = this.SigninForm.get('email')?.value; 
       this.myUser.name = this.SigninForm.get('name')?.value;
      this.myUser.address = this.SigninForm.get('address')?.value;
      this.myUser.password = this.SigninForm.get('password')?.value;
      console.log("name", this.myUser.name)
      console.log("pass", this.myUser.password)
      console.log("email", this.myUser.email)
      console.log("address", this.myUser.address)


      this._UserService.AddUser(this.myUser).subscribe({
      

        next: (res) => { 
       
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'welcome!',
            text: 'User added successfully!'
          });
          sessionStorage.setItem('username', this.myUser.name);
          sessionStorage.setItem('password', this.myUser.password);
          // sessionStorage.setItem('userId', JSON.stringify(users.find(user => user.name == username && user.password== password)?.id));
          sessionStorage.setItem('connect',"true");
          this.router.navigate(["/recipes"]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}