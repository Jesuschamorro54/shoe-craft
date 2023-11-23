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
