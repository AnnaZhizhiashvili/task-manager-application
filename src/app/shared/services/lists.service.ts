import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskListInterface } from '../models/task-list.interface';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  readonly url = `${environment.apiUrl}/lists`;
  constructor(private http: HttpClient) {}

  createList(list: TaskListInterface) {
    return this.http.post(this.url, list);
  }
  getLists(): Observable<TaskListInterface[]> {
    return this.http.get<TaskListInterface[]>(this.url);
  }
}
