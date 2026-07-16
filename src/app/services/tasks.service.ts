import {Injectable, signal} from '@angular/core';
import { Task } from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private toDoListKey: string = 'ToDoListANGULAR';

  constructor(

  ) { }

  private _tasks = signal<Task[]>(
    this.getTasksFromLocalStorage()
  )

  readonly tasks = this._tasks.asReadonly()

  getTasksFromLocalStorage(): Task[]{
    const taskString = localStorage.getItem(this.toDoListKey)

    if (!taskString) return [] as Task[]

    return JSON.parse(taskString) as Task[]
  }

  addTaskToLocalStorage(id: number, content: string) {
    const task: Task = {
      id: id,
      content: content
    }

    if (this._tasks().length === 0) {
      this._tasks.set([task])
      localStorage.setItem(this.toDoListKey, JSON.stringify(this._tasks()))
    }
    else {
      this._tasks.update(t => ([
        ...t,
        task
      ]))
      localStorage.setItem(this.toDoListKey, JSON.stringify(this._tasks()))
    }
  }

  showAllTasks() {
    return  signal<Task[]>  (this.getTasksFromLocalStorage())
  }
}
