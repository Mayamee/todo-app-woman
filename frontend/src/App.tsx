import Todo from './components/Todo/Todo'
import TodoCreator from './components/TodoCreator/TodoCreator'

const App = () => {
  return (
    <div id="app-wrapper">
      <TodoCreator />
      <Todo />
    </div>
  )
}

export default App
