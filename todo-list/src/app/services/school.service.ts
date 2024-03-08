import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData{
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

private students : Array<SchoolData> = [
  {name: 'Marcos', id: '1'},
  {name: 'Pedro', id: '2'},
  {name: 'Luisa', id: '3'}
]

private teachers : Array<SchoolData> = [
  {name: 'Ortiz', id: '1'},
  {name: 'Reis', id: '2'},
  {name: 'Fabio', id: '3'}
]

  public getStudents(): Observable<Array<SchoolData>>{
    return of(this.students)
  }

  public getTeachers(): Observable<Array<SchoolData>>{
    return of(this.teachers)
  }

  constructor() { }
}
