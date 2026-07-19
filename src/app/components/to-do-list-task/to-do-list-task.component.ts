import {Component, Input} from '@angular/core';
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-to-do-list-task',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-task.component.html',
  styleUrl: './to-do-list-task.component.scss'
})
export class ToDoListTaskComponent {
  constructor(protected taskService: TasksService) {
  }

  @Input() id!: string
  @Input() content!: string
  @Input() isChecked!: boolean

  protected checkedOrNot(id: string) {
    this.taskService.toggleCheckTask(id)
  }

  protected delete(id: string) {
    this.taskService.deleteTask(id)
  }
}
