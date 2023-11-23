import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent {

  // Permite identidicar el menu
  menuIdentifier:string="records";

  constructor(
    public _router:Router,
    public _route:ActivatedRoute,
    public _paymentsService: PaymentsService
  ){
  }

  ngOnInit(){
    let path = this._router.url.split("/").slice(-1).pop().split("?")[0];
    // Si la ruta a la que accede no es ninguna de las correctas se establece el search-candidates
    if (['records', 'pending-payments', 'exit-payments'].includes(path)) {
      this.menuIdentifier = path;
    }
    else{
      const url = this._router.url;
      this._router.navigate([url.split("?")[0]+'/records']);
    }

    this.getPayments();
  }

  btbMenu(path:string) {
    const pathRedirect = path.split("?")[0];
    const url = this._router.url.replace(this.menuIdentifier, pathRedirect)
    this.menuIdentifier = pathRedirect;
    this._router.navigate([url.split("?")[0]])
  }

  getPayments(){
    this._paymentsService.getPayments().subscribe(()=>{})
  }

}
