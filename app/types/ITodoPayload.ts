import ITodoBody from './ITodoBody'

export default interface ITodoPayload extends ITodoBody {
  ownerId: string
}
