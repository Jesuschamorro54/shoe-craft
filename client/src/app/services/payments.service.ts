import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { PaymentsModel } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  paymentsList=[]

  baseURl: string = environment.apiUrl;

  stateEnums = {
    "1": 'Exitoso',
    "-1": 'Eliminado',
    "0": 'Pendiente'
  }

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
  ) {}


  getPayments():Observable<PaymentsModel[]>{
    const headers = {
      Authorization: this._authService.token
    }

    this.paymentsList = [];
    const url= this.baseURl + "/payments"
    return this.http.get(url,{headers}).pipe(
      map( response => {
        if (response['data'].length > 0) {
          response['data'].forEach(payment => {
            this.paymentsList.push(this.formatPayments(payment));
          });
          return this.paymentsList;
        }
      }),
      retry(3),
      catchError( this.handleError<any>('getPayment', []))
    )
  }

  formatPayments(payment):PaymentsModel{

    const defaultImage = 'https://i.pinimg.com/originals/a8/57/00/a85700f3c614f6313750b9d8196c08f5.png';

    const details = [];

    payment.details.forEach((detail:any)=>{
      details.push({
        id: detail.id,
        packageId: detail.package_id,
        paymentId:detail.payment_id,
        value: detail.value,
        state: detail.state,
        date: detail.date
      })
    })

    return {
      id: payment.id,
      employeeId: payment.employee_id,
      state: this.stateEnums[payment.state] || 'No Detallado',
      total:payment.total,
      date:payment.date,
      details,
      user:{
        id:payment.user[0].id,
        name:payment.user[0].name,
        image:payment.user[0].image || defaultImage,
        role:payment.user[0].role,
        dni:payment.user[0].dni,
      }
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
