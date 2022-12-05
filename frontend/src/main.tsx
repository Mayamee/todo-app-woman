import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './main.scss'
import Layout from './containers/Layout/Layout'
import { setupStore } from './redux/store'

const store = setupStore()

const app = (
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>
)

const container = document.getElementById('root')
if (!container) throw new Error('No root element found')
createRoot(container).render(app)
