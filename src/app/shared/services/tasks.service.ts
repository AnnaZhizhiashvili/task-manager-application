import { Injectable } from '@angular/core';
import { TaskListInterface } from '../models/task-list.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public taskLists: TaskListInterface[] = [
    {
      index: 1,
      name: 'To Do',
      tasks: [
        {
          description: '1 task description',
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

  createList(list) {
    return this.http.post(`${environment.apiUrl}`, list);
  }
  getLists() {
    return this.http.get(`${environment.apiUrl}`);
  }
}
