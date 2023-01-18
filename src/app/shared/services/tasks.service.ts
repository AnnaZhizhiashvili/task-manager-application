import { Injectable } from '@angular/core';
import { TaskListInterface } from '../models/task-list.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TaskItemInterface } from '../models/task-item.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  onNotification = new Subject();
  tasksUpdated = new Subject();
  readonly url = `${environment.apiUrl}/tasks`;
  public taskLists: TaskListInterface[] = [
    {
      index: 1,
      name: 'To Do',
      tasks: [
        {
          description: '1 task description',
          id: 111111111,
          type: 'To Do',
          members: [
            {
              name: 'Ana',
              surname: 'Zhizhiashvili',
              mail: 'AnaZhizhiashvili@gmail.com',
              color: 'warning',
            },
            {
              name: 'Mariam',
              surname: 'Bakhurauli',
              mail: 'MariamBakhurauli@gmail.com',
              color: 'info',
            },
          ],
        },

        {
          description: '1 b task description',
          id: 22222222,
          type: 'To Do',
          members: [
            {
              name: 'Ana',
              surname: 'Zhizhiashvili',
              mail: 'AnaZhizhiashvili@gmail.com',
              color: 'warning',
            },
            {
              name: 'Mariam',
              surname: 'Bakhurauli',
              mail: 'MariamBakhurauli@gmail.com',
              color: 'info',
            },
          ],
        },
      ],
    },
    {
      index: 2,
      name: 'In Progress',
      tasks: [
        {
          description: '2 task description',
          id: 33333333,
          type: 'In Progress',
          members: [
            {
              name: 'Ana',
              surname: 'Zhizhiashvili',
              mail: 'AnaZhizhiashvili@gmail.com',
              color: 'warning',
            },
            {
              name: 'Mariam',
              surname: 'Bakhurauli',
              mail: 'MariamBakhurauli@gmail.com',
              color: 'info',
            },
          ],
        },
      ],
    },
    {
      index: 3,
      name: 'Done',
      tasks: [
        {
          description: '3 task description',
          id: 4444444,
          type: 'Done',
          members: [
            {
              name: 'Ana',
              surname: 'Zhizhiashvili',
              mail: 'AnaZhizhiashvili@gmail.com',
              color: 'warning',
            },
            {
              name: 'Mariam',
              surname: 'Bakhurauli',
              mail: 'MariamBakhurauli@gmail.com',
              color: 'info',
            },
          ],
        },
      ],
    },
  ];
  constructor(private http: HttpClient) {}

  // createList(list) {
  //   return this.http.post(this.url, list);
  // }
  // getLists() {
  //   return this.http.get(this.url);
  // }
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
  uniqueID() {
    return Date.now();
  }
}
