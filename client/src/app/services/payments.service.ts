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

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
  ) { }


  getPayments():Observable<PaymentsModel[]>{
    const headers = {
      Authorization: this._authService.token
    }
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
    return {
      id: payment.id,
      employeeId: payment.employee_id,
      state: payment.state,
      total:payment.tota,
      date:payment.date
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
