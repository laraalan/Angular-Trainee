import { Todo } from './../models/model/todo.model';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { ToDoSignalsService } from "./to-do-signals.service";

@Injectable({providedIn: 'root'})
export class ExemploTestService{

  public testNameList: Array<{id: number, name:string}> = [{id:1, name: 'Test1'}, {id: 2, name: 'Test 2'}]
  constructor(private todoSeginalService: ToDoSignalsService){}

  public getNamesList() : Observable<Array<{id: number, name:string}>>{
    return of(this.testNameList)
  }

  public handleCreateTodo(todo: Todo): Observable<Array<Todo>>{
    if(todo){
      this.todoSeginalService.updateTodos(todo);
    }
    return of(this.todoSeginalService.todosState())
  }
}
