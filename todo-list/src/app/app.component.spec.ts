import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';
import { ToDoSignalsService } from './services/to-do-signals.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { Todo } from './models/model/todo.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalService: ToDoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [ToDoSignalsService]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalService = TestBed.inject(ToDoSignalsService);
    fixture.detectChanges();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  //teste de @Input
  it('should set @Input value correcty', () => {
    component.projectName = 'Testing Angular With Jest';
    fixture.detectChanges();
    expect(component.projectName).toEqual('Testing Angular With Jest');
  });


  //teste de @output
  it('should emit event with output decorator correctly', () => {
    component.projectName = 'Testing my Angular application';

    component.outputEvent.pipe(
      first()
    )
    .subscribe({
      next: event => {
        expect(event).toEqual('Testing my Angular application');
        component.handleEmmitEvent()}
    })
  })

  //Teste de acionamento e de um singla
  it('should create new todo correctly and call service method', () =>{
    jest.spyOn(todoSignalService, 'updateTodos');

    const newTodo: Todo = {
      id: 1,
      title: 'Testing creating Todo',
      description: 'Test new Todo',
      done: true,
    };

    component.handleCreateTodo(newTodo);

    fixture.detectChanges();

    expect(todoSignalService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);

  });


  //Teste elementos DOM
  it('should not render paragraph in the DOM', () => {
    const compoponentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = compoponentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull;

  })


  it('should render paragraph correctly', () => {
    component.renderTestMessage = true;

    fixture.detectChanges();

    const compoponentDebugElement: DebugElement = fixture.debugElement;
    const paragraphDebugElement = compoponentDebugElement.query(By.css('p'));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;

    expect(paragraph.textContent).toEqual('Test your Angular aplication');
  })

  //Teste setTimeOut
  it('should isDoned property to be false', () => {
    component.handleCheckIsDone();

    expect(component.isDoned).toBe(false);
  })

  it('should isDoned property to be true', fakeAsync(()=>{
    component.handleCheckIsDone();
    tick(200);
    expect(component.isDoned).toBe(true);
  }))



});
