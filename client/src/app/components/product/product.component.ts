import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  products = [
    {
      id: 1,
      url: "https://t-static.dafiti.com.br/V72x1SeIyCE7HwdjaXNgKu9KkM0=/400x580/smart/filters:quality(90)/static.dafiti.com.co/p/nabril-0773-8425222-2-product.jpg",
      name: "producto",
      amount: 1,
      createdAt: "12/11/2023",
      process: "Ensamblado",
      associated_packages: "paquete #1"
    },
    {
      id: 2,
      url: "https://t-static.dafiti.com.br/V72x1SeIyCE7HwdjaXNgKu9KkM0=/400x580/smart/filters:quality(90)/static.dafiti.com.co/p/nabril-0773-8425222-2-product.jpg",
      name: "producto",
      amount: 1,
      createdAt: "12/11/2023",
      process: "Ensamblado",
      associated_packages: "paquete #1"
    },
    {
      id:3,
      url: "https://t-static.dafiti.com.br/V72x1SeIyCE7HwdjaXNgKu9KkM0=/400x580/smart/filters:quality(90)/static.dafiti.com.co/p/nabril-0773-8425222-2-product.jpg",
      name: "producto",
      amount: 1,
      createdAt: "12/11/2023",
      process: "Ensamblado",
      associated_packages: "paquete #1"
    },
  ];

}
