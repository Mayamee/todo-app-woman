export interface ITodoElem {
  id: string
  isDone: boolean
  text: string
}
export type ITodoElemWithoutId = Omit<ITodoElem, 'id'>
export interface ITodoModel {
  ownerId: string
  title: string
  description: string
  isPinned: boolean
  isArchived: boolean
  color: string
  body: ITodoElem[]
}
