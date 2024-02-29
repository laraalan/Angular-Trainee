import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getAllProductsResponse } from 'src/app/models/interfaces/products/response/getAllProdutsResponse';
import { ProductEvent } from 'src/app/models/enums/products/product-event';import { EventAction } from 'src/app/models/interfaces/products/event/eventAction';
import { deleteProductAction } from 'src/app/models/interfaces/products/event/deleteProductAction';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
  @Input() products: Array<getAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<deleteProductAction>();

  public productSelected!: getAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string):void {
    if(action && action != ''){
      const productEventData = id && id !== '' ? {action, id}:{action}
      //Emitir o valor do evento
      this.productEvent.emit(productEventData)
    }
  }

  handleDeleteProduct(product_id: string, product_name: string):void {
    if(product_id !=='' && product_name !== ''){
      this.deleteProductEvent.emit({product_id, product_name})
    }
  }
}
