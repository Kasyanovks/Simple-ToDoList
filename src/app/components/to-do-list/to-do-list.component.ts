import {Component, signal, OnInit} from '@angular/core';
import {ToDoListFormComponent} from "../to-do-list-form/to-do-list-form.component";
import {ToDoListSubHeaderComponent} from "../to-do-list-sub-header/to-do-list-sub-header.component";
import {ToDoListTaskComponent} from "../to-do-list-task/to-do-list-task.component";
import {Task} from "../../models/task";
import {TasksService} from "../../services/tasks.service";


@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ToDoListFormComponent,
    ToDoListSubHeaderComponent,
    ToDoListTaskComponent,
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit{
  constructor(private tasksService: TasksService ) {
  }

  ngOnInit() {

  }

  protected readonly tasksList = this.tasksService.tasks
}
