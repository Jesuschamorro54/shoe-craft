import { Component, Input, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees;

  constructor(
    public _employeesService: EmployeesService
  ){}

  ngOnInit(): void {
    // this._employeesService.getEmployees();
  }

  

}
