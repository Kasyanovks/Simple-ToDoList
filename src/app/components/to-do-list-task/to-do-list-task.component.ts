import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {TodoRepository} from "../../repositories/todo.repository";
import {ITask} from "../../models/task.interface";

@Component({
  selector: 'app-to-do-list-task',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-task.component.html',
  styleUrl: './to-do-list-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListTaskComponent {
  protected tasks = inject(TodoRepository)

  public task = input<ITask>()


  protected checkedOrNot(id: string) {
    this.tasks.checkTask(id)
  }

  protected delete(id: string) {
    this.tasks.deleteTask(id)
  }
}
