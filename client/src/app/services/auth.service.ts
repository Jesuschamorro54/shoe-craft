import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token:string = '';
  private apiUrl = environment.apiUrl;
  private serverUrl = environment.serverUrl;

  constructor(
    private http: HttpClient,
  ) { }

  logIn(data):Observable<any>{
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post(url,{ data })
    .pipe(map((response:any) => {
      if (response.status){
        const { data } = response
        if (data.status) {
          localStorage.setItem('token', data.idToken);
          this.setToken(data.idToken);
          return true
        }else{
          return false
        }
      }
    }),
    retry(3),
    catchError(this.handleError<any>('logIn', [])));
  }

  verifyToken():Observable<boolean>{
    const token = localStorage.getItem('token');
    if (!token) return

    const url = `${this.serverUrl}/verify`;
    return this.http.post(url, {token}).pipe(
      map( (response:any) => {
        if (response.status) {
          this.setToken(token);
          return true;
        }else{
          localStorage.removeItem('token');
          this.setToken('');
          return false;
        }
      }),
      catchError(this.handleError<any>('verify', []))
    )

  }

  public getUserAuthenticated(): Observable<Boolean> {
    return new Observable<any>(observer => {
      try {

        // Extraer el token del local storage
        let token: string = localStorage.getItem('token');

        // Decostruir el token
        let tokenDecoded = jwtDecode.jwtDecode(token);

        // Validar si el token es verdadero
        if (this.isTokenValid(tokenDecoded)){
          this.setToken(token);
          observer.next(true);
        } else {
          console.log("UserNotAuthenticated")
          observer.next(false)
        }
        
      } catch (error) {
        console.log(error)
        console.log("UserNotAuthenticated")
        observer.next(false)
      }

    });
  }

  isTokenValid(decodedToken: any): boolean {
    return decodedToken && decodedToken.exp && Date.now() / 1000 < decodedToken.exp;
  }

  logOut(){
    this.token = '';
    localStorage.removeItem('token');
  }

  get isAuth():boolean{
    return !!this.token;
  }

  private setToken(token){
    this.token = token;
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
