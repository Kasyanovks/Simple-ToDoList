import { Injectable } from '@angular/core';
import { Task } from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private toDoListKey: string = 'ToDoListANGULAR';

  constructor(

  ) { }

  getTasksFromLocalStorage(): Task[]{
    const taskString = localStorage.getItem(this.toDoListKey)

    if (!taskString) return [] as Task[]

    return JSON.parse(taskString) as Task[]
  }
}
