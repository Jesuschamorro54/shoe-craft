import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  employees = [];

  constructor(
    public _employeesService: EmployeesService
  ){}

  ngOnInit(): void {
    this._employeesService.getEmployees().then( response => {
      this._employeesService.employeesList = response;
      this.filterEmployees();
    } );
  }

  filterEmployees(state = 1){
    this.employees = this._employeesService.employeesList.filter( employee => employee.state === state )
  }

}
