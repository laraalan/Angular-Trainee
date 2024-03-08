import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, computed, inject } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ToDoSignalsService } from 'src/app/services/to-do-signals.service';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';
import { CustomUpperCasePipe } from 'src/app/shared/pipes/custom-upper-case.pipe';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [NgFor, NgIf, NgTemplateOutlet, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, CustomUpperCasePipe],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit{

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }
  private todoSignalsService = inject(ToDoSignalsService);
  private todosSignal = this.todoSignalsService.todosState; //Array atual de tarefas
  public todosList = computed(()=> this.todosSignal()); // usa computed quando depende de valores de outro signal, toda alteração no signal altera aqui

  private getTodosInLocalStorage():void {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string
    todosDatas && (this.todosSignal.set(JSON.parse(todosDatas)));
  }

  private saveTodosInLocalStorage(): void{
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId:number): void{
    if(todoId){
      this.todosSignal.mutate((todos)=>{
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
        this.saveTodosInLocalStorage();
      })
    }
  }

  public handleDeleteTodo(todo: Todo):void {
    if(todo){
      const index = this.todosList().indexOf(todo);

      if(index !== -1){
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
        })
      }

    }
  }


}



