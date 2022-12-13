import { ChangeEvent, FC, useCallback, useState } from 'react'
import IconButton from '../../shared/UI/IconButton/IconButton'
import styles from './TodoCreatorBody.module.scss'
import { ReactComponent as PinnedIcon } from '../../../assets/images/pin.svg'
import { ReactComponent as UnPinnedIcon } from '../../../assets/images/pin-outlined.svg'
import { ReactComponent as AddIcon } from '../../../assets/images/add.svg'
import TextArea from '../../shared/UI/TextArea/TextArea'
import RoundedCheckBox from '../../shared/UI/RoundedCheckBox/RoundedCheckBox'
import { TODO } from '../../../constants/Static'
import TodoCreatorList from './TodoCreatorList/TodoCreatorList'
import { ITodoElemWithoutId } from '../../../models/ITodoModel'

const TodoCreatorBody: FC<unknown> = () => {
  const [isAddCheckBoxChecked, setIsAddCheckBoxChecked] = useState(false)
  const [todoCreatorArray, setTodoCreatorArray] = useState<ITodoElemWithoutId[]>([])
  const [isPinned, setIsPinned] = useState(false)
  const PinIcon = isPinned ? PinnedIcon : UnPinnedIcon
  const [todoTitleValue, setTodoTitleValue] = useState('')
  const [todoDescriptionValue, setTodoDescriptionValue] = useState('')
  const [todoAddValue, setTodoAddValue] = useState('')
  const togglePinHandler = () => setIsPinned((p) => !p)
  const appendTodoHandler = () => {
    if (todoAddValue.length === 0) return
    setTodoCreatorArray((a) => [...a, { text: todoAddValue, isDone: isAddCheckBoxChecked }])
    setTodoAddValue('')
    setIsAddCheckBoxChecked(false)
  }
  const toggleCheckBoxHandler = () => setIsAddCheckBoxChecked((c) => !c)
  const handleTodoDelete = useCallback((index: number) => {
    setTodoCreatorArray((a) => a.filter((_, i) => i !== index))
  }, [])
  const handleTodoCheckChange = useCallback((index: number) => {
    setTodoCreatorArray((a) => {
      const newArray = [...a]
      newArray[index].isDone = !newArray[index].isDone
      return newArray
    })
  }, [])
  const handleTodoEdit = useCallback((index: number, text: string) => {
    setTodoCreatorArray((a) => {
      const newArray = [...a]
      newArray[index].text = text
      return newArray
    })
  }, [])
  const handleTodoTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoTitleValue(e.target.value)
  }
  const handleTodoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoDescriptionValue(e.target.value)
  }
  const handleTodoAddChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoAddValue(e.target.value)
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
              maxSize={TODO.creator.title.maxSize}
            />
          </div>
          <div className={styles['todo-creator-body-text-description']}>
            <TextArea
              placeholder={TODO.creator.description.placeholder}
              value={todoDescriptionValue}
              onChange={handleTodoDescriptionChange}
              maxSize={TODO.creator.description.maxSize}
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
            maxSize={TODO.creator.addTodo.maxSize}
          />
        </div>
        <IconButton icon={<AddIcon />} size={40} onClick={appendTodoHandler} rounded />
      </div>
      <div className="todo-creator-body-list">
        <TodoCreatorList
          data={todoCreatorArray}
          onCheckChange={handleTodoCheckChange}
          onDelete={handleTodoDelete}
          onEdit={handleTodoEdit}
        />
      </div>
    </div>
  )
}
export default TodoCreatorBody
