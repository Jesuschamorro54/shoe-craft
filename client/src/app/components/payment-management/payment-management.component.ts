import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  ){
  }

  ngOnInit(){
    let path = this._router.url.split("/").slice(-1).pop().split("?")[0];
    // Si la ruta a la que accede no es ninguna de las correctas se establece el search-candidates
    if (['records', 'pending-payments', 'exit-payments'].includes(path)) {
      this.menuIdentifier = path;
    }
  }

  btbMenu(path:string) {
    console.log("path", path);
    const pathRedirect = path.split("?")[0];
    const url = this._router.url.replace(this.menuIdentifier, pathRedirect)
    this.menuIdentifier = pathRedirect;
    this._router.navigate([url.split("?")[0]])
  }

}
