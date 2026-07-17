import {booleanAttribute, Component, Input} from '@angular/core';
import {BlackButtonComponent} from "../black-button/black-button.component";
import {FormsModule} from "@angular/forms";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-to-do-list-form',
  standalone: true,
  imports: [
    BlackButtonComponent,
    FormsModule
  ],
  templateUrl: './to-do-list-form.component.html',
  styleUrl: './to-do-list-form.component.scss'
})
export class ToDoListFormComponent {
  constructor(private taskService: TasksService) {
  }

  @Input({transform: booleanAttribute}) protected showButton = false

  @Input({required: true}) placeHolder!: string

  @Input({required: true}) id!: string

  @Input({required: true}) type!: string

  protected task: string | undefined


  protected addTask() {
    if (this.task === undefined || this.task === '' || this.task === null) return

    this.taskService.addNewTask(Date.now().toString(36) + Math.random().toString(36).substr(2, 5), this.task!)
    this.task = ''
  }
}
