import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent  implements OnInit{

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
  ){}
  
  ngOnInit(): void {
  }

  goToUrl(url){

    window.open(url, '_blank');
  }
  
  

}




