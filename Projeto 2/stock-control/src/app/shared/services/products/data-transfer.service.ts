import { ProductsService } from './../../../services/products/products.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { getAllProductsResponse } from 'src/app/models/interfaces/products/response/getAllProdutsResponse';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Array<getAllProductsResponse> | null>(null);
  public productsDatas: Array<getAllProductsResponse> = [];
  constructor() {}

  setProductsDatas(products: Array<getAllProductsResponse>): void{
    if(products){
      this.productsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }

  getProductsDatas(){
    this.productsDataEmitter$
    .pipe(
      take(1),
      map((data)=>data?.filter((produts=>produts.amount>0)))
    )
    .subscribe({
      next: (response) =>{
        if(response){
          this.productsDatas = response;
        }
      }
    })
    return this.productsDatas;
  }
}
