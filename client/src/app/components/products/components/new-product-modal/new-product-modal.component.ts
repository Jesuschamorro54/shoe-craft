import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.scss']
})
export class NewProductModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();
  loading = false;
  registerProduct: FormGroup;
  successMessage:string;

  constructor(
    private formBuilder: FormBuilder,
    public _employeesService: EmployeesService,
    public _productsService: ProductsService
    ){
      this.registerProduct = this.formBuilder.group({
        name: ['', Validators.required],
        image: ['', Validators.required],
        cost: ['', Validators.required],
      })
    }

  /**Permite solo dejar escribir numeros */
  onInputUser(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  registerProducts(){
    console.log("entre aca: ")

    if (this.registerProduct.valid) {
      console.log("entre aca 2: ")
      this.loading = true;

      const product={
        name: this.registerProduct.controls['name'].value,
        image: this.registerProduct.controls['image'].value,
        cost: this.registerProduct.controls['cost'].value,
      };

      this._productsService.createProducts(product).subscribe({
        next:response =>{
          if (response.status){
            this._productsService.productList.unshift(response.data.data);

            // Reiniciar el formulario
            this.registerProduct.reset();
          }
        },
        error:(error) => console.log('Any was wrong'),
        complete: () => {
          this.loading = false;
          this.close();
        }
      });
    }
  }

  close(event?: Event) {
    if (this.loading) return
    this.closeModal.emit(true);
    if (event) event.stopPropagation();
  }

  preventClosing(event: Event) {
    event.stopPropagation(); // Detener la propagación del evento
  }

}
