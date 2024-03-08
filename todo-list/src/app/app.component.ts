import { Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, zip } from 'rxjs';
import { ToDoSignalsService } from './services/to-do-signals.service';
import { Todo } from './models/model/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title = 'todo-list';
  public students : Array<SchoolData> = [];
  public teachers : Array<SchoolData> = [];
  private zipSchoolResponse$ = zip(this.getStudentsDatas(), this.getTeachersDatas());
  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>();
  public todoSignal !: WritableSignal<Array<Todo>>
  public renderTestMessage = false;
  public isDoned = false;


  constructor(
    private schoolService: SchoolService,
    private todoSignalService: ToDoSignalsService,
  ){}

  ngOnInit(): void {
    this.getSchoolDatas();
  }

  handleEmmitEvent(): void{
    this.outputEvent.emit(this.projectName);
  }

  handleCheckIsDone(): void {
    setTimeout(()  => {
      this.isDoned = true;
    }, 200)
  }

  public getSchoolDatas(): void{
    this.zipSchoolResponse$.subscribe({
      next: (response)=>{
        console.log('Students', response[0]);
        console.log('Teachers', response[1]);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  private getStudentsDatas(): Observable<Array<SchoolData>>{
    return this.schoolService.getStudents();
  }

  private getTeachersDatas(): Observable<Array<SchoolData>>{
    return this.schoolService.getTeachers();
  }

  public handleCreateTodo(todo: Todo): void{
    if(todo){
      this.todoSignalService.updateTodos(todo);
      this.todoSignal = this.todoSignalService.todosState;

    }
  }
}
