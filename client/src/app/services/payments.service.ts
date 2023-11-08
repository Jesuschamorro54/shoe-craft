import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  paymentsList=[]

  constructor(
    private http: HttpClient,
  ) { }

  getPayments(){

  }









}
