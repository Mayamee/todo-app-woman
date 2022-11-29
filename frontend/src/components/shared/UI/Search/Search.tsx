import { ChangeEvent, FC, useRef, useState } from 'react'
import styles from './Search.module.scss'
import { ReactComponent as SearchIcon } from './assets/search.svg'
import { ReactComponent as CloseIcon } from './assets/close.svg'
import IconButton from '../IconButton/IconButton'

interface ISearchProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}
export const Search: FC<ISearchProps> = ({ onChange, placeholder }) => {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className={`${styles['search']} ${isInputFocused ? styles['search-focused'] : ''}`}>
      <span className={styles['search-search-icon']}>
        <IconButton size={25} onClick={() => inputRef.current?.focus()} icon={<SearchIcon />} />
      </span>
      <input
        type="text"
        value={value}
        ref={inputRef}
        placeholder={placeholder}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onChange={(e) => {
          onChange(e)
          setValue(e.target.value)
        }}
      />
      {value && (
        <span className={styles['search-close-icon']}>
          <IconButton size={25} onClick={() => setValue('')} icon={<CloseIcon />} />
        </span>
      )}
    </div>
  )
}
