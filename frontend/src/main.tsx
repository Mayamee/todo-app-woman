import { createRoot } from 'react-dom/client'
import App from './App'
import './main.scss'

const container = document.getElementById('root') as HTMLElement
createRoot(container).render(<App />)
