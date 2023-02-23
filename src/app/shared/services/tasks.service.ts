import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TaskItemInterface } from '../models/task-item.interface';
import { BehaviorSubject, shareReplay, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  onNotification = new Subject();
  tasksUpdated = new Subject();
  onTaskDestinationChange = new Subject();
  public loading = new BehaviorSubject(true);
  readonly url = `${environment.apiUrl}/tasks`;
  constructor(private http: HttpClient) {}

  createTask(task) {
    return this.http.post(this.url, task);
  }
  getTasks(type?) {
    this.loading.next(true);
    if (type) {
      let params = new HttpParams();
      params = params.set('type', type);
      return this.http
        .get<TaskItemInterface[]>(this.url, { params: params })
        .pipe(
          tap(() => this.loading.next(false)),
          shareReplay({ bufferSize: 1, refCount: true })
        );
    }
    return this.http
      .get<TaskItemInterface[]>(this.url)
      .pipe(tap(() => this.loading.next(false)));
  }

  editTask(task: TaskItemInterface) {
    return this.http.put(`${this.url}/${task.id}`, task);
  }
  deleteTask(task: TaskItemInterface) {
    return this.http.delete(`${this.url}/${task.id}`);
  }
}
