import {Injectable} from "@angular/core";
import {createStore, select, setProp, withProps} from "@ngneat/elf";
import {
  addEntities,
  deleteAllEntities,
  deleteEntities, getEntity, getEntityType, selectAllEntities, selectAllEntitiesApply, selectEntitiesCount,
  updateEntities,
  withEntities
} from "@ngneat/elf-entities";
import {ITask, IToDoProps} from "../models/task.interface";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";
import {map, switchMap} from "rxjs";

@Injectable({providedIn: 'root'})
export class TodoRepository {
  private store = createStore(
    {name: 'to-do-list'},
    withProps<IToDoProps>({filter: 'ALL'}),
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

  filter$ = this.store.pipe(select((state) => state.filter))
  visibleTodo$ = this.filter$.pipe(
    switchMap((filter) => {
      return this.store.pipe(
        selectAllEntitiesApply(
          {filterEntity({isChecked}) {
              if (filter === 'ALL') return true
              return filter === 'COMPLETED' ? isChecked : !isChecked
            }
          }
        )
      )
    })
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
    this.store.update(updateEntities(id, (task) => (
      {
        ...task,
        isChecked: !task.isChecked
      }
    )))
  }

  updateFilter(filter: IToDoProps['filter']) {
    this.store.update(setProp('filter', filter))
  }
}
