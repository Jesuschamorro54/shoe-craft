import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  constructor(
    private _router: Router,
    public _authService: AuthService,
  ){

  }

  // Para mostrar el tooltip de usuarios
  isMenuOpen: boolean = false;

  menuToggle() {
    console.log(this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToUrl(url){
    this._router.navigate([url])
  }

  longOut(){
    localStorage.removeItem("token");
    this._router.navigate(['/login'])
  }

}
