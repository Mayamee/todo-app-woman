import { ChangeEvent, FC, useState } from 'react'
import styles from './Search.module.scss'
import { ReactComponent as SearchIcon } from './assets/search.svg'
import { ReactComponent as CloseIcon } from './assets/close.svg'
import IconButton from '../IconButton/IconButton'
import SvgContainer from '../SvgContainer/SvgContainer'

interface ISearchProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}
export const Search: FC<ISearchProps> = ({ onChange, placeholder }) => {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [value, setValue] = useState('')
  return (
    <div className={`${styles['search']} ${isInputFocused ? styles['search-focused'] : ''}`}>
      <span className={styles['search-search-icon']}>
        <SvgContainer icon={<SearchIcon />} size={'25px'} />
      </span>
      <input
        type="text"
        value={value}
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
          <IconButton size={40} onClick={() => setValue('')} icon={<CloseIcon />} rounded />
        </span>
      )}
    </div>
  )
}
