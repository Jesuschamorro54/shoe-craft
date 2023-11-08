import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseURl: string = 'http://jesusthor.pythonanywhere.com/api';
  defaultImage: string = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
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
    const url= this.baseURl + "/employees"
    return this.http.get(url,{headers}).pipe(
      map( response => {
        if (response['data'].length > 0) {
          response['data'].forEach(employee => {
            this.employeesList.push(this.format(employee));
          });
          return this.employeesList;
        }
      }),
      retry(3),
      catchError( this.handleError<any>('getEmployee', []))
    )
  }

  /**Crear empleado
   * * @returns el empleado proyecto que se crea data y status
   * @param data debe ser de tipo EmployeeModel
   */
  createEmployee(data):Observable<any>{
    const url = this.baseURl+'/auth/employee';
    const headers = {
      Authorization: this._authService.token
    };

    return this.http.post(url,{ data },{headers}).pipe(
      map( response => {
        console.log("response create",response);
        return response;
      }),
      retry(3),
      catchError( this.handleError<any>('createEmployee', []))
    )
  }

  /**Eliminar empleado
   * *  @param employee_id debe ser de tipo string
   * * @returns status y la cantidad de rows eliminadas
  */
  deleteEmployee(id:string):Observable<any>{
    const url = this.baseURl + `/employees/${id}`;
    const headers = {
      Authorization: this._authService.token
    };

    return this.http.delete(url,{headers})
    .pipe(map((response:any) => {
      return response;
    }),
    retry(3),
    catchError(this.handleError<any>('deleteEmployee', [])));
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
      admissionDate: employee.creation || '29-09-2023',

      address: employee.address || 'carrera 11',
      phone: employee.phone || 30000000,
      gender: employee.gender || 'female',
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure

      console.log('%cerror::', 'color:red', error); // log to console instead
      // (error.error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
