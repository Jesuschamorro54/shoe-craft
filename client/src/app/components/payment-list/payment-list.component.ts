import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  paymentList=[
    {
      id:'1',
      name: 'Sara Acuña Benavides',
      role: 'Cortador',
      documentNumber: '1052964434',
      createdAt: '21/07/2023',
      value: '5000000',
      paymentAt: '21/07/2023',
      paymentMethod: 'Bancolombia',
      status: 'Pendiente',
      state: 1,
      note: 'EL pago se realizo con firma etxc'
    },
    {
      id:'2',
      name: 'Sara Acuña Benavides',
      role: 'Cortador',
      documentNumber: '1052964434',
      createdAt: '21/07/2023',
      value: '5000000',
      paymentAt: '21/07/2023',
      paymentMethod: 'Bancolombia',
      status: 'Pendiente',
      state: 1,
      note: 'EL pago se realizo con firma etxc'
    },
    {
      id:'3',
      name: 'Sara Acuña Benavides',
      role: 'Cortador',
      documentNumber: '1052964434',
      createdAt: '21/07/2023',
      value: '5000000',
      paymentAt: '21/07/2023',
      paymentMethod: 'Bancolombia',
      status: 'Exitoso',
      state: 1,
      note: 'EL pago se realizo con firma etxc'
    },
  ];

  paymentsCopy;
  filterType: string = '';
  editing;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit(): void {
    this.paymentsCopy = {...this.paymentList};
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
    this.editing = this.paymentList.find( payment => payment.id === id );
  }

  cancelEdit(){
    this.editing = '';
  }

  save(){
    const index = this.paymentList.findIndex( payment => payment.id === this.editing.id );
    this.paymentList[index] = { ...this.editing }
    this.editing = null;
  }

  get payments(){
    if (!this.filterType) return this.paymentList;
    return this.paymentList.filter( payment => payment.status === this.filterType );
  }

}
