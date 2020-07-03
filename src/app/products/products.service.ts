import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap } from 'rxjs/operators';

import { Products } from './products';

@Injectable({
    providedIn: 'root'
})
export class  ProductService {
    private productUrl = 'api/products/products.json'
    constructor(private http: HttpClient) {} 

    getProducts(): Observable<Products[]> {
        return this.http.get<Products[]>(this.productUrl).pipe(
            tap(data => console.log(`All: ${JSON.stringify(data)}`)), 
            catchError(this.handleError)
        )
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage: string = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`; 
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}