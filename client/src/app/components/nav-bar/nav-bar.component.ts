import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  implements OnInit{

  constructor(
    private _router: Router,
    public _authService: AuthService,
  ){}

  ngOnInit(): void {
  }

  goToUrl(url){
    this._router.navigate([url])
  }
}




