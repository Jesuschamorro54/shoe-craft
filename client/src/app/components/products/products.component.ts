import { Component, Renderer2, ViewChild } from '@angular/core';
import { ProductsModel } from 'src/app/models/employee.model';
import { ProductsService } from 'src/app/services/products.service';
import { RemoveModalComponent } from '../modals/create-user-modal/remove-modal/remove-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @ViewChild(RemoveModalComponent) __removeModal: RemoveModalComponent;

  showModal:boolean = false;

  listProduct:ProductsModel[] = [];

  //
  //   { name: 'Botas de invierno', cost: 8000,image:'https://static.dafiti.com.co/p/ocean-pacific-7258-89543-5-zoom.jpg' },
  //   { name: 'Sandalias elegantes', cost: 3000,image:'https://www.freshka.com.co/cdn/shop/collections/Diseno_sin_titulo_-_2023-02-27T163749.190_1.png?v=1682388976' },
  //   { name: 'Zapatos para correr', cost: 60000, image:'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660043072-hoka-bondi-8-zapatillas-running-1660043036.png?crop=1.00xw:0.823xh;0,0.0783xh&resize=980:*'},
  //   { name: 'Botas de montaña', cost: 9000, image:'https://www.podoactiva.com/wp-content/uploads/imagenes/hiking-boots-2.jpg' },
  //   { name: 'Zapatos formales', cost: 40000, image:'https://springstep.vtexassets.com/arquivos/ids/171212/Zapatos-Formales-Hombre-Marca-San-Polos-Color-Negro-Talla-37-0.jpg?v=638180282488800000' },
  //   { name: 'Sandalias de playa', cost: 2500, image:'https://shoppinginibiza.com/blog/wp-content/uploads/2018/05/Post_Chanclas_Pala-1170x778.jpg' },
  //   { name: 'Botas de lluvia', cost: 7000, image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSARuv2_b0cHuA0cqdL-URuP6jCKYqWAME2yMZVGVCxT-lbnE7jeV4QgqLTQxefn8KPiPY&usqp=CAU' },
  // ];

  constructor(
    private renderer: Renderer2,
    public _productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  openDeleteModal(productId){
    this.__removeModal.openModal();
    this.__removeModal.idToDelete = productId;
    console.log("ABRIR MODAL", productId);
  }

  getProducts(){
    this._productsService.getProducts().subscribe( response => {
      this._productsService.productList= response;
    })
  }

  deleteProduct(productId) {
    console.log("ENTRE A ELIMINAR deleteEmployee", productId);
    if (productId) {
      console.log("ENtre validacion: ")
      this._productsService.deleteProduct(productId).subscribe({
        next: (response) => {
          const index = this._productsService.productList.findIndex(product => product.id === productId);
          if (index !== -1) {
            const deletedProduct = this._productsService.productList.splice(index, 1)[0];
            // deletedEmployee.status = "-1";
            this.__removeModal.showModal = false;
          } else {
            console.log('No se encontró al producto');
          }
        },
        error: error => {
          console.error("Error: ", error);
        },
        complete: () => {
          this.__removeModal.showModal = false;
          //detener la carga
        }
      });
    }
  }


  abrirModal() {
    // Agregar la clase al body
    this.renderer.addClass(document.body, 'modal-open');

    // Lógica para abrir el modal
    this.showModal = true;

  }

  cerrarModal() {
    // Quitar la clase al body
    this.renderer.removeClass(document.body, 'modal-open');

    // Lógica para cerrar el modal
    this.showModal = false;
  }
}
