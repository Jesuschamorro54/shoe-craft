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

  openDeleteModal(){
    this.__removeModal.openModal();
    console.log("ABRIR MODAL");
  }



}
