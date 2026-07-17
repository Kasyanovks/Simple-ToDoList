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
  @Input() id!: string
  @Input() content!: string

  constructor(protected taskService: TasksService) {
  }

  protected delete(id: string) {
    this.taskService.deleteTask(id)
  }
}
