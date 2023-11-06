import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  employees:EmployeeModel[] = [];

  constructor(
    public _employeesService: EmployeesService
  ){}

  ngOnInit(): void {
    // this._employeesService.getEmployees().then( response => {
    //   this._employeesService.employeesList = response;
    //   this.filterEmployees();
    // } );
    this._employeesService.getEmployees().subscribe( response => {
      this.employees = response;
    })
  }

  filterEmployees(state = 1){
    this.employees = this._employeesService.employeesList.filter( employee => employee.state === state )
  }

}
