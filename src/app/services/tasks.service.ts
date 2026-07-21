import {computed, effect, Injectable, signal} from '@angular/core';
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private toDoListKey: string = 'ToDoListANGULAR';
  private _tasks = signal<Task[]>(this.getTasksFromLocalStorage())
  readonly tasks = this._tasks.asReadonly()
  readonly totalTasks = computed(() => this._tasks().length)
  readonly doneTasks = computed(() => this.countTasksDone())

  constructor() {
    effect(() => localStorage.setItem(this.toDoListKey, JSON.stringify(this._tasks()))
    );
  }

  private getTasksFromLocalStorage(): Task[] {
    const taskString = localStorage.getItem(this.toDoListKey)

    if (!taskString) return [] as Task[]

    return JSON.parse(taskString) as Task[]
  }

  addNewTask(id: string, content: string, isChecked: boolean) {
    const task: Task = {
      id: id,
      content: content,
      isChecked: isChecked
    }

    if (this._tasks().length === 0) {
      this._tasks.set([task])
      localStorage.setItem(this.toDoListKey, JSON.stringify(this._tasks()))
    } else {
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
    this._tasks.update(tasks => tasks.filter(task => task.id !== id)
    )
  }

  toggleCheckTask(id: string) {
    this._tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? {...task, isChecked: !task.isChecked}
          : task
      )
    )
  }

  private countTasksDone(): number {
    let counter: number = 0
    this._tasks().forEach(task => {
      if (task.isChecked) counter++
    })

    return counter
  }
}
