import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { RemoveModalComponent } from '../modals/create-user-modal/remove-modal/remove-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees;
  @ViewChild(RemoveModalComponent) __removeModal: RemoveModalComponent;

  constructor(
    public _employeesService: EmployeesService
  ){}

  ngOnInit(): void {
    // this._employeesService.getEmployees();
  }

  openDeleteModal(employeeId){
    this.__removeModal.openModal();
    console.log("ABRIR MODAL", employeeId);
  }

  deleteEmployee(employeeId) {
    console.log("ENTRE A ELIMINAR deleteEmployee", employeeId);
    if (employeeId) {
      console.log("ENtre validacion: ")
      this._employeesService.deleteEmployee(employeeId).subscribe({
        next: (response) => {
          const index = this._employeesService.employeesList.findIndex(employee => employee.id === employeeId);
          if (index !== -1) {
            const deletedEmployee = this._employeesService.employeesList.splice(index, 1)[0];
            // deletedEmployee.status = "-1";
            this.__removeModal.showModal = false;
          } else {
            console.log('No se encontró al empleado');
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

}
