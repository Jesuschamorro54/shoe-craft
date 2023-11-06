import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseURl: string = 'http://jesusthor.pythonanywhere.com/api/employees';
  defaultImage: string = 'https://i.insider.com/5899ffcf6e09a897008b5c04?width=1000&format=jpeg&auto=webp';
  employeesList:EmployeeModel[] = [];

  loading = false;

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
  ) { }

  getEmployees():Observable<EmployeeModel[]>{
    const headers = {
      Authorization: this._authService.token
    }
    return this.http.get(this.baseURl,{headers}).pipe(
      map( response => {
        if (response['data'].length > 0) {
          response['data'].forEach(employee => {
            this.employeesList.push(this.format(employee));
          });
          return this.employeesList;
        }
      }),
      retry(3),
      catchError( err => of([]))
    )
  }

  createEmployee(data){

  }

  deleteEmployee(id:string){
    const url = this.baseURl + `/${id}`;
  }

  format(employee):EmployeeModel{
    return {
      id: employee.id,
      dni: employee.dni,
      email: employee.email,
      name: employee.name,
      role: employee.role,
      state: employee.state || 1,
      img: employee.img || this.defaultImage,
      admissionDate: employee.admission_date || '29-09-2023',
    }
  }

}
