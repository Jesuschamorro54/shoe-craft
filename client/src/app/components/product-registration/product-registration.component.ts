import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.scss']
})
export class ProductRegistrationComponent {
  productForm: FormGroup;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    public _employeesService: EmployeesService
    ){
      this.productForm = this.formBuilder.group({
        name: ['', Validators.required],
        cost: ['', Validators.required],
      }
    );
  }

  save() {
    if (this.productForm.valid) {
      // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP o realizar otras acciones.

      const productInfor={
        name: this.productForm.controls['name'].value,
        cost: this.productForm.controls['cost'].value,
      };

      this._employeesService.createProduct(productInfor).subscribe(response =>{
        if (response.status){
           // Mostrar el mensaje de éxito y luego limpiarlo después de unos segundos
          this.successMessage = "¡Producto creado con éxito!";
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);

          // Reiniciar el formulario
          this.productForm.reset();

          }
      });


    }
  }
}
