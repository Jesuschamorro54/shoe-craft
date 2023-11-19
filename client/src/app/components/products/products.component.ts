import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{
  products = [
    {
      id: 1,
      url: "https://t-static.dafiti.com.br/V72x1SeIyCE7HwdjaXNgKu9KkM0=/400x580/smart/filters:quality(90)/static.dafiti.com.co/p/nabril-0773-8425222-2-product.jpg",
      name: "producto",
      amount: 1,
      createdAt: "12/11/2023",
      process: "Ensamblado",
      associated_packages: "paquete #1"
    }
  ];
  packages = [
    {
      id: 1,
      name: "Paquete #1",
      amount: 1,
      createdAt: "12/11/2023",
      total_amount: 100000,
      state: "Completado",
    }
  ];
  tables: string = "product";
  menu_select: string = "product";

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit(): void {
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
