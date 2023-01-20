import { Injectable } from '@angular/core';
import { TaskListInterface } from '../models/task-list.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TaskItemInterface } from '../models/task-item.interface';
import { Subject } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  onNotification = new Subject();
  tasksUpdated = new Subject();
  readonly url = `${environment.apiUrl}/tasks`;
  constructor(private http: HttpClient) {}

  createTask(task) {
    return this.http.post(this.url, task);
  }
  getTasks(type?) {
    if (type) {
      let params = new HttpParams();
      params = params.set('type', type);
      return this.http.get<TaskItemInterface[]>(this.url, { params: params });
    }
    return this.http.get<TaskItemInterface[]>(this.url);
  }

  editTask(task: TaskItemInterface) {
    return this.http.put(`${this.url}/${task.id}`, task);
  }
  deleteTask(task: TaskItemInterface) {
    return this.http.delete(`${this.url}/${task.id}`);
  }
}
