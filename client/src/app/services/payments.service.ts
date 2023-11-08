import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
