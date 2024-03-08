import { TestBed } from '@angular/core/testing';

import { ToDoSignalsService } from '../to-do-signals.service';
import { ExemploTestService } from '../exemplo-test.service';
import { Todo } from 'src/app/models/model/todo.model';

describe('ExampleTestService', () => {
  let service: ExemploTestService;
  let todoService: ToDoSignalsService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExemploTestService);
    todoService = TestBed.inject(ToDoSignalsService);
  });

  it('should return correct list', () => {
    service.getNamesList().subscribe({
      next: (list) => {
      expect(list).toEqual([{id:1, name: 'Test1'}, {id: 2, name: 'Test 2'}])
      }
    })
  });


  it('should return correct todo list',() => {
    jest.spyOn(todoService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      title: 'New Todo',
      description: 'Description for test',
      done: true
    }
    service.handleCreateTodo(newTodo).subscribe({
      next: todoList => {
        expect(todoList).toEqual([newTodo])
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo)}
    })
  });

});

