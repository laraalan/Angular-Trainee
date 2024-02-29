import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/products/data-transfer.service';
import { ProductsService } from './../../../../services/products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { getAllProductsResponse } from 'src/app/models/interfaces/products/response/getAllProdutsResponse';
import { EventAction } from 'src/app/models/interfaces/products/event/eventAction';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>()
  public productDatas: Array<getAllProductsResponse> = [];
  private ref!: DynamicDialogRef;

  constructor(
    private productService: ProductsService,
    private productDtService: DataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmaTionSercive: ConfirmationService,
    private dialogService: DialogService
  ){}

  ngOnInit(): void{
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas(){
    const productsLoaded = this.productDtService.getProductsDatas();

    if(productsLoaded.length > 0){
      this.productDatas = productsLoaded;
    }else this.getAPIProductsDatas();

    // console.log(`DADOS DE PRODUTOS`, this.productDatas);
  }

  getAPIProductsDatas(): void{
    this.productService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length>0){
          this.productDatas = response;
          // console.log(`DADOS DE PRODUTOS`, this.productDatas);
        }
      },
      error: err =>{
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos',
          life: 2500
        });
        this.router.navigate(['/dashboard'])
      }
    })
  }

  handleProductAction(event: EventAction): void {
    if(event){
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {event: event, productDatas: this.productDatas},
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIProductsDatas(),
      })
    }
  }

  handleDeleteProductAction(event: {product_id:string, product_name:string}): void {
    if(event){
      // console.log('DADOS DO EVENTO PARA DELETAR RECEBIDO:', event) ;
      this.confirmaTionSercive.confirm({
        message: `Confirma a exclusão do produto: ${event?.product_name}?`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: ()=>this.deleteProduct(event?.product_id)
      })
    }
  }

  deleteProduct(product_id: string) {
    if(product_id){
      this.productService.deleteProducts(product_id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) =>{
          if(response){
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto Removido com sucesso!',
              life: 2500,
            });

            this.getAPIProductsDatas();          }
        },
        error: (err) =>{
          console.log(err);
          this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover produto!',
              life: 2500,
          })
        }
      })
    }
  }

  ngOnDestroy(): void {

  }
}
