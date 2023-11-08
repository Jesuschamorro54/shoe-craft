import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    public _employeesService: EmployeesService
    ){
      this.employeeForm = this.formBuilder.group({
        name: ['', Validators.required],
        dni: ['', Validators.required],
        address: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        birthDate: ['', Validators.required],
        gender: ['', Validators.required],
        role: ['', Validators.required]
      }
    );
  }

  /**Permite solo dejar escribir numeros */
  onInputUser(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  save() {
    console.log("entre: ")
    if (this.employeeForm.valid) {
      // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP o realizar otras acciones.

      const employeeInfor={
        name: this.employeeForm.controls['name'].value,
        dni: this.employeeForm.controls['dni'].value,
        // address: this.employeeForm.controls['address'].value,
        email: this.employeeForm.controls['email'].value,
        // phone: this.employeeForm.controls['phone'].value,
        // gender: this.employeeForm.controls['gender'].value,
        role: this.employeeForm.controls['role'].value,
        password: "shoelogix123"
      };

      this._employeesService.createEmployee(employeeInfor).subscribe(response =>{
        if (response.status){
          const newEmployee = this._employeesService.format(response)
          this._employeesService.employeesList.unshift(newEmployee);


           // Mostrar el mensaje de éxito y luego limpiarlo después de unos segundos
          this.successMessage = "¡Usuario creado con éxito!";
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);

          // Reiniciar el formulario
          this.employeeForm.reset();

          }
      });


    }
  }
}




