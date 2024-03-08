import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoSignalsService } from 'src/app/services/to-do-signals.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './todo-form.component.html',
  styleUrls: []
})
export class TodoFormComponent {
  private todoSignalsService = inject(ToDoSignalsService);
  public allTodos = this.todoSignalsService.todosState();
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  public handleCreateNewTodo(): void {
    if(this.todosForm.value && this.todosForm.valid){
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.todoSignalsService.updateTodos({id, title, description, done});
      this.handleCloseModal();
    }
  }

  public handleCloseModal():void{
    this.dialogRefService.close();
  }
}

