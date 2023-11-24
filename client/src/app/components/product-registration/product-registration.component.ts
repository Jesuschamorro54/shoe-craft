import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';
import { ProductsService} from 'src/app/services/products.service'

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
    public _employeesService: EmployeesService,
    public _productsService: ProductsService
    ){
      this.productForm = this.formBuilder.group({
        product_id: ['', Validators.required],
        name: ['', Validators.required],
        total_products: ['', Validators.required],
        employee_id: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productsService.getProducts().subscribe( response => {
      this._productsService.productList= response;
    })
  }

  save() {
    if (this.productForm.valid) {
      // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP o realizar otras acciones.

      const productInfor={
        product_id: this.productForm.controls['product_id'].value,
        name: this.productForm.controls['name'].value,
        total_products: this.productForm.controls['total_products'].value,
        employee_id: this.productForm.controls['employee_id'].value,
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
