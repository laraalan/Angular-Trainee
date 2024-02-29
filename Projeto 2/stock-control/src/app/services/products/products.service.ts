import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { enviroment } from 'src/enviroments/enviroment';
import { getAllProductsResponse } from 'src/app/models/interfaces/products/response/getAllProdutsResponse';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/deleteProductResponse';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProduct';
import { CreateProductResponse } from 'src/app/models/interfaces/products/response/createProductResponse';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProduct';
import { EditProductResponse } from 'src/app/models/interfaces/products/response/editProductResponse';
import { SaleProductRequest } from 'src/app/models/interfaces/products/request/SaleProduct';
import { SaleProductResponse } from 'src/app/models/interfaces/products/response/saleProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL =  enviroment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  };

  constructor(
    private http : HttpClient,
    private cookie : CookieService
  ) { }

  getAllProducts():Observable<Array<getAllProductsResponse>>{
    return this.http.get<Array<getAllProductsResponse>>(
      `${this.API_URL}/products`, this.httpOptions
    )
    .pipe(
      map((product)=> product.filter((data) => data?.amount>0))
    )
  }

  deleteProducts(product_id: string): Observable<DeleteProductResponse>{
    return this.http.delete<DeleteProductResponse>(
      `${this.API_URL}/product/delete`,
      {...this.httpOptions, params: {product_id: product_id}},

    )
  }

  createProduct(requestDatas: CreateProductRequest): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(`${this.API_URL}/product`, requestDatas, this.httpOptions)
  }

  editProduct(requestData: EditProductRequest): Observable<EditProductResponse>{
    return this.http.put<EditProductResponse>(`${this.API_URL}/product/edit`, requestData, this.httpOptions)
  }

  saleProduct(
    requestDatas: SaleProductRequest
  ): Observable<SaleProductResponse> {
    return this.http.put<SaleProductResponse>(
      `${this.API_URL}/product/sale`,
      {
        amount: requestDatas?.amount,
      },
      {
        ...this.httpOptions,
        params: {
          product_id: requestDatas?.product_id,
        },
      }
    );
  }
}

