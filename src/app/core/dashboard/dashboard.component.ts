import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs';
import { TasksService } from '../../shared/services/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public display = false;
  public taskLists = this.tasksService.taskLists;
  constructor(private tasksService: TasksService) {}
}
