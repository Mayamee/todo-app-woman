import { FC, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './TodoCreator.module.scss'
import TodoCreatorBody from './TodoCreatorBody/TodoCreatorBody'

const TodoCreator: FC<unknown> = () => {
  const sectionRef = useRef(null)
  const [isWrapped, setIsWrapped] = useState(true)
  const handleWrap = () => setIsWrapped(true)
  const handleUnWrap = () => setIsWrapped(false)
  useOnClickOutside(sectionRef, handleWrap)
  return (
    <section ref={sectionRef} className={styles['todo-creator-wrapper']}>
      {isWrapped ? (
        <div className={styles['todo-creator-enter']} onClick={handleUnWrap}>
          Add a new todo
        </div>
      ) : (
        <TodoCreatorBody />
      )}
    </section>
  )
}
export default TodoCreator
