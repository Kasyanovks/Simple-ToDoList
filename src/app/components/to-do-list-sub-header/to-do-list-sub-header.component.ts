import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TodoRepository} from "../../repositories/todo.repository";
import {AsyncPipe} from "@angular/common";
import {IToDoProps} from "../../models/task.interface";

@Component({
  selector: 'app-to-do-list-sub-header',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './to-do-list-sub-header.component.html',
  styleUrl: './to-do-list-sub-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListSubHeaderComponent {

  private tasksRepo = inject(TodoRepository)

  protected total$ = this.tasksRepo.totalTasks$
  protected done$ = this.tasksRepo.doneTasks$

  protected selectFields= [
    {
      value: 'ALL'
    },
    {
      value: 'ACTIVE'
    },
    {
      value: 'COMPLETED'
    }
  ] as const


  deleteTasks() {
    this.tasksRepo.clearTaskList()
  }

  toDoShow(event: Event) {
    const filter = (event.target as HTMLSelectElement).value as IToDoProps['filter']

    this.tasksRepo.updateFilter(filter)
  }
}
