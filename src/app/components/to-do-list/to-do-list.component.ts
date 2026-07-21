import {Component, signal, OnInit, Input, WritableSignal, computed, Signal} from '@angular/core';
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
export class ToDoListComponent{
  protected readonly tasksList = this.taskService.tasks
  private searchQuery: WritableSignal<string> = signal('')
  protected task: string | undefined
  protected dataToShow= computed(() => {
    return this.tasksList().filter(task => {
      return task.content.toLowerCase().includes(this.searchQuery().toLowerCase())
    })
  })

  constructor(private taskService: TasksService ) {}

  protected addTask() {
    if (this.task === undefined || this.task === '' || this.task === null) return

    this.taskService.addNewTask(Date.now().toString(36) + Math.random().toString(36).substr(2, 5), this.task!, false)
    this.task = ''
  }

  protected onInput(value: string) {
    this.searchQuery.set(value)
  }
}
