import { BrowserRouter as ReactRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import './main.scss'
import Layout from './containers/Layout/Layout'

const app = (
  <ReactRouter>
    <Layout>
      <App />
    </Layout>
  </ReactRouter>
)

const container = document.getElementById('root')
if (!container) throw new Error('No root element found')
createRoot(container).render(app)
