import {Component, signal, computed, inject} from '@angular/core';
import {ToDoListSubHeaderComponent} from "../to-do-list-sub-header/to-do-list-sub-header.component";
import {ToDoListTaskComponent} from "../to-do-list-task/to-do-list-task.component";
import {BlackButtonComponent} from "../black-button/black-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TodoRepository} from "../../repositories/todo.repository";
import {toSignal} from "@angular/core/rxjs-interop";


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
export class ToDoListComponent {
  protected tasksRepo = inject(TodoRepository)
  private input = signal('')
  protected task: string = '';
  protected tasks = toSignal(this.tasksRepo.showTasks$, {
    initialValue: []
  })
  protected tasksToShow = computed(() => {
    return this.tasks().filter(task =>
      task.title.toLowerCase().includes(this.input().toLowerCase())
    )
  })

  onInput(value: string) {
    this.input.set(value)
  }

  addTask() {
    if (this.task === '' || this.task === undefined) {
      alert('Вы ничего не ввели или ввели некорректные данные');
      this.task = ''
    } else {
      this.tasksRepo.addNewTask(this.task)
      this.task = ''
    }
  }
}
