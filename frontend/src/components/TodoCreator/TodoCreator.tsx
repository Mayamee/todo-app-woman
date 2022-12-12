import { FC, useState } from 'react'
import styles from './TodoCreator.module.scss'
import TodoCreatorBody from './TodoCreatorBody/TodoCreatorBody'

const TodoCreator: FC<unknown> = () => {
  const [isUnWrapped, setIsUnWrapped] = useState(false)
  const handleUnWrap = () => setIsUnWrapped(true)
  // const handleWrap = () => setIsUnWrapped(false)
  return (
    <section className={styles['todo-creator-wrapper']}>
      {isUnWrapped ? (
        <TodoCreatorBody />
      ) : (
        <div className={styles['todo-creator-enter']} onClick={handleUnWrap}>
          Add a new todo
        </div>
      )}
    </section>
  )
}
export default TodoCreator
