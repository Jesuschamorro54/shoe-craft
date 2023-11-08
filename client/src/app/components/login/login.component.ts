import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword:boolean = false;

  ngOnInit(){
    console.log(" showPassword", this.showPassword);
  }


  /**Permite solo dejar escribir numeros */
  onInputUser(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  seePassword(){
    console.log("entre");
    this.showPassword = !this.showPassword;
  }

}
