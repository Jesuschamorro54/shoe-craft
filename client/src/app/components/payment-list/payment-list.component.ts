import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  paymentsCopy;
  filterType: string = '';
  editing;

  constructor(
    private _router: Router,
    public _paymentsService: PaymentsService
  ){}

  ngOnInit(): void {
    this.paymentsCopy = {...this._paymentsService.paymentsList};
    this.setMenuIdentifier();
  }

  setMenuIdentifier(){
    const splitPath = this._router.url.split('/');
    const menuIdentifier = splitPath[splitPath.length - 1];
    switch (menuIdentifier) {
      case 'exit-payments':
        this.filterType = 'Exitoso'
        break;
      case 'pending-payments':
        this.filterType = 'Pendiente'
        break;
      default:
        this.filterType = ''
        break;
    }
  }

  edit(id:string):void{
    this.editing = this._paymentsService.paymentsList.find( payment => payment.id === id );
  }

  cancelEdit(){
    this.editing = '';
  }

  save(){
    const index = this._paymentsService.paymentsList.findIndex( payment => payment.id === this.editing.id );
    this._paymentsService.paymentsList[index] = { ...this.editing }
    this.editing = null;
  }

  get payments(){
    if (!this.filterType) return this._paymentsService.paymentsList;
    return this._paymentsService.paymentsList.filter( payment => payment.state === this.filterType );
  }

}
