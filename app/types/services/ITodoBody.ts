export default interface ITodoBody {
  title: string
  description: string
  todoBody: ITodoItem[]
}
interface ITodoItem {
  id: number
  isDone: boolean
  text: string
}
