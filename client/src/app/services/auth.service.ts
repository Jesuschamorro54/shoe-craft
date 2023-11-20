import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZG5pIjoiMTAwMjE1OTk4NSIsIm5hbWUiOiJKZXN1cyBDaGFtb3JybyIsImVtYWlsIjoiamVzdXNmZWxpNTRAZ21haWwuY29tIiwic3RhdGUiOjEsInJvbGUiOiJhZG1pbiIsImNyZWF0aW9uIjoiMjAyMy0xMC0xMiAwNTowNToxMyIsImV4cCI6MTcwMDUxOTMyOS44NjM5NjN9.5PtzErmLsLEa3Yamm9r-lqnhO4XlhVAazIz2mNZ0IEw';

  constructor() { }
}
