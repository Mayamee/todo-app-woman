import { FC } from 'react'
import { TODO } from '../../../../constants/Static'
import { ITodoElemWithoutId } from '../../../../models/ITodoModel'
import IconButton from '../../../shared/UI/IconButton/IconButton'
import RoundedCheckBox from '../../../shared/UI/RoundedCheckBox/RoundedCheckBox'
import { ReactComponent as DeleteIcon } from '../../../../assets/images/remove.svg'
import styles from './TodoCreatorList.module.scss'
import TextArea from '../../../shared/UI/TextArea/TextArea'

interface ITodoCreatorListProps {
  data: ITodoElemWithoutId[]
  onCheckChange: (index: number) => void
  onDelete: (index: number) => void
  onEdit: (index: number, text: string) => void
}

const TodoCreatorList: FC<ITodoCreatorListProps> = ({ data, onCheckChange, onDelete, onEdit }) => {
  const isEmpty = data.length === 0

  return (
    <ul className={styles['todo-list']}>
      {isEmpty ? (
        <li className={styles['todo-list-item-empty']}>Empty todo</li>
      ) : (
        data.map((item, index) => (
          <li key={index} className={styles['todo-list-item']}>
            <RoundedCheckBox
              borderSize={TODO.creator.checkbox.borderSize}
              color={TODO.creator.checkbox.color}
              size={TODO.creator.checkbox.size}
              isChecked={item.isDone}
              onChange={() => onCheckChange(index)}
            />
            <div className={styles['todo-list-item-text']}>
              <TextArea
                value={item.text}
                onChange={(e) => {
                  onEdit(index, e.target.value)
                }}
              />
            </div>
            <IconButton icon={<DeleteIcon />} size={40} onClick={() => onDelete(index)} rounded />
          </li>
        ))
      )}
    </ul>
  )
}
export default TodoCreatorList
