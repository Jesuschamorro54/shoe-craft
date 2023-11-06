import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZG5pIjoiMTAwMjE1OTk4NSIsIm5hbWUiOiJKZXN1cyBDaGFtb3JybyIsImVtYWlsIjoiamVzdXNmZWxpNTRAZ21haWwuY29tIiwic3RhdGUiOjEsInJvbGUiOiJhZG1pbiIsImNyZWF0aW9uIjoiMjAyMy0xMC0xMiAwNTowNToxMyIsImV4cCI6MTY5OTMyOTYzOS45Mjc2NzJ9.TrsuzKFVtUH71JtaB1aFHXg_2niGRMF8kRslGY0AZRw';

  constructor() { }
}
