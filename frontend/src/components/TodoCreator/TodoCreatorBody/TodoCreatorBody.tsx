import { FC, useState } from 'react'
import IconButton from '../../shared/UI/IconButton/IconButton'
import styles from './TodoCreatorBody.module.scss'
import { ReactComponent as PinnedIcon } from '../../../assets/images/pin.svg'
import { ReactComponent as UnPinnedIcon } from '../../../assets/images/pin-outlined.svg'
import { ReactComponent as AddIcon } from '../../../assets/images/add.svg'
import TextArea from '../../shared/UI/TextArea/TextArea'
import RoundedCheckBox from '../../shared/UI/RoundedCheckBox/RoundedCheckBox'
import { TODO } from '../../../constants/Static'

const TodoCreatorBody: FC<unknown> = () => {
  const [isAddCheckBoxChecked, setIsAddCheckBoxChecked] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const PinIcon = isPinned ? PinnedIcon : UnPinnedIcon
  const [todoTitleValue, setTodoTitleValue] = useState('')
  const [todoDescriptionValue, setTodoDescriptionValue] = useState('')
  const [todoAddValue, setTodoAddValue] = useState('')
  const togglePinHandler = () => setIsPinned((p) => !p)
  const toggleCheckBoxHandler = () => setIsAddCheckBoxChecked((c) => !c)
  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > TODO.creator.title.maxSize) return
    setTodoTitleValue(e.target.value)
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  const handleTodoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > TODO.creator.description.maxSize) return
    setTodoDescriptionValue(e.target.value)
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  const handleTodoAddChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > TODO.creator.addTodo.maxSize) return
    setTodoAddValue(e.target.value)
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  return (
    <div className={styles['todo-creator-body']}>
      <div className={styles['todo-creator-body-desc-wrapper']}>
        <div className={styles['todo-creator-body-text-wrapper']}>
          <div className={styles['todo-creator-body-text-title']}>
            <TextArea
              placeholder={TODO.creator.title.placeholder}
              value={todoTitleValue}
              onChange={handleTodoTitleChange}
            />
          </div>
          <div className={styles['todo-creator-body-text-description']}>
            <TextArea
              placeholder={TODO.creator.description.placeholder}
              value={todoDescriptionValue}
              onChange={handleTodoDescriptionChange}
            />
          </div>
        </div>
        <div className={styles['todo-creator-body-pin']}>
          <IconButton icon={<PinIcon />} size={40} onClick={togglePinHandler} rounded />
        </div>
      </div>
      <div className={styles['todo-creator-body-add-todo-block']}>
        <RoundedCheckBox
          borderSize={TODO.creator.checkbox.borderSize}
          color={TODO.creator.checkbox.color}
          size={TODO.creator.checkbox.size}
          isChecked={isAddCheckBoxChecked}
          onChange={toggleCheckBoxHandler}
        />
        <div className={styles['todo-creator-body-add-todo-block-text']}>
          <TextArea
            placeholder={TODO.creator.addTodo.placeholder}
            value={todoAddValue}
            onChange={handleTodoAddChange}
          />
        </div>
        <IconButton icon={<AddIcon />} size={40} onClick={togglePinHandler} rounded />
      </div>
    </div>
  )
}
export default TodoCreatorBody
