import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURl: string = environment.apiUrl;

  productList:ProductsModel[] = [];

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
  ) { }

  /**Traer productos */
  getProducts():Observable<ProductsModel[]>{
    const headers = {
      Authorization: this._authService.token
    }

    this.productList = [];

    const url= this.baseURl + "/products"
    return this.http.get(url,{headers}).pipe(
      map( response => {
        if (response['data'].length > 0) {
          response['data'].forEach(product => {
            this.productList.push(product);
          });
          return this.productList;
        }
      }),
      retry(3),
      catchError( this.handleError<any>('getProducts', []))
    )
  }

  /**Crear producto
   * * @returns el producto que se crea data y status
   * @param data debe ser de tipo
   */
  createProducts(data):Observable<any>{
    const url = this.baseURl+'/products';
    const headers = {
      Authorization: this._authService.token
    };

    return this.http.post(url,{ data },{headers}).pipe(
      map( response => {
        console.log("response create",response);
        return response;
      }),
      retry(3),
      catchError( this.handleError<any>('createProducts', []))
    )
  }

  /**Eliminar empleado
   * *  @param product_id debe ser de tipo string
   * * @returns status y la cantidad de rows eliminadas
  */
  deleteProduct(id:string):Observable<any>{
    const url = this.baseURl + `/products/${id}`;
    const headers = {
      Authorization: this._authService.token
    };

    return this.http.delete(url,{headers})
    .pipe(map((response:any) => {
      return response;
    }),
    retry(3),
    catchError(this.handleError<any>('deleteProduct', [])));
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
