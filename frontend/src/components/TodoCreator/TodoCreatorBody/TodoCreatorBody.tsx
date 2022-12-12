import { FC, useState } from 'react'
import IconButton from '../../shared/UI/IconButton/IconButton'
import styles from './TodoCreatorBody.module.scss'
import { ReactComponent as PinnedIcon } from '../../../assets/images/pin.svg'
import { ReactComponent as UnPinnedIcon } from '../../../assets/images/pin-outlined.svg'
import TextArea from '../../shared/UI/TextArea/TextArea'

// interface ITodoCreatorBodyProps {}

const TodoCreatorBody: FC<unknown> = () => {
  const [isPinned, setIsPinned] = useState(false)
  const [todoTitleValue, setTodoTitleValue] = useState('')
  const [todoDescriptionValue, setTodoDescriptionValue] = useState('')
  const togglePinHandler = () => setIsPinned((p) => !p)
  const PinIcon = isPinned ? PinnedIcon : UnPinnedIcon
  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 150) return
    setTodoTitleValue(e.target.value)
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  const handleTodoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 300) return
    setTodoDescriptionValue(e.target.value)
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  return (
    <div className={styles['todo-creator-body']}>
      <div className={styles['todo-creator-body-desc-wrapper']}>
        <div className={styles['todo-creator-body-text-wrapper']}>
          <div className={styles['todo-creator-body-text-title']}>
            <TextArea
              placeholder="Type title"
              value={todoTitleValue}
              onChange={handleTodoTitleChange}
            />
          </div>
          <div className={styles['todo-creator-body-text-description']}>
            <TextArea
              placeholder="Description..."
              value={todoDescriptionValue}
              onChange={handleTodoDescriptionChange}
            />
          </div>
        </div>
        <div className={styles['todo-creator-body-pin']}>
          <IconButton icon={<PinIcon />} size={40} onClick={togglePinHandler} rounded />
        </div>
      </div>
    </div>
  )
}
export default TodoCreatorBody
