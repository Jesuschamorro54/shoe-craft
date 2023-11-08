import { Component } from '@angular/core';
import { FormGroup, Validators,FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userLogin: FormGroup;
  showPassword:boolean = false;
  loading:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private _router: Router,
  ){
    this.userLogin= this.formBuilder.group({
      dni: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){
    if (this._authService.isAuth) {
      this._router.navigate(['payment-management/records'])
    }
  }

  logIn(){
    if (this.userLogin.valid) {
      this.loading = true;
      const userData = this.userLogin.value;
      this._authService.logIn(userData).subscribe({
        next: (response) => {
          if (response) {
            this._router.navigate(['payment-management/records'])
          }
        },
        error:(err) => {
            console.log('Any was wrong!!')
        },
        complete: () => {
          this.loading = false;
        },
      })
    }
  }

  /**Permite solo dejar escribir numeros */
  onInputUser(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  seePassword(){
    this.showPassword = !this.showPassword;
  }






}
