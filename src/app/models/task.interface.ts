export interface ITask {
  id: string
  title: string
  isChecked: boolean
}

export interface IToDoProps {
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED'
}
