import { Component } from '@angular/core';
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-to-do-list-sub-header',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-sub-header.component.html',
  styleUrl: './to-do-list-sub-header.component.scss'
})
export class ToDoListSubHeaderComponent {
  constructor(protected taskService: TasksService) {
  }


  deleteTasks() {
    this.taskService.deleteAllTasks()
  }
}
