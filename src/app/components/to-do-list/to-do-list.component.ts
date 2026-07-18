import {Component, signal, OnInit, Input} from '@angular/core';
import {ToDoListSubHeaderComponent} from "../to-do-list-sub-header/to-do-list-sub-header.component";
import {ToDoListTaskComponent} from "../to-do-list-task/to-do-list-task.component";
import {Task} from "../../models/task";
import {TasksService} from "../../services/tasks.service";
import {BlackButtonComponent} from "../black-button/black-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ToDoListSubHeaderComponent,
    ToDoListTaskComponent,
    BlackButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit{
  constructor(private taskService: TasksService ) {
  }

  ngOnInit() {
  }

  protected readonly tasksList = this.taskService.tasks


  protected task: string | undefined


  protected addTask() {
    if (this.task === undefined || this.task === '' || this.task === null) return

    this.taskService.addNewTask(Date.now().toString(36) + Math.random().toString(36).substr(2, 5), this.task!)
    this.task = ''
  }
}
