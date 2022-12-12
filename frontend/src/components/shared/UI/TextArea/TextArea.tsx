import { ChangeEvent, FC } from 'react'
import styles from './TextArea.module.scss'

interface ITextAreaProps {
  value: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: FC<ITextAreaProps> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      wrap="soft"
      rows={1}
      className={styles['text-area']}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default TextArea
