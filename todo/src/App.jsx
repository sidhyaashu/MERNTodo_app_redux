import Login from "./components/Login"
import Todo from "./components/Todo"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './components/SignUp';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
