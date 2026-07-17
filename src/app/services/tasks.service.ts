import {effect, Injectable, signal} from '@angular/core';
import { Task } from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private toDoListKey: string = 'ToDoListANGULAR';
  private _tasks = signal<Task[]>(this.getTasksFromLocalStorage())
  readonly tasks = this._tasks.asReadonly()

  constructor() {
    effect(() => {
      localStorage.setItem(this.toDoListKey, JSON.stringify(this._tasks()))
    });
  }

  private getTasksFromLocalStorage(): Task[]{
    const taskString = localStorage.getItem(this.toDoListKey)

    if (!taskString) return [] as Task[]

    return JSON.parse(taskString) as Task[]
  }

  addNewTask(id: string, content: string) {
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

  deleteAllTasks() {
    this._tasks.set([])
    localStorage.setItem(this.toDoListKey, JSON.stringify(this._tasks))
  }

  deleteTask(id: string) {
    this._tasks.set(this._tasks().filter(task => {
      return task.id !== id
    }))
  }
}
