import {Injectable} from "@angular/core";
import {createStore} from "@ngneat/elf";
import {
  addEntities,
  deleteAllEntities,
  deleteEntities, getEntity, selectAllEntities, selectEntitiesCount,
  updateEntities,
  withEntities
} from "@ngneat/elf-entities";
import {ITask} from "../models/task.interface";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class TodoRepository {
  private store = createStore(
    {name: 'to-do-list'},
    withEntities<ITask>()
  )
  private state = persistState(this.store, {
    key: 'todo',
    storage: localStorageStrategy
  })

  showTasks$ = this.store.pipe(selectAllEntities())
  totalTasks$ = this.store.pipe(selectEntitiesCount())
  doneTasks$ = this.store
    .pipe(
      selectAllEntities(),
      map(tasks =>
        tasks.filter(task => task.isChecked).length
      )
    )


  addNewTask(taskTitle: string) {
    const newTask: ITask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isChecked: false
    }

    this.store.update(addEntities(newTask))
  }

  deleteTask(id: string) {
    this.store.update(deleteEntities(id))
  }

  clearTaskList() {
    this.store.update(deleteAllEntities())
  }

  checkTask(id: string) {
    this.store.update(updateEntities(id, {isChecked: !this.store.query(getEntity(id))?.isChecked}))
  }
}
