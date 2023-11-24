import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {
  products = [];
  packages = [];
  tables: string = "product";
  menu_select: string = "product";

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    public _employeesService: EmployeesService
  ){}

  ngOnInit(): void {
    this._employeesService.getAllProducts().subscribe(response =>{
      if (response.status) this.products = response.data;
    });
    this._employeesService.getAllPackages().subscribe(response =>{
      if (response.status) this.packages = response.data;
      console.log(response.data);
    });
  }

  goToUrl(url){
    this._router.navigate([url])
  }

  btbMenu(value) {
    if(value == "package"){
      this.tables = "package";
      this.menu_select = "package";
    } else {
      this.tables = "product";
      this.menu_select = "product";
    }
  }
}
