import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { TaskListInterface } from '../models/task-list.interface';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  readonly url = `${environment.apiUrl}/lists`;
  lists: TaskListInterface[];
  constructor(private http: HttpClient, private tasksService: TasksService) {}

  createList(list: TaskListInterface) {
    return this.http.post(this.url, list);
  }
  getLists(): Observable<TaskListInterface[]> {
    return this.http
      .get<TaskListInterface[]>(this.url)
      .pipe(tap(lists => (this.lists = lists)));
  }
  deleteList(list) {
    return this.http.delete(`${this.url}/${list.id}`).pipe(
      switchMap(() => {
        return this.tasksService.getTasks();
      }),
      map(tasks => tasks.filter(task => task.type === list.name)),
      tap(tasks => {
        tasks.forEach(task => this.tasksService.deleteTask(task).subscribe());
      })
    );
  }
}
