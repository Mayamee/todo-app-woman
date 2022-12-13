import { ChangeEvent, FC, Ref } from 'react'
import styles from './TextArea.module.scss'

interface ITextAreaProps {
  value?: string
  placeholder?: string
  ref?: Ref<HTMLTextAreaElement>
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  maxSize?: number
}

const TextArea: FC<ITextAreaProps> = ({
  value,
  onChange,
  placeholder,
  onBlur,
  ref,
  maxSize = 150,
}) => {
  return (
    <textarea
      wrap="soft"
      rows={1}
      ref={ref}
      className={styles['text-area']}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        event.target.style.height = 'auto'
        event.target.style.height = event.target.scrollHeight + 'px'
        if (event.target.value.length > maxSize) return
        onChange && onChange(event)
      }}
      onBlur={onBlur}
    />
  )
}

export default TextArea
